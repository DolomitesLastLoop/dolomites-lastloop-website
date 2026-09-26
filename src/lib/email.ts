import { Resend } from "resend";
import { env } from "@lib/env";
import { escapeHtml } from "@lib/validation";

type Lang = "de" | "it" | "en";

const from = env("EMAIL_FROM") ??
  "Dolomites Last Loop <noreply@dolomiteslastloop.com>";
const replyTo = env("EMAIL_REPLY_TO") ??
  "dolomiteslastloop@gmail.com";

let _client: Resend | null = null;
function client() {
  if (_client) return _client;
  const key = env("RESEND_API_KEY");
  if (!key) throw new Error("Missing environment variable: RESEND_API_KEY");
  _client = new Resend(key);
  return _client;
}

// Auf Vercel-Previews zeigen Mail-Links auf den Branch-Alias des tatsächlich
// getesteten Branches (VERCEL_BRANCH_URL, von Vercel zur Laufzeit gesetzt) statt auf
// einen manuell gepflegten PUBLIC_SITE_URL-Wert, der auf einen fremden Branch zeigen
// kann. Production und lokal: unverändert PUBLIC_SITE_URL bzw. die feste Domain.
function siteUrl(): string {
  if (env("VERCEL_ENV") === "preview") {
    const branchHost = env("VERCEL_BRANCH_URL");
    if (branchHost) return `https://${branchHost}`;
  }
  return env("PUBLIC_SITE_URL") ?? "https://www.dolomiteslastloop.com";
}

function normLang(lang: string | null | undefined): Lang {
  return lang === "it" || lang === "en" ? lang : "de";
}

// Überschrift der Mail-Hülle. Default = Rennen 2027, damit bestehende Aufrufe
// unverändert bleiben; andere Events (z. B. Community Run) übergeben ihre eigene.
const DEFAULT_HEADING = "Dolomites Last Loop · 15.05.2027";

function shell(inner: string, heading: string = DEFAULT_HEADING): string {
  return `
    <div style="font-family: Inter, system-ui, sans-serif; color:#0a0a0a; max-width:560px;">
      <h1 style="font-family: 'Bebas Neue', Impact, sans-serif; color:#2d4a6b; letter-spacing:0.06em;">
        ${heading}
      </h1>
      ${inner}
      <p style="margin-top:1.5rem;">Sport OK Toblach · Dolomites Last Loop</p>
    </div>`;
}

// ── Bestätigungs-Email (bezahlt) ───────────────────────────────────────────
const confirmCopy: Record<
  Lang,
  {
    subject: string;
    hi: (n: string) => string;
    confirmed: string;
    overviewTitle: string;
    bibLabel: string;
    registered: string;
    dateLabel: string;
    dateValue: string;
    venueLabel: string;
    venueValue: string;
    formatLabel: string;
    formatValue: string;
    feeLabel: string;
    feePaid: string;
    ticketNote: string;
    attest: string;
    uploadCta: string;
    notValidYet: string;
    raceInfoLine: (raceInfoUrl: string, contactUrl: string) => string;
    fallback: string;
    bye: string;
  }
