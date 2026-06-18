import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/project-detail-page";
import { buildProjectInteriorGallery } from "@/lib/project-files";
import { prisma } from "@/lib/prisma";
import { ensureSeedData } from "@/lib/site-data";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await ensureSeedData();
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) {
    notFound();
  }

  const gallery = buildProjectInteriorGallery(project.slug, project.coverImage, 6);

  return <ProjectDetailPage project={project} gallery={gallery} />;
}
