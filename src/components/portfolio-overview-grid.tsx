import Image from "next/image";
import Link from "next/link";
import { portfolioCategoryLabel } from "@/lib/portfolio-filters";

type OverviewProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: number;
  coverImage: string;
};

type PortfolioOverviewGridProps = {
  projects: OverviewProject[];
};

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function objectsLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} объект`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} объекта`;
  return `${count} объектов`;
}

export function PortfolioOverviewGrid({ projects }: PortfolioOverviewGridProps) {
  if (projects.length === 0) return null;

  return (
    <section aria-label="Все проекты — обзор" className="bg-[#ebe4da]">
      <div className="flex items-center justify-between gap-6 px-6 py-5 md:px-10 md:py-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#5c534c] md:text-xs">
          Все проекты — обзор
        </p>
        <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-[#5c534c] md:text-xs">
          {objectsLabel(projects.length)}
        </p>
      </div>

      <ul className="grid list-none grid-cols-1 gap-0 p-12 sm:grid-cols-2 sm:p-16 lg:grid-cols-3 lg:p-20 xl:p-24">
        {projects.map((project, index) => (
          <li key={project.id} className="relative">
            <Link
              href={`/portfolio/${project.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden bg-[#d9d2c8]"
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                quality={90}
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/40" />

              <span className="absolute left-5 top-5 text-[11px] font-medium tabular-nums tracking-[0.18em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-90 md:left-6 md:top-6 md:text-xs">
                {formatIndex(index)}
              </span>

              <div className="absolute inset-x-0 bottom-0 translate-y-2 px-5 pb-5 pt-16 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:px-6 md:pb-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/85 md:text-[11px]">
                  {portfolioCategoryLabel(project.category)} · {project.year}
                </p>
                <h3 className="mt-2 font-serif text-[1.35rem] font-normal leading-tight tracking-[-0.02em] text-white md:text-[1.55rem]">
                  {project.title}
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
