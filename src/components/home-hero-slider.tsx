"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";

type HomeHeroSliderProps = {
  slides: string[];
};

export function HomeHeroSlider({ slides }: HomeHeroSliderProps) {
  const safeSlides = useMemo(
    () => (slides.length > 0 ? slides : ["/productImg/istockphoto-1372682637-2048x2048.jpg"]),
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
            key={`${slide}-${index}`}
            className={`premium-photo absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
        <div className="hero-text-overlay absolute inset-0 z-10" />

        <SiteHeader variant="hero" />
        <Link href="/" className="absolute left-1/2 top-5 z-20 block -translate-x-1/2">
          <img
            src="/logos/svg/full-logo.svg"
            alt="Clavis"
            className="h-auto w-[425px] max-w-[85vw] brightness-0 invert"
          />
        </Link>

        <Link
          href="/portfolio"
          className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-6 md:px-10 md:pb-10"
        >
          <div className="max-w-3xl space-y-4 text-[#e7d8d1]">
            <p className="text-xs uppercase tracking-[0.28em]">Clavis</p>
            <h1 className="text-5xl leading-[0.94] md:text-8xl">Interior Stories</h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#e7d8d1]/90 md:text-lg">
              Создаю интерьеры как редакционные развороты: выразительно, функционально и с
              индивидуальным почерком.
            </p>
          </div>
        </Link>

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
