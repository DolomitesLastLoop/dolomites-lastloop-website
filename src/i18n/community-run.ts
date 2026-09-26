import type { Lang } from "./ui";

// Texte der Community-Run-Landingpage (/[lang]/community-run).
// Eigene Datei statt ui.ts: Record<Lang, …> erzwingt per TypeScript, dass DE/IT/EN
// vollständig sind (ui.ts fällt bei fehlenden Keys still auf DE zurück).
//
// Stand 2026-09-26: Datum, Treffpunkt, Ablauf und Workshop final. Keine Tempogruppen
// (ein gemeinsames Tempo, 2 Loops). Workshop sitzt als Karte im Anmeldeformular.
// Offen nur noch: Zahlungsart des Workshops.

export type CommunityRunCopy = {
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; title: string; subtitle: string; cta: string };
  info: { label: string; value: string }[];
  explainer: { eyebrow: string; title: string; paragraphs: string[] };
  timeline: { eyebrow: string; title: string; steps: { title: string; text: string }[] };
  form: {
    eyebrow: string;
    title: string;
    lead: string;
    benefitsTitle: string;
    benefits: { title: string; text: string }[];
    vorname: string;
    nachname: string;
    email: string;
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
      "Community Run der Dolomites Last Loop – zwei Loops, ein Tempo, alle zusammen.",
    hero: {
      eyebrow: "Dolomites Last Loop",
      title: "Community Run",
      subtitle: "Zwei Loops. Ein Tempo. Alle zusammen.",
      cta: "Jetzt anmelden",
    },
    info: [
      { label: "Datum", value: "24.10.2026" },
      { label: "Uhrzeit", value: "14:00 Uhr" },
      { label: "Treffpunkt", value: "Parkplatz Nordic Arena Toblach" },
    ],
    explainer: {
      eyebrow: "Worum es geht",
      title: "Zwei Loops. Ein Tempo. Alle zusammen.",
      paragraphs: [
        "Wir laufen gemeinsam zwei Loops der Originalstrecke in einem entspannten Tempo — die Chance, das Gelände, die Schlüsselstellen und das Gefühl der Strecke kennenzulernen, bevor es im Mai ernst wird.",
      ],
    },
    timeline: {
      eyebrow: "Ablauf",
      title: "So läuft der Tag",
      steps: [
        { title: "Treffpunkt", text: "14:00 Uhr, Parkplatz Nordic Arena Toblach" },
        { title: "Gemeinsam los", text: "Ein Tempo für alle" },
        { title: "Strecke kennenlernen", text: "2 Loops der Originalstrecke, Schlüsselstellen und Wegpunkte im Blick" },
        { title: "Ziel & Workshop", text: "Gemeinsamer Ausklang, im Anschluss optional der Workshop" },
      ],
    },
    form: {
      eyebrow: "Anmeldung",
      title: "Sei dabei",
      lead: "Die Anmeldung ist kostenlos und schaltet dir den exklusiven Shop frei. Nach dem Absenden bekommst du eine Bestätigung per E-Mail.",
      benefitsTitle: "Das bekommst du",
      benefits: [
        { title: "Community Run – kostenlos", text: "Zwei Loops der Originalstrecke, gemeinsam in einem Tempo." },
        {
          title: "Exklusiver Shop-Zugang",
          text: "Mit deiner Anmeldung bekommst du per E-Mail deinen persönlichen Link zur Last Loop Collection – nur für Teilnehmer:innen.",
        },
        { title: "Optional: Workshop", text: "„Der mentale Faktor“ im Anschluss – direkt im Formular auswählbar." },
      ],
      vorname: "Vorname",
      nachname: "Nachname",
      email: "E-Mail",
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
    workshop: {
      eyebrow: "Workshop",
      title: "Der mentale Faktor.",
      text: "Ultra-Distanzen sind nicht nur eine Frage der Beine. Im Workshop im Anschluss an den Community Run geht es um die mentale Seite von Backyard-Ultras — wie du mit Zweifeln, Müdigkeit und der immer wiederkehrenden Stunde umgehst. Teilnahme: 5€.",
      openNote: "Die Zahlungsart geben wir noch bekannt. Dieses Häkchen erfasst nur dein Interesse.",
    },
  },
  it: {
    metaTitle: "Community Run",
    metaDescription:
      "Community Run della Dolomites Last Loop – due loop, un ritmo, tutti insieme.",
    hero: {
      eyebrow: "Dolomites Last Loop",
      title: "Community Run",
      subtitle: "Due loop. Un ritmo. Tutti insieme.",
      cta: "Iscriviti ora",
    },
    info: [
      { label: "Data", value: "24.10.2026" },
      { label: "Orario", value: "Ore 14:00" },
      { label: "Ritrovo", value: "Parcheggio Nordic Arena Dobbiaco" },
    ],
    explainer: {
      eyebrow: "Di cosa si tratta",
      title: "Due loop. Un ritmo. Tutti insieme.",
      paragraphs: [
        "Corriamo insieme due loop del percorso originale a un ritmo tranquillo — l'occasione di conoscere il terreno, i punti chiave e le sensazioni del percorso, prima che a maggio si faccia sul serio.",
      ],
    },
    timeline: {
      eyebrow: "Programma",
      title: "Come si svolge la giornata",
      steps: [
        { title: "Ritrovo", text: "Ore 14:00, parcheggio Nordic Arena Dobbiaco" },
        { title: "Si parte insieme", text: "Un unico ritmo per tutti" },
        { title: "Conoscere il percorso", text: "2 loop del percorso originale, con i punti chiave e i riferimenti sotto controllo" },
        { title: "Arrivo & workshop", text: "Chiusura insieme, a seguire il workshop facoltativo" },
      ],
    },
    form: {
      eyebrow: "Iscrizione",
      title: "Partecipa",
      lead: "L'iscrizione è gratuita e ti dà accesso allo shop esclusivo. Dopo l'invio riceverai una conferma via e-mail.",
      benefitsTitle: "Cosa ricevi",
      benefits: [
        { title: "Community Run – gratuito", text: "Due loop del percorso originale, insieme a un unico ritmo." },
        {
          title: "Accesso esclusivo allo shop",
          text: "Con l'iscrizione ricevi via e-mail il tuo link personale alla Last Loop Collection – solo per chi partecipa.",
        },
        { title: "Facoltativo: workshop", text: "«Il fattore mentale» a seguire – selezionabile direttamente nel modulo." },
      ],
      vorname: "Nome",
      nachname: "Cognome",
      email: "E-mail",
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
      title: "Il fattore mentale.",
      text: "Le ultra distanze non sono solo una questione di gambe. Nel workshop che segue il Community Run parleremo del lato mentale dei backyard ultra — come gestire dubbi, stanchezza e l'ora che ritorna sempre. Partecipazione: 5€.",
      openNote: "Comunicheremo più avanti la modalità di pagamento. Questa casella registra solo il tuo interesse.",
    },
  },
  en: {
    metaTitle: "Community Run",
    metaDescription:
      "Dolomites Last Loop Community Run – two loops, one pace, all together.",
    hero: {
      eyebrow: "Dolomites Last Loop",
      title: "Community Run",
      subtitle: "Two loops. One pace. All together.",
      cta: "Sign up now",
    },
    info: [
      { label: "Date", value: "24 October 2026" },
      { label: "Time", value: "2:00 pm" },
      { label: "Meeting point", value: "Nordic Arena car park, Toblach/Dobbiaco" },
    ],
    explainer: {
      eyebrow: "What it's about",
      title: "Two loops. One pace. All together.",
      paragraphs: [
        "Together we run two loops of the original course at a relaxed pace — the chance to get to know the terrain, the key sections and the feel of the course before things get serious in May.",
      ],
    },
    timeline: {
      eyebrow: "Schedule",
      title: "How the day works",
      steps: [
        { title: "Meet-up", text: "2:00 pm, Nordic Arena car park, Toblach/Dobbiaco" },
        { title: "Off together", text: "One pace for everyone" },
        { title: "Get to know the course", text: "2 loops of the original course, with the key sections and waypoints in view" },
        { title: "Finish & workshop", text: "Wrapping up together, followed by the optional workshop" },
      ],
    },
    form: {
      eyebrow: "Sign up",
      title: "Join us",
      lead: "Signing up is free and unlocks the exclusive shop. After submitting you'll receive a confirmation by email.",
      benefitsTitle: "What you get",
      benefits: [
        { title: "Community Run – free", text: "Two loops of the original course, together at one pace." },
        {
          title: "Exclusive shop access",
          text: "When you sign up, you'll receive your personal link to the Last Loop Collection by email – for participants only.",
        },
        { title: "Optional: workshop", text: "\"The mental factor\" afterwards – select it right in the form." },
      ],
      vorname: "First name",
      nachname: "Last name",
      email: "Email",
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
      title: "The mental factor.",
      text: "Ultra distances aren't just a matter of legs. In the workshop following the Community Run we'll focus on the mental side of backyard ultras — how to deal with doubt, fatigue and the hour that keeps coming back. Participation: €5.",
      openNote: "We'll announce the payment method later. This checkbox only records your interest.",
    },
  },
};
