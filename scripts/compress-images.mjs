#!/usr/bin/env node
/**
 * Compress every JPG in public/images so each file is ≤ 200 KB.
 * Strategy: cap longest side at 1920 px, encode mozjpeg q=80,
 * step quality down (78 → 72 → 66 → 60 → 52 → 44) if still too big.
 *
 * Run: node scripts/compress-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve(process.cwd(), "public", "images");
const TARGET_BYTES = 200 * 1024;
const SIZE_LADDER = [1920, 1600, 1400, 1200, 1024];
const QUALITY_STEPS = [80, 72, 64, 56, 48, 40, 32];

const fmt = (n) =>
  n >= 1024 * 1024
    ? (n / 1024 / 1024).toFixed(2) + " MB"
    : Math.round(n / 1024) + " KB";

async function compressOne(file) {
  const abs = path.join(DIR, file);
  const original = await fs.stat(abs);
  const input = await fs.readFile(abs);

  const meta = await sharp(input).metadata();
  const isLandscape = (meta.width ?? 0) >= (meta.height ?? 0);

  let best = null;
  let usedQuality = 0;
  let usedSize = 0;

  outer: for (const long of SIZE_LADDER) {
    const resizeOpts = isLandscape ? { width: long } : { height: long };
    for (const q of QUALITY_STEPS) {
      const buf = await sharp(input)
        .rotate()
        .resize({ ...resizeOpts, withoutEnlargement: true })
        .jpeg({ quality: q, mozjpeg: true })
        .toBuffer();
      best = buf;
      usedQuality = q;
      usedSize = long;
      if (buf.byteLength <= TARGET_BYTES) break outer;
    }
  }

  // Don't ever write a larger file than what's there
  if (best.byteLength >= original.size) {
    return {
      file,
      action: "skip",
      before: original.size,
      after: original.size,
      quality: 0,
      size: 0,
    };
  }

  await fs.writeFile(abs, best);
  return {
    file,
    action: best.byteLength <= TARGET_BYTES ? "ok" : "over",
    before: original.size,
    after: best.byteLength,
    quality: usedQuality,
    size: usedSize,
  };
}

async function main() {
  const entries = await fs.readdir(DIR);
  const files = entries
    .filter((f) => /\.(jpe?g)$/i.test(f))
    .filter((f) => !f.startsWith("."));

  console.log(`Compressing ${files.length} files in ${DIR}`);
  console.log(
    `Target ≤ ${fmt(TARGET_BYTES)} | size ladder ${SIZE_LADDER.join("→")}px`,
  );
  console.log("");

  let totalBefore = 0;
  let totalAfter = 0;
  let over = 0;
  let skipped = 0;

  const concurrency = 6;
  const queue = files.slice();
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const file = queue.shift();
      if (!file) return;
      try {
        const r = await compressOne(file);
        totalBefore += r.before;
        totalAfter += r.after;
        if (r.action === "over") over++;
        if (r.action === "skip") skipped++;
        const tag =
          r.action === "ok"
            ? "✓"
            : r.action === "over"
              ? "!"
              : "·";
        console.log(
          `${tag} ${file.padEnd(42)} ${fmt(r.before).padStart(8)} → ${fmt(r.after).padStart(8)}  q${r.quality || "-"} ${r.size ? "@" + r.size + "px" : ""}`,
        );
      } catch (err) {
        console.error(`✗ ${file}: ${err.message}`);
      }
    }
  });
  await Promise.all(workers);

  console.log("");
  console.log(`Total before: ${fmt(totalBefore)}`);
  console.log(`Total after:  ${fmt(totalAfter)}`);
  console.log(
    `Savings:      ${fmt(totalBefore - totalAfter)} (${Math.round((1 - totalAfter / totalBefore) * 100)}%)`,
  );
  console.log(`Over target:  ${over}`);
  console.log(`Skipped:      ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
