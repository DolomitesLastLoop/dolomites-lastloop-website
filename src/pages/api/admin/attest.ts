import type { APIRoute } from "astro";
import { isAuthenticated } from "@lib/auth";
import { getAdminClient } from "@lib/supabase";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isAuthenticated(cookies)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  let body: { id?: string; action?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }
  if (!body.id || !["approve", "reject"].includes(body.action ?? "")) {
    return new Response(JSON.stringify({ error: "Invalid input" }), {
      status: 400,
    });
  }
  const newStatus = body.action === "approve" ? "approved" : "rejected";
  try {
    const supabase = getAdminClient();
    const { error } = await supabase
      .from("participants")
      .update({ attest_status: newStatus })
      .eq("id", body.id);
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
