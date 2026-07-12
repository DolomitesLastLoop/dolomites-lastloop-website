import type { APIRoute } from "astro";
import { getAdminClient } from "@lib/supabase";
import { checkRateLimit, tooManyRequests } from "@lib/ratelimit";

export const prerender = false;

// Leichtgewichtiger Poll-Endpoint für den direkten Post-Payment-Return.
// Stripe leitet auf /{lang}/anmeldung?status=success&session_id=… zurück; der
// `attest_token` wird aber erst vom Webhook (checkout.session.completed) erzeugt.
// Zwischen Redirect und Webhook kann der Token also kurz fehlen (Race Condition).
// Die Seite pollt diesen Endpoint, bis `ready: true`, und lädt dann neu, um die
// serverseitig vorbefüllten Hidden-Inputs (id + token) zu bekommen.
//
// WICHTIG: Dieser Endpoint gibt den Token NIE zurück — nur ein Boolean. Der Token
// landet ausschließlich per SSR im Hidden-Input, dieselbe Vertrauensgrenze wie der
// Magic-Link aus der Bestätigungs-Email.
export const GET: APIRoute = async ({ request, url }) => {
  const rl = await checkRateLimit("attest-status", request);
  if (!rl.ok) return tooManyRequests(rl.retryAfter);

  const sessionId = (url.searchParams.get("session_id") || "").trim();
  // Stripe-Checkout-Session-IDs sehen aus wie cs_test_… / cs_live_….
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
    return new Response(JSON.stringify({ ready: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("participants")
      .select("attest_token")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();
    if (error) throw error;
    const ready = Boolean(data?.attest_token);
    return new Response(JSON.stringify({ ready }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    // Fail-soft: keine Details preisgeben, einfach not-ready → Client pollt weiter.
    return new Response(JSON.stringify({ ready: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
