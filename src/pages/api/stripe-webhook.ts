import crypto from "node:crypto";
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

      // Atomic startnummer assignment via advisory-locked Postgres function.
      const { data: result, error } = await supabase
        .rpc("confirm_participant", { p_id: participantId, p_max: MAX_PARTICIPANTS });
      if (error) throw error;
      const updated = result as { email: string; vorname: string; startnummer: number | null };

      // Generate a single-use upload token and persist it.
      const attestToken = crypto.randomBytes(32).toString("hex");
      await supabase
        .from("participants")
        .update({ attest_token: attestToken })
        .eq("id", participantId);

      try {
        await sendRegistrationConfirmation(
          updated.email,
          updated.vorname,
          updated.startnummer,
          participantId,
          attestToken,
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
