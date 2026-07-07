import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  extensionForUploadedImage,
  normalizePublicAssetPath,
  sanitizeProjectSlug,
} from "@/lib/project-files";

const UPLOAD_FOLDER = "blog";
const MAX_BYTES = 15 * 1024 * 1024;

export type SaveBlogCoverResult =
  | { ok: true; coverUrl: string }
  | { ok: false; message: string };

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
    const ext = extensionForUploadedImage(cover);
    if (!ext) {
      return { ok: false, message: "Обложка: допустимы JPEG, PNG, WebP или AVIF." };
    }
    const postDir = join(process.cwd(), "public", UPLOAD_FOLDER, safeSlug);
    await mkdir(postDir, { recursive: true });
    const buf = Buffer.from(await cover.arrayBuffer());
    await writeFile(join(postDir, `cover.${ext}`), buf);
    coverUrl = `/${UPLOAD_FOLDER}/${safeSlug}/cover.${ext}`;
  }

  return { ok: true, coverUrl };
}
