@AGENTS.md

# Claude Integration Entry (Agentic OS)

`AGENTS.md` is auto-injected above via `@import` — Governance-Regeln, Gates und State-Model
sind bereits im Kontext. Projekt-spezifische Verfeinerungen stehen in `AGENTS.override.md`
(present-only via `bootstrap.md §1a` geladen). **Regeln aus AGENTS.md hier NICHT duplizieren.**

## Startup (jede Konversation)

1. **Vor jeder Datei-Änderung oder Completion-Behauptung den governed Flow aus `AGENTS.md` betreten — keine stillen Direkt-Edits.**
2. Task-Scope aus der User-Nachricht klassifizieren (`tiny-fix` / `quick-win` / `feature` / `architecture-change` / `hotfix`).
3. `.agentcortex/context/current_state.md` (SSoT) lesen. *(Bei tiny-fix überspringen.)*
4. `.agent/rules/engineering_guardrails.md` lesen. *(Bei tiny-fix/quick-win überspringen.)*
5. Falls `.agentcortex/context/work/<worklog-key>.md` existiert → zum Resume lesen.

## Slash Commands & Skills

`/command` → `.claude/commands/<command>.md` → kanonischer Workflow `.agent/workflows/<command>.md`.
Skill-Metadaten: `.agent/skills/*`; volle Anweisungen: `.agents/skills/*/SKILL.md`.

## Validate

`.agentcortex/bin/validate.sh` (bash) oder `.agentcortex/bin/validate.ps1` (PowerShell).

---

# CLAUDE.md – Dolomites Last Loop Website

> Projektspezifische Anweisungen für Claude Code. Die globalen Verhaltensregeln
> stehen ganz oben und gelten verbindlich.

---

## Globale Verhaltensregeln (verbindlich)

### 1. Plan First – Erst planen, dann coden
- Bevor du Code schreibst, erstelle immer einen expliziten Plan.
- Liste alle betroffenen Dateien und Abhängigkeiten auf.
- Warte auf meine Bestätigung bevor du implementierst.

### 2. Subagents – Komplexe Aufgaben aufteilen
- Teile große Aufgaben in parallele Teilaufgaben auf wo möglich.
- Fasse Ergebnisse am Ende zusammen.

### 3. Verify – Keine Aufgabe fertig ohne Verifikation
- Jede Aufgabe gilt erst als abgeschlossen wenn das Ergebnis verifiziert ist.
- Zeige mir das Ergebnis nach jeder Änderung.

### 4. Self-Improvement – Fehler notieren, nie wiederholen
- Wenn ein Fehler passiert, notiere ihn unter "Fehlerprotokoll" (siehe unten).
- Überprüfe vor jeder Session das Fehlerprotokoll.

### 5. Auto Bug Fix – Bugs autonom fixen
- Wenn du einen Bug findest: Analysiere, fixe und teste eigenständig.
- Informiere mich über: Ursache / Lösung / getestete Fälle.
- Eskaliere nur bei Bugs die Architekturentscheidungen erfordern.

---

## Was ist das?

Die offizielle **Event-Plattform für die „Dolomites Last Loop"** – das erste
**Backyard Ultra**-Rennen in den Dolomiten, in **Toblach/Dobbiaco** (Südtirol).
Erste Ausgabe **2027** (Datum folgt). Veranstalter: Sport OK Toblach.

Die Website ist mehrsprachig (**de** Standard, **it**, **en**) und deckt den
kompletten Teilnehmer-Lebenszyklus ab:

- Öffentliche Info-Seiten (Race-Info, FAQ, Galerie, Ergebnis-Archiv, Kontakt)
- **3-stufige Anmeldung** mit **Stripe Checkout** (Early-Bird / Standard) und
  Upload eines ärztlichen **Attests** (privater Supabase-Storage-Bucket)
- Live-**Startliste** aus Supabase, **Warteliste** und **Newsletter**
- Geschützter **Admin-Bereich** (Passwort-Login + HMAC-Session) mit
  Teilnehmer-Verwaltung, Attest-Prüfung und CSV-Exports
