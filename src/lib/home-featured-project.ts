import type { Project } from "@prisma/client";
import { listPublicFolderImages } from "@/lib/object-photos";
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

function folderGalleryForSlug(slug: string): string[] {
  const chaveta = listPublicFolderImages("chaveta");
  const zil = listPublicFolderImages("zil");

  switch (slug) {
    case "nordic-loft":
      return [chaveta[0], chaveta[1], chaveta[2]].filter((src): src is string => Boolean(src));
    case "terra-residence":
      return [zil[0], zil[1], zil[2]].filter((src): src is string => Boolean(src));
    case "city-minimal":
      return [chaveta[1], chaveta[2], chaveta[3]].filter((src): src is string => Boolean(src));
    case "atelier-noir":
      return [zil[1], zil[2], zil[3]].filter((src): src is string => Boolean(src));
    case "meridian-office":
      return [chaveta[2], chaveta[3], zil[2]].filter((src): src is string => Boolean(src));
    default:
      return [...chaveta, ...zil].slice(0, 3);
  }
}

/** До трёх уникальных кадров для блока «Проект месяца». */
export function featuredProjectImages(slug: string, coverImage: string, limit = 3): string[] {
  const fromUploads = orderedProjectGallery(slug, coverImage);
  const fromFolders = folderGalleryForSlug(slug);
  const merged = [...fromUploads, ...fromFolders, coverImage].filter(Boolean);
  const unique: string[] = [];

  for (const src of merged) {
    if (!unique.includes(src)) unique.push(src);
    if (unique.length >= limit) break;
  }

  return unique;
}

export function getHomeFeaturedProject(projects: Project[]): HomeFeaturedProject | null {
  const project =
    projects.find((item) => item.isFeaturedHome) ??
    projects.find((item) => item.slug === "terra-residence") ??
    projects[0];

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
