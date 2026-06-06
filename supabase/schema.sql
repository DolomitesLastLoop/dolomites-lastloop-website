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

-- Public can read minimal participant info for the start list.
-- (We restrict columns in the API queries; this policy covers SELECT only.)
drop policy if exists "participants public read" on public.participants;
create policy "participants public read"
  on public.participants for select
  to anon
  using (ticket_status in ('confirmed', 'waitlist'));

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
