"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ProjectInteriorGalleryProps = {
  images: string[];
  title: string;
  id?: string;
};

const DRAG_THRESHOLD_PX = 8;

export function ProjectInteriorGallery({ images, title, id }: ProjectInteriorGalleryProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dragActiveRef = useRef(false);
  const dragMovedRef = useRef(false);
  const pressedIndexRef = useRef<number | null>(null);
  const dragOriginRef = useRef({ x: 0, y: 0, scrollLeft: 0 });

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || images.length === 0) return;

    const children = Array.from(track.children) as HTMLElement[];
    if (children.length === 0) return;

    const trackLeft = track.getBoundingClientRect().left;
    let closest = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    children.forEach((child, index) => {
      const distance = Math.abs(child.getBoundingClientRect().left - trackLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
  }, [images.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => updateActiveIndex();
    track.addEventListener("scroll", onScroll, { passive: true });
    updateActiveIndex();

    return () => track.removeEventListener("scroll", onScroll);
  }, [updateActiveIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (event: WheelEvent) => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 4) return;

      if (event.shiftKey && Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        track.scrollLeft += event.deltaY;
      }
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        return;
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === null ? null : (current - 1 + images.length) % images.length,
        );
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % images.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, images.length]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.buttons !== 1) return;

    const slide = (e.target as HTMLElement).closest<HTMLElement>("[data-slide-index]");
    pressedIndexRef.current = slide ? Number(slide.dataset.slideIndex) : null;

    dragActiveRef.current = true;
    dragMovedRef.current = false;
    dragOriginRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: trackRef.current?.scrollLeft ?? 0,
    };

    if (e.pointerType === "mouse") {
      trackRef.current?.setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragActiveRef.current) return;

    const dx = e.clientX - dragOriginRef.current.x;
    const dy = e.clientY - dragOriginRef.current.y;
    if (Math.abs(dx) > DRAG_THRESHOLD_PX || Math.abs(dy) > DRAG_THRESHOLD_PX) {
      dragMovedRef.current = true;
    }

    if (e.pointerType === "mouse") {
      const track = trackRef.current;
      if (!track) return;
      track.scrollLeft = dragOriginRef.current.scrollLeft - dx;
    }
  };

  const finishPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragActiveRef.current) return;

    const wasDrag = dragMovedRef.current;
    const pressedIndex = pressedIndexRef.current;

    dragActiveRef.current = false;
    dragMovedRef.current = false;
    pressedIndexRef.current = null;

    if (e.pointerType === "mouse") {
      try {
        trackRef.current?.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
    }

    if (!wasDrag && pressedIndex !== null && !Number.isNaN(pressedIndex)) {
      setLightboxIndex(pressedIndex);
    }

    updateActiveIndex();
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const goToPrevious = () => {
    setLightboxIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  };

  const goToNext = () => {
    setLightboxIndex((current) => (current === null ? null : (current + 1) % images.length));
  };

  if (images.length === 0) return null;

  const total = images.length;
  const current = String(activeIndex + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <>
      <section id={id} className="bg-[#f5f3f0] py-16 md:py-24" aria-labelledby="project-interior-heading">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <header className="mb-8 flex items-end justify-between gap-6 md:mb-12">
            <h2
              id="project-interior-heading"
              className="font-serif text-3xl tracking-[-0.02em] text-[#151210] md:text-4xl"
            >
              Интерьер
            </h2>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#4d131a]/60 md:text-xs" aria-live="polite">
              <span className="text-[#151210]">{current}</span>
              <span className="mx-3 inline-block w-16 border-t border-[#a38d83]/70 align-middle" aria-hidden />
              {totalLabel}
            </p>
          </header>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-label={`Галерея интерьера — ${title}. Листайте свайпом или перетаскиванием.`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishPointer}
          onPointerLeave={finishPointer}
          onPointerCancel={finishPointer}
          className="flex gap-2 overflow-x-auto overscroll-x-contain px-6 pb-2 [scrollbar-width:none] snap-x snap-proximity md:gap-3 md:px-10 md:touch-pan-x md:cursor-grab md:active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              data-slide-index={index}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openLightbox(index);
                }
              }}
              aria-label={`Открыть фото ${index + 1} из ${total}`}
              className="group relative aspect-[3/4] w-[72vw] shrink-0 snap-start overflow-hidden bg-[#e8e2dc] text-left sm:w-[48vw] md:w-[32vw] lg:w-[24vw]"
            >
              <Image
                src={src}
                alt={`${title} — интерьер ${index + 1}`}
                fill
                sizes="(max-width: 768px) 72vw, (max-width: 1024px) 48vw, 24vw"
                className="premium-photo pointer-events-none object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                draggable={false}
              />
              <span className="pointer-events-none absolute inset-0 bg-[#151210]/0 transition-colors duration-300 group-hover:bg-[#151210]/10" />
            </button>
          ))}
        </div>
      </section>

      {lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#151210]/94 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Просмотр фото ${lightboxIndex + 1} из ${total}`}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-2xl text-white/80 transition-colors hover:text-white md:right-8 md:top-8"
            aria-label="Закрыть галерею"
          >
            ×
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-3xl text-white/75 transition-colors hover:text-white md:left-6 md:flex"
                aria-label="Предыдущее фото"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-3xl text-white/75 transition-colors hover:text-white md:right-6 md:flex"
                aria-label="Следующее фото"
              >
                ›
              </button>
            </>
          ) : null}

          <div
            className="relative h-[min(82vh,900px)] w-full max-w-[1200px]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={images[lightboxIndex]}
              src={images[lightboxIndex]}
              alt={`${title} — интерьер ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className="premium-photo object-contain"
              priority
            />
          </div>

          <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.28em] text-white/70 md:bottom-8">
            {String(lightboxIndex + 1).padStart(2, "0")}
            <span className="mx-3 inline-block w-10 border-t border-white/35 align-middle" aria-hidden />
            {totalLabel}
          </p>
        </div>
      ) : null}
    </>
  );
}
