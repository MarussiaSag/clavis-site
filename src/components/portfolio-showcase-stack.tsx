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

        const imageSide = (
          <Link
            href={href}
            className="group relative block h-full min-h-[68vh] overflow-hidden bg-[#e8e2dc] md:min-h-[820px] lg:min-h-[880px]"
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
              quality={92}
              priority={index === 0}
            />
          </Link>
        );

        const textSide = (
          <div className="relative flex min-h-[68vh] flex-col overflow-hidden bg-[#f2eee4] px-8 py-10 sm:px-10 md:min-h-[820px] md:px-12 md:py-12 lg:min-h-[880px] lg:px-14 lg:py-14">
            <p className="relative z-10 text-[11px] font-medium uppercase tracking-[0.28em] text-[#7a7a7a] md:text-xs">
              {projectNumber} — {categoryLabel}
            </p>

            <div className="relative z-10 mt-8 flex min-h-[5.25rem] items-center overflow-hidden md:mt-10 md:min-h-0 md:overflow-visible lg:mt-12">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-1/2 z-0 -translate-y-1/2 select-none font-serif text-[5.25rem] leading-none tracking-[-0.06em] text-[#e4dfd6] sm:text-[6rem] md:text-[22rem] lg:text-[25rem] ${
                  imageLeft ? "right-0 md:right-[-0.12em]" : "left-0 md:left-[-0.16em]"
                }`}
              >
                {projectNumber}
              </span>
              <h2 className="relative z-10 max-w-[12ch] font-serif text-[2.5rem] font-normal leading-[1.05] tracking-[-0.03em] text-[#151210] md:text-[3.15rem] lg:text-[3.5rem]">
                {project.title}
              </h2>
            </div>

            <dl className="relative z-10 mt-9 grid max-w-lg grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,0.7fr)] gap-x-5 gap-y-4 md:mt-10 md:gap-x-8">
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a8a8a] md:text-[11px]">
                  Локация
                </dt>
                <dd className="mt-2 text-[13px] font-medium leading-snug text-[#1a1a1a] md:text-[14px]">
                  {project.location}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a8a8a] md:text-[11px]">
                  Год
                </dt>
                <dd className="mt-2 text-[13px] font-medium leading-snug text-[#1a1a1a] md:text-[14px]">
                  {project.year}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a8a8a] md:text-[11px]">
                  Площадь
                </dt>
                <dd className="mt-2 text-[13px] font-medium leading-snug text-[#1a1a1a] md:text-[14px]">
                  {project.areaLabel ?? "—"}
                </dd>
              </div>
            </dl>

            <p className="relative z-10 mt-8 max-w-[26rem] text-[14px] leading-[1.75] text-[#7a7a7a] md:mt-9 md:text-[15px] md:leading-[1.8]">
              {project.description}
            </p>

            <Link
              href={href}
              className="relative z-10 mt-8 inline-flex w-fit border-b border-[#151210] pb-1 text-[11px] font-medium uppercase tracking-[0.22em] text-[#151210] transition-opacity duration-300 hover:opacity-55 md:mt-9 md:text-xs"
            >
              Смотреть проект →
            </Link>

            <div className="relative z-10 mt-auto flex justify-center pt-12 md:pt-14">
              <Link
                href={href}
                className="relative block aspect-[3/2] w-full max-w-[380px] overflow-hidden bg-[#e8e2dc]"
              >
                <Image
                  src={project.secondaryImage}
                  alt={`${project.title} — деталь интерьера`}
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover object-center"
                  quality={90}
                />
              </Link>
            </div>
          </div>
        );

        return (
          <section
            key={project.id}
            className={
              imageLeft
                ? "grid md:grid-cols-[minmax(0,1.28fr)_minmax(0,1fr)]"
                : "grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.28fr)]"
            }
          >
            {imageLeft ? (
              <>
                <div className="relative z-10">{imageSide}</div>
                <div className="relative z-20">{textSide}</div>
              </>
            ) : (
              <>
                <div className="relative z-20">{textSide}</div>
                <div className="relative z-10">{imageSide}</div>
              </>
            )}
          </section>
        );
      })}
    </>
  );
}
