"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type AboutParallaxHeroProps = {
  imageSrc: string;
};

export function AboutParallaxHero({ imageSrc }: AboutParallaxHeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const backgroundShift = clamp(scrollY, 0, 720) * 0.14;

  return (
    <section
      className="relative grid min-h-[100svh] bg-[#f3efe8] md:min-h-[100svh] md:grid-cols-2"
      aria-labelledby="about-hero-heading"
    >
      <div className="relative min-h-[58vh] overflow-hidden md:min-h-full">
        <div
          className="absolute inset-0"
          style={{
            transform: `translate3d(0, ${backgroundShift - 10}px, 0) scale(1.05)`,
            willChange: "transform",
          }}
        >
          <Image
            src={imageSrc}
            alt="Интерьер в стиле CLAVIS Studio"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="premium-photo object-cover object-center"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/25" />

        <div
          className={`absolute inset-x-0 bottom-0 px-6 pb-7 pt-16 md:px-10 md:pb-10 transition-all duration-1000 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
            visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <p
            aria-hidden
            className="pointer-events-none absolute bottom-2 left-4 select-none font-serif text-[7.5rem] leading-none tracking-[-0.06em] text-white/[0.07] md:bottom-3 md:left-6 md:text-[10rem] lg:text-[11.5rem]"
          >
            2017
          </p>
          <p className="relative text-[10px] font-medium uppercase tracking-[0.32em] text-[#f4f1ed]/88 md:text-[11px]">
            Основана в Москве, 2017
          </p>
        </div>
      </div>

      <div className="relative flex items-center px-6 py-14 md:px-12 md:py-20 lg:px-16 xl:px-20">
        <div
          className={`mx-auto w-full max-w-[34rem] space-y-7 transition-all delay-150 duration-1000 ease-[cubic-bezier(0.2,0.7,0.2,1)] md:space-y-8 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-[#8a7a6e] md:text-xs">
            О студии
          </p>

          <h1
            id="about-hero-heading"
            className="font-serif text-[2.35rem] font-normal leading-[1.12] tracking-[-0.03em] text-[#1a1512] md:text-[2.85rem] lg:text-[3.35rem] lg:leading-[1.1]"
          >
            Эстетика пространства.
            <br />
            <em className="font-normal italic">Точность</em> реализации.
          </h1>

          <div className="space-y-5 text-[15px] leading-[1.72] text-[#3a342f]/88 md:text-base md:leading-[1.75]">
            <p>
              Clavis — студия интерьерного дизайна в Москве, основанная Татьяной Кожевниковой. За
              семь лет мы реализовали более 150 проектов: от частных квартир и домов до офисов,
              ресторанов и бутиков.
            </p>
            <p>
              Мы проектируем не для идеальных кадров, а для реальной жизни — как вы завтракаете,
              возвращаетесь домой, собираете мысли. Каждое решение подчинено тому, как пространство
              будет работать каждый день.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