- Bestätigungs-Emails via **Resend**

## Tech Stack

- **Astro 6** im SSR-Modus (`output: "server"`), deployt auf **Vercel**
  (`@astrojs/vercel`, `maxDuration: 30`, Web Analytics aktiv) — Upgrade 4→6 am
  2026-06-16 (Security, siehe Fehlerprotokoll). Adapter-Import ist `@astrojs/vercel`
  (nicht mehr `/serverless`).
- **Vanilla CSS** (keine UI-Frameworks) – globale Styles in `src/styles/global.css`
- **Supabase** (`@supabase/supabase-js`) – Postgres + Storage (Bucket `atteste`), mit RLS
- **Stripe** (`stripe`) – Checkout + Webhook
- **Resend** (`resend`) – transaktionale Emails
- **TypeScript 5**, **Sharp** (Bildkompression), Node **22.x** (Astro 6 erfordert
  Node ≥22.12 → Vercel-Projekt-Runtime auf 22.x stellen)
- **Upstash Redis** (`@upstash/ratelimit` + `@upstash/redis`) – Rate-Limiting der
  öffentlichen API-Endpoints (`src/lib/ratelimit.ts`)
- Eigene **i18n** (`src/i18n/`) statt Astro-Integration

## Projektstruktur

```
dolomites-lastloop-website/
├── astro.config.mjs           # SSR + Vercel-Adapter, site-URL, prefetch
├── vercel.json                # Security-Header + no-store für Stripe-Webhook
├── .env.example               # alle benötigten Secrets (Supabase/Stripe/Resend/Admin)
├── scripts/compress-images.mjs# Bild-Optimierung (Sharp)
├── supabase/schema.sql        # DB-Schema + RLS-Policies (einmalig im SQL-Editor ausführen)
├── public/                    # favicon, robots.txt, images/
└── src/
    ├── components/            # Header, Footer, Hero, PageHero, Newsletter,
    │                          #   LanguageSwitcher, Marquee, Testimonials,
    │                          #   StorySplit, AthletesEmotion, MountainSilhouette …
    ├── i18n/                  # ui.ts (Strings), faq.ts, utils.ts
    ├── layouts/BaseLayout.astro  # SEO, Fonts, Header/Footer
    ├── lib/                   # supabase.ts, stripe.ts, email.ts, auth.ts, photos.ts
    ├── pages/
    │   ├── index.astro            → Redirect /de
    │   ├── [lang]/                # index, race-info, anmeldung, startliste,
    │   │                          #   ergebnisse, galerie, faq, kontakt, [legal]
    │   ├── admin/                 # login.astro + index.astro (geschützt)
    │   ├── api/                   # checkout, stripe-webhook, contact, newsletter,
    │   │                          #   waitlist, upload-attest, admin/* (export,
    │   │                          #   participants, attest, logout)
    │   └── sitemap.xml.ts
    └── styles/global.css
```

## Datenmodell (Supabase, `supabase/schema.sql`)

- **participants** – Anmeldungen: Name, Email (unique), Geburtsdatum,
  `ticket_status` (`pending|confirmed|waitlist|cancelled`), `attest_url` +
  `attest_status` (`missing|pending|approved|rejected`), `startnummer`,
  `stripe_session_id`. Datums-/Zeitfelder als `date` bzw. `timestamptz`.
- **waitlist** – Email (unique) + Name
- **newsletter** – Email (unique)
- **results** – Archiv: `year`, `place`, `name`, `nationalitaet`, `runden`
  (unique `(year, place)`)
- **RLS aktiv**: anon darf nur lesen – `participants` nur Status
  `confirmed|waitlist` (für die öffentliche Startliste), `results` voll lesbar.
  Schreibzugriff ausschließlich über den **Service-Role-Key** (umgeht RLS, nur serverseitig).
- **Storage**: privater Bucket `atteste` – Atteste werden über **signierte URLs** ausgeliefert.

