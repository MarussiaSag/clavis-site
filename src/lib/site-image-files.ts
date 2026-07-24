import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { optimizeUploadedImage } from "@/lib/optimize-image";
import { publicPath } from "@/lib/public-dir";
import {
  extensionForUploadedImage,
  normalizePublicAssetPath,
} from "@/lib/project-files";

const UPLOAD_FOLDER = "media";
/** Raw upload ceiling (camera originals). Compression runs before storage. */
const MAX_UPLOAD_BYTES = 40 * 1024 * 1024;
const MAX_STORED_BYTES = 15 * 1024 * 1024;

export type SaveSiteImageResult =
  | { ok: true; url: string }
  | { ok: false; message: string };

export async function saveUploadedSiteImage(
  slot: string,
  file: File | null,
  existingUrl?: string | null,
): Promise<SaveSiteImageResult> {
  const safeSlot = slot.replace(/[^a-z0-9._-]+/gi, "-").toLowerCase();
  if (!safeSlot) return { ok: false, message: "Некорректный слот изображения." };

  if (!file?.size) {
    if (existingUrl?.trim()) {
      return { ok: true, url: normalizePublicAssetPath(existingUrl.trim()) };
    }
    return { ok: false, message: "Загрузите изображение." };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: "Изображение не больше 40 МБ." };
  }
  const sourceExt = extensionForUploadedImage(file);
  if (!sourceExt) {
    return { ok: false, message: "Допустимы JPEG, PNG, WebP или AVIF." };
  }

  const dir = publicPath(UPLOAD_FOLDER);
  await mkdir(dir, { recursive: true });
  try {
    const { assertPublicDirWritable } = await import("@/lib/public-dir");
    assertPublicDirWritable();
    const optimized = await optimizeUploadedImage(
      Buffer.from(await file.arrayBuffer()),
      sourceExt,
    );
    if (optimized.buffer.length > MAX_STORED_BYTES) {
      return { ok: false, message: "После сжатия файл всё ещё больше 15 МБ. Уменьшите исходник." };
    }
    const filename = `${safeSlot}-${Date.now()}.${optimized.extension}`;
    const absolutePath = join(dir, filename);
    await writeFile(absolutePath, optimized.buffer);
    const { access } = await import("node:fs/promises");
    await access(absolutePath);
    console.info(
      `[saveUploadedSiteImage] publicDir=${dir} wrote ${absolutePath} (${optimized.buffer.length} bytes)`,
    );
    return { ok: true, url: `/${UPLOAD_FOLDER}/${filename}` };
  } catch (error) {
    console.error("[saveUploadedSiteImage]", error);
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Не удалось обработать изображение. Попробуйте другой файл.",
    };
  }
}
