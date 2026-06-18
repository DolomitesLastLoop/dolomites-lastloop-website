// Brevo (ex-Sendinblue) Contact-API.
// Trägt einen Kontakt in die konfigurierte Liste ein.
// Keys kommen ausschließlich aus Env-Vars (nie hardcoden):
//   BREVO_API_KEY  – v3 API-Key (xkeysib-…)
//   BREVO_LIST_ID  – numerische Listen-ID
//
// Robust gegen die dotenv-Falle: ein lokal als z. B. "#3" notierter Wert wird
// von Vite/dotenv ab "#" als Kommentar abgeschnitten; daher filtern wir den
// Wert defensiv auf reine Ziffern.

const API_KEY = import.meta.env.BREVO_API_KEY as string | undefined;
const RAW_LIST_ID = import.meta.env.BREVO_LIST_ID as string | undefined;

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
}): Promise<BrevoResult> {
  const listId = parseListId(RAW_LIST_ID);
  if (!API_KEY || !listId) {
    return { ok: false, skipped: true, error: "Brevo nicht konfiguriert" };
  }

  const firstName = (input.name ?? "").trim();
  const body: Record<string, unknown> = {
    email: input.email,
    listIds: [listId],
    updateEnabled: true, // bestehende Kontakte aktualisieren statt 400 werfen
  };
  if (firstName) body.attributes = { FIRSTNAME: firstName };

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": API_KEY,
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
