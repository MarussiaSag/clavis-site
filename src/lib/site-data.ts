import { prisma } from "@/lib/prisma";
import {
  STOCK_FALLBACK_IMG,
  coverImageForSlug,
  listPublicFolderImages,
} from "@/lib/object-photos";

export async function ensureSeedData() {
  const chaveta = listPublicFolderImages("chaveta");
  const zil = listPublicFolderImages("zil");
  await prisma.siteContent.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      heroTitle: "Interior Stories",
      heroSubtitle:
        "Создаю интерьеры как редакционные развороты: выразительно, функционально и с индивидуальным почерком.",
      aboutTitle: "Обо мне",
      aboutText:
        "Я дизайнер интерьеров, работаю с жилыми и коммерческими пространствами. Мой подход сочетает архитектурную логику, композицию и внимание к привычкам клиента.",
    },
    update: {},
  });

  await prisma.project.upsert({
    where: { slug: "nordic-loft" },
    create: {
      slug: "nordic-loft",
      title: "Chaveta",
      category: "Сигарный лаундж",
      location: "Москва",
      year: 2025,
      coverImage: coverImageForSlug("nordic-loft", chaveta, zil, STOCK_FALLBACK_IMG),
      description:
        "Камерный сигарный лаундж с благородными фактурами, глубокими оттенками и мягким сценарием света.",
    },
    update: {
      title: "Chaveta",
      category: "Сигарный лаундж",
      location: "Москва",
      year: 2025,
      coverImage: coverImageForSlug("nordic-loft", chaveta, zil, STOCK_FALLBACK_IMG),
      description:
        "Камерный сигарный лаундж с благородными фактурами, глубокими оттенками и мягким сценарием света.",
    },
  });

  await prisma.project.upsert({
    where: { slug: "city-minimal" },
    create: {
      slug: "city-minimal",
      title: "Rib's 48",
      category: "Кафе",
      location: "Москва",
      year: 2024,
      coverImage: coverImageForSlug("city-minimal", chaveta, zil, STOCK_FALLBACK_IMG),
      description:
        "Интерьер кафе с выразительной подачей материалов, тактильной отделкой и собранной атмосферой.",
    },
    update: {
      title: "Rib's 48",
      category: "Кафе",
      location: "Москва",
      year: 2024,
      coverImage: coverImageForSlug("city-minimal", chaveta, zil, STOCK_FALLBACK_IMG),
      description:
        "Интерьер кафе с выразительной подачей материалов, тактильной отделкой и собранной атмосферой.",
    },
  });

  await prisma.project.upsert({
    where: { slug: "terra-residence" },
    create: {
      slug: "terra-residence",
      title: "ЖК ЗилАрт",
      category: "Апартаменты",
      location: "Москва",
      year: 2026,
      coverImage: coverImageForSlug("terra-residence", chaveta, zil, STOCK_FALLBACK_IMG),
      description:
        "Современные апартаменты с архитектурной логикой, чистой геометрией и спокойной премиальной палитрой.",
      areaLabel: "118 м²",
      durationLabel: "12 недель",
      taskBrief:
        "Задача — собрать спокойный премиальный интерьер в типовой планировке: выделить зону гостиной, сохранить ощущение воздуха и заложить сценарии света под разный ритм дня. Материалы — сдержанные, с акцентом на тактильность камня и дерева, без декоративного шума.",
      isFeaturedHome: true,
    },
    update: {
      title: "ЖК ЗилАрт",
      category: "Апартаменты",
      location: "Москва",
      year: 2026,
      coverImage: coverImageForSlug("terra-residence", chaveta, zil, STOCK_FALLBACK_IMG),
      description:
        "Современные апартаменты с архитектурной логикой, чистой геометрией и спокойной премиальной палитрой.",
      areaLabel: "118 м²",
      durationLabel: "12 недель",
      taskBrief:
        "Задача — собрать спокойный премиальный интерьер в типовой планировке: выделить зону гостиной, сохранить ощущение воздуха и заложить сценарии света под разный ритм дня. Материалы — сдержанные, с акцентом на тактильность камня и дерева, без декоративного шума.",
      isFeaturedHome: true,
    },
  });

  await prisma.project.updateMany({
    where: { slug: { not: "terra-residence" } },
    data: { isFeaturedHome: false },
  });

  await prisma.project.upsert({
    where: { slug: "atelier-noir" },
    create: {
      slug: "atelier-noir",
      title: "Тимирязевский",
      category: "Квартира",
      location: "Москва",
      year: 2026,
      coverImage: coverImageForSlug("atelier-noir", chaveta, zil, STOCK_FALLBACK_IMG),
      description:
        "Квартира в жилом комплексе с акцентом на комфорт, функциональность и мягкий ритм пространства.",
      areaLabel: "76 м²",
      durationLabel: "10 недель",
      taskBrief:
        "Интерьер, созданный для повседневной жизни. Пространство собрано вокруг спокойной палитры, тактильных материалов и продуманного света — без декоративного шума, с акцентом на удобство и ощущение дома.",
    },
    update: {
      title: "Тимирязевский",
      category: "Квартира",
      location: "Москва",
      year: 2026,
      coverImage: coverImageForSlug("atelier-noir", chaveta, zil, STOCK_FALLBACK_IMG),
      description:
        "Квартира в жилом комплексе с акцентом на комфорт, функциональность и мягкий ритм пространства.",
      areaLabel: "76 м²",
      durationLabel: "10 недель",
      taskBrief:
        "Интерьер, созданный для повседневной жизни. Пространство собрано вокруг спокойной палитры, тактильных материалов и продуманного света — без декоративного шума, с акцентом на удобство и ощущение дома.",
    },
  });

  await prisma.project.upsert({
    where: { slug: "meridian-office" },
    create: {
      slug: "meridian-office",
      title: "Meridian Office",
      category: "Офис",
      location: "Москва",
      year: 2025,
      coverImage: coverImageForSlug("meridian-office", chaveta, zil, STOCK_FALLBACK_IMG),
      description:
        "Рабочее пространство с ясной зонировкой, нейтральной палитрой и акцентами фактуры.",
    },
    update: {
      title: "Meridian Office",
      category: "Офис",
      location: "Москва",
      year: 2025,
      coverImage: coverImageForSlug("meridian-office", chaveta, zil, STOCK_FALLBACK_IMG),
      description:
        "Рабочее пространство с ясной зонировкой, нейтральной палитрой и акцентами фактуры.",
    },
  });
}

export async function getSiteData() {
  await ensureSeedData();

  const [content, projects] = await Promise.all([
    prisma.siteContent.findUniqueOrThrow({ where: { id: 1 } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return { content, projects };
}
