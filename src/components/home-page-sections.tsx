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
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import type { HomeFeaturedProject } from "@/lib/home-featured-project";
import { fullWidthSectionHeader, fullWidthSectionX, sectionContainer, sectionContentGap } from "@/lib/home-layout";

export type HomePageSectionsProps = {
  quoteProjectImage: string;
  ctaProjectImage: string;
  archiveProjects: Project[];
  featuredProject: HomeFeaturedProject | null;
};

export function HomePageSections({
  quoteProjectImage,
  ctaProjectImage,
  archiveProjects,
  featuredProject,
}: HomePageSectionsProps) {
  return (
    <>
      <HomeStudioHighlightsSection />
      <HomeFounderMagazineSection />
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
                className="inline-flex w-full items-center justify-center gap-2 bg-[#141414] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#4d131a] sm:w-auto md:text-xs"
              >
                Наши проекты
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center gap-2 border border-[#141414] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#141414] transition-colors duration-300 hover:bg-[#141414] hover:text-white sm:w-auto md:text-xs"
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
        <section className="border-b border-[#2a2a2a] bg-[#141414]">
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

      <HomeBlogSection />

      <HomeFaqSection />

      <section className="border-t border-[#a38d83]">
        <div className="relative min-h-[58vh] overflow-hidden md:min-h-[72vh]">
          <div
            className="premium-photo absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ctaProjectImage})` }}
          />
          <div className="hero-text-overlay absolute inset-0" />
          <div className={`absolute inset-x-0 bottom-0 ${fullWidthSectionX} pb-12 md:pb-16`}>
            <div className="ui-header max-w-3xl text-[#f1ece7]">
              <h2 className="ui-title text-[#f1ece7]">Готовы обсудить ваш проект?</h2>
              <p className="text-base leading-relaxed text-[#e7d8d1]/90 md:text-lg">
                Оставьте заявку, и мы свяжемся с вами для консультации
              </p>
              <Link
                href="/contacts"
                className="inline-flex w-auto self-start border border-[#f1ece7] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#f1ece7] transition-colors duration-300 hover:bg-[#f1ece7]/15 md:text-xs"
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
