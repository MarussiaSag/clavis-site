import { mkdir, unlink, writeFile } from "node:fs/promises";
import { readdirSync } from "node:fs";
import { basename, join } from "node:path";
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

export type SaveBlogGalleryResult =
  | { ok: true; urls: string[] }
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

function nextGalleryIndex(dir: string): number {
  try {
    const indexes = readdirSync(dir)
      .map((name) => name.match(/^gallery-(\d+)/i)?.[1])
      .filter(Boolean)
      .map((value) => Number(value));
    if (indexes.length === 0) return 1;
    return Math.max(...indexes) + 1;
  } catch {
    return 1;
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

/** Appends gallery images as `gallery-NN.webp` under `public/blog/<slug>/`. */
export async function saveUploadedBlogGallery(
  slug: string,
  files: File[],
): Promise<SaveBlogGalleryResult> {
  const safeSlug = sanitizeProjectSlug(slug);
  if (!safeSlug) return { ok: false, message: "Некорректный slug (латиница, цифры, дефисы)." };
  if (files.length === 0) return { ok: true, urls: [] };

  const postDir = join(process.cwd(), "public", UPLOAD_FOLDER, safeSlug);
  await mkdir(postDir, { recursive: true });

  let index = nextGalleryIndex(postDir);
  const urls: string[] = [];

  for (const file of files) {
    if (!file?.size) continue;
    if (file.size > MAX_BYTES) {
      return { ok: false, message: "Фото галереи не больше 15 МБ каждое." };
    }
    const sourceExt = extensionForUploadedImage(file);
    if (!sourceExt) {
      return { ok: false, message: "Галерея: допустимы JPEG, PNG, WebP или AVIF." };
    }
    try {
      const optimized = await optimizeUploadedImage(
        Buffer.from(await file.arrayBuffer()),
        sourceExt,
      );
      const filename = `gallery-${String(index).padStart(2, "0")}.${optimized.extension}`;
      await writeFile(join(postDir, filename), optimized.buffer);
      urls.push(`/${UPLOAD_FOLDER}/${safeSlug}/${filename}`);
      index += 1;
    } catch {
      return { ok: false, message: "Не удалось обработать фото галереи. Попробуйте другой файл." };
    }
  }

  return { ok: true, urls };
}

export async function deleteBlogGalleryImage(
  slug: string,
  imageUrl: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const safeSlug = sanitizeProjectSlug(slug);
  if (!safeSlug) return { ok: false, message: "Некорректный slug." };

  const normalized = normalizePublicAssetPath(imageUrl);
  const expectedPrefix = `/${UPLOAD_FOLDER}/${safeSlug}/`;
  if (!normalized.startsWith(expectedPrefix)) {
    return { ok: false, message: "Нельзя удалить этот файл." };
  }

  const name = basename(normalized);
  if (!IMAGE_EXT.test(name) || /^cover\./i.test(name)) {
    return { ok: false, message: "Можно удалять только фото галереи." };
  }

  try {
    await unlink(join(process.cwd(), "public", UPLOAD_FOLDER, safeSlug, name));
    return { ok: true };
  } catch {
    return { ok: false, message: "Не удалось удалить файл." };
  }
}

export function galleryFilesFromFormData(formData: FormData, fieldName = "galleryFiles"): File[] {
  return formData
    .getAll(fieldName)
    .filter((item): item is File => item instanceof File && item.size > 0);
}
