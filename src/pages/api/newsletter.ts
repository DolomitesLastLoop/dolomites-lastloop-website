import type { APIRoute } from "astro";
import { getAdminClient } from "@lib/supabase";
import { checkRateLimit, tooManyRequests } from "@lib/ratelimit";

export const prerender = false;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit("newsletter", request);
  if (!rl.ok) return tooManyRequests(rl.retryAfter);

  let payload: { email?: string };
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }
  const email = String(payload.email || "").trim().toLowerCase();
  if (!emailRe.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
    });
  }
  try {
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
