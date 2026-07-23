import type { Project } from "@prisma/client";

type ProjectMiniDescriptionProps = {
  project: Project;
};

const FALLBACK = {
  summary:
    "Студия Clavis получила редкий подарок — проект, над которым можно было работать неторопливо и вдумчиво. В результате появилась уютная квартира, где продуманное стилистическое решение встречается с функциональностью и утонченными цветовыми акцентами.",
  quote:
    "Стандартная квартира превратилась в многослойное пространство, где каждый уголок дышит комфортом.",
  attribution: "Студия Clavis",
};

function getProjectMiniDescription(project: Project) {
  return {
    summary: project.aboutSummary?.trim() || FALLBACK.summary,
    quote: project.quote?.trim() || FALLBACK.quote,
    attribution: project.quoteAttribution?.trim() || FALLBACK.attribution,
  };
}

export function ProjectMiniDescription({ project }: ProjectMiniDescriptionProps) {
  const { summary, quote, attribution } = getProjectMiniDescription(project);

  return (
    <section className="border-t border-[#e0dbd5] bg-[#f5f2ea]" aria-label="О проекте">
      <div className="mx-auto max-w-[1240px] px-6 py-12 md:px-10 md:pb-8 md:pt-14 lg:px-12 lg:pb-8 lg:pt-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] md:items-center md:gap-12 lg:gap-16">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#8a8a8a] md:text-xs">
              О проекте
            </p>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#5c5c5c] md:mt-6 md:text-base md:leading-[1.8]">
              {summary}
            </p>
          </div>

          <span aria-hidden className="hidden h-full min-h-[180px] w-px bg-[#b07d55]/55 md:block" />

          <div className="max-w-xl md:justify-self-end">
            <blockquote className="font-serif text-[1.65rem] italic leading-[1.45] tracking-[-0.02em] text-[#151210] md:text-[1.9rem] lg:text-[2.1rem]">
              «{quote}»
            </blockquote>
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a] md:text-xs">
              — {attribution}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
