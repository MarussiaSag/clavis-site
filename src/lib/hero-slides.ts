import type { Project } from "@prisma/client";

export type HeroSlidePayload = {
  src: string;
  portfolioHref?: string;
  title?: string;
};

export function heroSlidesFromProjects(projects: Project[]): HeroSlidePayload[] {
  return [...projects]
    .filter((p) => p.showOnHero && Boolean(p.coverImage?.trim()))
    .sort((a, b) => {
      if (a.heroOrder !== b.heroOrder) return a.heroOrder - b.heroOrder;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .map((p) => ({
      src: p.coverImage,
      portfolioHref: `/portfolio/${p.slug}`,
      title: p.title,
    }));
}
