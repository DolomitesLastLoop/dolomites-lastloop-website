// Geheimer Pfad-Slug für den dauerhaften VIP-Anmeldeweg (Familie/enge Bekannte).
// Siehe CLAUDE.md → "VIP-Anmeldeweg (dauerhaft)" und src/pages/api/checkout-vip.ts.
//
// SICHERHEITSMODELL — bewusst so gewählt (Simon, 02.09.2026): KEIN Token pro Person,
// KEIN Login, keine IP-Beschränkung. Der einzige Schutz ist, dass niemand die URL
// kennt. Der Slug ersetzt lediglich das Raten: /de/anmeldung-vip allein ist wertlos,
// es braucht den geheimen Zusatz.
//
// FAIL-SAFE wie @lib/registration: Ist VIP_REGISTRATION_SLUG nicht gesetzt, leer oder
// zu kurz, gibt es KEINEN gültigen Slug — Route und Endpoint antworten dann mit 404.
// Ein fehlkonfiguriertes Deployment öffnet also nichts, es schließt. Das ist auch der
// Normalzustand: Die Env-Var bleibt leer, solange der VIP-Weg nicht gebraucht wird.
//
// SLUG WECHSELN (jedes Jahr, oder sofort bei Leak-Verdacht): neuen Wert erzeugen mit
//   openssl rand -hex 12
// in Vercel setzen und neu deployen. Die alte URL ist damit sofort tot. Eine reine
// Dashboard-Änderung ohne Redeploy reicht NICHT (siehe Fehlerprotokoll 2026-07-10).
import { env } from "@lib/env";

// Kürzere Slugs wären ratbar und würden das Schutzversprechen still aushöhlen —
// dann lieber gar kein VIP-Zugang.
const MIN_SLUG_LENGTH = 8;

export function isValidVipSlug(candidate: unknown): boolean {
  const secret = (env("VIP_REGISTRATION_SLUG") ?? "").trim();
  if (secret.length < MIN_SLUG_LENGTH) return false;
  if (typeof candidate !== "string") return false;
  return timingSafeEqual(candidate, secret);
}

// Längenunabhängiger Vergleich. Timing-Angriffe sind über das Netz praktisch kein
// Thema (Jitter >> Byte-Vergleich), aber es kostet nichts und nimmt die Frage raus.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
