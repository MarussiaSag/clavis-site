"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatProjectMeta } from "@/lib/project-meta";
import { homeCardGridGap, homeCardWidthClass } from "@/lib/home-layout";

type ArchiveProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  coverImage: string;
};

type ArchiveSwiperProps = {
  projects: ArchiveProject[];
  centered?: boolean;
};

const CARD_SELECTOR = "[data-archive-card]";

function getCards(track: HTMLElement) {
  return Array.from(track.querySelectorAll<HTMLElement>(CARD_SELECTOR));
}

export function ArchiveSwiper({ projects, centered = false }: ArchiveSwiperProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragActiveRef = useRef(false);
  const dragOriginRef = useRef({ x: 0, scrollLeft: 0 });
  const dragMovedRef = useRef(false);
  const blockNavigateRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sidePad, setSidePad] = useState(0);

  const getScrollStep = useCallback(() => {
    const track = trackRef.current;
    const cards = track ? getCards(track) : [];
    const first = cards[0];
    if (!track || !first) return Math.max(320, (track?.clientWidth ?? 0) * 0.72 || 280);
    const gapStr = window.getComputedStyle(track).gap || window.getComputedStyle(track).columnGap;
    const gap = Number.parseFloat(gapStr) || 16;
    return first.getBoundingClientRect().width + gap;
  }, []);

  const syncActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || projects.length < 1) return;

    if (centered) {
      const cards = getCards(track);
      if (cards.length === 0) return;
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - trackCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = index;
        }
      });
      setActiveIndex(closest);
      return;
    }

    const step = getScrollStep();
    if (step <= 0) return;
    const next = Math.min(projects.length - 1, Math.max(0, Math.round(track.scrollLeft / step)));
    setActiveIndex(next);
  }, [centered, getScrollStep, projects.length]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;

      if (centered) {
        const card = getCards(track)[index];
        card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        setActiveIndex(index);
        return;
      }

      const step = getScrollStep();
      const max = track.scrollWidth - track.clientWidth;
      const target = Math.min(index * step, max);
      track.scrollTo({ left: target, behavior: "smooth" });
      setActiveIndex(index);
    },
    [centered, getScrollStep],
  );

  useEffect(() => {
    if (!centered) return;
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const cards = getCards(track);
      if (cards.length === 0) return;
      const gapStr = window.getComputedStyle(track).gap || window.getComputedStyle(track).columnGap;
      const gap = Number.parseFloat(gapStr) || 16;
      const cardsWidth = cards.reduce(
        (sum, card, index) => sum + card.offsetWidth + (index < cards.length - 1 ? gap : 0),
        0,
      );
      setSidePad(Math.max(24, (track.clientWidth - cardsWidth) / 2));
    };

    measure();
    const frame = window.requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [centered, projects]);

  useEffect(() => {
    if (!centered || sidePad <= 0) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = 0;
    syncActiveIndex();
  }, [centered, sidePad, syncActiveIndex]);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const onWheel = (e: WheelEvent) => {
      const maxScroll = node.scrollWidth - node.clientWidth;
      if (maxScroll <= 4) return;

      if (e.shiftKey && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        node.scrollLeft += e.deltaY;
      }
    };

    const onScroll = () => syncActiveIndex();

    node.addEventListener("wheel", onWheel, { passive: false });
    node.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      node.removeEventListener("wheel", onWheel);
      node.removeEventListener("scroll", onScroll);
    };
  }, [syncActiveIndex]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.buttons !== 1) return;
    const track = trackRef.current;
    if (!track) return;
    blockNavigateRef.current = false;
    dragActiveRef.current = true;
    dragMovedRef.current = false;
    dragOriginRef.current = { x: e.clientX, scrollLeft: track.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!dragActiveRef.current || !track) return;
    const dx = e.clientX - dragOriginRef.current.x;
    if (Math.abs(dx) <= 8) return;

    if (!dragMovedRef.current) {
      dragMovedRef.current = true;
      blockNavigateRef.current = true;
      try {
        track.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }

    track.scrollLeft = dragOriginRef.current.scrollLeft - dx;
  };

  const finishPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragActiveRef.current) return;
    dragActiveRef.current = false;
    const wasDrag = dragMovedRef.current;
    dragMovedRef.current = false;

    if (wasDrag) {
      try {
        trackRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
      blockNavigateRef.current = true;
      window.setTimeout(() => {
        blockNavigateRef.current = false;
      }, 120);
      syncActiveIndex();
    }
  };

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!blockNavigateRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    blockNavigateRef.current = false;
  };

  if (projects.length === 0) return null;

  const cardWidthClass = homeCardWidthClass;

  return (
    <div className="relative w-full">
      <div
        ref={trackRef}
        role="region"
        aria-label="Подборка проектов — перетаскивание или Shift + колёсико"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointer}
        onPointerLeave={finishPointer}
        onPointerCancel={finishPointer}
        className={[
          "flex items-stretch overflow-x-auto pb-2 pt-1 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden md:touch-pan-x md:cursor-grab active:cursor-grabbing",
          homeCardGridGap,
          centered ? "snap-center" : "snap-start",
        ].join(" ")}
      >
        {centered ? <div className="shrink-0" style={{ width: sidePad }} aria-hidden /> : null}

        {projects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              data-archive-card
              onClick={onLinkClick}
              draggable={false}
              onMouseEnter={() => setActiveIndex(index)}
              className={`group flex h-auto shrink-0 flex-col ${cardWidthClass}`}
            >
              <article
                className={`flex h-full flex-col overflow-hidden rounded-md border transition-colors duration-300 ${
                  isActive
                    ? "border-[#f1ece7]/60"
                    : "border-[#5c2a2e] group-hover:border-[#f1ece7]/50"
                }`}
              >
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-[#5a2528]">
                  <div
                    className={`premium-photo h-full w-full bg-cover bg-center transition-all duration-500 ${
                      isActive ? "scale-100 brightness-100" : "scale-[1.02] brightness-[0.82] group-hover:brightness-100"
                    }`}
                    style={{ backgroundImage: `url(${project.coverImage})` }}
                  />
                </div>

                <div
                  className={`flex min-h-[7.25rem] flex-1 flex-col justify-between px-5 py-5 transition-colors duration-300 md:min-h-[7.75rem] md:px-6 md:py-6 ${
                    isActive
                      ? "bg-white text-[#141414]"
                      : "bg-[#4d131a] text-white group-hover:bg-white group-hover:text-[#141414]"
                  }`}
                >
                  <h3
                    className={`line-clamp-2 text-[15px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 md:text-base ${
                      isActive ? "text-[#141414]" : "text-[#f1ece7] group-hover:text-[#141414]"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mt-1.5 text-[10px] uppercase tracking-[0.24em] md:text-[11px] md:tracking-[0.28em] ${
                      isActive ? "text-[#6a6a6a]" : "text-white/65 group-hover:text-[#6a6a6a]"
                    }`}
                  >
                    {formatProjectMeta(project)}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}

        {centered ? <div className="shrink-0" style={{ width: sidePad }} aria-hidden /> : null}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2.5 md:mt-10">
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={project.id}
              type="button"
              aria-label={`Показать проект ${project.title}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                isActive
                  ? "bg-[#c9bba8]"
                  : "border border-[#4a4a4a] bg-transparent hover:border-[#8a8a8a]"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
