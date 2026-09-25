# AGENTS.override.md — Dolomites Last Loop

> Projekt-Overrides für Agentic OS. Verfeinert/ergänzt `AGENTS.md`; loaded present-only via
> `bootstrap.md §1a`. **Relaxiert NIEMALS die Delivery Gates oder die No-Bypass-Rule** —
> projekt-spezifische Gates hier sind ausschließlich *additiv* (strenger, nie schwächer).

## Projekt-Metadaten

- **project_name:** Dolomites Last Loop
- **description:** Backyard Ultra Event Website 2027 (erste Ausgabe, Toblach/Dobbiaco, Südtirol)
- **tech_stack:** Astro 6 (SSR, `output: "server"`), Vercel (`@astrojs/vercel`), Supabase
  (Postgres + Storage, RLS), Stripe (Checkout + Webhook), Resend, Upstash (Rate Limiting),
  TypeScript, trilingual DE (Standard) / IT / EN

## Produktions-Pfade

> Overrides: AGENTS.md §References → `.agent/config.yaml production_paths` — Astro-Projektstruktur
> (Default `src/ app/ lib/ packages/` passt nicht; Code liegt unter `src/`).

- `src/`

## Projekt-Quality-Gates (additiv zu den Framework Delivery Gates)

> Ergänzt AGENTS.md §Delivery Gates — projekt-spezifische Ship-Kriterien. Diese Gates sind
> ZUSÄTZLICH und verschärfen; sie schwächen keine Framework-Gate ab.

- **Pen-Test 8/8 bestanden** (bereits erreicht — Standard halten, nicht regredieren)
- **Lighthouse ≥ 95**
- **`npm audit`: 0 High/Critical**
- **Build grün** vor jedem Deploy
- **Rate Limiting aktiv** (Upstash) auf allen schreibenden/öffentlichen Endpunkten

## Hinweise

- Fehlerprotokoll & Projekt-Kontext: siehe `CLAUDE.md` (bestehender Projekt-Inhalt bleibt
  maßgeblich; Agentic OS ergänzt nur den Governance-Layer).
- CSP/Header-Eigenheiten (Vercel kein per-Request-Nonce → ggf. `'unsafe-inline'` minimal):
  dokumentiert im Fehlerprotokoll der `CLAUDE.md`.
