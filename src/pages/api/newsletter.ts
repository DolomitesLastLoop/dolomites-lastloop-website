import type { APIRoute } from "astro";
import { getAdminClient } from "@lib/supabase";
import { checkRateLimit, tooManyRequests } from "@lib/ratelimit";
import { addBrevoContact } from "@lib/brevo";

export const prerender = false;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit("newsletter", request);
  if (!rl.ok) return tooManyRequests(rl.retryAfter);

  let payload: { email?: string; name?: string; website?: string };
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }

  // Honeypot: das Feld "website" ist für Menschen versteckt; ausgefüllt = Bot.
  // Still mit ok antworten, damit der Bot keinen Unterschied bemerkt.
  if (String(payload.website || "").trim() !== "") {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const email = String(payload.email || "").trim().toLowerCase();
  const name = String(payload.name || "").trim().slice(0, 100);
  if (!emailRe.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
    });
  }
  try {
    // Brevo ist best-effort: Fehler hier dürfen den Eintrag nicht blockieren.
    const brevo = await addBrevoContact({ email, name });
    if (!brevo.ok && !brevo.skipped) {
      console.error("[newsletter] Brevo error:", brevo.error);
    }

    // Supabase bleibt Quelle für das Admin-Panel (email-only, kein Schema-Change).
    const supabase = getAdminClient();
    const { error } = await supabase
      .from("newsletter")
      .upsert({ email }, { onConflict: "email", ignoreDuplicates: true });
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500 },
    );
  }
};
