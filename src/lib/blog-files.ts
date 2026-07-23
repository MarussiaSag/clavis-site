import { mkdir, writeFile } from "node:fs/promises";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { optimizeUploadedImage } from "@/lib/optimize-image";
import {
  extensionForUploadedImage,
  normalizePublicAssetPath,
  sanitizeProjectSlug,
} from "@/lib/project-files";

const UPLOAD_FOLDER = "blog";
const MAX_BYTES = 15 * 1024 * 1024;
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

export type SaveBlogCoverResult =
  | { ok: true; coverUrl: string }
  | { ok: false; message: string };

/** Extra article photos under `public/blog/<slug>/` (excluding cover). */
export function listBlogGalleryImages(slug: string, coverImage?: string | null): string[] {
  const safeSlug = sanitizeProjectSlug(slug);
  if (!safeSlug) return [];

  const cover = coverImage?.trim() ? normalizePublicAssetPath(coverImage.trim()) : "";
  const dir = join(process.cwd(), "public", UPLOAD_FOLDER, safeSlug);

  try {
    return readdirSync(dir)
      .filter((name) => IMAGE_EXT.test(name) && !/^cover\./i.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
      .map((name) => `/${UPLOAD_FOLDER}/${safeSlug}/${name}`)
      .filter((url) => url !== cover);
  } catch {
    return [];
  }
}

export async function saveUploadedBlogCover(
  slug: string,
  cover: File | null,
  fallbackCoverUrl?: string | null,
  existingCoverUrl?: string | null,
): Promise<SaveBlogCoverResult> {
  const safeSlug = sanitizeProjectSlug(slug);
  if (!safeSlug) return { ok: false, message: "Некорректный slug (латиница, цифры, дефисы)." };

  let coverUrl = fallbackCoverUrl?.trim()
    ? normalizePublicAssetPath(fallbackCoverUrl.trim())
    : "";

  if (!cover?.size && !coverUrl) {
    if (existingCoverUrl?.trim()) {
      return { ok: true, coverUrl: normalizePublicAssetPath(existingCoverUrl.trim()) };
    }
    return { ok: false, message: "Загрузите обложку или укажите URL изображения." };
  }

  if (cover?.size) {
    if (cover.size > MAX_BYTES) {
      return { ok: false, message: "Обложка не больше 15 МБ." };
    }
    const sourceExt = extensionForUploadedImage(cover);
    if (!sourceExt) {
      return { ok: false, message: "Обложка: допустимы JPEG, PNG, WebP или AVIF." };
    }
    const postDir = join(process.cwd(), "public", UPLOAD_FOLDER, safeSlug);
    await mkdir(postDir, { recursive: true });
    try {
      const optimized = await optimizeUploadedImage(
        Buffer.from(await cover.arrayBuffer()),
        sourceExt,
      );
      await writeFile(join(postDir, `cover.${optimized.extension}`), optimized.buffer);
      coverUrl = `/${UPLOAD_FOLDER}/${safeSlug}/cover.${optimized.extension}`;
    } catch {
      return { ok: false, message: "Не удалось обработать обложку. Попробуйте другой файл." };
    }
  }

  return { ok: true, coverUrl };
}
