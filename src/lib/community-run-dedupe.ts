// Community Run — Dublettenprüfung vor dem Insert.
//
// Eine Anmeldung gilt als Dublette, wenn eine Zeile mit derselben E-Mail UND
// demselben Vor- und Nachnamen existiert. Gleiche E-Mail mit anderem Namen ist
// KEINE Dublette (Familien/Gruppen teilen sich teils eine Adresse, siehe schema.sql).
//
// E-Mail: exakter Vergleich per .eq() — die API speichert sie seit jeher
// trim().toLowerCase(). Bewusst KEIN ilike: "_" und "%" wären dort Wildcards.
// Namen: nur für den Vergleich normalisiert (NFC, trim, Leerzeichen zusammengefasst,
// Kleinschreibung); gespeichert wird weiterhin die Eingabe.
//
// Ohne Pfad-Aliase und nur mit Typ-Import, damit das Modul auch direkt unter Node
// (--experimental-strip-types) mit gemocktem Client testbar ist.

import type { SupabaseClient } from "@supabase/supabase-js";

export function normName(s: string): string {
  return s.normalize("NFC").trim().replace(/\s+/g, " ").toLowerCase();
}

export type DedupeResult =
  | { kind: "none" }
  | { kind: "duplicate" }
  | { kind: "upgrade_workshop"; id: string }
  | { kind: "error"; message: string };

type ExistingRow = {
  id: string;
  vorname: string;
  nachname: string;
  workshop_interest: boolean;
};

export async function findExistingRegistration(
  supabase: SupabaseClient,
  input: { email: string; vorname: string; nachname: string; workshopInterest: boolean },
): Promise<DedupeResult> {
  try {
    const { data, error } = await supabase
      .from("community_run_registrations")
      .select("id, vorname, nachname, workshop_interest")
      .eq("email", input.email)
      .order("created_at", { ascending: true })
      .limit(50);
    if (error) return { kind: "error", message: error.message };

    const vorname = normName(input.vorname);
    const nachname = normName(input.nachname);
    const matches = ((data ?? []) as ExistingRow[]).filter(
      (r) => normName(r.vorname) === vorname && normName(r.nachname) === nachname,
    );
    if (matches.length === 0) return { kind: "none" };

    // Nur false → true wird nachgezogen; true → false ändert nichts.
    if (input.workshopInterest && !matches.some((r) => r.workshop_interest)) {
      return { kind: "upgrade_workshop", id: matches[0].id };
    }
    return { kind: "duplicate" };
  } catch (err) {
    return { kind: "error", message: err instanceof Error ? err.message : "unknown" };
  }
}
