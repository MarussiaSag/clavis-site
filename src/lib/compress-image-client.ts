const MAX_EDGE = 2400;
const JPEG_QUALITY = 0.82;
/** Skip compression for already-small files. */
const MIN_BYTES_TO_COMPRESS = 400_000;

function loadImageBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file);
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Не удалось сжать изображение"));
        else resolve(blob);
      },
      type,
      quality,
    );
  });
}

/**
 * Resize and re-encode an image in the browser before upload.
 * Cuts multipart payload so Server Actions don't truncate mid-form.
 */
export async function compressImageFile(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return file;
  }
  if (file.size < MIN_BYTES_TO_COMPRESS) {
    return file;
  }

  try {
    const bitmap = await loadImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await canvasToBlob(canvas, "image/jpeg", JPEG_QUALITY);
    if (blob.size >= file.size) {
      return file;
    }

    const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
    return new File([blob], `${baseName}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch {
    return file;
  }
}

/** Compress every File value in FormData (keeps non-file fields as-is). */
export async function compressFormDataImages(formData: FormData): Promise<FormData> {
  const next = new FormData();

  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.size > 0) {
      next.append(key, await compressImageFile(value));
    } else {
      next.append(key, value);
    }
  }

  return next;
}
