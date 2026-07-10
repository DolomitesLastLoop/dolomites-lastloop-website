// Zentrales, fail-safe Feature-Gate für die öffentliche Anmeldung.
//
// Sicherheitshinweis: Dieses Flag ist die einzige Stelle, an der die Anmeldung
// (UI + Zahlungs-API) deaktiviert wird. Es MUSS fail-safe sein — jeder Wert außer
// dem exakten String "true" (also "false", leer, nicht gesetzt, Tippfehler) führt
// zu DEAKTIVIERTER Anmeldung.
//
// Achtung Build- vs. Runtime: `PUBLIC_*`-Vars werden von Astro/Vite zur BUILD-Zeit
// ins Bundle inlined. Wir lesen zuerst `process.env` (auf der Vercel-Node-Function
// zur Laufzeit verfügbar), damit eine Env-Änderung nach einem Redeploy sofort greift,
// und fallen sonst auf den build-time-inlined `import.meta.env`-Wert zurück.
// In JEDEM Fall gilt: Eine Änderung im Vercel-Dashboard wirkt erst nach einem NEUEN
// Deploy — die reine Dashboard-Änderung reicht nicht.
export function isRegistrationEnabled(): boolean {
  const raw =
    (typeof process !== "undefined"
      ? process.env?.PUBLIC_REGISTRATION_ENABLED
      : undefined) ??
    (import.meta.env.PUBLIC_REGISTRATION_ENABLED as string | undefined);
  return raw === "true";
}
