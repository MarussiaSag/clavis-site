import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/project-detail-page";
import { buildProjectInteriorGallery } from "@/lib/project-files";
import { prisma } from "@/lib/prisma";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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

  return <ProjectDetailPage project={project} gallery={gallery} nextProject={nextProject} />;
}
