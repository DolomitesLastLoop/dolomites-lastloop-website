import type { Lang } from "./ui";
import type { LegalBlock } from "./legal";

// Cookie-Policy (DE/IT/EN), gerendert in src/pages/[lang]/cookie-policy.astro.
// ⚠️ Nur beschreiben, was tatsächlich eingesetzt wird. Neue Cookies/Speicher/Dienste
// → Tabelle hier UND Datenschutzerklärung (legal.ts §6) nachziehen, ggf.
// CONSENT_VERSION in src/lib/consent-config.ts erhöhen.
// `dll_shop` (Shop-Session) fehlt bewusst: der Shop ist abgeschaltet (SHOP_ENABLED),
// das Cookie wird nie gesetzt. Vor einem Shop-Launch hier ergänzen.

export type CookieRow = {
  name: string;
  type: string;
  purpose: string;
  duration: string;
  provider: string;
  category: string;
};

export type CookiePolicySection = {
  id?: string;
  heading: string;
  blocks: LegalBlock[];
  /** Tabelle der eingesetzten Cookies/Speicher an dieser Stelle rendern. */
  table?: boolean;
  /** Button „Cookie-Einstellungen öffnen" an dieser Stelle rendern. */
  settingsButton?: boolean;
};

export type CookiePolicyPage = {
  title: string;
  metaDescription: string;
  updated: string;
  aiNotice: string;
  intro: string;
  tableCaption: string;
  tableHeaders: Record<keyof CookieRow, string>;
  rows: CookieRow[];
  settingsButton: string;
  privacyLink: string;
  sections: CookiePolicySection[];
};

