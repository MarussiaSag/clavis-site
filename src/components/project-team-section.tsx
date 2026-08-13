import Image from "next/image";
import type { ProjectTeamMemberContent } from "@/lib/project-content";

type ProjectTeamSectionProps = {
  team: ProjectTeamMemberContent[];
  instagramHref?: string | null;
};

const TEAM_FALLBACK: ProjectTeamMemberContent[] = [
  { role: "Дизайнер", name: "Татьяна Кожевникова" },
  { role: "Декоратор", name: "Анна Бабенко" },
  { role: "Комплектация", name: "Алексей Стегний" },
  { role: "Фотограф", name: "Anton Licht" },
];

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function ProjectTeamSection({ team: teamProp, instagramHref }: ProjectTeamSectionProps) {
  const team = teamProp.length > 0 ? teamProp : TEAM_FALLBACK;

  return (
    <div id="project-team" className="mt-6 md:mt-8 lg:mt-10">
      <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#a38d83] md:text-xs">
        Команда проекта
      </p>
      <ul className="mt-4 border-t border-[#d0b5a5]/70">
        {team.map((member) => (
          <li
            key={`${member.role}-${member.name}`}
            className="flex items-baseline justify-between gap-6 border-b border-[#d0b5a5]/70 py-4"
          >
            <p className="text-[12px] text-[#a38d83] md:text-[13px]">{member.role}</p>
            <p className="text-right text-[15px] font-medium text-[#151210] md:text-base">
              {member.name}
            </p>
          </li>
        ))}
      </ul>

      {instagramHref ? (
        <a
          href={instagramHref}
          target="_blank"
          rel="noreferrer"
          className="group relative mt-6 flex min-h-[220px] flex-col overflow-hidden rounded-md md:mt-8 md:min-h-[240px] lg:mt-10"
        >
          <Image
            src="/instbg.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />

          <div className="relative z-10 flex flex-1 flex-col justify-between px-5 py-6 md:px-6 md:py-7">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#3a3530]/80 md:text-[10px]">
                Дизайн-студия
              </p>
              <p className="mt-2.5 font-serif text-[1.5rem] leading-none tracking-[-0.02em] text-[#151210] md:text-[1.7rem]">
                Clavis
              </p>
              <p className="mt-3 max-w-[24ch] text-[12px] leading-[1.5] text-[#3a3530]/85 md:text-[13px]">
                Архитектура и интерьер, в которых важна каждая деталь.
              </p>
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <span className="inline-flex w-fit items-center gap-3 border-b border-[#2c2826] pb-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#2c2826] transition-opacity duration-300 group-hover:opacity-70 md:text-[10px]">
                Смотреть в Instagram*
                <svg aria-hidden viewBox="0 0 48 10" className="h-2.5 w-12 shrink-0" fill="none">
                  <path
                    d="M0 5h44.5M41.5 2l4 3-4 3"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                aria-hidden
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#2c2826]/80 text-[#2c2826] transition-transform duration-300 group-hover:scale-105"
              >
                <InstagramGlyph className="h-5 w-5" />
              </span>
            </div>
          </div>
        </a>
      ) : null}
    </div>
  );
}
