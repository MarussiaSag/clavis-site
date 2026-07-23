import { getPrismaClient } from "@/lib/prisma";

export type SocialLinkItem = {
  id?: number;
  label: string;
  href: string;
};

export type SiteContact = {
  city: string;
  address: string;
  mapUrl: string;
  phone: string;
  phoneHref: string;
  email: string;
  tagline: string;
  workingHours: {
    weekdays: string;
    weekend: string;
  };
  socialLinks: SocialLinkItem[];
  instagramFootnote: string;
};

export const SITE_SOCIAL_LINK_DEFAULTS: SocialLinkItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/clavis__design" },
  { label: "Telegram", href: "https://t.me/" },
];

export const SITE_CONTACT_DEFAULTS: Omit<SiteContact, "socialLinks"> & {
  socialLinks: SocialLinkItem[];
} = {
  city: "Москва",
  address: "г. Москва, Большая Новодмитровская, 36, стр. 12, офис 401",
  mapUrl: "https://yandex.ru/maps/?text=Большая%20Новодмитровская%2036%20стр%2012",
  phone: "+7 (495) 000-00-00",
  phoneHref: "tel:+74950000000",
  email: "studio@clavis.ru",
  tagline: "Дизайн интерьера под ключ — от брифа до авторского надзора",
  workingHours: {
    weekdays: "Пн – Пт 10:00 – 19:00",
    weekend: "Сб – Вс по предварительной договоренности",
  },
  socialLinks: SITE_SOCIAL_LINK_DEFAULTS,
  instagramFootnote: "тут будет описание небольшое",
};

export function phoneToTelHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (!digits) return "tel:";
  return digits.startsWith("+") || digits.startsWith("tel:") ? `tel:${digits.replace(/^tel:/, "")}` : `tel:+${digits}`;
}

export function getInstagramHref(contact: SiteContact) {
  const link = contact.socialLinks.find((item) => item.label.toLowerCase() === "instagram");
  return link?.href ?? "";
}

export function socialLinksFromContact(contact: SiteContact) {
  return contact.socialLinks.filter((item) => item.label.trim() && item.href.trim());
}

export async function ensureSiteSettings() {
  const prisma = getPrismaClient();
  const d = SITE_CONTACT_DEFAULTS;
  const existing = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!existing) {
    await prisma.siteSettings.create({
      data: {
        id: 1,
        city: d.city,
        address: d.address,
        mapUrl: d.mapUrl,
        phone: d.phone,
        phoneHref: d.phoneHref,
        email: d.email,
        tagline: d.tagline,
        hoursWeekdays: d.workingHours.weekdays,
        hoursWeekend: d.workingHours.weekend,
        instagramFootnote: d.instagramFootnote,
      },
    });
  }

  const socialCount = await prisma.socialLink.count();
  if (socialCount === 0) {
    await prisma.socialLink.createMany({
      data: SITE_SOCIAL_LINK_DEFAULTS.map((item, index) => ({
        label: item.label,
        href: item.href,
        sortOrder: index,
      })),
    });
  }
}

export async function getSiteContact(): Promise<SiteContact> {
  await ensureSiteSettings();
  const prisma = getPrismaClient();
  const [row, socialRows] = await Promise.all([
    prisma.siteSettings.findUniqueOrThrow({ where: { id: 1 } }),
    prisma.socialLink.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] }),
  ]);

  return {
    city: row.city,
    address: row.address,
    mapUrl: row.mapUrl,
    phone: row.phone,
    phoneHref: row.phoneHref,
    email: row.email,
    tagline: row.tagline,
    workingHours: {
      weekdays: row.hoursWeekdays,
      weekend: row.hoursWeekend,
    },
    socialLinks: socialRows.map((item) => ({
      id: item.id,
      label: item.label,
      href: item.href,
    })),
    instagramFootnote: row.instagramFootnote,
  };
}
