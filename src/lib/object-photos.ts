import { readdirSync } from "node:fs";
import { join } from "node:path";

export const STOCK_FALLBACK_IMG = "/productImg/istockphoto-1372682637-2048x2048.jpg";

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

/** URLs like `/chaveta/photo.jpg` for existing files under `public/<folder>/`. */
export function listPublicFolderImages(folderName: string): string[] {
  const dir = join(process.cwd(), "public", folderName);
  try {
    return readdirSync(dir)
      .filter((name) => IMAGE_EXT.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
      .map((name) => `/${folderName}/${name}`);
  } catch {
    return [];
  }
}

export function buildHeroSlidesFromObjectFolders(limit = 10): string[] {
  const chaveta = listPublicFolderImages("chaveta");
  const zil = listPublicFolderImages("zil");
  const slides: string[] = [];
  const max = Math.max(chaveta.length, zil.length);
  for (let i = 0; i < max && slides.length < limit; i++) {
    if (chaveta[i]) slides.push(chaveta[i]);
    if (zil[i] && slides.length < limit) slides.push(zil[i]);
  }
  return slides.length > 0 ? slides : [];
}

/** Cover URLs for seed projects tied to объекты Chaveta / Зиларт + остальные из тех же альбомов. */
export function coverImageForSlug(
  slug: string,
  chaveta: string[],
  zil: string[],
  fallback: string,
): string {
  const combined = [...chaveta, ...zil];
  if (combined.length === 0) return fallback;

  switch (slug) {
    case "nordic-loft":
      return chaveta[0] ?? zil[0] ?? fallback;
    case "terra-residence":
      return zil[0] ?? chaveta[0] ?? fallback;
    case "city-minimal":
      return chaveta[1] ?? chaveta[0] ?? zil[1] ?? zil[0] ?? fallback;
    case "atelier-noir":
      return zil[1] ?? zil[0] ?? chaveta[1] ?? fallback;
    case "meridian-office":
      return chaveta[2] ?? zil[2] ?? combined[Math.min(4, combined.length - 1)] ?? fallback;
    default:
      return combined[0] ?? fallback;
  }
}
