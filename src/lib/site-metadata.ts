import type { Metadata } from "next";

export const SITE_NAME = "Clavis";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://clavis-interior.ru";

export const SITE_TITLE =
  "Clavis — дизайн интерьера в Москве | квартиры, офисы, коммерция";

export const SITE_DESCRIPTION =
  "Студия дизайна интерьера Clavis в Москве: проектирование и реализация квартир, апартаментов, офисов и коммерческих пространств — от брифа и концепции до авторского надзора.";

export const SITE_KEYWORDS = [
  "дизайн интерьера Москва",
  "студия дизайна интерьера",
  "дизайн квартиры",
  "дизайн коммерческих помещений",
  "авторский надзор",
  "Clavis",
];

/** Default social preview image (relative to site root). */
export const SITE_OG_IMAGE = "/media/showcase-hero.jpg";

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image || SITE_OG_IMAGE);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "design",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: absoluteUrl(SITE_OG_IMAGE),
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl(SITE_OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/fav/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/fav/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/fav/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/fav/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/fav/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/fav/site.webmanifest",
};
