import { Resend } from "resend";

const key = import.meta.env.RESEND_API_KEY as string | undefined;
const from = (import.meta.env.EMAIL_FROM as string | undefined) ??
  "Dolomites Last Loop <noreply@dolomiteslastloop.com>";
const replyTo = (import.meta.env.EMAIL_REPLY_TO as string | undefined) ??
  "dolomiteslastloop@gmail.com";

let _client: Resend | null = null;
function client() {
  if (_client) return _client;
  if (!key) throw new Error("Missing environment variable: RESEND_API_KEY");
  _client = new Resend(key);
  return _client;
}

export async function sendRegistrationConfirmation(
  to: string,
  firstName: string,
  startnummer: number | null,
) {
  const number = startnummer ? `Startnummer: ${startnummer}` : "Du bist registriert.";
  const html = `
    <div style="font-family: Inter, system-ui, sans-serif; color:#0a0a0a; max-width:560px;">
      <h1 style="font-family: 'Bebas Neue', Impact, sans-serif; color:#e85d04; letter-spacing:0.04em;">
        Dolomites Last Loop 2027
      </h1>
      <p>Ciao ${firstName},</p>
      <p>danke für deine Anmeldung – wir freuen uns, dich an der Startlinie zu sehen.</p>
      <p><strong>${number}</strong></p>
      <p>Bitte denke daran, dein ärztliches Attest vor dem Renntag hochzuladen. Du findest den Link in deiner Anmeldebestätigung oder über die Website.</p>
      <p>Sportliche Grüße<br/>Dolomites Last Loop Team · Sport OK Toblach</p>
    </div>
  `;
  return client().emails.send({
    from,
    to,
    replyTo,
    subject: "Anmeldung bestätigt · Dolomites Last Loop 2027",
    html,
  });
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
