/** Моковые данные полосы доверия и публикации на главной (заменить на CMS / реальные ссылки). */

export const HOME_TRUST_CLIENTS = [
  { name: "Нордвуд", src: "/logos/clients/nordwood.svg" },
  { name: "Вольта", src: "/logos/clients/volta.svg" },
  { name: "Stone Lab", src: "/logos/clients/stone-lab.svg" },
  { name: "LINEA", src: "/logos/clients/linea.svg" },
] as const;

export const HOME_PRESS_FEATURE = {
  publication: "INTERIOR+",
  issue: "Весна 2026",
  title: "Ключ к характеру: как CLAVIS собирает интерьер без лишнего декора",
  excerpt:
    "Материал, свет и планировка — три опоры проекта. В материале журнала — разбор апартаментов в ЖК ЗилАрт и подход студии к частным заказам.",
  href: "#",
  hrefLabel: "Читать в журнале",
} as const;
