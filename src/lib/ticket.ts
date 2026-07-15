// PDF-Ticket für die Bestätigungsmail (Anzeige-/Nachweis-Dokument, kein QR).
// Läuft zur Laufzeit im Stripe-Webhook — nur im confirmed-Pfad (kein Overflow).
// Datenschutz: Es erscheinen NUR Name, Startnummer, Datum, Ort, Format-
// Beschreibung und Veranstalter — keine Geburts-/Kontakt-/Zahlungsdaten.
import { PDFDocument, StandardFonts, rgb, degrees } from "@cantoo/pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { BEBAS_TTF_B64, LOGO_JPEG_B64 } from "./ticket-assets";

type Lang = "de" | "it" | "en";

function normLang(lang: string | null | undefined): Lang {
  return lang === "it" || lang === "en" ? lang : "de";
}

// Farbwerte aus src/styles/global.css
const NAVY = rgb(0x2d / 255, 0x4a / 255, 0x6b / 255);
const CREAM = rgb(0xfa / 255, 0xf6 / 255, 0xf0 / 255);
const SAND = rgb(0xf0 / 255, 0xeb / 255, 0xe3 / 255);
const GOLD = rgb(0xc9 / 255, 0xa8 / 255, 0x4c / 255);
const TEXT = rgb(0x1a / 255, 0x2a / 255, 0x3a / 255);
const MUTED = rgb(0x4a / 255, 0x5a / 255, 0x6a / 255);
const WHITE = rgb(1, 1, 1);

const copy: Record<
  Lang,
  {
    docTitle: string;
    bibLabel: string;
    registered: string;
    date: string;
    venue: string;
    format: string;
  }
> = {
  de: {
    docTitle: "ANMELDEBESTÄTIGUNG",
    bibLabel: "STARTNUMMER",
    registered: "REGISTRIERT",
    date: "15. Mai 2027",
    venue: "Nordic Arena · Seeweg 16 · 39034 Toblach",
    format: "BACKYARD ULTRA · 6,71 KM LOOP · JEDE VOLLE STUNDE",
  },
  it: {
    docTitle: "CONFERMA D'ISCRIZIONE",
    bibLabel: "NUMERO DI PETTORALE",
    registered: "REGISTRATO",
    date: "15 maggio 2027",
    venue: "Nordic Arena · Seeweg 16 · 39034 Dobbiaco (BZ)",
    format: "BACKYARD ULTRA · GIRO DI 6,71 KM · OGNI ORA IN PUNTO",
  },
  en: {
    docTitle: "REGISTRATION CONFIRMATION",
    bibLabel: "BIB NUMBER",
    registered: "REGISTERED",
    date: "15 May 2027",
    venue: "Nordic Arena · Seeweg 16 · 39034 Toblach/Dobbiaco · Italy",
    format: "BACKYARD ULTRA · 6.71 KM LOOP · EVERY HOUR ON THE HOUR",
  },
};

// A5 quer
const PAGE_W = 595.28;
const PAGE_H = 419.53;
const BAND_W = 150;
const FOOTER_H = 36;
const CONTENT_X = BAND_W + 42;
const CONTENT_W = PAGE_W - CONTENT_X - 42;

