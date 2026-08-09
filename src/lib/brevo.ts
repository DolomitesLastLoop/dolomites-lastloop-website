// Brevo (ex-Sendinblue) Contact-API.
// Trägt einen Kontakt in eine der konfigurierten Listen ein.
// Keys kommen ausschließlich aus Env-Vars (nie hardcoden):
//   BREVO_API_KEY              – v3 API-Key (xkeysib-…)
//   BREVO_LIST_ID              – Newsletter-Liste (numerisch)
//   BREVO_PARTICIPANT_LIST_ID  – Liste der bestätigten Teilnehmer (numerisch)
//
// Gelesen wird runtime-first über @lib/env: statisches `import.meta.env.X` würde
// von Vite zur BUILD-Zeit als Literal eingebacken (vgl. Fehlerprotokoll 2026-07-11).
//
// Robust gegen die dotenv-Falle: ein lokal als z. B. "#3" notierter Wert wird
// von Vite/dotenv ab "#" als Kommentar abgeschnitten; daher filtern wir den
// Wert defensiv auf reine Ziffern.

import { env } from "@lib/env";

/** Zielliste. "newsletter" = Einwilligung, "participants" = Vertragserfüllung. */
export type BrevoList = "newsletter" | "participants";

const LIST_ENV_VAR: Record<BrevoList, string> = {
  newsletter: "BREVO_LIST_ID",
  participants: "BREVO_PARTICIPANT_LIST_ID",
};

function parseListId(raw: string | undefined): number | null {
  if (!raw) return null;
  const digits = String(raw).replace(/\D/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export interface BrevoResult {
  ok: boolean;
  /** true, wenn Brevo gar nicht konfiguriert ist (Keys fehlen) → übersprungen. */
  skipped?: boolean;
  error?: string;
}

export async function addBrevoContact(input: {
  email: string;
  name?: string;
  lastName?: string;
  /** Default "newsletter" – hält das Verhalten von /api/newsletter unverändert. */
  list?: BrevoList;
}): Promise<BrevoResult> {
  const apiKey = env("BREVO_API_KEY");
  const listId = parseListId(env(LIST_ENV_VAR[input.list ?? "newsletter"]));
  if (!apiKey || !listId) {
    return { ok: false, skipped: true, error: "Brevo nicht konfiguriert" };
  }

  // Attributnamen laut Brevo-Konto: VORNAME (firstname) / NACHNAME (lastname).
  // Ein unbekanntes Attribut wird von Brevo still verworfen – der Kontakt landet
  // dann ohne Namen in der Liste, ohne dass der Request fehlschlägt.
  const firstName = (input.name ?? "").trim();
  const lastName = (input.lastName ?? "").trim();
  const attributes: Record<string, string> = {};
  if (firstName) attributes.VORNAME = firstName;
  if (lastName) attributes.NACHNAME = lastName;

  const body: Record<string, unknown> = {
    email: input.email,
    listIds: [listId],
    updateEnabled: true, // bestehende Kontakte aktualisieren statt 400 werfen
  };
  if (Object.keys(attributes).length > 0) body.attributes = attributes;

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    // 201 = neu angelegt, 204 = aktualisiert. Beides ist Erfolg.
    if (res.status === 201 || res.status === 204) return { ok: true };

    let detail = `HTTP ${res.status}`;
    try {
      const data = (await res.json()) as { message?: string };
      if (data?.message) detail = data.message;
    } catch {
      /* kein JSON-Body */
    }
    return { ok: false, error: detail };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Brevo request failed",
    };
  }
}
