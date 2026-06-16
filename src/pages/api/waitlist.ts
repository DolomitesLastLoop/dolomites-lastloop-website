import type { APIRoute } from "astro";
import { getAdminClient } from "@lib/supabase";
import { checkRateLimit, tooManyRequests } from "@lib/ratelimit";

export const prerender = false;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit("waitlist", request);
  if (!rl.ok) return tooManyRequests(rl.retryAfter);

  let payload: { email?: string; name?: string };
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }
  const email = String(payload.email || "").trim().toLowerCase();
  const name = String(payload.name || "").trim();
  if (!emailRe.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
    });
  }
  try {
    const supabase = getAdminClient();
    const { error } = await supabase
      .from("waitlist")
      .upsert(
        { email, name: name || null },
        { onConflict: "email", ignoreDuplicates: false },
      );
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
