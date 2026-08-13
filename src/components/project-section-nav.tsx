"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type ProjectNavItem = {
  id: string;
  label: string;
};

type ProjectSectionNavProps = {
  items: ProjectNavItem[];
};

const HEADER_LOGO = "/logos/svg/header-logo.svg";

export function ProjectSectionNav({ items }: ProjectSectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsStuck(!entry.isIntersecting);
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

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
    <>
      <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      <nav
        aria-label="Навигация по проекту"
        className="sticky top-0 z-40 border-b border-[#5c2a2e] bg-[#3d0d0a]"
      >
        <div className="relative mx-auto flex max-w-[1440px] items-center px-4 py-3 md:px-10 md:py-3.5 lg:px-12">
          <Link
            href="/"
            aria-label="На главную"
            className={`absolute left-4 z-10 inline-flex h-8 items-center transition-opacity duration-300 hover:opacity-80 md:left-10 lg:left-12 ${
              isStuck ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HEADER_LOGO}
              alt="Clavis"
              className="h-6 w-auto md:h-7"
            />
          </Link>

          <div
            className={`flex w-full justify-center gap-1 overflow-x-auto [scrollbar-width:none] md:gap-2 [&::-webkit-scrollbar]:hidden ${
              isStuck ? "pl-16 md:pl-24" : ""
            }`}
          >
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative shrink-0 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 md:px-4 md:text-[11px] md:tracking-[0.24em] ${
                    isActive ? "text-[#f4f1ed]" : "text-white/45 hover:text-[#f4f1ed]"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 bottom-1 h-px transition-colors duration-300 md:inset-x-4 ${
                      isActive ? "bg-[#e7d8d1]" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
