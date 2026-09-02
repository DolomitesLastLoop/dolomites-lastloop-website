import type { APIRoute } from "astro";
import { isValidVipSlug } from "@lib/vip";
import { runCheckout } from "@lib/checkout-core";

export const prerender = false;

// ─────────────────────────────────────────────────────────────────────────────
// VIP-ANMELDEWEG — DAUERHAFTE EINRICHTUNG, KEIN EINMAL-HACK
//
// WOFÜR: Familie und enge Bekannte sollen sich anmelden können, während die
// öffentliche Anmeldung noch zu ist (PUBLIC_REGISTRATION_ENABLED=false) — etwa vor
// dem offiziellen Anmeldestart oder nachdem wir öffentlich manuell zugemacht haben.
// Das gilt für JEDE Ausgabe des Rennens, nicht nur für 2027. Bitte nicht entfernen,
// nur weil gerade niemand die Route benutzt: der Normalzustand ist "Env-Var leer".
//
// WIE BENUTZT: VIP_REGISTRATION_SLUG setzen (openssl rand -hex 12), neu deployen,
// dann die URL /<lang>/anmeldung-vip/<slug> privat weitergeben. Sonst nichts.
//
// UNTERSCHIED ZU /api/checkout: GENAU EINE PRÜFUNG entfällt, nämlich
// isRegistrationEnabled(). Alles andere — Tier-Fenster und damit der aktuell gültige
// Preis, Kapazitäts-Gate gegen MAX_PARTICIPANTS inkl. Warteliste, sämtliche
// Pflichtfelder, Codice-Fiscale-Pflicht für IT, Mindestalter am Renntag,
// Doppelanmeldungs-Sperre, Stripe-Session, DB-Insert und die Bestätigungsmail über
// stripe-webhook.ts — läuft durch DENSELBEN Code in @lib/checkout-core. Hier steht
// bewusst KEIN Copy-Paste, damit eine künftige Änderung am regulären Checkout hier
// nicht stillschweigend auseinanderläuft.
//
// FOLGE FÜRS NÄCHSTE JAHR: Ein TIER_WINDOWS-Update in @lib/stripe (neue Daten, neue
// Preise) zieht hier automatisch mit. Am VIP-Weg ist dafür NICHTS zu ändern.
//
// AKZEPTIERTES RISIKO: Es gibt keinen Zugriffsschutz außer der Geheimhaltung der URL.
// Wer den Slug kennt oder errät, kann buchen, solange Kapazität frei ist — zum regulär
// gültigen Preis und mit allen Pflichtfeldern. Bewusste Entscheidung (Simon,
// 02.09.2026), kein Versehen. Gegenmaßnahme bei Verdacht: Slug wechseln + Redeploy.
// ─────────────────────────────────────────────────────────────────────────────
export const POST: APIRoute = async ({ request, url }) => {
  // Slug-Gate VOR dem Body-Lesen. Zwei Gründe:
  //   1. Es hält die Gate-Reihenfolge von /api/checkout unverändert (dort kommt der
  //      Tier-Check ebenfalls vor dem JSON-Parse) — runCheckout() bleibt dadurch für
  //      beide Endpoints byte-identisch derselbe Ablauf.
  //   2. Ohne gültigen Slug wird gar kein Request-Body verarbeitet.
  // 404 statt 403: Ein 403 würde bestätigen, dass es diesen Endpoint überhaupt gibt.
  if (!isValidVipSlug(request.headers.get("x-vip-slug"))) {
    return new Response(null, { status: 404 });
  }

  return runCheckout(request, url);
};
