#!/usr/bin/env node
/**
 * Generiert src/data/gallery-manifest.json mit den Pixelmaßen aller
 * Galerie-Bilder. Die Galerie setzt daraus width/height-Attribute,
 * damit die Masonry nicht bei jedem Lazy-Load neu layoutet (Scroll-Jank).
 *
 * Nach jedem Bild-Update erneut ausführen: node scripts/gallery-manifest.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve(process.cwd(), "public", "images");
const OUT = path.resolve(process.cwd(), "src", "data", "gallery-manifest.json");

const files = (await fs.readdir(DIR)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !f.startsWith("."));

const manifest = {};
for (const file of files) {
  const meta = await sharp(path.join(DIR, file)).metadata();
  if (meta.width && meta.height) {
    manifest[file] = [meta.width, meta.height];
  }
}

await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, JSON.stringify(manifest));
console.log(`gallery-manifest.json: ${Object.keys(manifest).length} Bilder vermessen.`);
