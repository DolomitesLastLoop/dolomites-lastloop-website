import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;
const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;

function assertEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

let _publicClient: SupabaseClient | null = null;
let _adminClient: SupabaseClient | null = null;

export function getPublicClient(): SupabaseClient {
  if (_publicClient) return _publicClient;
  _publicClient = createClient(
    assertEnv("PUBLIC_SUPABASE_URL", url),
    assertEnv("PUBLIC_SUPABASE_ANON_KEY", anonKey),
    { auth: { persistSession: false } },
  );
  return _publicClient;
}

export function getAdminClient(): SupabaseClient {
  if (_adminClient) return _adminClient;
  _adminClient = createClient(
    assertEnv("PUBLIC_SUPABASE_URL", url),
    assertEnv("SUPABASE_SERVICE_ROLE_KEY", serviceKey),
    { auth: { persistSession: false } },
  );
  return _adminClient;
}

export type ParticipantStatus = "pending" | "confirmed" | "waitlist" | "cancelled";

export interface Participant {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  geburtsdatum: string;
  nationalitaet: string | null;
  notfallkontakt_name: string | null;
  notfallkontakt_tel: string | null;
  ticket_status: ParticipantStatus;
  attest_url: string | null;
  attest_status: "missing" | "pending" | "approved" | "rejected" | null;
  startnummer: number | null;
  stripe_session_id: string | null;
  created_at: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

export interface NewsletterEntry {
  id: string;
  email: string;
  created_at: string;
}

export interface RaceResult {
  id: string;
  year: number;
  place: number;
  name: string;
  nationalitaet: string | null;
  runden: number;
}

export const MAX_PARTICIPANTS = Number(
  import.meta.env.MAX_PARTICIPANTS ?? 150,
);
