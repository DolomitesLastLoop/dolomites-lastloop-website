import type { Lang } from "./ui";
import type { PaceGroup } from "@lib/community-run";

// Texte der Community-Run-Landingpage (/[lang]/community-run).
// Eigene Datei statt ui.ts: Record<Lang, …> erzwingt per TypeScript, dass DE/IT/EN
// vollständig sind (ui.ts fällt bei fehlenden Keys still auf DE zurück).
//
// TODO(Simon): Alle mit [PLATZHALTER] kommentierten Texte sind vorläufig —
// finale Copy, Datum, Ort, Format, Ablauf, Tempogruppen und Workshop-Details folgen.

export type CommunityRunCopy = {
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; title: string; subtitle: string; cta: string };
  info: { label: string; value: string }[];
  todoTag: string;
  explainer: { eyebrow: string; title: string; paragraphs: string[] };
  timeline: { eyebrow: string; title: string; steps: { title: string; text: string }[] };
  form: {
    eyebrow: string;
    title: string;
    lead: string;
    vorname: string;
    nachname: string;
    email: string;
    pace: string;
    pacePlaceholder: string;
    paceOptions: Record<PaceGroup, string>;
    paceHint: string;
    consentBefore: string;
    consentLink: string;
    consentAfter: string;
    workshop: string;
    workshopHint: string;
    submit: string;
    sending: string;
    success: string;
    errors: {
      invalid_input: string;
      duplicate: string;
      rate_limited: string;
      mail_failed: string;
      server_error: string;
    };
  };
  workshop: { eyebrow: string; title: string; text: string; openNote: string };
};

