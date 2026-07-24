import { getPrismaClient } from "@/lib/prisma";

export type HomeStudioHighlight = {
  id?: number;
  title: string;
  description: string;
};

export const HOME_STUDIO_HIGHLIGHTS_DEFAULTS: HomeStudioHighlight[] = [
  {
    title: "7 лет опыта",
    description: "Реализуем проекты с 2017 года",
  },
  {
    title: "150+ проектов",
    description: "Реализованных интерьеров по всему миру",
  },
  {
    title: "Комплексный подход",
    description: "От идеи до полной реализации под ключ",
  },
  {
    title: "Индивидуальный дизайн",
    description: "Учитываем ваш стиль, потребности и бюджет",
  },
];

export const MAX_STUDIO_HIGHLIGHTS = 4;

export async function ensureStudioHighlights() {
  const prisma = getPrismaClient();
  const count = await prisma.studioHighlight.count();
  if (count > 0) return;

  await prisma.studioHighlight.createMany({
    data: HOME_STUDIO_HIGHLIGHTS_DEFAULTS.map((item, index) => ({
      title: item.title,
      description: item.description,
      sortOrder: index,
    })),
  });
}

export async function getStudioHighlights(): Promise<HomeStudioHighlight[]> {
  try {
    await ensureStudioHighlights();
    const prisma = getPrismaClient();
    const rows = await prisma.studioHighlight.findMany({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      take: MAX_STUDIO_HIGHLIGHTS,
    });
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
    }));
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2021"
    ) {
      return HOME_STUDIO_HIGHLIGHTS_DEFAULTS;
    }
    throw error;
  }
}