> = {
  de: {
    subject: "Anmeldung bestätigt · Dolomites Last Loop · 15. Mai 2027",
    hi: (n) => `Ciao ${n},`,
    confirmed:
      "deine Anmeldung ist bestätigt – dein Startplatz bei der Dolomites Last Loop ist gesichert. Wir freuen uns, dich an der Startlinie zu sehen!",
    overviewTitle: "Deine Anmeldung im Überblick",
    bibLabel: "Startnummer",
    registered: "Registriert",
    dateLabel: "Datum",
    dateValue: "15. Mai 2027",
    venueLabel: "Ort",
    venueValue: "Nordic Arena, Seeweg 16, 39034 Toblach",
    formatLabel: "Format",
    formatValue: "Backyard Ultra · 6,71-km-Loop · jede volle Stunde",
    feeLabel: "Startgeld",
    feePaid: "(bezahlt)",
    ticketNote:
      "<strong>Dein Ticket</strong> findest du als PDF im Anhang – ausgedruckt oder am Handy gezeigt genügt.",
    attest:
      "<strong>Noch ein wichtiger Schritt:</strong> Bitte lade dein sportärztliches Attest hoch – spätestens bis zum 8. Mai 2027. Es muss am Renntag noch gültig sein:",
    uploadCta: "Attest jetzt hochladen →",
    notValidYet:
      "Wichtig: Deine Anmeldung wird erst mit dem vollständig hochgeladenen sportärztlichen Attest endgültig gültig.",
    raceInfoLine: (r, k) =>
      `Alle Details zu Strecke und Regeln: <a href="${r}" style="color:#2d4a6b;">Race-Info</a> · Lage &amp; Karte: <a href="${k}" style="color:#2d4a6b;">Kontakt</a>`,
    fallback: "Falls der Link nicht funktioniert, kopiere diese URL in deinen Browser:",
    bye: "Sportliche Grüße",
  },
  it: {
    subject: "Iscrizione confermata · Dolomites Last Loop · 15 maggio 2027",
    hi: (n) => `Ciao ${n},`,
    confirmed:
      "la tua iscrizione è confermata – il tuo posto alla Dolomites Last Loop è assicurato. Non vediamo l’ora di vederti alla partenza!",
    overviewTitle: "La tua iscrizione in sintesi",
    bibLabel: "Numero di pettorale",
    registered: "Registrato",
    dateLabel: "Data",
    dateValue: "15 maggio 2027",
    venueLabel: "Luogo",
    venueValue: "Nordic Arena, Seeweg 16, 39034 Dobbiaco",
    formatLabel: "Formato",
    formatValue: "Backyard Ultra · giro di 6,71 km · ogni ora in punto",
    feeLabel: "Quota d’iscrizione",
    feePaid: "(pagata)",
    ticketNote:
      "<strong>Il tuo biglietto</strong> è in allegato come PDF – basta stamparlo o mostrarlo sul telefono.",
    attest:
      "<strong>Un passo importante:</strong> carica il tuo certificato medico agonistico – al più tardi entro l’8 maggio 2027. Deve essere ancora valido il giorno della gara:",
    uploadCta: "Carica ora il certificato →",
    notValidYet:
      "Importante: la tua iscrizione diventa definitiva solo con il certificato medico agonistico caricato per intero.",
    raceInfoLine: (r, k) =>
      `Tutti i dettagli su percorso e regole: <a href="${r}" style="color:#2d4a6b;">Race-Info</a> · Posizione e mappa: <a href="${k}" style="color:#2d4a6b;">Contatti</a>`,
    fallback: "Se il link non funziona, copia questo URL nel tuo browser:",
    bye: "Sportivi saluti",
  },
  en: {
    subject: "Registration confirmed · Dolomites Last Loop · 15 May 2027",
    hi: (n) => `Hi ${n},`,
    confirmed:
      "your registration is confirmed – your spot at the Dolomites Last Loop is secured. We can’t wait to see you on the start line!",
    overviewTitle: "Your registration at a glance",
    bibLabel: "Bib number",
    registered: "Registered",
    dateLabel: "Date",
    dateValue: "15 May 2027",
    venueLabel: "Venue",
    venueValue: "Nordic Arena, Seeweg 16, 39034 Toblach/Dobbiaco (Italy)",
    formatLabel: "Format",
    formatValue: "Backyard Ultra · 6.71 km loop · every hour on the hour",
    feeLabel: "Entry fee",
    feePaid: "(paid)",
    ticketNote:
      "<strong>Your ticket</strong> is attached as a PDF – print it or show it on your phone.",
    attest:
      "<strong>One important step left:</strong> please upload your sports-medical certificate — by 8 May 2027 at the latest. It must still be valid on race day:",
    uploadCta: "Upload certificate now →",
    notValidYet:
      "Important: your registration only becomes final once your sports-medical certificate is fully uploaded.",
    raceInfoLine: (r, k) =>
      `Course details and rules: <a href="${r}" style="color:#2d4a6b;">Race Info</a> · Location &amp; map: <a href="${k}" style="color:#2d4a6b;">Contact</a>`,
    fallback: "If the link doesn’t work, copy this URL into your browser:",
    bye: "Best regards",
  },
};

