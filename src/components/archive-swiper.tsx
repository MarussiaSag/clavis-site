"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

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
};

const AUTO_SCROLL_MS = 5500;

export function ArchiveSwiper({ projects }: ArchiveSwiperProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragActiveRef = useRef(false);
  const dragOriginRef = useRef({ x: 0, scrollLeft: 0 });
  const dragMovedRef = useRef(false);
  const blockNavigateRef = useRef(false);
  const pauseAutoRef = useRef(false);
  const wheelResumeTimeoutRef = useRef<number | null>(null);

  const getScrollStep = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | undefined;
    if (!track || !first) return Math.max(320, (track?.clientWidth ?? 0) * 0.72 || 280);
    const gapStr = window.getComputedStyle(track).gap || window.getComputedStyle(track).columnGap;
    const gap = Number.parseFloat(gapStr) || 32;
    return first.getBoundingClientRect().width + gap;
  }, []);

  const scrollNext = useCallback(() => {
    const track = trackRef.current;
    if (!track || projects.length < 1) return;
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 4) return;
    const step = getScrollStep();
    if (track.scrollLeft >= max - 2) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    track.scrollBy({ left: Math.min(step, max - track.scrollLeft), behavior: "smooth" });
  }, [getScrollStep, projects.length]);

  useEffect(() => {
    const tick = window.setInterval(() => {
      if (pauseAutoRef.current) return;
      scrollNext();
    }, AUTO_SCROLL_MS);
    return () => window.clearInterval(tick);
  }, [scrollNext]);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      pauseAutoRef.current = true;
      node.scrollLeft += e.deltaY;
      if (wheelResumeTimeoutRef.current != null) clearTimeout(wheelResumeTimeoutRef.current);
      wheelResumeTimeoutRef.current = window.setTimeout(() => {
        wheelResumeTimeoutRef.current = null;
        pauseAutoRef.current = false;
      }, 4200);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      node.removeEventListener("wheel", onWheel);
      if (wheelResumeTimeoutRef.current != null) clearTimeout(wheelResumeTimeoutRef.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.buttons !== 1) return;
    const track = trackRef.current;
    if (!track) return;
    blockNavigateRef.current = false;
    dragActiveRef.current = true;
    dragMovedRef.current = false;
    dragOriginRef.current = { x: e.clientX, scrollLeft: track.scrollLeft };
    pauseAutoRef.current = true;
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!dragActiveRef.current || !track) return;
    const dx = e.clientX - dragOriginRef.current.x;
    if (Math.abs(dx) > 4) dragMovedRef.current = true;
    track.scrollLeft = dragOriginRef.current.scrollLeft - dx;
  };

  const finishPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragActiveRef.current) return;
    dragActiveRef.current = false;
    try {
      trackRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
    const wasDrag = dragMovedRef.current;
    dragMovedRef.current = false;
    if (wasDrag) {
      blockNavigateRef.current = true;
      window.setTimeout(() => {
        blockNavigateRef.current = false;
      }, 420);
    }
    window.setTimeout(() => {
      pauseAutoRef.current = false;
    }, 2600);
  };

  const onLinkClickCapture = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!blockNavigateRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    blockNavigateRef.current = false;
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label="Подборка проектов — прокрутка мышью или автоматически"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointer}
        onPointerLeave={finishPointer}
        onPointerCancel={finishPointer}
        className="-mx-1 flex gap-8 overflow-x-auto px-1 pb-14 pt-2 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden md:touch-pan-x md:cursor-grab active:cursor-grabbing"
      >
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.slug}`}
            onClickCapture={onLinkClickCapture}
            draggable={false}
            className="group block min-w-[78vw] shrink-0 snap-start bg-[#f8f5f1] p-4 shadow-[0_10px_28px_rgba(61,13,10,0.07)] md:min-w-[48vw] xl:min-w-[36vw]"
          >
            <div className="space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden bg-white p-3">
                <div
                  className="premium-photo pointer-events-none h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${project.coverImage})` }}
                />
              </div>
              <div className="space-y-2 border-t border-[#d0b5a5] pt-3">
                <h3 className="text-3xl leading-none">{project.title}</h3>
                <p className="text-xs uppercase tracking-[0.18em] text-[#4d131a]/75">
                  {project.category} / {project.location} / {project.year}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