## Wie man es startet (lokal)

```bash
# 1. Dependencies
npm install

# 2. .env aus Vorlage anlegen und Werte eintragen
cp .env.example .env

# 3. Dev-Server
npm run dev          # → http://localhost:4321  (leitet auf /de)
```

Weitere Scripts: `npm run build` · `npm run preview` · `npm run astro`.

**Einmalige Einrichtung der Dienste** (Details im `README.md`):
1. **Supabase**: Projekt anlegen, `supabase/schema.sql` im SQL-Editor ausführen,
   privaten Bucket `atteste` erstellen, URL + Anon-Key + Service-Role-Key in `.env`.
2. **Stripe**: API-Keys, zwei Preise (Early-Bird / Standard), Webhook auf
   `https://DOMAIN/api/stripe-webhook` (Event `checkout.session.completed`),
   Signing-Secret in `.env`.
3. **Resend**: API-Key + verifizierte Absenderdomain, `EMAIL_FROM`/`EMAIL_REPLY_TO`.
4. **Admin**: `ADMIN_PASSWORD` + `ADMIN_SESSION_SECRET` (min. 32 Zeichen).

## Wichtige Endpoints / Routen

Öffentlich: `/{de|it|en}/` · `/race-info` · `/anmeldung` · `/startliste` ·
`/ergebnisse` · `/galerie` · `/faq` · `/kontakt` · `/[legal]` (Impressum/Datenschutz).
Admin: `/admin/login`, `/admin`. API (`src/pages/api/`): `checkout`,
`stripe-webhook`, `upload-attest`, `contact`, `newsletter`, `waitlist`,
`admin/export` (`?type=participants|waitlist|newsletter`), `admin/participants`,
`admin/attest`, `admin/logout`. Dazu `/sitemap.xml`.

## Konventionen & Sicherheit

- **Niemals** den `SUPABASE_SERVICE_ROLE_KEY` oder andere Secrets clientseitig
  verwenden – nur in `src/lib/*` / API-Routen (serverseitig). Nur `PUBLIC_*`-Vars
  sind im Browser sichtbar.
- Texte gehören in `src/i18n/ui.ts` (+ `faq.ts`), nicht hartcodiert – alle drei
  Sprachen pflegen.
- Stripe-Webhook bleibt `no-store` (siehe `vercel.json`); Security-Header dort zentral.
- Atteste sind sensible Gesundheitsdaten → Bucket privat halten, nur signierte URLs.
- Deployment: Repo mit Vercel verbinden, Env-Vars aus `.env.example` im
  Vercel-Dashboard setzen.
- **Brevo Newsletter**: `BREVO_API_KEY` + `BREVO_LIST_ID` müssen im **Vercel-Dashboard**
  gesetzt werden (Production + Preview). `BREVO_LIST_ID` ist eine reine Zahl. Lokal in
  `.env` Werte mit `#` quoten/ohne `#` schreiben (dotenv schneidet sonst ab `#` ab –
  `src/lib/brevo.ts` filtert defensiv auf Ziffern). Fehlt die Config, wird Brevo still
  übersprungen und nur Supabase (Admin-Panel) befüllt.

---

## Fehlerprotokoll

> Hier neu auftretende Fehler + Ursache + Lösung notieren (Regel 4).

### 2026-07-10 — Anmeldeformular live trotz Flag=false (Feature-Gate unzureichend)

- **Symptom:** Öffentliches Anmelde-/Zahlungsformular auf der Live-Domain sichtbar, obwohl
  `PUBLIC_REGISTRATION_ENABLED=false` (und nach Löschen weiterhin). Live bestätigt auf
  `dolomites-lastloop-website.vercel.app/de/anmeldung` (HTTP 200, volles Formular).
- **NICHT die Ursache:** Truthy-String-Bug — `anmeldung.astro` prüfte bereits fail-safe
  `=== "true"`. Der naheliegende „Fix" wäre ein No-Op gewesen.
