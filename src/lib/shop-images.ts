// Produktfotos für Shop v2 als ImageMetadata (für <Image> aus astro:assets).
// Quelle liegt unter src/assets/shop/, wird beim Build zu WebP konvertiert.
//
// Nur Motive mit fertigem SCHWARZ-Artwork stehen hier. Fehlt ein Eintrag, zeigt
// die Shop-Seite bewusst einen Platzhalter (schwarze Fläche + Produktname) statt
// eines Camo-/Weiß-Fotos aus Shop v1, um keine falschen Erwartungen zu wecken.
import type { ImageMetadata } from "astro";
import type { ShopProductId } from "@i18n/shop";
import bellComesForEveryoneBlack from "../assets/shop/bell-comes-for-everyone-black.jpg";

export const shopPhoto: Partial<Record<ShopProductId, ImageMetadata>> = {
  "bell-comes-for-everyone": bellComesForEveryoneBlack,
};
