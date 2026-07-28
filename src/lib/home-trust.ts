/** Данные полосы доверия и публикации на главной. */

export const HOME_TRUST_CLIENTS = [
  { name: "Нордвуд", src: "/logos/clients/nordwood.svg" },
  { name: "Вольта", src: "/logos/clients/volta.svg" },
  { name: "Stone Lab", src: "/logos/clients/stone-lab.svg" },
  { name: "LINEA", src: "/logos/clients/linea.svg" },
] as const;

export const HOME_PRESS_FEATURE = {
  publication: "Marie Claire Maison",
  issue: "Июль 2026",
  title:
    "«Плотное, темное, немного дерзкое и при этом очень собранное»: гастробар на северо-западе Москвы",
  excerpt:
    "Онлайн-журнал Marie Claire Maison опубликовал материал о проекте Rib's 48 — бар-реберной студии Clavis у метро «Аэропорт». О пространстве без окон, ярких акцентах и визуальном «вступлении» к меню.",
  href: "https://mcmaison.ru/interior-hotels-restaurants/plotnoe-temnoe-nemnogo-derzkoe-i-pri-etom-ochen-sobrannoe-gastrobar-na-severo-zapade-moskvy/",
  hrefLabel: "Читать статью",
} as const;