- **Ursache 1 (Build-Zeit-Inlining):** `PUBLIC_*`-Vars werden von Astro/Vite zur BUILD-Zeit
  ins Bundle gebacken. Eine Env-Änderung im Vercel-Dashboard wirkt erst nach einem NEUEN
  Deploy — „Variable löschen" ohne Redeploy ändert nichts.
- **Ursache 2 (Gate versteckte nur UI):** `/api/checkout` und die Route
  `anmeldung-test.astro` (flag-ignorierendes Vollformular, öffentlich) prüften das Flag
  gar nicht → Zahlungsweg per direktem POST offen, Formular per Direkt-URL erreichbar.
- **Lösung:** Zentraler fail-safe Helper `src/lib/registration.ts` (`isRegistrationEnabled()`,
  liest `process.env` runtime-first, dann `import.meta.env`, Default deaktiviert). Genutzt von
  `anmeldung.astro` UND `/api/checkout` (403-Gate am POST-Anfang). `anmeldung-test.astro`
  in Production 404 (`import.meta.env.PROD`). `upload-attest` bewusst NICHT flag-gegatet —
  Token-Auth (`attest_token`) ist dort die richtige Grenze, damit bereits bezahlte
  Teilnehmer ihr Attest weiter hochladen können.
- **Merkregel:** Ein `PUBLIC_`-Flag ist als Security-Kill-Switch unzureichend — (a) build-
  time-inlined → Redeploy zwingend; (b) es versteckt nur UI, jeder serverseitige Pfad muss
  separat gegatet werden.

### 2026-06-11 — supabase-js crasht auf Vercel (Node 20 ohne natives WebSocket)

- Problem: `createClient()` wirft auf Node <22 „Node.js 20 detected without native WebSocket support" (RealtimeClient-Konstruktor läuft immer, auch wenn Realtime ungenutzt ist). Lokal unsichtbar (Node 24), in Production 500 auf allen Supabase-Routen.
- Lösung: `ws`-Paket installiert und in `src/lib/supabase.ts` als `realtime: { transport: ws }` übergeben. Ab Node-22-Runtime wäre das überflüssig.
- Außerdem gelernt: Vercel Production hatte bis 2026-06-11 GAR KEINE Env-Vars gesetzt (alle via `vercel env add` nachgezogen); deploymentspezifische `*-hash.vercel.app`-URLs liefern 401 (Deployment Protection) — zum Testen die stabile Alias-URL `dolomites-lastloop-website.vercel.app` nutzen.

### 2026-06-11 — .env.local überschreibt .env

- `vercel env pull .env.local` hat eine (damals leere) Production-Env als `.env.local` gespeichert — Vite priorisiert `.env.local` über `.env` → „Missing environment variable" trotz korrekter `.env`. Lösung: `.env.local` löschen bzw. Pull-Backups anders benennen.

### 2026-06-10 — Lokale .env: dotenv-Fallstricke (#, $, URL-Verwechslung)

- Problem 1: In `PUBLIC_SUPABASE_URL` war ein API-Key (`sb_publishable_…`) statt der Projekt-URL eingetragen → `Invalid supabaseUrl`, 500 auf allen Supabase-Routen. Die korrekte URL (`https://<ref>.supabase.co`) lässt sich aus dem `ref`-Feld im Anon-JWT ableiten.
- Problem 2: `ADMIN_PASSWORD` enthielt ein `#` → Vite/dotenv schneidet unquoted ab `#` als Kommentar ab; der Server lud nur den vorderen Teil, Login schlug fehl. Lösung: Wert in doppelte Anführungszeichen setzen. Gilt NUR lokal — Vercel-Env-Vars werden nicht dotenv-geparst.
- Merkregel: Werte mit `#`, `$` oder Leerzeichen in `.env` immer quoten.

### 2026-06-10 — SVG stroke-dashoffset nicht via CSS-Property animieren

