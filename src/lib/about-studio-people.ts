import { getPrismaClient } from "@/lib/prisma";

export type AboutStudioPersonItem = {
  id?: number;
  name: string;
  role: string;
  competencies: string;
};

export type AboutStudioPeopleData = {
  teamPhoto: string;
  people: AboutStudioPersonItem[];
};

export const ABOUT_STUDIO_TEAM_PHOTO_DEFAULT = "/media/team.jpg";

export const ABOUT_STUDIO_PEOPLE_DEFAULTS: AboutStudioPersonItem[] = [
  {
    name: "Морозова",
    role: "Руководитель студии",
    competencies: "Стратегия пространства, концепция, клиентский сценарий",
  },
  {
    name: "Карпов",
    role: "Лидирующий архитектор",
    competencies: "Концепция, планировочные решения, рабочие чертежи",
  },
  {
    name: "Вередникова",
    role: "Ведущий дизайнер",
    competencies: "Комплектация, материалы, авторский надзор",
  },
  {
    name: "Платонов",
    role: "Продюсер проектов",
    competencies: "Производство, сроки, координация подрядчиков",
  },
];

export const MAX_ABOUT_STUDIO_PEOPLE = 12;

export async function ensureAboutStudio() {
  const prisma = getPrismaClient();
  try {
    await prisma.aboutStudio.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        teamPhoto: ABOUT_STUDIO_TEAM_PHOTO_DEFAULT,
        people: {
          create: ABOUT_STUDIO_PEOPLE_DEFAULTS.map((item, index) => ({
            name: item.name,
            role: item.role,
            competencies: item.competencies,
            sortOrder: index,
          })),
        },
      },
      update: {},
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      // Parallel prerender race — row already created by another worker.
    } else {
      throw error;
    }
  }

  const peopleCount = await prisma.aboutStudioPerson.count({
    where: { aboutStudioId: 1 },
  });
  if (peopleCount === 0) {
    try {
      await prisma.aboutStudioPerson.createMany({
        data: ABOUT_STUDIO_PEOPLE_DEFAULTS.map((item, index) => ({
          name: item.name,
          role: item.role,
          competencies: item.competencies,
          sortOrder: index,
          aboutStudioId: 1,
        })),
      });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "P2002"
      ) {
        return;
      }
      throw error;
    }
  }
}

export async function getAboutStudioPeople(): Promise<AboutStudioPeopleData> {
  await ensureAboutStudio();
  const prisma = getPrismaClient();
  const studio = await prisma.aboutStudio.findUniqueOrThrow({
    where: { id: 1 },
    include: {
      people: {
        orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
        take: MAX_ABOUT_STUDIO_PEOPLE,
      },
    },
  });

  return {
    teamPhoto: studio.teamPhoto,
    people: studio.people.map((person) => ({
      id: person.id,
      name: person.name,
      role: person.role,
      competencies: person.competencies,
    })),
  };
}
