// Community Run — Zugangs-Token für den Shop.
//
// Muster wie attest_token (stripe-webhook.ts): 32 Zufallsbytes als Hex. Anders als
// dort wird der Token NICHT im Klartext gespeichert, sondern nur sein SHA-256-Hash
// (community_run_registrations.access_token_hash). Der rohe Token existiert
// ausschließlich im Link der Bestätigungsmail.
//
// Gültig ist ein Zugang nur, wenn die Zeile existiert, access_revoked = false ist
// und access_token_expires_at (falls gesetzt) in der Zukunft liegt. Dieser Check
// läuft bei JEDEM Shop-Aufruf gegen die DB — auch mit gültigem Session-Cookie —,
// damit ein Widerruf sofort greift.

import crypto from "node:crypto";
import { getAdminClient } from "@lib/supabase";

/**
 * Gültigkeit des Shop-Zugangs ab Registrierung.
 * OFFENER PUNKT: Default 12 Monate — genaue Frist legt Simon noch fest.
 */
export const ACCESS_TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 365;

/** Platzhalter-Werte (offener Punkt) — müssen zum check-Constraint in schema.sql passen. */
export const PACE_GROUPS = ["relaxed", "moderate", "fast"] as const;
export type PaceGroup = (typeof PACE_GROUPS)[number];

export function isPaceGroup(v: string): v is PaceGroup {
  return (PACE_GROUPS as readonly string[]).includes(v);
}

export function generateAccessToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashAccessToken(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

/** Nur syntaktisch plausible Tokens (64 Hex-Zeichen) gehen überhaupt an die DB. */
export function isWellFormedToken(raw: string): boolean {
  return /^[0-9a-f]{64}$/.test(raw);
}

export type AccessCheck =
  | { ok: true; id: string; expiresAt: string | null }
  | { ok: false; reason: "missing" | "invalid" | "revoked" | "expired" };

type AccessRow = {
  id: string;
  access_revoked: boolean;
  access_token_expires_at: string | null;
};

function evaluate(row: AccessRow | null, now = Date.now()): AccessCheck {
  if (!row) return { ok: false, reason: "invalid" };
  if (row.access_revoked) return { ok: false, reason: "revoked" };
  if (
    row.access_token_expires_at &&
    Date.parse(row.access_token_expires_at) <= now
  ) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true, id: row.id, expiresAt: row.access_token_expires_at };
}

const ACCESS_COLUMNS = "id, access_revoked, access_token_expires_at";

/** Zugriff über den rohen Token aus dem Mail-Link. */
export async function checkAccessByToken(raw: string): Promise<AccessCheck> {
  if (!raw) return { ok: false, reason: "missing" };
  if (!isWellFormedToken(raw)) return { ok: false, reason: "invalid" };
  const { data, error } = await getAdminClient()
    .from("community_run_registrations")
    .select(ACCESS_COLUMNS)
    .eq("access_token_hash", hashAccessToken(raw))
    .maybeSingle();
  if (error) throw error;
  return evaluate(data as AccessRow | null);
}

/** Zugriff über die Registrierungs-ID aus dem Session-Cookie (erneuter DB-Check). */
export async function checkAccessById(id: string): Promise<AccessCheck> {
  if (!id) return { ok: false, reason: "missing" };
  const { data, error } = await getAdminClient()
    .from("community_run_registrations")
    .select(ACCESS_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return evaluate(data as AccessRow | null);
}
