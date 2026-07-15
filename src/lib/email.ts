import { Resend } from "resend";
import { env } from "@lib/env";

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

function siteUrl(): string {
  return env("PUBLIC_SITE_URL") ?? "https://www.dolomiteslastloop.com";
}

function normLang(lang: string | null | undefined): Lang {
  return lang === "it" || lang === "en" ? lang : "de";
}

function shell(inner: string): string {
  return `
    <div style="font-family: Inter, system-ui, sans-serif; color:#0a0a0a; max-width:560px;">
      <h1 style="font-family: 'Bebas Neue', Impact, sans-serif; color:#2d4a6b; letter-spacing:0.06em;">
        Dolomites Last Loop · 15.05.2027
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
      "<strong>Noch ein wichtiger Schritt:</strong> Bitte lade dein ärztliches Attest vor dem Renntag hoch:",
    uploadCta: "Attest jetzt hochladen →",
    notValidYet:
      "Wichtig: Deine Anmeldung wird erst mit dem vollständig hochgeladenen ärztlichen Attest endgültig gültig.",
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
      "<strong>Un passo importante:</strong> carica il tuo certificato medico prima del giorno della gara:",
    uploadCta: "Carica ora il certificato →",
    notValidYet:
      "Importante: la tua iscrizione diventa definitiva solo con il certificato medico caricato per intero.",
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
      "<strong>One important step left:</strong> please upload your medical certificate before race day:",
    uploadCta: "Upload certificate now →",
    notValidYet:
      "Important: your registration only becomes final once your medical certificate is fully uploaded.",
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
