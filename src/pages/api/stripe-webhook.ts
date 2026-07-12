import crypto from "node:crypto";
import type { APIRoute } from "astro";
import type Stripe from "stripe";
import { getStripe, TIER_PRICE_LABEL, type Tier } from "@lib/stripe";
import { getAdminClient, MAX_PARTICIPANTS } from "@lib/supabase";
import {
  sendRegistrationConfirmation,
  sendWaitlistNotification,
} from "@lib/email";
import { env } from "@lib/env";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const sig = request.headers.get("stripe-signature");
  const secret = env("STRIPE_WEBHOOK_SECRET");
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

  // ── Bezahlung erfolgreich ─────────────────────────────────────────────────
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const participantId = session.metadata?.participant_id;
    if (!participantId) {
      return new Response("ok", { status: 200 });
    }
    const lang = session.metadata?.lang ?? "de";
    const tier = (session.metadata?.tier as Tier) ?? "early_bird";
    const priceLabel = TIER_PRICE_LABEL[tier] ?? "";

    try {
      const supabase = getAdminClient();

      // Atomares Kapazitäts-Gate. Bei Overflow → ticket_status='waitlist'.
      const { data: result, error } = await supabase.rpc("confirm_participant", {
        p_id: participantId,
        p_max: MAX_PARTICIPANTS,
      });
      if (error) throw error;
      const updated = result as {
        email: string;
        vorname: string;
        startnummer: number | null;
        overflow: boolean;
      };

      // ── Overflow: kein Platz mehr → Zahlung erstatten + Warteliste-Mail ─────
      if (updated.overflow) {
        const paymentIntent =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id;
        if (paymentIntent) {
          try {
            await stripe.refunds.create({ payment_intent: paymentIntent });
          } catch (refundErr) {
            console.error("Auto-refund failed", refundErr);
          }
        }
        try {
          await sendWaitlistNotification(updated.email, updated.vorname, lang);
          await supabase
            .from("participants")
            .update({ confirmation_email_sent: true })
            .eq("id", participantId);
        } catch (mailErr) {
          console.error("Waitlist email failed", mailErr);
        }
        return new Response("ok", { status: 200 });
      }

      // ── Bestätigt: Upload-Token erzeugen + Bestätigungsmail ─────────────────
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
          lang,
          priceLabel,
        );
        await supabase
          .from("participants")
          .update({ confirmation_email_sent: true })
          .eq("id", participantId);
      } catch (mailErr) {
        // Mail-Fehler darf den Bezahlstatus NICHT blockieren.
        console.error("Email send failed", mailErr);
      }
    } catch (err) {
      console.error("Webhook DB error", err);
      return new Response("DB error", { status: 500 });
    }
  }

  // ── Session abgelaufen / fehlgeschlagen → ticket_status='failed' ───────────
  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const participantId = session.metadata?.participant_id;
    if (participantId) {
      try {
        const supabase = getAdminClient();
        // Nur 'pending' herabstufen — bestätigte Teilnehmer nie anfassen.
        await supabase
          .from("participants")
          .update({ ticket_status: "failed" })
          .eq("id", participantId)
          .eq("ticket_status", "pending");
      } catch (err) {
        console.error("Webhook expired-handler error", err);
      }
    }
  }

  return new Response("ok", { status: 200 });
};
