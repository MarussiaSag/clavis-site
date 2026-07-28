import Link from "next/link";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { homeSectionPadding } from "@/lib/home-layout";
import { HOME_PRESS_FEATURE } from "@/lib/home-trust";

export function HomeTrustPressSection() {
  const press = HOME_PRESS_FEATURE;
  const isExternalPressLink = press.href.startsWith("http");

  return (
    <section className="border-b border-[#a38d83] bg-[#f4f1ed]" aria-labelledby="home-trust-heading">
      <div className={`mx-auto max-w-[1180px] ${homeSectionPadding}`}>
        <RevealOnScroll once>
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-center md:gap-12 lg:gap-16">
            <header className="space-y-3 md:max-w-sm">
              <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-[#b07d55] md:text-xs md:tracking-[0.42em]">
                Публикации
              </p>
              <h2
                id="home-trust-heading"
                className="font-serif text-3xl leading-[1.06] tracking-[-0.02em] text-[#151210] md:text-4xl"
              >
                В прессе
              </h2>
              <p className="text-[14px] leading-relaxed text-[#2a2420]/80 md:text-[15px]">
                Проекты студии и подход к материалу — в профильных изданиях об интерьере и
                архитектуре.
              </p>
            </header>

            <article className="group relative border border-[#a38d83]/70 bg-[#fafafa] p-6 md:p-8">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[#4d131a]/85"
                aria-hidden
              />
              <div className="space-y-4 pl-3 md:pl-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-serif text-xl tracking-tight text-[#151210] md:text-2xl">
                    {press.publication}
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#4d131a]/70 md:text-[11px]">
                    {press.issue}
                  </p>
                </div>
                <h3 className="font-serif text-xl leading-snug text-[#151210] md:text-2xl md:leading-snug">
                  {press.title}
                </h3>
                <p className="text-[14px] leading-[1.72] text-[#2a2420]/88 md:text-[15px]">
                  {press.excerpt}
                </p>
                <Link
                  href={press.href}
                  {...(isExternalPressLink
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#4d131a] transition-colors duration-300 hover:text-[#751f26] md:text-xs md:tracking-[0.28em]"
                >
                  {press.hrefLabel}
                  <span
                    className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </div>
            </article>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
