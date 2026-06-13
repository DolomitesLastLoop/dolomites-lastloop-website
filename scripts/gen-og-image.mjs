// Generiert public/og-image.png (1200×630) für Social-/AI-Previews.
// Lokal mit Sharp (bereits Dependency) — kein externer Dienst.
// Stil: Navy #2D4A6B + Logo + Titel + Datum/Ort.
// Aufruf: node scripts/gen-og-image.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const W = 1200;
const H = 630;
const NAVY = "#2D4A6B";
const LOGO = 168;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="34%" r="75%">
      <stop offset="0%" stop-color="#3A5C82"/>
      <stop offset="60%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="#1E3550"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" rx="14"
        fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
  <text x="${W / 2}" y="350" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="84" font-weight="700"
        letter-spacing="6" fill="#ffffff">DOLOMITES LAST LOOP</text>
  <rect x="${W / 2 - 110}" y="388" width="220" height="3" rx="2" fill="#ffffff" opacity="0.85"/>
  <text x="${W / 2}" y="445" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="500"
        letter-spacing="11" fill="#CBD8EC">BACKYARD ULTRA</text>
  <text x="${W / 2}" y="540" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="36" font-weight="600"
        letter-spacing="3" fill="#ffffff">15. MAI 2027 · TOBLACH · DOLOMITEN</text>
</svg>`;

const logo = await sharp(join(root, "public/images/Logo.jpeg"))
  .resize(LOGO, LOGO, { fit: "cover" })
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, top: 96, left: Math.round(W / 2 - LOGO / 2) }])
  .png()
  .toFile(join(root, "public/og-image.png"));

console.log("✓ public/og-image.png (1200×630) generiert");
