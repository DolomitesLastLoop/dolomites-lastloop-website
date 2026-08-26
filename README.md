# Dolomites Last Loop — Website

Offizielle Event-Plattform für die **Dolomites Last Loop** in Toblach/Dobbiaco
(Südtirol) — das erste Backyard Ultra Rennen in den Dolomiten.

Erste Ausgabe: **2027**, Datum folgt.

## Stack

- **Astro 4** (server-rendered auf Vercel)
- **Vanilla CSS** (keine UI-Frameworks)
- **Supabase** für Datenbank + Storage (Atteste)
- **Stripe Checkout** für Ticketverkauf
- **Resend** für Bestätigungs-Emails
- **i18n** für `de` (Standard), `it`, `en`

## Lokales Setup

```bash
# 1. Dependencies
npm install

# 2. .env anlegen
cp .env.example .env
# Werte eintragen (Supabase, Stripe, Resend, Admin)

# 3. Dev-Server
npm run dev
```

Anschließend [http://localhost:4321](http://localhost:4321) öffnen — landet
automatisch auf `/de`.

## Supabase einrichten

1. Neues Projekt auf [supabase.com](https://supabase.com) anlegen.
2. SQL-Editor öffnen und `supabase/schema.sql` einmalig ausführen.
3. Im **Storage**-Bereich einen privaten Bucket `atteste` anlegen.
4. `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY` in `.env` eintragen.

## Stripe einrichten

1. Test- und Live-API-Keys aus dem Stripe Dashboard übernehmen.
2. Drei Produkte/Preise anlegen — Beträge und Fenster laut AGB §1:
   - **Early Bird** 75 € (01.09.2026 – 31.12.2026)
   - **Standard** 80 € (01.01.2027 – 31.03.2027)
   - **Spätanmeldung** 100 € (01.04.2027 – 30.04.2027)
3. Preis-IDs in `STRIPE_PRICE_EARLY_BIRD`, `STRIPE_PRICE_STANDARD` und
   `STRIPE_PRICE_LATE` eintragen. Die Datumsfenster selbst stehen im Code
   (`TIER_WINDOWS` in `src/lib/stripe.ts`), nicht in Stripe.
4. Webhook erstellen → Endpoint: `https://DOMAIN/api/stripe-webhook`
   - Event: `checkout.session.completed`
   - Signing Secret in `STRIPE_WEBHOOK_SECRET` eintragen.

## Resend einrichten

1. API-Key aus [resend.com](https://resend.com) übernehmen.
2. Verifizierte Absenderdomain konfigurieren.
3. `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO` setzen.

## Admin

- URL: `/admin/login`
- Passwort: aus `ADMIN_PASSWORD` (in `.env` setzen).
- Session-HMAC-Schlüssel: `ADMIN_SESSION_SECRET` (min. 32 Zeichen).
- CSV-Exports unter `/api/admin/export?type=participants|newsletter`.

## Deployment auf Vercel

1. Repository mit Vercel verbinden.
2. Environment-Variablen aus `.env.example` im Vercel-Dashboard setzen.
3. Build & Deploy — Astro nutzt den `@astrojs/vercel/serverless` Adapter.

## Projektstruktur

```
src/
├── components/        Header, Footer, Hero, Newsletter, Lang-Switcher, …
├── i18n/              ui.ts (Strings) + faq.ts + utils.ts
├── layouts/           BaseLayout (SEO, Header/Footer, Fonts)
├── lib/               supabase.ts, stripe.ts, email.ts, auth.ts
├── pages/
│   ├── index.astro          → Redirect /de
│   ├── [lang]/              Öffentliche Seiten je Sprache
│   ├── admin/               Login + Dashboard (geschützt)
│   ├── api/                 REST-Endpunkte (Stripe, Supabase, Resend)
│   └── sitemap.xml.ts
├── styles/global.css
└── env.d.ts
public/
├── favicon.svg
└── robots.txt
supabase/
└── schema.sql
```

## Routen

| Pfad                  | Beschreibung                            |
| --------------------- | --------------------------------------- |
| `/`                   | Redirect → `/de`                        |
| `/{de\|it\|en}/`      | Startseite                              |
| `/{lang}/race-info`   | Format, Strecke, Regeln                 |
| `/{lang}/anmeldung`   | 3-stufige Anmeldung + Stripe + Attest   |
| `/{lang}/startliste`  | Live aus Supabase, Suche                |
| `/{lang}/ergebnisse`  | Archiv vergangener Ausgaben             |
| `/{lang}/faq`         | FAQ für Teilnehmer + Betreuer           |
| `/{lang}/kontakt`     | Kontaktformular + Karte                 |
| `/admin/login`        | Passwort-Login                          |
| `/admin`              | Dashboard                               |
| `/api/*`              | JSON-/Formular-Endpunkte                |
| `/sitemap.xml`        | Mehrsprachige Sitemap                   |

## Lizenz

© Dolomites Last Loop / Sport OK Toblach
