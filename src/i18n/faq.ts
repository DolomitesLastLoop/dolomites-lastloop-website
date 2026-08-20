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
        a: "Das Rennen startet am 15. Mai 2027 um 12:00 Uhr in Toblach. Alle weiteren Details kommunizieren wir rechtzeitig über Newsletter und Social Media.",
      },
      {
        q: "Gibt es Strom, Wasser und Verpflegung?",
        a: "Im zentralen Basislager an der Nordic Arena gibt es Wasser und Standard-Verpflegung. Eine allgemeine Stromversorgung für die Teamzonen gibt es nicht. Stattdessen steht eine zentrale Ladezone mit Ladetisch bereit, an der Athleten und Crew ihre eigenen elektronischen Geräte aufladen können. Eine ausführliche Liste folgt vor Saisonstart.",
      },
      {
        q: "Welche Teilnahmebedingungen gelten?",
        a: "Mindestalter 18 Jahre, vollständige Anmeldung inkl. Zahlung und ein ärztliches Attest. Das Attest kannst du nachreichen, es muss aber spätestens eine Woche vor dem Rennen bei uns sein (für 2027: bis 8. Mai 2027) und am Renntag noch gültig sein. Mit der Anmeldung wird das Reglement vollständig akzeptiert.",
      },
      {
        q: "Gibt es eine Zeitbegrenzung?",
        a: "Nein. Das Rennen läuft, bis nur noch ein Läufer übrig ist, der eine weitere komplette Runde im Stunden-Cutoff schafft.",
      },
      {
        q: "Wie ist das Basislager organisiert?",
        a: "Zentral an der Nordic Arena. Jeder Läufer erhält eine eigene 3×3 m Teamzone für Crew, Material und Versorgung. Der Aufbau erfolgt am Renntag selbst, im Check-in-Fenster von 08:30 bis 11:00 Uhr; ab 10:45 Uhr dürfen keine Fahrzeuge mehr auf das Gelände. Ein Aufbau am Vortag ist nicht möglich.",
      },
      {
        q: "Welche Pflichtausrüstung brauche ich?",
        a: "Laufschuhe, dem Wetter angepasste Bekleidung, Mobiltelefon mit hinterlegter Notfallnummer und ab 20:00 Uhr eine funktionstüchtige Stirnlampe. Laufstöcke sind nicht erlaubt.",
      },
      {
        q: "Werden Fotos von mir veröffentlicht?",
        a: "Ja. Beim Rennen sind Fotografen im Einsatz, und die Bilder erscheinen auf dieser Website, auf unseren Social-Media-Kanälen und in der Presse. Das läuft nicht über eine Einwilligung bei der Anmeldung, sondern über unser berechtigtes Interesse an der Dokumentation eines öffentlichen Sportevents (Art. 6 Abs. 1 lit. f DSGVO). Du kannst der Veröffentlichung jederzeit widersprechen – ohne Begründung und ohne Nachteil für deine Teilnahme: eine formlose E-Mail an info@worldcup-dobbiaco.it genügt, am besten mit Startnummer und, falls du ihn hast, dem Link zum Bild. Wir nehmen die Aufnahme dann von unseren eigenen Kanälen oder machen dich unkenntlich, in der Regel innerhalb von 14 Tagen. Bei Bildern, die schon bei Presse oder Sponsoren liegen, fordern wir die Entfernung an, können sie dort aber nicht garantieren. Für Werbung mit dir als erkennbarem Gesicht einer Kampagne würden wir dich vorher separat fragen.",
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
        a: "La gara parte il 15 maggio 2027 alle ore 12:00 a Dobbiaco. Tutti gli altri dettagli saranno comunicati per tempo via newsletter e social.",
      },
      {
        q: "Ci sono corrente, acqua e ristoro?",
        a: "Nel campo base centrale alla Nordic Arena ci sono acqua e ristoro base. Non è prevista una fornitura elettrica generale per le team zone. È invece disponibile una zona di ricarica centrale con tavolo di ricarica, dove atleti e crew possono ricaricare i propri dispositivi elettronici. La lista dettagliata sarà pubblicata prima della gara.",
      },
      {
        q: "Quali sono le condizioni di partecipazione?",
        a: "Età minima 18 anni, iscrizione e pagamento completati e un certificato medico. Il certificato può essere trasmesso successivamente, ma deve pervenirci al più tardi una settimana prima della gara (per il 2027: entro l’8 maggio 2027) ed essere ancora valido il giorno della gara. L’iscrizione implica l’accettazione integrale del regolamento.",
      },
      {
        q: "C’è un tempo limite?",
        a: "No. La gara prosegue finché resta un solo atleta in grado di completare un altro giro entro il cutoff orario.",
      },
      {
        q: "Come è organizzato il campo base?",
        a: "Centrale alla Nordic Arena. Ogni atleta ha la propria area team 3×3 m per crew, materiale e rifornimenti. L’allestimento avviene il giorno stesso della gara, nella finestra di check-in dalle 08:30 alle 11:00; dalle 10:45 non sono più ammessi veicoli nell’area. Non è possibile allestire il giorno prima.",
      },
      {
        q: "Qual è il materiale obbligatorio?",
        a: "Scarpe da corsa, abbigliamento adeguato al meteo, cellulare con numero di emergenza memorizzato e dalle 20:00 una frontale funzionante. I bastoncini non sono ammessi.",
      },
      {
        q: "Verranno pubblicate foto che mi ritraggono?",
        a: "Sì. Durante la gara sono presenti fotografi e le immagini vengono pubblicate su questo sito, sui nostri canali social e sulla stampa. Ciò non avviene sulla base di un consenso raccolto al momento dell’iscrizione, ma sul nostro legittimo interesse a documentare una manifestazione sportiva pubblica (art. 6, par. 1, lett. f, GDPR). Puoi opporti alla pubblicazione in qualsiasi momento, senza motivazione e senza conseguenze sulla tua partecipazione: basta una e-mail informale a info@worldcup-dobbiaco.it, preferibilmente con il numero di pettorale e, se lo hai, il link all’immagine. Rimuoveremo la foto dai nostri canali o renderemo irriconoscibile la tua persona, di norma entro 14 giorni. Per le immagini già in mano alla stampa o agli sponsor ne richiediamo la rimozione, senza però poterla garantire. Per un uso pubblicitario in cui saresti il volto riconoscibile di una campagna ti chiederemmo prima un consenso specifico.",
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
        a: "The race kicks off on May 15, 2027 at 12:00 in Toblach. All further details will be announced in time via newsletter and social channels.",
      },
      {
        q: "Is there power, water, and food?",
        a: "The central base camp at the Nordic Arena provides water and basic aid. There is no general power supply for the team zones. Instead, a central charging area with a charging table is available, where athletes and crew can charge their own electronic devices. A full list will be published before race day.",
      },
      {
        q: "What are the participation requirements?",
        a: "Minimum age 18, completed registration and payment, and a medical certificate. You can submit the certificate later, but it must reach us no later than one week before the race (for 2027: by 8 May 2027) and must still be valid on race day. Signing up implies full acceptance of the rules.",
      },
      {
        q: "Is there a time limit?",
        a: "No. The race continues until only one runner is left who completes one more loop within the hourly cutoff.",
      },
      {
        q: "How is the base camp organised?",
        a: "Centrally at the Nordic Arena. Each runner gets their own 3×3 m team zone for crew, gear, and supplies. Setup takes place on race day itself, within the check-in window from 08:30 to 11:00; from 10:45 no vehicles are allowed on site. Setting up the day before is not possible.",
      },
      {
        q: "What mandatory gear do I need?",
        a: "Running shoes, weather-appropriate clothing, a phone with the emergency number stored, and from 20:00 a working headlamp. Trekking poles are not allowed.",
      },
      {
        q: "Will photos of me be published?",
        a: "Yes. Photographers work the race, and the images appear on this website, on our social media channels and in the press. This is not based on a consent you give at registration but on our legitimate interest in documenting a public sporting event (Art. 6(1)(f) GDPR). You can object to publication at any time – without giving reasons and without any disadvantage to your participation: an informal email to info@worldcup-dobbiaco.it is enough, ideally with your bib number and, if you have it, the link to the image. We will then take the image off our own channels or make you unrecognisable, as a rule within 14 days. For images already held by press or sponsors we request removal but cannot guarantee it. For advertising in which you would be the recognisable face of a campaign, we would ask you separately beforehand.",
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