export async function sendRegistrationConfirmation(
  to: string,
  firstName: string,
  startnummer: number | null,
  participantId: string,
  attestToken: string,
  lang: string = "de",
  priceLabel: string = "",
  ticketPdf: Buffer | null = null,
) {
  const L = normLang(lang);
  const c = confirmCopy[L];
  const uploadLink = `${siteUrl()}/${L}/anmeldung?id=${encodeURIComponent(
    participantId,
  )}&token=${encodeURIComponent(attestToken)}`;
  const raceInfoUrl = `${siteUrl()}/${L}/race-info`;
  const contactUrl = `${siteUrl()}/${L}/kontakt`;

  const rows: Array<[string, string]> = [
    [c.bibLabel, startnummer ? `<strong>${startnummer}</strong>` : c.registered],
    [c.dateLabel, `<strong>${c.dateValue}</strong>`],
    [c.venueLabel, c.venueValue],
    [c.formatLabel, c.formatValue],
  ];
  if (priceLabel) rows.push([c.feeLabel, `<strong>${priceLabel}</strong> ${c.feePaid}`]);

  const overview = `
    <p style="margin-bottom:0.35rem;"><strong>${c.overviewTitle}</strong></p>
    <table style="border-collapse:collapse;background:#faf6f0;border:1px solid #ddd8cf;border-radius:6px;width:100%;">
      ${rows
        .map(
          ([label, value]) => `<tr>
        <td style="padding:0.4rem 1rem 0.4rem 1rem;color:#4a5a6a;white-space:nowrap;">${label}</td>
        <td style="padding:0.4rem 1rem 0.4rem 0;">${value}</td>
      </tr>`,
        )
        .join("")}
    </table>`;

  const html = shell(`
    <p>${c.hi(firstName)}</p>
    <p>${c.confirmed}</p>
    ${overview}
    ${ticketPdf ? `<p>${c.ticketNote}</p>` : ""}
    <p>${c.attest}<br/><a href="${uploadLink}" style="color:#2d4a6b;">${c.uploadCta}</a></p>
    <p style="background:#f0ebe3;border-left:3px solid #2d4a6b;padding:0.75rem 1rem;border-radius:6px;">${c.notValidYet}</p>
    <p>${c.raceInfoLine(raceInfoUrl, contactUrl)}</p>
    <p style="font-size:0.85em;color:#666;">${c.fallback}<br/>${uploadLink}</p>
    <p>${c.bye}</p>
  `);

  return client().emails.send({
    from,
    to,
    replyTo,
    subject: c.subject,
    html,
    ...(ticketPdf
      ? { attachments: [{ filename: "ticket.pdf", content: ticketPdf }] }
      : {}),
  });
}

// ── Warteliste-Email (ausgebucht / Overflow mit automatischer Rückerstattung) ─
const waitlistCopy: Record<
  Lang,
  { subject: string; hi: (n: string) => string; body: string; bye: string }
> = {
  de: {
    subject: "Warteliste · Dolomites Last Loop · 15.05.2027",
    hi: (n) => `Ciao ${n},`,
    body:
      "die Startplätze waren in diesem Moment leider bereits vergeben. Du stehst jetzt auf der Warteliste – falls ein Platz frei wird, melden wir uns. Eine eventuell vorgenommene Zahlung wurde automatisch vollständig zurückerstattet (kann je nach Bank einige Tage dauern).",
    bye: "Sportliche Grüße",
  },
  it: {
    subject: "Lista d’attesa · Dolomites Last Loop · 15.05.2027",
    hi: (n) => `Ciao ${n},`,
    body:
      "in questo momento i posti erano purtroppo già esauriti. Sei ora in lista d’attesa – ti contatteremo se si libera un posto. Un eventuale pagamento è stato rimborsato automaticamente per intero (possono volerci alcuni giorni a seconda della banca).",
    bye: "Sportivi saluti",
  },
  en: {
    subject: "Waiting list · Dolomites Last Loop · 2027-05-15",
    hi: (n) => `Hi ${n},`,
    body:
      "unfortunately all start slots were already taken at that moment. You are now on the waiting list – we’ll reach out if a spot opens up. Any payment made has been fully refunded automatically (it may take a few days depending on your bank).",
    bye: "Best regards",
  },
};

export async function sendWaitlistNotification(
  to: string,
  firstName: string,
  lang: string = "de",
) {
  const L = normLang(lang);
  const c = waitlistCopy[L];
  const html = shell(`
    <p>${c.hi(firstName)}</p>
    <p>${c.body}</p>
    <p>${c.bye}</p>
  `);
  return client().emails.send({ from, to, replyTo, subject: c.subject, html });
}

