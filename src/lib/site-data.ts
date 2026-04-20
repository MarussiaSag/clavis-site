import { prisma } from "@/lib/prisma";

export async function ensureSeedData() {
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
      coverImage: "/productImg/istockphoto-1372682637-2048x2048.jpg",
      description:
        "Камерный сигарный лаундж с благородными фактурами, глубокими оттенками и мягким сценарием света.",
    },
    update: {
      title: "Chaveta",
      category: "Сигарный лаундж",
      location: "Москва",
      year: 2025,
      coverImage: "/productImg/istockphoto-1372682637-2048x2048.jpg",
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
      coverImage: "/productImg/istockphoto-1351020196-2048x2048.jpg",
      description:
        "Интерьер кафе с выразительной подачей материалов, тактильной отделкой и собранной атмосферой.",
    },
    update: {
      title: "Rib's 48",
      category: "Кафе",
      location: "Москва",
      year: 2024,
      coverImage: "/productImg/istockphoto-1351020196-2048x2048.jpg",
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
      coverImage: "/productImg/istockphoto-1824615178-2048x2048.jpg",
      description:
        "Современные апартаменты с архитектурной логикой, чистой геометрией и спокойной премиальной палитрой.",
    },
    update: {
      title: "ЖК ЗилАрт",
      category: "Апартаменты",
      location: "Москва",
      year: 2026,
      coverImage: "/productImg/istockphoto-1824615178-2048x2048.jpg",
      description:
        "Современные апартаменты с архитектурной логикой, чистой геометрией и спокойной премиальной палитрой.",
    },
  });

  await prisma.project.upsert({
    where: { slug: "atelier-noir" },
    create: {
      slug: "atelier-noir",
      title: "Тимирязевский",
      category: "Квартира",
      location: "Жилой комплекс",
      year: 2026,
      coverImage: "/productImg/istockphoto-2159352095-2048x2048.jpg",
      description:
        "Квартира в жилом комплексе с акцентом на комфорт, функциональность и мягкий ритм пространства.",
    },
    update: {
      title: "Тимирязевский",
      category: "Квартира",
      location: "Жилой комплекс",
      year: 2026,
      coverImage: "/productImg/istockphoto-2159352095-2048x2048.jpg",
      description:
        "Квартира в жилом комплексе с акцентом на комфорт, функциональность и мягкий ритм пространства.",
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
