import { join } from "node:path";

/** Absolute path to the public/ folder used for uploads and static assets. */
export function getPublicDir(): string {
  const fromEnv = process.env.UPLOAD_PUBLIC_DIR?.trim();
  if (fromEnv) return fromEnv;
  return join(process.cwd(), "public");
}

export function publicPath(...parts: string[]): string {
  return join(getPublicDir(), ...parts);
}
