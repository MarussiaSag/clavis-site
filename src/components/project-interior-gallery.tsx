"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProjectInteriorGalleryProps = {
  images: string[];
  title: string;
  id?: string;
};

function GalleryTile({
  src,
  alt,
  index,
  total,
  onOpen,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  onOpen: (index: number) => void;
  className: string;
  sizes: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Открыть фото ${index + 1} из ${total}`}
      className={`group relative overflow-hidden bg-[#e8e2dc] text-left ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <span className="pointer-events-none absolute inset-0 bg-[#151210]/0 transition-colors duration-300 group-hover:bg-[#151210]/8" />
    </button>
  );
}

export function ProjectInteriorGallery({ images, title, id }: ProjectInteriorGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
          <p
            id="project-photos-heading"
            className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#a38d83] md:text-xs"
          >
            Фотографии проекта
          </p>

          <div className="mt-8 space-y-2.5 md:mt-10 md:space-y-3">
            {Array.from({ length: Math.ceil(images.length / 2) }, (_, rowIndex) => {
              const leftIndex = rowIndex * 2;
              const rightIndex = leftIndex + 1;
              const leftSrc = images[leftIndex];
              const rightSrc = images[rightIndex];
              const wideOnLeft = rowIndex % 2 === 0;

              return (
                <div
                  key={`row-${rowIndex}`}
                  className={`grid grid-cols-1 gap-2.5 md:items-stretch md:gap-3 ${
                    wideOnLeft
                      ? "md:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]"
                      : "md:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)]"
                  }`}
                >
                  <GalleryTile
                    src={leftSrc}
                    alt={`${title} — фото ${leftIndex + 1}`}
                    index={leftIndex}
                    total={total}
                    onOpen={openLightbox}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="aspect-[16/11] w-full md:aspect-auto md:min-h-[300px] lg:min-h-[360px]"
                  />

                  {rightSrc ? (
                    <GalleryTile
                      src={rightSrc}
                      alt={`${title} — фото ${rightIndex + 1}`}
                      index={rightIndex}
                      total={total}
                      onOpen={openLightbox}
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="aspect-[3/4] w-full md:aspect-auto md:h-full md:min-h-[300px] lg:min-h-[360px]"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
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
