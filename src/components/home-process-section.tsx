import { Fragment } from "react";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { homeSectionPadding } from "@/lib/home-layout";
import { HOME_PROCESS_STATS, HOME_PROCESS_STEPS } from "@/lib/home-process";

export function HomeProcessSection() {
  return (
    <section className="border-b border-[#a38d83] bg-[#fafafa]" aria-labelledby="home-process-heading">
      <div className={`mx-auto max-w-[1180px] ${homeSectionPadding}`}>
        <RevealOnScroll once>
          <header className="text-center">
            <p
              id="home-process-heading"
              className="text-[11px] font-medium uppercase tracking-[0.38em] text-[#b07d55] md:text-xs md:tracking-[0.42em]"
            >
              Как мы работаем
            </p>
          </header>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 md:mt-12 md:gap-x-16 lg:gap-x-20">
            {HOME_PROCESS_STATS.map((stat) => (
              <li key={stat.value} className="text-center">
                <p className="font-serif text-2xl tracking-tight text-[#151210] md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#4d131a]/65 md:text-[11px] md:tracking-[0.32em]">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t border-[#a38d83]/55 pt-10 md:mt-14 md:pt-12">
            <ol className="m-0 flex list-none flex-col items-stretch gap-0 p-0 lg:flex-row lg:items-start lg:justify-between">
              {HOME_PROCESS_STEPS.map((step, index) => (
                <Fragment key={step.title}>
                  <li className="flex flex-col items-center text-center lg:flex-1 lg:px-2">
                    <span className="text-[11px] font-semibold tabular-nums tracking-[0.22em] text-[#b07d55] md:text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 max-w-[14rem] font-serif text-lg leading-snug text-[#151210] md:text-xl lg:max-w-none">
                      {step.title}
                    </h3>
                  </li>
                  {index < HOME_PROCESS_STEPS.length - 1 ? (
                    <li
                      className="flex shrink-0 items-center justify-center py-3 text-[#a38d83] lg:px-1 lg:py-0 lg:pt-5"
                      aria-hidden
                    >
                      <span className="text-xl leading-none md:text-2xl">→</span>
                    </li>
                  ) : null}
                </Fragment>
              ))}
            </ol>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
