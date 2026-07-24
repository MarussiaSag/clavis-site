import { mkdir, readdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { optimizeUploadedImage } from "@/lib/optimize-image";
import { publicPath } from "@/lib/public-dir";
import {
  extensionForUploadedImage,
  normalizePublicAssetPath,
} from "@/lib/project-files";

const UPLOAD_FOLDER = "media";
const MAX_UPLOAD_BYTES = 40 * 1024 * 1024;
const MAX_STORED_BYTES = 15 * 1024 * 1024;

export type SaveStudioTeamPhotoResult =
  | { ok: true; teamPhotoUrl: string }
  | { ok: false; message: string };

async function removeOldTeamPhotos(dir: string) {
  try {
    const existing = await readdir(dir);
    await Promise.all(
      existing
        .filter((name) => /^team([.-]|$)/i.test(name))
        .map((name) => unlink(join(dir, name)).catch(() => undefined)),
    );
  } catch {
    // ignore cleanup errors
  }
}

export async function saveUploadedStudioTeamPhoto(
  file: File | null,
  fallbackUrl?: string | null,
  existingUrl?: string | null,
): Promise<SaveStudioTeamPhotoResult> {
  let teamPhotoUrl = fallbackUrl?.trim()
    ? normalizePublicAssetPath(fallbackUrl.trim())
    : "";

  if (!file?.size && !teamPhotoUrl) {
    if (existingUrl?.trim()) {
      return { ok: true, teamPhotoUrl: normalizePublicAssetPath(existingUrl.trim()) };
    }
    return { ok: false, message: "Загрузите общее фото команды или укажите URL." };
  }

  if (file?.size) {
    if (file.size > MAX_UPLOAD_BYTES) {
      return { ok: false, message: "Фото команды не больше 40 МБ." };
    }
    const sourceExt = extensionForUploadedImage(file);
    if (!sourceExt) {
      return { ok: false, message: "Фото: допустимы JPEG, PNG, WebP или AVIF." };
    }
    try {
      const optimized = await optimizeUploadedImage(
        Buffer.from(await file.arrayBuffer()),
        sourceExt,
      );
      if (optimized.buffer.length > MAX_STORED_BYTES) {
        return { ok: false, message: "После сжатия фото всё ещё больше 15 МБ." };
      }
      const dir = publicPath(UPLOAD_FOLDER);
      await mkdir(dir, { recursive: true });
      const { assertPublicDirWritable } = await import("@/lib/public-dir");
      assertPublicDirWritable();
      await removeOldTeamPhotos(dir);

      const filename = `team-${Date.now()}.${optimized.extension}`;
      const absolutePath = join(dir, filename);
      await writeFile(absolutePath, optimized.buffer);
      const { access } = await import("node:fs/promises");
      await access(absolutePath);
      console.info(
        `[saveUploadedStudioTeamPhoto] publicDir=${dir} wrote ${absolutePath} (${optimized.buffer.length} bytes)`,
      );
      teamPhotoUrl = `/${UPLOAD_FOLDER}/${filename}`;
    } catch (error) {
      console.error("[saveUploadedStudioTeamPhoto]", error);
      return { ok: false, message: "Не удалось обработать фото. Попробуйте другой файл." };
    }
  }

  return { ok: true, teamPhotoUrl };
}
