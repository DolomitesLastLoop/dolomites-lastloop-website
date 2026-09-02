import { getAdminClient, MAX_PARTICIPANTS } from "@lib/supabase";
import { getStripe, currentTier, priceIdFor } from "@lib/stripe";
import { isValidEmail, isPlausiblePhone, isCodiceFiscale, ageOnDay } from "@lib/validation";
import {
  RACE_DATE,
  MIN_AGE,
  ALLOWED_NATIONALITIES,
  ALLOWED_COUNTRIES,
} from "@lib/constants";
import { env } from "@lib/env";

type Lang = "de" | "it" | "en";
function normLang(v: unknown): Lang {
  return v === "it" || v === "en" ? v : "de";
}
function truthy(v: unknown): boolean {
  return v === true || v === "true" || v === "on" || v === 1 || v === "1";
}
// Einheitliche Fehlerantwort — auch von den Endpoints genutzt, damit deren
// Gate-Fehler (403 "Registration closed") exakt dasselbe Format haben wie
// die Validierungsfehler hier drin.
export function bad(error: string, status = 400) {
  return new Response(JSON.stringify({ error }), { status });
}

// Nur bekannte Hosts sind als Redirect-Origin zugelassen. Der x-forwarded-host-/
// host-Header ist clientseitig fälschbar — ohne Allowlist wäre die Stripe-
// success_url/cancel_url ein Open Redirect (Host Header Injection). Gespoofte
// oder unbekannte Hosts fallen daher sicher auf PUBLIC_SITE_URL zurück.
function isAllowedHost(host: string): boolean {
  const h = host.toLowerCase();
  if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/.test(h)) return true;
  if (h === "dolomiteslastloop.com" || h === "www.dolomiteslastloop.com") return true;
  // Vercel-Deployments dieses Projekts: stabiler Alias + Preview-Hashes.
  if (/^dolomites-lastloop-website[a-z0-9-]*\.vercel\.app$/.test(h)) return true;
  return false;
}

// Öffentlichen Origin AUS DEM REQUEST ableiten — lokal http://localhost:4321,
// in Produktion die echte Domain (Vercel setzt x-forwarded-host/-proto) — aber
// NUR wenn der Host in der Allowlist steht. PUBLIC_SITE_URL ist der sichere
// Fallback (NICHT bevorzugt, sonst landet der lokale Test auf der Live-Domain).
function resolveOrigin(request: Request, url: URL): string {
  const candidate =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    url?.host ??
    "";
  const host = candidate.split(",")[0].trim();
  if (host && isAllowedHost(host)) {
    const proto =
      (request.headers.get("x-forwarded-proto") || "").split(",")[0].trim() ||
      (/^(localhost|127\.|0\.0\.0\.0)/.test(host) ? "http" : "https");
    return `${proto}://${host}`;
  }
  return (
    env("PUBLIC_SITE_URL") ??
    url?.origin ??
    new URL(request.url).origin
  );
}

/**
 * Der gesamte Anmelde-/Zahlungsvorgang ab dem Tier-Check: Preisstufe, Feldvalidierung,
 * Kapazitäts-Gate gegen MAX_PARTICIPANTS, Warteliste, Stripe-Session, DB-Insert.
 *
 * Bewusst OHNE das PUBLIC_REGISTRATION_ENABLED-Gate — das prüft der jeweilige Endpoint
 * davor. So teilen sich /api/checkout (öffentlich, mit Flag-Gate) und /api/checkout-vip
 * (versteckter VIP-Weg, ohne Flag-Gate) exakt denselben Code: es gibt genau EINE Stelle,
 * an der Preis, Pflichtfelder und Kapazität entschieden werden. Wer hier etwas ändert,
 * ändert es für beide Wege — genau so ist es gewollt.
 */
