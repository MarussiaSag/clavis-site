import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { optimizeUploadedImage } from "@/lib/optimize-image";
import {
  extensionForUploadedImage,
  normalizePublicAssetPath,
} from "@/lib/project-files";

const UPLOAD_FOLDER = "media";
const MAX_BYTES = 15 * 1024 * 1024;

export type SaveStudioTeamPhotoResult =
  | { ok: true; teamPhotoUrl: string }
  | { ok: false; message: string };

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
    if (file.size > MAX_BYTES) {
      return { ok: false, message: "Фото команды не больше 15 МБ." };
    }
    const sourceExt = extensionForUploadedImage(file);
    if (!sourceExt) {
      return { ok: false, message: "Фото: допустимы JPEG, PNG, WebP или AVIF." };
    }
    const dir = join(process.cwd(), "public", UPLOAD_FOLDER);
    await mkdir(dir, { recursive: true });
    try {
      const optimized = await optimizeUploadedImage(
        Buffer.from(await file.arrayBuffer()),
        sourceExt,
      );
      await writeFile(join(dir, `team.${optimized.extension}`), optimized.buffer);
      teamPhotoUrl = `/${UPLOAD_FOLDER}/team.${optimized.extension}`;
    } catch {
      return { ok: false, message: "Не удалось обработать фото. Попробуйте другой файл." };
    }
  }

  return { ok: true, teamPhotoUrl };
}
