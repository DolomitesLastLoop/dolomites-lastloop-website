// Shared form-validation helpers (used client- and server-side).

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(v: string): boolean {
  return EMAIL_RE.test(v.trim());
}

// Plausible international phone number: optional leading +, then digits and the
// usual separators. Intentionally lenient (no library) — we only guard against
// obvious garbage, not validate carrier-correctness. 6–20 digits.
export function isPlausiblePhone(v: string): boolean {
  const trimmed = v.trim();
  if (!/^\+?[0-9 ()/.\-]{6,24}$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 20;
}

// Italian Codice Fiscale, standard 16-char personal format.
// SOFT check only: a failure is surfaced as a friendly warning, never a blocker
// (non-Italian participants may have a differently shaped tax code).
const CODICE_FISCALE_RE = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;

export function isCodiceFiscale(v: string): boolean {
  return CODICE_FISCALE_RE.test(v.trim());
}

// Age in full years on a given reference day.
export function ageOnDay(birth: Date, day: Date): number {
  let age = day.getFullYear() - birth.getFullYear();
  const m = day.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && day.getDate() < birth.getDate())) age--;
  return age;
}
