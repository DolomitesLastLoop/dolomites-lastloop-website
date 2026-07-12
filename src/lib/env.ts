// Runtime-first Zugriff auf Environment-Variablen.
//
// Astro/Vite ersetzt `import.meta.env.X` mit STATISCHEM Key zur BUILD-Zeit durch
// einen Literal — auch für nicht-`PUBLIC_`-Secrets, sobald sie serverseitig so
// gelesen werden. Auf Vercel wird der Wert dadurch zum Build-Zeitpunkt eingebacken;
// eine spätere Dashboard-Änderung greift nicht mehr (vgl. Fehlerprotokoll 2026-07-10
// zu PUBLIC_REGISTRATION_ENABLED und src/lib/registration.ts).
//
// Deshalb: `process.env` (Vercel-Runtime) hat Vorrang. Als Fallback der DYNAMISCHE
// `import.meta.env[name]`-Zugriff — dynamische Keys werden von Vite NICHT inlined
// und liefern in lokalem `astro dev` die aus `.env` geladenen Werte.
export function env(name: string): string | undefined {
  const runtime =
    typeof process !== "undefined" ? process.env?.[name] : undefined;
  return (
    runtime ??
    (import.meta.env as unknown as Record<string, string | undefined>)[name]
  );
}
