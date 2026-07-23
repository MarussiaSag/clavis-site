import type { Project } from "@prisma/client";
import { orderedProjectGallery } from "@/lib/project-files";

export type HomeFeaturedProject = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  areaLabel: string;
  durationLabel: string;
  taskBrief: string;
  images: string[];
};

/** До трёх уникальных кадров для блока «Проект месяца». */
export function featuredProjectImages(slug: string, coverImage: string, limit = 3): string[] {
  const fromUploads = orderedProjectGallery(slug, coverImage);
  const merged = [...fromUploads, coverImage].filter(Boolean);
  const unique: string[] = [];

  for (const src of merged) {
    if (!unique.includes(src)) unique.push(src);
    if (unique.length >= limit) break;
  }

  return unique;
}

export function getHomeFeaturedProject(projects: Project[]): HomeFeaturedProject | null {
  const project = projects.find((item) => item.isFeaturedHome) ?? projects[0];

  if (!project) return null;

  const images = featuredProjectImages(project.slug, project.coverImage, 3);
  if (images.length === 0) return null;

  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    location: project.location,
    year: project.year,
    areaLabel: project.areaLabel ?? "—",
    durationLabel: project.durationLabel ?? "—",
    taskBrief: project.taskBrief?.trim() || project.description,
    images,
  };
}
