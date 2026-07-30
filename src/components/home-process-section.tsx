"use client";

import { useId, useState } from "react";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { splitSectionContainer } from "@/lib/home-layout";
import { HOME_PROCESS_INTRO, HOME_PROCESS_STEPS } from "@/lib/home-process";

const cellX = "px-0 sm:px-6 md:px-8 lg:px-10";

export function HomeProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelId = useId();
  const activeStep = HOME_PROCESS_STEPS[activeIndex];

  return (
    <section className="border-b border-[#5c2a2e] bg-[#3d0d0a]" aria-labelledby="home-process-heading">
      <div className={splitSectionContainer}>
        <RevealOnScroll once>
          <div>
            <p id="home-process-heading" className="ui-eyebrow text-white/45">
              Как мы работаем
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-[minmax(0,30%)_minmax(0,70%)] sm:items-start">
              <h2 className="ui-title text-[#f1ece7]">Процесс работы</h2>
              <p className={`ui-body mt-4 min-w-0 text-white/55 sm:col-start-2 sm:row-start-1 sm:mt-0 ${cellX}`}>
                {HOME_PROCESS_INTRO}
              </p>
            </div>
          </div>

          <div className="mt-12 border-b border-white/15 md:mt-16 lg:mt-20">
            <div
              className="-mb-px flex gap-0 overflow-x-auto"
              role="tablist"
              aria-label="Этапы процесса работы"
            >
              {HOME_PROCESS_STEPS.map((step, index) => {
                const isActive = index === activeIndex;
                const tabId = `${panelId}-tab-${index}`;

                return (
                  <button
                    key={step.title}
                    id={tabId}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    onClick={() => setActiveIndex(index)}
                    className={[
                      "relative flex min-w-[9.5rem] shrink-0 flex-col items-start gap-3 px-4 pb-5 text-left transition-colors duration-300 sm:min-w-[11rem] sm:px-5 md:min-w-[12.5rem] lg:px-6",
                      isActive ? "text-[#f1ece7]" : "text-white/35 hover:text-white/55",
                    ].join(" ")}
                  >
                    <span className="font-mono text-xs tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[1.55rem] md:text-[1.65rem]">
                      {step.title}
                    </span>
                    <span
                      className={[
                        "absolute right-4 bottom-0 left-4 h-[3px] transition-opacity duration-300 sm:right-5 sm:left-5 lg:right-6 lg:left-6",
                        isActive ? "bg-[#a38d83] opacity-100" : "opacity-0",
                      ].join(" ")}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={`${panelId}-tab-${activeIndex}`}
            className="max-w-3xl py-8 md:py-10 lg:py-12"
          >
            <p className="ui-body text-white/60">{activeStep.description}</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
