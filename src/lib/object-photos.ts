import { readdirSync } from "node:fs";
import { join } from "node:path";

export const STOCK_FALLBACK_IMG = "/media/fallback-b.jpg";

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

/** URLs like `/media/photo.jpg` for existing files under `public/<folder>/`. */
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
  const media = listPublicFolderImages("media").filter((src) =>
    /showcase|fallback|ribbon|services-gallery|services-cta|quote/i.test(src),
  );
  return media.slice(0, limit);
}

/** @deprecated Seed covers — kept for compatibility if called. */
export function coverImageForSlug(
  _slug: string,
  _chaveta: string[],
  _zil: string[],
  fallback: string,
): string {
  return fallback;
}
