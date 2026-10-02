// Consent-Konfiguration — gemeinsam genutzt von ConsentBanner.astro (Server-Markup +
// Inline-Vorprüfung) und src/scripts/consent.ts (Client-Logik). Siehe CLAUDE.md → „Consent".
//
// Versionssprung (CONSENT_VERSION erhöhen) → alle bestehenden Entscheidungen werden
// ungültig, der Banner erscheint erneut. Erhöhen, wenn neue einwilligungspflichtige
// Dienste dazukommen oder sich Zwecke ändern.

export const CONSENT_COOKIE = "dll_consent";
export const CONSENT_VERSION = 1;
/** 6 Monate (Garante-Leitlinien 2021: frühestens nach 6 Monaten erneut fragen). */
export const CONSENT_MAX_AGE_S = 60 * 60 * 24 * 182;

export type ConsentCategory = "necessary" | "media" | "statistics" | "marketing";
export type OptionalCategory = Exclude<ConsentCategory, "necessary">;
export const OPTIONAL_CATEGORIES: OptionalCategory[] = ["media", "statistics", "marketing"];

/**
 * Welche Kategorien im Einstellungs-Dialog erscheinen. statistics/marketing sind im Code
 * vorbereitet, aber ausgeblendet, solange es keinen echten Inhalt dafür gibt. Beim
 * Einblenden: Texte in ui.ts (consent.cat.<id>.*) prüfen, Cookie-Policy ergänzen und
 * CONSENT_VERSION erhöhen.
 */
export const VISIBLE_CATEGORIES: Record<OptionalCategory, boolean> = {
  media: true,
  statistics: false,
  marketing: false,
};
