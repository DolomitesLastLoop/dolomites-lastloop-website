// Produktfotos für Shop v2 als ImageMetadata (für <Image> aus astro:assets).
// Quelle liegt unter src/assets/shop/, wird beim Build zu WebP konvertiert.
//
// Je Motiv Vorder- und Rückseite (Vorne/Hinten-Umschalter auf der Shop-Seite).
// Artwork: dunkelblau mit rostorangem Topografie-Linienmuster (Camo-Look).
import type { ImageMetadata } from "astro";
import type { ShopProductId } from "@i18n/shop";
import takingSoulsFront from "../assets/shop/taking-souls-front.jpg";
import takingSoulsBack from "../assets/shop/taking-souls-back.jpg";
import bellComesForEveryoneFront from "../assets/shop/bell-comes-for-everyone-front.jpg";
import bellComesForEveryoneBack from "../assets/shop/bell-comes-for-everyone-back.jpg";
import tapeRunRepeatFront from "../assets/shop/tape-run-repeat-front.jpg";
import tapeRunRepeatBack from "../assets/shop/tape-run-repeat-back.jpg";
import timeToGoFront from "../assets/shop/59-59-time-to-go-front.jpg";
import timeToGoBack from "../assets/shop/59-59-time-to-go-back.jpg";

export type ShopPhotoSet = { front: ImageMetadata; back: ImageMetadata };

export const shopPhoto: Record<ShopProductId, ShopPhotoSet> = {
  "taking-souls": { front: takingSoulsFront, back: takingSoulsBack },
  "bell-comes-for-everyone": { front: bellComesForEveryoneFront, back: bellComesForEveryoneBack },
  "tape-run-repeat": { front: tapeRunRepeatFront, back: tapeRunRepeatBack },
  "5959-time-to-go": { front: timeToGoFront, back: timeToGoBack },
};
