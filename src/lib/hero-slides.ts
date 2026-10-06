import type { Project } from "@prisma/client";
import { formatProjectMeta } from "@/lib/project-meta";

export type HeroSlidePayload = {
  src: string;
  portfolioHref?: string;
  title?: string;
  /** Подпись под названием: категория / город / год */
  meta?: string;
};

export function heroSlidesFromProjects(projects: Project[]): HeroSlidePayload[] {
  return [...projects]
    .filter((p) => p.showOnHero && Boolean(p.coverImage?.trim()))
    .sort((a, b) => {
      // 0 = «не задан» → в конец; 1, 2, 3… — явный порядок с начала слайдера.
      const orderA = a.heroOrder > 0 ? a.heroOrder : Number.MAX_SAFE_INTEGER;
      const orderB = b.heroOrder > 0 ? b.heroOrder : Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .map((p) => ({
      src: p.coverImage,
      portfolioHref: `/portfolio/${p.slug}`,
      title: p.title,
      meta: formatProjectMeta(p),
    }));
}
