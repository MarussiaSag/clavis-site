/** Публичная навигация (без админки). */
export const PUBLIC_NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О нас" },
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
] as const;

/** Быстрые ссылки в hero (видимые на десктопе). */
export const HERO_QUICK_LINKS = [
  { href: "/portfolio#portfolio-archive", label: "Портфолио" },
  { href: "/contacts", label: "Контакты" },
] as const;
