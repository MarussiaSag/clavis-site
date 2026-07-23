import Image from "next/image";
import { getAboutStudioPeople } from "@/lib/about-studio-people";

export async function AboutLeadershipSection() {
  const { teamPhoto, people } = await getAboutStudioPeople();

  return (
    <section className="bg-[#f5f3f0]" aria-labelledby="studio-people-heading">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-10 md:px-10 md:py-14 lg:py-18">
        <header className="mb-10 max-w-2xl md:mb-12 lg:mb-14">
          <p
            id="studio-people-heading"
            className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#b07d55] md:text-xs"
          >
            Люди студии
          </p>
        </header>

        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <figure className="relative aspect-[3/4] w-full overflow-hidden bg-[#eae6e0] md:sticky md:top-24 md:aspect-[4/5]">
            <Image
              src={teamPhoto}
              alt="Команда студии CLAVIS"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={92}
            />
          </figure>

          {people.length > 0 ? (
            <ul className="divide-y divide-[#d4cdc4] border-t border-[#d4cdc4]">
              {people.map((member) => (
                <li
                  key={member.id ?? member.name}
                  className="grid gap-2 py-6 first:pt-6 last:pb-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] md:items-baseline md:gap-x-8 md:py-7"
                >
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-[#151210] md:text-[1.75rem]">
                      {member.name}
                    </h3>
                    <p className="text-[10px] font-semibold uppercase leading-snug tracking-[0.22em] text-[#b07d55]/95 md:text-[11px] md:tracking-[0.26em]">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#2a2420]/80 md:pt-1 md:text-base">
                    {member.competencies}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
