"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type ProjectInteriorGalleryProps = {
  images: string[];
  title: string;
  id?: string;
};

type PlacedTile = {
  index: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

const GAP = 3;
const TARGET_ROW_HEIGHT = 280;
const TARGET_ROW_HEIGHT_MOBILE = 220;

function useImageAspects(srcs: string[]) {
  const [aspects, setAspects] = useState<number[]>(() => srcs.map(() => 1));
  const [ready, setReady] = useState(false);
  const srcKey = srcs.join("\0");

  useEffect(() => {
    const list = srcKey ? srcKey.split("\0") : [];
    let cancelled = false;
    const next = list.map(() => 1);
    let pending = list.length;
    setReady(false);

    if (list.length === 0) {
      setAspects([]);
      setReady(true);
      return;
    }

    const finish = () => {
      if (cancelled) return;
      setAspects([...next]);
      setReady(true);
    };

    list.forEach((src, index) => {
      const img = new window.Image();
      img.onload = () => {
        if (cancelled) return;
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          next[index] = img.naturalWidth / img.naturalHeight;
        }
        pending -= 1;
        if (pending <= 0) finish();
      };
      img.onerror = () => {
        if (cancelled) return;
        pending -= 1;
        if (pending <= 0) finish();
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [srcKey]);

  return { aspects, ready };
}

/** Flickr-style justified rows — same idea as Yandex Disk «Умная плитка»: mixed ratios, flush edges, no crop. */
function layoutJustified(
  aspects: number[],
  containerWidth: number,
  targetRowHeight: number,
  gap: number,
): { tiles: PlacedTile[]; height: number } {
  if (containerWidth <= 0 || aspects.length === 0) {
    return { tiles: [], height: 0 };
  }

  const tiles: PlacedTile[] = [];
  let top = 0;
  let i = 0;

  while (i < aspects.length) {
    const rowStart = i;
    let aspectSum = 0;

    while (i < aspects.length) {
      aspectSum += aspects[i];
      const rowWidthAtTarget = aspectSum * targetRowHeight + gap * (i - rowStart);
      i += 1;
      if (rowWidthAtTarget >= containerWidth && i - rowStart >= 1) break;
      if (i - rowStart >= 5) break;
    }

    const count = i - rowStart;
    const gapsWidth = gap * Math.max(count - 1, 0);
    const isLastRow = i >= aspects.length;
    let rowAspectSum = 0;
    for (let j = rowStart; j < i; j += 1) rowAspectSum += aspects[j];

    let rowHeight = (containerWidth - gapsWidth) / rowAspectSum;
    if (isLastRow && count < 3) {
      rowHeight = Math.min(rowHeight, targetRowHeight * 1.15);
    }

    let left = 0;
    for (let j = rowStart; j < i; j += 1) {
      const width =
        j === i - 1 && !(isLastRow && count < 3)
          ? containerWidth - left
          : aspects[j] * rowHeight;
      tiles.push({
        index: j,
        left,
        top,
        width,
        height: rowHeight,
      });
      left += width + gap;
    }

    top += rowHeight + gap;
  }

  return { tiles, height: Math.max(top - gap, 0) };
}

export function ProjectInteriorGallery({ images, title, id }: ProjectInteriorGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { aspects, ready } = useImageAspects(images);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => setContainerWidth(el.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const targetRowHeight =
    containerWidth > 0 && containerWidth < 640 ? TARGET_ROW_HEIGHT_MOBILE : TARGET_ROW_HEIGHT;

  const layout = useMemo(
    () =>
      ready
        ? layoutJustified(aspects, containerWidth, targetRowHeight, GAP)
        : { tiles: [] as PlacedTile[], height: 0 },
    [aspects, containerWidth, targetRowHeight, ready],
  );

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

  if (images.length === 0) return null;

  const total = images.length;
  const totalLabel = String(total).padStart(2, "0");
  const openLightbox = (index: number) => setLightboxIndex(index);
  const goToPrevious = () =>
    setLightboxIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  const goToNext = () =>
    setLightboxIndex((current) => (current === null ? null : (current + 1) % images.length));

  return (
    <>
      <section
        id={id}
        className="bg-[#f5f2ea] pb-14 pt-8 md:pb-20 md:pt-10"
        aria-labelledby="project-photos-heading"
      >
        <div className="px-6 md:px-10 lg:px-12">
          <p
            id="project-photos-heading"
            className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#a38d83] md:text-xs"
          >
            Фотографии проекта
          </p>
        </div>

          <div
            ref={containerRef}
            className="relative mt-8 w-full md:mt-10"
            style={{ height: layout.height > 0 ? layout.height : undefined }}
          >
            {layout.height === 0 ? (
              <div className="grid grid-cols-2 gap-[3px] md:grid-cols-3">
                {images.slice(0, 6).map((src) => (
                  <div key={src} className="aspect-[4/3] animate-pulse bg-[#e8e2dc]" aria-hidden />
                ))}
              </div>
            ) : (
              layout.tiles.map((tile) => (
                <button
                  key={`${images[tile.index]}-${tile.index}`}
                  type="button"
                  onClick={() => openLightbox(tile.index)}
                  aria-label={`Открыть фото ${tile.index + 1} из ${total}`}
                  className="group absolute overflow-hidden bg-[#e8e2dc] text-left"
                  style={{
                    left: tile.left,
                    top: tile.top,
                    width: tile.width,
                    height: tile.height,
                  }}
                >
                  <Image
                    src={images[tile.index]}
                    alt={`${title} — фото ${tile.index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-[#151210]/0 transition-colors duration-300 group-hover:bg-[#151210]/8" />
                </button>
              ))
            )}
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
              alt={`${title} — фото ${lightboxIndex + 1}`}
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
