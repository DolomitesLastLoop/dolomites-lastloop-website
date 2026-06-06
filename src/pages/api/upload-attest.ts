import type { APIRoute } from "astro";
import { getAdminClient } from "@lib/supabase";

export const prerender = false;

const MAX_BYTES = 5 * 1024 * 1024;
const BUCKET = "atteste";

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return new Response(JSON.stringify({ error: "Invalid form" }), {
      status: 400,
    });
  }
  const participantId = String(form.get("participant_id") || "").trim();
  const attestToken = String(form.get("attest_token") || "").trim();
  const file = form.get("file");
  if (!participantId || !attestToken || !(file instanceof File)) {
    return new Response(
      JSON.stringify({ error: "participant_id, attest_token und file erforderlich." }),
      { status: 400 },
    );
  }
  if (file.type !== "application/pdf") {
    return new Response(
      JSON.stringify({ error: "Nur PDF-Dateien erlaubt." }),
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return new Response(JSON.stringify({ error: "Datei zu groß (max 5 MB)." }), {
      status: 400,
    });
  }

  try {
    const supabase = getAdminClient();
    // Verify both participant_id and attest_token match — prevents unauthorized uploads.
    const { data: participant, error: fetchErr } = await supabase
      .from("participants")
      .select("id")
      .eq("id", participantId)
      .eq("attest_token", attestToken)
      .maybeSingle();
    if (fetchErr) throw fetchErr;
    if (!participant) {
      return new Response(
        JSON.stringify({ error: "Ungültige Upload-Berechtigung." }),
        { status: 403 },
      );
    }

    const path = `${participantId}/${Date.now()}.pdf`;
    const buffer = new Uint8Array(await file.arrayBuffer());
    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: "application/pdf", upsert: true });
    if (uploadErr) throw uploadErr;

    const { data: signed } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, 60 * 60 * 24 * 365);

    const { error: updateErr } = await supabase
      .from("participants")
      .update({
        attest_url: signed?.signedUrl ?? path,
        attest_status: "pending",
      })
      .eq("id", participantId);
    if (updateErr) throw updateErr;

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Upload fehlgeschlagen.",
      }),
      { status: 500 },
    );
  }
};
