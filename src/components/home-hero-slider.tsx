"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import type { HeroSlidePayload } from "@/lib/hero-slides";

type HomeHeroSliderProps = {
  slides: HeroSlidePayload[];
};

export function HomeHeroSlider({ slides }: HomeHeroSliderProps) {
  const safeSlides = useMemo(
    () =>
      slides.length > 0
        ? slides
        : [{ src: "/productImg/istockphoto-1372682637-2048x2048.jpg" }],
    [slides],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeSlides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [safeSlides.length]);

  return (
    <section className="relative border-b border-[#a38d83]">
      <div className="relative min-h-[70vh] overflow-hidden bg-[#d0b5a5] md:min-h-[84vh]">
        {safeSlides.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            className={`premium-photo absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        ))}
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
        <Link href="/" className="absolute left-1/2 top-[calc(var(--spacing)*5+1rem)] z-20 block -translate-x-1/2">
          <img
            src="/logos/svg/full-logo.svg"
            alt="Clavis"
            className="h-auto w-[425px] max-w-[85vw]"
          />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-6 md:px-10 md:pb-10">
          <h1
            className="max-w-4xl text-[11px] uppercase text-[#e7d8d1]/80 md:text-xs"
            style={{
              fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
              fontWeight: 500,
              letterSpacing: "clamp(0.42em, 0.06em + 1.65vw, 0.76em)",
            }}
          >
            Студия дизайна интерьера
          </h1>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-8">
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
