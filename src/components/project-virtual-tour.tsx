import Image from "next/image";

type ProjectVirtualTourProps = {
  tourUrl: string;
  image: string;
  id?: string;
};

export function ProjectVirtualTour({ tourUrl, image, id }: ProjectVirtualTourProps) {
  if (!tourUrl) return null;

  return (
    <section
      id={id}
      className="relative isolate min-h-[70vh] overflow-hidden md:min-h-[78vh]"
      aria-labelledby="project-tour-heading"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#151210]/72" aria-hidden />

      <div className="relative z-10 flex min-h-[70vh] items-center justify-center px-6 py-20 md:min-h-[78vh] md:px-10 md:py-24">
        <div className="mx-auto max-w-2xl text-center text-white">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/70 md:text-xs">
            Исследуйте пространство
          </p>

          <h2
            id="project-tour-heading"
            className="mt-5 font-serif text-[2.4rem] font-normal leading-[1.12] tracking-[-0.02em] md:mt-6 md:text-[3.25rem] lg:text-[3.6rem]"
          >
            Виртуальный тур
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-[1.75] text-white/75 md:mt-7 md:text-base md:leading-[1.8]">
            Пройдитесь по каждой комнате в интерактивном 360°-туре. Почувствуйте масштаб и
            атмосферу пространства до личного визита.
          </p>

          <a
            href={tourUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-3 border border-white/80 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#151210] md:mt-10 md:px-7 md:text-xs"
          >
            <span
              aria-hidden
              className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current"
            >
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-current" aria-hidden>
                <path d="M3.2 1.6v8.8L10.4 6 3.2 1.6Z" />
              </svg>
            </span>
            Начать тур
          </a>
        </div>
      </div>
    </section>
  );
}
