// Zentrale, geteilte Event- und Formular-Konstanten.
//
// Das Renndatum stand bisher an vier Stellen dupliziert (Countdown.astro,
// SeoJsonLd.astro, email.ts, legal.ts). Für die Altersprüfung braucht es eine
// einzige Quelle — die steht hier. Die vier Anzeige-Duplikate sind bewusst
// unangetastet geblieben (eigener Scope).

// ────────────────────────────────────────────────────────────
// Renndatum & Altersgrenze
// ────────────────────────────────────────────────────────────

// Bewusst als UTC-Kalendertag konstruiert, NICHT als lokale Zeit: die
// Altersprüfung läuft sowohl serverseitig (Vercel = UTC) als auch im Browser
// des Teilnehmers (beliebige Zeitzone). Nur mit UTC-Komponenten auf beiden
// Seiten liefert ageOnDay() überall dasselbe Ergebnis. Mit einem lokal
// konstruierten Datum wäre die Prüfung auf einem UTC-Server dauerhaft einen
// Tag zu streng.
export const RACE_DATE = new Date(Date.UTC(2027, 4, 15)); // 15.05.2027

// Mindestalter AM RENNTAG (nicht am Anmeldetag). Deckungsgleich mit
// signup.field.age_error in src/i18n/ui.ts ("18 am Renntag") und mit der FAQ.
export const MIN_AGE = 18;

// Ältestes plausibles Geburtsjahr — nur für die min-Grenze des Datepickers,
// keine inhaltliche Regel.
export const MAX_AGE = 100;

// ────────────────────────────────────────────────────────────
// Formular-Allowlists
// ────────────────────────────────────────────────────────────

// Staatsangehörigkeit als ISO-3166-1-Alpha-2 (+ "OTHER"). Das Frontend-Select
// bietet genau diese Werte an; die Liste steht hier, weil sie serverseitig
// erzwungen werden muss — ein direkter POST umgeht das Formular, und
// `nationalitaet` steuert die Codice-Fiscale-Pflicht in /api/checkout.
export const ALLOWED_NATIONALITIES = new Set(["IT", "DE", "AT", "CH", "OTHER"]);

// Wohnsitzland: die fünf Klartextwerte des bestehenden country-Selects.
// Bewusst NICHT auf ISO-Codes umgestellt — diese Strings stehen so bereits in
// der DB und in den CSV-Exports. `country` (Wohnsitz) und `nationalitaet`
// (Staatsangehörigkeit) haben deshalb absichtlich verschiedene Vokabulare.
export const ALLOWED_COUNTRIES = new Set([
  "Italien",
  "Deutschland",
  "Österreich",
  "Schweiz",
  "Andere",
]);

// ────────────────────────────────────────────────────────────
// Öffentliche Kommunikation
// ────────────────────────────────────────────────────────────

// Die nach außen kommunizierte Startplatzzahl — bewusst NICHT MAX_PARTICIPANTS.
// MAX_PARTICIPANTS ist die technische Grenze: sie steuert die Kaufsperre in
// /api/checkout, isFull in RegistrationFlow.astro und das Kapazitäts-Gate in
// confirm_participant(p_max). Sie liegt höher als 200, damit Wartelisten-
// Nachrücker Absagen auffangen können.
//
// Dieser Wert hier steuert keinen Kontrollfluss, sondern nur den Zählertext der
// Startliste. Er ändert sich ausschließlich dann, wenn sich die öffentliche
// Kommunikation ändert — nicht bei technischen Kapazitätsanpassungen.
export const PUBLIC_DISPLAYED_CAP = 200;
