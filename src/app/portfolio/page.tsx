import type { Metadata } from "next";
import { PortfolioArchiveSection } from "@/components/portfolio-archive-section";
import { SiteHeader } from "@/components/site-header";
import { buildProjectInteriorGallery } from "@/lib/project-files";
import { getSiteData } from "@/lib/site-data";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Портфолио",
  description:
    "Реализованные проекты студии дизайна интерьера Clavis: жилые и коммерческие пространства в Москве и за её пределами.",
  path: "/portfolio",
  image: "/media/showcase-hero.jpg",
});

export default async function PortfolioPage() {
  const { projects } = await getSiteData();

  const archiveProjects = projects.map((project) => {
    const gallery = buildProjectInteriorGallery(project.slug, project.coverImage, 2);
    const secondaryImage = gallery[1] ?? gallery[0] ?? project.coverImage;

    return {
      id: project.id,
      slug: project.slug,
      title: project.title,
      category: project.category,
      location: project.location,
      year: project.year,
      areaLabel: project.areaLabel,
      description: project.description,
      coverImage: project.coverImage,
      secondaryImage,
    };
  });

  return (
    <div className="min-h-screen">
      <SiteHeader variant="portfolio" />
      <main className="w-full">
        <PortfolioArchiveSection projects={archiveProjects} />
      </main>
    </div>
  );
}
