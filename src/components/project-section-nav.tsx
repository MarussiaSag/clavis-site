"use client";

import { useEffect, useState } from "react";

export type ProjectNavItem = {
  id: string;
  label: string;
};

type ProjectSectionNavProps = {
  items: ProjectNavItem[];
};

export function ProjectSectionNav({ items }: ProjectSectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.08, 0.2, 0.4],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label="Навигация по проекту"
      className="sticky top-0 z-40 border-b border-[#e0dbd5]/80 bg-[#f5f2ea]/92 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-4 py-3 [scrollbar-width:none] md:gap-2 md:px-10 md:py-3.5 lg:px-12 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-current={isActive ? "true" : undefined}
              className={`relative shrink-0 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 md:px-4 md:text-[11px] md:tracking-[0.24em] ${
                isActive ? "text-[#151210]" : "text-[#9a9086] hover:text-[#151210]"
              }`}
            >
              {item.label}
              <span
                aria-hidden
                className={`absolute inset-x-3 bottom-1 h-px transition-colors duration-300 md:inset-x-4 ${
                  isActive ? "bg-[#b07d55]" : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
