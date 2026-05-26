export const languages = {
  de: "Deutsch",
  it: "Italiano",
  en: "English",
} as const;

export const defaultLang = "de" as const;
export type Lang = keyof typeof languages;

export const ui = {
  de: {
    "site.title": "Dolomites Last Loop",
    "site.tagline": "Backyard Ultra • Toblach • Dolomiten",
    "site.description":
      "Das erste Backyard Ultra Rennen in den Dolomiten – Toblach, 15. Mai 2027.",
    "site.event_date": "15. Mai 2027",

    "nav.home": "Start",
    "nav.race_info": "Rennen",
    "nav.signup": "Anmeldung",
    "nav.startlist": "Startliste",
    "nav.results": "Ergebnisse",
    "nav.gallery": "Galerie",
    "nav.faq": "FAQ",
    "nav.contact": "Kontakt",
    "nav.menu": "Menü",
    "nav.close": "Schließen",

    "hero.title": "Dolomites Last Loop",
    "hero.subtitle": "Backyard Ultra · Toblach · 15. Mai 2027",
    "hero.teaser":
      "Das erste Backyard Ultra Rennen in den Dolomiten. Am 15. Mai 2027 in Toblach.",
    "hero.cta_signup": "Jetzt anmelden",
    "hero.cta_more": "Mehr erfahren",

    "home.features.title": "Was macht dieses Rennen besonders?",
    "home.features.location.title": "Herz der Dolomiten",
    "home.features.location.text":
      "Toblach – UNESCO Weltnaturerbe als Kulisse, Start an der Nordic Arena, Schleife Richtung Toblacher See.",
    "home.features.format.title": "Backyard Format",
    "home.features.format.text":
      "6,71 km jede Stunde. Wer den Loop nicht schafft, scheidet aus. Letzter Läufer gewinnt.",
    "home.features.community.title": "Ehrliche Community",
    "home.features.community.text":
      "Kein Hype, kein Pomp. Zentrale Teamzone, gemeinsamer Start, gemeinsames Leiden.",
    "home.features.limit.title": "Limitiert",
    "home.features.limit.text":
      "Maximal 150 Startplätze. Persönliche, familiäre Atmosphäre statt Massenstart.",

    "home.newsletter.title": "Bleib auf dem Laufenden",
    "home.newsletter.text":
      "Erhalte als Erster Updates zur Ausgabe am 15. Mai 2027.",
    "home.newsletter.placeholder": "Deine Email-Adresse",
    "home.newsletter.submit": "Eintragen",
    "home.newsletter.success": "Danke! Du bist auf der Liste.",
    "home.newsletter.error": "Etwas ist schiefgelaufen. Bitte erneut versuchen.",

    "home.archive.title": "2026 – Rückblick",
    "home.archive.first_edition": "Bilder und Zahlen einer langen Nacht.",
    "home.archive.link": "Ergebnisse 2026",
    "home.archive.gallery": "Zur Galerie",
    "home.archive.stat.starters": "Starter",
    "home.archive.stat.loop": "km / Loop",
    "home.archive.stat.hours": "Stunden",

    "race.title": "Race Info",
    "race.what.title": "Was ist ein Backyard Ultra?",
    "race.what.text":
      "Ein Backyard Ultra ist ein Ausdauerrennen ohne fixe Distanz: Jede volle Stunde startet ein Loop von 6,71 km. Wer die Runde rechtzeitig beendet, geht zur nächsten Stunde wieder an den Start. Wer nicht rechtzeitig zurück ist, scheidet aus. Es gibt nur einen Sieger: den letzten Läufer, der noch eine Runde komplett mehr schafft als alle anderen.",
    "race.course.title": "Strecke",
    "race.course.text":
      "6,71 km ab Nordic Arena Toblach, Richtung Toblacher See. Die ersten Kilometer steigen leicht an, der höchste Punkt liegt in der Mitte der Schleife, danach geht es im Gefälle zurück zum Start. Geteilte Asphalt- und Schotterabschnitte, breit und gut markiert.",
    "race.rules.title": "Regeln",
    "race.rules.1": "Start jede volle Stunde gemeinsam (Corral).",
    "race.rules.2":
      "Jede Runde muss vor dem Start der nächsten Stunde komplett abgeschlossen sein.",
    "race.rules.3":
      "Zentrale Support-Zone: jeder Läufer erhält eine eigene 3×3 m Teamzone.",
    "race.rules.4": "Kein Support entlang der Strecke erlaubt.",
    "race.rules.5":
      "Ausrüstungs- und Bekleidungswechsel zwischen den Runden erlaubt.",
    "race.rules.6": "Laufstöcke sind nicht zugelassen.",
    "race.rules.7": "Mindestalter: 18 Jahre am Renntag.",
    "race.rules.8": "Ab 20:00 Uhr Stirnlampe Pflicht.",
    "race.rules.9":
      "Mobiltelefon mit hinterlegter Notfallnummer ist Pflichtausrüstung.",
    "race.rules.10":
      "Bei medizinischen Bedenken kann die Rennleitung einen Läufer jederzeit aus dem Rennen nehmen.",
    "race.rules.11":
      "Bei Verdacht auf Einnahme von Schmerzmitteln kann der Veranstalter einen Dopingtest anordnen.",
    "race.rules.12":
      "Auf der Strecke sind weder Crew-Mitglieder noch andere Personen erlaubt. Es ist strengstens untersagt, mit den Athleten mitzulaufen.",

    "signup.title": "Anmeldung",
    "signup.intro":
      "Sichere dir einen der 150 Startplätze für die Ausgabe am 15. Mai 2027.",
    "signup.step": "Schritt",
    "signup.step1.title": "Persönliche Daten",
    "signup.step2.title": "Ticket & Zahlung",
    "signup.step3.title": "Ärztliches Attest",
    "signup.field.firstname": "Vorname",
    "signup.field.lastname": "Nachname",
    "signup.field.email": "Email",
    "signup.field.birthdate": "Geburtsdatum",
    "signup.field.nationality": "Nationalität",
    "signup.field.emergency_name": "Notfallkontakt – Name",
    "signup.field.emergency_phone": "Notfallkontakt – Telefon",
    "signup.field.required": "Pflichtfeld",
    "signup.field.invalid_email": "Bitte gültige Email-Adresse angeben.",
    "signup.field.age_error": "Du musst am Renntag mindestens 18 Jahre alt sein.",
    "signup.continue": "Weiter",
    "signup.back": "Zurück",
    "signup.ticket.earlybird": "Early Bird",
    "signup.ticket.standard": "Standard",
    "signup.ticket.included":
      "Inkludiert: Startplatz, Startnummer, Teamzone, Verpflegung, Finisher-Geschenk.",
    "signup.ticket.checkout": "Zur Zahlung",
    "signup.attest.title": "Ärztliches Attest hochladen",
    "signup.attest.hint":
      "PDF, max. 5 MB. Pflicht vor dem Renntag – kann auch später nachgereicht werden.",
    "signup.attest.upload": "Datei auswählen",
    "signup.attest.skip": "Später nachreichen",
    "signup.attest.success": "Attest erfolgreich hochgeladen.",
    "signup.full.title": "Startplätze ausgebucht",
    "signup.full.text":
      "Aktuell sind alle 150 Plätze vergeben. Trage dich auf die Warteliste ein.",
    "signup.full.cta": "Auf Warteliste setzen",

    "startlist.title": "Startliste",
    "startlist.counter": "{filled} von {total} Plätzen belegt",
    "startlist.search": "Name suchen…",
    "startlist.col.number": "Nr.",
    "startlist.col.name": "Name",
    "startlist.col.nation": "Nation",
    "startlist.col.status": "Status",
    "startlist.status.confirmed": "Bestätigt",
    "startlist.status.waitlist": "Warteliste",
    "startlist.status.pending": "Ausstehend",
    "startlist.empty": "Noch keine Teilnehmer registriert.",

    "results.title": "Ergebnisse",
    "results.intro": "Archiv vergangener Ausgaben.",
    "results.year.2026": "2026 – 101 Starter",
    "results.col.place": "Platz",
    "results.col.name": "Name",
    "results.col.nation": "Nation",
    "results.col.loops": "Runden",
    "results.placeholder":
      "Die offiziellen Ergebnisse der Ausgabe 2026 werden hier veröffentlicht.",
    "results.gallery_link":
      "Eindrücke der Ausgabe 2026 in der Galerie ansehen →",

    "gallery.title": "Galerie",
    "gallery.subtitle": "2026 · 101 Starter",
    "gallery.intro":
      "Bilder aus Toblach – Tag und Nacht in den Dolomiten.",
    "gallery.section.day": "Tag",
    "gallery.section.night": "Nacht",
    "gallery.credit": "© Harald Wisthaler – www.wisthaler.com",
    "gallery.close": "Schließen",
    "gallery.download": "Foto herunterladen",
    "gallery.alt.hero_start": "Startlinie mit allen Läufern",
    "gallery.alt.day_running_1": "Läufer auf der Strecke am See",
    "gallery.alt.day_running_2": "Läufer im Startfeld",
    "gallery.alt.day_runner_portrait": "Läufer im Dynafit-Trikot",
    "gallery.alt.bib_detail": "Startnummer 49 – Hannes",
    "gallery.alt.night_runners": "Läufer mit Stirnlampen in der Nacht",
    "gallery.alt.night_camp": "Basislager bei Nacht",
    "gallery.alt.night_headlamp": "Athlet mit Stirnlampe im Basislager",
    "gallery.alt.emotion_smile": "Lächelnde Athletin",
    "gallery.alt.portrait_exhausted": "Erschöpfter Ausdruck nach dem Loop",

    "faq.title": "FAQ",
    "faq.participants": "Für Teilnehmer",
    "faq.crew": "Für Betreuer",

    "contact.title": "Kontakt",
    "contact.org": "Veranstalter",
    "contact.org.value": "Sport OK Toblach",
    "contact.location": "Standort",
    "contact.location.value": "Seeweg 16, 39034 Toblach (BZ), Italien",
    "contact.email": "Email",
    "contact.form.title": "Schreib uns",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Nachricht",
    "contact.form.submit": "Senden",
    "contact.form.success": "Danke! Wir melden uns zeitnah zurück.",
    "contact.form.error": "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
    "contact.map.title": "Nordic Arena Toblach",

    "footer.privacy": "Datenschutz",
    "footer.terms": "AGB",
    "footer.accessibility": "Barrierefreiheit",
    "footer.refund": "Rückerstattung",
    "footer.copyright": "© {year} Dolomites Last Loop",
    "footer.org": "Veranstalter: Sport OK Toblach",

    "admin.title": "Admin",
    "admin.login": "Anmelden",
    "admin.logout": "Abmelden",
    "admin.password": "Passwort",
    "admin.participants": "Teilnehmer",
    "admin.waitlist": "Warteliste",
    "admin.newsletter": "Newsletter",
    "admin.export": "Als CSV exportieren",
    "admin.add": "Manuell hinzufügen",
    "admin.delete": "Entfernen",
    "admin.attest.view": "Attest ansehen",
    "admin.attest.confirm": "Bestätigen",
    "admin.attest.reject": "Ablehnen",
  },

  it: {
    "site.title": "Dolomites Last Loop",
    "site.tagline": "Backyard Ultra • Dobbiaco • Dolomiti",
    "site.description":
      "La prima Backyard Ultra delle Dolomiti – Dobbiaco, 15 maggio 2027.",
    "site.event_date": "15 maggio 2027",

    "nav.home": "Home",
    "nav.race_info": "Gara",
    "nav.signup": "Iscrizione",
    "nav.startlist": "Lista partenti",
    "nav.results": "Risultati",
    "nav.gallery": "Galleria",
    "nav.faq": "FAQ",
    "nav.contact": "Contatti",
    "nav.menu": "Menu",
    "nav.close": "Chiudi",

    "hero.title": "Dolomites Last Loop",
    "hero.subtitle": "Backyard Ultra · Dobbiaco · 15 maggio 2027",
    "hero.teaser":
      "La prima Backyard Ultra delle Dolomiti. Il 15 maggio 2027 a Dobbiaco.",
    "hero.cta_signup": "Iscriviti ora",
    "hero.cta_more": "Scopri di più",

    "home.features.title": "Cosa rende speciale questa gara?",
    "home.features.location.title": "Cuore delle Dolomiti",
    "home.features.location.text":
      "Dobbiaco – Patrimonio UNESCO come scenario, partenza dalla Nordic Arena, anello verso il Lago di Dobbiaco.",
    "home.features.format.title": "Formato Backyard",
    "home.features.format.text":
      "6,71 km ogni ora. Chi non completa il loop è fuori. Vince l’ultimo che resta.",
    "home.features.community.title": "Community vera",
    "home.features.community.text":
      "Niente hype, niente eccessi. Zona team centrale, partenza comune, fatica condivisa.",
    "home.features.limit.title": "Posti limitati",
    "home.features.limit.text":
      "Massimo 150 partenti. Atmosfera personale e familiare, non una corsa di massa.",

    "home.newsletter.title": "Resta aggiornato",
    "home.newsletter.text":
      "Ricevi per primo gli aggiornamenti sull’edizione del 15 maggio 2027.",
    "home.newsletter.placeholder": "La tua email",
    "home.newsletter.submit": "Iscriviti",
    "home.newsletter.success": "Grazie! Sei nella lista.",
    "home.newsletter.error": "Qualcosa è andato storto. Riprova.",

    "home.archive.title": "2026 – Sguardo indietro",
    "home.archive.first_edition": "Immagini e numeri di una lunga notte.",
    "home.archive.link": "Risultati 2026",
    "home.archive.gallery": "Vai alla galleria",
    "home.archive.stat.starters": "Partenti",
    "home.archive.stat.loop": "km / Loop",
    "home.archive.stat.hours": "Ore",

    "race.title": "Info gara",
    "race.what.title": "Cos’è una Backyard Ultra?",
    "race.what.text":
      "Una Backyard Ultra è una gara di resistenza senza distanza fissa: ogni ora esatta parte un loop di 6,71 km. Chi completa il giro in tempo riparte all’ora successiva. Chi non torna in tempo è fuori. Vince un solo atleta: l’ultimo che riesce a portare a termine un giro in più di tutti gli altri.",
    "race.course.title": "Percorso",
    "race.course.text":
      "6,71 km dalla Nordic Arena di Dobbiaco verso il Lago di Dobbiaco. I primi chilometri salgono leggermente, il punto più alto è a metà giro, poi discesa verso l’arrivo. Asfalto e sterrato, largo e ben segnalato.",
    "race.rules.title": "Regolamento",
    "race.rules.1": "Partenza ogni ora esatta in gruppo (corral).",
    "race.rules.2":
      "Ogni giro deve essere completato prima della partenza dell’ora successiva.",
    "race.rules.3":
      "Zona supporto centrale: ogni atleta ha la propria area team 3×3 m.",
    "race.rules.4": "Nessun supporto lungo il percorso.",
    "race.rules.5":
      "Cambio di abbigliamento e materiale consentito tra un loop e l’altro.",
    "race.rules.6": "Bastoncini non ammessi.",
    "race.rules.7": "Età minima: 18 anni il giorno della gara.",
    "race.rules.8": "Dalle 20:00 frontale obbligatoria.",
    "race.rules.9":
      "Cellulare con numero di emergenza registrato è materiale obbligatorio.",
    "race.rules.10":
      "In caso di problemi medici, la direzione può ritirare un atleta dalla gara in qualsiasi momento.",
    "race.rules.11":
      "In caso di sospetto consumo di antidolorifici, l’organizzatore può disporre un test antidoping.",
    "race.rules.12":
      "Sul percorso non sono ammessi né i membri dell’equipaggio né altre persone. È severamente vietato correre insieme agli atleti.",

    "signup.title": "Iscrizione",
    "signup.intro":
      "Assicurati uno dei 150 posti per l’edizione del 15 maggio 2027.",
    "signup.step": "Step",
    "signup.step1.title": "Dati personali",
    "signup.step2.title": "Biglietto & pagamento",
    "signup.step3.title": "Certificato medico",
    "signup.field.firstname": "Nome",
    "signup.field.lastname": "Cognome",
    "signup.field.email": "Email",
    "signup.field.birthdate": "Data di nascita",
    "signup.field.nationality": "Nazionalità",
    "signup.field.emergency_name": "Contatto emergenza – Nome",
    "signup.field.emergency_phone": "Contatto emergenza – Telefono",
    "signup.field.required": "Campo obbligatorio",
    "signup.field.invalid_email": "Inserisci un’email valida.",
    "signup.field.age_error":
      "Devi avere almeno 18 anni il giorno della gara.",
    "signup.continue": "Avanti",
    "signup.back": "Indietro",
    "signup.ticket.earlybird": "Early Bird",
    "signup.ticket.standard": "Standard",
    "signup.ticket.included":
      "Incluso: posto di partenza, pettorale, area team, ristoro, gadget finisher.",
    "signup.ticket.checkout": "Vai al pagamento",
    "signup.attest.title": "Carica il certificato medico",
    "signup.attest.hint":
      "PDF, max 5 MB. Obbligatorio prima della gara – puoi caricarlo anche più tardi.",
    "signup.attest.upload": "Scegli file",
    "signup.attest.skip": "Carico più tardi",
    "signup.attest.success": "Certificato caricato con successo.",
    "signup.full.title": "Posti esauriti",
    "signup.full.text":
      "Tutti i 150 posti sono stati assegnati. Iscriviti alla lista d’attesa.",
    "signup.full.cta": "Vai in lista d’attesa",

    "startlist.title": "Lista partenti",
    "startlist.counter": "{filled} di {total} posti occupati",
    "startlist.search": "Cerca nome…",
    "startlist.col.number": "N°",
    "startlist.col.name": "Nome",
    "startlist.col.nation": "Nazione",
    "startlist.col.status": "Stato",
    "startlist.status.confirmed": "Confermato",
    "startlist.status.waitlist": "Lista d’attesa",
    "startlist.status.pending": "In sospeso",
    "startlist.empty": "Nessun partecipante registrato.",

    "results.title": "Risultati",
    "results.intro": "Archivio delle edizioni passate.",
    "results.year.2026": "2026 – 101 partenti",
    "results.col.place": "Pos.",
    "results.col.name": "Nome",
    "results.col.nation": "Nazione",
    "results.col.loops": "Giri",
    "results.placeholder":
      "I risultati ufficiali dell’edizione 2026 saranno pubblicati qui.",
    "results.gallery_link":
      "Guarda le immagini dell’edizione 2026 in galleria →",

    "gallery.title": "Galleria",
    "gallery.subtitle": "2026 · 101 partenti",
    "gallery.intro":
      "Immagini da Dobbiaco – giorno e notte tra le Dolomiti.",
    "gallery.section.day": "Giorno",
    "gallery.section.night": "Notte",
    "gallery.credit": "© Harald Wisthaler – www.wisthaler.com",
    "gallery.close": "Chiudi",
    "gallery.download": "Scarica la foto",
    "gallery.alt.hero_start": "Linea di partenza con tutti gli atleti",
    "gallery.alt.day_running_1": "Atleta sul percorso vicino al lago",
    "gallery.alt.day_running_2": "Atleti nel gruppo di partenza",
    "gallery.alt.day_runner_portrait": "Atleta con maglia Dynafit",
    "gallery.alt.bib_detail": "Pettorale 49 – Hannes",
    "gallery.alt.night_runners": "Atleti con frontale di notte",
    "gallery.alt.night_camp": "Campo base di notte",
    "gallery.alt.night_headlamp": "Atleta con frontale al campo base",
    "gallery.alt.emotion_smile": "Atleta che sorride",
    "gallery.alt.portrait_exhausted": "Espressione di stanchezza dopo il loop",

    "faq.title": "FAQ",
    "faq.participants": "Per i partecipanti",
    "faq.crew": "Per i supporter",

    "contact.title": "Contatti",
    "contact.org": "Organizzatore",
    "contact.org.value": "Sport OK Dobbiaco",
    "contact.location": "Sede",
    "contact.location.value": "Seeweg 16, 39034 Dobbiaco (BZ), Italia",
    "contact.email": "Email",
    "contact.form.title": "Scrivici",
    "contact.form.name": "Nome",
    "contact.form.email": "Email",
    "contact.form.message": "Messaggio",
    "contact.form.submit": "Invia",
    "contact.form.success": "Grazie! Ti rispondiamo a breve.",
    "contact.form.error": "Qualcosa è andato storto. Riprova.",
    "contact.map.title": "Nordic Arena Dobbiaco",

    "footer.privacy": "Privacy",
    "footer.terms": "Termini",
    "footer.accessibility": "Accessibilità",
    "footer.refund": "Rimborsi",
    "footer.copyright": "© {year} Dolomites Last Loop",
    "footer.org": "Organizzatore: Sport OK Dobbiaco",

    "admin.title": "Admin",
    "admin.login": "Accedi",
    "admin.logout": "Esci",
    "admin.password": "Password",
    "admin.participants": "Partecipanti",
    "admin.waitlist": "Lista d’attesa",
    "admin.newsletter": "Newsletter",
    "admin.export": "Esporta CSV",
    "admin.add": "Aggiungi manualmente",
    "admin.delete": "Rimuovi",
    "admin.attest.view": "Vedi certificato",
    "admin.attest.confirm": "Conferma",
    "admin.attest.reject": "Rifiuta",
  },

  en: {
    "site.title": "Dolomites Last Loop",
    "site.tagline": "Backyard Ultra • Toblach/Dobbiaco • Dolomites",
    "site.description":
      "The first Backyard Ultra race in the Dolomites – Toblach, May 15, 2027.",
    "site.event_date": "May 15, 2027",

    "nav.home": "Home",
    "nav.race_info": "Race",
    "nav.signup": "Sign up",
    "nav.startlist": "Start list",
    "nav.results": "Results",
    "nav.gallery": "Gallery",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.close": "Close",

    "hero.title": "Dolomites Last Loop",
    "hero.subtitle": "Backyard Ultra · Toblach · May 15, 2027",
    "hero.teaser":
      "The first Backyard Ultra race in the Dolomites. May 15, 2027 in Toblach.",
    "hero.cta_signup": "Sign up now",
    "hero.cta_more": "Learn more",

    "home.features.title": "What makes this race special?",
    "home.features.location.title": "Heart of the Dolomites",
    "home.features.location.text":
      "Toblach – UNESCO World Heritage backdrop, start at the Nordic Arena, loop toward Lake Toblach.",
    "home.features.format.title": "Backyard format",
    "home.features.format.text":
      "6.71 km every hour on the hour. Miss a loop, you’re out. Last runner standing wins.",
    "home.features.community.title": "Honest community",
    "home.features.community.text":
      "No hype, no glitter. Central team zone, shared start line, shared suffering.",
    "home.features.limit.title": "Limited field",
    "home.features.limit.text":
      "Max 150 starters. Personal, family-style vibe instead of a mass start.",

    "home.newsletter.title": "Stay in the loop",
    "home.newsletter.text":
      "Be the first to receive updates about the May 15, 2027 edition.",
    "home.newsletter.placeholder": "Your email",
    "home.newsletter.submit": "Subscribe",
    "home.newsletter.success": "Thanks! You’re on the list.",
    "home.newsletter.error": "Something went wrong. Please try again.",

    "home.archive.title": "2026 – Looking back",
    "home.archive.first_edition": "Photos and numbers from one long night.",
    "home.archive.link": "Results 2026",
    "home.archive.gallery": "Open gallery",
    "home.archive.stat.starters": "Starters",
    "home.archive.stat.loop": "km / Loop",
    "home.archive.stat.hours": "Hours",

    "race.title": "Race info",
    "race.what.title": "What is a Backyard Ultra?",
    "race.what.text":
      "A Backyard Ultra is an endurance race with no fixed distance: every hour on the hour a 6.71 km loop starts. Finish the loop in time, you start again the next hour. Miss the cutoff, you’re out. There’s only one winner: the last runner to complete one more loop than everyone else.",
    "race.course.title": "Course",
    "race.course.text":
      "6.71 km from the Nordic Arena in Toblach toward Lake Toblach. The first kilometres climb gently, the highest point is mid-loop, then a descent back to the start. Mixed asphalt and gravel, wide and well marked.",
    "race.rules.title": "Rules",
    "race.rules.1": "Common start every hour on the hour (corral).",
    "race.rules.2":
      "Each loop must be completed before the next hour’s start.",
    "race.rules.3":
      "Central support zone: each runner gets their own 3×3 m team area.",
    "race.rules.4": "No support along the course.",
    "race.rules.5": "Clothing and gear changes allowed between loops.",
    "race.rules.6": "Trekking poles are not allowed.",
    "race.rules.7": "Minimum age: 18 on race day.",
    "race.rules.8": "Headlamp mandatory from 20:00.",
    "race.rules.9":
      "Mobile phone with emergency number stored is mandatory gear.",
    "race.rules.10":
      "In case of medical concern, the race directors can withdraw a runner at any time.",
    "race.rules.11":
      "If use of painkillers is suspected, the organizer may order a doping test.",
    "race.rules.12":
      "No crew members or other persons are allowed on the course. Running alongside athletes is strictly prohibited.",

    "signup.title": "Sign up",
    "signup.intro":
      "Secure one of the 150 starting spots for the May 15, 2027 edition.",
    "signup.step": "Step",
    "signup.step1.title": "Personal data",
    "signup.step2.title": "Ticket & payment",
    "signup.step3.title": "Medical certificate",
    "signup.field.firstname": "First name",
    "signup.field.lastname": "Last name",
    "signup.field.email": "Email",
    "signup.field.birthdate": "Date of birth",
    "signup.field.nationality": "Nationality",
    "signup.field.emergency_name": "Emergency contact – Name",
    "signup.field.emergency_phone": "Emergency contact – Phone",
    "signup.field.required": "Required field",
    "signup.field.invalid_email": "Please enter a valid email.",
    "signup.field.age_error": "You must be 18 or older on race day.",
    "signup.continue": "Continue",
    "signup.back": "Back",
    "signup.ticket.earlybird": "Early Bird",
    "signup.ticket.standard": "Standard",
    "signup.ticket.included":
      "Included: starting spot, bib, team zone, aid, finisher gift.",
    "signup.ticket.checkout": "Go to checkout",
    "signup.attest.title": "Upload medical certificate",
    "signup.attest.hint":
      "PDF, max 5 MB. Mandatory before race day – can be uploaded later.",
    "signup.attest.upload": "Choose file",
    "signup.attest.skip": "Upload later",
    "signup.attest.success": "Certificate uploaded successfully.",
    "signup.full.title": "Race is full",
    "signup.full.text":
      "All 150 spots are taken. Join the waiting list to be notified.",
    "signup.full.cta": "Join the waitlist",

    "startlist.title": "Start list",
    "startlist.counter": "{filled} of {total} spots filled",
    "startlist.search": "Search name…",
    "startlist.col.number": "No.",
    "startlist.col.name": "Name",
    "startlist.col.nation": "Nation",
    "startlist.col.status": "Status",
    "startlist.status.confirmed": "Confirmed",
    "startlist.status.waitlist": "Waitlist",
    "startlist.status.pending": "Pending",
    "startlist.empty": "No registered runners yet.",

    "results.title": "Results",
    "results.intro": "Archive of past editions.",
    "results.year.2026": "2026 – 101 starters",
    "results.col.place": "Pos.",
    "results.col.name": "Name",
    "results.col.nation": "Nation",
    "results.col.loops": "Loops",
    "results.placeholder":
      "Official results of the 2026 edition will be published here.",
    "results.gallery_link":
      "View photos of the 2026 edition in the gallery →",

    "gallery.title": "Gallery",
    "gallery.subtitle": "2026 · 101 starters",
    "gallery.intro":
      "Photos from Toblach – day and night in the Dolomites.",
    "gallery.section.day": "Day",
    "gallery.section.night": "Night",
    "gallery.credit": "© Harald Wisthaler – www.wisthaler.com",
    "gallery.close": "Close",
    "gallery.download": "Download photo",
    "gallery.alt.hero_start": "Starting line with all runners",
    "gallery.alt.day_running_1": "Runner on course near the lake",
    "gallery.alt.day_running_2": "Runners in the start corral",
    "gallery.alt.day_runner_portrait": "Runner in Dynafit jersey",
    "gallery.alt.bib_detail": "Bib number 49 – Hannes",
    "gallery.alt.night_runners": "Runners with headlamps at night",
    "gallery.alt.night_camp": "Base camp at night",
    "gallery.alt.night_headlamp": "Athlete with headlamp in base camp",
    "gallery.alt.emotion_smile": "Smiling athlete",
    "gallery.alt.portrait_exhausted": "Exhausted look after a loop",

    "faq.title": "FAQ",
    "faq.participants": "For runners",
    "faq.crew": "For crew",

    "contact.title": "Contact",
    "contact.org": "Organiser",
    "contact.org.value": "Sport OK Toblach",
    "contact.location": "Location",
    "contact.location.value": "Seeweg 16, 39034 Toblach (BZ), Italy",
    "contact.email": "Email",
    "contact.form.title": "Write to us",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Send",
    "contact.form.success": "Thanks! We’ll get back to you shortly.",
    "contact.form.error": "Something went wrong. Please try again.",
    "contact.map.title": "Nordic Arena Toblach",

    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.accessibility": "Accessibility",
    "footer.refund": "Refunds",
    "footer.copyright": "© {year} Dolomites Last Loop",
    "footer.org": "Organiser: Sport OK Toblach",

    "admin.title": "Admin",
    "admin.login": "Sign in",
    "admin.logout": "Sign out",
    "admin.password": "Password",
    "admin.participants": "Participants",
    "admin.waitlist": "Waitlist",
    "admin.newsletter": "Newsletter",
    "admin.export": "Export as CSV",
    "admin.add": "Add manually",
    "admin.delete": "Remove",
    "admin.attest.view": "View certificate",
    "admin.attest.confirm": "Approve",
    "admin.attest.reject": "Reject",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
