import Link from "next/link";
import type { Project } from "@prisma/client";
import { ArchiveSwiper } from "@/components/archive-swiper";
import { HomeFeaturedProjectSection } from "@/components/home-featured-project-section";
import { HomeFounderMagazineSection } from "@/components/home-founder-magazine-section";
import { HomeProcessSection } from "@/components/home-process-section";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import type { HomeFeaturedProject } from "@/lib/home-featured-project";
import { HOME_SERVICE_TILES } from "@/lib/home-services";
import { homeSectionPadding } from "@/lib/home-layout";

export type HomePageSectionsProps = {
  quoteProjectImage: string;
  ctaProjectImage: string;
  servicesImages: [string, string, string, string];
  archiveProjects: Project[];
  featuredProject: HomeFeaturedProject | null;
};

export function HomePageSections({
  quoteProjectImage,
  ctaProjectImage,
  servicesImages,
  archiveProjects,
  featuredProject,
}: HomePageSectionsProps) {
  const [servicesImageOne, servicesImageTwo, servicesImageThree, servicesImageFour] = servicesImages;
  const serviceTiles = [
    { image: servicesImageOne, ...HOME_SERVICE_TILES[0] },
    { image: servicesImageTwo, ...HOME_SERVICE_TILES[1] },
    { image: servicesImageThree, ...HOME_SERVICE_TILES[2] },
    { image: servicesImageFour, ...HOME_SERVICE_TILES[3] },
  ] as const;

  return (
    <>
      <HomeFounderMagazineSection />
      <section className="grid border-b border-[#a38d83] md:grid-cols-2">
        <div className="relative min-h-[460px] overflow-hidden md:min-h-[700px]">
          <div
            className="premium-photo absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${quoteProjectImage})` }}
          />
        </div>
        <RevealOnScroll
          className={`flex min-h-[460px] items-center justify-center bg-[#f4f1ed] md:min-h-[700px] ${homeSectionPadding}`}
          delayMs={40}
        >
          <div className="max-w-xl space-y-8">
            <h2 className="text-4xl leading-[1.03] md:text-6xl">
              “Каждый интерьер имеет свой ключ - он открывает дверь в мир вашего вкуса и стиля”
            </h2>
            <p className="text-lg leading-relaxed text-[#4d131a]/85">
              Мы разрабатываем интерьерные решения с нуля — от первой идеи и планировки до полной реализации проекта. Продумываем стиль, функциональность и детали, чтобы пространство было не только красивым, но и удобным для жизни. Сопровождаем проект на всех этапах: от концепции и визуализации до подбора материалов и авторского надзора.
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/portfolio#portfolio-archive"
                className="inline-flex w-full items-center justify-center border border-[#a38d83] bg-transparent px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#4d131a] transition-colors duration-300 hover:border-[#4d131a] sm:w-auto"
              >
                Смотреть портфолио
              </Link>
              <Link
                href="/about"
                className="inline-flex w-full items-center justify-center border border-[#a38d83] bg-transparent px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#4d131a] transition-colors duration-300 hover:border-[#4d131a] sm:w-auto"
              >
                Читать о нас
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <HomeProcessSection />

      <RevealOnScroll>
        <section className={`border-b border-[#a38d83] bg-[#fafafa] ${homeSectionPadding}`}>
          <header className="text-center">
            <p className="text-[11px] uppercase tracking-[0.42em] text-[#141414] md:text-xs md:tracking-[0.48em]">
              Дизайн интерьера
            </p>
          </header>

          <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-4 md:items-stretch">
            <Link
              href={serviceTiles[0].href}
              aria-label={`${serviceTiles[0].label} — перейти на страницу услуг`}
              className="group relative min-h-[420px] overflow-hidden bg-[#e8e2dc] md:min-h-[560px]"
            >
              <div
                className="premium-photo absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${serviceTiles[0].image})` }}
              />
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#141414]/75 to-transparent px-4 py-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f4f1ed] md:text-xs">
                {serviceTiles[0].label}
              </span>
            </Link>

            <div className="flex min-h-[420px] flex-col gap-5 md:min-h-[560px]">
              <Link
                href={serviceTiles[1].href}
                aria-label={`${serviceTiles[1].label} — перейти на страницу услуг`}
                className="group relative aspect-[4/3] overflow-hidden bg-[#e8e2dc]"
              >
                <div
                  className="premium-photo absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${serviceTiles[1].image})` }}
                />
                <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#141414]/75 to-transparent px-4 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f4f1ed]">
                  {serviceTiles[1].label}
                </span>
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-6">
                <p className="text-[13px] leading-[1.7] text-[#2a2420]/90 md:text-sm">
                  Почувствуйте, как замедляется время, когда вы приглушаете свет и утопаете в
                  мягком кресле с бокалом вина. Или, напротив, каким живым и динамичным становится
                  пространство, когда приходят гости.
                </p>
                <Link
                  href="/services"
                  className="inline-flex w-full items-center justify-center bg-[#141414] px-5 py-4 text-[12px] font-medium uppercase leading-none tracking-[0.18em] text-[#f4f1ed] transition-colors duration-300 hover:bg-[#4d131a] md:text-[13px] md:tracking-[0.2em]"
                >
                  Как мы создаём интерьеры
                </Link>
              </div>
            </div>

            <Link
              href={serviceTiles[2].href}
              aria-label={`${serviceTiles[2].label} — перейти на страницу услуг`}
              className="group relative min-h-[420px] overflow-hidden bg-[#e8e2dc] md:min-h-[560px]"
            >
              <div
                className="premium-photo absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${serviceTiles[2].image})` }}
              />
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#141414]/75 to-transparent px-4 py-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f4f1ed] md:text-xs">
                {serviceTiles[2].label}
              </span>
            </Link>

            <Link
              href={serviceTiles[3].href}
              aria-label={`${serviceTiles[3].label} — перейти на страницу услуг`}
              className="group relative min-h-[420px] overflow-hidden bg-[#e8e2dc] md:min-h-[560px]"
            >
              <div
                className="premium-photo absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${serviceTiles[3].image})` }}
              />
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#141414]/75 to-transparent px-4 py-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f4f1ed] md:text-xs">
                {serviceTiles[3].label}
              </span>
            </Link>
          </div>
        </section>
      </RevealOnScroll>

      {featuredProject ? <HomeFeaturedProjectSection project={featuredProject} /> : null}

      <RevealOnScroll>
        <section className={`border-b border-[#a38d83] ${homeSectionPadding}`}>
          <div className="space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="text-xs uppercase tracking-[0.26em] text-[#4d131a]/80">Архив</p>
              <Link
                href="/portfolio#portfolio-archive"
                className="text-xs uppercase tracking-[0.24em] text-[#4d131a]/85 transition-colors duration-300 hover:text-[#751f26]"
              >
                Посмотреть все
              </Link>
            </div>
            <h2 className="max-w-4xl text-5xl leading-[1.02] md:text-6xl">Портфолио</h2>
          </div>
          <div className="mt-12">
            <ArchiveSwiper projects={archiveProjects} />
          </div>
        </section>
      </RevealOnScroll>

      <section className="border-t border-[#a38d83]">
        <div className="relative min-h-[58vh] overflow-hidden md:min-h-[72vh]">
          <div
            className="premium-photo absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ctaProjectImage})` }}
          />
          <div className="hero-text-overlay absolute inset-0" />
          <div className={`absolute left-0 right-0 top-0 ${homeSectionPadding}`}>
            <div className="max-w-3xl space-y-4 text-[#f1ece7]">
              <h2 className="text-3xl leading-[1.05] md:text-5xl">
                Готовы обсудить ваш интерьер как личную историю?
              </h2>
              <Link
                href="/contacts"
                className="inline-flex w-full items-center justify-center border border-[#f1ece7] bg-transparent px-6 py-3 text-sm uppercase tracking-[0.22em] text-[#f1ece7] transition-colors duration-300 hover:bg-[#f1ece7]/15 hover:text-[#f1ece7] sm:w-auto"
              >
                Связаться
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
