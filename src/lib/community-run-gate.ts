// Community Run — Öffnungs-Gate der Anmeldung.
//
// Bewusst schlank (nur @lib/env, KEIN Supabase-Import), damit auch der Header es
// importieren kann, ohne den DB-Client in jede Seite zu ziehen. src/lib/community-run.ts
// re-exportiert alles — bestehende Importe bleiben gültig.
//
// Seite und API prüfen BEIDE serverseitig gegen diesen Zeitpunkt (nie Client-Zeit).
// Der Menü-Eintrag im Header nutzt zusätzlich opensAtMs() als data-Attribut für ein
// rein kosmetisches Client-Reveal — das echte Gate bleibt serverseitig.

import { env } from "@lib/env";

// 00:00 italienische Zeit = CEST (+02:00) am 02.10.2026.
export const COMMUNITY_RUN_OPENS_AT = "2026-10-02T00:00:00+02:00";

/**
 * Öffnungszeitpunkt in ms. Override über env("COMMUNITY_RUN_OPENS_AT") (ISO-String)
 * NUR zum Testen. Leerer oder unparsebarer Wert wird ignoriert → Default gilt
 * (fail-safe: im Zweifel geschlossen).
 */
export function opensAtMs(): number {
  const override = (env("COMMUNITY_RUN_OPENS_AT") ?? "").trim();
  const parsed = override ? Date.parse(override) : NaN;
  return Number.isFinite(parsed) ? parsed : Date.parse(COMMUNITY_RUN_OPENS_AT);
}

export function isCommunityRunOpen(now: number = Date.now()): boolean {
  return now >= opensAtMs();
}
