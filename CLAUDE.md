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

- **Astro 4** im SSR-Modus (`output: "server"`), deployt auf **Vercel**
  (`@astrojs/vercel/serverless`, `maxDuration: 30`, Web Analytics aktiv)
- **Vanilla CSS** (keine UI-Frameworks) – globale Styles in `src/styles/global.css`
- **Supabase** (`@supabase/supabase-js`) – Postgres + Storage (Bucket `atteste`), mit RLS
- **Stripe** (`stripe`) – Checkout + Webhook
- **Resend** (`resend`) – transaktionale Emails
- **TypeScript 5**, **Sharp** (Bildkompression), Node **20.x**
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

---

## Fehlerprotokoll

> Hier neu auftretende Fehler + Ursache + Lösung notieren (Regel 4).

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
