import Image from "next/image";
import type { Project } from "@prisma/client";
import { ProjectTeamSection } from "@/components/project-team-section";
import type { ProjectTeamMemberContent } from "@/lib/project-content";

type ProjectMiniDescriptionProps = {
  project: Project;
  imageSrc: string;
  team: ProjectTeamMemberContent[];
  instagramHref?: string | null;
};

const FALLBACK_SUMMARY =
  "Студия Clavis получила редкий подарок — проект, над которым можно было работать неторопливо и вдумчиво. В результате появилась уютная квартира, где продуманное стилистическое решение встречается с функциональностью и утонченными цветовыми акцентами.";

export function ProjectMiniDescription({
  project,
  imageSrc,
  team,
  instagramHref,
}: ProjectMiniDescriptionProps) {
  const summary = project.aboutSummary?.trim() || FALLBACK_SUMMARY;

  return (
    <section
      id="project-overview"
      className="scroll-mt-14 border-t border-[#e0dbd5] bg-[#f5f2ea] md:scroll-mt-16"
      aria-label="О проекте"
    >
      <div className="mx-auto max-w-[1440px] px-6 pb-0 pt-12 md:px-10 md:pt-14 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2 md:items-stretch md:gap-8 lg:gap-10">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#8a8a8a] md:text-xs">
                О проекте
              </p>
              <p className="text-[15px] leading-[1.75] text-[#151210] md:text-base md:leading-[1.8]">
                {summary}
              </p>
            </div>
            <ProjectTeamSection team={team} instagramHref={instagramHref} />
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e2dc] md:aspect-auto md:h-full">
            <Image
              src={imageSrc}
              alt={`${project.title} — о проекте`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
