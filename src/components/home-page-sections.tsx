import Image from "next/image";
import Link from "next/link";
import type { Project } from "@prisma/client";
import { ArchiveSwiper } from "@/components/archive-swiper";
import { HomeBlogSection } from "@/components/home-blog-section";
import { HomeFaqSection } from "@/components/home-faq-section";
import { HomeFeaturedProjectSection } from "@/components/home-featured-project-section";
import { HomeFounderMagazineSection } from "@/components/home-founder-magazine-section";
import { HomeStudioHighlightsSection } from "@/components/home-studio-highlights-section";
import { HomeProcessSection } from "@/components/home-process-section";
import { HomeServicesSection } from "@/components/home-services-section";
import { HomeTrustPressSection } from "@/components/home-trust-press-section";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import type { HomeFeaturedProject } from "@/lib/home-featured-project";
import { fullWidthSectionHeader, fullWidthSectionX, sectionContainer, sectionContentGap } from "@/lib/home-layout";

export type HomePageSectionsProps = {
  quoteProjectImage: string;
  archiveProjects: Project[];
  featuredProject: HomeFeaturedProject | null;
  founderImage: string;
  ctaImage: string;
};

export function HomePageSections({
  quoteProjectImage,
  archiveProjects,
  featuredProject,
  founderImage,
  ctaImage,
}: HomePageSectionsProps) {
  return (
    <>
      <HomeStudioHighlightsSection />
      <HomeFounderMagazineSection imageSrc={founderImage} />
      <section className="grid border-b border-[#a38d83] md:grid-cols-2">
        <div className="relative min-h-[460px] overflow-hidden md:min-h-[700px]">
          <div
            className="premium-photo absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${quoteProjectImage})` }}
          />
        </div>
        <RevealOnScroll
          className="flex min-h-[460px] items-center bg-[#f4f1ed] px-6 py-16 md:min-h-[700px] md:px-12 lg:px-16 xl:px-20"
          delayMs={40}
        >
          <div className="max-w-xl">
            <p className="ui-eyebrow mb-8 text-[#8a8a8a]">Наше кредо</p>
            <div className="flex flex-col gap-8">
              <blockquote className="m-0 flex flex-col gap-8 border-0 p-0">
                <p className="font-serif text-2xl italic leading-relaxed tracking-[-0.02em] text-[#141414] md:text-3xl lg:text-[2.15rem] lg:leading-[1.38]">
                  «Каждый интерьер имеет свой ключ — он открывает дверь в мир вашего вкуса и стиля»
                </p>
                <cite className="block text-[10px] font-medium uppercase not-italic tracking-[0.28em] text-[#6a6a6a] md:text-[11px]">
                  — Татьяна Кожевникова, основатель
                </cite>
              </blockquote>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/portfolio#portfolio-archive"
                className="inline-flex w-full items-center justify-center gap-2 bg-[#3d0d0a] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#4d131a] sm:w-auto md:text-xs"
              >
                Наши проекты
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center gap-2 border border-[#3d0d0a] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#141414] transition-colors duration-300 hover:bg-[#3d0d0a] hover:text-white sm:w-auto md:text-xs"
              >
                Наши услуги
                <span aria-hidden>→</span>
              </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <HomeServicesSection />
      <HomeProcessSection />

      {featuredProject ? <HomeFeaturedProjectSection project={featuredProject} /> : null}

      <RevealOnScroll>
        <section className="border-b border-[#5c2a2e] bg-[#3d0d0a]">
          <div className={fullWidthSectionHeader}>
            <div className="ui-header">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <p className="ui-eyebrow text-white/45">Портфолио</p>
                <Link
                  href="/portfolio#portfolio-archive"
                  className="ui-link text-white/70 hover:text-white"
                >
                  Посмотреть все
                </Link>
              </div>
              <h2 className="ui-title text-[#f1ece7]">Избранные проекты</h2>
            </div>
          </div>
          <div className={`${sectionContentGap} ${fullWidthSectionX} pb-12 md:pb-16`}>
            <ArchiveSwiper projects={archiveProjects} centered />
          </div>
        </section>
      </RevealOnScroll>

      <HomeTrustPressSection />

      <HomeBlogSection />

      <HomeFaqSection />

      <section
        aria-labelledby="home-cta-heading"
        className="relative isolate overflow-hidden bg-[#3d0d0a]"
      >
        <div className="relative min-h-[58vh] w-full md:min-h-[68vh] lg:min-h-[72vh]">
          <Image
            src={ctaImage}
            alt="Интерьер студии CLAVIS"
            fill
            sizes="100vw"
            className="premium-photo object-cover object-center"
            quality={88}
          />
          <div className="hero-text-overlay pointer-events-none absolute inset-0" />
          <div className="premium-overlay pointer-events-none absolute inset-0" />

          <div
            className={`${fullWidthSectionX} relative z-10 flex min-h-[58vh] flex-col items-center justify-center py-20 text-center md:min-h-[68vh] md:py-28 lg:min-h-[72vh]`}
          >
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 md:gap-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-white/55 md:text-xs">
                Начнём
              </p>
              <h2
                id="home-cta-heading"
                className="font-serif text-[2.5rem] font-normal leading-[1.12] tracking-[-0.03em] text-[#f1ece7] md:text-[3.25rem] lg:text-[3.75rem] lg:leading-[1.08]"
              >
                Готовы обсудить
                <br />
                <em className="font-normal italic">ваш проект?</em>
              </h2>
              <p className="max-w-xl text-[15px] leading-[1.7] text-[#e7d8d1]/88 md:text-lg md:leading-[1.65]">
                Мы берём ограниченное число новых проектов в год. Напишите нам — мы будем рады узнать о
                вашем пространстве.
              </p>
              <Link
                href="/contacts"
                className="mt-2 inline-flex border border-[#f1ece7] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#f1ece7] transition-colors duration-300 hover:bg-[#f1ece7]/15 md:text-xs"
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
