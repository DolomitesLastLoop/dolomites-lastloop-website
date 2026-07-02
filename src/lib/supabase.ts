import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import ws from "ws";

// Vercel-Runtime ist Node 20 (ohne natives WebSocket) — supabase-js' Realtime-
// Client wirft sonst beim Erstellen. Wir nutzen Realtime nicht, aber der
// Konstruktor läuft immer. Ab Node 22 wäre der Transport überflüssig.
const realtime = { transport: ws as unknown as typeof WebSocket };

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
    { auth: { persistSession: false }, realtime },
  );
  return _publicClient;
}

export function getAdminClient(): SupabaseClient {
  if (_adminClient) return _adminClient;
  _adminClient = createClient(
    assertEnv("PUBLIC_SUPABASE_URL", url),
    assertEnv("SUPABASE_SERVICE_ROLE_KEY", serviceKey),
    { auth: { persistSession: false }, realtime },
  );
  return _adminClient;
}

export type ParticipantStatus =
  | "pending"
  | "confirmed"
  | "waitlist"
  | "cancelled"
  | "failed";

export interface Participant {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  geburtsdatum: string;
  nationalitaet: string | null;
  notfallkontakt_name: string | null;
  notfallkontakt_tel: string | null;
  // Erweiterte Anmeldedaten (2026-06-30). Sensible PII — nie in der Public-View.
  tax_code: string | null;
  phone: string | null;
  street: string | null;
  postal_code: string | null;
  city: string | null;
  country: string | null;
  price_type: "early_bird" | "standard" | null;
  consent_privacy: boolean | null;
  consent_liability_waiver: boolean | null;
  consent_image_rights: boolean | null;
  confirmation_email_sent: boolean;
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