export async function generateTicketPdf(opts: {
  vorname: string;
  nachname: string;
  startnummer: number | null;
  lang: string;
}): Promise<Uint8Array> {
  const L = normLang(opts.lang);
  const c = copy[L];

  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle(`Dolomites Last Loop 2027 – ${c.docTitle}`);
  doc.setAuthor("Sport OK Toblach");

  const bebas = await doc.embedFont(Buffer.from(BEBAS_TTF_B64, "base64"), {
    subset: true,
  });
  const helv = await doc.embedFont(StandardFonts.Helvetica);
  const helvBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const logo = await doc.embedJpg(Buffer.from(LOGO_JPEG_B64, "base64"));

  const page = doc.addPage([PAGE_W, PAGE_H]);

  // Flächen: Creme-Grund, Navy-Band links, Sand-Fußzeile rechts unten
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: CREAM });
  page.drawRectangle({ x: 0, y: 0, width: BAND_W, height: PAGE_H, color: NAVY });
  page.drawRectangle({
    x: BAND_W,
    y: 0,
    width: PAGE_W - BAND_W,
    height: FOOTER_H,
    color: SAND,
  });

  // ── Navy-Band: Logo im weißen Kasten + vertikale Wortmarke ────────────────
  const logoBox = 72;
  const logoX = (BAND_W - logoBox) / 2;
  const logoY = PAGE_H - logoBox - 28;
  page.drawRectangle({
    x: logoX - 4,
    y: logoY - 4,
    width: logoBox + 8,
    height: logoBox + 8,
    color: WHITE,
  });
  page.drawImage(logo, { x: logoX, y: logoY, width: logoBox, height: logoBox });

  // Vertikal (90° gedreht, von unten nach oben), mittig im Band
  const mark = "DOLOMITES LAST LOOP";
  const markSize = 26;
  const markW = bebas.widthOfTextAtSize(mark, markSize);
  page.drawText(mark, {
    x: (BAND_W - bebas.heightAtSize(markSize)) / 2 + bebas.heightAtSize(markSize) - 8,
    y: (logoY - markW) / 2,
    size: markSize,
    font: bebas,
    color: WHITE,
    rotate: degrees(90),
  });
  // Gold-Akzentlinie am Bandfuß
  page.drawRectangle({ x: 24, y: 22, width: BAND_W - 48, height: 2, color: GOLD });

  // ── Hauptfläche ────────────────────────────────────────────────────────────
  let y = PAGE_H - 46;

  // Dokumenttitel klein
  page.drawText(c.docTitle, {
    x: CONTENT_X,
    y,
    size: 10,
    font: helvBold,
    color: MUTED,
  });

  // Name (nur Bebas — latin-ext deckt internationale Namen ab)
  const name = `${opts.vorname} ${opts.nachname}`.trim().toUpperCase();
  let nameSize = 34;
  while (nameSize > 16 && bebas.widthOfTextAtSize(name, nameSize) > CONTENT_W) {
    nameSize -= 1;
  }
  y -= 16 + nameSize;
  page.drawText(name, { x: CONTENT_X, y, size: nameSize, font: bebas, color: TEXT });

  // Startnummer-Block (Label + Gold-Zahl in Rahmen-Box)
  y -= 30;
  page.drawText(c.bibLabel, {
    x: CONTENT_X,
    y,
    size: 9,
    font: helvBold,
    color: MUTED,
  });
  y -= 12;
  if (opts.startnummer !== null) {
    const num = String(opts.startnummer);
    const numSize = 54;
    const numW = bebas.widthOfTextAtSize(num, numSize);
    const boxW = Math.max(numW + 36, 86);
    const boxH = 64;
    y -= boxH;
    page.drawRectangle({
      x: CONTENT_X,
      y,
      width: boxW,
      height: boxH,
      borderColor: GOLD,
      borderWidth: 2,
    });
    page.drawText(num, {
      x: CONTENT_X + (boxW - numW) / 2,
      y: y + (boxH - bebas.heightAtSize(numSize)) / 2 + 6,
      size: numSize,
      font: bebas,
      color: GOLD,
    });
  } else {
    // Theoretischer Edge-Case im confirmed-Pfad (confirm_participant v2 vergibt
    // bei Nicht-Overflow immer eine Nummer) — defensiv statt leerer Box.
    y -= 30;
    page.drawText(c.registered, {
      x: CONTENT_X,
      y,
      size: 24,
      font: bebas,
      color: GOLD,
    });
  }

  // Datum + Ort
  y -= 34;
  page.drawText(c.date, { x: CONTENT_X, y, size: 13, font: helvBold, color: TEXT });
  y -= 19;
  page.drawText(c.venue, { x: CONTENT_X, y, size: 11, font: helv, color: TEXT });

  // Goldlinie + Format-Zeile (beschreibt das Rennformat — kein Distanz-Feld)
  y -= 24;
  page.drawRectangle({ x: CONTENT_X, y, width: 56, height: 2, color: GOLD });
  y -= 22;
  let fmtSize = 15;
  while (fmtSize > 9 && bebas.widthOfTextAtSize(c.format, fmtSize) > CONTENT_W) {
    fmtSize -= 1;
  }
  page.drawText(c.format, { x: CONTENT_X, y, size: fmtSize, font: bebas, color: NAVY });

  // Fußzeile
  page.drawText("Sport OK Toblach · www.dolomiteslastloop.com", {
    x: CONTENT_X,
    y: (FOOTER_H - 8) / 2,
    size: 8.5,
    font: helv,
    color: MUTED,
  });

  return doc.save();
}
