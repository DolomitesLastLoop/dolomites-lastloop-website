// Generiert src/lib/ticket-assets.ts: Font + Logo als Base64-Konstanten.
// Base64 statt fs/includeFiles, damit die Assets deterministisch im
// Server-Bundle landen (kein Pfad-Lookup in /var/task zur Laufzeit).
// Aufruf (einmalig bzw. bei Asset-Wechsel): node scripts/gen-ticket-assets.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const font = readFileSync(join(root, "src/assets/ticket/BebasNeue-Regular.ttf"));
const logo = readFileSync(join(root, "public/images/Logo.jpeg"));

const out = `// AUTO-GENERIERT von scripts/gen-ticket-assets.mjs — nicht von Hand editieren.
// Quellen: src/assets/ticket/BebasNeue-Regular.ttf (OFL), public/images/Logo.jpeg

export const BEBAS_TTF_B64 =
  "${font.toString("base64")}";

export const LOGO_JPEG_B64 =
  "${logo.toString("base64")}";
`;

writeFileSync(join(root, "src/lib/ticket-assets.ts"), out);
console.log(
  `✓ src/lib/ticket-assets.ts generiert (Font ${font.length} B, Logo ${logo.length} B)`,
);
