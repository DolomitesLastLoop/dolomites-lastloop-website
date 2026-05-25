import type { APIRoute } from "astro";
import { isAuthenticated } from "@lib/auth";
import { getAdminClient } from "@lib/supabase";

export const prerender = false;

function unauthorized() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
  });
}

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) return unauthorized();
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }
  const required = ["vorname", "nachname", "email"];
  for (const k of required) {
    if (!String(body[k] || "").trim()) {
      return new Response(JSON.stringify({ error: `Missing ${k}` }), {
        status: 400,
      });
    }
  }

  const status = ["confirmed", "pending", "waitlist"].includes(
    body.ticket_status,
  )
    ? body.ticket_status
    : "pending";

  try {
    const supabase = getAdminClient();
    const { error } = await supabase.from("participants").insert({
      vorname: body.vorname.trim(),
      nachname: body.nachname.trim(),
      email: body.email.trim().toLowerCase(),
      nationalitaet: body.nationalitaet?.trim() || null,
      ticket_status: status,
      attest_status: "missing",
    });
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "DB error",
      }),
      { status: 500 },
    );
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) return unauthorized();
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
    });
  }
  try {
    const supabase = getAdminClient();
    const { error } = await supabase.from("participants").delete().eq("id", id);
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "DB error",
      }),
      { status: 500 },
    );
  }
};
