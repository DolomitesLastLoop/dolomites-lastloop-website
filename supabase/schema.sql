-- Dolomites Last Loop — Supabase schema
-- Run this in the Supabase SQL editor before deploying.

-- Required for uuid_generate_v4 if not already present
create extension if not exists "pgcrypto";

-- ────────────────────────────────────────────────────────────
-- participants
-- ────────────────────────────────────────────────────────────
create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  vorname text not null,
  nachname text not null,
  email text not null unique,
  geburtsdatum date,
  nationalitaet text,
  notfallkontakt_name text,
  notfallkontakt_tel text,
  ticket_status text not null default 'pending'
    check (ticket_status in ('pending', 'confirmed', 'waitlist', 'cancelled')),
  attest_url text,
  attest_status text check (attest_status in ('missing', 'pending', 'approved', 'rejected')),
  startnummer integer unique,
  stripe_session_id text,
  created_at timestamptz not null default now()
);

create index if not exists participants_status_idx on public.participants (ticket_status);
create index if not exists participants_email_idx on public.participants (email);

-- ────────────────────────────────────────────────────────────
-- waitlist
-- ────────────────────────────────────────────────────────────
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  created_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- newsletter
-- ────────────────────────────────────────────────────────────
create table if not exists public.newsletter (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- results
-- ────────────────────────────────────────────────────────────
create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  year integer not null,
  place integer not null,
  name text not null,
  nationalitaet text,
  runden integer not null default 0,
  created_at timestamptz not null default now(),
  unique (year, place)
);

create index if not exists results_year_idx on public.results (year);

-- ────────────────────────────────────────────────────────────
-- Row Level Security
-- Only the service role (used by the server) writes to these tables.
-- The anon key only gets read access for public-facing views.
-- ────────────────────────────────────────────────────────────
alter table public.participants enable row level security;
alter table public.waitlist enable row level security;
alter table public.newsletter enable row level security;
alter table public.results enable row level security;

-- ────────────────────────────────────────────────────────────
-- Öffentliche Startliste: NUR über die View participants_public.
-- (2026-06-16, Security-Härtung)
-- Früher hatte anon eine SELECT-Policy auf der gesamten participants-Tabelle
-- (alle Spalten – inkl. email, geburtsdatum, notfallkontakt_tel, attest_token,
-- stripe_session_id). Die Spaltenbeschränkung lag nur in den App-Queries und
-- wäre über direkten PostgREST-Zugriff mit dem Anon-Key umgehbar gewesen.
-- Jetzt: anon liest ausschließlich eine View mit unkritischen Spalten; auf der
-- Basistabelle hat anon weder Policy noch Grant.
drop policy if exists "participants public read" on public.participants;
revoke select on public.participants from anon;

create or replace view public.participants_public as
  select
    id,
    vorname,
    nachname,
    nationalitaet,
    ticket_status as status,
    startnummer,
    created_at
  from public.participants
  where ticket_status in ('confirmed', 'waitlist');

-- Definer-View (läuft mit Owner-Rechten) → liefert nur die selektierten
-- Spalten der gefilterten Zeilen. Zugriff explizit nur für anon/authenticated.
revoke all on public.participants_public from public;
grant select on public.participants_public to anon, authenticated;

drop policy if exists "results public read" on public.results;
create policy "results public read"
  on public.results for select
  to anon
  using (true);

-- No anon write access at all – the service role bypasses RLS.

-- ────────────────────────────────────────────────────────────
-- attest_token: one-time upload token, generated on payment confirmation
-- ────────────────────────────────────────────────────────────
alter table public.participants add column if not exists attest_token text;

-- ────────────────────────────────────────────────────────────
-- confirm_participant: atomically assigns startnummer and confirms a participant.
-- Uses a transaction-level advisory lock so concurrent webhook calls never
-- race for the same startnummer. Must be called with the service role.
-- ────────────────────────────────────────────────────────────
create or replace function confirm_participant(p_id uuid, p_max int)
returns json
language plpgsql
security definer
as $$
declare
  v_next integer;
  v_row  participants;
begin
  -- Serialize all concurrent calls; lock is released automatically at tx end.
  perform pg_advisory_xact_lock(8675309);

  select coalesce(max(startnummer), 0) + 1
  into   v_next
  from   participants
  where  startnummer is not null;

  update participants set
    ticket_status = 'confirmed',
    attest_status = 'missing',
    startnummer   = case when v_next > p_max then null else v_next end
  where id = p_id
  returning * into v_row;

  return json_build_object(
    'email',       v_row.email,
    'vorname',     v_row.vorname,
    'startnummer', v_row.startnummer
  );
end;
$$;

-- ────────────────────────────────────────────────────────────
-- Storage bucket for attest PDFs
-- Run once in the Supabase Storage UI or via SQL:
--   insert into storage.buckets (id, name, public) values ('atteste', 'atteste', false)
--   on conflict (id) do nothing;
-- Then keep the bucket private (we serve signed URLs).
-- ────────────────────────────────────────────────────────────

-- ─────────────────────────────────────────────────────────────
-- Brute-Force-Schutz Admin-Login (2026-06-10)
-- 5 Fehlversuche innerhalb von 15 min → 15 min Lockout pro IP.
-- Einmalig im Supabase SQL-Editor ausführen (idempotent).
-- ─────────────────────────────────────────────────────────────
create table if not exists public.login_attempts (
  ip text primary key,
  attempts integer not null default 0,
  first_attempt_at timestamptz not null default now(),
  locked_until timestamptz
);

alter table public.login_attempts enable row level security;
-- bewusst KEINE Policies: nur der Service-Role-Key (serverseitig) hat Zugriff

-- Atomar prüfen + zählen. Rückgabe: locked_until (null = nicht gesperrt).
-- Bei aktiver Sperre wird auch ein korrektes Passwort NICHT verarbeitet.
create or replace function public.register_login_attempt(p_ip text, p_success boolean)
returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  v_max constant integer := 5;
  v_window constant interval := interval '15 minutes';
  v_lock constant interval := interval '15 minutes';
  v_row public.login_attempts%rowtype;
  v_attempts integer;
begin
  -- Aufrufe pro IP serialisieren (gleiche Technik wie confirm_participant)
  perform pg_advisory_xact_lock(hashtext('login_attempts:' || p_ip));

  select * into v_row from public.login_attempts where ip = p_ip;

  if v_row.locked_until is not null and v_row.locked_until > now() then
    return v_row.locked_until;
  end if;

  if p_success then
    delete from public.login_attempts where ip = p_ip;
    return null;
  end if;

  if v_row.ip is null or now() - v_row.first_attempt_at > v_window then
    insert into public.login_attempts (ip, attempts, first_attempt_at, locked_until)
    values (p_ip, 1, now(), null)
    on conflict (ip) do update
      set attempts = 1, first_attempt_at = now(), locked_until = null;
    return null;
  end if;

  v_attempts := v_row.attempts + 1;
  update public.login_attempts
     set attempts = v_attempts,
         locked_until = case when v_attempts >= v_max then now() + v_lock end
   where ip = p_ip;

  return case when v_attempts >= v_max then now() + v_lock end;
end;
$$;

-- KRITISCH: Execute-Rechte einschränken — sonst könnte jeder via PostgREST
-- fremde IPs sperren (DoS) oder den eigenen Zähler zurücksetzen (Bypass).
revoke execute on function public.register_login_attempt(text, boolean) from public, anon, authenticated;
grant execute on function public.register_login_attempt(text, boolean) to service_role;
