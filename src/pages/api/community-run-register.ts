import type { APIRoute } from "astro";
import { getAdminClient } from "@lib/supabase";
import { checkRateLimit, tooManyRequests } from "@lib/ratelimit";
import { isValidEmail } from "@lib/validation";
import { sendCommunityRunConfirmation } from "@lib/email";
import { addBrevoContact } from "@lib/brevo";
import { findExistingRegistration } from "@lib/community-run-dedupe";
import {
  ACCESS_TOKEN_TTL_MS,
  generateAccessToken,
  hashAccessToken,
  isCommunityRunOpen,
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
  // Datums-Gate ZUERST: vor Rate-Limit, Body, Honeypot und DB — geschlossen heißt
  // weder DB-Zugriff noch Mail.
  if (!isCommunityRunOpen()) return json({ error: "not_open" }, 403);

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
  const consentPrivacy = payload.consent_privacy === true;
  const workshopInterest = payload.workshop_interest === true;
  const rawLang = String(payload.lang || "");
  const lang = rawLang === "it" || rawLang === "en" ? rawLang : "de";

  if (
    !vorname ||
    !nachname ||
    !isValidEmail(email) ||
    !consentPrivacy
  ) {
    return json({ error: "invalid_input" }, 400);
  }

  const supabase = getAdminClient();

  // Dublettenprüfung (gleiche E-Mail + gleicher Vor-/Nachname): keine neue Zeile,
  // keine Mail, kein Brevo — Antwort identisch zum Erfolgsfall, damit nicht erkennbar
  // ist, ob die Person schon angemeldet ist. Fail-open: schlägt die Abfrage fehl,
  // wird wie bisher angelegt. Logs ohne personenbezogene Daten.
  const existing = await findExistingRegistration(supabase, {
    email,
    vorname,
    nachname,
    workshopInterest,
  });
  if (existing.kind === "error") {
    console.error("[community-run-register] duplicate lookup failed:", existing.message);
  } else if (existing.kind === "duplicate") {
    return json({ ok: true }, 200);
  } else if (existing.kind === "upgrade_workshop") {
    const { error: updErr } = await supabase
      .from("community_run_registrations")
      .update({ workshop_interest: true })
      .eq("id", existing.id);
    if (updErr) {
      console.error("[community-run-register] workshop update failed:", updErr.message);
    }
    return json({ ok: true }, 200);
  }

  const accessToken = generateAccessToken();

  const { data: row, error: insertErr } = await supabase
    .from("community_run_registrations")
    .insert({
      vorname,
      nachname,
      email,
      consent_privacy: consentPrivacy,
      workshop_interest: workshopInterest,
      access_token_hash: hashAccessToken(accessToken),
      access_token_expires_at: new Date(Date.now() + ACCESS_TOKEN_TTL_MS).toISOString(),
      lang,
    })
    .select("id")
    .single();

  if (insertErr) {
    // 23505 = unique_violation. email ist seit 2026-09-25 nicht mehr unique
    // (Familien/Gruppen teilen sich teils eine Adresse); der einzige verbleibende
    // unique-Kandidat ist access_token_hash, der bei 256 Bit praktisch nie kollidiert.
    if (insertErr.code === "23505") return json({ error: "duplicate" }, 409);
    console.error("[community-run-register] insert failed:", insertErr.message);
    return json({ error: "server_error" }, 500);
  }

  // Token + Hash werden weiter erzeugt (access_token_hash ist NOT NULL), der rohe
  // Token geht aber seit 2026-09-30 NICHT mehr in die Mail (Shop versteckt).
  // Ohne Bestätigungsmail → Zeile wieder entfernen, die Person kann es erneut versuchen.
  try {
    await sendCommunityRunConfirmation(email, vorname, lang);
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
