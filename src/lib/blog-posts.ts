import type { BlogPost as BlogPostModel } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  publishedAt: string;
  readingMinutes: number;
};

const BLOG_SEED_POSTS: BlogPost[] = [
  {
    slug: "trendy-2024",
    title: "Тренды 2024: что останется в интерьере надолго",
    excerpt:
      "Разбираем материалы, свет и планировочные приёмы, которые не выглядят устаревшими уже через сезон.",
    content: [
      "В 2024 году в приоритете остаются натуральные фактуры, спокойная палитра и мебель с читаемой геометрией. Тренд на «быстрый декор» уступает место продуманной базе: пол, стены, встроенное освещение.",
      "Мы чаще закладываем в проекты крупные текстуры — шпон, камень, льняные ткани — и оставляем акценты точечными: одна скульптурная лампа, авторский стол, картина. Так интерьер легче обновлять без полного ремонта.",
      "Если вы планируете ремонт сейчас, имеет смысл инвестировать в качественную инженерию и световые сценарии. Именно они формируют ощущение «дорого и спокойно» лучше, чем временные модные детали.",
    ],
    coverImage: "/media/blog-trendy-2024.jpg",
    publishedAt: "2024-03-12",
    readingMinutes: 6,
  },
  {
    slug: "svet-v-interere",
    title: "Свет в интерьере: три сценария для квартиры",
    excerpt:
      "Как совместить общий, рабочий и акцентный свет, чтобы пространство работало утром, днём и вечером.",
    content: [
      "Хороший свет начинается с планировки. Мы проектируем три уровня: базовый потолочный, функциональный у зон хранения и кухни, декоративный — для атмосферы.",
      "В гостиной часто достаточно регулируемых треков и торшера у кресла. В спальне — мягкий рассеянный потолок и бра с тёплой температурой 2700–3000K.",
      "Важно заложить диммирование и отдельные группы уже на этапе электрики. Это дешевле, чем переделывать после чистовой отделки.",
    ],
    coverImage: "/media/blog-svet-v-interere.jpg",
    publishedAt: "2024-05-28",
    readingMinutes: 5,
  },
  {
    slug: "plan-kvartiry",
    title: "Планировка квартиры: 5 ошибок, которые дорого исправлять",
    excerpt:
      "Нестандартные ниши, узкие коридоры и перегруженные санузлы — типичные решения, от которых лучше отказаться на старте.",
    content: [
      "Первая ошибка — оставлять длинный тёмный коридор без функции. Его можно разгрузить встроенным хранением, зеркалом и светом.",
      "Вторая — совмещать кухню и гостиную без зонирования. Даже в студии помогают уровень пола, остров или перегородка из стекла.",
      "Третья — экономить на санузле. Продуманная гидроизоляция, вентиляция и ниши под инсталляцию окупаются комфортом и сроком службы отделки.",
    ],
    coverImage: "/media/blog-plan-kvartiry.jpg",
    publishedAt: "2024-09-04",
    readingMinutes: 7,
  },
  {
    slug: "materialy-otdelki",
    title: "Материалы отделки: как выбрать без визуального шума",
    excerpt:
      "Принцип «не больше трёх активных фактур в одной комнате» и примеры сочетаний для спокойного интерьера.",
    content: [
      "Мы начинаем подбор материалов с палитры стен и пола — они занимают до 70% визуального поля. Древесина, штукатурка и камень не должны конкурировать по рисунку.",
      "Для кухни и влажных зон выбираем покрытия с понятным уходом: керамогранит, кварц, матовые лаки. Декоративные панели оставляем для сухих зон.",
      "Образцы всегда смотрим при дневном и искусственном свете в помещении заказчика — так меньше сюрпризов на объекте.",
    ],
    coverImage: "/media/blog-materialy-otdelki.jpg",
    publishedAt: "2025-01-18",
    readingMinutes: 6,
  },
  {
    slug: "remont-pod-klyuch",
    title: "Ремонт под ключ: что входит в сопровождение студии",
    excerpt:
      "От рабочей документации до авторского надзора — как мы удерживаем проект близким к визуализации.",
    content: [
      "Под ключ для нас — единая команда от концепции до сдачи. На этапе реализации сверяем узлы, ведомости материалов и график работ.",
      "Авторский надзор — не формальность: выезды на объект, корректировки по факту и связь с подрядчиками экономят бюджет на переделках.",
      "Заказчик получает прозрачные этапы и один контакт по проекту, без разрыва между дизайном и стройкой.",
    ],
    coverImage: "/media/blog-remont-pod-klyuch.jpg",
    publishedAt: "2025-04-02",
    readingMinutes: 8,
  },
  {
    slug: "tsvet-v-interere",
    title: "Цвет в интерьере: нейтральная база и один акцент",
    excerpt:
      "Почему спокойные оттенки работают дольше ярких стен и как добавить характер без перегруза.",
    content: [
      "Нейтральная база — не значит скучно. Тёплые бежевые, глиняные и дымчатые серые дают фон для мебели и искусства.",
      "Один акцентный цвет лучше держать в текстиле, керамике или предметах, которые можно заменить. Стены в насыщенном цвете требуют уверенности в освещении.",
      "Мы тестируем оттенки на больших образцах и смотрим их при разном времени суток — так интерьер остаётся гармоничным круглый год.",
    ],
    coverImage: "/media/blog-tsvet-v-interere.jpg",
    publishedAt: "2025-06-21",
    readingMinutes: 5,
  },
];

export function serializeBlogContent(paragraphs: string[]): string {
  return paragraphs.map((p) => p.trim()).filter(Boolean).join("\n\n");
}

export function parseBlogContent(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function mapBlogPost(post: BlogPostModel): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: parseBlogContent(post.content),
    coverImage: post.coverImage,
    publishedAt: post.publishedAt.toISOString().slice(0, 10),
    readingMinutes: post.readingMinutes,
  };
}

export async function ensureBlogSeedData() {
  const count = await prisma.blogPost.count();
  if (count > 0) return;

  for (const seed of BLOG_SEED_POSTS) {
    await prisma.blogPost.create({
      data: {
        slug: seed.slug,
        title: seed.title,
        excerpt: seed.excerpt,
        content: serializeBlogContent(seed.content),
        coverImage: seed.coverImage,
        publishedAt: new Date(seed.publishedAt),
        readingMinutes: seed.readingMinutes,
      },
    });
  }
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  await ensureBlogSeedData();
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
    take: typeof limit === "number" ? limit : undefined,
  });
  return posts.map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  await ensureBlogSeedData();
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  return post ? mapBlogPost(post) : undefined;
}

export function formatBlogDate(isoDate: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
