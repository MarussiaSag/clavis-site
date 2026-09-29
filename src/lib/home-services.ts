export type HomeServiceItem = {
  title: string;
  description: string;
  href: string;
};

export const HOME_SERVICES_INTRO =
  "Начинаем с диалога: понимаем, как будет жить пространство, и выстраиваем работу вокруг задач клиента.";

export const HOME_SERVICES: HomeServiceItem[] = [
  {
    title: "Жилые интерьеры",
    description:
      "Полный цикл дизайна домов и квартир — от концепции до мебели и монтажа.",
    href: "/services",
  },
  {
    title: "Гостеприимство и коммерция",
    description:
      "Рестораны, отели и офисы под атмосферу, долговечность и ритм конкретного бизнеса.",
    href: "/services",
  },
  {
    title: "Арт и предметный кураторинг",
    description:
      "Подбор искусства, мебели и объектов — каждый предмет в отношении к целому.",
    href: "/services",
  },
  {
    title: "Дизайн-консультация",
    description:
      "Сопровождение проектов в процессе: материалы, планировка и пропорции.",
    href: "/services",
  },
];

/** @deprecated Используйте HOME_SERVICES */
export const HOME_SERVICE_TILES = [
  { label: "Квартира", href: "/services" },
  { label: "Офис", href: "/services" },
  { label: "Коммерция", href: "/services" },
  { label: "Под ключ", href: "/services" },
] as const;
