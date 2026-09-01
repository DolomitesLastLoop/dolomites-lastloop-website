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
        q: "Was kostet die Teilnahme und was ist inkludiert?",
        a: "Das Startgeld ist gestaffelt: 75 € Frühanmeldung (01.09.–31.12.2026), 80 € Normaltarif (01.01.–31.03.2027), 100 € Spätanmeldung (01.04.–30.04.2027). Danach ist die Anmeldung geschlossen. Maßgeblich ist der Zeitpunkt deiner Bezahlung. Inkludiert sind Startplatz, Startnummer, eigene Teamzone, Verpflegung und ein Finisher-Geschenk. Das Teilnehmerfeld ist auf 200 Startplätze begrenzt; ist die Zahl erreicht, führen wir eine Warteliste.",
      },
      {
        q: "Gibt es Strom, Wasser und Verpflegung?",
        a: "Im zentralen Basislager an der Nordic Arena gibt es Wasser und Standard-Verpflegung. Eine allgemeine Stromversorgung für die Teamzonen gibt es nicht. Stattdessen steht eine zentrale Ladezone mit Ladetisch bereit, an der Athleten und Crew ihre eigenen elektronischen Geräte aufladen können. Eine ausführliche Liste folgt vor Saisonstart.",
      },
      {
        q: "Welche Teilnahmebedingungen gelten?",
        a: "Mindestalter 18 Jahre, vollständige Anmeldung inkl. Zahlung und ein sportärztliches Attest. Sportärztlich heißt: ausgestellt von einer Ärztin oder einem Arzt mit sportmedizinischer Qualifikation (in Italien: certificato medico agonistico) – ein normales Attest vom Hausarzt reicht nicht. Das Attest kannst du nachreichen, es muss aber spätestens eine Woche vor dem Rennen bei uns sein (für 2027: bis 8. Mai 2027) und am Renntag noch gültig sein. Mit der Anmeldung wird das Reglement vollständig akzeptiert.",
      },
      {
        q: "Kann ich stornieren oder meinen Startplatz übertragen?",
        a: "Eine Geldrückerstattung des Startgelds gibt es grundsätzlich nicht. Bei einer nachgewiesenen Verletzung (ärztliches Attest) erhältst du stattdessen einen kostenlosen Startplatz im Folgejahr – ausgezahlt wird auch in diesem Fall nichts. Stornoanfragen bearbeiten wir innerhalb einer Woche. Alternativ kannst du deinen Startplatz bis spätestens zwei Wochen vor dem Rennen an eine andere Person übertragen; dabei entfallen der Anspruch auf die kostenlose Teilnahme im Folgejahr und die Personalisierung der Startnummer. Muss das Rennen durch den Veranstalter wegen höherer Gewalt abgesagt werden, wird das Startgeld voll zurückerstattet. Es gelten die AGB.",
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
        q: "Wo kann ich parken?",
        a: "Direkt vor der Nordic Arena gibt es eine kurze Halte- und Lademöglichkeit, um die Ausrüstung für die eigene Teamzone auszuladen. Danach wird jedem Fahrzeug ein konkreter Parkplatz zugewiesen – eine freie Parkplatzsuche gibt es nicht. Bitte beachte, dass ab 10:45 Uhr keine Fahrzeuge mehr auf das Gelände dürfen.",
      },
      {
        q: "Gibt es Toiletten und Duschen vor Ort?",
        a: "Ja. Toiletten und Duschen stehen im Bereich des Basislagers zur Verfügung und sind vor Ort entsprechend ausgeschildert.",
      },
      {
        q: "Welche Pflichtausrüstung brauche ich?",
        a: "Laufschuhe, dem Wetter angepasste Bekleidung, Mobiltelefon mit hinterlegter Notfallnummer und ab 20:00 Uhr eine funktionstüchtige Stirnlampe. Laufstöcke sind nicht erlaubt.",
      },
      {
        q: "Was passiert bei schlechtem Wetter?",
        a: "Der Dolomites Last Loop findet grundsätzlich bei jedem Wetter statt – dem Wetter angepasste Bekleidung gehört zur Pflichtausrüstung. Nur bei höherer Gewalt (extreme Witterung, behördliche Auflagen, Naturereignisse) kann die Veranstaltung verschoben, verkürzt oder abgesagt werden. Muss der Veranstalter absagen, wird das Startgeld voll zurückerstattet; weitergehende Ansprüche bestehen nicht. Kurzfristige Änderungen kommunizieren wir über Newsletter und Social Media.",
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
        q: "Wie viele Crew-Mitglieder sind erlaubt – und darf ein ausgeschiedener Läufer crewen?",
        a: "Pro Athlet sind vier feste Crew-Mitglieder zugelassen. Sie werden vor dem Rennen benannt und können während des Rennens nicht ausgetauscht werden. Ein Läufer, der ausgeschieden ist, darf danach nicht als Crew für einen anderen Athleten einspringen. Als Zuschauer ist er selbstverständlich weiter willkommen – aber nur von den dafür ausgewiesenen Zuschauerplätzen aus.",
      },
      {
        q: "Was darf ich meinem Läufer geben?",
        a: "Verpflegung, Getränke, Kleidung, Material und mentale Unterstützung – innerhalb der Teamzone. Außerhalb der Zone bzw. entlang der Strecke ist Support nicht erlaubt.",
      },
      {
        q: "Darf ich auf der Strecke mitlaufen?",
        a: "Nein. Mitlaufen und Pacen auf der Strecke ist nicht gestattet. Anfeuern an klar markierten Zonen ist willkommen.",
      },
      {
        q: "Können Zuschauer zum Rennen kommen?",
        a: "Ja, Zuschauer sind willkommen. Bitte haltet euch dabei ausschließlich an die dafür vorgesehenen Zuschauerplätze. Die Teamzonen und die Strecke selbst bleiben den Athleten und der jeweiligen Crew vorbehalten.",
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
        q: "Quanto costa l’iscrizione e cosa comprende?",
        a: "La quota è scaglionata: 75 € iscrizione anticipata (01/09–31/12/2026), 80 € tariffa normale (01/01–31/03/2027), 100 € iscrizione tardiva (01/04–30/04/2027). Successivamente le iscrizioni sono chiuse. Fa fede il momento del pagamento. Sono inclusi il posto di partenza, il pettorale, la propria team zone, il ristoro e un regalo finisher. Il numero di partecipanti è limitato a 200; al raggiungimento del massimo viene istituita una lista d’attesa.",
      },
      {
        q: "Ci sono corrente, acqua e ristoro?",
        a: "Nel campo base centrale alla Nordic Arena ci sono acqua e ristoro base. Non è prevista una fornitura elettrica generale per le team zone. È invece disponibile una zona di ricarica centrale con tavolo di ricarica, dove atleti e crew possono ricaricare i propri dispositivi elettronici. La lista dettagliata sarà pubblicata prima della gara.",
      },
      {
        q: "Quali sono le condizioni di partecipazione?",
        a: "Età minima 18 anni, iscrizione e pagamento completati e un certificato medico agonistico, rilasciato da un medico con qualifica in medicina dello sport – un certificato generico del medico di base non è sufficiente. Il certificato può essere trasmesso successivamente, ma deve pervenirci al più tardi una settimana prima della gara (per il 2027: entro l’8 maggio 2027) ed essere ancora valido il giorno della gara. L’iscrizione implica l’accettazione integrale del regolamento.",
      },
      {
        q: "Posso annullare l’iscrizione o trasferire il mio posto di partenza?",
        a: "In linea di principio non è previsto alcun rimborso in denaro della quota d’iscrizione. In caso di infortunio documentato (certificato medico) hai invece diritto alla partecipazione gratuita nell’anno successivo; anche in questo caso non viene rimborsato alcun importo. Le richieste di cancellazione vengono evase entro una settimana. In alternativa puoi trasferire il tuo posto di partenza a un’altra persona fino a due settimane prima della gara; in tal caso decadono sia il diritto alla partecipazione gratuita nell’anno successivo sia la personalizzazione del pettorale. Se la gara viene annullata dall’organizzatore per cause di forza maggiore, la quota viene rimborsata integralmente. Valgono le condizioni di partecipazione.",
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
        q: "Dove posso parcheggiare?",
        a: "Davanti alla Nordic Arena è prevista una breve sosta per il carico e lo scarico, così da poter scaricare il materiale per la propria team zone. Successivamente a ogni veicolo viene assegnato un posto auto preciso: non è prevista la ricerca libera del parcheggio. Ricorda che dalle 10:45 non sono più ammessi veicoli nell’area.",
      },
      {
        q: "Ci sono servizi igienici e docce sul posto?",
        a: "Sì. Servizi igienici e docce sono disponibili nell’area del campo base e sono segnalati sul posto.",
      },
      {
        q: "Qual è il materiale obbligatorio?",
        a: "Scarpe da corsa, abbigliamento adeguato al meteo, cellulare con numero di emergenza memorizzato e dalle 20:00 una frontale funzionante. I bastoncini non sono ammessi.",
      },
      {
        q: "Cosa succede in caso di maltempo?",
        a: "Il Dolomites Last Loop si svolge in linea di principio con qualsiasi condizione meteo – l’abbigliamento adeguato al meteo fa parte del materiale obbligatorio. Solo in caso di forza maggiore (condizioni meteo estreme, disposizioni delle autorità, eventi naturali) la manifestazione può essere rinviata, accorciata o annullata. Se l’organizzatore deve annullare la gara, la quota d’iscrizione viene rimborsata integralmente; non sussistono ulteriori pretese. Eventuali modifiche dell’ultimo minuto vengono comunicate via newsletter e social.",
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
        q: "Quanti membri della crew sono ammessi – e un atleta ritirato può fare da crew?",
        a: "Per ogni atleta sono ammessi quattro membri della crew fissi. Vengono indicati prima della gara e non possono essere sostituiti durante la gara. Un atleta che si è ritirato non può poi subentrare come crew di un altro atleta. Come spettatore resta naturalmente il benvenuto – ma solo dalle postazioni per il pubblico appositamente indicate.",
      },
      {
        q: "Cosa posso dare al mio atleta?",
        a: "Ristoro, bevande, abbigliamento, materiale e supporto mentale – all’interno della team zone. Fuori dalla zona e lungo il percorso il supporto non è consentito.",
      },
      {
        q: "Posso correre con il mio atleta?",
        a: "No. Pacer e accompagnatori non sono ammessi sul percorso. Il tifo nelle aree segnalate è il benvenuto.",
      },
      {
        q: "Gli spettatori possono venire alla gara?",
        a: "Sì, gli spettatori sono i benvenuti. Vi chiediamo però di restare esclusivamente nelle postazioni per il pubblico previste. Le team zone e il percorso restano riservati agli atleti e alla rispettiva crew.",
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
        q: "What does entry cost and what’s included?",
        a: "The entry fee is tiered: €75 early bird (1 Sep – 31 Dec 2026), €80 standard (1 Jan – 31 Mar 2027), €100 late registration (1 Apr – 30 Apr 2027). After that, registration closes. The time of your payment is what counts. Included are your start spot, bib number, your own team zone, aid station food, and a finisher gift. The field is capped at 200 places; once we’re full we keep a waiting list.",
      },
      {
        q: "Is there power, water, and food?",
        a: "The central base camp at the Nordic Arena provides water and basic aid. There is no general power supply for the team zones. Instead, a central charging area with a charging table is available, where athletes and crew can charge their own electronic devices. A full list will be published before race day.",
      },
      {
        q: "What are the participation requirements?",
        a: "Minimum age 18, completed registration and payment, and a sports-medical certificate issued by a doctor with a sports-medicine qualification (in Italy: certificato medico agonistico) — a standard certificate from a family doctor is not enough. You can submit the certificate later, but it must reach us no later than one week before the race (for 2027: by 8 May 2027) and must still be valid on race day. Signing up implies full acceptance of the rules.",
      },
      {
        q: "Can I cancel my entry or transfer my start spot?",
        a: "As a rule, the entry fee is not refunded in cash. In the case of a documented injury (medical certificate) you receive a free start spot in the following year instead — no money is paid back in that case either. Cancellation requests are processed within one week. Alternatively, you can transfer your start spot to another person up to two weeks before the race; the entitlement to free participation the following year and the personalisation of your bib number then lapse. If the organiser has to cancel the race due to force majeure, the entry fee is refunded in full. The terms and conditions apply.",
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
        q: "Where can I park?",
        a: "Right in front of the Nordic Arena there is a short stopping and loading zone so you can unload the gear for your own team zone. After that, every vehicle is assigned a specific parking space – there is no searching for a spot on your own. Please note that from 10:45 no vehicles are allowed on site.",
      },
      {
        q: "Are there toilets and showers on site?",
        a: "Yes. Toilets and showers are available in the base camp area and are signposted on site.",
      },
      {
        q: "What mandatory gear do I need?",
        a: "Running shoes, weather-appropriate clothing, a phone with the emergency number stored, and from 20:00 a working headlamp. Trekking poles are not allowed.",
      },
      {
        q: "What happens if the weather is bad?",
        a: "The Dolomites Last Loop goes ahead in any weather — weather-appropriate clothing is part of the mandatory gear. Only in cases of force majeure (extreme weather, official orders, natural events) can the event be postponed, shortened, or cancelled. If the organiser has to cancel, the entry fee is refunded in full; no further claims apply. Any short-notice changes are announced via newsletter and social media.",
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
        q: "How many crew members are allowed – and can a runner who is out crew for someone else?",
        a: "Each athlete is allowed four fixed crew members. They are named before the race and cannot be swapped during the race. A runner who has dropped out may not then step in as crew for another athlete. They are of course still welcome as a spectator – but only from the designated spectator areas.",
      },
      {
        q: "What can I hand my runner?",
        a: "Food, drinks, clothing, gear, and mental support – inside the team zone only. Support along the course is not allowed.",
      },
      {
        q: "Can I pace my runner on the course?",
        a: "No. Pacers and accompanying runners are not allowed on the course. Cheering from marked areas is welcome.",
      },
      {
        q: "Can spectators come to the race?",
        a: "Yes, spectators are welcome. Please stay only in the designated spectator areas. The team zones and the course itself remain reserved for athletes and their crew.",
      },
    ],
  },
};
