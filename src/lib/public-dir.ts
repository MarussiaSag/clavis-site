import { accessSync, constants } from "node:fs";
import { join } from "node:path";

const DEFAULT_PRODUCTION_PUBLIC = "/var/www/clavis-site/public";

/** Absolute path to the public/ folder used for uploads and static assets. */
export function getPublicDir(): string {
  const fromEnv = process.env.UPLOAD_PUBLIC_DIR?.trim();
  if (fromEnv) return fromEnv;

  // Standalone + PM2: process.cwd() is not always the runtime public root.
  if (process.env.NODE_ENV === "production") {
    return DEFAULT_PRODUCTION_PUBLIC;
  }

  return join(process.cwd(), "public");
}

export function publicPath(...parts: string[]): string {
  return join(getPublicDir(), ...parts);
}

export function assertPublicDirWritable(): void {
  const dir = getPublicDir();
  try {
    accessSync(dir, constants.W_OK);
  } catch {
    throw new Error(
      `Папка загрузок недоступна для записи: ${dir}. Задайте UPLOAD_PUBLIC_DIR в .env`,
    );
  }
}
