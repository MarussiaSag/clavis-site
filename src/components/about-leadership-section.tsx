import Image from "next/image";

const leaders = [
  {
    name: "Елена Морозова",
    role: "Руководитель студии, стратегия пространства",
    file: "2026-04-14 11.49.46.jpg",
  },
  {
    name: "Илья Карпов",
    role: "Лидирующий архитектор, концепция и чертежи",
    file: "2026-04-14 11.49.52.jpg",
  },
  {
    name: "Софья Вередникова",
    role: "Ведущий дизайнер, комплектация и авторский надзор",
    file: "2026-04-14 11.49.56.jpg",
  },
  {
    name: "Артём Платонов",
    role: "Продюсирование проектов и производство",
    file: "2026-04-14 11.49.59.jpg",
  },
] as const;

function teamPhotoSrc(file: string) {
  return `/testImg/${encodeURIComponent(file)}`;
}

export function AboutLeadershipSection() {
  return (
    <section className="bg-[#f5f3f0]">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-10 md:px-10 md:py-14 lg:py-18">
        <header className="mb-10 max-w-2xl md:mb-12 lg:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#b07d55] md:text-xs">
            Люди студии
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
          {leaders.map((member) => (
            <li key={member.file}>
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#eae6e0]">
                <Image
                  src={teamPhotoSrc(member.file)}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={92}
                />
              </div>
              <div className="mt-5 space-y-1.5">
                <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-[#151210] md:text-2xl">
                  {member.name}
                </h3>
                <p className="text-[10px] font-semibold uppercase leading-snug tracking-[0.22em] text-[#b07d55]/95 md:text-[11px] md:tracking-[0.26em]">
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
