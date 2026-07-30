import Image from "next/image";
import Link from "next/link";
import type { Project } from "@prisma/client";
import { ProjectInteriorGallery } from "@/components/project-interior-gallery";
import { ProjectMiniDescription } from "@/components/project-mini-description";
import { ProjectMaterialsTeamSection } from "@/components/project-materials-team-section";
import { ProjectRoomsSection } from "@/components/project-rooms-section";
import { ProjectSectionNav } from "@/components/project-section-nav";
import { ProjectVirtualTour } from "@/components/project-virtual-tour";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SiteHeader } from "@/components/site-header";
import { DEFAULT_VIRTUAL_TOUR_URL } from "@/lib/kuula-embed";
import { parseMaterials, parseParagraphs, parseRooms, parseTeam } from "@/lib/project-content";
import { getInstagramHref, getSiteContact } from "@/lib/site-contact";

type ProjectDetailPageProps = {
  project: Project;
  gallery: string[];
  nextProject: Project | null;
};

const ABOUT_FALLBACK = [
  "Дизайн-студии Clavis достался проект мечты — в том смысле, что над ним можно было работать без спешки. Семья с двумя детьми, купившая эту квартиру, жила в доме по соседству, и срочности в переезде не было. Получился уютный интерьер, который сочетает в себе функциональность и эстетику в духе контемпорари модернизма. Дизайнер учла все пожелания заказчиков и гибко подстраивалась под возникавшие по ходу работы изменения.",
  "Базовый старт был такой: три изолированные спальни, общая кухня-гостиная—прихожая, два санузла — всё это на площади 101,7 кв. м. Квартира спроектирована с учётом хоккейных увлечений отца и сына: в спальне предусмотрен специальный шкаф для сушки и хранения формы. Ещё одна интересная деталь хозяйской спальни — зонирование перегородкой, отделяющей кровать от системы хранения и небольшого уголка с письменным столом. Для дочери спроектирована изолированная комната, обеспечивающая спокойствие и приватность.",
  "В отделке использован высококачественный микроцемент. Покрытие сделано в «облачной» технике с плавными размытыми переходами: так пространство получилось более сложным и глубоким. Цветовая палитра была тщательно подобрана: заказчики хотели интерьер в приглушенных природных тонах — в итоге оттенки выбирали по кругу Иттена с опорой на зеленый, синий и оранжевый цвета.",
];

function aboutParagraphs(project: Project): string[] {
  const fromDb = parseParagraphs(project.aboutBody);
  return fromDb.length > 0 ? fromDb : ABOUT_FALLBACK;
}

function aboutImageCaptionParagraphs(project: Project): string[] {
  return parseParagraphs(project.aboutSideBody);
}

function projectTagline(project: Project): string {
  if (project.taskBrief) {
    const first = project.taskBrief.split(/(?<=[.!?])\s+/)[0]?.trim();
    if (first && first.length <= 120) return first.replace(/\.$/, "");
  }
  return project.description;
}

function projectLayoutLabel(project: Project): string {
  if (project.layoutLabel?.trim()) return project.layoutLabel.trim();
  return "—";
}

