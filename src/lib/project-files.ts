import { mkdir, unlink, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { readdirSync } from "node:fs";
import { optimizeUploadedImage } from "@/lib/optimize-image";
import { publicPath } from "@/lib/public-dir";

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const UPLOAD_FOLDER = "projects";

/** Slug-safe folder name under `public/projects/`. */
export function sanitizeProjectSlug(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
  if (!trimmed || trimmed.length > 64) return null;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trimmed)) return null;
  return trimmed;
}

export function normalizePublicAssetPath(src: string): string {
  const s = src.trim();
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return s.startsWith("/") ? s : `/${s}`;
}

/** Image URLs under `/projects/<slug>/` for files uploaded from admin. */
export function listProjectImagesForSlug(slug: string): string[] {
  const safe = sanitizeProjectSlug(slug);
  if (!safe) return [];
  const dir = publicPath(UPLOAD_FOLDER, safe);
  try {
    return readdirSync(dir)
      .filter((name) => IMAGE_EXT.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
      .map((name) => `/${UPLOAD_FOLDER}/${safe}/${name}`);
  } catch {
    return [];
  }
}

/** Cover photo first (if recognized), then the rest sorted on disk. */
export function orderedProjectGallery(slug: string, coverImage: string): string[] {
  const cover = normalizePublicAssetPath(coverImage);
  const disk = listProjectImagesForSlug(slug);

  if (disk.length === 0) return cover ? [cover] : [];

  if (!cover.startsWith("/")) return [cover, ...disk];

  const rest = disk.filter((u) => u !== cover);
  if (!disk.includes(cover)) return [cover, ...disk];
  return [cover, ...rest];
}

/** Project photos only — no stock album padding. */
export function buildProjectInteriorGallery(
  slug: string,
  coverImage: string,
  minCount = 6,
): string[] {
  const primary = orderedProjectGallery(slug, coverImage);
  if (primary.length > 0) {
    return primary.slice(0, Math.max(minCount, primary.length));
  }
  return [normalizePublicAssetPath(coverImage)];
}

const MAX_UPLOAD_BYTES = 40 * 1024 * 1024;

export function extensionForUploadedImage(file: File): "jpg" | "png" | "webp" | "avif" | null {
  const fromName = file.name.match(/\.(jpe?g|png|webp|avif)$/i)?.[1]?.toLowerCase();
  if (fromName) return fromName === "jpeg" ? "jpg" : (fromName as "jpg" | "png" | "webp" | "avif");
  const mime = file.type;
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/avif") return "avif";
  return null;
}

function safeGalleryStem(originalName: string, index: number): string {
  const base = basename(originalName.replace(/\\/g, "/")).replace(/\.[^.]+$/, "");
  const cleaned = base
    .normalize("NFKD")
    .replace(/[^\w\s-]+/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 48);
  const stem = cleaned || "photo";
  return `gallery-${String(index).padStart(2, "0")}-${stem}`;
}

export type SaveGalleryResult =
  | { ok: true; coverUrl: string; projectDirRelative: string }
  | { ok: false; message: string };

/**
 * Saves `cover` as `cover.<ext>` and optional gallery images under `public/projects/<slug>/`.
 */
export async function saveUploadedProjectPhotos(
  slug: string,
  cover: File | null,
  gallery: File[],
  fallbackCoverUrl?: string | null,
): Promise<SaveGalleryResult> {
  const safeSlug = sanitizeProjectSlug(slug);
  if (!safeSlug) return { ok: false, message: "Некорректный slug (латиница, цифры, дефисы)." };

  let coverUrl = fallbackCoverUrl?.trim()
    ? normalizePublicAssetPath(fallbackCoverUrl.trim())
    : "";

  const projectDir = publicPath(UPLOAD_FOLDER, safeSlug);

  if (!cover?.size && !coverUrl) {
    return {
      ok: false,
      message:
        gallery.length > 0
          ? "С галереей нужна главная фотография (файл) или URL обложки."
          : "Загрузите главное изображение проекта или укажите URL обложки.",
    };
  }

  if (cover?.size || gallery.length > 0) {
    await mkdir(projectDir, { recursive: true });
  }

  if (cover?.size) {
    if (cover.size > MAX_UPLOAD_BYTES) {
      return { ok: false, message: "Главное фото не больше 40 МБ." };
    }
    const sourceExt = extensionForUploadedImage(cover);
    if (!sourceExt) {
      return {
        ok: false,
        message: "Главное фото: допустимы JPEG, PNG, WebP или AVIF.",
      };
    }
    try {
      const optimized = await optimizeUploadedImage(
        Buffer.from(await cover.arrayBuffer()),
        sourceExt,
      );
      const filename = `cover-${Date.now()}.${optimized.extension}`;
      await writeFile(join(projectDir, filename), optimized.buffer);
      coverUrl = `/${UPLOAD_FOLDER}/${safeSlug}/${filename}`;
    } catch {
      return { ok: false, message: "Не удалось обработать главное фото. Попробуйте другой файл." };
    }
  }

  let index = 0;
  for (const file of gallery) {
    if (!file.size) continue;
    index += 1;
    if (file.size > MAX_UPLOAD_BYTES) {
      return { ok: false, message: `Фото «${basename(file.name)}» больше 40 МБ.` };
    }
    const sourceExt = extensionForUploadedImage(file);
    if (!sourceExt) {
      return {
        ok: false,
        message: `Файл «${basename(file.name)}» должен быть JPEG, PNG, WebP или AVIF.`,
      };
    }
    const stem = safeGalleryStem(file.name, index);
    try {
      const optimized = await optimizeUploadedImage(
        Buffer.from(await file.arrayBuffer()),
        sourceExt,
      );
      await writeFile(
        join(projectDir, `${stem}-${Date.now()}.${optimized.extension}`),
        optimized.buffer,
      );
    } catch {
      return {
        ok: false,
        message: `Не удалось обработать фото «${basename(file.name)}». Попробуйте другой файл.`,
      };
    }
  }

  return { ok: true, coverUrl, projectDirRelative: `${UPLOAD_FOLDER}/${safeSlug}` };
}

export type SaveNamedImageResult =
  | { ok: true; url: string }
  | { ok: false; message: string };

/** Saves a single named image under `public/projects/<slug>/<stem>.<ext>`. */
export async function saveNamedProjectImage(
  slug: string,
  file: File,
  stem: string,
): Promise<SaveNamedImageResult> {
  const safeSlug = sanitizeProjectSlug(slug);
  if (!safeSlug) return { ok: false, message: "Некорректный slug." };
  if (!file.size) return { ok: false, message: "Пустой файл." };
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: `Фото «${basename(file.name)}» больше 40 МБ.` };
  }
  const sourceExt = extensionForUploadedImage(file);
  if (!sourceExt) {
    return {
      ok: false,
      message: `Файл «${basename(file.name)}» должен быть JPEG, PNG, WebP или AVIF.`,
    };
  }

  const safeStem = stem
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
  if (!safeStem) return { ok: false, message: "Некорректное имя файла." };

  const projectDir = publicPath(UPLOAD_FOLDER, safeSlug);
  await mkdir(projectDir, { recursive: true });

  try {
    const optimized = await optimizeUploadedImage(
      Buffer.from(await file.arrayBuffer()),
      sourceExt,
    );
    const filename = `${safeStem}-${Date.now()}.${optimized.extension}`;
    await writeFile(join(projectDir, filename), optimized.buffer);
    return { ok: true, url: `/${UPLOAD_FOLDER}/${safeSlug}/${filename}` };
  } catch {
    return { ok: false, message: `Не удалось обработать фото «${basename(file.name)}».` };
  }
}

/** Deletes one image under `public/projects/<slug>/`. Cover file is protected. */
export async function deleteProjectGalleryImage(
  slug: string,
  imageUrl: string,
  coverImage?: string | null,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const safeSlug = sanitizeProjectSlug(slug);
  if (!safeSlug) return { ok: false, message: "Некорректный slug." };

  const normalized = normalizePublicAssetPath(imageUrl);
  const expectedPrefix = `/${UPLOAD_FOLDER}/${safeSlug}/`;
  if (!normalized.startsWith(expectedPrefix)) {
    return { ok: false, message: "Нельзя удалить этот файл." };
  }

  if (coverImage && normalizePublicAssetPath(coverImage) === normalized) {
    return { ok: false, message: "Нельзя удалить обложку проекта. Сначала замените главное фото." };
  }

  const name = basename(normalized);
  if (!IMAGE_EXT.test(name) || /^cover/i.test(name)) {
    return { ok: false, message: "Можно удалять только фото галереи." };
  }

  try {
    await unlink(join(publicPath(UPLOAD_FOLDER, safeSlug), name));
    return { ok: true };
  } catch {
    return { ok: false, message: "Не удалось удалить файл." };
  }
}
