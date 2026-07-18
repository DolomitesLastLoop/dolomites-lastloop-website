// Generiert src/lib/ticket-assets.ts: Font, Logo (Weiß-Negativ) und Foto-Streifen
// als Base64-Konstanten. Base64 statt fs/includeFiles, damit die Assets
// deterministisch im Server-Bundle landen (kein Pfad-Lookup in /var/task zur Laufzeit).
// Aufruf (einmalig bzw. bei Asset-Wechsel): node scripts/gen-ticket-assets.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const font = readFileSync(join(root, "src/assets/ticket/BebasNeue-Regular.ttf"));

// ── Logo als Weiß-Negativ mit Alpha ──────────────────────────────────────────
// Das Original (Logo.jpeg) ist navy auf Creme — direkt freigestellt wäre es auf
// dem Navy-Band des Tickets unsichtbar. Darum: Luminanz → Alpha (dunkel = deckend),
// Farbkanäle reinweiß. Die Rampe BG_LEVEL→FG_LEVEL hält JPEG-Artefakte im
// Hintergrund bei Alpha 0 und lässt Kantenpixel weich auslaufen.
const BG_LEVEL = 235; // ab dieser Helligkeit sicher Hintergrund (Creme ≈ 246)
const FG_LEVEL = 110; // ab dieser Dunkelheit sicher Logo-Tinte (Navy ≈ 69)
const LOGO_SIZE = 512;

const { data: grey, info } = await sharp(join(root, "public/images/Logo.jpeg"))
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

// RGBA-Buffer manuell bauen: RGB fix weiß, Alpha aus der Luminanz-Rampe.
const rgba = Buffer.alloc(grey.length * 4);
for (let i = 0; i < grey.length; i++) {
  const a = ((BG_LEVEL - grey[i]) / (BG_LEVEL - FG_LEVEL)) * 255;
  rgba[i * 4] = 255;
  rgba[i * 4 + 1] = 255;
  rgba[i * 4 + 2] = 255;
  rgba[i * 4 + 3] = a < 0 ? 0 : a > 255 ? 255 : Math.round(a);
}

const logoPng = await sharp(rgba, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .resize(LOGO_SIZE, LOGO_SIZE)
  .png()
  .toBuffer();

// ── Panorama-Foto-Streifen (Wisthaler HHW8254, lizenzierter Pool) ─────────────
// Zielfläche im Ticket: (PAGE_W − BAND_W) × STRIP_H = 445.28 × 95 pt ≈ 4.69:1.
// Crop-Band aus dem 1600×1067-Original: Bergmassiv nahezu komplett (Gipfel mit
// Himmel darüber bis zu den bewaldeten Flanken) — ohne Personen/Banner/
// unscharfen Vordergrund.
const STRIP_CROP = { left: 0, top: 55, width: 1600, height: 341 };
const STRIP_OUT_W = 1200;

const strip = await sharp(
  join(
    root,
    "public/images/©www.wisthaler.com_26_05_dolomites_last_lop__HHW8254.jpg",
  ),
)
  .extract(STRIP_CROP)
  .resize(STRIP_OUT_W)
  .jpeg({ quality: 72, mozjpeg: true })
  .toBuffer();

const out = `// AUTO-GENERIERT von scripts/gen-ticket-assets.mjs — nicht von Hand editieren.
// Quellen: src/assets/ticket/BebasNeue-Regular.ttf (OFL),
//   public/images/Logo.jpeg (→ Weiß-Negativ mit Alpha),
//   public/images/©www.wisthaler.com_…HHW7790.jpg (lizenzierter Wisthaler-Pool)

export const BEBAS_TTF_B64 =
  "${font.toString("base64")}";

export const LOGO_WHITE_PNG_B64 =
  "${logoPng.toString("base64")}";

export const PHOTO_STRIP_JPEG_B64 =
  "${strip.toString("base64")}";
`;

writeFileSync(join(root, "src/lib/ticket-assets.ts"), out);
console.log(
  `✓ src/lib/ticket-assets.ts generiert (Font ${font.length} B, Logo-PNG ${logoPng.length} B, Foto-Streifen ${strip.length} B)`,
);
