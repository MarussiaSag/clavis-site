import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArchiveSwiper } from "@/components/archive-swiper";
import { ArchiveHoverImage } from "@/components/archive-hover-image";
import { HomeHeroSlider } from "@/components/home-hero-slider";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { getSiteData } from "@/lib/site-data";

export default async function Home() {
  const { projects } = await getSiteData();
  const [leadProject, secondProject, thirdProject] = projects;
  const archiveProjects = projects.slice(0, 4);
  const showcaseImagePath = "/productImg/hero.jpg";
  const showcaseHoverImagePath = "/productImg/hero-hover.jpg";
  const mirrorShowcaseImagePath = "/productImg/hero-2.jpg";
  const mirrorShowcaseHoverImagePath = "/productImg/hero-2-hover.jpg";
  const showcaseImage = existsSync(join(process.cwd(), "public", "productImg", "hero.jpg"))
    ? showcaseImagePath
    : leadProject?.coverImage ?? "/vercel.svg";
  const showcaseHoverImage = existsSync(join(process.cwd(), "public", "productImg", "hero-hover.jpg"))
    ? showcaseHoverImagePath
    : secondProject?.coverImage ?? showcaseImage;
  const mirrorShowcaseImage = existsSync(join(process.cwd(), "public", "productImg", "hero-2.jpg"))
    ? mirrorShowcaseImagePath
    : thirdProject?.coverImage ?? showcaseHoverImage;
  const mirrorShowcaseHoverImage = existsSync(
    join(process.cwd(), "public", "productImg", "hero-2-hover.jpg"),
  )
    ? mirrorShowcaseHoverImagePath
    : leadProject?.coverImage ?? mirrorShowcaseImage;
  const nextProjectImage = existsSync(join(process.cwd(), "public", "Next-Project.png"))
    ? "/Next-Project.png"
    : "/productImg/istockphoto-1334118685-2048x2048.jpg";

  return (
    <div className="min-h-screen">
      <main className="w-full">
        <HomeHeroSlider
          slides={[
            "/productImg/istockphoto-1372682637-2048x2048.jpg",
            showcaseImage,
            showcaseHoverImage,
            mirrorShowcaseImage,
          ]}
        />

        <section className="grid border-b border-[#a38d83] md:grid-cols-2">
          <div className="group relative min-h-[460px] overflow-hidden md:min-h-[700px]">
            <div
              className="premium-photo absolute inset-0 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-0"
              style={{ backgroundImage: `url(${showcaseImage})` }}
            />
            <div
              className="premium-photo absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ backgroundImage: `url(${showcaseHoverImage})` }}
            />
          </div>
          <div className="flex min-h-[460px] items-center justify-center bg-[#f4f1ed] px-8 py-14 md:min-h-[700px] md:px-14">
            <div className="max-w-md space-y-8 text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-[#4d131a]/80">Clavis presents</p>
              <h2 className="text-5xl leading-[1] md:text-7xl">
                <span className="block text-xs uppercase tracking-[0.24em] text-[#4d131a]/80 md:text-sm">
                  the project
                </span>
                <br />
                &quot;Chaveta&quot;
              </h2>
              <Link
                href="/portfolio"
                className="inline-block border-b border-[#4d131a] pb-1 text-sm text-[#4d131a]/90 hover:text-[#751f26]"
              >
                Смотреть детали проекта
              </Link>
            </div>
          </div>
        </section>

        <section className="grid border-b border-[#a38d83] md:grid-cols-2">
          <div className="flex min-h-[460px] items-center justify-center bg-[#f4f1ed] px-8 py-14 md:min-h-[700px] md:px-14">
            <div className="max-w-md space-y-8 text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-[#4d131a]/80">Clavis curated</p>
              <h2 className="text-5xl leading-[1] md:text-7xl">
                <span className="block text-xs uppercase tracking-[0.24em] text-[#4d131a]/80 md:text-sm">
                  the collection
                </span>
                <br />
                &quot;Rib&apos;s 48&quot;
              </h2>
              <Link
                href="/portfolio"
                className="inline-block border-b border-[#4d131a] pb-1 text-sm text-[#4d131a]/90 hover:text-[#751f26]"
              >
                Посмотреть коллекцию
              </Link>
            </div>
          </div>
          <div className="group relative min-h-[460px] overflow-hidden md:min-h-[700px]">
            <div
              className="premium-photo absolute inset-0 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-0"
              style={{ backgroundImage: `url(${mirrorShowcaseImage})` }}
            />
            <div
              className="premium-photo absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ backgroundImage: `url(${mirrorShowcaseHoverImage})` }}
            />
          </div>
        </section>

        <section className="grid border-b border-[#a38d83] md:grid-cols-2">
          <div className="relative min-h-[460px] overflow-hidden md:min-h-[700px]">
            <div
              className="premium-photo absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/logos/Next-Project.png')" }}
            />
          </div>
          <RevealOnScroll
            className="flex min-h-[460px] items-center justify-center bg-[#f4f1ed] px-8 py-14 md:min-h-[700px] md:px-14"
            delayMs={40}
            once={false}
          >
            <div className="max-w-xl space-y-8">
              <h2 className="text-4xl leading-[1.03] md:text-6xl">
                Пространство, которое ощущается как личная редакционная история.
              </h2>
              <p className="text-lg leading-relaxed text-[#4d131a]/85">
                Я проектирую интерьеры с балансом выразительности и тишины. Каждый проект строится
                вокруг вашего ритма жизни, света и материалов, которые стареют красиво.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/portfolio"
                  className="border border-[#a38d83] bg-transparent px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#4d131a] transition-colors duration-300 hover:border-[#4d131a]"
                >
                  Смотреть портфолио
                </Link>
                <Link
                  href="/about"
                  className="border border-[#a38d83] bg-transparent px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#4d131a] transition-colors duration-300 hover:border-[#4d131a]"
                >
                  Читать обо мне
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        <section className="relative overflow-hidden border-b border-[#a38d83] bg-[#e7d8d1] px-6 py-16 md:px-10 md:py-24">
          <div
            className="pointer-events-none absolute right-[180px] top-1/2 hidden h-[300px] w-[300px] -translate-y-1/2 bg-contain bg-center bg-no-repeat md:block md:h-[460px] md:w-[460px]"
            style={{ backgroundImage: "url('/logos/Clavis-circle.png')" }}
          />
          <div className="relative mb-10">
            <p className="text-xs uppercase tracking-[0.26em] text-[#4d131a]/80">Manifesto</p>
          </div>
          <div className="relative mx-auto max-w-6xl">
            <div className="relative grid gap-10 md:grid-cols-[1.15fr,0.85fr] md:items-start">
              <RevealOnScroll className="space-y-8 md:max-w-3xl" delayMs={40} once={false}>
                <h2 className="text-4xl leading-[1.03] md:text-6xl">
                  Пространство, которое ощущается как личная редакционная история.
                </h2>
                <div className="space-y-8 max-w-xl">
                  <p className="text-lg leading-relaxed text-[#4d131a]/85">
                    Я проектирую интерьеры с балансом выразительности и тишины. Каждый проект
                    строится вокруг вашего ритма жизни, света и материалов, которые стареют красиво.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/portfolio"
                      className="border border-[#a38d83] bg-transparent px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#4d131a] transition-colors duration-300 hover:border-[#4d131a]"
                    >
                      Смотреть портфолио
                    </Link>
                    <Link
                      href="/about"
                      className="border border-[#a38d83] bg-transparent px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#4d131a] transition-colors duration-300 hover:border-[#4d131a]"
                    >
                      Читать обо мне
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
              <div />
            </div>
          </div>
        </section>

        <RevealOnScroll once={false}>
          <section className="border-b border-[#a38d83] px-6 py-16 md:px-10 md:py-20">
            <div className="grid gap-10 md:grid-cols-[1.2fr,0.8fr] md:items-end">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.26em] text-[#4d131a]/80">Archive</p>
                <h2 className="max-w-4xl text-5xl leading-[1.02] md:text-6xl">Портфолио</h2>
                <p className="max-w-2xl text-lg leading-relaxed text-[#4d131a]/85">
                  Подборка реализованных интерьеров: жилые пространства, частные резиденции и
                  проекты, в которых важны тишина, фактура и характер.
                </p>
              </div>
              <div className="space-y-4 md:justify-self-end md:text-right">
                <Link
                  href="/portfolio"
                  className="inline-block text-xs uppercase tracking-[0.24em] text-[#4d131a]/85 transition-colors duration-300 hover:text-[#751f26]"
                >
                  Посмотреть все
                </Link>
              </div>
            </div>
            <div className="mt-12">
              <ArchiveSwiper projects={archiveProjects} />
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll once={false}>
          <section className="border-b border-[#a38d83] px-6 py-16 md:px-10 md:py-20">
            <div className="grid gap-10 md:grid-cols-[1.2fr,0.8fr] md:items-end">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.26em] text-[#4d131a]/80">Archive2</p>
                <h2 className="max-w-4xl text-5xl leading-[1.02] md:text-6xl">Портфолио</h2>
                <p className="max-w-2xl text-lg leading-relaxed text-[#4d131a]/85">
                  Подборка реализованных интерьеров: жилые пространства, частные резиденции и
                  проекты, в которых важны тишина, фактура и характер.
                </p>
              </div>
              <div className="space-y-4 md:justify-self-end md:text-right">
                <Link
                  href="/portfolio"
                  className="inline-block text-xs uppercase tracking-[0.24em] text-[#4d131a]/85 transition-colors duration-300 hover:text-[#751f26]"
                >
                  Посмотреть все
                </Link>
              </div>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
              {archiveProjects.map((project, index) => (
                <Link
                  key={`archive2-${project.id}`}
                  href={`/portfolio/${project.slug}`}
                  className="group block transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <ArchiveHoverImage
                        className="relative h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
                        images={[
                          project.coverImage,
                          archiveProjects[(index + 1) % archiveProjects.length]?.coverImage ??
                            project.coverImage,
                          archiveProjects[(index + 2) % archiveProjects.length]?.coverImage ??
                            project.coverImage,
                          archiveProjects[(index + 3) % archiveProjects.length]?.coverImage ??
                            project.coverImage,
                        ]}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-3xl leading-none">{project.title}</h3>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#4d131a]/75">
                        {project.category} / {project.location} / {project.year}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <section className="border-t border-[#a38d83]">
          <div className="relative min-h-[58vh] overflow-hidden md:min-h-[72vh]">
            <div
              className="premium-photo absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${nextProjectImage})` }}
            />
            <div className="hero-text-overlay absolute inset-0" />
            <div className="absolute top-0 left-0 right-0 px-6 pt-8 md:px-10 md:pt-10">
              <div className="max-w-3xl space-y-4 text-[#f1ece7]">
                <p className="text-xs uppercase tracking-[0.26em] text-[#f1ece7]/80">Next Project</p>
                <h2 className="text-3xl leading-[1.05] md:text-5xl">
                  Готовы обсудить ваш интерьер как личную историю?
                </h2>
                <Link
                  href="/contacts"
                  className="inline-block border border-[#f1ece7] bg-transparent px-6 py-3 text-sm uppercase tracking-[0.22em] text-[#f1ece7] transition-colors duration-300 hover:bg-[#f1ece7]/15 hover:text-[#f1ece7]"
                >
                  Связаться
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