function NextProjectHero({ project }: { project: Project }) {
  return (
    <section aria-label="Следующий проект">
      <Link
        href={`/portfolio/${project.slug}`}
        className="group relative isolate block min-h-[280px] overflow-hidden md:min-h-[360px]"
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[#151210]/45 transition-colors duration-500 group-hover:bg-[#151210]/35" />

        <div className="relative z-10 flex min-h-[280px] items-center justify-between gap-8 px-6 py-12 text-white md:min-h-[360px] md:px-10 lg:px-12">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/65 md:text-xs">
              Следующий проект
            </p>
            <h2 className="mt-4 font-serif text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[3rem] lg:text-[3.4rem]">
              {project.title}
            </h2>
          </div>

          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#f5f2ea] text-base text-[#151210] transition-transform duration-300 group-hover:translate-x-0.5 md:h-10 md:w-10 md:text-lg"
          >
            →
          </span>
        </div>
      </Link>
    </section>
  );
}

export async function ProjectDetailPage({ project, gallery, nextProject }: ProjectDetailPageProps) {
  const contact = await getSiteContact();
  const instagramHref = getInstagramHref(contact);
  const heroImage = gallery[0] ?? project.coverImage;
  const aboutImage = project.aboutImage?.trim() || gallery[1] || gallery[0] || project.coverImage;
  const galleryImages = gallery;
  const paragraphs = aboutParagraphs(project);
  const imageCaptionParagraphs = aboutImageCaptionParagraphs(project);
  const tagline = projectTagline(project);
  const rooms = parseRooms(project.roomsJson);
  const materials = parseMaterials(project.materialsJson);
  const team = parseTeam(project.teamJson);
  const tourUrl = project.virtualTourUrl?.trim() || DEFAULT_VIRTUAL_TOUR_URL;

  const navItems = [
    { id: "project-overview", label: "О проекте" },
    { id: "project-about", label: "Описание" },
    { id: "project-rooms", label: "По помещениям" },
    { id: "project-materials", label: "Материалы" },
    ...(tourUrl ? [{ id: "project-tour", label: "Тур" }] : []),
    { id: "project-gallery", label: "Фотографии" },
  ];

  const heroSpecs = [
    { label: "Площадь", value: project.areaLabel ?? "—" },
    { label: "Стиль", value: project.styleLabel?.trim() || "Современный" },
    { label: "Планировка", value: projectLayoutLabel(project) },
    { label: "Локация", value: project.location },
  ];

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      <section className="relative grid min-h-[100svh] lg:grid-cols-2">
        <div className="absolute inset-x-0 top-0 z-30 lg:hidden">
          <SiteHeader variant="project" />
        </div>

        <div className="relative z-20 flex min-h-[100svh] flex-col bg-[#3d0d0a] text-[#f4f1ed]">
          <div className="px-6 pt-20 md:px-10 md:pt-8 lg:px-12 lg:pt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.26em] text-white/55 transition-colors duration-300 hover:text-white md:text-xs"
            >
              <span aria-hidden>←</span>
              Все проекты
            </Link>
          </div>

          <div className="flex flex-1 flex-col justify-center px-6 py-12 md:px-10 md:py-16 lg:px-12 lg:py-20">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/45 md:text-xs">
              Clavis · {project.year}
            </p>

            <h1 className="mt-5 max-w-[12ch] font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white md:mt-6 md:text-[3.4rem] lg:text-[3.9rem]">
              {project.title}
            </h1>

            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/60 md:mt-6 md:text-[15px]">
              {tagline}
            </p>

            <span className="mt-8 block h-px w-full max-w-md bg-white/15 md:mt-10" aria-hidden />

            <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-8 gap-y-6 md:mt-10 md:gap-x-10 md:gap-y-7">
              {heroSpecs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40 md:text-[11px]">
                    {spec.label}
                  </dt>
                  <dd className="mt-2 text-[14px] font-medium text-white md:text-[15px]">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="px-6 pb-8 md:px-10 md:pb-10 lg:px-12 lg:pb-12">
            {instagramHref ? (
              <a
                href={instagramHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/55 transition-colors duration-300 hover:text-white md:text-xs"
              >
                Instagram студии*
                <span aria-hidden className="text-[13px] leading-none">
                  ↗
                </span>
              </a>
            ) : null}
          </div>
        </div>

        <div className="relative min-h-[60vh] lg:min-h-[100svh]">
          <Image
            src={heroImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />

          <Link
            href="#project-tour"
            className="absolute bottom-6 right-6 z-20 inline-flex items-center gap-3 bg-[#f5f2ea] px-4 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#151210] transition-opacity duration-300 hover:opacity-85 md:bottom-8 md:right-8 md:px-5 md:text-xs"
          >
            <span
              aria-hidden
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#151210]/35"
            >
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-current" aria-hidden>
                <path d="M3.2 1.6v8.8L10.4 6 3.2 1.6Z" />
              </svg>
            </span>
            Виртуальный тур
          </Link>
        </div>
      </section>

      <ProjectSectionNav items={navItems} />

      <ProjectMiniDescription project={project} />

      <section
        id="project-about"
        className="scroll-mt-14 bg-[#f5f2ea] md:scroll-mt-16"
        aria-label="Описание проекта"
      >
        <div className="mx-auto max-w-[1440px] px-6 pb-6 pt-4 md:px-10 md:pb-8 md:pt-6 lg:px-12 lg:pb-8 lg:pt-6">
          <RevealOnScroll once>
            <div className="grid items-stretch gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-12 lg:gap-16 xl:gap-20">
              <div className="flex h-full flex-col">
                <div className="space-y-6 md:space-y-7">
                  {paragraphs.map((text, index) => (
                    <p
                      key={index}
                      className="text-[15px] leading-[1.8] text-[#3a3530] md:text-[16px] md:leading-[1.85]"
                    >
                      {text}
                    </p>
                  ))}
                </div>

                <p
                  aria-hidden
                  className="mt-8 text-center text-[13px] font-medium tracking-[0.08em] text-[#b07d55] md:mt-auto md:pt-8"
                >
                  01
                </p>
              </div>

              <div className="flex h-full flex-col">
                <div className="space-y-6 md:space-y-7">
                  <div className="relative w-full overflow-hidden bg-[#e8e2dc]">
                    <Image
                      src={aboutImage}
                      alt={`${project.title} — обзор пространства`}
                      width={1600}
                      height={2000}
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="h-auto w-full"
                    />
                  </div>

                  {imageCaptionParagraphs.map((text, index) => (
                    <p
                      key={index}
                      className="text-[15px] leading-[1.8] text-[#3a3530] md:text-[16px] md:leading-[1.85]"
                    >
                      {text}
                    </p>
                  ))}
                </div>

                <p
                  aria-hidden
                  className="mt-8 text-center text-[13px] font-medium tracking-[0.08em] text-[#b07d55] md:mt-auto md:pt-8"
                >
                  02
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <ProjectRoomsSection rooms={rooms} gallery={gallery} title={project.title} />

      <ProjectMaterialsTeamSection materials={materials} team={team} />

      <ProjectVirtualTour id="project-tour" tourUrl={tourUrl} image={aboutImage} />

      <ProjectInteriorGallery
        id="project-gallery"
        images={galleryImages.length > 0 ? galleryImages : [heroImage]}
        title={project.title}
      />

      {nextProject ? <NextProjectHero project={nextProject} /> : null}
    </div>
  );
}
