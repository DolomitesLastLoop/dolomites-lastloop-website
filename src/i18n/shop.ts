import type { Lang } from "./ui";

// Shop v2 — nur für Community-Run-Angemeldete (/[lang]/shop, Zugang per Mail-Link).
// Eigene Datei mit Record<Lang, …>: TypeScript erzwingt vollständige DE/IT/EN-Texte.
//
// Preis einheitlich 40 € je Motiv. Offen: Größenlauf final, Checkout
// (Shopify/Printful) kommt erst ganz zum Schluss.

export type ShopProductId =
  | "taking-souls"
  | "bell-comes-for-everyone"
  | "tape-run-repeat"
  | "5959-time-to-go";

export type ShopProduct = {
  id: ShopProductId;
  name: string;
  tagline: Record<Lang, string>;
};

/** Reihenfolge = Reihenfolge auf der Seite. Alle Motive dunkelblau mit Topo-Muster. */
export const shopProducts: ShopProduct[] = [
  {
    id: "taking-souls",
    name: "Taking Souls Since 2026",
    tagline: {
      de: "Ein Loop nach dem anderen.",
      it: "Un loop dopo l'altro.",
      en: "One loop after another.",
    },
  },
  {
    id: "bell-comes-for-everyone",
    name: "The Bell Comes For Everyone",
    tagline: {
      de: "Jede Stunde. Für jeden.",
      it: "Ogni ora. Per tutti.",
      en: "Every hour. For everyone.",
    },
  },
  {
    id: "tape-run-repeat",
    name: "Tape. Run. Repeat.",
    tagline: {
      de: "Der Rhythmus des Backyard Ultra.",
      it: "Il ritmo del Backyard Ultra.",
      en: "The rhythm of the Backyard Ultra.",
    },
  },
  {
    id: "5959-time-to-go",
    name: "59:59. Time To Go.",
    tagline: {
      de: "Die letzte Minute vor dem nächsten Loop.",
      it: "L'ultimo minuto prima del prossimo loop.",
      en: "The last minute before the next loop.",
    },
  },
];

/** [PLATZHALTER] Größenlauf aus Shop v1 übernommen — final offen. */
export const SIZES = ["S", "M", "L", "XL"] as const;

export type ShopCopy = {
  metaTitle: string;
  hero: { eyebrow: string; title: string; subtitle: string; text: string };
  notice: string;
  colorLabel: string;
  colorValue: string;
  sizeLabel: string;
  priceLabel: string;
  priceValue: string;
  orderStatus: string;
  orderHint: string;
  front: string;
  back: string;
  viewLabel: string;
  photoAlt: (name: string, side: string) => string;
  misconfigured: { title: string; text: string };
  denied: {
    title: string;
    text: string;
    expired: string;
    cta: string;
  };
};

export const shopCopy: Record<Lang, ShopCopy> = {
  de: {
    metaTitle: "Shop",
    hero: {
      eyebrow: "Nur für Community-Run-Teilnehmer:innen",
      title: "Shop",
      subtitle: "Die Topo Collection",
      text: "Vier Motive, alle in Dunkelblau mit Topografie-Muster – gemacht für die, die wissen, was die Glocke bedeutet.",
    },
    notice:
      "Vorschau: Bestellen ist noch nicht möglich. Wir melden uns, sobald der Shop öffnet.",
    colorLabel: "Farbe",
    colorValue: "Dunkelblau · Topo-Muster Rostorange",
    sizeLabel: "Größen",
    priceLabel: "Preis",
    priceValue: "40 €",
    orderStatus: "Bestellung folgt in Kürze",
    orderHint: "Noch keine Bestellung möglich – du musst jetzt nichts tun.",
    front: "Vorne",
    back: "Hinten",
    viewLabel: "Ansicht",
    photoAlt: (n, side) => `T-Shirt „${n}" – ${side}`,
    misconfigured: {
      title: "Shop vorübergehend nicht verfügbar",
      text: "Der Zugang kann gerade nicht eingerichtet werden. Bitte versuche es später erneut – dein Link bleibt gültig.",
    },
    denied: {
      title: "Zugang nur über Community-Run-Anmeldung",
      text: "Dieser Shop ist exklusiv für Teilnehmer:innen des Community Runs. Deinen persönlichen Zugangslink findest du in deiner Anmeldebestätigung per E-Mail.",
      expired:
        "Dein Zugangslink ist abgelaufen oder wurde deaktiviert. Bei Fragen melde dich gerne über das Kontaktformular.",
      cta: "Zum Community Run",
    },
  },
  it: {
    metaTitle: "Shop",
    hero: {
      eyebrow: "Solo per chi partecipa al Community Run",
      title: "Shop",
      subtitle: "La Topo Collection",
      text: "Quattro motivi, tutti in blu scuro con motivo topografico – per chi sa cosa significa la campana.",
    },
    notice:
      "Anteprima: non è ancora possibile ordinare. Ti avviseremo quando lo shop aprirà.",
    colorLabel: "Colore",
    colorValue: "Blu scuro · motivo topografico ruggine",
    sizeLabel: "Taglie",
    priceLabel: "Prezzo",
    priceValue: "40 €",
    orderStatus: "Ordini disponibili a breve",
    orderHint: "Non è ancora possibile ordinare – per ora non devi fare nulla.",
    front: "Fronte",
    back: "Retro",
    viewLabel: "Vista",
    photoAlt: (n, side) => `T-shirt «${n}» – ${side}`,
    misconfigured: {
      title: "Shop temporaneamente non disponibile",
      text: "Al momento non è possibile attivare l'accesso. Riprova più tardi – il tuo link resta valido.",
    },
    denied: {
      title: "Accesso solo con iscrizione al Community Run",
      text: "Questo shop è riservato a chi partecipa al Community Run. Trovi il tuo link personale di accesso nella conferma d'iscrizione via e-mail.",
      expired:
        "Il tuo link di accesso è scaduto o è stato disattivato. Per domande scrivici tramite il modulo di contatto.",
      cta: "Al Community Run",
    },
  },
  en: {
    metaTitle: "Shop",
    hero: {
      eyebrow: "Community Run participants only",
      title: "Shop",
      subtitle: "The Topo Collection",
      text: "Four designs, all in navy with a topographic pattern – made for those who know what the bell means.",
    },
    notice:
      "Preview: ordering isn't possible yet. We'll let you know as soon as the shop opens.",
    colorLabel: "Colour",
    colorValue: "Navy · rust-orange topo pattern",
    sizeLabel: "Sizes",
    priceLabel: "Price",
    priceValue: "€40",
    orderStatus: "Ordering opens soon",
    orderHint: "You can't order yet – there's nothing you need to do right now.",
    front: "Front",
    back: "Back",
    viewLabel: "View",
    photoAlt: (n, side) => `T-shirt "${n}" – ${side}`,
    misconfigured: {
      title: "Shop temporarily unavailable",
      text: "Access can't be set up right now. Please try again later – your link remains valid.",
    },
    denied: {
      title: "Access only via Community Run sign-up",
      text: "This shop is exclusive to Community Run participants. You'll find your personal access link in your sign-up confirmation email.",
      expired:
        "Your access link has expired or been deactivated. If you have questions, please get in touch via the contact form.",
      cta: "To the Community Run",
    },
  },
};
