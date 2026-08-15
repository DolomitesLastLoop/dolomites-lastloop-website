import Stripe from "stripe";
import { env } from "@lib/env";
import type { UIKey } from "@i18n/ui";

let _client: Stripe | null = null;

export function getStripe(): Stripe {
  if (_client) return _client;
  const key = env("STRIPE_SECRET_KEY");
  if (!key) {
    throw new Error("Missing environment variable: STRIPE_SECRET_KEY");
  }
  _client = new Stripe(key, { apiVersion: "2024-06-20" });
  return _client;
}

export type Tier = "early_bird" | "standard" | "late";

export const PRICES: Record<Tier, string | undefined> = {
  early_bird: env("STRIPE_PRICE_EARLY_BIRD"),
  standard: env("STRIPE_PRICE_STANDARD"),
  late: env("STRIPE_PRICE_LATE"),
};

// Anmeldefenster exakt nach AGB §1 (src/i18n/legal.ts — DE ~273, IT ~754, EN ~1235):
//   Frühanmeldung  75 €  01.09.2026 – 31.12.2026
//   Normaltarif    80 €  01.01.2027 – 31.03.2027
//   Spätanmeldung 100 €  01.04.2027 – 30.04.2027  (danach Anmeldeschluss)
//
// Zeitzone Europe/Rome, Offsets bewusst ausgeschrieben: +01:00 = CET, +02:00 = CEST
// (Umstellung am 25.10.2026 und 28.03.2027).
//
// `until` ist EXKLUSIV, also der erste Moment NACH dem Fenster und zugleich der
// `from` des Folgefensters. Halboffene Intervalle vermeiden die Sekundenlücke, die
// ein "…23:59:59"-Ende erzeugen würde (dort wäre die Anmeldung kurzzeitig zu).
export const TIER_WINDOWS = [
  // ⚠️⚠️ TEMPORÄR FÜR LIVE-E2E-TEST AM 2026-08-15 — NICHT DAUERHAFT MERGEN ⚠️⚠️
  // `from` ist bewusst vom 2026-09-01 auf den 2026-08-01 vorgezogen, damit
  // `currentTier()` heute `early_bird` liefert und das Anmeldefenster offen ist.
  // RÜCKBAU: `from` zurück auf "2026-09-01T00:00:00+02:00" und diesen Block löschen.
  { id: "early_bird", from: "2026-08-01T00:00:00+02:00", until: "2027-01-01T00:00:00+01:00" },
  { id: "standard", from: "2027-01-01T00:00:00+01:00", until: "2027-04-01T00:00:00+02:00" },
  { id: "late", from: "2027-04-01T00:00:00+02:00", until: "2027-05-01T00:00:00+02:00" },
] as const satisfies ReadonlyArray<{ id: Tier; from: string; until: string }>;

/**
 * Gültige Preisstufe für den Zeitpunkt `now` — oder `null`, wenn gerade kein
 * Anmeldefenster offen ist (vor dem 01.09.2026 bzw. ab dem 01.05.2027).
 * `null` bedeutet: Anmeldung technisch geschlossen, unabhängig vom Feature-Flag.
 */
export function currentTier(now: Date = new Date()): Tier | null {
  const t = now.getTime();
  for (const w of TIER_WINDOWS) {
    if (t >= Date.parse(w.from) && t < Date.parse(w.until)) return w.id;
  }
  return null;
}

export type RegistrationWindowState = "before" | "open" | "after";

/**
 * Für die UI: „öffnet in Kürze" (before) vs. „Anmeldung geschlossen" (after).
 * Die Fenster sind lückenlos aneinandergereiht, daher ist alles außerhalb
 * eindeutig entweder vor dem ersten oder nach dem letzten Fenster.
 */
export function registrationWindowState(now: Date = new Date()): RegistrationWindowState {
  if (currentTier(now)) return "open";
  return now.getTime() < Date.parse(TIER_WINDOWS[0].from) ? "before" : "after";
}

// Anzeige-Label je Tier. Verbindlich abgerechnet wird IMMER der Betrag der
// Stripe-Price-ID — diese Labels müssen mit den AGB und mit Stripe übereinstimmen.
export const TIER_PRICE_LABEL: Record<Tier, string> = {
  early_bird: "€ 75",
  standard: "€ 80",
  late: "€ 100",
};

// i18n-Key des Tarifnamens. Als Record (statt Ternary), damit ein neuer Tier vom
// Compiler erzwungen wird und nicht still auf „Standard" zurückfällt.
export const TIER_LABEL_KEY: Record<Tier, UIKey> = {
  early_bird: "signup.ticket.earlybird",
  standard: "signup.ticket.standard",
  late: "signup.ticket.late",
};

export function priceIdFor(tier: Tier): string | undefined {
  return PRICES[tier];
}
