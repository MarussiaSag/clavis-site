import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd, projectJsonLd } from "@/components/json-ld";
import { ProjectDetailPage } from "@/components/project-detail-page";
import { buildProjectInteriorGallery } from "@/lib/project-files";
import { prisma } from "@/lib/prisma";
import { pageMetadata } from "@/lib/site-metadata";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) {
    return pageMetadata({
      title: "Проект не найден",
      description: "Запрошенный проект студии Clavis не найден.",
      path: `/portfolio/${slug}`,
      noIndex: true,
    });
  }

  const description =
    project.description.trim() ||
    `Интерьерный проект «${project.title}» студии Clavis — ${project.location}, ${project.year}.`;

  return pageMetadata({
    title: project.title,
    description: description.slice(0, 160),
    path: `/portfolio/${project.slug}`,
    image: project.coverImage,
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([
    prisma.project.findUnique({ where: { slug } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  if (!project) {
    notFound();
  }

  const gallery = buildProjectInteriorGallery(project.slug, project.coverImage, 9);
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject =
    currentIndex >= 0 && projects.length > 1
      ? projects[(currentIndex + 1) % projects.length]
      : null;

  return (
    <>
      <JsonLd
        data={projectJsonLd({
          title: project.title,
          description: project.description,
          slug: project.slug,
          coverImage: project.coverImage,
          location: project.location,
          year: project.year,
          category: project.category,
        })}
      />
      <ProjectDetailPage project={project} gallery={gallery} nextProject={nextProject} />
    </>
  );
}
