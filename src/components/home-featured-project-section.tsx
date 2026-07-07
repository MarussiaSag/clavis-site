import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { sectionContainer, sectionContentGap } from "@/lib/home-layout";
import type { HomeFeaturedProject } from "@/lib/home-featured-project";

type HomeFeaturedProjectSectionProps = {
  project: HomeFeaturedProject;
};

export function HomeFeaturedProjectSection({ project }: HomeFeaturedProjectSectionProps) {
  const [heroImage, secondImage, thirdImage] = project.images;
  const secondaryImages = [secondImage, thirdImage].filter(
    (src): src is string => Boolean(src) && src !== heroImage,
  );
  const projectHref = `/portfolio/${project.slug}`;

  return (
    <section className="border-b border-[#a38d83] bg-[#f4f1ed]" aria-labelledby="home-featured-heading">
      <div className={sectionContainer}>
        <RevealOnScroll once>
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div className="ui-header">
              <p id="home-featured-heading" className="ui-eyebrow text-[#b07d55]">
                Проект месяца
              </p>
              <h2 className="ui-title text-[#151210]">{project.title}</h2>
            </div>
            <p className="ui-eyebrow text-[#4d131a]/75">
              {project.category} / {project.location} / {project.year}
            </p>
          </header>

          <div className={`${sectionContentGap} grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-start lg:gap-12`}>
            <div
              className={`grid gap-3 md:gap-4 ${
                secondaryImages.length > 0
                  ? "grid-cols-2 grid-rows-2 md:min-h-[440px] lg:min-h-[500px]"
                  : "grid-cols-1"
              }`}
            >
              <Link
                href={projectHref}
                className={`group relative overflow-hidden bg-[#e8e2dc] ${
                  secondaryImages.length > 0 ? "col-span-1 row-span-2 min-h-[280px]" : "min-h-[320px] md:min-h-[420px]"
                }`}
              >
                <Image
                  src={heroImage}
                  alt={`${project.title} — основной кадр`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="premium-photo object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </Link>
              {secondaryImages.map((src, index) => (
                <Link
                  key={`${src}-${index}`}
                  href={projectHref}
                  className="group relative min-h-[140px] overflow-hidden bg-[#e8e2dc] md:min-h-[0]"
                >
                  <Image
                    src={src}
                    alt={`${project.title} — кадр ${index + 2}`}
                    fill
                    sizes="(max-width: 1024px) 45vw, 28vw"
                    className="premium-photo object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </Link>
              ))}
            </div>

            <div className="flex flex-col justify-between gap-8 lg:pt-2">
              <dl className="grid grid-cols-2 gap-6 border-t border-[#a38d83]/55 pt-8">
                <div>
                  <dt className="ui-eyebrow text-[#4d131a]/65">Площадь</dt>
                  <dd className="mt-2 font-serif text-2xl tracking-tight text-[#151210] md:text-3xl">
                    {project.areaLabel}
                  </dd>
                </div>
                <div>
                  <dt className="ui-eyebrow text-[#4d131a]/65">Срок</dt>
                  <dd className="mt-2 font-serif text-2xl tracking-tight text-[#151210] md:text-3xl">
                    {project.durationLabel}
                  </dd>
                </div>
              </dl>

              <div className="ui-header">
                <p className="ui-body text-[#2a2420]/92">{project.taskBrief}</p>
                <Link href={projectHref} className="ui-btn w-fit text-[#4d131a] hover:border-[#4d131a]">
                  Смотреть кейс
                  <span aria-hidden className="ml-2">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
