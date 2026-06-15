import type { Lang } from "./ui";

// Strukturierte Rechtstexte (analog zu faq.ts).
// Block-Modell, gerendert in src/pages/[lang]/[legal].astro.
// Offene Werte sind durchgehend mit [AUSFÜLLEN] markiert.

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "note"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = { heading: string; blocks: LegalBlock[] };
export type LegalPage = { updated?: string; intro?: string; sections: LegalSection[] };

export type LegalSlug = "datenschutz" | "agb" | "barrierefreiheit" | "rueckerstattung";
export type LegalContent = Record<LegalSlug, LegalPage>;

export const legal: Record<Lang, LegalContent> = {
  // ───────────────────────────── DEUTSCH ─────────────────────────────
  de: {
    datenschutz: {
      intro:
        "Diese Datenschutzerklärung informiert dich gemäß der Datenschutz-Grundverordnung (EU) 2016/679 (DSGVO) sowie dem italienischen Datenschutzrecht (D.Lgs. 196/2003 i.d.F. des D.Lgs. 101/2018) über die Verarbeitung deiner personenbezogenen Daten im Rahmen der Veranstaltung „Dolomites Last Loop“.",
      sections: [
        {
          heading: "1. Verantwortlicher",
          blocks: [
            {
              type: "p",
              text: "Verantwortlicher im Sinne der DSGVO ist:",
            },
            {
              type: "list",
              items: [
                "Sport OK Toblach",
                "[ADRESSE AUSFÜLLEN]",
                "E-Mail (Datenschutz): [E-MAIL DATENSCHUTZ AUSFÜLLEN]",
              ],
            },
          ],
        },
        {
          heading: "2. Anmeldedaten",
          blocks: [
            {
              type: "p",
              text: "Für die Durchführung des Events verarbeiten wir die im Anmeldeformular erhobenen Daten. Diese Verarbeitung ist zweckgebunden und für die Vertragserfüllung sowie die Organisation und Sicherheit des Rennens erforderlich (Art. 6 Abs. 1 lit. b DSGVO).",
            },
            {
              type: "list",
              items: [
                "Vollständiger Name",
                "Steuernummer (Codice Fiscale)",
                "Geburtsort und Geburtsdatum",
                "Telefonnummer",
                "Notfallkontakt (Name und Telefonnummer)",
                "Ärztliches bzw. sportärztliches Attest (Gesundheitsdaten – siehe Punkt 3)",
              ],
            },
          ],
        },
        {
          heading: "3. Gesundheitsdaten – ärztliches Attest",
          blocks: [
            {
              type: "p",
              text: "Das von dir hochgeladene ärztliche bzw. sportärztliche Attest enthält Gesundheitsdaten und damit eine besondere Kategorie personenbezogener Daten.",
            },
            {
              type: "note",
              text: "Gesundheitsdaten sind besondere Kategorien personenbezogener Daten im Sinne von Art. 9 DSGVO. Wir verarbeiten dein Attest ausschließlich auf Grundlage deiner ausdrücklichen Einwilligung (Art. 9 Abs. 2 lit. a DSGVO), die du im Anmeldeprozess erteilst, sowie zum Schutz lebenswichtiger Interessen während des Rennens. Die Daten werden vertraulich behandelt, in einem privaten, zugriffsbeschränkten Speicher abgelegt und nur so lange aufbewahrt, wie es für die sichere Durchführung des Events erforderlich ist. Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.",
            },
          ],
        },
        {
          heading: "4. Zahlungsdaten (Stripe)",
          blocks: [
            {
              type: "p",
              text: "Die Zahlungsabwicklung des Startgelds erfolgt über Stripe Payments Europe, Ltd. Die für die Zahlung erforderlichen Daten (z. B. Kartendaten) werden direkt von Stripe erhoben und verarbeitet; wir erhalten keine vollständigen Zahlungsmittel-Daten. Stripe handelt insoweit als eigenständig Verantwortlicher.",
            },
            {
              type: "p",
              text: "Weitere Informationen findest du in der Datenschutzerklärung von Stripe: https://stripe.com/privacy",
            },
          ],
        },
        {
          heading: "5. Newsletter",
          blocks: [
            {
              type: "p",
              text: "Sofern du dich für unseren Newsletter anmeldest, verarbeiten wir deine E-Mail-Adresse und deinen Namen auf Grundlage deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Der Versand erfolgt im Double-Opt-in-Verfahren. Du kannst dich jederzeit über den Abmeldelink in jeder E-Mail oder per Nachricht an uns wieder abmelden.",
            },
            {
              type: "p",
              text: "Für den Newsletter-Versand setzen wir [NEWSLETTER-TOOL AUSFÜLLEN] als Auftragsverarbeiter ein.",
            },
          ],
        },
        {
          heading: "6. Technische Daten und Dienstleister",
          blocks: [
            {
              type: "p",
              text: "Beim Aufruf der Website werden technisch erforderliche Daten (z. B. IP-Adresse, Datum/Uhrzeit, abgerufene Seite) verarbeitet, um die Website sicher und stabil bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO).",
            },
            {
              type: "list",
              items: [
                "Hosting: Vercel Inc. – Auslieferung der Website (Serverstandort EU, sofern verfügbar).",
                "Datenbank/Speicher: Supabase – Speicherung der Teilnehmer- und Anmeldedaten.",
                "Es kommen keine Google Analytics oder vergleichbaren Tracking-Tools zum Einsatz.",
              ],
            },
          ],
        },
        {
          heading: "7. Speicherdauer",
          blocks: [
            {
              type: "p",
              text: "Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Teilnehmerdaten werden bis [SPEICHERDAUER AUSFÜLLEN] nach dem Event aufbewahrt und anschließend gelöscht oder anonymisiert. Gesundheitsdaten (Attest) werden nach dem Event unverzüglich gelöscht, sobald sie nicht mehr benötigt werden.",
            },
          ],
        },
        {
          heading: "8. Deine Rechte",
          blocks: [
            {
              type: "p",
              text: "Dir stehen hinsichtlich deiner personenbezogenen Daten folgende Rechte zu:",
            },
            {
              type: "list",
              items: [
                "Recht auf Auskunft (Art. 15 DSGVO)",
                "Recht auf Berichtigung (Art. 16 DSGVO)",
                "Recht auf Löschung (Art. 17 DSGVO)",
                "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
                "Recht auf Widerspruch (Art. 21 DSGVO)",
                "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
                "Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
              ],
            },
            {
              type: "p",
              text: "Zur Ausübung deiner Rechte wende dich an: [E-MAIL DATENSCHUTZ AUSFÜLLEN]",
            },
          ],
        },
        {
          heading: "9. Beschwerderecht",
          blocks: [
            {
              type: "p",
              text: "Du hast das Recht, dich bei einer Aufsichtsbehörde zu beschweren. Zuständig in Italien ist der Garante per la protezione dei dati personali (https://www.garanteprivacy.it).",
            },
          ],
        },
      ],
    },

    agb: {
      intro:
        "Diese Teilnahmebedingungen regeln die Teilnahme an der Veranstaltung „Dolomites Last Loop“ – Backyard Ultra in Toblach (Dobbiaco), Südtirol, am 15. Mai 2027, mit maximal 150 Teilnehmern. Veranstalter ist Sport OK Toblach.",
      sections: [
        {
          heading: "1. Anmeldung und Startgeld",
          blocks: [
            {
              type: "p",
              text: "Die Anmeldung erfolgt online und wird mit vollständiger Bezahlung des Startgelds verbindlich. Die Teilnehmerzahl ist auf 150 begrenzt; bei Erreichen der Höchstzahl wird eine Warteliste geführt. Das Startgeld ist gestaffelt:",
            },
            {
              type: "list",
              items: [
                "Frühanmeldung (Early-Bird): [STARTGELD FRÜH AUSFÜLLEN] €",
                "Normaltarif: [STARTGELD NORMAL AUSFÜLLEN] €",
                "Spätanmeldung: [STARTGELD SPÄT AUSFÜLLEN] €",
              ],
            },
          ],
        },
        {
          heading: "2. Stornobedingungen und Rückerstattung",
          blocks: [
            {
              type: "list",
              items: [
                "Bis [STORNO-DATUM 1 AUSFÜLLEN]: [STORNO-PROZENT 1 AUSFÜLLEN] % Rückerstattung des Startgelds.",
                "Bis [STORNO-DATUM 2 AUSFÜLLEN]: [STORNO-PROZENT 2 AUSFÜLLEN] % Rückerstattung des Startgelds.",
                "Ab [STORNO-DATUM 3 AUSFÜLLEN]: keine Rückerstattung.",
                "Eine Übertragung des Startplatzes an eine andere Person ist bis [ÜBERTRAGUNG-DATUM AUSFÜLLEN] möglich.",
              ],
            },
          ],
        },
        {
          heading: "3. Pflichtdokumente",
          blocks: [
            {
              type: "p",
              text: "Für die Teilnahme ist ein gültiges ärztliches bzw. sportärztliches Attest erforderlich. Es muss bei der Anmeldung hochgeladen werden und wird vor dem Start geprüft. Ohne gültiges Attest ist eine Teilnahme ausgeschlossen.",
            },
          ],
        },
        {
          heading: "4. Haftungsausschluss",
          blocks: [
            {
              type: "p",
              text: "Die Teilnahme erfolgt auf eigenes Risiko und in eigener gesundheitlicher Verantwortung. Der Veranstalter haftet nicht für Unfälle, Personen- oder Sachschäden sowie für den Verlust oder die Beschädigung mitgeführter Gegenstände, soweit gesetzlich zulässig.",
            },
          ],
        },
        {
          heading: "5. Regelwerk Backyard Ultra",
          blocks: [
            {
              type: "list",
              items: [
                "Loop-Distanz ca. 6,71 km (ca. 4,167 Meilen).",
                "Start jeder Runde jeweils zur vollen Stunde.",
                "Wer rechtzeitig zur nächsten vollen Stunde zurück ist, startet erneut.",
                "Sieger ist der letzte Läufer, der eine weitere vollständige Runde im Stunden-Cutoff beendet.",
              ],
            },
          ],
        },
        {
          heading: "6. Disqualifikation",
          blocks: [
            {
              type: "p",
              text: "Zur Disqualifikation führen insbesondere: Nichtantritt zum Loop-Start zur vollen Stunde, das Abkürzen der Strecke sowie die Nutzung unerlaubter Hilfsmittel außerhalb der dafür vorgesehenen Zonen.",
            },
          ],
        },
        {
          heading: "7. Bildrechte",
          blocks: [
            {
              type: "p",
              text: "Im Rahmen der Veranstaltung entstehen Foto- und Videoaufnahmen, die für die Öffentlichkeitsarbeit (Website, Social Media, Presse) verwendet werden können. Du kannst dieser Nutzung jederzeit widersprechen.",
            },
          ],
        },
        {
          heading: "8. Höhere Gewalt",
          blocks: [
            {
              type: "p",
              text: "Muss die Veranstaltung aus Gründen höherer Gewalt durch den Veranstalter abgesagt werden, erfolgt eine volle Rückerstattung des Startgelds.",
            },
          ],
        },
        {
          heading: "9. Anwendbares Recht und Gerichtsstand",
          blocks: [
            {
              type: "p",
              text: "Es gilt italienisches Recht. Ausschließlicher Gerichtsstand ist, soweit gesetzlich zulässig, Bozen.",
            },
          ],
        },
      ],
    },

    barrierefreiheit: {
      updated: "[BARRIEREFREIHEIT-PRÜFDATUM AUSFÜLLEN]",
      sections: [
        {
          heading: "Unser Anspruch",
          blocks: [
            {
              type: "p",
              text: "Wir bemühen uns, diese Website zugänglich zu gestalten und orientieren uns an den Web Content Accessibility Guidelines (WCAG) 2.1 auf Konformitätsstufe AA.",
            },
          ],
        },
        {
          heading: "Bekannte Einschränkungen",
          blocks: [
            {
              type: "p",
              text: "[BARRIEREFREIHEIT-EINSCHRÄNKUNGEN AUSFÜLLEN]",
            },
          ],
        },
        {
          heading: "Feedback und Kontakt",
          blocks: [
            {
              type: "p",
              text: "Wenn du auf Barrieren stößt oder Inhalte nicht zugänglich sind, melde dich bitte bei uns unter [E-MAIL AUSFÜLLEN]. Wir bemühen uns um eine zeitnahe Lösung.",
            },
          ],
        },
        {
          heading: "Letzte Überprüfung",
          blocks: [
            {
              type: "p",
              text: "Letzte Überprüfung dieser Erklärung: [BARRIEREFREIHEIT-PRÜFDATUM AUSFÜLLEN].",
            },
          ],
        },
      ],
    },

    rueckerstattung: {
      intro:
        "Diese Rückerstattungsrichtlinie ergänzt die Teilnahmebedingungen (AGB) und fasst die wichtigsten Punkte zur Erstattung des Startgelds zusammen.",
      sections: [
        {
          heading: "Gestaffelte Rückerstattung",
          blocks: [
            {
              type: "list",
              items: [
                "Bis [STORNO-DATUM 1 AUSFÜLLEN]: [STORNO-PROZENT 1 AUSFÜLLEN] % Rückerstattung.",
                "Bis [STORNO-DATUM 2 AUSFÜLLEN]: [STORNO-PROZENT 2 AUSFÜLLEN] % Rückerstattung.",
                "Ab [STORNO-DATUM 3 AUSFÜLLEN]: keine Rückerstattung.",
              ],
            },
          ],
        },
        {
          heading: "Antrag und Bearbeitung",
          blocks: [
            {
              type: "p",
              text: "Einen Antrag auf Rückerstattung stellst du per E-Mail an [RÜCKERSTATTUNG-E-MAIL AUSFÜLLEN]. Die Bearbeitung erfolgt in der Regel innerhalb von [BEARBEITUNGSZEIT AUSFÜLLEN] Werktagen.",
            },
            {
              type: "p",
              text: "Die Rückerstattung erfolgt auf die ursprüngliche Zahlungsmethode (über Stripe).",
            },
          ],
        },
        {
          heading: "Kein Anspruch auf Rückerstattung",
          blocks: [
            {
              type: "p",
              text: "Bei Disqualifikation oder freiwilligem Aufgeben während des Events besteht kein Anspruch auf Rückerstattung des Startgelds.",
            },
          ],
        },
      ],
    },
  },

  // ───────────────────────────── ITALIANO ─────────────────────────────
  it: {
    datenschutz: {
      intro:
        "La presente informativa sulla privacy ti informa, ai sensi del Regolamento (UE) 2016/679 (GDPR) e della normativa italiana in materia di protezione dei dati personali (D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018), sul trattamento dei tuoi dati personali nell’ambito dell’evento „Dolomites Last Loop“.",
      sections: [
        {
          heading: "1. Titolare del trattamento",
          blocks: [
            {
              type: "p",
              text: "Titolare del trattamento ai sensi del GDPR è:",
            },
            {
              type: "list",
              items: [
                "Sport OK Dobbiaco",
                "[ADRESSE AUSFÜLLEN]",
                "E-mail (privacy): [E-MAIL DATENSCHUTZ AUSFÜLLEN]",
              ],
            },
          ],
        },
        {
          heading: "2. Dati di iscrizione",
          blocks: [
            {
              type: "p",
              text: "Per lo svolgimento dell’evento trattiamo i dati raccolti nel modulo di iscrizione. Tale trattamento è vincolato allo scopo ed è necessario per l’esecuzione del contratto nonché per l’organizzazione e la sicurezza della gara (art. 6, par. 1, lett. b GDPR).",
            },
            {
              type: "list",
              items: [
                "Nome e cognome completi",
                "Codice fiscale",
                "Luogo e data di nascita",
                "Numero di telefono",
                "Contatto di emergenza (nome e numero di telefono)",
                "Certificato medico-sportivo (dati sanitari – vedi punto 3)",
              ],
            },
          ],
        },
        {
          heading: "3. Dati sanitari – certificato medico",
          blocks: [
            {
              type: "p",
              text: "Il certificato medico-sportivo che carichi contiene dati relativi alla salute e costituisce quindi una categoria particolare di dati personali.",
            },
            {
              type: "note",
              text: "I dati relativi alla salute sono categorie particolari di dati personali ai sensi dell’art. 9 GDPR. Trattiamo il tuo certificato esclusivamente sulla base del tuo consenso esplicito (art. 9, par. 2, lett. a GDPR), che presti durante l’iscrizione, nonché per la tutela di interessi vitali durante la gara. I dati sono trattati in modo riservato, conservati in un archivio privato ad accesso limitato e mantenuti solo per il tempo necessario allo svolgimento sicuro dell’evento. Puoi revocare il consenso in qualsiasi momento con effetto per il futuro.",
            },
          ],
        },
        {
          heading: "4. Dati di pagamento (Stripe)",
          blocks: [
            {
              type: "p",
              text: "Il pagamento della quota di iscrizione avviene tramite Stripe Payments Europe, Ltd. I dati necessari al pagamento (ad es. i dati della carta) sono raccolti e trattati direttamente da Stripe; noi non riceviamo i dati completi degli strumenti di pagamento. Stripe agisce in qualità di titolare autonomo del trattamento.",
            },
            {
              type: "p",
              text: "Maggiori informazioni nell’informativa privacy di Stripe: https://stripe.com/privacy",
            },
          ],
        },
        {
          heading: "5. Newsletter",
          blocks: [
            {
              type: "p",
              text: "Se ti iscrivi alla nostra newsletter, trattiamo il tuo indirizzo e-mail e il tuo nome sulla base del tuo consenso (art. 6, par. 1, lett. a GDPR). L’invio avviene con procedura double opt-in. Puoi annullare l’iscrizione in qualsiasi momento tramite il link di disiscrizione presente in ogni e-mail o contattandoci.",
            },
            {
              type: "p",
              text: "Per l’invio della newsletter ci avvaliamo di [NEWSLETTER-TOOL AUSFÜLLEN] in qualità di responsabile del trattamento.",
            },
          ],
        },
        {
          heading: "6. Dati tecnici e fornitori di servizi",
          blocks: [
            {
              type: "p",
              text: "Durante la consultazione del sito vengono trattati dati tecnicamente necessari (ad es. indirizzo IP, data/ora, pagina richiesta) per fornire il sito in modo sicuro e stabile (art. 6, par. 1, lett. f GDPR).",
            },
            {
              type: "list",
              items: [
                "Hosting: Vercel Inc. – distribuzione del sito (server nell’UE, se disponibile).",
                "Database/archiviazione: Supabase – memorizzazione dei dati di iscrizione e dei partecipanti.",
                "Non vengono utilizzati Google Analytics o strumenti di tracciamento analoghi.",
              ],
            },
          ],
        },
        {
          heading: "7. Periodo di conservazione",
          blocks: [
            {
              type: "p",
              text: "Conserviamo i dati personali solo per il tempo necessario alle finalità indicate o per gli obblighi di legge. I dati dei partecipanti sono conservati fino a [SPEICHERDAUER AUSFÜLLEN] dopo l’evento e successivamente cancellati o anonimizzati. I dati sanitari (certificato) vengono cancellati senza indugio dopo l’evento, non appena non più necessari.",
            },
          ],
        },
        {
          heading: "8. I tuoi diritti",
          blocks: [
            {
              type: "p",
              text: "In relazione ai tuoi dati personali hai i seguenti diritti:",
            },
            {
              type: "list",
              items: [
                "Diritto di accesso (art. 15 GDPR)",
                "Diritto di rettifica (art. 16 GDPR)",
                "Diritto alla cancellazione (art. 17 GDPR)",
                "Diritto di limitazione del trattamento (art. 18 GDPR)",
                "Diritto di opposizione (art. 21 GDPR)",
                "Diritto alla portabilità dei dati (art. 20 GDPR)",
                "Diritto di revocare il consenso prestato con effetto per il futuro (art. 7, par. 3 GDPR)",
              ],
            },
            {
              type: "p",
              text: "Per esercitare i tuoi diritti scrivi a: [E-MAIL DATENSCHUTZ AUSFÜLLEN]",
            },
          ],
        },
        {
          heading: "9. Diritto di reclamo",
          blocks: [
            {
              type: "p",
              text: "Hai il diritto di presentare reclamo a un’autorità di controllo. In Italia è competente il Garante per la protezione dei dati personali (https://www.garanteprivacy.it).",
            },
          ],
        },
      ],
    },

    agb: {
      intro:
        "Le presenti condizioni di partecipazione disciplinano la partecipazione all’evento „Dolomites Last Loop“ – Backyard Ultra a Dobbiaco (Toblach), Alto Adige, il 15 maggio 2027, con un massimo di 150 partecipanti. L’organizzatore è Sport OK Dobbiaco.",
      sections: [
        {
          heading: "1. Iscrizione e quota di partecipazione",
          blocks: [
            {
              type: "p",
              text: "L’iscrizione avviene online e diventa vincolante con il pagamento completo della quota. Il numero di partecipanti è limitato a 150; al raggiungimento del numero massimo viene istituita una lista d’attesa. La quota è scaglionata:",
            },
            {
              type: "list",
              items: [
                "Iscrizione anticipata (Early-Bird): [STARTGELD FRÜH AUSFÜLLEN] €",
                "Tariffa normale: [STARTGELD NORMAL AUSFÜLLEN] €",
                "Iscrizione tardiva: [STARTGELD SPÄT AUSFÜLLEN] €",
              ],
            },
          ],
        },
        {
          heading: "2. Condizioni di annullamento e rimborso",
          blocks: [
            {
              type: "list",
              items: [
                "Entro [STORNO-DATUM 1 AUSFÜLLEN]: rimborso del [STORNO-PROZENT 1 AUSFÜLLEN] % della quota.",
                "Entro [STORNO-DATUM 2 AUSFÜLLEN]: rimborso del [STORNO-PROZENT 2 AUSFÜLLEN] % della quota.",
                "Dal [STORNO-DATUM 3 AUSFÜLLEN]: nessun rimborso.",
                "Il trasferimento del posto di partenza a un’altra persona è possibile fino al [ÜBERTRAGUNG-DATUM AUSFÜLLEN].",
              ],
            },
          ],
        },
        {
          heading: "3. Documenti obbligatori",
          blocks: [
            {
              type: "p",
              text: "Per la partecipazione è necessario un certificato medico-sportivo valido. Deve essere caricato al momento dell’iscrizione e viene verificato prima della partenza. Senza certificato valido la partecipazione è esclusa.",
            },
          ],
        },
        {
          heading: "4. Esclusione di responsabilità",
          blocks: [
            {
              type: "p",
              text: "La partecipazione avviene a proprio rischio e sotto la propria responsabilità in merito alle condizioni di salute. L’organizzatore non risponde di incidenti, danni a persone o cose né della perdita o del danneggiamento di oggetti personali, nei limiti consentiti dalla legge.",
            },
          ],
        },
        {
          heading: "5. Regolamento Backyard Ultra",
          blocks: [
            {
              type: "list",
              items: [
                "Distanza del loop circa 6,71 km (circa 4,167 miglia).",
                "Partenza di ogni giro all’ora esatta.",
                "Chi rientra in tempo per l’ora successiva riparte.",
                "Vince l’ultimo atleta che completa un ulteriore giro intero entro il cutoff orario.",
              ],
            },
          ],
        },
        {
          heading: "6. Squalifica",
          blocks: [
            {
              type: "p",
              text: "Comportano la squalifica in particolare: la mancata partenza al via del loop all’ora esatta, l’accorciamento del percorso e l’uso di ausili non consentiti al di fuori delle zone previste.",
            },
          ],
        },
        {
          heading: "7. Diritti di immagine",
          blocks: [
            {
              type: "p",
              text: "Durante l’evento vengono realizzate fotografie e riprese video che possono essere utilizzate per attività di comunicazione (sito web, social media, stampa). Puoi opporti a tale utilizzo in qualsiasi momento.",
            },
          ],
        },
        {
          heading: "8. Forza maggiore",
          blocks: [
            {
              type: "p",
              text: "Qualora l’evento debba essere annullato dall’organizzatore per cause di forza maggiore, la quota di partecipazione viene rimborsata integralmente.",
            },
          ],
        },
        {
          heading: "9. Legge applicabile e foro competente",
          blocks: [
            {
              type: "p",
              text: "Si applica la legge italiana. Foro competente esclusivo è, nei limiti consentiti dalla legge, Bolzano.",
            },
          ],
        },
      ],
    },

    barrierefreiheit: {
      updated: "[BARRIEREFREIHEIT-PRÜFDATUM AUSFÜLLEN]",
      sections: [
        {
          heading: "Il nostro impegno",
          blocks: [
            {
              type: "p",
              text: "Ci impegniamo a rendere accessibile questo sito web e ci ispiriamo alle Web Content Accessibility Guidelines (WCAG) 2.1 al livello di conformità AA.",
            },
          ],
        },
        {
          heading: "Limitazioni note",
          blocks: [
            {
              type: "p",
              text: "[BARRIEREFREIHEIT-EINSCHRÄNKUNGEN AUSFÜLLEN]",
            },
          ],
        },
        {
          heading: "Feedback e contatti",
          blocks: [
            {
              type: "p",
              text: "Se incontri barriere o contenuti non accessibili, contattaci all’indirizzo [E-MAIL AUSFÜLLEN]. Ci adopereremo per trovare una soluzione in tempi rapidi.",
            },
          ],
        },
        {
          heading: "Ultima verifica",
          blocks: [
            {
              type: "p",
              text: "Ultima verifica della presente dichiarazione: [BARRIEREFREIHEIT-PRÜFDATUM AUSFÜLLEN].",
            },
          ],
        },
      ],
    },

    rueckerstattung: {
      intro:
        "La presente politica di rimborso integra le condizioni di partecipazione (Termini) e riassume i punti principali relativi al rimborso della quota di iscrizione.",
      sections: [
        {
          heading: "Rimborso scaglionato",
          blocks: [
            {
              type: "list",
              items: [
                "Entro [STORNO-DATUM 1 AUSFÜLLEN]: rimborso del [STORNO-PROZENT 1 AUSFÜLLEN] %.",
                "Entro [STORNO-DATUM 2 AUSFÜLLEN]: rimborso del [STORNO-PROZENT 2 AUSFÜLLEN] %.",
                "Dal [STORNO-DATUM 3 AUSFÜLLEN]: nessun rimborso.",
              ],
            },
          ],
        },
        {
          heading: "Richiesta ed elaborazione",
          blocks: [
            {
              type: "p",
              text: "La richiesta di rimborso va inviata via e-mail a [RÜCKERSTATTUNG-E-MAIL AUSFÜLLEN]. L’elaborazione avviene di norma entro [BEARBEITUNGSZEIT AUSFÜLLEN] giorni lavorativi.",
            },
            {
              type: "p",
              text: "Il rimborso viene effettuato sul metodo di pagamento originario (tramite Stripe).",
            },
          ],
        },
        {
          heading: "Nessun diritto al rimborso",
          blocks: [
            {
              type: "p",
              text: "In caso di squalifica o di ritiro volontario durante l’evento non sussiste alcun diritto al rimborso della quota di iscrizione.",
            },
          ],
        },
      ],
    },
  },

  // ───────────────────────────── ENGLISH ─────────────────────────────
  en: {
    datenschutz: {
      intro:
        "This privacy policy informs you, in accordance with the General Data Protection Regulation (EU) 2016/679 (GDPR) and Italian data protection law (Legislative Decree 196/2003 as amended by Legislative Decree 101/2018), about the processing of your personal data in connection with the „Dolomites Last Loop“ event.",
      sections: [
        {
          heading: "1. Data Controller",
          blocks: [
            {
              type: "p",
              text: "The controller within the meaning of the GDPR is:",
            },
            {
              type: "list",
              items: [
                "Sport OK Toblach",
                "[ADRESSE AUSFÜLLEN]",
                "Email (data protection): [E-MAIL DATENSCHUTZ AUSFÜLLEN]",
              ],
            },
          ],
        },
        {
          heading: "2. Registration data",
          blocks: [
            {
              type: "p",
              text: "To run the event we process the data collected in the registration form. This processing is purpose-bound and necessary for performance of the contract as well as for the organisation and safety of the race (Art. 6(1)(b) GDPR).",
            },
            {
              type: "list",
              items: [
                "Full name",
                "Tax number (Codice Fiscale)",
                "Place and date of birth",
                "Phone number",
                "Emergency contact (name and phone number)",
                "Medical / sports-medical certificate (health data – see section 3)",
              ],
            },
          ],
        },
        {
          heading: "3. Health data – medical certificate",
          blocks: [
            {
              type: "p",
              text: "The medical / sports-medical certificate you upload contains health data and therefore a special category of personal data.",
            },
            {
              type: "note",
              text: "Health data are a special category of personal data within the meaning of Art. 9 GDPR. We process your certificate solely on the basis of your explicit consent (Art. 9(2)(a) GDPR), which you give during registration, and to protect vital interests during the race. The data are treated confidentially, stored in a private, access-restricted storage, and kept only for as long as necessary to run the event safely. You may withdraw your consent at any time with effect for the future.",
            },
          ],
        },
        {
          heading: "4. Payment data (Stripe)",
          blocks: [
            {
              type: "p",
              text: "Payment of the entry fee is processed via Stripe Payments Europe, Ltd. The data required for payment (e.g. card details) are collected and processed directly by Stripe; we do not receive full payment-instrument data. In this respect Stripe acts as an independent controller.",
            },
            {
              type: "p",
              text: "For more information see Stripe’s privacy policy: https://stripe.com/privacy",
            },
          ],
        },
        {
          heading: "5. Newsletter",
          blocks: [
            {
              type: "p",
              text: "If you sign up for our newsletter, we process your email address and name on the basis of your consent (Art. 6(1)(a) GDPR). Sending uses a double opt-in procedure. You can unsubscribe at any time via the unsubscribe link in every email or by contacting us.",
            },
            {
              type: "p",
              text: "For sending the newsletter we use [NEWSLETTER-TOOL AUSFÜLLEN] as a processor.",
            },
          ],
        },
        {
          heading: "6. Technical data and service providers",
          blocks: [
            {
              type: "p",
              text: "When you access the website, technically necessary data (e.g. IP address, date/time, requested page) are processed to provide the website securely and reliably (Art. 6(1)(f) GDPR).",
            },
            {
              type: "list",
              items: [
                "Hosting: Vercel Inc. – delivery of the website (server location in the EU where available).",
                "Database/storage: Supabase – storage of participant and registration data.",
                "No Google Analytics or comparable tracking tools are used.",
              ],
            },
          ],
        },
        {
          heading: "7. Retention period",
          blocks: [
            {
              type: "p",
              text: "We store personal data only for as long as necessary for the stated purposes or as required by statutory retention obligations. Participant data are kept until [SPEICHERDAUER AUSFÜLLEN] after the event and then deleted or anonymised. Health data (certificate) are deleted without undue delay after the event as soon as they are no longer needed.",
            },
          ],
        },
        {
          heading: "8. Your rights",
          blocks: [
            {
              type: "p",
              text: "With regard to your personal data you have the following rights:",
            },
            {
              type: "list",
              items: [
                "Right of access (Art. 15 GDPR)",
                "Right to rectification (Art. 16 GDPR)",
                "Right to erasure (Art. 17 GDPR)",
                "Right to restriction of processing (Art. 18 GDPR)",
                "Right to object (Art. 21 GDPR)",
                "Right to data portability (Art. 20 GDPR)",
                "Right to withdraw a given consent with effect for the future (Art. 7(3) GDPR)",
              ],
            },
            {
              type: "p",
              text: "To exercise your rights, contact: [E-MAIL DATENSCHUTZ AUSFÜLLEN]",
            },
          ],
        },
        {
          heading: "9. Right to lodge a complaint",
          blocks: [
            {
              type: "p",
              text: "You have the right to lodge a complaint with a supervisory authority. In Italy the competent authority is the Garante per la protezione dei dati personali (https://www.garanteprivacy.it).",
            },
          ],
        },
      ],
    },

    agb: {
      intro:
        "These participation terms govern entry to the „Dolomites Last Loop“ event – a Backyard Ultra in Toblach (Dobbiaco), South Tyrol, on 15 May 2027, with a maximum of 150 participants. The organiser is Sport OK Toblach.",
      sections: [
        {
          heading: "1. Registration and entry fee",
          blocks: [
            {
              type: "p",
              text: "Registration is completed online and becomes binding upon full payment of the entry fee. The number of participants is limited to 150; once the maximum is reached, a waiting list is kept. The entry fee is tiered:",
            },
            {
              type: "list",
              items: [
                "Early-bird registration: €[STARTGELD FRÜH AUSFÜLLEN]",
                "Standard rate: €[STARTGELD NORMAL AUSFÜLLEN]",
                "Late registration: €[STARTGELD SPÄT AUSFÜLLEN]",
              ],
            },
          ],
        },
        {
          heading: "2. Cancellation and refund terms",
          blocks: [
            {
              type: "list",
              items: [
                "Until [STORNO-DATUM 1 AUSFÜLLEN]: [STORNO-PROZENT 1 AUSFÜLLEN] % refund of the entry fee.",
                "Until [STORNO-DATUM 2 AUSFÜLLEN]: [STORNO-PROZENT 2 AUSFÜLLEN] % refund of the entry fee.",
                "From [STORNO-DATUM 3 AUSFÜLLEN]: no refund.",
                "Transfer of the start spot to another person is possible until [ÜBERTRAGUNG-DATUM AUSFÜLLEN].",
              ],
            },
          ],
        },
        {
          heading: "3. Mandatory documents",
          blocks: [
            {
              type: "p",
              text: "A valid medical / sports-medical certificate is required to participate. It must be uploaded during registration and is checked before the start. Participation is not possible without a valid certificate.",
            },
          ],
        },
        {
          heading: "4. Disclaimer of liability",
          blocks: [
            {
              type: "p",
              text: "Participation is at your own risk and your own responsibility regarding your state of health. The organiser is not liable for accidents, personal injury or property damage, or for the loss or damage of items carried, to the extent permitted by law.",
            },
          ],
        },
        {
          heading: "5. Backyard Ultra rules",
          blocks: [
            {
              type: "list",
              items: [
                "Loop distance approx. 6.71 km (approx. 4.167 miles).",
                "Each loop starts on the hour.",
                "Whoever returns in time for the next full hour starts again.",
                "The winner is the last runner to complete one more full loop within the hourly cutoff.",
              ],
            },
          ],
        },
        {
          heading: "6. Disqualification",
          blocks: [
            {
              type: "p",
              text: "Grounds for disqualification include in particular: failing to start a loop on the hour, cutting the course, and using prohibited aids outside the designated zones.",
            },
          ],
        },
        {
          heading: "7. Image rights",
          blocks: [
            {
              type: "p",
              text: "Photos and videos taken during the event may be used for public-relations purposes (website, social media, press). You may object to this use at any time.",
            },
          ],
        },
        {
          heading: "8. Force majeure",
          blocks: [
            {
              type: "p",
              text: "If the event has to be cancelled by the organiser due to force majeure, the entry fee will be refunded in full.",
            },
          ],
        },
        {
          heading: "9. Applicable law and place of jurisdiction",
          blocks: [
            {
              type: "p",
              text: "Italian law applies. The exclusive place of jurisdiction is Bolzano, to the extent permitted by law.",
            },
          ],
        },
      ],
    },

    barrierefreiheit: {
      updated: "[BARRIEREFREIHEIT-PRÜFDATUM AUSFÜLLEN]",
      sections: [
        {
          heading: "Our commitment",
          blocks: [
            {
              type: "p",
              text: "We strive to make this website accessible and follow the Web Content Accessibility Guidelines (WCAG) 2.1 at conformance level AA.",
            },
          ],
        },
        {
          heading: "Known limitations",
          blocks: [
            {
              type: "p",
              text: "[BARRIEREFREIHEIT-EINSCHRÄNKUNGEN AUSFÜLLEN]",
            },
          ],
        },
        {
          heading: "Feedback and contact",
          blocks: [
            {
              type: "p",
              text: "If you encounter barriers or content that is not accessible, please contact us at [E-MAIL AUSFÜLLEN]. We will do our best to find a prompt solution.",
            },
          ],
        },
        {
          heading: "Last review",
          blocks: [
            {
              type: "p",
              text: "Last review of this statement: [BARRIEREFREIHEIT-PRÜFDATUM AUSFÜLLEN].",
            },
          ],
        },
      ],
    },

    rueckerstattung: {
      intro:
        "This refund policy supplements the participation terms (Terms) and summarises the key points regarding refunds of the entry fee.",
      sections: [
        {
          heading: "Tiered refund",
          blocks: [
            {
              type: "list",
              items: [
                "Until [STORNO-DATUM 1 AUSFÜLLEN]: [STORNO-PROZENT 1 AUSFÜLLEN] % refund.",
                "Until [STORNO-DATUM 2 AUSFÜLLEN]: [STORNO-PROZENT 2 AUSFÜLLEN] % refund.",
                "From [STORNO-DATUM 3 AUSFÜLLEN]: no refund.",
              ],
            },
          ],
        },
        {
          heading: "Request and processing",
          blocks: [
            {
              type: "p",
              text: "Submit a refund request by email to [RÜCKERSTATTUNG-E-MAIL AUSFÜLLEN]. Processing usually takes place within [BEARBEITUNGSZEIT AUSFÜLLEN] business days.",
            },
            {
              type: "p",
              text: "Refunds are issued to the original payment method (via Stripe).",
            },
          ],
        },
        {
          heading: "No entitlement to a refund",
          blocks: [
            {
              type: "p",
              text: "In the event of disqualification or voluntary withdrawal during the event, there is no entitlement to a refund of the entry fee.",
            },
          ],
        },
      ],
    },
  },
};
