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
      "Die 2. Ausgabe des Backyard Ultra Rennens in den Dolomiten – Toblach, 15. Mai 2027.",
    "site.event_date": "15. Mai 2027",

    "meta.race_info":
      "Backyard Ultra in Toblach: 6,71 km Loop jede volle Stunde nach dem Last-One-Standing-Prinzip. Strecke, Regeln und Cut-off der Dolomites Last Loop 2027.",
    "meta.signup":
      "Jetzt für die Dolomites Last Loop 2027 in Toblach anmelden: Early-Bird-Gebühr, Anmeldeschluss und nur 200 Startplätze. Sichere dir deinen Platz.",
    "meta.startlist":
      "Startliste der Dolomites Last Loop 2027 und Ergebnisse 2026: alle bestätigten Teilnehmer des Backyard Ultra in Toblach auf einen Blick.",
    "alt.logo": "Dolomites Last Loop",
    "alt.course_photo": "Läufer auf der 6,71 km langen Strecke der Dolomites Last Loop bei Toblach",
    "alt.signup_portrait": "Erschöpfter Backyard-Ultra-Läufer nach mehreren Runden bei Nacht",
    "alt.signup_side": "Lächelnde Läuferin bei der Dolomites Last Loop in Toblach",
    "alt.athletes_night": "Backyard-Ultra-Läufer in der Nacht zwischen zwei Runden in Toblach",
    "alt.athletes_start": "Läufergruppe am Start der Dolomites Last Loop in den Dolomiten",
    "alt.athletes_portrait": "Porträt eines konzentrierten Backyard-Ultra-Athleten bei der Dolomites Last Loop",
    "alt.story_course": "Läufer auf der Runde durch die Dolomiten-Landschaft bei der Dolomites Last Loop",
    "alt.fullbleed_day": "Läuferin auf der Strecke der Dolomites Last Loop bei Tageslicht in Toblach",

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
      "Die 2. Ausgabe des Backyard Ultra Rennens in den Dolomiten. Am 15. Mai 2027 in Toblach.",
    "hero.cta_signup": "Jetzt anmelden",
    "hero.cta_more": "Mehr erfahren",
    "hero.subtext":
      "Nacht. Erschöpfung. Euphorie. Und dann noch eine Runde.",

    "emotion.quote":
      "Der letzte Läufer, der noch eine Runde schafft, gewinnt.",
    "emotion.attribution": "— Backyard Ultra Regel Nr. 1",

    "athletes.eyebrow": "Athleten",
    "athletes.col1.overlay": "Stunde 18",
    "athletes.col2.overlay": "101 Athleten. Ein Ziel.",
    "athletes.col3.overlay": "Noch eine Runde.",
    "athletes.tagline":
      "Backyard Ultra – wo Grenzen neu definiert werden.",

    "story.eyebrow": "Das Format",
    "story.title": "Was ist Backyard Ultra?",
    "story.fact1": "6,71 km",
    "story.fact2": "jede Stunde",
    "story.fact3": "bis einer übrig bleibt",
    "story.text":
      "Ein Loop. Jede volle Stunde. Wer pünktlich zurück ist, läuft weiter. Wer es nicht schafft, ist raus.",

    "fullbleed.credit": "© Harald Wisthaler",

    "testimonials.eyebrow": "Stimmen",
    "testimonials.title": "Aus der Nacht von 2026",

    "film.eyebrow": "Race Film",
    "film.tagline": "Der Film zur Première 2026 – coming soon",
    "film.play": "Film abspielen",

    "ui.scroll_top": "Nach oben",

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
    "home.features.limit.title": "200 Startplätze",
    "home.features.limit.text":
      "Maximal 200 Startplätze. Persönliche, familiäre Atmosphäre statt Massenstart.",

    "home.newsletter.title": "Bleib auf dem Laufenden",
    "home.newsletter.text":
      "Erhalte als Erster Updates zur Ausgabe am 15. Mai 2027.",
    "home.newsletter.name": "Dein Name",
    "home.newsletter.placeholder": "Deine Email-Adresse",
    "home.newsletter.submit": "Eintragen",
    "home.newsletter.success": "Danke! Du bist auf der Liste.",
    "home.newsletter.error": "Etwas ist schiefgelaufen. Bitte erneut versuchen.",

    "countdown.title": "Countdown bis zum Start",
    "countdown.days": "Tage",
    "countdown.hours": "Stunden",
    "countdown.minutes": "Minuten",
    "countdown.seconds": "Sekunden",
    "countdown.over": "Event beendet",

    "home.archive.title": "2026 – Rückblick",
    "home.archive.first_edition": "Bilder und Zahlen einer langen Nacht.",
    "home.archive.link": "Ergebnisse 2026",
    "home.archive.gallery": "Zur Galerie",
    "home.archive.stat.starters": "Starter",
    "home.archive.stat.loop": "km / Loop",
    "home.archive.stat.hours": "Stunden",

    "race.eyebrow": "Das Event",
    "race.subtitle": "6,71 km · Nordic Arena Toblach · Jede Stunde",
    "race.highlight.start.title": "Start",
    "race.highlight.start.text": "Nordic Arena Toblach – jede volle Stunde.",
    "race.highlight.top.title": "Höchster Punkt",
    "race.highlight.top.text": "Mitte des Loops am Toblacher See.",
    "race.highlight.finish.title": "Ziel",
    "race.highlight.finish.text": "Leicht bergab zurück zur Nordic Arena.",
    "race.title": "Race Info",
    "race.what.title": "Was ist ein Backyard Ultra?",
    "race.what.text":
      "Ein Backyard Ultra ist ein Ausdauerrennen ohne fixe Distanz: Jede volle Stunde startet ein Loop von 6,71 km. Wer die Runde rechtzeitig beendet, geht zur nächsten Stunde wieder an den Start. Wer nicht rechtzeitig zurück ist, scheidet aus. Es gibt nur einen Sieger: den letzten Läufer, der noch eine Runde komplett mehr schafft als alle anderen.",
    "race.course.title": "Strecke",
    "race.course.text":
      "6,71 km ab der Nordic Arena Toblach in Richtung Toblacher See; abwechslungsreiche Strecke mit anfänglich leichter Steigung bis zum höchsten Punkt in der Streckenmitte, anschließend angenehmes Gefälle zurück zum Ausgangspunkt; Wechsel zwischen Asphalt- und Schotterwegen; breite, gut markierte und durchgehend gut begehbare Route.",
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
      "Wir appellieren an die Vernunft der Teilnehmer: Verzichte auf Schmerzmittel und andere leistungsbeeinflussende Substanzen – sie bergen bei einem Backyard Ultra ein erhöhtes Risiko für deine eigene Gesundheit.",
    "race.rules.12":
      "Auf der Strecke sind weder Crew-Mitglieder noch andere Personen erlaubt. Es ist strengstens untersagt, mit den Athleten mitzulaufen.",
    "race.rules.note":
      "Das vollständige Reglement wird spätestens zwei Monate vor dem Renntag veröffentlicht – für den 15. Mai 2027 also bis spätestens 15. März 2027.",

    "signup.eyebrow": "2027",
    "signup.hero_title": "Anmeldung 2027",
    "signup.hero_subtitle": "Nur 200 Startplätze · 15. Mai 2027",
    "signup.badge.location": "Toblach, Südtirol",
    "signup.badge.date": "15. Mai 2027",
    "signup.badge.slots": "200 Plätze",
    "signup.side.fact1": "Eine Runde · 6,71 km · jede volle Stunde",
    "signup.side.fact2": "Start & Ziel an der Nordic Arena",
    "signup.side.fact3": "Mindestalter 18 Jahre, sportärztliches Attest Pflicht",
    "signup.side.slots_left": "200 Startplätze insgesamt",
    "signup.title": "Anmeldung",
    "signup.step": "Schritt",
    "signup.step1.title": "Persönliche Daten",
    "signup.step2.title": "Ticket & Zahlung",
    "signup.step3.title": "Sportärztliches Attest",
    "signup.field.firstname": "Vorname",
    "signup.field.lastname": "Nachname",
    "signup.field.email": "Email",
    "signup.field.birthdate": "Geburtsdatum",
    "signup.field.nationality": "Nationalität",
    "signup.field.emergency_name": "Notfallkontakt – Name",
    "signup.field.emergency_phone": "Notfallkontakt – Telefon",
    "signup.field.required": "Pflichtfeld",
    "signup.field.optional": "(optional)",
    "signup.field.invalid_email": "Bitte gültige Email-Adresse angeben.",
    "signup.field.age_error": "Du musst am Renntag mindestens 18 Jahre alt sein.",
    "signup.continue": "Weiter",
    "signup.back": "Zurück",
    "signup.ticket.earlybird": "Early Bird",
    "signup.ticket.standard": "Standard",
    "signup.ticket.late": "Spätanmeldung",
    "signup.ticket.included":
      "Inkludiert: Startplatz, Startnummer, Teamzone, Verpflegung, Finisher-Geschenk.",
    "signup.ticket.checkout": "Zur Zahlung",
    "signup.attest.title": "Sportärztliches Attest hochladen",
    "signup.attest.hint":
      "PDF, max. 5 MB. Das Attest muss sportärztlich sein, also von einem Arzt mit sportmedizinischer Qualifikation ausgestellt – ein hausärztliches Attest wird nicht akzeptiert. Du kannst es jetzt hochladen oder später nachreichen – spätestens bis 8. Mai 2027 (eine Woche vor dem Rennen). Es muss am Renntag noch gültig sein.",
    "signup.attest.upload": "Datei auswählen",
    "signup.attest.skip": "Später nachreichen",
    "signup.attest.success": "Attest erfolgreich hochgeladen.",
    "signup.attest.confirming": "Zahlung wird bestätigt – einen Moment…",
    "signup.attest.emailFallback":
      "Bitte nutze den Link aus deiner Bestätigungs-Email, um dein Attest hochzuladen.",
    "signup.attest.uploadedTitle": "Attest erfolgreich hochgeladen",
    "signup.attest.replace": "Datei ersetzen",
    // Schritt-unabhängiger Fußhinweis unter dem Anmeldeformular. Die Attestpflicht
    // gilt bewusst für ALLE Teilnehmer — auch für nicht in Italien wohnhafte, für die
    // sie nach FIDAL formal nicht griffe. Statt einer Ausnahmeregelung im Rechtstext
    // gibt es diesen Kontaktweg. Die Adresse steht NICHT im String, sondern als
    // mailto-Link im Markup (wie Footer.astro / kontakt.astro) — der Satz endet daher
    // bewusst ohne Punkt vor der Adresse.
    "signup.attest.foreign":
      "Du wohnst nicht in Italien oder hast keine italienische Staatsbürgerschaft und hast Fragen zum sportärztlichen Attest? Melde dich bei uns unter",
    "signup.full.title": "Startplätze ausgebucht",
    "signup.full.text":
      "Aktuell sind alle Startplätze vergeben. Trage dich auf die Warteliste ein.",
    "signup.full.cta": "Auf Warteliste setzen",

    "startlist.title": "Startliste",
    "startlist.counter": "{filled} Anmeldungen bestätigt",
    "startlist.search": "Name suchen…",
    "startlist.col.number": "Nr.",
    "startlist.col.name": "Name",
    "startlist.col.nation": "Nation",
    "startlist.col.status": "Status",
    "startlist.status.confirmed": "Bestätigt",
    "startlist.status.waitlist": "Warteliste",
    "startlist.status.pending": "Ausstehend",
    "startlist.empty": "Noch keine Teilnehmer registriert.",

    "results.eyebrow": "Archiv",
    "results.subtitle": "2026 · Première · Toblach",
    "results.stat.starters": "Starter",
    "results.stat.hours": "Stunden",
    "results.stat.loop": "km / Loop",
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
    "results2026.note":
      "Backyard Ultra: Nur wer als Letzter eine Runde allein beendet, gewinnt – alle anderen werden mit DNF gewertet. Die Première 2026 endete nach 38 Runden (254,83 km) ohne offiziellen Finisher.",
    "results2026.search.label": "Nach Name suchen",
    "results2026.search.placeholder": "Name eingeben …",
    "results2026.filter.label": "Kategorie",
    "results2026.filter.all": "Alle",
    "results2026.filter.m": "Männer",
    "results2026.filter.w": "Frauen",
    "results2026.col.bib": "Startnr.",
    "results2026.col.cat": "Kat.",
    "results2026.col.km": "Distanz (km)",
    "results2026.col.status": "Status",
    "results2026.label.first_man": "1. Mann",
    "results2026.label.first_woman": "1. Frau",
    "results2026.empty": "Keine Treffer für diese Suche.",

    "gallery.title": "Galerie",
    "gallery.subtitle": "2026 · 101 Starter",
    "gallery.intro":
      "Bilder aus Toblach – Tag und Nacht in den Dolomiten.",
    "gallery.section.day": "Tag",
    "gallery.section.night": "Nacht",
    // Sammel-Credit im Seitenkopf. Pro Kachel/Lightbox greift der
    // fotografenspezifische Credit unten (aus dem Dateinamen abgeleitet).
    "gallery.credit":
      "Fotos: © Harald Wisthaler – www.wisthaler.com · © Gregor Sieder",
    "gallery.credit.wisthaler": "© Harald Wisthaler – www.wisthaler.com",
    "gallery.credit.sieder": "© Gregor Sieder",
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

    "faq.eyebrow": "Häufige Fragen",
    "faq.subtitle": "Alle Antworten auf deine Fragen.",
    "faq.title": "FAQ",
    "faq.participants": "Für Teilnehmer",
    "faq.crew": "Für Betreuer",

    "contact.eyebrow": "Hallo",
    "contact.subtitle": "Schreib uns – wir freuen uns auf deine Nachricht.",
    "contact.info.title": "Info",
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

    "footer.imprint": "Impressum",
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

    "signup.field.phone": "Telefon",
    "signup.field.taxcode": "Steuernummer (Codice Fiscale)",
    "signup.field.taxcode_warn":
      "Das sieht nicht wie eine italienische Steuernummer aus – falls du keine hast, kannst du trotzdem fortfahren.",
    "signup.field.street": "Straße und Hausnummer",
    "signup.field.postal": "PLZ",
    "signup.field.city": "Ort",
    "signup.field.country": "Land",
    "signup.country.it": "Italien",
    "signup.country.de": "Deutschland",
    "signup.country.at": "Österreich",
    "signup.country.ch": "Schweiz",
    "signup.country.other": "Anderes Land",
    "signup.nationality.placeholder": "Bitte wählen",
    "signup.nationality.it": "Italienisch",
    "signup.nationality.de": "Deutsch",
    "signup.nationality.at": "Österreichisch",
    "signup.nationality.ch": "Schweizerisch",
    "signup.nationality.other": "Andere",
    "signup.field.taxcode_required_it":
      "Für italienische Staatsangehörige ist der Codice Fiscale Pflicht.",
    "signup.field.taxcode_invalid":
      "Bitte einen gültigen Codice Fiscale angeben (16 Zeichen, z.B. RSSMRA85T10A562S).",
    "signup.field.nationality_required": "Bitte eine Nationalität auswählen.",
    // Fehlermeldungen von validateStep1() — das Client-Script kann t() nicht
    // aufrufen und bekommt sie über data-Attribute am <form> gereicht.
    "signup.error.required_fields": "Bitte alle Pflichtfelder ausfüllen.",
    "signup.error.invalid_email": "Bitte gültige Email-Adresse angeben.",
    "signup.error.invalid_phone": "Bitte eine gültige Telefonnummer angeben.",
    "signup.error.min_age": "Du musst am Renntag mindestens 18 Jahre alt sein.",
    "signup.error.consents": "Bitte beiden Einwilligungen zustimmen.",
    // Meldungen außerhalb von validateStep1() — Step-2-Checkout und Attest-Upload.
    // Gehen über dieselbe data-Attribut-Brücke, weil das Script im Browser läuft.
    "signup.error.checkout_failed": "Vorgang konnte nicht gestartet werden.",
    "signup.error.network": "Netzwerkfehler. Bitte erneut versuchen.",
    "signup.error.form_missing": "Formular konnte nicht gelesen werden. Bitte die Seite neu laden.",
    "signup.error.attest_incomplete":
      "Bitte den Link aus der Bestätigungs-Email verwenden und eine PDF-Datei auswählen.",
    "signup.error.attest_too_large": "Datei ist zu groß (max 5 MB).",
    "signup.error.attest_failed": "Upload fehlgeschlagen.",
    "signup.consent.privacy":
      "Ich akzeptiere die <a href=\"{href}\">Datenschutzerklärung</a> (es werden auch Gesundheitsdaten aus dem sportärztlichen Attest verarbeitet).",
    "signup.consent.liability":
      "Ich akzeptiere die <a href=\"{href}\">Haftungsfreistellung / den Haftungsausschluss</a>.",
    "signup.notice.image":
      "<strong>Hinweis (keine Einwilligung):</strong> Während des Events entstehen Foto- und Videoaufnahmen, die wir zur Dokumentation und Berichterstattung veröffentlichen – auf dieser Website, auf Social Media und in der Presse. Du musst dem nicht zustimmen; du kannst der Veröffentlichung aber jederzeit widersprechen. Wie das geht, steht unter <a href=\"{href}\">Bildrechte in der Datenschutzerklärung</a>.",
    "signup.price.note":
      "Preisstufen: 75 € bis 31.12.2026, 80 € bis 31.03.2027, 100 € bis 30.04.2027 (Anmeldeschluss).",
    "signup.paid.notice": "Zahlung erfolgreich. Bitte lade jetzt dein sportärztliches Attest hoch.",
    "signup.cancelled.notice": "Zahlung abgebrochen. Du kannst es jederzeit erneut versuchen.",
    "signup.waitlist.text":
      "Die Startplätze sind aktuell vergeben. Trag dich unverbindlich auf die Warteliste ein – es wird kein Startgeld fällig. Wird ein Platz frei, melden wir uns.",
    "signup.waitlist.success":
      "Du stehst auf der Warteliste. Wir melden uns, sobald ein Platz frei wird.",
    "signup.soon.title": "Die Anmeldung öffnet am {date}",
    "signup.soon.text":
      "Trag dich in den Newsletter ein, um nichts zu verpassen.",
    "signup.closed.title": "Die Anmeldung für 2027 ist geschlossen",
    "signup.closed.text":
      "Der Anmeldeschluss war der {date}. Bereits angemeldete Teilnehmer können ihr sportärztliches Attest weiterhin über den Link aus der Bestätigungs-Email hochladen.",
    "signup.soldout.title": "Startplätze ausgebucht",
    "signup.soldout.text":
      "Alle Startplätze sind vergeben und die Warteliste ist geschlossen. Bereits angemeldete Teilnehmer können ihr sportärztliches Attest weiterhin über den Link aus der Bestätigungs-Email hochladen.",
    "footer.liability": "Haftungsausschluss",
  },

  it: {
    "site.title": "Dolomites Last Loop",
    "site.tagline": "Backyard Ultra • Dobbiaco • Dolomiti",
    "site.description":
      "La 2ª edizione della gara Backyard Ultra nelle Dolomiti – Dobbiaco, 15 maggio 2027.",
    "site.event_date": "15 maggio 2027",

    "meta.race_info":
      "Backyard Ultra a Dobbiaco: loop di 6,71 km ogni ora secondo il principio Last One Standing. Percorso, regole e cut-off della Dolomites Last Loop 2027.",
    "meta.signup":
      "Iscriviti ora alla Dolomites Last Loop 2027 a Dobbiaco: quota early-bird, scadenze e soli 200 posti. Assicurati il tuo posto di partenza.",
    "meta.startlist":
      "Lista partenti della Dolomites Last Loop 2027 e risultati 2026: tutti i partecipanti confermati della Backyard Ultra a Dobbiaco.",
    "alt.logo": "Dolomites Last Loop",
    "alt.course_photo": "Corridore sul percorso di 6,71 km della Dolomites Last Loop a Dobbiaco",
    "alt.signup_portrait": "Atleta della Backyard Ultra esausto dopo diversi giri di notte",
    "alt.signup_side": "Atleta sorridente alla Dolomites Last Loop a Dobbiaco",
    "alt.athletes_night": "Corridore della Backyard Ultra di notte tra due giri a Dobbiaco",
    "alt.athletes_start": "Gruppo di corridori alla partenza della Dolomites Last Loop nelle Dolomiti",
    "alt.athletes_portrait": "Ritratto di un atleta concentrato della Backyard Ultra alla Dolomites Last Loop",
    "alt.story_course": "Corridore sul giro tra i paesaggi delle Dolomiti durante la Dolomites Last Loop",
    "alt.fullbleed_day": "Corridrice sul percorso della Dolomites Last Loop alla luce del giorno a Dobbiaco",

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
      "La 2ª edizione della gara Backyard Ultra nelle Dolomiti. Il 15 maggio 2027 a Dobbiaco.",
    "hero.cta_signup": "Iscriviti ora",
    "hero.cta_more": "Scopri di più",
    "hero.subtext":
      "Notte. Stanchezza. Euforia. E poi un altro giro.",

    "emotion.quote":
      "Vince l’ultimo atleta che riesce a completare un giro.",
    "emotion.attribution": "— Regola n.1 della Backyard Ultra",

    "athletes.eyebrow": "Atleti",
    "athletes.col1.overlay": "Ora 18",
    "athletes.col2.overlay": "101 atleti. Un obiettivo.",
    "athletes.col3.overlay": "Un altro giro.",
    "athletes.tagline":
      "Backyard Ultra – dove i limiti vengono ridefiniti.",

    "story.eyebrow": "Il formato",
    "story.title": "Cos’è la Backyard Ultra?",
    "story.fact1": "6,71 km",
    "story.fact2": "ogni ora",
    "story.fact3": "finché ne resta uno",
    "story.text":
      "Un loop. Ogni ora esatta. Chi rientra in tempo riparte. Chi non ce la fa è fuori.",

    "fullbleed.credit": "© Harald Wisthaler",

    "testimonials.eyebrow": "Voci",
    "testimonials.title": "Dalla notte del 2026",

    "film.eyebrow": "Race Film",
    "film.tagline": "Il film della Première 2026 – coming soon",
    "film.play": "Riproduci il film",

    "ui.scroll_top": "Torna su",

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
    "home.features.limit.title": "200 posti",
    "home.features.limit.text":
      "Massimo 200 posti di partenza. Atmosfera personale e familiare, non una corsa di massa.",

    "home.newsletter.title": "Resta aggiornato",
    "home.newsletter.text":
      "Ricevi per primo gli aggiornamenti sull’edizione del 15 maggio 2027.",
    "home.newsletter.name": "Il tuo nome",
    "home.newsletter.placeholder": "La tua email",
    "home.newsletter.submit": "Iscriviti",
    "home.newsletter.success": "Grazie! Sei nella lista.",
    "home.newsletter.error": "Qualcosa è andato storto. Riprova.",

    "countdown.title": "Conto alla rovescia",
    "countdown.days": "Giorni",
    "countdown.hours": "Ore",
    "countdown.minutes": "Minuti",
    "countdown.seconds": "Secondi",
    "countdown.over": "Evento concluso",

    "home.archive.title": "2026 – Sguardo indietro",
    "home.archive.first_edition": "Immagini e numeri di una lunga notte.",
    "home.archive.link": "Risultati 2026",
    "home.archive.gallery": "Vai alla galleria",
    "home.archive.stat.starters": "Partenti",
    "home.archive.stat.loop": "km / Loop",
    "home.archive.stat.hours": "Ore",

    "race.eyebrow": "L’evento",
    "race.subtitle": "6,71 km · Nordic Arena Dobbiaco · Ogni ora",
    "race.highlight.start.title": "Partenza",
    "race.highlight.start.text": "Nordic Arena Dobbiaco – ogni ora esatta.",
    "race.highlight.top.title": "Punto più alto",
    "race.highlight.top.text": "Metà loop verso il Lago di Dobbiaco.",
    "race.highlight.finish.title": "Arrivo",
    "race.highlight.finish.text": "Ritorno alla Nordic Arena in leggera discesa.",
    "race.title": "Info gara",
    "race.what.title": "Cos’è una Backyard Ultra?",
    "race.what.text":
      "Una Backyard Ultra è una gara di resistenza senza distanza fissa: ogni ora esatta parte un loop di 6,71 km. Chi completa il giro in tempo riparte all’ora successiva. Chi non torna in tempo è fuori. Vince un solo atleta: l’ultimo che riesce a portare a termine un giro in più di tutti gli altri.",
    "race.course.title": "Percorso",
    "race.course.text":
      "6,71 km dalla Nordic Arena di Dobbiaco in direzione del Lago di Dobbiaco; percorso vario, con una leggera salita iniziale fino al punto più alto a metà giro e una piacevole discesa che riporta al punto di partenza; alternanza di tratti in asfalto e sterrato; percorso ampio, ben segnalato e sempre facilmente percorribile.",
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
      "Facciamo appello al buon senso dei partecipanti: rinuncia agli antidolorifici e ad altre sostanze che influenzano la prestazione – in una Backyard Ultra comportano un rischio maggiore per la tua salute.",
    "race.rules.12":
      "Sul percorso non sono ammessi né i membri dell’equipaggio né altre persone. È severamente vietato correre insieme agli atleti.",
    "race.rules.note":
      "Il regolamento completo viene pubblicato al più tardi due mesi prima del giorno di gara – per il 15 maggio 2027 quindi entro il 15 marzo 2027.",

    "signup.eyebrow": "2027",
    "signup.hero_title": "Iscrizione 2027",
    "signup.hero_subtitle": "Solo 200 posti · 15 maggio 2027",
    "signup.badge.location": "Dobbiaco, Alto Adige",
    "signup.badge.date": "15 maggio 2027",
    "signup.badge.slots": "200 posti",
    "signup.side.fact1": "Un loop · 6,71 km · ogni ora esatta",
    "signup.side.fact2": "Partenza e arrivo alla Nordic Arena",
    "signup.side.fact3": "Età minima 18 anni, certificato medico agonistico obbligatorio",
    "signup.side.slots_left": "200 posti di partenza in totale",
    "signup.title": "Iscrizione",
    "signup.step": "Step",
    "signup.step1.title": "Dati personali",
    "signup.step2.title": "Biglietto & pagamento",
    "signup.step3.title": "Certificato medico agonistico",
    "signup.field.firstname": "Nome",
    "signup.field.lastname": "Cognome",
    "signup.field.email": "Email",
    "signup.field.birthdate": "Data di nascita",
    "signup.field.nationality": "Nazionalità",
    "signup.field.emergency_name": "Contatto emergenza – Nome",
    "signup.field.emergency_phone": "Contatto emergenza – Telefono",
    "signup.field.required": "Campo obbligatorio",
    "signup.field.optional": "(facoltativo)",
    "signup.field.invalid_email": "Inserisci un’email valida.",
    "signup.field.age_error":
      "Devi avere almeno 18 anni il giorno della gara.",
    "signup.continue": "Avanti",
    "signup.back": "Indietro",
    "signup.ticket.earlybird": "Early Bird",
    "signup.ticket.standard": "Standard",
    "signup.ticket.late": "Iscrizione tardiva",
    "signup.ticket.included":
      "Incluso: posto di partenza, pettorale, area team, ristoro, gadget finisher.",
    "signup.ticket.checkout": "Vai al pagamento",
    "signup.attest.title": "Carica il certificato medico agonistico",
    "signup.attest.hint":
      "PDF, max 5 MB. Deve trattarsi di un certificato medico agonistico, rilasciato da un medico con qualifica in medicina dello sport – un certificato del medico di base non viene accettato. Puoi caricarlo ora oppure più tardi – al più tardi entro l’8 maggio 2027 (una settimana prima della gara). Deve essere ancora valido il giorno della gara.",
    "signup.attest.upload": "Scegli file",
    "signup.attest.skip": "Carico più tardi",
    "signup.attest.success": "Certificato caricato con successo.",
    "signup.attest.confirming": "Pagamento in fase di conferma – un momento…",
    "signup.attest.emailFallback":
      "Usa il link nella tua email di conferma per caricare il certificato.",
    "signup.attest.uploadedTitle": "Certificato caricato con successo",
    "signup.attest.replace": "Sostituisci file",
    "signup.attest.foreign":
      "Non risiedi in Italia o non hai la cittadinanza italiana e hai domande sul certificato medico agonistico? Scrivici a",
    "signup.full.title": "Posti esauriti",
    "signup.full.text":
      "Tutti i posti sono stati assegnati. Iscriviti alla lista d’attesa.",
    "signup.full.cta": "Vai in lista d’attesa",

    "startlist.title": "Lista partenti",
    "startlist.counter": "{filled} iscrizioni confermate",
    "startlist.search": "Cerca nome…",
    "startlist.col.number": "N°",
    "startlist.col.name": "Nome",
    "startlist.col.nation": "Nazione",
    "startlist.col.status": "Stato",
    "startlist.status.confirmed": "Confermato",
    "startlist.status.waitlist": "Lista d’attesa",
    "startlist.status.pending": "In sospeso",
    "startlist.empty": "Nessun partecipante registrato.",

    "results.eyebrow": "Archivio",
    "results.subtitle": "2026 · Première · Dobbiaco",
    "results.stat.starters": "Partenti",
    "results.stat.hours": "Ore",
    "results.stat.loop": "km / Loop",
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
    "results2026.note":
      "Backyard Ultra: vince solo chi completa da solo l'ultimo giro – tutti gli altri vengono classificati DNF. La première 2026 si è conclusa dopo 38 giri (254,83 km) senza finisher ufficiale.",
    "results2026.search.label": "Cerca per nome",
    "results2026.search.placeholder": "Inserisci un nome …",
    "results2026.filter.label": "Categoria",
    "results2026.filter.all": "Tutti",
    "results2026.filter.m": "Uomini",
    "results2026.filter.w": "Donne",
    "results2026.col.bib": "Pett.",
    "results2026.col.cat": "Cat.",
    "results2026.col.km": "Distanza (km)",
    "results2026.col.status": "Stato",
    "results2026.label.first_man": "1° uomo",
    "results2026.label.first_woman": "1ª donna",
    "results2026.empty": "Nessun risultato per questa ricerca.",

    "gallery.title": "Galleria",
    "gallery.subtitle": "2026 · 101 partenti",
    "gallery.intro":
      "Immagini da Dobbiaco – giorno e notte tra le Dolomiti.",
    "gallery.section.day": "Giorno",
    "gallery.section.night": "Notte",
    "gallery.credit":
      "Foto: © Harald Wisthaler – www.wisthaler.com · © Gregor Sieder",
    "gallery.credit.wisthaler": "© Harald Wisthaler – www.wisthaler.com",
    "gallery.credit.sieder": "© Gregor Sieder",
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

    "faq.eyebrow": "Domande frequenti",
    "faq.subtitle": "Tutte le risposte alle tue domande.",
    "faq.title": "FAQ",
    "faq.participants": "Per i partecipanti",
    "faq.crew": "Per i supporter",

    "contact.eyebrow": "Ciao",
    "contact.subtitle": "Scrivici – ci fa piacere ricevere il tuo messaggio.",
    "contact.info.title": "Info",
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

    "footer.imprint": "Note legali",
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

    "signup.field.phone": "Telefono",
    "signup.field.taxcode": "Codice Fiscale",
    "signup.field.taxcode_warn":
      "Non sembra un codice fiscale italiano – se non ne hai uno, puoi comunque proseguire.",
    "signup.field.street": "Via e numero civico",
    "signup.field.postal": "CAP",
    "signup.field.city": "Città",
    "signup.field.country": "Paese",
    "signup.country.it": "Italia",
    "signup.country.de": "Germania",
    "signup.country.at": "Austria",
    "signup.country.ch": "Svizzera",
    "signup.country.other": "Altro paese",
    "signup.nationality.placeholder": "Seleziona",
    "signup.nationality.it": "Italiana",
    "signup.nationality.de": "Tedesca",
    "signup.nationality.at": "Austriaca",
    "signup.nationality.ch": "Svizzera",
    "signup.nationality.other": "Altra",
    "signup.field.taxcode_required_it":
      "Per i cittadini italiani il codice fiscale è obbligatorio.",
    "signup.field.taxcode_invalid":
      "Inserisci un codice fiscale valido (16 caratteri, es. RSSMRA85T10A562S).",
    "signup.field.nationality_required": "Seleziona una nazionalità.",
    "signup.error.required_fields": "Compila tutti i campi obbligatori.",
    "signup.error.invalid_email": "Inserisci un’email valida.",
    "signup.error.invalid_phone": "Inserisci un numero di telefono valido.",
    "signup.error.min_age": "Devi avere almeno 18 anni il giorno della gara.",
    "signup.error.consents": "Accetta entrambi i consensi.",
    "signup.error.checkout_failed": "Non è stato possibile avviare la procedura.",
    "signup.error.network": "Errore di rete. Riprova.",
    "signup.error.form_missing": "Impossibile leggere il modulo. Ricarica la pagina.",
    "signup.error.attest_incomplete":
      "Usa il link ricevuto nell’email di conferma e seleziona un file PDF.",
    "signup.error.attest_too_large": "Il file è troppo grande (max 5 MB).",
    "signup.error.attest_failed": "Caricamento non riuscito.",
    "signup.consent.privacy":
      "Accetto l’<a href=\"{href}\">informativa sulla privacy</a> (vengono trattati anche dati sanitari del certificato medico agonistico).",
    "signup.consent.liability":
      "Accetto la <a href=\"{href}\">manleva / esclusione di responsabilità</a>.",
    "signup.notice.image":
      "<strong>Nota (non è un consenso):</strong> durante l’evento vengono realizzate foto e riprese video che pubblichiamo per documentare e raccontare la gara – su questo sito, sui social media e sulla stampa. Non devi prestare alcun consenso; puoi però opporti alla pubblicazione in qualsiasi momento. Le modalità sono indicate alla voce <a href=\"{href}\">diritti di immagine nell’informativa sulla privacy</a>.",
    "signup.price.note":
      "Tariffe: 75 € fino al 31/12/2026, 80 € fino al 31/03/2027, 100 € fino al 30/04/2027 (chiusura iscrizioni).",
    "signup.paid.notice": "Pagamento riuscito. Carica ora il tuo certificato medico agonistico.",
    "signup.cancelled.notice": "Pagamento annullato. Puoi riprovare in qualsiasi momento.",
    "signup.waitlist.text":
      "I posti sono al momento esauriti. Iscriviti senza impegno alla lista d’attesa – nessuna quota dovuta. Se si libera un posto, ti contatteremo.",
    "signup.waitlist.success":
      "Sei in lista d’attesa. Ti contatteremo appena si libera un posto.",
    "signup.soon.title": "Le iscrizioni aprono il {date}",
    "signup.soon.text":
      "Iscriviti alla newsletter per non perderti nulla.",
    "signup.closed.title": "Le iscrizioni per il 2027 sono chiuse",
    "signup.closed.text":
      "Il termine per l’iscrizione era il {date}. Chi è già iscritto può continuare a caricare il certificato medico agonistico tramite il link ricevuto nell’email di conferma.",
    "signup.soldout.title": "Posti esauriti",
    "signup.soldout.text":
      "Tutti i posti sono stati assegnati e la lista d’attesa è chiusa. Chi è già iscritto può continuare a caricare il certificato medico agonistico tramite il link ricevuto nell’email di conferma.",
    "footer.liability": "Esclusione di responsabilità",
  },

  en: {
    "site.title": "Dolomites Last Loop",
    "site.tagline": "Backyard Ultra • Toblach/Dobbiaco • Dolomites",
    "site.description":
      "The 2nd edition of the Backyard Ultra race in the Dolomites – Toblach, May 15, 2027.",
    "site.event_date": "May 15, 2027",

    "meta.race_info":
      "Backyard Ultra in Toblach: a 6.71 km loop every hour on the Last One Standing format. Course, rules and cut-off for the Dolomites Last Loop 2027.",
    "meta.signup":
      "Sign up now for the Dolomites Last Loop 2027 in Toblach: early-bird fee, registration deadline and only 200 start spots. Secure your place.",
    "meta.startlist":
      "Start list for the Dolomites Last Loop 2027 and 2026 results: all confirmed runners of the Backyard Ultra in Toblach at a glance.",
    "alt.logo": "Dolomites Last Loop",
    "alt.course_photo": "Runner on the 6.71 km Dolomites Last Loop course near Toblach",
    "alt.signup_portrait": "Exhausted backyard ultra runner after several loops at night",
    "alt.signup_side": "Smiling runner at the Dolomites Last Loop in Toblach",
    "alt.athletes_night": "Backyard ultra runner at night between two loops in Toblach",
    "alt.athletes_start": "Group of runners at the start of the Dolomites Last Loop in the Dolomites",
    "alt.athletes_portrait": "Portrait of a focused backyard ultra athlete at the Dolomites Last Loop",
    "alt.story_course": "Runner on the loop through the Dolomites landscape during the Dolomites Last Loop",
    "alt.fullbleed_day": "Runner on the Dolomites Last Loop course in daylight in Toblach",

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
      "The 2nd edition of the Backyard Ultra race in the Dolomites. May 15, 2027 in Toblach.",
    "hero.cta_signup": "Sign up now",
    "hero.cta_more": "Learn more",
    "hero.subtext":
      "Night. Exhaustion. Euphoria. And then one more loop.",

    "emotion.quote":
      "The last runner to complete one more loop wins.",
    "emotion.attribution": "— Backyard Ultra Rule No. 1",

    "athletes.eyebrow": "Athletes",
    "athletes.col1.overlay": "Hour 18",
    "athletes.col2.overlay": "101 athletes. One goal.",
    "athletes.col3.overlay": "One more loop.",
    "athletes.tagline":
      "Backyard Ultra – where limits are redefined.",

    "story.eyebrow": "The format",
    "story.title": "What is Backyard Ultra?",
    "story.fact1": "6.71 km",
    "story.fact2": "every hour",
    "story.fact3": "until one is left",
    "story.text":
      "One loop. Every hour on the hour. Back in time, you run again. Miss it, you’re out.",

    "fullbleed.credit": "© Harald Wisthaler",

    "testimonials.eyebrow": "Voices",
    "testimonials.title": "From the night of 2026",

    "film.eyebrow": "Race Film",
    "film.tagline": "The film of the 2026 Première – coming soon",
    "film.play": "Play film",

    "ui.scroll_top": "Back to top",

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
    "home.features.limit.title": "200 spots",
    "home.features.limit.text":
      "A maximum of 200 starting spots. Personal, family-style vibe instead of a mass start.",

    "home.newsletter.title": "Stay in the loop",
    "home.newsletter.text":
      "Be the first to receive updates about the May 15, 2027 edition.",
    "home.newsletter.name": "Your name",
    "home.newsletter.placeholder": "Your email",
    "home.newsletter.submit": "Subscribe",
    "home.newsletter.success": "Thanks! You’re on the list.",
    "home.newsletter.error": "Something went wrong. Please try again.",

    "countdown.title": "Countdown to the start",
    "countdown.days": "Days",
    "countdown.hours": "Hours",
    "countdown.minutes": "Minutes",
    "countdown.seconds": "Seconds",
    "countdown.over": "Event finished",

    "home.archive.title": "2026 – Looking back",
    "home.archive.first_edition": "Photos and numbers from one long night.",
    "home.archive.link": "Results 2026",
    "home.archive.gallery": "Open gallery",
    "home.archive.stat.starters": "Starters",
    "home.archive.stat.loop": "km / Loop",
    "home.archive.stat.hours": "Hours",

    "race.eyebrow": "The event",
    "race.subtitle": "6.71 km · Nordic Arena Toblach · Every hour",
    "race.highlight.start.title": "Start",
    "race.highlight.start.text": "Nordic Arena Toblach – every hour on the hour.",
    "race.highlight.top.title": "Highest point",
    "race.highlight.top.text": "Mid-loop near Lake Toblach.",
    "race.highlight.finish.title": "Finish",
    "race.highlight.finish.text": "A gentle downhill back to the Nordic Arena.",
    "race.title": "Race info",
    "race.what.title": "What is a Backyard Ultra?",
    "race.what.text":
      "A Backyard Ultra is an endurance race with no fixed distance: every hour on the hour a 6.71 km loop starts. Finish the loop in time, you start again the next hour. Miss the cutoff, you’re out. There’s only one winner: the last runner to complete one more loop than everyone else.",
    "race.course.title": "Course",
    "race.course.text":
      "6.71 km from the Nordic Arena in Toblach toward Lake Toblach; a varied course with a gentle climb at the start up to the highest point at mid-loop, followed by an easy descent back to the start; alternating asphalt and gravel sections; a wide, well-marked route that is easy to run throughout.",
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
      "We appeal to every runner’s common sense: avoid painkillers and other performance-altering substances – in a Backyard Ultra they carry an increased risk to your own health.",
    "race.rules.12":
      "No crew members or other persons are allowed on the course. Running alongside athletes is strictly prohibited.",
    "race.rules.note":
      "The full rulebook is published no later than two months before race day – for May 15, 2027 that means by March 15, 2027.",

    "signup.eyebrow": "2027",
    "signup.hero_title": "Sign up 2027",
    "signup.hero_subtitle": "Only 200 spots · May 15, 2027",
    "signup.badge.location": "Toblach, South Tyrol",
    "signup.badge.date": "May 15, 2027",
    "signup.badge.slots": "200 spots",
    "signup.side.fact1": "One loop · 6.71 km · every hour on the hour",
    "signup.side.fact2": "Start and finish at the Nordic Arena",
    "signup.side.fact3": "Minimum age 18, sports-medical certificate required",
    "signup.side.slots_left": "200 starting spots in total",
    "signup.title": "Sign up",
    "signup.step": "Step",
    "signup.step1.title": "Personal data",
    "signup.step2.title": "Ticket & payment",
    "signup.step3.title": "Sports-medical certificate",
    "signup.field.firstname": "First name",
    "signup.field.lastname": "Last name",
    "signup.field.email": "Email",
    "signup.field.birthdate": "Date of birth",
    "signup.field.nationality": "Nationality",
    "signup.field.emergency_name": "Emergency contact – Name",
    "signup.field.emergency_phone": "Emergency contact – Phone",
    "signup.field.required": "Required field",
    "signup.field.optional": "(optional)",
    "signup.field.invalid_email": "Please enter a valid email.",
    "signup.field.age_error": "You must be 18 or older on race day.",
    "signup.continue": "Continue",
    "signup.back": "Back",
    "signup.ticket.earlybird": "Early Bird",
    "signup.ticket.standard": "Standard",
    "signup.ticket.late": "Late registration",
    "signup.ticket.included":
      "Included: starting spot, bib, team zone, aid, finisher gift.",
    "signup.ticket.checkout": "Go to checkout",
    "signup.attest.title": "Upload sports-medical certificate",
    "signup.attest.hint":
      "PDF, max 5 MB. It must be a sports-medical certificate issued by a doctor with a sports-medicine qualification — a certificate from a family doctor will not be accepted. You can upload it now or later — by 8 May 2027 at the latest (one week before the race). It must still be valid on race day.",
    "signup.attest.upload": "Choose file",
    "signup.attest.skip": "Upload later",
    "signup.attest.success": "Certificate uploaded successfully.",
    "signup.attest.confirming": "Confirming your payment – one moment…",
    "signup.attest.emailFallback":
      "Please use the link in your confirmation email to upload your certificate.",
    "signup.attest.uploadedTitle": "Certificate uploaded successfully",
    "signup.attest.replace": "Replace file",
    "signup.attest.foreign":
      "Not resident in Italy or not an Italian citizen, and you have questions about the sports-medical certificate? Get in touch at",
    "signup.full.title": "Race is full",
    "signup.full.text":
      "All spots are taken. Join the waiting list to be notified.",
    "signup.full.cta": "Join the waitlist",

    "startlist.title": "Start list",
    "startlist.counter": "{filled} confirmed entries",
    "startlist.search": "Search name…",
    "startlist.col.number": "No.",
    "startlist.col.name": "Name",
    "startlist.col.nation": "Nation",
    "startlist.col.status": "Status",
    "startlist.status.confirmed": "Confirmed",
    "startlist.status.waitlist": "Waitlist",
    "startlist.status.pending": "Pending",
    "startlist.empty": "No registered runners yet.",

    "results.eyebrow": "Archive",
    "results.subtitle": "2026 · Première · Toblach",
    "results.stat.starters": "Starters",
    "results.stat.hours": "Hours",
    "results.stat.loop": "km / Loop",
    "results.title": "Results",
    "results.intro": "Archive of past editions.",
    "results.year.2026": "2026 – 101 starters",
    "results.col.place": "Pos.",
    "results.col.name": "Name",
    "results.col.nation": "Nation",
    "results.col.loops": "Loops",
    "results2026.note":
      "Backyard Ultra: only the runner who completes the final loop alone wins – everyone else is scored DNF. The 2026 première ended after 38 loops (254.83 km) with no official finisher.",
    "results2026.search.label": "Search by name",
    "results2026.search.placeholder": "Type a name …",
    "results2026.filter.label": "Category",
    "results2026.filter.all": "All",
    "results2026.filter.m": "Men",
    "results2026.filter.w": "Women",
    "results2026.col.bib": "Bib",
    "results2026.col.cat": "Cat.",
    "results2026.col.km": "Distance (km)",
    "results2026.col.status": "Status",
    "results2026.label.first_man": "1st Man",
    "results2026.label.first_woman": "1st Woman",
    "results2026.empty": "No results for this search.",
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
    "gallery.credit":
      "Photos: © Harald Wisthaler – www.wisthaler.com · © Gregor Sieder",
    "gallery.credit.wisthaler": "© Harald Wisthaler – www.wisthaler.com",
    "gallery.credit.sieder": "© Gregor Sieder",
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

    "faq.eyebrow": "Frequent questions",
    "faq.subtitle": "All the answers to your questions.",
    "faq.title": "FAQ",
    "faq.participants": "For runners",
    "faq.crew": "For crew",

    "contact.eyebrow": "Hello",
    "contact.subtitle": "Drop us a line – we’d love to hear from you.",
    "contact.info.title": "Info",
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

    "footer.imprint": "Imprint",
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

    "signup.field.phone": "Phone",
    "signup.field.taxcode": "Tax code (Codice Fiscale)",
    "signup.field.taxcode_warn":
      "This doesn’t look like an Italian tax code – if you don’t have one, you can still continue.",
    "signup.field.street": "Street and house number",
    "signup.field.postal": "Postal code",
    "signup.field.city": "City",
    "signup.field.country": "Country",
    "signup.country.it": "Italy",
    "signup.country.de": "Germany",
    "signup.country.at": "Austria",
    "signup.country.ch": "Switzerland",
    "signup.country.other": "Other country",
    "signup.nationality.placeholder": "Please select",
    "signup.nationality.it": "Italian",
    "signup.nationality.de": "German",
    "signup.nationality.at": "Austrian",
    "signup.nationality.ch": "Swiss",
    "signup.nationality.other": "Other",
    "signup.field.taxcode_required_it":
      "The Italian tax code is mandatory for Italian citizens.",
    "signup.field.taxcode_invalid":
      "Please enter a valid Italian tax code (16 characters, e.g. RSSMRA85T10A562S).",
    "signup.field.nationality_required": "Please select a nationality.",
    "signup.error.required_fields": "Please fill in all required fields.",
    "signup.error.invalid_email": "Please enter a valid email address.",
    "signup.error.invalid_phone": "Please enter a valid phone number.",
    "signup.error.min_age": "You must be 18 or older on race day.",
    "signup.error.consents": "Please accept both consents.",
    "signup.error.checkout_failed": "The process could not be started.",
    "signup.error.network": "Network error. Please try again.",
    "signup.error.form_missing": "The form could not be read. Please reload the page.",
    "signup.error.attest_incomplete":
      "Please use the link from your confirmation email and select a PDF file.",
    "signup.error.attest_too_large": "File is too large (max 5 MB).",
    "signup.error.attest_failed": "Upload failed.",
    "signup.consent.privacy":
      "I accept the <a href=\"{href}\">privacy policy</a> (health data from the sports-medical certificate is also processed).",
    "signup.consent.liability":
      "I accept the <a href=\"{href}\">liability waiver / disclaimer</a>.",
    "signup.notice.image":
      "<strong>Note (not a consent):</strong> photos and videos are taken during the event and published to document and report on the race – on this website, on social media and in the press. You do not need to agree to this; you can, however, object to publication at any time. The <a href=\"{href}\">image rights section of the privacy policy</a> explains how.",
    "signup.price.note":
      "Price tiers: €75 until 31 Dec 2026, €80 until 31 Mar 2027, €100 until 30 Apr 2027 (registration deadline).",
    "signup.paid.notice": "Payment successful. Please upload your sports-medical certificate now.",
    "signup.cancelled.notice": "Payment cancelled. You can try again any time.",
    "signup.waitlist.text":
      "All start slots are currently taken. Join the waiting list with no obligation – no entry fee is due. If a spot opens up, we’ll get in touch.",
    "signup.waitlist.success":
      "You’re on the waiting list. We’ll be in touch as soon as a spot opens up.",
    "signup.soon.title": "Registration opens on {date}",
    "signup.soon.text":
      "Sign up for the newsletter so you don’t miss anything.",
    "signup.closed.title": "Registration for 2027 is closed",
    "signup.closed.text":
      "The registration deadline was {date}. Participants who have already registered can still upload their sports-medical certificate via the link in their confirmation email.",
    "signup.soldout.title": "Race is full",
    "signup.soldout.text":
      "All start slots are taken and the waiting list is closed. Participants who have already registered can still upload their sports-medical certificate via the link in their confirmation email.",
    "footer.liability": "Disclaimer",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
