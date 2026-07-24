"use client";

import { useId, useState } from "react";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { splitSectionContainer } from "@/lib/home-layout";
import { HOME_FAQ_ITEMS } from "@/lib/home-faq";

function FaqItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();

  return (
    <div className="border-b border-[#a38d83]/40">
      <button
        type="button"
        id={id}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-[#4d131a] md:py-6"
      >
        <span className="text-base font-medium leading-snug text-[#141414]">{question}</span>
        <span
          className={`shrink-0 text-xl font-light leading-none text-[#141414]/55 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="ui-body-sm max-w-prose pb-5 md:pb-6">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function HomeFaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="border-b border-[#a38d83]/45 bg-[#f4f1ed]" aria-labelledby="home-faq-heading">
      <div className={splitSectionContainer}>
        <RevealOnScroll once>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:gap-24">
            <div className="ui-header shrink-0 lg:max-w-[17rem] lg:sticky lg:top-28">
              <p id="home-faq-heading" className="ui-eyebrow text-[#8a8a8a]">
                Частые вопросы
              </p>
              <h2 className="ui-title text-[#141414]">
                Ответы на <em className="italic">популярные</em> вопросы
              </h2>
            </div>

            <div className="grid min-w-0 gap-x-12 gap-y-0 sm:grid-cols-2 lg:gap-x-16">
              <div>
                {HOME_FAQ_ITEMS.slice(0, 3).map((item) => (
                  <FaqItem
                    key={item.id}
                    id={`faq-${item.id}`}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openId === item.id}
                    onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
                  />
                ))}
              </div>
              <div>
                {HOME_FAQ_ITEMS.slice(3).map((item) => (
                  <FaqItem
                    key={item.id}
                    id={`faq-${item.id}`}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openId === item.id}
                    onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
                  />
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
