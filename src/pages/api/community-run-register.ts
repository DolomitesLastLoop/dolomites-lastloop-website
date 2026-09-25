import type { APIRoute } from "astro";
import { getAdminClient } from "@lib/supabase";
import { checkRateLimit, tooManyRequests } from "@lib/ratelimit";
import { isValidEmail } from "@lib/validation";
import { sendCommunityRunConfirmation } from "@lib/email";
import { addBrevoContact } from "@lib/brevo";
import {
  ACCESS_TOKEN_TTL_MS,
  generateAccessToken,
  hashAccessToken,
  isPaceGroup,
} from "@lib/community-run";

export const prerender = false;

// Community-Run-Anmeldung → community_run_registrations (NICHT participants).
// Antwortet mit maschinenlesbaren Fehlercodes; die Seite übersetzt sie in DE/IT/EN.
function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const rl = await checkRateLimit("community-run-register", request);
  if (!rl.ok) return tooManyRequests(rl.retryAfter);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "invalid_input" }, 400);
  }

  // Honeypot wie beim Newsletter: "website" ist für Menschen versteckt.
  // Still mit ok antworten, damit der Bot keinen Unterschied bemerkt.
  if (String(payload.website || "").trim() !== "") {
    return json({ ok: true }, 200);
  }

  const vorname = String(payload.vorname || "").trim().slice(0, 100);
  const nachname = String(payload.nachname || "").trim().slice(0, 100);
  const email = String(payload.email || "").trim().toLowerCase().slice(0, 254);
  const paceGroup = String(payload.pace_group || "").trim();
  const consentPrivacy = payload.consent_privacy === true;
  const workshopInterest = payload.workshop_interest === true;
  const rawLang = String(payload.lang || "");
  const lang = rawLang === "it" || rawLang === "en" ? rawLang : "de";

  if (
    !vorname ||
    !nachname ||
    !isValidEmail(email) ||
    !isPaceGroup(paceGroup) ||
    !consentPrivacy
  ) {
    return json({ error: "invalid_input" }, 400);
  }

  const supabase = getAdminClient();
  const accessToken = generateAccessToken();

  const { data: row, error: insertErr } = await supabase
    .from("community_run_registrations")
    .insert({
      vorname,
      nachname,
      email,
      pace_group: paceGroup,
      consent_privacy: consentPrivacy,
      workshop_interest: workshopInterest,
      access_token_hash: hashAccessToken(accessToken),
      access_token_expires_at: new Date(Date.now() + ACCESS_TOKEN_TTL_MS).toISOString(),
      lang,
    })
    .select("id")
    .single();

  if (insertErr) {
    // 23505 = unique_violation. access_token_hash kollidiert bei 256 Bit praktisch
    // nie; ein Konflikt ist in der Praxis die E-Mail.
    if (insertErr.code === "23505") return json({ error: "duplicate" }, 409);
    console.error("[community-run-register] insert failed:", insertErr.message);
    return json({ error: "server_error" }, 500);
  }

  // Ohne Mail kein Zugangslink → Zeile wieder entfernen, damit die Person es
  // erneut versuchen kann (sonst blockiert die UNIQUE-E-Mail jeden neuen Versuch).
  try {
    await sendCommunityRunConfirmation(email, vorname, accessToken, lang);
  } catch (err) {
    console.error(
      "[community-run-register] confirmation mail failed:",
      err instanceof Error ? err.message : err,
    );
    const { error: delErr } = await supabase
      .from("community_run_registrations")
      .delete()
      .eq("id", row.id);
    if (delErr) {
      console.error("[community-run-register] rollback failed:", delErr.message);
    }
    return json({ error: "mail_failed" }, 502);
  }

  // Brevo ist best-effort und darf die Anmeldung nie scheitern lassen.
  try {
    const brevo = await addBrevoContact({
      email,
      name: vorname,
      lastName: nachname,
      list: "communityRun",
    });
    if (!brevo.ok && !brevo.skipped) {
      console.error("[community-run-register] Brevo error:", brevo.error);
    }
  } catch (err) {
    console.error("[community-run-register] Brevo threw:", err);
  }

  return json({ ok: true }, 200);
};
