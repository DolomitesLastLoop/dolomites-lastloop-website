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
    thanks: string;
    number: (s: number | null) => string;
    fee: (p: string) => string;
    attest: string;
    uploadCta: string;
    notValidYet: string;
    fallback: string;
    bye: string;
  }
> = {
  de: {
    subject: "Anmeldung bestätigt · Dolomites Last Loop · 15.05.2027",
    hi: (n) => `Ciao ${n},`,
    thanks: "danke für deine Anmeldung – wir freuen uns, dich an der Startlinie zu sehen.",
    number: (s) => (s ? `Startnummer: <strong>${s}</strong>` : "Du bist registriert."),
    fee: (p) => `Startgeld: <strong>${p}</strong> (bezahlt).`,
    attest: "Bitte lade dein ärztliches Attest vor dem Renntag hoch:",
    uploadCta: "Attest jetzt hochladen →",
    notValidYet:
      "Wichtig: Deine Anmeldung wird erst mit dem vollständig hochgeladenen ärztlichen Attest endgültig gültig.",
    fallback: "Falls der Link nicht funktioniert, kopiere diese URL in deinen Browser:",
    bye: "Sportliche Grüße",
  },
  it: {
    subject: "Iscrizione confermata · Dolomites Last Loop · 15.05.2027",
    hi: (n) => `Ciao ${n},`,
    thanks: "grazie per la tua iscrizione – non vediamo l’ora di vederti alla partenza.",
    number: (s) => (s ? `Numero di pettorale: <strong>${s}</strong>` : "Sei registrato."),
    fee: (p) => `Quota d’iscrizione: <strong>${p}</strong> (pagata).`,
    attest: "Carica il tuo certificato medico prima del giorno della gara:",
    uploadCta: "Carica ora il certificato →",
    notValidYet:
      "Importante: la tua iscrizione diventa definitiva solo con il certificato medico caricato per intero.",
    fallback: "Se il link non funziona, copia questo URL nel tuo browser:",
    bye: "Sportivi saluti",
  },
  en: {
    subject: "Registration confirmed · Dolomites Last Loop · 2027-05-15",
    hi: (n) => `Hi ${n},`,
    thanks: "thank you for registering – we can’t wait to see you on the start line.",
    number: (s) => (s ? `Bib number: <strong>${s}</strong>` : "You are registered."),
    fee: (p) => `Entry fee: <strong>${p}</strong> (paid).`,
    attest: "Please upload your medical certificate before race day:",
    uploadCta: "Upload certificate now →",
    notValidYet:
      "Important: your registration only becomes final once your medical certificate is fully uploaded.",
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
) {
  const L = normLang(lang);
  const c = confirmCopy[L];
  const uploadLink = `${siteUrl()}/${L}/anmeldung?id=${encodeURIComponent(
    participantId,
  )}&token=${encodeURIComponent(attestToken)}`;

  const html = shell(`
    <p>${c.hi(firstName)}</p>
    <p>${c.thanks}</p>
    <p>${c.number(startnummer)}</p>
    ${priceLabel ? `<p>${c.fee(priceLabel)}</p>` : ""}
    <p>${c.attest}<br/><a href="${uploadLink}" style="color:#2d4a6b;">${c.uploadCta}</a></p>
    <p style="background:#f0ebe3;border-left:3px solid #2d4a6b;padding:0.75rem 1rem;border-radius:6px;">${c.notValidYet}</p>
    <p style="font-size:0.85em;color:#666;">${c.fallback}<br/>${uploadLink}</p>
    <p>${c.bye}</p>
  `);

  return client().emails.send({ from, to, replyTo, subject: c.subject, html });
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
