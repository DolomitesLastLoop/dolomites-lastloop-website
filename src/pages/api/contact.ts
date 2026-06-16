import type { APIRoute } from "astro";
import { sendContactNotification } from "@lib/email";
import { checkRateLimit, tooManyRequests } from "@lib/ratelimit";

export const prerender = false;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit("contact", request);
  if (!rl.ok) return tooManyRequests(rl.retryAfter);

  let payload: { name?: string; email?: string; message?: string };
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }
  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const message = String(payload.message || "").trim();
  if (!name || !emailRe.test(email) || message.length < 5) {
    return new Response(JSON.stringify({ error: "Invalid input" }), {
      status: 400,
    });
  }
  try {
    await sendContactNotification(name, email, message);
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
