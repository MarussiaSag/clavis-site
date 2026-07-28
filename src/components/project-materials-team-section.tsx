import Image from "next/image";
import { getInstagramHref, getSiteContact } from "@/lib/site-contact";
import type { ProjectMaterialContent, ProjectTeamMemberContent } from "@/lib/project-content";

type ProjectMaterialsTeamSectionProps = {
  materials: ProjectMaterialContent[];
  team: ProjectTeamMemberContent[];
};

const MATERIALS_FALLBACK: ProjectMaterialContent[] = [
  {
    category: "Стены и потолок",
    supplier: "Domus Decor",
    detail: "Микроцемент, «облачная» техника",
  },
  {
    category: "Кухня",
    supplier: "Lithium",
    detail: "Кухонный гарнитур на заказ",
  },
  {
    category: "Столешницы",
    supplier: "K-stone.pro",
    detail: "Кварцевый агломерат",
  },
  {
    category: "Корпусная мебель",
    supplier: "Duomo Project",
    detail: "Изготовление на заказ",
  },
  {
    category: "Мягкая мебель",
    supplier: "Julium Space",
    detail: "Диван, кресла, пуфы",
  },
  {
    category: "Ковры",
    supplier: "Культура ковров",
    detail: "Подбор и поставка",
  },
];

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

export async function ProjectMaterialsTeamSection({
  materials: materialsProp,
  team: teamProp,
}: ProjectMaterialsTeamSectionProps) {
  const contact = await getSiteContact();
  const instagramHref = getInstagramHref(contact);
  const materials = materialsProp.length > 0 ? materialsProp : MATERIALS_FALLBACK;
  const team = teamProp.length > 0 ? teamProp : TEAM_FALLBACK;

  return (
    <section className="bg-[#f5f2ea] pb-12 pt-6 md:pb-16 md:pt-8" aria-label="Материалы и команда">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 md:grid-cols-2 md:gap-14 md:px-10 lg:gap-20 lg:px-12">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#a38d83] md:text-xs">
            Материалы и поставщики
          </p>

          <ul className="mt-5 border-t border-[#d0b5a5]/70 md:mt-6">
            {materials.map((item) => (
              <li
                key={`${item.category}-${item.supplier}`}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 border-b border-[#d0b5a5]/70 py-5 md:gap-x-10 md:py-6"
              >
                <div>
                  <p className="text-[12px] leading-snug text-[#a38d83] md:text-[13px]">{item.category}</p>
                  <p className="mt-1.5 text-[15px] font-medium leading-snug text-[#151210] md:text-base">
                    {item.supplier}
                  </p>
                </div>
                <p className="max-w-[18ch] pt-0.5 text-right text-[12px] leading-snug text-[#a38d83] md:max-w-[22ch] md:text-[13px]">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#a38d83] md:text-xs">
            Команда проекта
          </p>

          <ul className="mt-5 border-t border-[#d0b5a5]/70 md:mt-6">
            {team.map((member) => (
              <li
                key={`${member.role}-${member.name}`}
                className="flex items-baseline justify-between gap-6 border-b border-[#d0b5a5]/70 py-5 md:py-6"
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
              className="group relative mt-[15px] flex min-h-[240px] flex-col overflow-hidden rounded-md md:min-h-[280px]"
            >
              <Image
                src="/instbg.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />

              <span
                aria-hidden
                className="pointer-events-none absolute top-7 bottom-7 left-1/2 z-10 hidden w-px -translate-x-1/2 bg-[#2c2826]/35 md:block"
              />

              <div className="relative z-10 grid flex-1 grid-rows-[1fr_auto] md:grid-cols-2 md:grid-rows-1">
                <div className="flex flex-col justify-between px-6 py-7 md:px-8 md:py-8">
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#3a3530]/80 md:text-[10px]">
                      Дизайн-студия
                    </p>
                    <p className="mt-2.5 font-serif text-[1.65rem] leading-none tracking-[-0.02em] text-[#151210] md:mt-3 md:text-[1.9rem]">
                      Clavis
                    </p>
                    <p className="mt-3 max-w-[24ch] text-[12px] leading-[1.5] text-[#3a3530]/85 md:mt-3.5 md:text-[13px] md:leading-[1.55]">
                      Архитектура и интерьер, в которых важна каждая деталь.
                    </p>
                  </div>

                  <span className="mt-6 inline-flex w-fit items-center gap-3 border-b border-[#2c2826] pb-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#2c2826] transition-opacity duration-300 group-hover:opacity-70 md:mt-8 md:gap-4 md:text-[10px] md:tracking-[0.22em]">
                    Смотреть в Instagram
                    <svg
                      aria-hidden
                      viewBox="0 0 48 10"
                      className="h-2.5 w-12 shrink-0 md:w-14"
                      fill="none"
                    >
                      <path
                        d="M0 5h44.5M41.5 2l4 3-4 3"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                <div className="flex items-end justify-end px-6 pb-7 pt-2 md:px-8 md:pb-8 md:pt-8">
                  <span
                    aria-hidden
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#2c2826]/80 text-[#2c2826] transition-transform duration-300 group-hover:scale-105 md:h-16 md:w-16"
                  >
                    <InstagramGlyph className="h-6 w-6 md:h-7 md:w-7" />
                  </span>
                </div>
              </div>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
