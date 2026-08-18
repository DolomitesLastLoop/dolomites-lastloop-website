import type { Lang } from "./ui";

// Strukturierte Rechtstexte (analog zu faq.ts).
// Block-Modell, gerendert in src/pages/[lang]/[legal].astro.
// Stand 08.08.2026: alle Platzhalter ausgefüllt, anwaltlich geprüft.
// Startgeld-Stufen, Stornobedingungen und Rückerstattungstext müssen zwischen
// AGB (§1/§2) und der Rückerstattungsseite synchron gehalten werden.

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "note"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = { id?: string; heading: string; blocks: LegalBlock[] };
// aiNotice: KI-Transparenzhinweis. Gerendert direkt unter `updated` (falls
// vorhanden), sonst am Ende des Textes — siehe src/pages/[lang]/[legal].astro.
export type LegalPage = {
  updated?: string;
  intro?: string;
  aiNotice?: string;
  sections: LegalSection[];
};

export type LegalSlug =
  | "impressum"
  | "datenschutz"
  | "agb"
  | "barrierefreiheit"
  | "rueckerstattung"
  | "haftungsausschluss";
export type LegalContent = Record<LegalSlug, LegalPage>;

export const legal: Record<Lang, LegalContent> = {
  // ───────────────────────────── DEUTSCH ─────────────────────────────
  de: {
    impressum: {
      intro:
        "Anbieterkennzeichnung und gesetzliche Pflichtangaben zum Veranstalter der „Dolomites Last Loop“.",
      sections: [
        {
          heading: "Verein",
          blocks: [
            {
              type: "list",
              items: [
                "Amateursportverein Sport OK Toblach",
                "Sede legale / Sitz: Seeweg 16, 39034 Dobbiaco/Toblach (BZ), Italien",
                "Codice Fiscale: 01483970214",
                "Partita IVA: 01483970214",
                "PEC: sportok@pec.it",
                "E-Mail: info@worldcup-dobbiaco.it",
                "Telefon: 0474 976000",
                "Website: www.worldcup-dobbiaco.it",
                "Codice Destinatario (SDI): SUBM70N",
              ],
            },
          ],
        },
        {
          heading: "Registereintragung",
          blocks: [
            {
              type: "list",
              items: [
                "Registro Nazionale delle Attività Sportive Dilettantistiche (RASD): Nr. 00362404",
                "FISI – Federazione Italiana Sport Invernali · Codice affiliazione: 01894",
                "Sportjahr: 2025/2026 · Erstaffiliation: 01.12.2016",
              ],
            },
          ],
        },
        {
          heading: "Gesetzliche Vertretung",
          blocks: [
            {
              type: "list",
              items: ["Präsidentin / Legale rappresentante: Gerti Taschler"],
            },
          ],
        },
      ],
    },
    datenschutz: {
      intro:
        "Diese Datenschutzerklärung informiert dich gemäß der Datenschutz-Grundverordnung (EU) 2016/679 (DSGVO) sowie dem italienischen Datenschutzrecht (D.Lgs. 196/2003 i.d.F. des D.Lgs. 101/2018) über die Verarbeitung deiner personenbezogenen Daten im Rahmen der Veranstaltung „Dolomites Last Loop“.",
      aiNotice:
        "Dieser Text wurde mit KI-Unterstützung erstellt und vor Veröffentlichung geprüft.",
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
                "Amateursportverein Sport OK Toblach",
                "Seeweg 16, 39034 Dobbiaco/Toblach (BZ), Italien",
                "Codice Fiscale: 01483970214",
                "E-Mail (Datenschutz): info@worldcup-dobbiaco.it",
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
          heading: "5. Newsletter und Teilnehmer-Kommunikation",
          blocks: [
            {
              type: "p",
              text: "Für den E-Mail-Versand führen wir zwei getrennte Verteiler. Sie unterscheiden sich in Zweck und Rechtsgrundlage:",
            },
            {
              type: "list",
              items: [
                "Newsletter (freiwillig): Sofern du dich für unseren Newsletter anmeldest, verarbeiten wir deine E-Mail-Adresse und deinen Namen auf Grundlage deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du kannst dich jederzeit über den Abmeldelink in jeder E-Mail oder per Nachricht an uns wieder abmelden.",
                "Teilnehmerinformationen (keine Einwilligung erforderlich): Nach deiner verbindlichen Anmeldung nehmen wir Vorname, Nachname und E-Mail-Adresse in einen separaten Teilnehmerverteiler auf. Darüber versenden wir ausschließlich organisatorische und sicherheitsrelevante Informationen zum Rennen – etwa Startzeiten, Änderungen an Strecke oder Ablauf sowie Wetter- und Sicherheitshinweise. Diese Verarbeitung ist zur Erfüllung des Teilnahmevertrags erforderlich (Art. 6 Abs. 1 lit. b DSGVO); eine Einwilligung ist dafür weder nötig noch holen wir eine ein. Diese Nachrichten enthalten keine Werbung.",
              ],
            },
            {
              type: "note",
              text: "Die beiden Verteiler sind voneinander unabhängig: Eine Abmeldung vom Newsletter beendet den Empfang der Teilnehmerinformationen nicht – diese gehören zur Durchführung des Rennens und werden versandt, solange deine Anmeldung besteht. Umgekehrt gilt deine Anmeldung zum Rennen nicht als Einwilligung in den Newsletter. Für die Speicherdauer gelten die unter Punkt 7 genannten Fristen.",
            },
            {
              type: "p",
              text: "Für beide Verteiler setzen wir Sendinblue SAS (handelnd als Brevo), 9–17 rue Salneuve, 75017 Paris, Frankreich, RCS Paris 498 019 298, als Auftragsverarbeiter ein.",
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
                "Hosting: Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA – Auslieferung der Website (Serverstandort EU, sofern verfügbar). Für etwaige Datenzugriffe aus den USA stützt sich Vercel auf das EU-U.S. Data Privacy Framework (DPF).",
                "Datenbank/Speicher: Supabase Pte. Ltd., 65 Chulia Street #38-02/03, OCBC Centre, Singapur 049513 – Speicherung der Teilnehmer- und Anmeldedaten. Die Datenbank für dieses Projekt ist in einem Rechenzentrum in Paris (EU, AWS eu-west-3) gehostet; für etwaige Datenzugriffe außerhalb der EU stützt sich Supabase auf EU-Standardvertragsklauseln.",
                "E-Mail-Versand: Plus Five Five, Inc. (handelnd als Resend), 2261 Market Street #5039, San Francisco, CA 94114, USA – Versand der Bestätigungs- und Ticket-E-Mails. Die Übermittlung in die USA stützt sich auf das EU-U.S. Data Privacy Framework (DPF).",
                "Rate-Limiting/Schutz vor Missbrauch: Upstash Inc., USA – Verarbeitung von IP-Adressen zur Begrenzung der Anfragen. Die Verarbeitung erfolgt in einem Rechenzentrum in Frankfurt am Main (EU); ergänzend stützt sich Upstash für etwaige Datenzugriffe auf das EU-U.S. Data Privacy Framework (DPF).",
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
              text: "Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Teilnehmerdaten werden bis drei Monate nach dem Rennen aufbewahrt (Frist ab dem 15.05.2027) und anschließend gelöscht oder anonymisiert. Gesundheitsdaten (ärztliche Atteste) werden bis drei Monate nach dem Rennen (Frist ab dem 15.05.2027) aufbewahrt und anschließend gelöscht. Zahlungs- und buchhaltungsrelevante Daten bewahren wir gemäß Art. 2220 Codice Civile zehn Jahre auf.",
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
              text: "Zur Ausübung deiner Rechte wende dich an: info@worldcup-dobbiaco.it",
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
        {
          id: "bildrechte",
          heading: "10. Foto- und Videoaufnahmen (Bildrechte)",
          blocks: [
            {
              type: "p",
              text: "Während der Veranstaltung werden Foto- und Videoaufnahmen erstellt. Mit deiner Einwilligung bei der Anmeldung dürfen diese Aufnahmen vom Veranstalter (Sport OK Toblach) für die Berichterstattung über das Event sowie für Marketing- und Werbezwecke (Website, Social Media, Print) verwendet werden.",
            },
            {
              type: "p",
              text: "Die Einwilligung ist freiwillig und kann jederzeit mit Wirkung für die Zukunft widerrufen werden (info@worldcup-dobbiaco.it). Der Widerruf berührt die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung nicht; bereits veröffentlichte Aufnahmen müssen ggf. nicht zurückgezogen werden, soweit dies unmöglich oder mit unverhältnismäßigem Aufwand verbunden ist.",
            },
          ],
        },
      ],
    },

    agb: {
      intro:
        "Diese Teilnahmebedingungen regeln die Teilnahme an der Veranstaltung „Dolomites Last Loop“ – Backyard Ultra in Toblach (Dobbiaco), Südtirol, am 15. Mai 2027, mit begrenzter Teilnehmerzahl. Veranstalter ist Sport OK Toblach.",
      aiNotice:
        "Dieser Text wurde mit KI-Unterstützung erstellt und vor Veröffentlichung geprüft.",
      sections: [
        {
          heading: "1. Anmeldung und Startgeld",
          blocks: [
            {
              type: "p",
              text: "Die Anmeldung erfolgt online und wird mit vollständiger Bezahlung des Startgelds verbindlich. Die Teilnehmerzahl ist begrenzt; bei Erreichen der Höchstzahl wird eine Warteliste geführt. Das Startgeld ist gestaffelt:",
            },
            {
              type: "list",
              items: [
                "Frühanmeldung (Early-Bird): 75 € (01.09.–31.12.2026)",
                "Normaltarif: 80 € (01.01.–31.03.2027)",
                "Spätanmeldung: 100 € (01.04.–30.04.2027)",
              ],
            },
          ],
        },
        {
          heading: "2. Stornobedingungen und Rückerstattung",
          blocks: [
            {
              type: "p",
              text: "Stornierungen sind grundsätzlich nicht mit einer Rückerstattung des Startgelds verbunden. Ausnahme: Bei nachgewiesener Verletzung (ärztliches Attest) besteht Anspruch auf kostenlose Teilnahme im folgenden Jahr; eine Geldrückerstattung erfolgt auch in diesem Fall nicht. Anfragen zur Stornierung werden innerhalb einer Woche bearbeitet.",
            },
            {
              type: "p",
              text: "Eine Übertragung des Startplatzes an eine andere Person ist bis spätestens zwei Wochen vor dem Rennen möglich. Bei Übertragung entfällt sowohl der Anspruch auf kostenlose Teilnahme im Folgejahr als auch die Personalisierung der Startnummer.",
            },
          ],
        },
        {
          heading: "3. Pflichtdokumente",
          blocks: [
            {
              type: "p",
              text: "Für die Teilnahme ist ein gültiges ärztliches bzw. sportärztliches Attest erforderlich. Es kann bereits bei der Anmeldung hochgeladen oder nachgereicht werden, muss dem Veranstalter aber spätestens eine Woche vor dem Rennstart vorliegen – für die Ausgabe 2027 also bis zum 8. Mai 2027. Das Attest muss am Renntag noch gültig sein. Geht kein fristgerechtes und am Renntag gültiges Attest ein, ist eine Teilnahme ausgeschlossen; es gelten die Stornobedingungen nach Ziffer 2, eine Rückerstattung des Startgelds erfolgt nicht.",
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
      updated: "Stand: 08.08.2026",
      aiNotice:
        "Dieser Text wurde mit KI-Unterstützung erstellt und vor Veröffentlichung geprüft.",
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
              text: "Die Höhenprofil-Grafik auf der Rennen-Seite ist aktuell nicht vollständig für Screenreader zugänglich. Eine textliche Beschreibung der Streckendaten (Distanz, höchster Punkt, Steigungsverlauf) ist im begleitenden Fließtext vorhanden, ersetzt die Grafik aber nicht vollständig. Ein vollständiges Barrierefreiheits-Audit der Website steht noch aus.",
            },
          ],
        },
        {
          heading: "Feedback und Kontakt",
          blocks: [
            {
              type: "p",
              text: "Wenn du auf Barrieren stößt oder Inhalte nicht zugänglich sind, melde dich bitte bei uns unter info@worldcup-dobbiaco.it. Wir bemühen uns um eine zeitnahe Lösung.",
            },
          ],
        },
        {
          heading: "Letzte Überprüfung",
          blocks: [
            {
              type: "p",
              text: "Letzte Überprüfung dieser Erklärung: 08.08.2026.",
            },
          ],
        },
      ],
    },

    rueckerstattung: {
      intro:
        "Diese Rückerstattungsrichtlinie ergänzt die Teilnahmebedingungen (AGB) und fasst die wichtigsten Punkte zur Erstattung des Startgelds zusammen.",
      aiNotice:
        "Dieser Text wurde mit KI-Unterstützung erstellt und vor Veröffentlichung geprüft.",
      sections: [
        {
          heading: "Stornierung und Rückerstattung",
          blocks: [
            {
              type: "p",
              text: "Stornierungen sind grundsätzlich nicht mit einer Rückerstattung des Startgelds verbunden. Ausnahme: Bei nachgewiesener Verletzung (ärztliches Attest) besteht Anspruch auf kostenlose Teilnahme im folgenden Jahr; eine Geldrückerstattung erfolgt auch in diesem Fall nicht. Anfragen zur Stornierung werden innerhalb einer Woche bearbeitet.",
            },
            {
              type: "p",
              text: "Eine Übertragung des Startplatzes an eine andere Person ist bis spätestens zwei Wochen vor dem Rennen möglich. Bei Übertragung entfällt sowohl der Anspruch auf kostenlose Teilnahme im Folgejahr als auch die Personalisierung der Startnummer.",
            },
          ],
        },
        {
          heading: "Antrag und Bearbeitung",
          blocks: [
            {
              type: "p",
              text: "Einen Antrag auf Rückerstattung stellst du per E-Mail an dolomiteslastloop@gmail.com. Die Bearbeitung erfolgt innerhalb von maximal einer Woche.",
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
    haftungsausschluss: {
      updated: "Stand: 08.08.2026",
      intro:
        "Die Teilnahme an der „Dolomites Last Loop“ (Backyard Ultra, Toblach/Dobbiaco) erfolgt freiwillig und auf eigenes Risiko. Mit der Anmeldung erkennst du die folgenden Bedingungen an.",
      aiNotice:
        "Dieser Text wurde mit KI-Unterstützung erstellt und vor Veröffentlichung geprüft.",
      sections: [
        {
          heading: "1. Teilnahme auf eigene Gefahr",
          blocks: [
            {
              type: "p",
              text: "Ein Backyard Ultra ist ein extremer Ausdauerwettbewerb. Die Teilnahme erfolgt ausschließlich auf eigene Gefahr und Verantwortung. Jede:r Teilnehmer:in schätzt die eigene körperliche und gesundheitliche Verfassung selbst ein und entscheidet eigenverantwortlich über Start, Fortsetzung und Abbruch des Rennens.",
            },
          ],
        },
        {
          heading: "2. Gesundheitliche Eignung und ärztliches Attest",
          blocks: [
            {
              type: "p",
              text: "Die Teilnahme setzt die volle gesundheitliche Eignung für sportliche Höchstbelastungen voraus. Ein gültiges ärztliches Attest (certificato medico agonistico) ist verpflichtend vorzulegen – spätestens eine Woche vor dem Rennstart, für die Ausgabe 2027 also bis zum 8. Mai 2027 – und muss am Renntag noch gültig sein. Ohne fristgerecht eingereichtes und am Renntag gültiges Attest ist die Anmeldung nicht endgültig gültig und eine Teilnahme ausgeschlossen; das Startgeld wird in diesem Fall nicht erstattet.",
            },
          ],
        },
        {
          heading: "3. Haftungsausschluss des Veranstalters",
          blocks: [
            {
              type: "p",
              text: "Der Veranstalter (Sport OK Toblach) sowie dessen Helfer:innen, Partner und Sponsoren haften nicht für Personen-, Sach- oder Vermögensschäden, die im Zusammenhang mit der Teilnahme entstehen, soweit diese nicht auf Vorsatz oder grober Fahrlässigkeit des Veranstalters beruhen. Die zwingende gesetzliche Haftung, insbesondere für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, bleibt unberührt.",
            },
          ],
        },
        {
          heading: "4. Eigenverantwortung und Verhalten",
          blocks: [
            {
              type: "p",
              text: "Teilnehmer:innen befolgen die Anweisungen der Rennleitung sowie des Sanitäts- und Sicherheitspersonals jederzeit. Bei Sicherheitsbedenken kann die Rennleitung Teilnehmer:innen aus dem Rennen nehmen. Für mitgeführte Ausrüstung und Wertgegenstände wird keine Haftung übernommen.",
            },
          ],
        },
        {
          heading: "5. Höhere Gewalt, Verschiebung und Absage",
          blocks: [
            {
              type: "p",
              text: "Bei höherer Gewalt (z. B. extreme Witterung, behördliche Auflagen, Naturereignisse) kann die Veranstaltung verschoben, verkürzt oder abgesagt werden. Ansprüche der Teilnehmer:innen über die in den Stornobedingungen geregelten Rückerstattungen hinaus bestehen in diesem Fall nicht.",
            },
          ],
        },
        {
          heading: "6. Versicherung",
          blocks: [
            {
              type: "p",
              text: "Sport OK Toblach als Veranstalter verfügt über einen entsprechenden Versicherungsschutz für die Durchführung der Veranstaltung. Teilnehmerinnen und Teilnehmern wird dennoch empfohlen, für die eigene Teilnahme eine ausreichende persönliche Unfall- und Krankenversicherung sowie ggf. eine Bergungs- und Rückholversicherung abzuschließen, da die Teilnahme auf eigene Gefahr erfolgt.",
            },
          ],
        },
      ],
    },
  },

  // ───────────────────────────── ITALIANO ─────────────────────────────
  it: {
    impressum: {
      intro:
        "Dati identificativi e informazioni obbligatorie sull’organizzatore della „Dolomites Last Loop“.",
      sections: [
        {
          heading: "Associazione",
          blocks: [
            {
              type: "list",
              items: [
                "Amateursportverein Sport OK Toblach",
                "Sede legale: Seeweg 16, 39034 Dobbiaco/Toblach (BZ), Italia",
                "Codice Fiscale: 01483970214",
                "Partita IVA: 01483970214",
                "PEC: sportok@pec.it",
                "E-mail: info@worldcup-dobbiaco.it",
                "Telefono: 0474 976000",
                "Sito web: www.worldcup-dobbiaco.it",
                "Codice Destinatario (SDI): SUBM70N",
              ],
            },
          ],
        },
        {
          heading: "Iscrizione ai registri",
          blocks: [
            {
              type: "list",
              items: [
                "Registro Nazionale delle Attività Sportive Dilettantistiche (RASD): n. 00362404",
                "FISI – Federazione Italiana Sport Invernali · Codice affiliazione: 01894",
                "Anno sportivo: 2025/2026 · Prima affiliazione: 01/12/2016",
              ],
            },
          ],
        },
        {
          heading: "Rappresentante legale",
          blocks: [
            {
              type: "list",
              items: ["Presidente / Legale rappresentante: Gerti Taschler"],
            },
          ],
        },
      ],
    },
    datenschutz: {
      intro:
        "La presente informativa sulla privacy ti informa, ai sensi del Regolamento (UE) 2016/679 (GDPR) e della normativa italiana in materia di protezione dei dati personali (D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018), sul trattamento dei tuoi dati personali nell’ambito dell’evento „Dolomites Last Loop“.",
      aiNotice:
        "Questo testo è stato redatto con l’ausilio dell’intelligenza artificiale e verificato prima della pubblicazione.",
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
                "Amateursportverein Sport OK Toblach",
                "Seeweg 16, 39034 Dobbiaco/Toblach (BZ), Italia",
                "Codice Fiscale: 01483970214",
                "E-mail (privacy): info@worldcup-dobbiaco.it",
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
          heading: "5. Newsletter e comunicazioni ai partecipanti",
          blocks: [
            {
              type: "p",
              text: "Per l’invio di e-mail gestiamo due liste distinte, che si differenziano per finalità e base giuridica:",
            },
            {
              type: "list",
              items: [
                "Newsletter (facoltativa): se ti iscrivi alla nostra newsletter, trattiamo il tuo indirizzo e-mail e il tuo nome sulla base del tuo consenso (art. 6, par. 1, lett. a GDPR). Puoi annullare l’iscrizione in qualsiasi momento tramite il link di disiscrizione presente in ogni e-mail o contattandoci.",
                "Comunicazioni ai partecipanti (non è richiesto il consenso): dopo la tua iscrizione vincolante inseriamo nome, cognome e indirizzo e-mail in una lista separata dedicata ai partecipanti. Tramite questa lista inviamo esclusivamente informazioni organizzative e di sicurezza relative alla gara, come orari di partenza, modifiche al percorso o allo svolgimento e avvisi meteo e di sicurezza. Questo trattamento è necessario all’esecuzione del contratto di partecipazione (art. 6, par. 1, lett. b GDPR); non è quindi richiesto alcun consenso, né viene raccolto. Questi messaggi non contengono pubblicità.",
              ],
            },
            {
              type: "note",
              text: "Le due liste sono indipendenti tra loro: la disiscrizione dalla newsletter non interrompe la ricezione delle comunicazioni ai partecipanti, che fanno parte dell’organizzazione della gara e vengono inviate finché la tua iscrizione è attiva. Viceversa, l’iscrizione alla gara non costituisce consenso alla newsletter. Per i tempi di conservazione valgono i termini indicati al punto 7.",
            },
            {
              type: "p",
              text: "Per entrambe le liste ci avvaliamo di Sendinblue SAS (operante con il marchio Brevo), 9–17 rue Salneuve, 75017 Parigi, Francia, RCS Paris 498 019 298, in qualità di responsabile del trattamento.",
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
                "Hosting: Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA – distribuzione del sito (server nell’UE, se disponibile). Per eventuali accessi ai dati dagli USA Vercel si avvale dell’EU-U.S. Data Privacy Framework (DPF).",
                "Database/archiviazione: Supabase Pte. Ltd., 65 Chulia Street #38-02/03, OCBC Centre, Singapore 049513 – memorizzazione dei dati di iscrizione e dei partecipanti. Il database di questo progetto è ospitato in un data center di Parigi (UE, AWS eu-west-3); per eventuali accessi ai dati al di fuori dell’UE Supabase si avvale delle clausole contrattuali tipo dell’UE.",
                "Invio delle e-mail: Plus Five Five, Inc. (operante con il marchio Resend), 2261 Market Street #5039, San Francisco, CA 94114, USA – invio delle e-mail di conferma e del biglietto. Il trasferimento negli USA si basa sull’EU-U.S. Data Privacy Framework (DPF).",
                "Limitazione delle richieste/protezione dagli abusi: Upstash Inc., USA – trattamento degli indirizzi IP per limitare il numero di richieste. Il trattamento avviene in un data center di Francoforte sul Meno (UE); in via integrativa, per eventuali accessi ai dati Upstash si avvale dell’EU-U.S. Data Privacy Framework (DPF).",
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
              text: "Conserviamo i dati personali solo per il tempo necessario alle finalità indicate o per gli obblighi di legge. I dati dei partecipanti sono conservati fino a tre mesi dopo la gara (termine decorrente dal 15/05/2027) e successivamente cancellati o anonimizzati. I dati sanitari (certificati medici) sono conservati fino a tre mesi dopo la gara (termine decorrente dal 15/05/2027) e successivamente cancellati. I dati rilevanti ai fini contabili e di pagamento sono conservati per dieci anni ai sensi dell’art. 2220 del Codice Civile.",
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
              text: "Per esercitare i tuoi diritti scrivi a: info@worldcup-dobbiaco.it",
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
        {
          id: "bildrechte",
          heading: "10. Foto e video (diritti di immagine)",
          blocks: [
            {
              type: "p",
              text: "Durante l’evento vengono realizzate riprese foto e video. Con il tuo consenso al momento dell’iscrizione, queste immagini possono essere utilizzate dall’organizzatore (Sport OK Dobbiaco) per la documentazione dell’evento e per scopi di marketing e pubblicità (sito web, social media, stampa).",
            },
            {
              type: "p",
              text: "Il consenso è facoltativo e può essere revocato in qualsiasi momento con effetto per il futuro (info@worldcup-dobbiaco.it). La revoca non pregiudica la liceità del trattamento effettuato fino a quel momento; le immagini già pubblicate potrebbero non dover essere ritirate, qualora ciò risulti impossibile o comporti uno sforzo sproporzionato.",
            },
          ],
        },
      ],
    },

    agb: {
      intro:
        "Le presenti condizioni di partecipazione disciplinano la partecipazione all’evento „Dolomites Last Loop“ – Backyard Ultra a Dobbiaco (Toblach), Alto Adige, il 15 maggio 2027, con un numero limitato di partecipanti. L’organizzatore è Sport OK Dobbiaco.",
      aiNotice:
        "Questo testo è stato redatto con l’ausilio dell’intelligenza artificiale e verificato prima della pubblicazione.",
      sections: [
        {
          heading: "1. Iscrizione e quota di partecipazione",
          blocks: [
            {
              type: "p",
              text: "L’iscrizione avviene online e diventa vincolante con il pagamento completo della quota. Il numero di partecipanti è limitato; al raggiungimento del numero massimo viene istituita una lista d’attesa. La quota è scaglionata:",
            },
            {
              type: "list",
              items: [
                "Iscrizione anticipata (Early-Bird): 75 € (01/09–31/12/2026)",
                "Tariffa normale: 80 € (01/01–31/03/2027)",
                "Iscrizione tardiva: 100 € (01/04–30/04/2027)",
              ],
            },
          ],
        },
        {
          heading: "2. Condizioni di annullamento e rimborso",
          blocks: [
            {
              type: "p",
              text: "In linea di principio le cancellazioni non danno diritto al rimborso della quota di iscrizione. Eccezione: in caso di infortunio documentato (certificato medico) si ha diritto alla partecipazione gratuita nell’anno successivo; anche in questo caso non è previsto alcun rimborso in denaro. Le richieste di cancellazione vengono evase entro una settimana.",
            },
            {
              type: "p",
              text: "Il trasferimento del posto di partenza a un’altra persona è possibile fino a due settimane prima della gara. In caso di trasferimento decadono sia il diritto alla partecipazione gratuita nell’anno successivo sia la personalizzazione del pettorale.",
            },
          ],
        },
        {
          heading: "3. Documenti obbligatori",
          blocks: [
            {
              type: "p",
              text: "Per la partecipazione è necessario un certificato medico-sportivo valido. Può essere caricato già al momento dell’iscrizione oppure trasmesso successivamente, ma deve pervenire all’organizzatore al più tardi una settimana prima della partenza della gara – per l’edizione 2027 quindi entro l’8 maggio 2027. Il certificato deve essere ancora valido il giorno della gara. In assenza di un certificato trasmesso entro i termini e valido il giorno della gara, la partecipazione è esclusa; si applicano le condizioni di annullamento di cui al punto 2 e non è previsto alcun rimborso della quota di iscrizione.",
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
      updated: "Aggiornato al: 08/08/2026",
      aiNotice:
        "Questo testo è stato redatto con l’ausilio dell’intelligenza artificiale e verificato prima della pubblicazione.",
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
              text: "Il grafico dell’altimetria nella pagina della gara non è attualmente del tutto accessibile agli screen reader. Nel testo di accompagnamento è presente una descrizione testuale dei dati del percorso (distanza, punto più alto, andamento del dislivello), che tuttavia non sostituisce completamente il grafico. Un audit completo di accessibilità del sito è ancora da svolgere.",
            },
          ],
        },
        {
          heading: "Feedback e contatti",
          blocks: [
            {
              type: "p",
              text: "Se incontri barriere o contenuti non accessibili, contattaci all’indirizzo info@worldcup-dobbiaco.it. Ci adopereremo per trovare una soluzione in tempi rapidi.",
            },
          ],
        },
        {
          heading: "Ultima verifica",
          blocks: [
            {
              type: "p",
              text: "Ultima verifica della presente dichiarazione: 08/08/2026.",
            },
          ],
        },
      ],
    },

    rueckerstattung: {
      intro:
        "La presente politica di rimborso integra le condizioni di partecipazione (Termini) e riassume i punti principali relativi al rimborso della quota di iscrizione.",
      aiNotice:
        "Questo testo è stato redatto con l’ausilio dell’intelligenza artificiale e verificato prima della pubblicazione.",
      sections: [
        {
          heading: "Cancellazione e rimborso",
          blocks: [
            {
              type: "p",
              text: "In linea di principio le cancellazioni non danno diritto al rimborso della quota di iscrizione. Eccezione: in caso di infortunio documentato (certificato medico) si ha diritto alla partecipazione gratuita nell’anno successivo; anche in questo caso non è previsto alcun rimborso in denaro. Le richieste di cancellazione vengono evase entro una settimana.",
            },
            {
              type: "p",
              text: "Il trasferimento del posto di partenza a un’altra persona è possibile fino a due settimane prima della gara. In caso di trasferimento decadono sia il diritto alla partecipazione gratuita nell’anno successivo sia la personalizzazione del pettorale.",
            },
          ],
        },
        {
          heading: "Richiesta ed elaborazione",
          blocks: [
            {
              type: "p",
              text: "La richiesta di rimborso va inviata via e-mail a dolomiteslastloop@gmail.com. L’elaborazione avviene entro un massimo di una settimana.",
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
    haftungsausschluss: {
      updated: "Aggiornato al: 08/08/2026",
      intro:
        "La partecipazione alla „Dolomites Last Loop“ (Backyard Ultra, Dobbiaco/Toblach) è volontaria e avviene a proprio rischio. Con l’iscrizione accetti le seguenti condizioni.",
      aiNotice:
        "Questo testo è stato redatto con l’ausilio dell’intelligenza artificiale e verificato prima della pubblicazione.",
      sections: [
        {
          heading: "1. Partecipazione a proprio rischio",
          blocks: [
            {
              type: "p",
              text: "Un Backyard Ultra è una competizione di endurance estrema. La partecipazione avviene esclusivamente a proprio rischio e responsabilità. Ogni partecipante valuta autonomamente le proprie condizioni fisiche e di salute e decide sotto la propria responsabilità in merito a partenza, prosecuzione e ritiro dalla gara.",
            },
          ],
        },
        {
          heading: "2. Idoneità fisica e certificato medico",
          blocks: [
            {
              type: "p",
              text: "La partecipazione presuppone la piena idoneità a sforzi sportivi massimali. È obbligatorio presentare un valido certificato medico agonistico al più tardi una settimana prima della partenza della gara, per l’edizione 2027 quindi entro l’8 maggio 2027; il certificato deve essere ancora valido il giorno della gara. Senza un certificato presentato entro i termini e valido il giorno della gara, l’iscrizione non è definitivamente valida e la partecipazione è esclusa; in tal caso la quota di iscrizione non viene rimborsata.",
            },
          ],
        },
        {
          heading: "3. Esclusione di responsabilità dell’organizzatore",
          blocks: [
            {
              type: "p",
              text: "L’organizzatore (Sport OK Dobbiaco) nonché i suoi volontari, partner e sponsor non rispondono di danni a persone, cose o patrimonio derivanti dalla partecipazione, salvo che tali danni siano dovuti a dolo o colpa grave dell’organizzatore. Resta impregiudicata la responsabilità inderogabile di legge, in particolare per danni derivanti da lesioni alla vita, all’integrità fisica o alla salute.",
            },
          ],
        },
        {
          heading: "4. Responsabilità personale e comportamento",
          blocks: [
            {
              type: "p",
              text: "I partecipanti seguono in ogni momento le indicazioni della direzione di gara e del personale sanitario e di sicurezza. In caso di rischi per la sicurezza, la direzione di gara può ritirare un partecipante. Non si assume alcuna responsabilità per attrezzatura e oggetti di valore portati con sé.",
            },
          ],
        },
        {
          heading: "5. Forza maggiore, rinvio e annullamento",
          blocks: [
            {
              type: "p",
              text: "In caso di forza maggiore (es. condizioni meteo estreme, disposizioni delle autorità, eventi naturali) l’evento può essere rinviato, ridotto o annullato. In tal caso i partecipanti non vantano pretese oltre i rimborsi disciplinati dalle condizioni di annullamento.",
            },
          ],
        },
        {
          heading: "6. Assicurazione",
          blocks: [
            {
              type: "p",
              text: "In qualità di organizzatore, Sport OK Dobbiaco dispone di un’idonea copertura assicurativa per lo svolgimento dell’evento. Si raccomanda comunque ai partecipanti di stipulare per la propria partecipazione un’adeguata assicurazione personale contro gli infortuni e sanitaria, nonché eventualmente un’assicurazione per soccorso e rimpatrio, poiché la partecipazione avviene a proprio rischio.",
            },
          ],
        },
      ],
    },
  },

  // ───────────────────────────── ENGLISH ─────────────────────────────
  en: {
    impressum: {
      intro:
        "Identification details and mandatory information about the organiser of the “Dolomites Last Loop”.",
      sections: [
        {
          heading: "Association",
          blocks: [
            {
              type: "list",
              items: [
                "Amateursportverein Sport OK Toblach",
                "Registered office: Seeweg 16, 39034 Dobbiaco/Toblach (BZ), Italy",
                "Codice Fiscale (tax code): 01483970214",
                "Partita IVA (VAT no.): 01483970214",
                "PEC: sportok@pec.it",
                "Email: info@worldcup-dobbiaco.it",
                "Phone: 0474 976000",
                "Website: www.worldcup-dobbiaco.it",
                "Codice Destinatario (SDI): SUBM70N",
              ],
            },
          ],
        },
        {
          heading: "Register entries",
          blocks: [
            {
              type: "list",
              items: [
                "Italian National Register of Amateur Sports Activities (RASD): no. 00362404",
                "FISI – Italian Winter Sports Federation · Affiliation code: 01894",
                "Sports year: 2025/2026 · First affiliation: 01/12/2016",
              ],
            },
          ],
        },
        {
          heading: "Legal representative",
          blocks: [
            {
              type: "list",
              items: ["President / Legal representative: Gerti Taschler"],
            },
          ],
        },
      ],
    },
    datenschutz: {
      intro:
        "This privacy policy informs you, in accordance with the General Data Protection Regulation (EU) 2016/679 (GDPR) and Italian data protection law (Legislative Decree 196/2003 as amended by Legislative Decree 101/2018), about the processing of your personal data in connection with the „Dolomites Last Loop“ event.",
      aiNotice:
        "This text was drafted with AI assistance and reviewed prior to publication.",
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
                "Amateursportverein Sport OK Toblach",
                "Seeweg 16, 39034 Dobbiaco/Toblach (BZ), Italy",
                "Codice Fiscale: 01483970214",
                "Email (data protection): info@worldcup-dobbiaco.it",
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
          heading: "5. Newsletter and participant communications",
          blocks: [
            {
              type: "p",
              text: "We keep two separate mailing lists. They differ in purpose and legal basis:",
            },
            {
              type: "list",
              items: [
                "Newsletter (optional): If you sign up for our newsletter, we process your email address and name on the basis of your consent (Art. 6(1)(a) GDPR). You can unsubscribe at any time via the unsubscribe link in every email or by contacting us.",
                "Participant information (no consent required): Once your registration is binding, we add your first name, last name and email address to a separate participant list. We use it exclusively for organisational and safety-related information about the race, such as start times, changes to the course or schedule, and weather and safety notices. This processing is necessary for the performance of the participation contract (Art. 6(1)(b) GDPR); no consent is required for it and none is obtained. These messages contain no advertising.",
              ],
            },
            {
              type: "note",
              text: "The two lists are independent of each other: unsubscribing from the newsletter does not stop participant information, which is part of running the race and is sent for as long as your registration is active. Conversely, registering for the race does not constitute consent to the newsletter. Retention periods are those set out in point 7.",
            },
            {
              type: "p",
              text: "For both lists we use Sendinblue SAS (trading as Brevo), 9–17 rue Salneuve, 75017 Paris, France, RCS Paris 498 019 298, as a processor.",
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
                "Hosting: Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA – delivery of the website (server location in the EU where available). For any data access from the USA, Vercel relies on the EU-U.S. Data Privacy Framework (DPF).",
                "Database/storage: Supabase Pte. Ltd., 65 Chulia Street #38-02/03, OCBC Centre, Singapore 049513 – storage of participant and registration data. The database for this project is hosted in a data centre in Paris (EU, AWS eu-west-3); for any data access outside the EU, Supabase relies on the EU standard contractual clauses.",
                "Email delivery: Plus Five Five, Inc. (trading as Resend), 2261 Market Street #5039, San Francisco, CA 94114, USA – sending of confirmation and ticket emails. Transfers to the USA are based on the EU-U.S. Data Privacy Framework (DPF).",
                "Rate limiting/abuse protection: Upstash Inc., USA – processing of IP addresses to limit the number of requests. Processing takes place in a data centre in Frankfurt am Main (EU); in addition, Upstash relies on the EU-U.S. Data Privacy Framework (DPF) for any data access.",
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
              text: "We store personal data only for as long as necessary for the stated purposes or as required by statutory retention obligations. Participant data are kept until three months after the race (period running from 15 May 2027) and then deleted or anonymised. Health data (medical certificates) are kept until three months after the race (period running from 15 May 2027) and then deleted. Payment and accounting-related data are retained for ten years in accordance with Art. 2220 of the Italian Civil Code.",
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
              text: "To exercise your rights, contact: info@worldcup-dobbiaco.it",
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
        {
          id: "bildrechte",
          heading: "10. Photos and videos (image rights)",
          blocks: [
            {
              type: "p",
              text: "Photos and videos are taken during the event. With your consent at registration, these images may be used by the organiser (Sport OK Toblach) for event coverage as well as for marketing and advertising purposes (website, social media, print).",
            },
            {
              type: "p",
              text: "Consent is voluntary and can be withdrawn at any time with effect for the future (info@worldcup-dobbiaco.it). Withdrawal does not affect the lawfulness of processing carried out beforehand; images already published may not need to be withdrawn where this is impossible or involves disproportionate effort.",
            },
          ],
        },
      ],
    },

    agb: {
      intro:
        "These participation terms govern entry to the „Dolomites Last Loop“ event – a Backyard Ultra in Toblach (Dobbiaco), South Tyrol, on 15 May 2027, with a limited number of participants. The organiser is Sport OK Toblach.",
      aiNotice:
        "This text was drafted with AI assistance and reviewed prior to publication.",
      sections: [
        {
          heading: "1. Registration and entry fee",
          blocks: [
            {
              type: "p",
              text: "Registration is completed online and becomes binding upon full payment of the entry fee. The number of participants is limited; once the maximum is reached, a waiting list is kept. The entry fee is tiered:",
            },
            {
              type: "list",
              items: [
                "Early-bird registration: €75 (1 Sep – 31 Dec 2026)",
                "Standard rate: €80 (1 Jan – 31 Mar 2027)",
                "Late registration: €100 (1 Apr – 30 Apr 2027)",
              ],
            },
          ],
        },
        {
          heading: "2. Cancellation and refund terms",
          blocks: [
            {
              type: "p",
              text: "As a matter of principle, cancellations do not entitle you to a refund of the entry fee. Exception: in the case of a documented injury (medical certificate) you are entitled to free participation in the following year; no monetary refund is granted in this case either. Cancellation requests are processed within one week.",
            },
            {
              type: "p",
              text: "The start spot may be transferred to another person up to two weeks before the race at the latest. In the event of a transfer, both the entitlement to free participation in the following year and the personalisation of the bib number lapse.",
            },
          ],
        },
        {
          heading: "3. Mandatory documents",
          blocks: [
            {
              type: "p",
              text: "A valid medical / sports-medical certificate is required to participate. It can be uploaded during registration or submitted later, but must reach the organiser no later than one week before the race start — for the 2027 edition, by 8 May 2027. The certificate must still be valid on race day. If no certificate is submitted on time and valid on race day, participation is excluded; the cancellation terms under section 2 apply and the entry fee is not refunded.",
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
      updated: "Last updated: 8 August 2026",
      aiNotice:
        "This text was drafted with AI assistance and reviewed prior to publication.",
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
              text: "The elevation-profile graphic on the race page is currently not fully accessible to screen readers. A textual description of the course data (distance, highest point, gradient profile) is provided in the accompanying body text, but does not fully replace the graphic. A full accessibility audit of the website is still outstanding.",
            },
          ],
        },
        {
          heading: "Feedback and contact",
          blocks: [
            {
              type: "p",
              text: "If you encounter barriers or content that is not accessible, please contact us at info@worldcup-dobbiaco.it. We will do our best to find a prompt solution.",
            },
          ],
        },
        {
          heading: "Last review",
          blocks: [
            {
              type: "p",
              text: "Last review of this statement: 8 August 2026.",
            },
          ],
        },
      ],
    },

    rueckerstattung: {
      intro:
        "This refund policy supplements the participation terms (Terms) and summarises the key points regarding refunds of the entry fee.",
      aiNotice:
        "This text was drafted with AI assistance and reviewed prior to publication.",
      sections: [
        {
          heading: "Cancellation and refund",
          blocks: [
            {
              type: "p",
              text: "As a matter of principle, cancellations do not entitle you to a refund of the entry fee. Exception: in the case of a documented injury (medical certificate) you are entitled to free participation in the following year; no monetary refund is granted in this case either. Cancellation requests are processed within one week.",
            },
            {
              type: "p",
              text: "The start spot may be transferred to another person up to two weeks before the race at the latest. In the event of a transfer, both the entitlement to free participation in the following year and the personalisation of the bib number lapse.",
            },
          ],
        },
        {
          heading: "Request and processing",
          blocks: [
            {
              type: "p",
              text: "Submit a refund request by email to dolomiteslastloop@gmail.com. Processing takes place within a maximum of one week.",
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
    haftungsausschluss: {
      updated: "Last updated: 8 August 2026",
      intro:
        "Participation in the „Dolomites Last Loop“ (Backyard Ultra, Toblach/Dobbiaco) is voluntary and at your own risk. By registering you accept the following terms.",
      aiNotice:
        "This text was drafted with AI assistance and reviewed prior to publication.",
      sections: [
        {
          heading: "1. Participation at your own risk",
          blocks: [
            {
              type: "p",
              text: "A Backyard Ultra is an extreme endurance competition. Participation is entirely at your own risk and responsibility. Each participant assesses their own physical and health condition and decides, on their own responsibility, whether to start, continue or withdraw from the race.",
            },
          ],
        },
        {
          heading: "2. Medical fitness and certificate",
          blocks: [
            {
              type: "p",
              text: "Participation requires full medical fitness for maximum athletic exertion. A valid medical certificate (certificato medico agonistico) must be provided no later than one week before the race start — for the 2027 edition, by 8 May 2027 — and must still be valid on race day. Without a certificate submitted on time and valid on race day, the registration is not finally valid and participation is excluded; the entry fee is not refunded in this case.",
            },
          ],
        },
        {
          heading: "3. Disclaimer of liability of the organiser",
          blocks: [
            {
              type: "p",
              text: "The organiser (Sport OK Toblach) as well as its volunteers, partners and sponsors are not liable for personal injury, property or financial damage arising in connection with participation, unless such damage is due to intent or gross negligence on the part of the organiser. Mandatory statutory liability, in particular for damage resulting from injury to life, body or health, remains unaffected.",
            },
          ],
        },
        {
          heading: "4. Personal responsibility and conduct",
          blocks: [
            {
              type: "p",
              text: "Participants follow the instructions of the race management and the medical and safety staff at all times. In the event of safety concerns, the race management may withdraw participants from the race. No liability is accepted for equipment and valuables carried.",
            },
          ],
        },
        {
          heading: "5. Force majeure, postponement and cancellation",
          blocks: [
            {
              type: "p",
              text: "In the event of force majeure (e.g. extreme weather, official requirements, natural events), the event may be postponed, shortened or cancelled. In this case, participants have no claims beyond the refunds set out in the cancellation terms.",
            },
          ],
        },
        {
          heading: "6. Insurance",
          blocks: [
            {
              type: "p",
              text: "As the organiser, Sport OK Toblach holds appropriate insurance cover for staging the event. Participants are nevertheless advised to take out adequate personal accident and health insurance — and, where applicable, rescue and repatriation insurance — for their own participation, as participation is at your own risk.",
            },
          ],
        },
      ],
    },
  },
};
