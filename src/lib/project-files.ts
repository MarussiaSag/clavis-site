import { mkdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { readdirSync } from "node:fs";

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
  const dir = join(process.cwd(), "public", UPLOAD_FOLDER, safe);
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

const MAX_BYTES = 15 * 1024 * 1024;

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

  const projectDir = join(process.cwd(), "public", UPLOAD_FOLDER, safeSlug);

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
    if (cover.size > MAX_BYTES) {
      return { ok: false, message: "Главное фото не больше 15 МБ." };
    }
    const ext = extensionForUploadedImage(cover);
    if (!ext) {
      return {
        ok: false,
        message: "Главное фото: допустимы JPEG, PNG, WebP или AVIF.",
      };
    }
    const buf = Buffer.from(await cover.arrayBuffer());
    await writeFile(join(projectDir, `cover.${ext}`), buf);
    coverUrl = `/${UPLOAD_FOLDER}/${safeSlug}/cover.${ext}`;
  }

  let index = 0;
  for (const file of gallery) {
    if (!file.size) continue;
    index += 1;
    if (file.size > MAX_BYTES) {
      return { ok: false, message: `Фото «${basename(file.name)}» больше 15 МБ.` };
    }
    const ext = extensionForUploadedImage(file);
    if (!ext) {
      return {
        ok: false,
        message: `Файл «${basename(file.name)}» должен быть JPEG, PNG, WebP или AVIF.`,
      };
    }
    const stem = safeGalleryStem(file.name, index);
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(join(projectDir, `${stem}.${ext}`), buf);
  }

  return { ok: true, coverUrl, projectDirRelative: `${UPLOAD_FOLDER}/${safeSlug}` };
}
