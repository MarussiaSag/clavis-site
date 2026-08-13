import Image from "next/image";
import Link from "next/link";
import { portfolioCategoryLabel } from "@/lib/portfolio-filters";

type ShowcaseProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  areaLabel: string | null;
  description: string;
  coverImage: string;
  secondaryImage: string;
};

type PortfolioShowcaseStackProps = {
  projects: ShowcaseProject[];
};

function formatProjectIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function PortfolioShowcaseStack({ projects }: PortfolioShowcaseStackProps) {
  if (projects.length === 0) return null;

  return (
    <>
      {projects.map((project, index) => {
        const href = `/portfolio/${project.slug}`;
        const imageLeft = index % 2 === 0;
        const projectNumber = formatProjectIndex(index);
        const categoryLabel = portfolioCategoryLabel(project.category);

        return (
          <section
            key={project.id}
            className={
              imageLeft
                ? "grid lg:grid-cols-[minmax(0,1.28fr)_minmax(0,1fr)]"
                : "grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.28fr)]"
            }
          >
            <Link
              href={href}
              className={`group relative z-10 hidden overflow-hidden bg-[#e8e2dc] lg:block lg:min-h-[880px] ${
                imageLeft ? "" : "lg:order-2"
              }`}
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="60vw"
                className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                quality={92}
                priority={index === 0}
              />
            </Link>

            <div
              className={`relative z-20 flex min-h-[72vh] flex-col overflow-hidden bg-[#f2eee4] px-8 py-10 sm:px-10 md:min-h-[78vh] md:px-12 md:py-12 lg:min-h-[880px] lg:px-14 lg:py-14 ${
                imageLeft ? "" : "lg:order-1"
              }`}
            >
              <div className="absolute inset-0 lg:hidden">
                <Image
                  src={project.coverImage}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  quality={90}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-[#151210]/45" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151210]/80 via-[#151210]/35 to-[#151210]/20" />
              </div>

              <p className="relative z-10 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 md:text-xs lg:hidden">
                {projectNumber}
              </p>

              <div className="relative z-10 mt-auto flex flex-col lg:mt-0">
              <p className="hidden text-[11px] font-medium uppercase tracking-[0.28em] text-[#7a7a7a] lg:block lg:text-xs">
                {projectNumber} — {categoryLabel}
              </p>

              <div className="relative mt-8 flex min-h-[5.25rem] items-center overflow-hidden md:mt-10 md:min-h-0 md:overflow-visible lg:mt-12">
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-1/2 z-0 hidden -translate-y-1/2 select-none font-serif text-[25rem] leading-none tracking-[-0.06em] text-[#e4dfd6] lg:block ${
                    imageLeft
                      ? "right-0 lg:right-[-0.12em]"
                      : "right-0 lg:left-[-0.16em] lg:right-auto"
                  }`}
                >
                  {projectNumber}
                </span>
                <h2 className="relative z-10 max-w-[12ch] font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.03em] text-white md:text-[3.15rem] lg:text-[3.5rem] lg:text-[#151210]">
                  {project.title}
                </h2>
              </div>

              <dl className="relative z-10 mt-9 grid max-w-lg grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,0.7fr)] gap-x-5 gap-y-4 md:mt-10 md:gap-x-8">
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 md:text-[11px] lg:text-[#8a8a8a]">
                    Локация
                  </dt>
                  <dd className="mt-2 text-[13px] font-medium leading-snug text-white md:text-[14px] lg:text-[#1a1a1a]">
                    {project.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 md:text-[11px] lg:text-[#8a8a8a]">
                    Год
                  </dt>
                  <dd className="mt-2 text-[13px] font-medium leading-snug text-white md:text-[14px] lg:text-[#1a1a1a]">
                    {project.year}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 md:text-[11px] lg:text-[#8a8a8a]">
                    Площадь
                  </dt>
                  <dd className="mt-2 text-[13px] font-medium leading-snug text-white md:text-[14px] lg:text-[#1a1a1a]">
                    {project.areaLabel ?? "—"}
                  </dd>
                </div>
              </dl>

              <p className="relative z-10 mt-8 hidden max-w-[26rem] text-[14px] leading-[1.75] text-[#7a7a7a] lg:mt-9 lg:block lg:text-[15px] lg:leading-[1.8]">
                {project.description}
              </p>

              <Link
                href={href}
                className="relative z-10 mt-8 inline-flex w-fit border-b border-white pb-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-opacity duration-300 hover:opacity-55 md:mt-9 md:text-xs lg:border-[#151210] lg:text-[#151210]"
              >
                Смотреть проект →
              </Link>
              </div>

              <div className="relative z-10 mt-auto hidden justify-center pt-14 lg:flex">
                <Link
                  href={href}
                  className="relative block aspect-[3/2] w-full max-w-[380px] overflow-hidden bg-[#e8e2dc]"
                >
                  <Image
                    src={project.secondaryImage}
                    alt={`${project.title} — деталь интерьера`}
                    fill
                    sizes="380px"
                    className="object-cover object-center"
                    quality={90}
                  />
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
