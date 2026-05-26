import type { Lang } from "./ui";

type FaqItem = { q: string; a: string };
type FaqContent = { participants: FaqItem[]; crew: FaqItem[] };

export const faq: Record<Lang, FaqContent> = {
  de: {
    participants: [
      {
        q: "Wie funktioniert der Dolomites Last Loop?",
        a: "Jede volle Stunde startet ein gemeinsamer Loop von 6,71 km. Wer rechtzeitig zurück ist, startet zur nächsten Stunde erneut. Wer nicht rechtzeitig zurück ist, scheidet aus. Sieger ist der letzte Läufer, der noch eine zusätzliche Runde komplett schafft.",
      },
      {
        q: "Wann findet die Ausgabe 2027 statt?",
        a: "Das Rennen startet am 15. Mai 2027 in Toblach. Die genaue Startuhrzeit und alle weiteren Details kommunizieren wir rechtzeitig über Newsletter und Social Media.",
      },
      {
        q: "Gibt es Strom, Wasser und Verpflegung?",
        a: "Ja. Im zentralen Basislager an der Nordic Arena gibt es Strom für die Teamzone, Wasser, Tee, Suppe und Standard-Verpflegung. Eine ausführliche Liste folgt vor Saisonstart.",
      },
      {
        q: "Welche Teilnahmebedingungen gelten?",
        a: "Mindestalter 18 Jahre, vollständige Anmeldung inkl. Zahlung und ärztliches Attest vor dem Renntag. Mit der Anmeldung wird das Reglement vollständig akzeptiert.",
      },
      {
        q: "Gibt es eine Zeitbegrenzung?",
        a: "Nein. Das Rennen läuft, bis nur noch ein Läufer übrig ist, der eine weitere komplette Runde im Stunden-Cutoff schafft.",
      },
      {
        q: "Wie ist das Basislager organisiert?",
        a: "Zentral an der Nordic Arena. Jeder Läufer erhält eine eigene 3×3 m Teamzone für Crew, Material und Versorgung. Aufbau ist am Tag vor dem Rennen möglich.",
      },
      {
        q: "Welche Pflichtausrüstung brauche ich?",
        a: "Laufschuhe, dem Wetter angepasste Bekleidung, Mobiltelefon mit hinterlegter Notfallnummer und ab 20:00 Uhr eine funktionstüchtige Stirnlampe. Laufstöcke sind nicht erlaubt.",
      },
    ],
    crew: [
      {
        q: "Wo ist die Support-Zone?",
        a: "Zentral am Start-/Zielbereich an der Nordic Arena. Jeder Läufer hat eine fixe 3×3 m Teamzone.",
      },
      {
        q: "Was darf ich meinem Läufer geben?",
        a: "Verpflegung, Getränke, Kleidung, Material und mentale Unterstützung – innerhalb der Teamzone. Außerhalb der Zone bzw. entlang der Strecke ist Support nicht erlaubt.",
      },
      {
        q: "Darf ich auf der Strecke mitlaufen?",
        a: "Nein. Mitlaufen und Pacen auf der Strecke ist nicht gestattet. Anfeuern an klar markierten Zonen ist willkommen.",
      },
    ],
  },
  it: {
    participants: [
      {
        q: "Come funziona il Dolomites Last Loop?",
        a: "Ogni ora esatta parte un loop comune di 6,71 km. Chi rientra in tempo parte di nuovo all’ora successiva. Chi non rientra è fuori. Vince l’ultimo atleta che completa un giro in più di tutti gli altri.",
      },
      {
        q: "Quando si svolge l’edizione 2027?",
        a: "La gara parte il 15 maggio 2027 a Dobbiaco. L’orario esatto di partenza e tutti gli altri dettagli saranno comunicati per tempo via newsletter e social.",
      },
      {
        q: "Ci sono corrente, acqua e ristoro?",
        a: "Sì. Nel campo base centrale alla Nordic Arena ci saranno corrente per la team zone, acqua, tè, zuppa e ristoro base. La lista dettagliata sarà pubblicata prima della gara.",
      },
      {
        q: "Quali sono le condizioni di partecipazione?",
        a: "Età minima 18 anni, iscrizione e pagamento completati, certificato medico prima della gara. L’iscrizione implica l’accettazione integrale del regolamento.",
      },
      {
        q: "C’è un tempo limite?",
        a: "No. La gara prosegue finché resta un solo atleta in grado di completare un altro giro entro il cutoff orario.",
      },
      {
        q: "Come è organizzato il campo base?",
        a: "Centrale alla Nordic Arena. Ogni atleta ha la propria area team 3×3 m per crew, materiale e rifornimenti. L’allestimento è possibile il giorno prima della gara.",
      },
      {
        q: "Qual è il materiale obbligatorio?",
        a: "Scarpe da corsa, abbigliamento adeguato al meteo, cellulare con numero di emergenza memorizzato e dalle 20:00 una frontale funzionante. I bastoncini non sono ammessi.",
      },
    ],
    crew: [
      {
        q: "Dove si trova la zona supporto?",
        a: "Centrale, nell’area partenza/arrivo alla Nordic Arena. Ogni atleta ha la propria area team 3×3 m.",
      },
      {
        q: "Cosa posso dare al mio atleta?",
        a: "Ristoro, bevande, abbigliamento, materiale e supporto mentale – all’interno della team zone. Fuori dalla zona e lungo il percorso il supporto non è consentito.",
      },
      {
        q: "Posso correre con il mio atleta?",
        a: "No. Pacer e accompagnatori non sono ammessi sul percorso. Il tifo nelle aree segnalate è il benvenuto.",
      },
    ],
  },
  en: {
    participants: [
      {
        q: "How does the Dolomites Last Loop work?",
        a: "Every hour on the hour, a common 6.71 km loop starts. If you finish in time, you start again the next hour. Miss the cutoff and you’re out. The winner is the last runner to complete one more full loop than everyone else.",
      },
      {
        q: "When does the 2027 edition take place?",
        a: "The race kicks off on May 15, 2027 in Toblach. The exact start time and all further details will be announced in time via newsletter and social channels.",
      },
      {
        q: "Is there power, water, and food?",
        a: "Yes. The central base camp at the Nordic Arena provides power for team zones, water, tea, soup, and basic aid. A full list will be published before race day.",
      },
      {
        q: "What are the participation requirements?",
        a: "Minimum age 18, completed registration and payment, medical certificate before race day. Signing up implies full acceptance of the rules.",
      },
      {
        q: "Is there a time limit?",
        a: "No. The race continues until only one runner is left who completes one more loop within the hourly cutoff.",
      },
      {
        q: "How is the base camp organised?",
        a: "Centrally at the Nordic Arena. Each runner gets their own 3×3 m team zone for crew, gear, and supplies. Setup is possible the day before the race.",
      },
      {
        q: "What mandatory gear do I need?",
        a: "Running shoes, weather-appropriate clothing, a phone with the emergency number stored, and from 20:00 a working headlamp. Trekking poles are not allowed.",
      },
    ],
    crew: [
      {
        q: "Where is the support zone?",
        a: "Central, in the start/finish area at the Nordic Arena. Each runner has a fixed 3×3 m team area.",
      },
      {
        q: "What can I hand my runner?",
        a: "Food, drinks, clothing, gear, and mental support – inside the team zone only. Support along the course is not allowed.",
      },
      {
        q: "Can I pace my runner on the course?",
        a: "No. Pacers and accompanying runners are not allowed on the course. Cheering from marked areas is welcome.",
      },
    ],
  },
};
