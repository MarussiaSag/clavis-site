"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import type { HeroSlidePayload } from "@/lib/hero-slides";

type HomeHeroSliderProps = {
  slides: HeroSlidePayload[];
};

const SLIDE_INTERVAL_MS = 10000;
const PARALLAX_MAX_PX = 28;

export function HomeHeroSlider({ slides }: HomeHeroSliderProps) {
  const safeSlides = useMemo(
    () =>
      slides.length > 0
        ? slides
        : [{ src: "/productImg/istockphoto-1372682637-2048x2048.jpg" }],
    [slides],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [captionKey, setCaptionKey] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const activeSlide = safeSlides[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeSlides.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [safeSlides.length]);

  useEffect(() => {
    setCaptionKey((key) => key + 1);
  }, [activeIndex]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let frame = 0;

    const updateParallax = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const height = rect.height || 1;
      const progress = Math.min(Math.max(-rect.top / height, 0), 1);
      setParallaxY(progress * PARALLAX_MAX_PX);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative border-b border-[#a38d83]">
      <div className="relative min-h-[70vh] overflow-hidden bg-[#d0b5a5] md:min-h-[84vh]">
        {safeSlides.map((slide, index) => {
          const isActive = activeIndex === index;
          const translateY = isActive ? parallaxY * 0.45 : 0;

          return (
            <div
              key={`${slide.src}-${index}`}
              className={`premium-photo absolute inset-0 bg-cover bg-center transition-opacity duration-1000 will-change-transform ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${slide.src})`,
                transform: `translate3d(0, ${translateY}px, 0) scale(1.06)`,
              }}
            />
          );
        })}
        <div className="hero-text-overlay absolute inset-0 z-10" />

        {safeSlides.map((slide, index) =>
          slide.portfolioHref ? (
            <Link
              key={`hero-hit-${slide.portfolioHref}-${index}`}
              href={slide.portfolioHref}
              aria-label={
                slide.title ? `Открыть проект: ${slide.title}` : `Слайд проекта ${index + 1}`
              }
              aria-hidden={activeIndex !== index}
              tabIndex={activeIndex === index ? 0 : -1}
              className={`absolute inset-0 z-[11] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4f1ed] ${
                activeIndex === index ? "pointer-events-auto" : "pointer-events-none"
              }`}
            />
          ) : null,
        )}

        <SiteHeader variant="hero" />
        <Link
          href="/"
          className="absolute left-1/2 top-[calc(var(--spacing)*5+1rem)] z-20 block -translate-x-1/2"
        >
          <img
            src="/logos/svg/full-logo.svg"
            alt="Clavis"
            className="h-auto w-[220px] max-w-[58vw] md:w-[255px]"
          />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-20 md:px-10 md:pb-24">
          {activeSlide.title ? (
            <div key={captionKey} className="hero-slide-caption max-w-xl space-y-2">
              {activeSlide.portfolioHref ? (
                <Link href={activeSlide.portfolioHref} className="group block space-y-2">
                  <h1 className="font-serif text-2xl leading-tight text-[#f4f1ed] transition-colors duration-300 group-hover:text-[#faf6f2] md:text-3xl">
                    {activeSlide.title}
                  </h1>
                  {activeSlide.meta ? (
                    <span className="block text-[10px] uppercase tracking-[0.24em] text-[#e7d8d1]/75 md:text-[11px] md:tracking-[0.28em]">
                      {activeSlide.meta}
                    </span>
                  ) : null}
                </Link>
              ) : (
                <>
                  <h1 className="font-serif text-2xl leading-tight text-[#f4f1ed] md:text-3xl">
                    {activeSlide.title}
                  </h1>
                  {activeSlide.meta ? (
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#e7d8d1]/75 md:text-[11px] md:tracking-[0.28em]">
                      {activeSlide.meta}
                    </p>
                  ) : null}
                </>
              )}
            </div>
          ) : null}

          <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
            <Link
              href="/portfolio#portfolio-archive"
              className="inline-flex w-full items-center justify-center border border-[#f4f1ed] bg-[#f4f1ed]/10 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#f4f1ed] backdrop-blur-[2px] transition-colors duration-300 hover:bg-[#f4f1ed]/20 sm:w-auto md:text-xs"
            >
              Смотреть проекты
            </Link>
            <Link
              href="/contacts"
              className="inline-flex w-full items-center justify-center border border-[#f4f1ed]/80 bg-transparent px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#f4f1ed] transition-colors duration-300 hover:border-[#f4f1ed] hover:bg-[#f4f1ed]/10 sm:w-auto md:text-xs"
            >
              Записаться на консультацию
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 md:bottom-8 md:right-10">
          {safeSlides.map((_, index) => (
            <button
              key={`hero-indicator-${index}`}
              type="button"
              aria-label={`Показать слайд ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full border transition-colors duration-300 ${
                activeIndex === index
                  ? "border-[#f4f1ed] bg-[#f4f1ed]"
                  : "border-[#f4f1ed]/70 bg-transparent hover:border-[#f4f1ed]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
