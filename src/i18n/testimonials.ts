import type { Lang } from "./ui";

type TestimonialItem = {
  quote: string;
  name: string;
  loops: number;
  year: number;
};

// Quotes are translated into all three languages; originals were German.
// The anonymous entries were consented to without a name – keep them nameless.
export const testimonials: Record<Lang, TestimonialItem[]> = {
  de: [
    {
      quote:
        "Die Challenge an sich, dass ihr das überhaupt organisiert habt, top. Und der Speaker Günther cooler Typ. Eigentlich war es eine lange \"Reise\" bei der man neue Bekanntschaften gemacht hat und mit Gleichgesinnten einen Austausch hatte.",
      name: "Marc",
      loops: 24,
      year: 2026,
    },
    {
      // anonym eingewilligt – KEIN Name
      quote:
        "Die Atmosphäre im Camp, die Small Talks mit verschiedenen Runnern in jedem Loop, die gesamte Stimmung war super.",
      name: "Teilnehmer",
      loops: 16,
      year: 2026,
    },
    {
      // anonym eingewilligt – KEIN Name
      quote:
        "Der gesamte Tag war unvergesslich – das Team war permanent freundlich und zuvorkommend. Die Organisation der Veranstaltung war TOP.",
      name: "Teilnehmerin",
      loops: 11,
      year: 2026,
    },
    {
      // anonym eingewilligt – KEIN Name (zweite Antwort derselben Person, bewusst separate Karte)
      quote:
        "Am liebsten würde ich den gesamten Tag nochmals erleben - DANKE für die Planung und perfekte Durchführung vom Backyard Ultra! Ich freue mich schon auf 2027! :)",
      name: "Teilnehmerin",
      loops: 11,
      year: 2026,
    },
  ],
  it: [
    {
      quote:
        "La sfida in sé, e il fatto che l'abbiate organizzata, top. E lo speaker Günther è un tipo in gamba. In fondo è stato un lungo «viaggio», in cui hai conosciuto gente nuova e ti sei confrontato con chi la pensa come te.",
      name: "Marc",
      loops: 24,
      year: 2026,
    },
    {
      // anonimo con consenso – NESSUN nome
      quote:
        "L'atmosfera al campo, le due chiacchiere con runner diversi a ogni loop, tutto l'ambiente era fantastico.",
      name: "Partecipante",
      loops: 16,
      year: 2026,
    },
    {
      // anonimo con consenso – NESSUN nome
      quote:
        "L'intera giornata è stata indimenticabile – il team è stato sempre gentile e disponibile. L'organizzazione dell'evento è stata TOP.",
      name: "Partecipante",
      loops: 11,
      year: 2026,
    },
    {
      // anonimo con consenso – NESSUN nome (seconda risposta della stessa persona, scheda separata voluta)
      quote:
        "Rifarei l'intera giornata subito - GRAZIE per l'organizzazione e per l'esecuzione perfetta del Backyard Ultra! Non vedo l'ora che arrivi il 2027! :)",
      name: "Partecipante",
      loops: 11,
      year: 2026,
    },
  ],
  en: [
    {
      quote:
        "The challenge itself, and that you even put it on — top-notch. And Günther on the mic, cool guy. Really it was one long \"journey\" where you met new people and got to talk with like-minded runners.",
      name: "Marc",
      loops: 24,
      year: 2026,
    },
    {
      // consented anonymously – NO name
      quote:
        "The atmosphere in the camp, the small talk with different runners on every loop — the whole mood was great.",
      name: "Participant",
      loops: 16,
      year: 2026,
    },
    {
      // consented anonymously – NO name
      quote:
        "The whole day was unforgettable – the team was friendly and helpful the entire time. The organisation of the event was TOP.",
      name: "Participant",
      loops: 11,
      year: 2026,
    },
    {
      // consented anonymously – NO name (second answer from the same person, deliberately a separate card)
      quote:
        "I'd live the whole day all over again - THANK YOU for planning and running the Backyard Ultra so perfectly! Already looking forward to 2027! :)",
      name: "Participant",
      loops: 11,
      year: 2026,
    },
  ],
};
