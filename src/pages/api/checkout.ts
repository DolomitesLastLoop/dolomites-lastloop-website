import type { APIRoute } from "astro";
import { getAdminClient, MAX_PARTICIPANTS } from "@lib/supabase";
import { getStripe, currentTier, priceIdFor } from "@lib/stripe";
import { isValidEmail, isPlausiblePhone, ageOnDay } from "@lib/validation";
import { isRegistrationEnabled } from "@lib/registration";
import { env } from "@lib/env";

export const prerender = false;

type Lang = "de" | "it" | "en";
function normLang(v: unknown): Lang {
  return v === "it" || v === "en" ? v : "de";
}
function truthy(v: unknown): boolean {
  return v === true || v === "true" || v === "on" || v === 1 || v === "1";
}
function bad(error: string, status = 400) {
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

export const POST: APIRoute = async ({ request, url }) => {
  // Security-Gate: Bei deaktivierter Anmeldung darf serverseitig KEINE neue,
  // zahlungspflichtige Checkout-Session entstehen — auch nicht per direktem POST
  // (das Verstecken des Formulars allein ist kein Schutz). Fail-safe via @lib/registration.
  if (!isRegistrationEnabled()) return bad("Registration closed", 403);

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
  const nationalitaet = String(body.nationalitaet || "").trim() || null;
  const notfallkontakt_name = String(body.notfallkontakt_name || "").trim();
  const notfallkontakt_tel = String(body.notfallkontakt_tel || "").trim();
  const tax_code = String(body.tax_code || "").trim() || null;
  const phone = String(body.phone || "").trim();
  const street = String(body.street || "").trim();
  const postal_code = String(body.postal_code || "").trim();
  const city = String(body.city || "").trim();
  const country = String(body.country || "").trim();

  const consent_privacy = truthy(body.consent_privacy);
  const consent_liability_waiver = truthy(body.consent_liability_waiver);
  const consent_image_rights = truthy(body.consent_image_rights);

  // Pflichtfelder
  if (
    !vorname ||
    !nachname ||
    !isValidEmail(email) ||
    !geburtsdatum ||
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

  // Alle drei Einwilligungen sind Pflicht.
  if (!consent_privacy || !consent_liability_waiver || !consent_image_rights) {
    return bad("Bitte allen drei Einwilligungen zustimmen.");
  }

  const birth = new Date(geburtsdatum);
  if (Number.isNaN(birth.getTime()) || ageOnDay(birth, new Date()) < 18) {
    return bad("Du musst mindestens 18 Jahre alt sein.");
  }

  // Codice Fiscale wird bewusst NICHT geblockt (nur Soft-Warnung im Client).

  // Preis serverseitig bestimmen — der Client darf den Tarif nicht wählen.
  const tier = currentTier();

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
    consent_image_rights,
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
        "Stripe Preise nicht konfiguriert. Setze STRIPE_PRICE_EARLY_BIRD / STRIPE_PRICE_STANDARD.",
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
};
