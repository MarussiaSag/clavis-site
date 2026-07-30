import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

const FOUNDER_QUOTE =
  "Я всегда верила, что правильное пространство способно изменить то, как вы воспринимаете собственную жизнь.";

type HomeFounderMagazineSectionProps = {
  imageSrc: string;
};

export function HomeFounderMagazineSection({ imageSrc }: HomeFounderMagazineSectionProps) {
  return (
    <section className="grid border-b border-[#a38d83] md:grid-cols-2" aria-labelledby="home-about-heading">
      <RevealOnScroll
        className="flex items-center bg-[#f4f1ed] px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24 xl:px-20"
        delayMs={30}
        once
      >
        <div className="max-w-xl">
          <p className="ui-eyebrow text-[#8a8a8a]">О студии</p>
          <h2
            id="home-about-heading"
            className="mt-4 font-serif text-[2.25rem] font-normal leading-[1.12] tracking-[-0.03em] text-[#141414] md:text-[2.75rem] lg:text-[3.1rem] lg:leading-[1.1]"
          >
            Дизайн, который
            <br />
            <em className="font-normal italic">отражает то,</em>
            <br />
            как живут люди.
          </h2>

          <div className="ui-body mt-6 space-y-5">
            <p>
              Clavis — студия интерьерного дизайна в Москве. Мы создаём частные и коммерческие
              пространства: от квартир и домов до офисов, ресторанов и бутиков. Каждый проект
              начинается с вас — вашего ритма жизни, привычек и того, как вы хотите чувствовать себя
              дома.
            </p>
            <p>
              Мы убеждены, что хороший дизайн — это не про тренды ради трендов. Это про свет,
              пропорции и детали, которые работают на вашу жизнь каждый день — с точностью и заботой
              на каждом этапе.
            </p>
          </div>

          <blockquote className="mt-8 border-l border-[#141414]/20 pl-6">
            <p className="font-serif text-lg italic leading-relaxed text-[#141414] md:text-xl">
              «{FOUNDER_QUOTE}»
            </p>
            <cite className="mt-4 block text-[10px] font-medium uppercase not-italic tracking-[0.28em] text-[#6a6a6a] md:text-[11px]">
              — Татьяна Кожевникова, основатель
            </cite>
          </blockquote>

          <Link
            href="/about"
            className="mt-10 inline-flex w-auto items-center gap-2 border border-[#3d0d0a] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#141414] transition-colors duration-300 hover:bg-[#3d0d0a] hover:text-[#f4f1ed] md:text-[11px]"
          >
            О студии
            <span aria-hidden>→</span>
          </Link>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className="relative min-h-[420px] md:min-h-[720px]" delayMs={120} once>
        <figure className="relative h-full min-h-[420px] md:min-h-[720px]">
          <Image
            src={imageSrc}
            alt="Татьяна Кожевникова — основатель студии CLAVIS"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-[#f4f1ed]/95 px-6 py-4 text-sm text-[#141414] md:px-8 md:py-5">
            Татьяна Кожевникова — основатель студии
          </figcaption>
        </figure>
      </RevealOnScroll>
    </section>
  );
}