- Problem: GSAP-Tween auf `strokeDashoffset` (CSS) bei `<circle pathLength="1">` interpolierte nicht — Wert sprang binär 1px→0px (LoopCircle zeichnete sich nicht auf).
- Lösung: Als **Attribut** animieren: `gsap.fromTo(el, { attr: { "stroke-dashoffset": 1 } }, { attr: { "stroke-dashoffset": 0 } })`. Wichtig: `stroke-dashoffset` darf dann NICHT im CSS gesetzt sein (CSS überschreibt das Attribut).
- Verifiziert per Playwright-Sampling: Werte interpolieren jetzt kontinuierlich (1 → 0.82 → 0.56 → 0.18 → 0).

### 2026-06-10 — Animations-Architektur (Referenz)

- Alle Scroll-Animationen zentral in `src/scripts/cinematic.ts` (GSAP + ScrollTrigger + SplitText + Lenis), geladen via BaseLayout. Komponenten tragen nur Markup + data-Attribute (`data-hero-title`, `data-fb-parallax`, `data-loop-draw`, `data-hero-particles`).
- Guards: kein Lenis/keine Animationen auf `/admin` und bei `prefers-reduced-motion`; Mobile (<900px) nur einfache Fades (`gsap.matchMedia`).
- Komponenten dürfen Inhalte NIE per CSS verstecken (kein `opacity: 0` im Stylesheet) — GSAP `from()` übernimmt das zur Laufzeit, sonst bleibt Content bei reduced-motion/ohne JS unsichtbar.

### 2026-06-06 — Security-Hardening (Council-Review)

**Fix 1 — CSP Header**
- `vercel.json`: `Content-Security-Policy` Header ergänzt für alle Routes.
- Direktiven: `default-src 'self'`, `connect-src` für Stripe+Supabase, `object-src 'none'`, `base-uri 'self'`, `form-action 'self' https://checkout.stripe.com`.
- `'unsafe-inline'` für script/style nötig (Astro SSR + Vercel-Headers ohne Nonce-Support).

**Fix 2 — Race Condition Startnummer**
- Problem: count→nextNumber→update war nicht atomar; zwei simultane Stripe-Webhooks konnten dieselbe Startnummer vergeben.
- Lösung: Postgres-Funktion `confirm_participant(p_id, p_max)` in `supabase/schema.sql` mit `pg_advisory_xact_lock(8675309)`. Serialisiert alle gleichzeitigen Aufrufe; SELECT+UPDATE laufen in derselben Transaktion.
- `stripe-webhook.ts` nutzt jetzt `.rpc("confirm_participant", ...)` statt zwei separaten Queries.
- **Deployment-Hinweis:** Funktion einmalig im Supabase SQL-Editor ausführen (oder Migration). `CREATE OR REPLACE` ist idempotent.

**Fix 3 — Attest ohne Auth**
- Problem: Jeder mit einer Teilnehmer-UUID konnte Atteste hochladen (kein Token-Check).
- Lösung: `attest_token` (32 zufällige Bytes hex) wird bei Webhook-Bestätigung generiert, in DB gespeichert, und via Email als Upload-Link `?id=...&token=...` versandt.
- `upload-attest.ts`: prüft jetzt `participant_id` UND `attest_token` gemeinsam gegen DB (`.eq("attest_token", ...)`); 403 bei Mismatch.
- `anmeldung.astro`: hidden Token-Input, Auto-fill aus URL-Params, ID-Feld wird bei Auto-fill versteckt.
- `email.ts`: Signature um `participantId` + `attestToken` erweitert, Upload-Link im Email-Body.
- **Deployment-Hinweis:** `ALTER TABLE participants ADD COLUMN IF NOT EXISTS attest_token text` muss in Supabase laufen (ist in `schema.sql` als idempotenter `ALTER` ergänzt).

### 2026-06-16 — Security-Härtung (Pen-Test-Follow-up, 4 Fixes)

Nach simuliertem Pen-Test (6/8 bestanden) vier Fixes umgesetzt:

