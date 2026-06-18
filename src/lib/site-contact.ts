export const SITE_CONTACT = {
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
  instagram: "https://instagram.com/",
  telegram: "https://t.me/",
  pinterest: "https://pinterest.com/",
  behance: "https://www.behance.net/",
} as const;

export const SITE_SOCIAL_LINKS = [
  { label: "Instagram", href: SITE_CONTACT.instagram },
  { label: "Telegram", href: SITE_CONTACT.telegram },
  { label: "Pinterest", href: SITE_CONTACT.pinterest },
  { label: "Behance", href: SITE_CONTACT.behance },
] as const;
