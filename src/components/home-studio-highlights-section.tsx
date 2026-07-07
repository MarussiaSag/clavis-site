import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { HOME_STUDIO_HIGHLIGHTS } from "@/lib/home-studio-highlights";

export function HomeStudioHighlightsSection() {
  return (
    <section className="border-b border-[#a38d83]/45 bg-[#f5f2eb]" aria-label="Ключевые факты о студии">
      <RevealOnScroll once>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[#d4ccc4]/90">
          {HOME_STUDIO_HIGHLIGHTS.map((item) => (
            <li
              key={item.title}
              className="flex min-w-0 flex-col gap-4 px-6 py-12 sm:gap-5 sm:px-8 sm:py-14 md:px-10 lg:px-12 lg:py-16 xl:px-16"
            >
              <h3 className="font-serif text-[1.65rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#141414] md:text-[1.85rem] lg:text-[1.95rem] xl:text-[2.125rem]">
                {item.title}
              </h3>
              <p className="ui-body-sm mt-auto text-[#6a6a6a]">{item.description}</p>
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </section>
  );
}
