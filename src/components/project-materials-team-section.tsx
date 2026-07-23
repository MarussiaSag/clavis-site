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

          <div className="mt-8 bg-[#e7d8d1] px-6 py-7 md:mt-auto md:px-8 md:py-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4d131a]/70 md:text-[11px]">
              Дизайн-студия
            </p>
            <p className="mt-3 font-serif text-[2rem] leading-none tracking-[-0.02em] text-[#151210] md:text-[2.35rem]">
              Clavis
            </p>
            {instagramHref ? (
              <a
                href={instagramHref}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.26em] text-[#4d131a]/75 transition-colors duration-300 hover:text-[#4d131a] md:text-[11px]"
              >
                Instagram*
                <span aria-hidden className="text-[12px] leading-none">
                  ↗
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
