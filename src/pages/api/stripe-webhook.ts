import type { APIRoute } from "astro";
import type Stripe from "stripe";
import { getStripe } from "@lib/stripe";
import { getAdminClient, MAX_PARTICIPANTS } from "@lib/supabase";
import { sendRegistrationConfirmation } from "@lib/email";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const sig = request.headers.get("stripe-signature");
  const secret = import.meta.env.STRIPE_WEBHOOK_SECRET as string | undefined;
  if (!sig || !secret) {
    return new Response("Missing signature", { status: 400 });
  }
  const raw = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "unknown"}`,
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const participantId = session.metadata?.participant_id;
    if (!participantId) {
      return new Response("ok", { status: 200 });
    }
    try {
      const supabase = getAdminClient();

      const { count } = await supabase
        .from("participants")
        .select("id", { count: "exact", head: true })
        .eq("ticket_status", "confirmed");
      const nextNumber = (count ?? 0) + 1;

      const { data: updated, error } = await supabase
        .from("participants")
        .update({
          ticket_status: "confirmed",
          attest_status: "missing",
          startnummer:
            nextNumber > MAX_PARTICIPANTS ? null : nextNumber,
        })
        .eq("id", participantId)
        .select("email,vorname,startnummer")
        .single();
      if (error) throw error;

      try {
        await sendRegistrationConfirmation(
          updated.email,
          updated.vorname,
          updated.startnummer,
        );
      } catch (mailErr) {
        console.error("Email send failed", mailErr);
      }
    } catch (err) {
      console.error("Webhook DB error", err);
      return new Response("DB error", { status: 500 });
    }
  }

  return new Response("ok", { status: 200 });
};
