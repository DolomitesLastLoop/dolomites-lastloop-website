import type { APIRoute } from "astro";
import { getAdminClient, MAX_PARTICIPANTS } from "@lib/supabase";
import { getStripe, PRICES } from "@lib/stripe";

export const prerender = false;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ageOnDay(birth: Date, day: Date): number {
  let age = day.getFullYear() - birth.getFullYear();
  const m = day.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && day.getDate() < birth.getDate())) age--;
  return age;
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }

  const vorname = String(body.vorname || "").trim();
  const nachname = String(body.nachname || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const geburtsdatum = String(body.geburtsdatum || "").trim();
  const nationalitaet = String(body.nationalitaet || "").trim() || null;
  const notfallkontakt_name = String(body.notfallkontakt_name || "").trim();
  const notfallkontakt_tel = String(body.notfallkontakt_tel || "").trim();
  const tier = body.tier === "standard" ? "standard" : "early_bird";

  if (
    !vorname ||
    !nachname ||
    !emailRe.test(email) ||
    !geburtsdatum ||
    !notfallkontakt_name ||
    !notfallkontakt_tel
  ) {
    return new Response(JSON.stringify({ error: "Pflichtfelder fehlen." }), {
      status: 400,
    });
  }

  const birth = new Date(geburtsdatum);
  if (Number.isNaN(birth.getTime()) || ageOnDay(birth, new Date()) < 18) {
    return new Response(
      JSON.stringify({ error: "Du musst mindestens 18 Jahre alt sein." }),
      { status: 400 },
    );
  }

  const priceId = tier === "standard" ? PRICES.standard : PRICES.earlyBird;
  if (!priceId) {
    return new Response(
      JSON.stringify({
        error: "Stripe Preise nicht konfiguriert. Setze STRIPE_PRICE_EARLY_BIRD / STRIPE_PRICE_STANDARD.",
      }),
      { status: 500 },
    );
  }

  try {
    const supabase = getAdminClient();

    const { count } = await supabase
      .from("participants")
      .select("id", { count: "exact", head: true })
      .in("ticket_status", ["confirmed", "pending"]);
    if ((count ?? 0) >= MAX_PARTICIPANTS) {
      return new Response(
        JSON.stringify({ error: "Rennen ausgebucht. Bitte Warteliste." }),
        { status: 409 },
      );
    }

    const { data: existing } = await supabase
      .from("participants")
      .select("id,ticket_status")
      .eq("email", email)
      .maybeSingle();
    if (existing && existing.ticket_status === "confirmed") {
      return new Response(
        JSON.stringify({ error: "Diese Email ist bereits angemeldet." }),
        { status: 409 },
      );
    }

    const { data: participant, error: upsertErr } = await supabase
      .from("participants")
      .upsert(
        {
          ...(existing ? { id: existing.id } : {}),
          vorname,
          nachname,
          email,
          geburtsdatum,
          nationalitaet,
          notfallkontakt_name,
          notfallkontakt_tel,
          ticket_status: "pending",
        },
        { onConflict: "email" },
      )
      .select("id")
      .single();
    if (upsertErr) throw upsertErr;

    const siteUrl =
      (import.meta.env.PUBLIC_SITE_URL as string | undefined) ??
      new URL(request.url).origin;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/de/anmeldung?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/de/anmeldung?status=cancelled`,
      metadata: {
        participant_id: participant.id,
        tier,
      },
    });

    await supabase
      .from("participants")
      .update({ stripe_session_id: session.id })
      .eq("id", participant.id);

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500 },
    );
  }
};