export async function sendContactNotification(
  name: string,
  email: string,
  message: string,
) {
  return client().emails.send({
    from,
    to: replyTo,
    replyTo: email,
    subject: `Kontaktanfrage – ${name}`,
    text: `Von: ${name} <${email}>\n\n${message}`,
  });
}

// ── Community Run: Anmeldebestätigung + Shop-Zugangslink ─────────────────────
// TODO(Simon): Datum/Ort des Community Runs stehen noch nicht fest — Überschrift
// und Texte sind Platzhalter.
const COMMUNITY_RUN_HEADING = "Dolomites Last Loop · Community Run";

const communityRunCopy: Record<
  Lang,
  {
    subject: string;
    hi: (n: string) => string;
    body: string;
    shopIntro: string;
    shopCta: string;
    validity: string;
    fallback: string;
    bye: string;
  }
> = {
  de: {
    subject: "Community Run · Anmeldung bestätigt · Dolomites Last Loop",
    hi: (n) => `Ciao ${n},`,
    body:
      "danke für deine Anmeldung zum Community Run! Alle Details zu Datum, Treffpunkt und Ablauf schicken wir dir rechtzeitig vorab.",
    shopIntro:
      "Als Community-Run-Teilnehmer:in bekommst du exklusiven Zugang zum Dolomites-Last-Loop-Shop:",
    shopCta: "Zum Shop →",
    validity:
      "Der Link ist persönlich – bitte nicht weitergeben.",
    fallback: "Falls der Link nicht funktioniert, kopiere diese URL in deinen Browser:",
    bye: "Sportliche Grüße",
  },
  it: {
    subject: "Community Run · Iscrizione confermata · Dolomites Last Loop",
    hi: (n) => `Ciao ${n},`,
    body:
      "grazie per la tua iscrizione al Community Run! Ti invieremo per tempo tutti i dettagli su data, punto di ritrovo e programma.",
    shopIntro:
      "Come partecipante al Community Run hai accesso esclusivo allo shop della Dolomites Last Loop:",
    shopCta: "Vai allo shop →",
    validity:
      "Il link è personale – per favore non condividerlo.",
    fallback: "Se il link non funziona, copia questo URL nel tuo browser:",
    bye: "Sportivi saluti",
  },
  en: {
    subject: "Community Run · Registration confirmed · Dolomites Last Loop",
    hi: (n) => `Hi ${n},`,
    body:
      "thanks for signing up for the Community Run! We’ll send you all details on date, meeting point and schedule well in advance.",
    shopIntro:
      "As a Community Run participant you get exclusive access to the Dolomites Last Loop shop:",
    shopCta: "Go to the shop →",
    validity:
      "The link is personal – please don’t share it.",
    fallback: "If the link doesn’t work, copy this URL into your browser:",
    bye: "Best regards",
  },
};

export async function sendCommunityRunConfirmation(
  to: string,
  firstName: string,
  accessToken: string,
  lang: string = "de",
) {
  const L = normLang(lang);
  const c = communityRunCopy[L];
  const shopLink = `${siteUrl()}/${L}/shop?token=${encodeURIComponent(accessToken)}`;
  const html = shell(
    `
    <p>${c.hi(escapeHtml(firstName))}</p>
    <p>${c.body}</p>
    <p>${c.shopIntro}<br/><a href="${shopLink}" style="color:#2d4a6b;">${c.shopCta}</a></p>
    <p style="font-size:0.85em;color:#666;">${c.validity}</p>
    <p style="font-size:0.85em;color:#666;">${c.fallback}<br/>${shopLink}</p>
    <p>${c.bye}</p>
  `,
    COMMUNITY_RUN_HEADING,
  );
  // Resend meldet Fehler als { data: null, error } statt zu werfen (Fehlerprotokoll
  // 2026-09-01) → hier in eine Exception übersetzen, damit Aufrufer sie sehen.
  const res = await client().emails.send({ from, to, replyTo, subject: c.subject, html });
  if (res.error) {
    throw new Error(`Resend: ${res.error.name ?? "error"} – ${res.error.message}`);
  }
  return res;
}