**Fix 1 — Rate-Limiting öffentliche Endpoints**
- Neu `src/lib/ratelimit.ts` (Upstash Redis, Sliding-Window pro IP via `x-forwarded-for`).
  Limits: contact 5/60s, newsletter/waitlist/upload-attest je 3/60s. 429 + `Retry-After`.
- In `contact.ts`, `newsletter.ts`, `waitlist.ts`, `upload-attest.ts` integriert.
- **Fail-open**: ohne `UPSTASH_REDIS_REST_URL`/`_TOKEN` oder bei Upstash-Ausfall werden
  Requests durchgelassen (Verfügbarkeit > Limit). Keys müssen im Vercel-Dashboard gesetzt
  werden, sonst ist das Limit inaktiv.

**Fix 2 — RLS-Härtung participants (PII-Leak-Prävention)**
- Vorher hatte `anon` eine SELECT-Policy auf der ganzen `participants`-Tabelle → alle
  Spalten (email, geburtsdatum, notfallkontakt_tel, **attest_token**, stripe_session_id)
  über direkten PostgREST-Zugriff lesbar. Spaltenschutz lag nur in den App-Queries.
- Lösung in `supabase/schema.sql`: View `participants_public` (nur id, vorname, nachname,
  nationalitaet, status, startnummer, created_at; gefiltert auf confirmed/waitlist).
  `grant select` nur an anon/authenticated; auf der Basistabelle anon-Policy **und** -Grant
  entfernt. `startliste.astro` liest jetzt via `getPublicClient()` aus der View
  (Alias `status→ticket_status`, Rendering unverändert).
- **Deployment-Pflicht:** `supabase/schema.sql` im Supabase SQL-Editor ausführen, sonst
  PGRST205 → Startliste fällt (try/catch) auf leer zurück.

**Fix 3 — Astro 4 → 6.4.7 Upgrade**
- Schließt die laufzeitrelevanten Astro-CVEs (XSS, Host-Header-SSRF, Auth-Bypass).
- `@astrojs/vercel` 7 → 10, Config-Import `@astrojs/vercel/serverless` → `@astrojs/vercel`,
  `engines.node` 20.x → 22.x (Astro 6 braucht ≥22.12).
- `path-to-regexp` via `overrides` auf ^6.3.0 gehoben (ReDoS).
- **Restliche `npm audit`-HIGH (esbuild/vite) sind Dev-Server-/Deno-/Windows-only**, im
  Prod-Runtime nicht exponiert und gehören zu Astros Toolchain. **NIEMALS `npm audit fix
  --force`** ausführen — das würde Astro auf v2 downgraden.

**Fix 4 — CSP-Härtung (`vercel.json`)**
- `frame-ancestors 'self'` ergänzt, `X-Frame-Options: SAMEORIGIN → DENY`,
  `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Embedder-Policy: credentialless`.
- COEP bewusst `credentialless` statt `require-corp`: `require-corp` würde die per
  `img-src https:` erlaubten Cross-Origin-Bilder/Stripe-Ressourcen ohne CORP-Header
  blockieren. Umschalten auf `require-corp` erst nach Browser-Test.
- `'unsafe-inline'` bleibt (Astro SSR ohne Nonce-Support); `'unsafe-eval'` bleibt geblockt.

## Nächste Schritte
- [ ] **Upstash-Keys im Vercel-Dashboard setzen** (`UPSTASH_REDIS_REST_URL`/`_TOKEN`) → Rate-Limiting scharf schalten
- [ ] **Brevo-Keys im Vercel-Dashboard setzen** (`BREVO_API_KEY`/`BREVO_LIST_ID`) → Newsletter geht live an Brevo
- [ ] **`supabase/schema.sql` im Supabase SQL-Editor ausführen** → View `participants_public` anlegen
- [ ] **Vercel-Runtime auf Node 22.x** stellen (Astro 6)
- [ ] Domain ändern
- [ ] Stripe einrichten
- [ ] Datenschutz, AGB usw. einrichten
