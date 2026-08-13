import Image from "next/image";
import { ConsultationCtaCard } from "@/components/consultation-cta-card";
import type { ProjectMaterialContent } from "@/lib/project-content";

type ProjectMaterialsTeamSectionProps = {
  materials: ProjectMaterialContent[];
  intro?: string;
  image?: string;
  title: string;
  consultationImageSrc: string;
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

export function ProjectMaterialsTeamSection({
  materials: materialsProp,
  intro,
  image,
  title,
  consultationImageSrc,
}: ProjectMaterialsTeamSectionProps) {
  const materials = materialsProp.length > 0 ? materialsProp : MATERIALS_FALLBACK;
  const introText = intro?.trim() ?? "";
  const imageSrc = image?.trim() ?? "";

  return (
    <section
      id="project-materials"
      className="scroll-mt-14 bg-[#f5f2ea] pb-12 pt-6 md:scroll-mt-16 md:pb-16 md:pt-8 lg:pt-10"
      aria-label="Материалы и поставщики"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        <div
          className={
            imageSrc
              ? "grid gap-6 md:grid-cols-2 md:items-stretch md:gap-8 lg:gap-10"
              : ""
          }
        >
          <div>
            {introText ? (
              <p className="text-[15px] leading-[1.75] text-[#151210] md:text-base md:leading-[1.8]">
                {introText}
              </p>
            ) : null}

            <p
              className={`text-[11px] font-medium uppercase tracking-[0.32em] text-[#a38d83] md:text-xs ${
                introText ? "mt-6 md:mt-8 lg:mt-10" : ""
              }`}
            >
              Материалы и поставщики
            </p>

            <ul className="mt-4 border-t border-[#d0b5a5]/70">
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

            <div className="mt-6 md:mt-8 lg:mt-10">
              <ConsultationCtaCard imageSrc={consultationImageSrc} />
            </div>
          </div>

          {imageSrc ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e2dc] md:aspect-auto md:h-full">
              <Image
                src={imageSrc}
                alt={`${title} — материалы и поставщики`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
