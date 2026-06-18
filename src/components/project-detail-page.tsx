import Image from "next/image";
import Link from "next/link";
import type { Project } from "@prisma/client";
import { ProjectInteriorGallery } from "@/components/project-interior-gallery";
import { ProjectStatsBar, type StatItem } from "@/components/project-stats-bar";
import { ProjectVirtualTour } from "@/components/project-virtual-tour";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SiteHeader } from "@/components/site-header";
import { DEFAULT_VIRTUAL_TOUR_URL } from "@/lib/kuula-embed";

type ProjectDetailPageProps = {
  project: Project;
  gallery: string[];
};

function buildProjectStats(project: Project): StatItem[] {
  return [
    { icon: "area", label: "Площадь", value: project.areaLabel ?? "—" },
    { icon: "rooms", label: "Комнаты", value: project.category === "Квартира" ? "2" : project.category },
    { icon: "bath", label: "Санузел", value: "1" },
    { icon: "style", label: "Стиль", value: "Современный" },
    { icon: "duration", label: "Срок", value: project.durationLabel ?? "—" },
  ];
}

function aboutHeadline(project: Project): string {
  if (project.taskBrief) {
    const firstSentence = project.taskBrief.split(/(?<=[.!?])\s+/)[0];
    if (firstSentence.length <= 80) return firstSentence.replace(/\.$/, "");
  }
  return "Интерьер, созданный для повседневной жизни";
}

function aboutParagraphs(project: Project): string[] {
  const paragraphs: string[] = [project.description];
  if (project.taskBrief) {
    const rest = project.taskBrief.split(/(?<=[.!?])\s+/).slice(1).join(" ").trim();
    if (rest && rest !== project.description) paragraphs.push(rest);
  }
  return paragraphs;
}

export function ProjectDetailPage({ project, gallery }: ProjectDetailPageProps) {
  const heroImage = gallery[0] ?? project.coverImage;
  const aboutImage = gallery[1] ?? gallery[0] ?? project.coverImage;
  const galleryImages = gallery;
  const stats = buildProjectStats(project);
  const headline = aboutHeadline(project);
  const paragraphs = aboutParagraphs(project);

  const metaLine = [project.location, project.areaLabel, project.year]
    .filter(Boolean)
    .join(" • ")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero — split screen */}
      <section className="grid min-h-[100svh] lg:grid-cols-[minmax(0,42%)_minmax(0,58%)]">
        <div className="relative flex flex-col bg-[#332f2c] text-white">
          <SiteHeader variant="project" />

          <div className="flex flex-1 flex-col justify-center px-6 pb-12 pt-4 md:px-10 md:pb-16 lg:px-12 lg:pb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/65 md:text-[11px]">
              {metaLine}
            </p>

            <h1 className="mt-6 font-serif text-[2.75rem] leading-[1.02] tracking-[-0.02em] text-white md:mt-8 md:text-6xl lg:text-[4.25rem]">
              {project.title}
            </h1>

            <span className="mt-6 block h-px w-10 bg-[#b07d55] md:mt-8" aria-hidden />

            <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-white/82 md:mt-8 md:text-base md:leading-[1.78]">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5 md:mt-10">
              <Link
                href="#project-gallery"
                className="inline-flex items-center gap-2 bg-white px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#151210] transition-opacity duration-300 hover:opacity-90 md:text-[11px]"
              >
                Смотреть проект
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="#project-tour"
                className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/90 underline decoration-white/40 underline-offset-[6px] transition-colors duration-300 hover:text-white md:text-[11px]"
              >
                Виртуальный тур
              </Link>
              <Link
                href="#project-about"
                className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/90 underline decoration-white/40 underline-offset-[6px] transition-colors duration-300 hover:text-white md:text-[11px]"
              >
                Все детали
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[50vh] lg:min-h-0">
          <Link
            href="/portfolio"
            className="absolute right-6 top-6 z-10 text-[10px] font-medium uppercase tracking-[0.28em] text-white/90 transition-colors duration-300 hover:text-white md:right-10 md:top-8 md:text-[11px]"
          >
            Все проекты
            <span className="ml-2" aria-hidden>
              →
            </span>
          </Link>

          <div className="relative h-full min-h-[50vh] lg:min-h-[100svh]">
            <Image
              src={heroImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="premium-photo object-cover"
            />
          </div>
        </div>
      </section>

      <ProjectStatsBar stats={stats} />

      {/* About */}
      <section id="project-about" className="bg-[#f5f3f0]">
        <div className="grid lg:min-h-[min(100svh,880px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-stretch">
          <div className="flex items-center px-6 py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-16">
            <RevealOnScroll once className="mx-auto w-full max-w-xl">
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-3">
                  <span className="block h-px w-8 bg-[#b07d55]" aria-hidden />
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#4d131a]/70 md:text-[11px]">
                    О проекте
                  </p>
                </div>

                <h2 className="font-serif text-3xl leading-[1.12] tracking-[-0.02em] text-[#151210] md:text-4xl lg:text-[2.75rem]">
                  {headline}
                </h2>

                <div className="space-y-5">
                  {paragraphs.map((text, index) => (
                    <p
                      key={index}
                      className="text-[15px] leading-[1.78] text-[#2a2420]/90 md:text-base md:leading-[1.82]"
                    >
                      {text}
                    </p>
                  ))}
                </div>

                <Link
                  href="#project-gallery"
                  className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.26em] text-[#151210] transition-opacity duration-300 hover:opacity-70 md:text-[11px]"
                >
                  Смотреть полный проект
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </RevealOnScroll>
          </div>

          <div className="relative min-h-[55vh] w-full lg:min-h-0">
            <Image
              src={aboutImage}
              alt={`${project.title} — обзор пространства`}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="premium-photo object-cover"
            />
          </div>
        </div>
      </section>

      <ProjectVirtualTour
        id="project-tour"
        tourUrl={DEFAULT_VIRTUAL_TOUR_URL}
        title="Кухня — гостиная"
      />

      <ProjectInteriorGallery
        id="project-gallery"
        images={galleryImages.length > 0 ? galleryImages : [heroImage]}
        title={project.title}
      />
    </div>
  );
}