export const communityRun: Record<Lang, CommunityRunCopy> = {
  de: {
    metaTitle: "Community Run",
    metaDescription:
      "Community Run der Dolomites Last Loop – kein Rennen, ein Vorgeschmack.",
    hero: {
      eyebrow: "Dolomites Last Loop",
      title: "Community Run",
      subtitle: "Kein Rennen. Ein Vorgeschmack.",
      cta: "Jetzt anmelden",
    },
    // [PLATZHALTER] Datum/Ort/Format stehen noch nicht fest.
    info: [
      { label: "Datum", value: "Folgt" },
      { label: "Ort", value: "Folgt" },
      { label: "Format", value: "Folgt" },
    ],
    todoTag: "Platzhalter",
    // [PLATZHALTER] Finale Copy liefert Simon.
    explainer: {
      eyebrow: "Worum es geht",
      title: "Kein Rennen. Ein Vorgeschmack.",
      paragraphs: [
        "Platzhaltertext: Beim Community Run geht es nicht um Zeiten oder Platzierungen. Wir laufen gemeinsam, im Rhythmus des Backyard Ultra – Loop für Loop.",
        "Platzhaltertext: Ideal für alle, die das Format kennenlernen wollen, bevor sie sich an die Startlinie der Dolomites Last Loop stellen.",
      ],
    },
    // [PLATZHALTER] Genaue Schritte folgen.
    timeline: {
      eyebrow: "Ablauf",
      title: "So läuft der Tag",
      steps: [
        { title: "Treffpunkt", text: "Platzhalter: Ankommen, Startnummer-freies Check-in, kurzes Briefing." },
        { title: "Gemeinsamer Start", text: "Platzhalter: Start zur vollen Stunde, ganz im Backyard-Stil." },
        { title: "Loops in Tempogruppen", text: "Platzhalter: Laufen in der eigenen Tempogruppe, niemand bleibt allein." },
        { title: "Ausklang", text: "Platzhalter: Gemeinsamer Abschluss und Austausch." },
      ],
    },
    form: {
      eyebrow: "Anmeldung",
      title: "Sei dabei",
      lead: "Die Anmeldung ist kostenlos. Nach dem Absenden bekommst du eine Bestätigung per E-Mail.",
      vorname: "Vorname",
      nachname: "Nachname",
      email: "E-Mail",
      pace: "Tempogruppe",
      pacePlaceholder: "Bitte wählen",
      // [PLATZHALTER] Gruppen und Pace-Angaben folgen.
      paceOptions: {
        relaxed: "Entspannt",
        moderate: "Mittel",
        fast: "Zügig",
      },
      paceHint: "Die Einteilung ist unverbindlich – vor Ort kannst du wechseln.",
      consentBefore: "Ich habe die ",
      consentLink: "Datenschutzerklärung",
      consentAfter:
        " gelesen und bin mit der Verarbeitung meiner Daten zur Organisation des Community Runs einverstanden.",
      workshop: "Ich interessiere mich für den Workshop",
      workshopHint: "Nur Interessensbekundung – unverbindlich, keine Zahlung.",
      submit: "Anmelden",
      sending: "Wird gesendet …",
      success:
        "Danke für deine Anmeldung! Wir haben dir eine Bestätigung per E-Mail geschickt – darin findest du auch deinen persönlichen Link zum Shop.",
      errors: {
        invalid_input: "Bitte fülle alle Pflichtfelder korrekt aus.",
        duplicate:
          "Mit dieser E-Mail-Adresse bist du bereits angemeldet. Schau in dein Postfach (auch im Spam-Ordner) nach unserer Bestätigung.",
        rate_limited: "Zu viele Versuche. Bitte warte kurz und versuche es erneut.",
        mail_failed:
          "Die Bestätigungsmail konnte nicht versendet werden. Bitte versuche es in ein paar Minuten erneut.",
        server_error: "Da ist etwas schiefgelaufen. Bitte versuche es später erneut.",
      },
    },
    // [PLATZHALTER] Preis und Zahlungsart sind noch offen.
    workshop: {
      eyebrow: "Workshop",
      title: "Mehr als ein Lauf",
      text: "Platzhaltertext: Rund um den Community Run planen wir einen Workshop – Inhalte und Termin folgen.",
      openNote: "Preis und Zahlungsart stehen noch nicht fest. Die Anmeldung oben erfasst nur dein Interesse.",
    },
  },
  it: {
    metaTitle: "Community Run",
    metaDescription:
      "Community Run della Dolomites Last Loop – nessuna gara, un assaggio.",
    hero: {
      eyebrow: "Dolomites Last Loop",
      title: "Community Run",
      subtitle: "Nessuna gara. Un assaggio.",
      cta: "Iscriviti ora",
    },
    info: [
      { label: "Data", value: "Da definire" },
      { label: "Luogo", value: "Da definire" },
      { label: "Formato", value: "Da definire" },
    ],
    todoTag: "Segnaposto",
    explainer: {
      eyebrow: "Di cosa si tratta",
      title: "Nessuna gara. Un assaggio.",
      paragraphs: [
        "Testo segnaposto: al Community Run non contano tempi o classifiche. Corriamo insieme, al ritmo del Backyard Ultra – un loop dopo l'altro.",
        "Testo segnaposto: ideale per chi vuole conoscere il formato prima di presentarsi alla partenza della Dolomites Last Loop.",
      ],
    },
    timeline: {
      eyebrow: "Programma",
      title: "Come si svolge la giornata",
      steps: [
        { title: "Ritrovo", text: "Segnaposto: arrivo, check-in senza pettorale, breve briefing." },
        { title: "Partenza insieme", text: "Segnaposto: partenza allo scoccare dell'ora, in pieno stile backyard." },
        { title: "Loop per gruppi di passo", text: "Segnaposto: si corre nel proprio gruppo di passo, nessuno resta solo." },
        { title: "Conclusione", text: "Segnaposto: chiusura insieme e scambio di esperienze." },
      ],
    },
    form: {
      eyebrow: "Iscrizione",
      title: "Partecipa",
      lead: "L'iscrizione è gratuita. Dopo l'invio riceverai una conferma via e-mail.",
      vorname: "Nome",
      nachname: "Cognome",
      email: "E-mail",
      pace: "Gruppo di passo",
      pacePlaceholder: "Seleziona",
      paceOptions: {
        relaxed: "Tranquillo",
        moderate: "Medio",
        fast: "Sostenuto",
      },
      paceHint: "La scelta non è vincolante – puoi cambiare gruppo sul posto.",
      consentBefore: "Ho letto l'",
      consentLink: "informativa sulla privacy",
      consentAfter:
        " e acconsento al trattamento dei miei dati per l'organizzazione del Community Run.",
      workshop: "Sono interessato/a al workshop",
      workshopHint: "Solo manifestazione di interesse – non vincolante, nessun pagamento.",
      submit: "Iscriviti",
      sending: "Invio in corso …",
      success:
        "Grazie per l'iscrizione! Ti abbiamo inviato una conferma via e-mail – lì trovi anche il tuo link personale allo shop.",
      errors: {
        invalid_input: "Compila correttamente tutti i campi obbligatori.",
        duplicate:
          "Con questo indirizzo e-mail sei già iscritto/a. Controlla la tua casella (anche lo spam) per la nostra conferma.",
        rate_limited: "Troppi tentativi. Attendi un momento e riprova.",
        mail_failed:
          "Non è stato possibile inviare l'e-mail di conferma. Riprova tra qualche minuto.",
        server_error: "Qualcosa è andato storto. Riprova più tardi.",
      },
    },
    workshop: {
      eyebrow: "Workshop",
      title: "Più di una corsa",
      text: "Testo segnaposto: intorno al Community Run stiamo pianificando un workshop – contenuti e data seguiranno.",
      openNote: "Prezzo e modalità di pagamento non sono ancora definiti. L'iscrizione qui sopra registra solo il tuo interesse.",
    },
  },
  en: {
    metaTitle: "Community Run",
    metaDescription:
      "Dolomites Last Loop Community Run – not a race, a taste of it.",
    hero: {
      eyebrow: "Dolomites Last Loop",
      title: "Community Run",
      subtitle: "Not a race. A taste of it.",
      cta: "Sign up now",
    },
    info: [
      { label: "Date", value: "TBA" },
      { label: "Venue", value: "TBA" },
      { label: "Format", value: "TBA" },
    ],
    todoTag: "Placeholder",
    explainer: {
      eyebrow: "What it's about",
      title: "Not a race. A taste of it.",
      paragraphs: [
        "Placeholder text: the Community Run isn't about times or rankings. We run together, to the rhythm of the Backyard Ultra – loop after loop.",
        "Placeholder text: perfect for anyone who wants to get to know the format before stepping up to the Dolomites Last Loop start line.",
      ],
    },
    timeline: {
      eyebrow: "Schedule",
      title: "How the day works",
      steps: [
        { title: "Meet-up", text: "Placeholder: arrival, check-in without bib, short briefing." },
        { title: "Start together", text: "Placeholder: start on the hour, backyard style." },
        { title: "Loops in pace groups", text: "Placeholder: run in your own pace group, nobody is left alone." },
        { title: "Wrap-up", text: "Placeholder: finishing together and swapping stories." },
      ],
    },
    form: {
      eyebrow: "Sign up",
      title: "Join us",
      lead: "Signing up is free. After submitting you'll receive a confirmation by email.",
      vorname: "First name",
      nachname: "Last name",
      email: "Email",
      pace: "Pace group",
      pacePlaceholder: "Please choose",
      paceOptions: {
        relaxed: "Relaxed",
        moderate: "Moderate",
        fast: "Fast",
      },
      paceHint: "Not binding – you can switch groups on the day.",
      consentBefore: "I have read the ",
      consentLink: "privacy policy",
      consentAfter:
        " and agree to my data being processed to organise the Community Run.",
      workshop: "I'm interested in the workshop",
      workshopHint: "Expression of interest only – non-binding, no payment.",
      submit: "Sign up",
      sending: "Sending …",
      success:
        "Thanks for signing up! We've sent you a confirmation email – it also contains your personal link to the shop.",
      errors: {
        invalid_input: "Please fill in all required fields correctly.",
        duplicate:
          "You're already signed up with this email address. Check your inbox (and spam folder) for our confirmation.",
        rate_limited: "Too many attempts. Please wait a moment and try again.",
        mail_failed:
          "We couldn't send the confirmation email. Please try again in a few minutes.",
        server_error: "Something went wrong. Please try again later.",
      },
    },
    workshop: {
      eyebrow: "Workshop",
      title: "More than a run",
      text: "Placeholder text: we're planning a workshop around the Community Run – content and date to follow.",
      openNote: "Price and payment method are not decided yet. The sign-up above only records your interest.",
    },
  },
};
