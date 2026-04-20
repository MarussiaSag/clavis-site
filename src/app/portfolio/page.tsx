import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { getSiteData } from "@/lib/site-data";

export default async function PortfolioPage() {
  const { projects } = await getSiteData();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="w-full space-y-10 px-6 py-14 md:px-10">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-[#4d131a]/80">Портфолио</p>
          <h1 className="text-5xl">Реализованные проекты</h1>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </main>
    </div>
  );
}
