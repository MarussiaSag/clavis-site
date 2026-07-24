/** Max long edge for admin uploads — enough for full-bleed heroes, small on disk. */
const MAX_EDGE = 2400;
const WEBP_QUALITY = 82;

export type OptimizedImage = {
  buffer: Buffer;
  extension: "jpg" | "png" | "webp" | "avif";
};

type SourceExt = OptimizedImage["extension"];

function sharpOptimizeEnabled() {
  // Opt-in: on many VPS sharp/libvips is broken and produces missing/corrupt files.
  // Admin already compresses in the browser before upload.
  return process.env.SHARP_OPTIMIZE === "true";
}

/**
 * Optionally resize/encode with sharp. By default keeps the (already client-compressed) bytes.
 */
export async function optimizeUploadedImage(
  input: Buffer,
  sourceExtension: SourceExt,
): Promise<OptimizedImage> {
  if (!sharpOptimizeEnabled()) {
    return { buffer: input, extension: sourceExtension };
  }

  try {
    const sharp = (await import("sharp")).default;
    const image = sharp(input, { failOn: "none" }).rotate();
    const meta = await image.metadata();

    let pipeline = image;
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    if (width > MAX_EDGE || height > MAX_EDGE) {
      pipeline = pipeline.resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    const webpBuffer = await pipeline
      .webp({
        quality: WEBP_QUALITY,
        effort: 4,
      })
      .toBuffer();

    if (webpBuffer.length < input.length) {
      return { buffer: webpBuffer, extension: "webp" };
    }

    if (width <= MAX_EDGE && height <= MAX_EDGE) {
      return { buffer: input, extension: sourceExtension };
    }

    return { buffer: webpBuffer, extension: "webp" };
  } catch (error) {
    console.error("[optimizeUploadedImage] sharp unavailable, keeping original upload", error);
    return { buffer: input, extension: sourceExtension };
  }
}
