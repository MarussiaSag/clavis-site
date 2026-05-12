"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import aboutHero from "../../public/logos/about.png";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function AboutParallaxHero() {
  const [scrollY, setScrollY] = useState(0);

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

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const limitedScroll = clamp(scrollY, 0, 900);
  const backgroundShift = limitedScroll * 0.22;
  const backgroundXShift = 0;

  return (
    <section className="relative min-h-[72vh] md:min-h-[84vh]">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: `translate3d(${backgroundXShift}px, ${backgroundShift - 14}px, 0) scale(1.06)`,
            willChange: "transform",
          }}
        >
          <Image
            src={aboutHero}
            alt="Интерьер в стиле CLAVIS Studio"
            fill
            priority
            sizes="100vw"
            className="premium-photo object-cover object-center"
          />
        </div>
      </div>
      <div className="hero-text-overlay pointer-events-none absolute inset-0" />
      <div className="premium-overlay pointer-events-none absolute inset-0" />

      <div className="relative z-20 mx-auto flex min-h-[72vh] w-full max-w-[1280px] flex-col justify-end px-6 pb-7 pt-[84px] md:min-h-[84vh] md:px-10 md:pb-9 md:pt-[92px]">
        <div className="max-w-[680px] space-y-5 text-[#e7d8d1]">
          <p className="text-xs uppercase tracking-[0.34em] text-[#e7d8d1]/85 md:text-sm">Clavis Studio</p>
            <h1 className="text-4xl leading-[0.96] md:text-6xl lg:text-[4.6rem]">
                ЭСТЕТИКА ПРОСТРАНСТВА
                <br/>
                ЭТАЛОН РЕАЛИЗАЦИИ
            </h1>
            <p className="max-w-[620px] text-sm leading-relaxed text-[#e7d8d1]/88 md:text-base">
            Берем на себя весь процесс под ключ: чертежи, комплектацию, поставщиков и контроль
            реализации. Вам остается получить готовое пространство без лишних решений и ошибок.
          </p>
        </div>
      </div>
    </section>
  );
}