export async function runCheckout(request: Request, url: URL): Promise<Response> {
  // Datumsbasiertes Gate: Preis serverseitig bestimmen — der Client darf
  // den Tarif nicht wählen. Außerhalb der AGB-Anmeldefenster (vor dem 01.09.2026,
  // ab dem 01.05.2027) gibt es KEINEN gültigen Tarif → die Anmeldung ist technisch
  // zu, auch wenn PUBLIC_REGISTRATION_ENABLED noch auf 'true' steht. Das Gate steht
  // bewusst vor jedem DB-Schreibzugriff, damit nach Anmeldeschluss auch kein
  // Warteliste-Eintrag mehr entsteht.
  const tier = currentTier();
  if (!tier) return bad("Registration closed", 403);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid JSON");
  }

  const lang = normLang(body.lang);
  // Einstiegsroute für den Redirect — NUR feste Allowlist, kein freier String
  // (sonst Open Redirect / Path-Injection in success_url/cancel_url).
  const returnSeg = body.return_path === "anmeldung-test" ? "anmeldung-test" : "anmeldung";
  const vorname = String(body.vorname || "").trim();
  const nachname = String(body.nachname || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const geburtsdatum = String(body.geburtsdatum || "").trim();
  // Nationalität und Codice Fiscale immer in Großschreibung normalisieren — beide
  // sind Codes, keine Freitexte. Bei der Nationalität hängt daran zusätzlich der
  // Allowlist-Abgleich unten; der Wert ist über die Startliste öffentlich sichtbar.
  const nationalitaet = String(body.nationalitaet || "").trim().toUpperCase();
  const notfallkontakt_name = String(body.notfallkontakt_name || "").trim();
  const notfallkontakt_tel = String(body.notfallkontakt_tel || "").trim();
  const tax_code = String(body.tax_code || "").trim().toUpperCase() || null;
  const phone = String(body.phone || "").trim();
  const street = String(body.street || "").trim();
  const postal_code = String(body.postal_code || "").trim();
  const city = String(body.city || "").trim();
  const country = String(body.country || "").trim();

  const consent_privacy = truthy(body.consent_privacy);
  const consent_liability_waiver = truthy(body.consent_liability_waiver);

  // Pflichtfelder
  if (
    !vorname ||
    !nachname ||
    !isValidEmail(email) ||
    !geburtsdatum ||
    !nationalitaet ||
    !notfallkontakt_name ||
    !notfallkontakt_tel ||
    !phone ||
    !street ||
    !postal_code ||
    !city ||
    !country
  ) {
    return bad("Pflichtfelder fehlen.");
  }

  if (!isPlausiblePhone(phone) || !isPlausiblePhone(notfallkontakt_tel)) {
    return bad("Bitte eine gültige Telefonnummer angeben.");
  }

  // Allowlists statt Freitext: beide Felder kommen aus einem <select>, aber das
  // Frontend ist per direktem POST umgehbar. Ohne diese Prüfung ließe sich
  // insbesondere das Codice-Fiscale-Gate unten aushebeln (Nationalität != "IT").
  if (!ALLOWED_NATIONALITIES.has(nationalitaet)) {
    return bad("Bitte eine gültige Nationalität auswählen.");
  }
  if (!ALLOWED_COUNTRIES.has(country)) {
    return bad("Bitte ein gültiges Land auswählen.");
  }

  // Codice Fiscale ist Pflicht für italienische Staatsangehörige — nur sie haben
  // einen. Für alle anderen Nationalitäten bleibt das Feld optional und wird nie
  // geprüft. Serverseitig, weil das dynamische `required` im Frontend nur Anzeige ist.
  if (nationalitaet === "IT") {
    if (!tax_code) {
      return bad("Für italienische Staatsangehörige ist der Codice Fiscale Pflicht.");
    }
    if (!isCodiceFiscale(tax_code)) {
      return bad("Bitte einen gültigen Codice Fiscale angeben.");
    }
  }

  // Datenschutz und Haftungsfreistellung sind Pflicht. Foto-/Videoaufnahmen laufen
  // NICHT über eine Einwilligung, sondern über Art. 6 Abs. 1 lit. f DSGVO mit
  // Widerspruchsrecht (Datenschutzerklärung Punkt 10) — daher hier kein Gate.
  if (!consent_privacy || !consent_liability_waiver) {
    return bad("Bitte beiden Einwilligungen zustimmen.");
  }

  // Referenzpunkt ist der RENNTAG, nicht der Anmeldetag — so steht es auch im
  // Hinweistext am Feld (signup.field.age_error) und in der FAQ. Wer heute 17 ist,
  // am 15.05.2027 aber 18 wird, kommt damit durch.
  const birth = new Date(geburtsdatum);
  if (Number.isNaN(birth.getTime()) || ageOnDay(birth, RACE_DATE) < MIN_AGE) {
    return bad("Du musst am Renntag mindestens 18 Jahre alt sein.");
  }

  // Für Nicht-IT-Nationalitäten wird der Codice Fiscale bewusst NICHT geprüft und
  // nie geblockt — dort bleibt es bei der Soft-Warnung im Client (blur-Handler in
  // RegistrationFlow.astro). Der harte Fall für nationalitaet === "IT" steht oben.

  // Gemeinsame Datensatz-Felder für Insert/Upsert.
  const baseFields = {
    vorname,
    nachname,
    email,
    geburtsdatum,
    nationalitaet,
    notfallkontakt_name,
    notfallkontakt_tel,
    tax_code,
    phone,
    street,
    postal_code,
    city,
    country,
    price_type: tier,
    consent_privacy,
    consent_liability_waiver,
    // Anmeldesprache persistieren (Mail-Sprache unabhängig von Stripe-Metadata
    // reproduzierbar, z.B. für spätere Mails/Admin-Resend).
    lang,
  };

  try {
    const supabase = getAdminClient();

    const { count } = await supabase
      .from("participants")
      .select("id", { count: "exact", head: true })
      .in("ticket_status", ["confirmed", "pending"]);
    const isFull = (count ?? 0) >= MAX_PARTICIPANTS;

    const { data: existing } = await supabase
      .from("participants")
      .select("id,ticket_status")
      .eq("email", email)
      .maybeSingle();
    if (existing && existing.ticket_status === "confirmed") {
      return bad("Diese Email ist bereits angemeldet.", 409);
    }

    // ── Ausgebucht → direkte Warteliste, keine Zahlung ──────────────────────
    if (isFull) {
      const { error: wlErr } = await supabase.from("participants").upsert(
        {
          ...(existing ? { id: existing.id } : {}),
          ...baseFields,
          ticket_status: "waitlist",
        },
        { onConflict: "email" },
      );
      if (wlErr) throw wlErr;
      return new Response(JSON.stringify({ waitlist: true }), { status: 200 });
    }

    const priceId = priceIdFor(tier);
    if (!priceId) {
      return bad(
        "Stripe Preise nicht konfiguriert. Setze STRIPE_PRICE_EARLY_BIRD / STRIPE_PRICE_STANDARD / STRIPE_PRICE_LATE.",
        500,
      );
    }

    const { data: participant, error: upsertErr } = await supabase
      .from("participants")
      .upsert(
        {
          ...(existing ? { id: existing.id } : {}),
          ...baseFields,
          ticket_status: "pending",
        },
        { onConflict: "email" },
      )
      .select("id")
      .single();
    if (upsertErr) throw upsertErr;

    const origin = resolveOrigin(request, url);

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      // Blendet in Checkout das Eingabefeld für Promotion Codes ein (Athleten-
      // Freiplätze). Die Codes selbst liegen ausschließlich in Stripe — bewusst
      // NICHT im Repo, siehe Stripe-Dashboard → Coupons.
      // ⚠️ Ein 100-%-Code macht `amount_total` = 0. Solche Sessions haben laut
      // Stripe („No-cost orders") KEINEN PaymentIntent und `payment_status`
      // 'no_payment_required' statt 'paid'. Der Webhook darf deshalb nie auf
      // `payment_status === "paid"` oder auf `payment_intent` gaten — er tut es
      // aktuell auch nicht (stripe-webhook.ts triggert auf das Event selbst).
      allow_promotion_codes: true,
      success_url: `${origin}/${lang}/${returnSeg}?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${lang}/${returnSeg}?status=cancelled`,
      metadata: {
        participant_id: participant.id,
        tier,
        lang,
      },
    });

    await supabase
      .from("participants")
      .update({ stripe_session_id: session.id })
      .eq("id", participant.id);

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err) {
    return bad(err instanceof Error ? err.message : "Unknown error", 500);
  }
}
