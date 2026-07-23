import { getPrismaClient } from "@/lib/prisma";

export const SITE_IMAGE_SLOTS = [
  {
    slot: "home.founder",
    label: "Главная — фото основателя",
    group: "Главная",
    defaultUrl: "/media/home-founder.jpg",
  },
  {
    slot: "about.hero",
    label: "О нас — hero",
    group: "О нас",
    defaultUrl: "/media/about-hero.png",
  },
  {
    slot: "about.ribbon.1",
    label: "О нас — лента 1",
    group: "О нас",
    defaultUrl: "/media/about-ribbon-1.jpg",
  },
  {
    slot: "about.ribbon.2",
    label: "О нас — лента 2",
    group: "О нас",
    defaultUrl: "/media/about-ribbon-2.jpg",
  },
  {
    slot: "about.ribbon.3",
    label: "О нас — лента 3",
    group: "О нас",
    defaultUrl: "/media/about-ribbon-3.jpg",
  },
  {
    slot: "services.gallery.1",
    label: "Услуги — фото 1",
    group: "Услуги",
    defaultUrl: "/media/services-gallery-1.jpg",
  },
  {
    slot: "services.gallery.2",
    label: "Услуги — фото 2",
    group: "Услуги",
    defaultUrl: "/media/services-gallery-2.jpg",
  },
  {
    slot: "services.gallery.3",
    label: "Услуги — фото 3",
    group: "Услуги",
    defaultUrl: "/media/services-gallery-3.jpg",
  },
  {
    slot: "services.cta",
    label: "Услуги — фон CTA",
    group: "Услуги",
    defaultUrl: "/media/services-cta.jpg",
  },
  {
    slot: "contacts.hero",
    label: "Контакты — hero",
    group: "Контакты",
    defaultUrl: "/media/services-gallery-2.jpg",
  },
  {
    slot: "contacts.form",
    label: "Контакты — фото у формы",
    group: "Контакты",
    defaultUrl: "/media/services-gallery-3.jpg",
  },
] as const;

export type SiteImageSlot = (typeof SITE_IMAGE_SLOTS)[number]["slot"];

export type SiteImageMap = Record<SiteImageSlot, string>;

const DEFAULT_MAP = Object.fromEntries(
  SITE_IMAGE_SLOTS.map((item) => [item.slot, item.defaultUrl]),
) as SiteImageMap;

export async function ensureSiteImages() {
  const prisma = getPrismaClient();
  const existing = await prisma.siteImage.findMany({ select: { slot: true } });
  const existingSlots = new Set(existing.map((row) => row.slot));

  const missing = SITE_IMAGE_SLOTS.filter((item) => !existingSlots.has(item.slot));
  if (missing.length === 0) return;

  await prisma.siteImage.createMany({
    data: missing.map((item) => ({
      slot: item.slot,
      url: item.defaultUrl,
    })),
  });
}

export async function getSiteImages(): Promise<SiteImageMap> {
  await ensureSiteImages();
  const prisma = getPrismaClient();
  const rows = await prisma.siteImage.findMany();
  const map = { ...DEFAULT_MAP };
  for (const row of rows) {
    if (row.slot in map && row.url.trim()) {
      map[row.slot as SiteImageSlot] = row.url;
    }
  }
  return map;
}

export async function getSiteImage(slot: SiteImageSlot): Promise<string> {
  const images = await getSiteImages();
  return images[slot];
}
