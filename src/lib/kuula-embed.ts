/** Kuula post/profile links must use `/share/` instead of `/post/` for iframe embeds. */
export function kuulaEmbedSrc(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (!/^kuula\.co$/i.test(url.hostname.replace(/^www\./, ""))) return null;

    url.pathname = url.pathname.replace(/^\/post\//, "/share/");
    if (!url.pathname.startsWith("/share/")) return null;

    if (!url.search) {
      url.search = "logo=0&info=0&fs=1&vr=1&zoom=1&thumbs=1";
    }

    return url.toString();
  } catch {
    return null;
  }
}

export const DEFAULT_VIRTUAL_TOUR_URL = "https://kuula.co/post/n1/collection/7MCjG";
