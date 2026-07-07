export type HomeStudioHighlight = {
  title: string;
  description: string;
  icon: "experience" | "projects" | "approach" | "design";
};

export const HOME_STUDIO_HIGHLIGHTS: HomeStudioHighlight[] = [
  {
    icon: "experience",
    title: "7 лет опыта",
    description: "Реализуем проекты с 2017 года",
  },
  {
    icon: "projects",
    title: "150+ проектов",
    description: "Реализованных интерьеров по всему миру",
  },
  {
    icon: "approach",
    title: "Комплексный подход",
    description: "От идеи до полной реализации под ключ",
  },
  {
    icon: "design",
    title: "Индивидуальный дизайн",
    description: "Учитываем ваш стиль, потребности и бюджет",
  },
];
