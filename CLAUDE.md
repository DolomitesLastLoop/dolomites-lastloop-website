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
**Erste Ausgabe 2026** (bereits stattgefunden); **zweite Ausgabe 2027** in
Vorbereitung (Datum folgt). Veranstalter: Sport OK Toblach.

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
- **Brevo – zwei Listen, zwei Rechtsgrundlagen**: `src/lib/brevo.ts` schreibt in zwei
  getrennte Listen, gesteuert über `addBrevoContact({ list })`:
  - `list: "newsletter"` (Default) → `BREVO_LIST_ID` (=3), Aufrufer `/api/newsletter`.
    Rechtsgrundlage **Einwilligung** (Art. 6 Abs. 1 lit. a).
  - `list: "participants"` → `BREVO_PARTICIPANT_LIST_ID` (=4 „DLL Teilnehmer 2027"),
    Aufrufer `stripe-webhook.ts` im confirmed-Pfad. Rechtsgrundlage **Vertragserfüllung**
    (Art. 6 Abs. 1 lit. b) für Sicherheits-/Organisationsinfos – keine Einwilligung nötig.
    Der Sync läuft **nach** dem Mailversand in eigenem try/catch und darf Bestätigungsmail,
    Ticket-PDF und Webhook-Response nie beeinflussen (nur `console.error`).
  `BREVO_API_KEY` + **beide** Listen-IDs müssen im **Vercel-Dashboard** gesetzt werden
  (Production + Preview); Listen-IDs sind reine Zahlen. Lokal in `.env` Werte mit `#`
  quoten/ohne `#` schreiben (dotenv schneidet sonst ab `#` ab – `brevo.ts` filtert
  defensiv auf Ziffern). Fehlt die Config, wird Brevo still übersprungen und nur
  Supabase (Admin-Panel) befüllt.
- **Brevo-Attributnamen**: Das Konto nutzt `VORNAME`/`NACHNAME` (nicht `FIRSTNAME`/
  `LASTNAME`). Unbekannte Attribute verwirft Brevo **still** – der Kontakt landet ohne
  Namen in der Liste, der Request meldet trotzdem Erfolg. Vor dem Ergänzen neuer
  Attribute die Liste per Brevo-API (`/v3/contacts/attributes`) prüfen.

---

## Fehlerprotokoll

> Hier neu auftretende Fehler + Ursache + Lösung notieren (Regel 4).

### 2026-08-09 — Google-Maps-Iframe geblockt: ZWEI Blocker, der zweite (COEP) schweigt

- **Symptom:** Auf `/{lang}/kontakt` statt der Karte Chromes Platzhalter „This content is
  blocked. Contact the site owner to fix the issue."
- **Ursache 1 (laut, CSP):** Die CSP in `vercel.json` deklarierte **weder `frame-src` noch
  `child-src`** → Fallback auf `default-src 'self'` → jedes Cross-Origin-Iframe geblockt.
  Erzeugt die sichtbare Chrome-Meldung und einen Console-Error.
- **Ursache 2 (STILL, COEP):** `Cross-Origin-Embedder-Policy: credentialless` (seit der
  Härtung 2026-06-16) blockt Cross-Origin-Iframes zusätzlich, wenn das eingebettete
  Dokument nicht selbst COEP setzt. Google Maps sendet **kein** COEP (per curl belegt:
  die Endantwort von `/maps/embed` hat weder COEP noch `X-Frame-Options`).
- ⚠️ **Kernlektion:** Der COEP-Block ist **komplett still** — kein Console-Error, keine
  Warnung, nur ein leeres Iframe. Wer nur die CSP fixt, sieht die Karte weiterhin nicht und
  hat *keinen* Hinweis in der Console. Eine leere Console ist hier **kein** Beweis, dass es
  nicht am Browser-Enforcement liegt.
- **Lösung (beide nötig, keiner allein reicht):**
  1. `vercel.json`: `frame-src 'self' https://www.google.com;` ergänzt. Exakter Host statt
     Wildcard — die Embed-URL redirected `/maps?q=…&output=embed` → `/maps/embed`, bleibt
     aber auf `www.google.com`. Kein `child-src` nötig (`frame-src` hat Vorrang).
  2. `src/pages/[lang]/kontakt.astro`: `credentialless`-Attribut am `<iframe>`. Browser
     ohne Support ignorieren das unbekannte Attribut.
  - COEP bewusst **nicht** global gelockert — die Härtung von 2026-06-16 bleibt intakt.
- **Verifiziert (Live-URL nach Deploy, headless Chromium, frischer Kontext):** Karte rendert
  auf Desktop 1440×900 und Mobile-Viewport 390×844, je 0 Console-Errors. Gegenprobe auf
  derselben Seite: identisches Iframe **ohne** `credentialless` → leer; Kontrolle mit
  gleicher DOM-Ersetzung **mit** `credentialless` → rendert. Damit ist Ursache 2 als
  eigenständiger Blocker bewiesen, nicht bloß vermutet.
- **Offen / nicht verifiziert:** Nur Chromium getestet. **Safari kennt `credentialless`
  nicht** — ob die Karte im iOS-Safari lädt, ist ungeprüft. Falls dort weiterhin leer, wäre
  der nächste Schritt ein route-spezifischer COEP-Override nur für `/*/kontakt`, nicht global.
- **Merkregel:** Beim Einbetten fremder Iframes IMMER beide Ebenen prüfen — CSP `frame-src`
  **und** COEP. Und: `vercel.json`-Header greifen **nicht** im Dev-Server (`npm run dev`) —
  „geht lokal" sagt über CSP/COEP nichts aus.

### 2026-07-13 — Screenshot-Verifikation: GSAP-Reveal-Zwischenzustände nicht als Endzustand interpretieren

- **Symptom:** Nach Scroll-Sprung (`scrollTo` instant) zeigten Screenshots der Retro-Sektion
  nur eine graue Fläche — sah aus wie "Bild kaputt/Overlay zu dunkel", war aber nur die
  Scroll-Reveal-Animation mitten im Fade. Sekunden später (eingeschwungen) war alles korrekt.
- **Fast-Fehldiagnose:** Overlay wurde zweimal "gefixt", obwohl der erste Wert evtl. schon
  sichtbar gewesen wäre. (Die Aufhellung war am Ende trotzdem nötig — Original-Overlay mit
  0.6/0.78 + 0.2/0.7 Alpha verschluckte jedes Motiv auch im Endzustand.)
- **Merkregel:** Bei visueller Verifikation von Sektionen mit `cinematic.ts`-Animationen
  entweder (a) nach dem Scroll 2-3s warten und erneut screenshotten, oder (b) headless mit
  `reducedMotion: 'reduce'` rendern (Animationen aus, Inhalt sofort sichtbar — Guard in
  cinematic.ts). Für Crop-/Fokuspunkt-Checks ist (b) zuverlässiger.
- **Außerdem gelernt:** Der opake Header verdeckt die oberen ~85px jedes PageHero
  (negativer Margin unter die Nav) — bei `object-position`-Werten einrechnen. Hochformat-
  Fotos in 56vh-Heroes zeigen auf Desktop nur ~23% der Bildhöhe.

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

### 2026-07-11 — Secrets build-time inlined (`import.meta.env`) → Preview: „Invalid API Key: sk_test_xxx"

- **Symptom:** Checkout auf einem Preview-Deployment schlug mit `Invalid API Key provided:
  sk_test_xxx` fehl, obwohl der Preview-scoped `STRIPE_SECRET_KEY` (vermeintlich) neu gesetzt
  und redeployed wurde. Der Literal-String `sk_test_xxx` (= Platzhalter aus `.env.example`)
  bewies, dass die Runtime tatsächlich den Platzhalter sendete (Stripe maskiert echte Keys).
- **Ursache:** `src/lib/stripe.ts` (u. a.) las Secrets über `import.meta.env.X` auf Modul-Ebene.
  Astro/Vite ersetzt `import.meta.env.X` mit **statischem** Key zur **BUILD-Zeit** durch einen
  Literal — **auch für nicht-`PUBLIC_`-Secrets**. Der Wert vom Build-Zeitpunkt wurde in den
  Server-Bundle eingebacken; Dashboard-Änderung + Redeploy griffen nicht (verschärft durch eine
  als „Sensitive" markierte, nicht auslesbare Vercel-Var + Build-Cache). Bewiesen per lokalem
  `astro build` + `grep`: der gebaute Chunk enthielt den Key-Literal, **keinen** Runtime-Lookup.
- **Lösung:** Neuer Helper `src/lib/env.ts` — `env(name)` liest `process.env` (Vercel-Runtime)
  zuerst, dann **dynamisch** `import.meta.env[name]` (dynamischer Key wird von Vite NICHT inlined;
  nur Local-Dev-Fallback). Analog zum bereits vorhandenen `src/lib/registration.ts`. Umgestellt:
  `STRIPE_SECRET_KEY`, `STRIPE_PRICE_*`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`,
  `EMAIL_FROM/REPLY_TO`, `PUBLIC_SUPABASE_*`/`SUPABASE_SERVICE_ROLE_KEY`, `MAX_PARTICIPANTS`,
  `PUBLIC_SITE_URL` (checkout/sitemap/BaseLayout). Client-seitiger
  `PUBLIC_STRIPE_PUBLISHABLE_KEY` bleibt unangetastet.
- **Verifiziert:** grep pro Secret im gebauten Server-Chunk → kein Literal mehr; E2E-Test auf
  Preview grün (Formular → Zahlung → Webhook 200 → Resend-Mail → Attest-Upload → Startliste).
- **Merkregel:** Secrets serverseitig NIE über statisches `import.meta.env.X` lesen — immer
  runtime-first `process.env` (bzw. dynamischer Key via `@lib/env`). Sonst build-time-inlined
  wie bei `PUBLIC_`-Vars.
- **Offen (gleiche Klasse, NICHT in diesem PR):** `auth.ts` (`ADMIN_*`), `ratelimit.ts`
  (`UPSTASH_*`), `brevo.ts` (`BREVO_*`) lesen ebenfalls via `import.meta.env` → als Follow-up
  auf `@lib/env` umstellen.

## Nächste Schritte

### Webhook-Verifikation (Stand 2026-08-14) — Zustellung belegt, Kette noch nicht

**Der Live-Webhook ist korrekt verdrahtet und die Zustellung ist durch einen echten
1-€-Live-Testkauf bewiesen.**

- Endpoint `we_1U4L52FkID7E6ePcjGNz3CNJ` (angelegt 2026-08-14 15:23 CEST):
  URL `https://www.dolomiteslastloop.com/api/stripe-webhook`, Events
  `checkout.session.completed` **und** `checkout.session.expired`, `status: enabled`,
  `livemode: true`.
- ⚠️ **Die URL MUSS `www.` enthalten.** `dolomiteslastloop.com` ist in Vercel ein
  308-Redirect auf `www.dolomiteslastloop.com`, und **Stripe folgt bei der Zustellung
  keinen Redirects**. Ohne `www` schlägt jede Zustellung fehl, und zwar **spurlos** —
  der Redirect passiert am Edge, in den Function-Logs taucht nichts auf. Eine leere
  Log-Ansicht ist hier also kein Beweis, dass Stripe nichts geschickt hat.
- **Beleg (2026-08-14):** Live-Session `cs_live_a1qwMHO6qq2…` über 1,00 € (inline
  `price_data`, bewusst **ohne** `participant_id`-Metadatum), bezahlt 16:14 CEST
  → Vercel-Log `POST /api/stripe-webhook 200` um 16:14:16 CEST auf `dpl_E3wqJJ…`.
  Damit sind Ziel-URL, Signaturprüfung und `STRIPE_WEBHOOK_SECRET` in Production
  verifiziert. Die 1 € wurden bewusst **nicht** erstattet.
- **Gegenprobe auf Seiteneffekte (alle drei leer):** `participants` = 0 Zeilen,
  Brevo-Liste 4 „DLL Teilnehmer 2027" = 0 Kontakte, keine Mail. Der Handler steigt bei
  fehlendem `participant_id` in `stripe-webhook.ts:56` mit 200 aus, **bevor**
  `getAdminClient()`, `confirm_participant`, Resend oder Brevo aufgerufen werden.
- ❗ **Noch NICHT belegt: die Kette hinter dem 200.** `confirm_participant`,
  Startnummern-Vergabe, Bestätigungsmail, Ticket-PDF und Brevo-Sync sind über den
  echten Webhook-Pfad nie gelaufen. Dafür braucht es einen vollständigen Kauf **mit**
  `participant_id` — sinnvoll ab dem 01.09.2026, wenn sich das Anmeldefenster von
  selbst öffnet und kein `TIER_WINDOWS`-Trick nötig ist. Deckt sich mit dem offenen
  Punkt „Ticket-PDF-Fixes end-to-end verifizieren".
- **Kein Staging:** Es existiert genau **ein** Supabase-Projekt
  (`vsicpbxscbtxqbmarlly`), Preview und Production teilen es sich. Jeder Preview-Branch-
  Test mit echtem Checkout schreibt damit in die **Live-Datenbank** und verbrennt über
  `confirm_participant` eine echte Startnummer. Vor solchen Tests bewusst entscheiden.
- **Vercel-Env-Fallstrick:** Die Spalte `created` in `vercel env ls` ändert sich bei einer
  Wertänderung **nicht** — sie sagt nichts darüber aus, wie alt der Wert ist. Wer wissen
  will, wann eine Variable zuletzt angefasst wurde, braucht `updatedAt` aus
  `GET /v9/projects/<id>/env`. (Aufgesessen am 2026-08-14: die gesamte Stripe-Config sah
  „64 Tage alt" aus, war aber am 11.08. um 19:22–19:24 komplett neu gesetzt worden.)
  Ergänzend: Variablen vom Typ `sensitive` (u. a. `PUBLIC_SUPABASE_URL`) sind
  **unwiderruflich nicht auslesbar** — weder per API noch im Dashboard.

- [x] **Lokale `.env`: toter 1-€-Testpreis ersetzt** *(2026-08-14 erledigt)*. Der alte
  `price_1U3JYEFkID7E6ePcz7xDu0Bj` gehört zum archivierten Produkt `prod_V3QPGoicearXx8`
  („TEST — NICHT FÜR ECHTE ANMELDUNGEN"); Stripe lehnt ihn ab mit *„Price is not available
  to be purchased because its product is not active."* Ersetzt durch
  `price_1U4LzCFkID7E6ePcXoTvPETt` (Produkt `prod_V4Uz4lQmdwaVBB` „Lokaler Test-Preis
  (1 EUR)", beide aktiv). Nur in der lokalen `.env` — **Production war nie betroffen** und
  bleibt auf dem echten Early-Bird-Preis (`prod_V3OuWKVWi6R90h`, 75 €).
  ⚠️ Merkregel: Ein archiviertes **Produkt** macht auch einen weiterhin „aktiven" **Preis**
  unbrauchbar — beim Debuggen von Checkout-Fehlern immer beide Ebenen prüfen.

### Athleten-Freiplätze (Stand 2026-08-15, Branch `feat/athlete-discount-code`)

100-%-Rabattcode für eingeladene Athleten, einlösbar im Early-Bird-Fenster.

- **Stripe (live, `acct_1To4lEFkID7E6ePc`):** Coupon `n7mskSv2` („Athleten-Freiplatz 2027",
  `percent_off: 100`, `duration: once`) mit Promotion Code `promo_1U4h2HFkID7E6ePcF93jT7RH`
  — 20 Einlösungen, Ablauf 31.12.2026 23:59:59 MEZ (Unix `1798757999`, exakt **1 Sekunde**
  vor `TIER_WINDOWS.early_bird.until` aus `src/lib/stripe.ts`).
- ⚠️ **Der Code-String steht bewusst NIRGENDS im Repo** — nicht hier, nicht in Kommentaren,
  nicht in Tests. Das Repo liegt auf GitHub; ein Klartext-Code wäre faktisch öffentlich.
  Nachschauen: **[siehe Stripe Dashboard]** → Coupons → „Athleten-Freiplatz 2027".
- ⚠️ Ein Promotion Code ist **unwiderruflich**: er lässt sich nur auf `active: false` setzen,
  nie löschen und nie umbenennen. Der String ist im Konto dauerhaft belegt.
- `src/pages/api/checkout.ts` setzt `allow_promotion_codes: true` (Commit `1fbc1f7`). Damit ist
  das Code-Feld für **alle** Besucher sichtbar — der Schutz liegt allein in der Geheimhaltung
  des Strings und im Limit von 20. Jede Einlösung verbraucht über `confirm_participant` eine
  echte Startnummer. Wer das dichter will: Code serverseitig per `discounts: [{promotion_code}]`
  setzen (Feld bleibt unsichtbar), braucht aber einen Athleten-Token-Mechanismus.
- **Kein Webhook-Fix nötig — geprüft, nicht angenommen.** `stripe-webhook.ts` gatet
  ausschließlich auf `event.type === "checkout.session.completed"` (Z. 53) und
  `session.metadata.participant_id` (Z. 55) — **nie** auf `payment_status` oder
  `payment_intent`. Genau das verlangt Stripe für *no-cost orders*: solche Sessions haben
  **keinen PaymentIntent** und melden `payment_status: 'no_payment_required'` statt `'paid'`.
  Auch der Overflow-Refund (Z. 80–91) ist durch `if (paymentIntent)` abgesichert und
  überspringt korrekt, wenn nichts gezahlt wurde. `apiVersion` ist `2024-06-20`; no-cost
  orders verlangen ≥ `2023-08-16`.
- **Verifiziert (2026-08-15):** Probe-Session gegen den echten Early-Bird-Preis
  (`price_1U3I74FkID7E6ePcN5Ek6aZw`, 75 €) → `amount_subtotal 7500` → **`amount_total 0`**,
  `discount_amount 7500`, `payment_intent: null`, `payment_method_collection: "if_required"`.
  Session danach auf `expired` gesetzt; `times_redeemed` steht auf **0/20** — kein Athletenplatz
  verbraucht. Dazu `astro check` 0 Errors und `npm run build` grün.
- [ ] **Offen — kompletter Gratis-Durchlauf** (Abschluss → Webhook → `confirm_participant` →
  Startnummer → Bestätigungsmail → Ticket-PDF). `payment_status` ist an einer *offenen* Session
  immer `unpaid`; `no_payment_required` entsteht erst beim Abschluss. Testbar erst in
  **Phase B**, wenn das Registrierungsfenster kurz geöffnet wird — bis 01.09.2026 liefert
  `currentTier()` `null` und `/api/checkout` antwortet 403. Deckt sich mit dem offenen Punkt
  „Kette hinter dem 200" oben.

### Galerie – Sieder-Fotos (Stand 2026-08-14, Branch `feat/gallery-sieder-photos`)

- [x] **Vercel-Preview-Verifikation für die Galerie-Bilder** *(2026-08-14 erledigt, Commit
  `a715aea`, Deployment `dpl_AbjHdAdg7ZQFKsj2i2aZSRRhJNoA`)*. Die offene Frage war, ob der
  Laufzeit-`fs.readdirSync(process.cwd() + "/public/images")` in
  `src/pages/[lang]/galerie.astro` (`prerender = false`) im Serverless-Bundle überhaupt
  etwas findet — bei einem Fehlschlag greift der `try/catch` und die Galerie fällt **still
  auf leer** zurück, ohne Fehler oder Meldung. **Er funktioniert.** Auf der Preview gemessen:
  - **258 Kacheln** (Tag 222 / Nacht 36), identisch zum lokalen Dev-Server. Gegenprobe
    Production: **184** — exakt 258 − 74, also die Differenz der neuen Fotos.
  - **258 von 258 Bild-URLs liefern HTTP 200** (HEAD-Check über alle `data-src`), inklusive
    der URL-kodierten `©`-Präfixe (`%C2%A9gregorsieder…`).
  - Browser-Render mit vollständigem Durchscrollen: 258 geladen, **0 kaputt, 0 pending**.
  - **0 Console-Errors** — hier greifen CSP/COEP aus `vercel.json`, anders als im Dev-Server.
  - ⚠️ Stolperfalle für die nächste Preview-Prüfung: Playwright meldete 5 „fehlgeschlagene"
    Requests auf `/_image?href=/_astro/…`. Das war **Deployment Protection**, kein Defekt —
    dieselbe URL liefert mit Session-Cookie HTTP 200 (byte-identisch zu Production), ohne
    Cookie 302 → SSO. Preview-URLs immer mit `_vercel_share`-Cookie prüfen, sonst erscheinen
    Prefetch-Subressourcen fälschlich als kaputt.
  - Offen bleibt nur die Beobachtung der Bundle-Größe: `public/images` ist von 34 auf 47 MB
    gewachsen. Beim nächsten Foto-Nachschlag im Blick behalten.
- [ ] **Tag/Nacht-Grenze bei `00899` ist manuell gesichtet, nicht gemessen.** Die
  Sieder-Fotos haben **kein EXIF-Aufnahmedatum** (beim Export gestript — per Byte-Scan der
  JPEG-Header geprüft). Die Regel `Number(sieder[1]) >= 899` in `isNight()` stammt aus dem
  Ansehen aller 74 Bilder als Kontaktbogen. Sitzt plausibel (`00874` noch Dämmerung,
  `00899` bereits Stirnlampen), ist aber eine Sichtentscheidung — bei Bedarf nachprüfen
  oder beim Fotografen die Originale mit EXIF anfragen.
- [ ] **Drei Bilder erscheinen doppelt in der Galerie:** `day-running-1`, `emotion-smile`
  und `night-runners` liegen je als `.jpg` **und** `.webp` in `public/images`. Der Scan in
  `galerie.astro` filtert auf `/\.(jpe?g|png|webp)$/i` und nimmt damit beide Varianten —
  `semanticRawMap` dedupliziert nur Roh-gegen-Semantik, nicht Format-gegen-Format.
  Vorbefund, nicht durch die Sieder-Änderung entstanden.
- [ ] **30 tote i18n-Keys `gallery.alt.*` in `src/i18n/ui.ts`** (10 je Sprache). Sie werden
  **nirgends referenziert** — die Galerie rendert `alt=""` (dekorativ), die Lightbox nimmt
  den Dateinamen. Entweder verdrahten (echte Alt-Texte) oder löschen; aktuell sind sie
  irreführend, weil sie den Eindruck gepflegter Alt-Texte erwecken.

### Übrige offene Punkte

> Die folgenden zwei Punkte standen bis 2026-08-14 nur in
> `DLL-Kontext zur Chatübergabe.md` (Übergabe vom 12.08., Punkte 3 und 4) und waren nie
> nach CLAUDE.md übernommen — dieses Dokument ist ungetrackt und überlebt keinen Clone.
> Deshalb hier nachgezogen.

- [x] **`.gitignore` aufgeräumt und committet** *(2026-08-14 erledigt, Commit `489f46e`)*.
  Der unstaged Diff stammte vom Agentic-OS-Setup (Block „Agentic OS Template – Downstream
  Ignore Defaults", 26 Zeilen: Runtime-State, Deploy-Artefakte, Tool-State) — geprüft und
  unverändert übernommen. Zusätzlich bereinigt: vier Dubletten (`node_modules/`, `dist/`,
  `.astro/`, `.vercel`) und die `.env`-Regeln auf `.env*` zusammengeführt.
  - ⚠️ **Dabei `!.env.example` ergänzt.** `.env.example` ist tracked und wird von `.env*`
    gematcht. Solange die Datei im Index steht, greift `.gitignore` nicht — würde sie aber
    je entfernt und neu hinzugefügt, wäre sie **still** ignoriert. Merkregel: Vor dem
    Zusammenfassen von Ignore-Regeln zu einem Wildcard prüfen, ob darunter etwas Getracktes
    liegt (`git ls-files | grep …`).
  - **Neu ignoriert: `web-2.zip` (255 MB), `Gregor Fotos DLL/` (1,5 GB), `Sport OK Daten/`
    (8,1 MB).** Alle drei lagen untracked und von keiner Regel erfasst im Working Tree — ein
    unbedachtes `git add .` hätte 1,75 GB in die History geschrieben. Vor dem Commit per
    `git log --all -- <pfad>` verifiziert, dass keiner der drei je committet war.
- [x] **`src/pages/api/stripe-webhook.ts:61` — Preis-Label kommt jetzt vom gezahlten Betrag**
  *(2026-08-14 erledigt, Branch `fix/webhook-price-label`)*. Vorher speiste
  `const tier = (session.metadata?.tier as Tier) ?? "early_bird";` (heute Zeile 60) über
  `TIER_PRICE_LABEL[tier]` das **Preis-Label der Bestätigungsmail**: fehlte das
  `tier`-Metadatum, zeigte die Mail stillschweigend „€ 75", egal was tatsächlich bezahlt
  wurde. Genau so beim Live-Testkauf vom 14.08. (1 € gezahlt, Label hätte „€ 75" gezeigt).
  - **Fix:** Helper `paidAmountLabel()` (Zeile 24) leitet das Label aus `session.amount_total`
    ab (Cent, enthält bereits Rabatte und Steuern). `TIER_PRICE_LABEL[tier]` ist nur noch
    Rückfallebene: `paidAmountLabel(session) ?? TIER_PRICE_LABEL[tier] ?? ""`.
  - ⚠️ Der Guard prüft `typeof cents !== "number"`, **nicht** truthy — `amount_total: 0`
    (100-%-Gutschein) ist ein gültiger Betrag und darf nicht in den Tier-Fallback rutschen.
  - **Verifiziert** per `stripe listen` + `stripe trigger` gegen den lokalen Dev-Server:
    echtes Event `evt_1U4NXDCNTb5ewxPQtfZYgenb`, `[200]`, `amount_total 3000/usd` → `USD 30`
    statt vormals `€ 75`. Dazu sechs selbst signierte Events: 100 → `€ 1`, 7500 → `€ 75`,
    7550 → `€ 75.50`, 0 → `€ 0`, `null`+`tier=late` → Fallback `€ 100`, 100+`tier=late`
    → `€ 1` (Betrag schlägt Metadatum). Alle **ohne** `participant_id`, der Handler kehrt
    damit am Guard (Zeile 56) zurück — kein Supabase-, Resend- oder Brevo-Zugriff, keine
    Startnummer verbraucht.
  - **Nicht belegt:** das gerenderte Mail-HTML (`src/lib/email.ts:176`). Dafür braucht es
    einen Kauf **mit** `participant_id` → Teil des ohnehin offenen End-to-End-Durchlaufs.
  - ⚠️ **Merkregel für Webhook-Tests:** Das CLI-Profil `default` ist **live**
    (`acct_1To4lEFkID7E6ePc`) — immer explizit
    `--project-name "amateursportverein sport ok toblach sandbox"` setzen
    (`acct_1To4lwCNTb5ewxPQ`, Test-Keys). Das Signing-Secret der CLI per
    `STRIPE_WEBHOOK_SECRET=… npm run dev` übergeben; `src/lib/env.ts` liest `process.env`
    zuerst, die `.env` muss dafür nicht angefasst werden. Achtung auch bei Price-IDs: die
    Kontokennung steckt drin — `price_1U4LzC**FkID7E6ePc**XoTvPETt` (der „lokale" 1-€-Preis)
    gehört zum **Live**-Konto.

- [ ] **Warteliste-Mail-Lücke im direkten Pfad fixen:** Wer sich anmeldet, wenn bereits
  alle Plätze vergeben sind (direkter Warteliste-Pfad in `src/pages/api/checkout.ts`,
  Block `if (isFull)` — Upsert mit `ticket_status: "waitlist"`, KEINE Zahlung), erhält
  aktuell **gar keine E-Mail**. `sendWaitlistNotification` läuft nur im
  Webhook-Overflow-Pfad (bezahlt + auto-erstattet). Lösung: `sendWaitlistNotification`
  auch im direkten Pfad aufrufen — dafür eine Textvariante ohne den
  Rückerstattungs-Passus ergänzen (im direkten Pfad fand keine Zahlung statt).
  Befund vom 2026-07-15, bewusst als separater Punkt zurückgestellt.
  - ⚠️ **Derselbe Textmangel trifft auch Gratis-Anmeldungen (ergänzt 2026-08-15):** Rutscht
    eine Anmeldung mit 100-%-Athletencode in den **Webhook-Overflow-Pfad**
    (`stripe-webhook.ts:80`), läuft `sendWaitlistNotification` mit dem Rückerstattungs-Passus
    — erstattet wurde aber nichts, weil nie etwas gezahlt wurde (`amount_total: 0`, kein
    PaymentIntent; der Refund wird durch `if (paymentIntent)` korrekt übersprungen).
    Technisch fehlerfrei, aber die Mail verspricht Geld zurück, das es nie gab. Die oben
    genannte Textvariante ohne Rückerstattungs-Passus deckt diesen Fall mit ab — beim Fix
    also beide Auslöser mitdenken, nicht nur den direkten Pfad.
- [x] **Upstash-Keys im Vercel-Dashboard setzen** (`UPSTASH_REDIS_REST_URL`/`_TOKEN`) → Rate-Limiting scharf schalten *(2026-07-11 in Production verifiziert: `/api/newsletter` liefert ab dem 4. Request 429 + `Retry-After` → Keys aktiv)*
- [ ] **Brevo-Keys im Vercel-Dashboard setzen** (`BREVO_API_KEY`, `BREVO_LIST_ID`,
  `BREVO_PARTICIPANT_LIST_ID=4`) → Newsletter **und** Teilnehmer-Sync gehen live an Brevo.
  Ohne die Vars laufen beide Pfade still im `skipped`-Modus (Code läuft, synct nichts).
- [ ] **`supabase/schema.sql` im Supabase SQL-Editor ausführen** → View `participants_public` anlegen
- [ ] **Vercel-Runtime auf Node 22.x** stellen (Astro 6)
- [ ] Domain ändern
- [x] **Stripe einrichten** *(2026-08-14 erledigt)* — Live-Keys, die drei Preise (75/80/100 €)
  und der Webhook-Endpoint stehen; Zustellung per echtem 1-€-Testkauf belegt. Details,
  Belege und der **noch offene** Rest (Kette hinter dem 200: Startnummer, Mail, Ticket-PDF,
  Brevo) im Abschnitt **„Webhook-Verifikation (Stand 2026-08-14)"** oben.
- [x] **Dritte Startgeld-Stufe „Spätanmeldung" (100 €) verdrahtet** *(2026-08-11)* — `src/lib/stripe.ts`
  ist von der einen `EARLY_BIRD_DEADLINE` auf ein Fenster-Modell `TIER_WINDOWS` umgestellt, das
  exakt den AGB §1 folgt (75 € bis 31.12.2026 / 80 € bis 31.03.2027 / 100 € bis 30.04.2027).
  Dabei wurden auch die **bestehenden zwei Stufen korrigiert** — sie standen vorher auf 80 €/100 €
  mit Grenze 15.02.2027 und widersprachen damit den Rechtstexten.
  - `currentTier()` liefert jetzt `Tier | null`; `null` = kein offenes Fenster → `/api/checkout`
    antwortet 403 **vor** jedem DB-Write, `/[lang]/anmeldung` zeigt `signup.closed.*`. Damit ist
    die Anmeldung nach dem 30.04.2027 automatisch zu, unabhängig von `PUBLIC_REGISTRATION_ENABLED`.
  - Fenster sind **halboffen** (`from` inklusiv, `until` exklusiv). Ein „…23:59:59"-Ende hätte eine
    Sekundenlücke zwischen zwei Stufen erzeugt, in der die Anmeldung kurzzeitig geschlossen wäre.
  - Env-Var `STRIPE_PRICE_LATE`, DB-Wert `price_type='late'`. Der CHECK-Constraint
    `participants_price_type_check` wurde bereits in Supabase migriert (2026-08-11); `schema.sql`
    enthält den passenden idempotenten Block für Neuinstallationen.
  - **Offen:** Die drei Price-IDs müssen im Vercel-Dashboard (Production + Preview) gesetzt sein,
    sonst liefert `/api/checkout` 500 („Stripe Preise nicht konfiguriert").
- [x] **Datenschutz, AGB usw. einrichten** *(2026-08-08 erledigt — alle Rechtstexte final)*
- [ ] **Ticket-PDF-Fixes end-to-end verifizieren (vor Live-Gang der Registrierung):**
  siehe Unterabschnitt unten.
- [x] **Rechtstexte finalisieren** *(2026-08-08 erledigt — alle Platzhalter in `src/i18n/legal.ts` ausgefüllt, `noindex` aus `src/pages/[lang]/[legal].astro` entfernt; Details siehe Unterabschnitt unten)*
- [ ] **Datenlöschung nach dem Rennen (rechtlich zugesichert, technisch noch NICHT vorhanden)
  — Deadline ~15.08.2027 (3 Monate nach dem 15.05.2027):** Die Datenschutzerklärung enthält
  seit 2026-08-08 eine **echte Löschpflicht** (Punkt 7). Betroffen sind drei Speicherorte:
  - **Supabase `participants`-Tabelle** — Teilnehmerdaten löschen bzw. anonymisieren
  - **Supabase Storage-Bucket `atteste`** — Gesundheitsdaten löschen (plus
    `participants.attest_url` / `attest_status` leeren)
  - **Brevo Liste 4 „DLL Teilnehmer 2027"** — Kontakte entfernen (seit 2026-08-09 füllt der
    Stripe-Webhook diese Liste; §5 der Datenschutzerklärung verweist für die Speicherdauer
    auf Punkt 7, die Zusage gilt damit auch hier)

  Aktuell löscht **nichts** automatisch — die Zusage steht nur im Rechtstext. Nötig ist
  entweder ein automatisierter Cleanup-Job (z. B. Supabase-Cron/Edge-Function oder
  Vercel-Cron), der **alle drei** anstößt, **oder** ein dokumentierter Manual-Prozess mit
  fest terminiertem Reminder und festgehaltener Durchführung. Ohne eines von beidem ist die
  Datenschutzerklärung ab dem 15.08.2027 unzutreffend. *(Kein Code dafür geschrieben —
  bewusst als offener Punkt festgehalten.)*

### Ticket-PDF-Fixes end-to-end verifizieren (vor Live-Gang der Registrierung)

Die drei Ticket-Fixes vom 18.07. (Logo ohne Box, zentrierte Startnummer,
Panorama-Foto-Streifen mit HHW8254) wurden bisher nur lokal über den
Test-Renderer verifiziert, NICHT über den echten Webhook-Pfad (Stripe →
confirm_participant → generateTicketPdf → Resend-Mail mit Anhang).

Vor dem eigentlichen Öffnen der Registrierung (PUBLIC_REGISTRATION_ENABLED=true
in Production) sollte ein echter End-to-End-Testkauf gemacht werden, der das
finale Ticket-Design im tatsächlichen Mail-Anhang bestätigt — als Teil des
ohnehin nötigen finalen Gesamt-Durchlaufs vor Live-Gang, nicht als separater
Schritt.

### Rechtstexte final (Stand 2026-08-08)

Alle Platzhalter in `src/i18n/legal.ts` sind ausgefüllt (DE/IT/EN), die anwaltliche Prüfung
ist erfolgt, und `noindex` wurde aus `src/pages/[lang]/[legal].astro` entfernt — die 6
Legal-Seiten sind wieder indexierbar.

Beim Pflegen dieser Texte beachten:
- Feld `aiNotice` in `LegalPage` = KI-Transparenzhinweis; gesetzt auf 5 der 6 Seiten
  (Impressum ausgenommen), gerendert unter der `updated`-Zeile bzw. am Textende.
- **Startgeld-Stufen und Stornotext stehen doppelt**: in den AGB (§1 / §2) *und* auf der
  separaten Rückerstattungsseite. Beide Stellen müssen wortgleich bleiben — es gibt keine
  gemeinsame Quelle im Code.
- Die alte 3-Stufen-Prozent-Storno-Tabelle wurde ersatzlos entfernt. Aktuelle Regel: keine
  Geldrückerstattung; bei nachgewiesener Verletzung Gratis-Start im Folgejahr; Übertragung
  bis 2 Wochen vor dem Rennen (dann kein Folgejahr-Anspruch, keine personalisierte
  Startnummer).
- Kontakt für Storno/Rückerstattung ist `dolomiteslastloop@gmail.com` (nicht `info@` —
  das gilt weiterhin für Datenschutz, Betroffenenrechte und Barrierefreiheit).
- Datenschutz §7 nennt drei Fristen: Teilnehmerdaten und Gesundheitsdaten (ärztliche Atteste)
  jeweils 3 Monate nach dem Rennen (Frist ab 15.05.2027), Zahlungs-/Buchhaltungsdaten
  10 Jahre gem. Art. 2220 CC.
- ⚠️ **Die Attest-Frist ist eine echte, nach außen zugesicherte Löschpflicht**, keine bloße
  Formulierung: Atteste im privaten Supabase-Bucket `atteste` müssen bis zum **15.08.2027**
  tatsächlich gelöscht sein. Es gibt dafür **noch keinen Mechanismus** — Cleanup-Job oder
  manueller Reminder-Prozess sind offen (siehe „Nächste Schritte"). Wird die Frist im Text
  geändert, hier und im To-do mitziehen; wird die Praxis geändert, den Text mitziehen.