export const cookiePolicy: Record<Lang, CookiePolicyPage> = {
  de: {
    title: "Cookie-Policy",
    metaDescription:
      "Welche Cookies und Speichertechnologien die Website der Dolomites Last Loop einsetzt, wofür sie dienen und wie du deine Einwilligung änderst oder widerrufst.",
    updated: "Stand: 02.10.2026",
    aiNotice: "Dieser Text wurde mit KI-Unterstützung erstellt.",
    intro:
      "Diese Cookie-Policy erklärt, welche Cookies und ähnlichen Technologien (z. B. Speicher im Browser) auf www.dolomiteslastloop.com eingesetzt werden, wofür sie dienen und wie du deine Einwilligung erteilen, ändern oder widerrufen kannst. Sie ergänzt unsere Datenschutzerklärung.",
    tableCaption: "Eingesetzte Cookies und Speichertechnologien",
    tableHeaders: {
      name: "Name",
      type: "Art",
      purpose: "Zweck",
      duration: "Speicherdauer",
      provider: "Anbieter",
      category: "Kategorie",
    },
    rows: [
      {
        name: "dll_consent",
        type: "Cookie (Erstanbieter)",
        purpose:
          "Speichert deine Auswahl im Cookie-Hinweis (Version, Zeitpunkt, gewählte Kategorien). Wird erst gesetzt, wenn du eine Auswahl triffst.",
        duration: "6 Monate",
        provider: "Dolomites Last Loop (diese Website)",
        category: "Notwendig",
      },
      {
        name: "dll_admin",
        type: "Cookie (Erstanbieter)",
        purpose:
          "Anmeldung des Organisationsteams im internen Admin-Bereich. Wird nur nach einem Admin-Login gesetzt, nicht bei Besucherinnen und Besuchern der Website.",
        duration: "8 Stunden",
        provider: "Dolomites Last Loop (diese Website)",
        category: "Notwendig",
      },
      {
        name: "cr-open-reload:<Zeitpunkt>",
        type: "Sitzungsspeicher des Browsers (sessionStorage)",
        purpose:
          "Verhindert, dass die Community-Run-Seite zum Öffnungszeitpunkt der Anmeldung mehrfach neu lädt. Wird nur in den 24 Stunden vor einer Anmeldungsöffnung gesetzt.",
        duration: "Bis zum Schließen des Browser-Tabs",
        provider: "Dolomites Last Loop (diese Website)",
        category: "Notwendig",
      },
      {
        name: "Google Maps",
        type: "Cookies und ähnliche Technologien von Google",
        purpose: "Anzeige der Karte auf der Kontaktseite.",
        duration: "Laut Angaben von Google (siehe Datenschutzerklärung von Google)",
        provider: "Google Ireland Limited",
        category: "Externe Medien – nur mit Einwilligung",
      },
      {
        name: "Vercel Web Analytics",
        type: "Kein Cookie, kein Speicher im Browser",
        purpose: "Datensparsame, zusammengefasste Reichweitenmessung (Seitenaufrufe).",
        duration: "Kein Speicher auf deinem Gerät; der Hashwert zur Unterscheidung von Besuchen wird nach 24 Stunden verworfen",
        provider: "Vercel Inc.",
        category: "Statistik – nur mit Einwilligung",
      },
    ],
    settingsButton: "Cookie-Einstellungen öffnen",
    privacyLink: "Zur Datenschutzerklärung",
    sections: [
      {
        heading: "1. Was sind Cookies?",
        blocks: [
          {
            type: "p",
            text: "Cookies sind kleine Textdateien, die beim Besuch einer Website auf deinem Gerät gespeichert werden. Ähnlich funktionieren andere Speichertechnologien des Browsers, etwa der Sitzungsspeicher (sessionStorage). Technisch notwendige Cookies sind für den Betrieb der Website erforderlich und benötigen keine Einwilligung. Alle anderen Cookies und vergleichbaren Technologien setzen wir nur ein, wenn du vorher eingewilligt hast.",
          },
        ],
      },
      {
        heading: "2. Kategorien",
        blocks: [
          {
            type: "list",
            items: [
              "Notwendig (immer aktiv): für den Betrieb der Website erforderlich, z. B. um deine Cookie-Auswahl zu speichern.",
              "Externe Medien (nur mit Einwilligung): Inhalte externer Anbieter, derzeit ausschließlich die Karte von Google Maps auf der Kontaktseite.",
              "Statistik (nur mit Einwilligung): datensparsame Reichweitenmessung mit Vercel Web Analytics; sie setzt keine Cookies (siehe Punkt 4).",
            ],
          },
          {
            type: "p",
            text: "Statistik setzen wir nur mit deiner Einwilligung ein; Cookies oder andere Technologien für Marketing setzen wir nicht ein.",
          },
        ],
      },
      {
        heading: "3. Eingesetzte Cookies und Speichertechnologien",
        blocks: [],
        table: true,
      },
      {
        heading: "4. Drittanbieter",
        blocks: [
          {
            type: "list",
            items: [
              "Google Maps – Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die Karte auf der Kontaktseite wird erst nach deiner Einwilligung in „Externe Medien“ geladen. Dabei werden u. a. deine IP-Adresse und Angaben zu deinem Browser an Google übertragen, möglicherweise auch in die USA; Google kann dabei Cookies oder ähnliche Technologien einsetzen. Für Übermittlungen in die USA stützt sich Google auf das EU-U.S. Data Privacy Framework (DPF). Ohne Einwilligung kannst du die Adresse über den Link „In Google Maps öffnen“ direkt bei Google aufrufen. Datenschutzerklärung von Google: https://policies.google.com/privacy",
              "Stripe – Stripe Payments Europe, Ltd. Die Zahlung des Startgelds erfolgt auf der Zahlungsseite von Stripe (checkout.stripe.com), nicht auf unserer Website. Für die dort eingesetzten Cookies ist Stripe verantwortlich: https://stripe.com/legal/cookies-policy und https://stripe.com/privacy",
              "Vercel – Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA. Hosting der Website und datensparsame Reichweitenmessung (Vercel Web Analytics, nur nach deiner Einwilligung in „Statistik“). Vercel Web Analytics setzt keine Cookies und speichert nichts in deinem Browser; Besuche werden nur über einen aus der Anfrage gebildeten Hashwert unterschieden, der nach 24 Stunden verworfen wird. Weitere Informationen: https://vercel.com/docs/analytics/privacy-policy",
              "Instagram und Facebook – die Links im Fußbereich sind einfache Verweise. Erst wenn du sie anklickst, wird die jeweilige Plattform aufgerufen; auf unserer Website werden keine Inhalte dieser Plattformen geladen.",
            ],
          },
        ],
      },
      {
        id: "settings",
        heading: "5. Einwilligung, Widerruf und Speicherdauer",
        blocks: [
          {
            type: "p",
            text: "Beim ersten Besuch fragen wir dich über einen Hinweis, ob du externe Medien und die Reichweitenmessung (Statistik) zulassen möchtest. Vor deiner Entscheidung wird kein Cookie gesetzt, keine Verbindung zu Google aufgebaut und die Reichweitenmessung nicht geladen. „Alle akzeptieren“ und „Nur notwendige“ sind gleichwertig; das Schließen des Hinweises über „×“ gilt als „Nur notwendige“. Bloßes Weiterscrollen oder Weiterklicken ist keine Einwilligung.",
          },
          {
            type: "p",
            text: "Deine Auswahl speichern wir im Cookie „dll_consent“ für 6 Monate. Danach – oder wenn sich die eingesetzten Dienste ändern – fragen wir erneut. Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft ändern oder widerrufen: über „Cookie-Einstellungen“ im Fußbereich jeder Seite oder über die Schaltfläche unten. Zusätzlich kannst du Cookies in deinem Browser löschen oder blockieren; dann erscheint der Hinweis beim nächsten Besuch erneut.",
          },
        ],
        settingsButton: true,
      },
      {
        heading: "6. Verantwortlicher und Kontakt",
        blocks: [
          {
            type: "p",
            text: "Verantwortlich ist der Amateursportverein Sport OK Toblach, Seeweg 16, 39034 Dobbiaco/Toblach (BZ), Italien. Fragen zum Datenschutz und zu Cookies: info@worldcup-dobbiaco.it. Weitere Informationen, insbesondere zu deinen Rechten, findest du in unserer Datenschutzerklärung.",
          },
        ],
      },
    ],
  },

  it: {
    title: "Cookie policy",
    metaDescription:
      "Quali cookie e tecnologie di memorizzazione utilizza il sito della Dolomites Last Loop, a quale scopo e come modificare o revocare il tuo consenso.",
    updated: "Aggiornato al: 02/10/2026",
    aiNotice: "Questo testo è stato redatto con il supporto dell’intelligenza artificiale.",
    intro:
      "La presente cookie policy spiega quali cookie e tecnologie analoghe (ad es. la memoria del browser) vengono utilizzati su www.dolomiteslastloop.com, per quali finalità e come puoi prestare, modificare o revocare il tuo consenso. Integra la nostra informativa sulla privacy.",
    tableCaption: "Cookie e tecnologie di memorizzazione utilizzati",
    tableHeaders: {
      name: "Nome",
      type: "Tipo",
      purpose: "Finalità",
      duration: "Durata",
      provider: "Fornitore",
      category: "Categoria",
    },
    rows: [
      {
        name: "dll_consent",
        type: "Cookie (di prima parte)",
        purpose:
          "Memorizza le scelte effettuate nell’avviso sui cookie (versione, data e ora, categorie selezionate). Viene installato solo quando effettui una scelta.",
        duration: "6 mesi",
        provider: "Dolomites Last Loop (questo sito)",
        category: "Necessari",
      },
      {
        name: "dll_admin",
        type: "Cookie (di prima parte)",
        purpose:
          "Accesso del team organizzativo all’area di amministrazione interna. Viene installato solo dopo un login amministrativo, non per i visitatori del sito.",
        duration: "8 ore",
        provider: "Dolomites Last Loop (questo sito)",
        category: "Necessari",
      },
      {
        name: "cr-open-reload:<data e ora>",
        type: "Memoria di sessione del browser (sessionStorage)",
        purpose:
          "Evita che la pagina del Community Run si ricarichi più volte al momento dell’apertura delle iscrizioni. Viene impostato solo nelle 24 ore che precedono l’apertura delle iscrizioni.",
        duration: "Fino alla chiusura della scheda del browser",
        provider: "Dolomites Last Loop (questo sito)",
        category: "Necessari",
      },
      {
        name: "Google Maps",
        type: "Cookie e tecnologie analoghe di Google",
        purpose: "Visualizzazione della mappa nella pagina Contatti.",
        duration: "Secondo quanto indicato da Google (vedi l’informativa privacy di Google)",
        provider: "Google Ireland Limited",
        category: "Contenuti esterni – solo previo consenso",
      },
      {
        name: "Vercel Web Analytics",
        type: "Nessun cookie, nessuna memorizzazione nel browser",
        purpose: "Misurazione aggregata delle visite, limitata ai dati essenziali (visualizzazioni delle pagine).",
        duration: "Nessuna memorizzazione sul tuo dispositivo; il valore hash usato per distinguere le visite viene eliminato dopo 24 ore",
        provider: "Vercel Inc.",
        category: "Statistiche – solo previo consenso",
      },
    ],
    settingsButton: "Apri le impostazioni dei cookie",
    privacyLink: "Vai all’informativa sulla privacy",
    sections: [
      {
        heading: "1. Che cosa sono i cookie?",
        blocks: [
          {
            type: "p",
            text: "I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. In modo simile funzionano altre tecnologie di memorizzazione del browser, come la memoria di sessione (sessionStorage). I cookie tecnici sono indispensabili per il funzionamento del sito e non richiedono il consenso. Tutti gli altri cookie e le tecnologie analoghe vengono utilizzati solo previo tuo consenso.",
          },
        ],
      },
      {
        heading: "2. Categorie",
        blocks: [
          {
            type: "list",
            items: [
              "Necessari (sempre attivi): indispensabili per il funzionamento del sito, ad es. per memorizzare le tue preferenze sui cookie.",
              "Contenuti esterni (solo previo consenso): contenuti di fornitori esterni, attualmente soltanto la mappa di Google Maps nella pagina Contatti.",
              "Statistiche (solo previo consenso): misurazione delle visite a dati ridotti con Vercel Web Analytics, che non installa cookie (vedi punto 4).",
            ],
          },
          {
            type: "p",
            text: "Le statistiche vengono utilizzate solo con il tuo consenso; non utilizziamo cookie o altre tecnologie per finalità di marketing.",
          },
        ],
      },
      {
        heading: "3. Cookie e tecnologie di memorizzazione utilizzati",
        blocks: [],
        table: true,
      },
      {
        heading: "4. Fornitori terzi",
        blocks: [
          {
            type: "list",
            items: [
              "Google Maps – Google Ireland Limited, Gordon House, Barrow Street, Dublino 4, Irlanda. La mappa nella pagina Contatti viene caricata solo dopo il tuo consenso alla categoria «Contenuti esterni». In tal caso a Google vengono trasmessi, tra l’altro, il tuo indirizzo IP e informazioni sul tuo browser, eventualmente anche negli USA; Google può utilizzare cookie o tecnologie analoghe. Per i trasferimenti verso gli USA Google si avvale dell’EU-U.S. Data Privacy Framework (DPF). Senza consenso puoi aprire l’indirizzo direttamente su Google tramite il link «Apri in Google Maps». Informativa privacy di Google: https://policies.google.com/privacy",
              "Stripe – Stripe Payments Europe, Ltd. Il pagamento della quota di iscrizione avviene sulla pagina di pagamento di Stripe (checkout.stripe.com), non sul nostro sito. Dei cookie utilizzati in quella pagina è responsabile Stripe: https://stripe.com/legal/cookies-policy e https://stripe.com/privacy",
              "Vercel – Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA. Hosting del sito e misurazione delle visite a dati ridotti (Vercel Web Analytics, solo dopo il tuo consenso alla categoria «Statistiche»). Vercel Web Analytics non installa cookie e non memorizza dati nel tuo browser; le visite vengono distinte unicamente tramite un valore hash generato dalla richiesta, che viene eliminato dopo 24 ore. Ulteriori informazioni: https://vercel.com/docs/analytics/privacy-policy",
              "Instagram e Facebook – i link in fondo alla pagina sono semplici collegamenti. La piattaforma viene aperta solo se ci clicchi; sul nostro sito non viene caricato alcun contenuto di queste piattaforme.",
            ],
          },
        ],
      },
      {
        id: "settings",
        heading: "5. Consenso, revoca e durata di conservazione",
        blocks: [
          {
            type: "p",
            text: "Alla prima visita ti chiediamo, tramite un avviso, se desideri consentire i contenuti esterni e la misurazione delle visite (statistiche). Prima della tua scelta non viene installato alcun cookie, non viene stabilito alcun collegamento con Google e la misurazione delle visite non viene caricata. «Accetta tutti» e «Solo necessari» hanno la stessa evidenza; la chiusura dell’avviso con la «×» equivale a «Solo necessari». Il semplice scorrimento della pagina o la prosecuzione della navigazione non costituiscono consenso.",
          },
          {
            type: "p",
            text: "Memorizziamo la tua scelta nel cookie «dll_consent» per 6 mesi. Trascorso tale periodo – oppure se cambiano i servizi utilizzati – te la chiederemo di nuovo. Puoi modificare o revocare il tuo consenso in qualsiasi momento, con effetto per il futuro: tramite «Impostazioni cookie» in fondo a ogni pagina oppure tramite il pulsante qui sotto. Puoi inoltre cancellare o bloccare i cookie nel tuo browser; in tal caso l’avviso comparirà di nuovo alla visita successiva.",
          },
        ],
        settingsButton: true,
      },
      {
        heading: "6. Titolare del trattamento e contatti",
        blocks: [
          {
            type: "p",
            text: "Titolare del trattamento è l’Amateursportverein Sport OK Toblach, Seeweg 16, 39034 Dobbiaco/Toblach (BZ), Italia. Per domande sulla privacy e sui cookie: info@worldcup-dobbiaco.it. Ulteriori informazioni, in particolare sui tuoi diritti, sono disponibili nella nostra informativa sulla privacy.",
          },
        ],
      },
    ],
  },

  en: {
    title: "Cookie policy",
    metaDescription:
      "Which cookies and storage technologies the Dolomites Last Loop website uses, what they are for and how to change or withdraw your consent.",
    updated: "Last updated: 2 October 2026",
    aiNotice: "This text was created with the assistance of AI.",
    intro:
      "This cookie policy explains which cookies and similar technologies (e.g. browser storage) are used on www.dolomiteslastloop.com, what they are used for and how you can give, change or withdraw your consent. It supplements our privacy policy.",
    tableCaption: "Cookies and storage technologies in use",
    tableHeaders: {
      name: "Name",
      type: "Type",
      purpose: "Purpose",
      duration: "Duration",
      provider: "Provider",
      category: "Category",
    },
    rows: [
      {
        name: "dll_consent",
        type: "Cookie (first party)",
        purpose:
          "Stores your choice in the cookie notice (version, time, selected categories). Only set once you make a choice.",
        duration: "6 months",
        provider: "Dolomites Last Loop (this website)",
        category: "Necessary",
      },
      {
        name: "dll_admin",
        type: "Cookie (first party)",
        purpose:
          "Login of the organising team to the internal admin area. Only set after an admin login, never for website visitors.",
        duration: "8 hours",
        provider: "Dolomites Last Loop (this website)",
        category: "Necessary",
      },
      {
        name: "cr-open-reload:<time>",
        type: "Browser session storage (sessionStorage)",
        purpose:
          "Prevents the Community Run page from reloading more than once when registration opens. Only set during the 24 hours before registration opens.",
        duration: "Until the browser tab is closed",
        provider: "Dolomites Last Loop (this website)",
        category: "Necessary",
      },
      {
        name: "Google Maps",
        type: "Cookies and similar technologies from Google",
        purpose: "Displaying the map on the contact page.",
        duration: "As specified by Google (see Google’s privacy policy)",
        provider: "Google Ireland Limited",
        category: "External media – only with consent",
      },
      {
        name: "Vercel Web Analytics",
        type: "No cookie, no browser storage",
        purpose: "Data-minimising, aggregated audience measurement (page views).",
        duration: "Nothing is stored on your device; the hash used to distinguish visits is discarded after 24 hours",
        provider: "Vercel Inc.",
        category: "Statistics – only with consent",
      },
    ],
    settingsButton: "Open cookie settings",
    privacyLink: "Go to the privacy policy",
    sections: [
      {
        heading: "1. What are cookies?",
        blocks: [
          {
            type: "p",
            text: "Cookies are small text files that are stored on your device when you visit a website. Other browser storage technologies, such as session storage (sessionStorage), work in a similar way. Strictly necessary cookies are required for the website to work and do not need consent. We only use all other cookies and comparable technologies if you have consented beforehand.",
          },
        ],
      },
      {
        heading: "2. Categories",
        blocks: [
          {
            type: "list",
            items: [
              "Necessary (always active): required for the website to work, e.g. to store your cookie choice.",
              "External media (only with consent): content from external providers, currently only the Google Maps map on the contact page.",
              "Statistics (only with consent): data-minimising audience measurement with Vercel Web Analytics, which sets no cookies (see section 4).",
            ],
          },
          {
            type: "p",
            text: "Statistics are only used with your consent; we do not use cookies or other technologies for marketing.",
          },
        ],
      },
      {
        heading: "3. Cookies and storage technologies in use",
        blocks: [],
        table: true,
      },
      {
        heading: "4. Third-party providers",
        blocks: [
          {
            type: "list",
            items: [
              "Google Maps – Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. The map on the contact page is only loaded after you consent to “External media”. Your IP address and information about your browser, among other data, are then transferred to Google, possibly also to the USA; Google may use cookies or similar technologies. For transfers to the USA, Google relies on the EU-U.S. Data Privacy Framework (DPF). Without consent, you can open the address directly on Google via the “Open in Google Maps” link. Google’s privacy policy: https://policies.google.com/privacy",
              "Stripe – Stripe Payments Europe, Ltd. The entry fee is paid on Stripe’s payment page (checkout.stripe.com), not on our website. Stripe is responsible for the cookies used there: https://stripe.com/legal/cookies-policy and https://stripe.com/privacy",
              "Vercel – Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA. Hosting of the website and data-minimising audience measurement (Vercel Web Analytics, only after you consent to “Statistics”). Vercel Web Analytics sets no cookies and stores nothing in your browser; visits are distinguished only by a hash generated from the request, which is discarded after 24 hours. Further information: https://vercel.com/docs/analytics/privacy-policy",
              "Instagram and Facebook – the links in the footer are plain links. The respective platform is only opened when you click them; no content from these platforms is loaded on our website.",
            ],
          },
        ],
      },
      {
        id: "settings",
        heading: "5. Consent, withdrawal and retention",
        blocks: [
          {
            type: "p",
            text: "On your first visit, a notice asks whether you want to allow external media and audience measurement (statistics). Before you decide, no cookie is set, no connection to Google is made and the audience measurement is not loaded. “Accept all” and “Necessary only” are given equal weight; closing the notice with “×” counts as “Necessary only”. Simply scrolling or continuing to browse does not constitute consent.",
          },
          {
            type: "p",
            text: "We store your choice in the “dll_consent” cookie for 6 months. After that – or if the services we use change – we will ask you again. You can change or withdraw your consent at any time with effect for the future: via “Cookie settings” at the bottom of every page or via the button below. You can also delete or block cookies in your browser; the notice will then appear again on your next visit.",
          },
        ],
        settingsButton: true,
      },
      {
        heading: "6. Controller and contact",
        blocks: [
          {
            type: "p",
            text: "The controller is Amateursportverein Sport OK Toblach, Seeweg 16, 39034 Dobbiaco/Toblach (BZ), Italy. Questions about data protection and cookies: info@worldcup-dobbiaco.it. Further information, in particular about your rights, can be found in our privacy policy.",
          },
        ],
      },
    ],
  },
};
