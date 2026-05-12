import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { orderedProjectGallery } from "@/lib/project-files";
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

  const gallery = orderedProjectGallery(project.slug, project.coverImage);
  const [heroPhoto, ...restPhotos] = gallery.length > 0 ? gallery : [project.coverImage];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="w-full space-y-8 px-6 py-14 md:px-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.15em] text-[#4d131a]/80">
            {project.category} / {project.location} / {project.year}
          </p>
          <h1 className="text-6xl">{project.title}</h1>
        </div>
        <div className="relative h-[420px] w-full overflow-hidden">
          <div
            className="premium-photo h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroPhoto})` }}
          />
          <div className="premium-overlay absolute inset-0" />
        </div>
        {restPhotos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {restPhotos.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden bg-[#e7d8d1]/40">
                <div className="premium-photo h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
              </div>
            ))}
          </div>
        ) : null}
        <p className="max-w-3xl text-lg leading-relaxed text-[#4d131a]/85">
          {project.description}
        </p>
      </main>
    </div>
  );
}
