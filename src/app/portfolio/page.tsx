import Link from "next/link";
import { PortfolioParallaxHero } from "@/components/portfolio-parallax-hero";
import { PortfolioShowcaseStack } from "@/components/portfolio-showcase-stack";
import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { getSiteData } from "@/lib/site-data";

const PORTFOLIO_HERO_FALLBACK = "/productImg/istockphoto-1372682637-2048x2048.jpg";

function chunkPairs<T>(items: T[]): [T, T | undefined][] {
  const pairs: [T, T | undefined][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push([items[i], items[i + 1]]);
  }
  return pairs;
}

export default async function PortfolioPage() {
  const { projects } = await getSiteData();
  const showcaseProjects = projects.slice(0, 5);

  const heroImageSrc = projects[0]?.coverImage ?? PORTFOLIO_HERO_FALLBACK;
  const featuredProjects = projects.slice(0, 4);
  const rows = chunkPairs(projects.slice(4));

  return (
    <div className="min-h-screen">
      <SiteHeader variant="hero" />
      <main className="w-full pb-12 md:pb-16">
        <PortfolioParallaxHero imageSrc={heroImageSrc} />
        <PortfolioShowcaseStack projects={showcaseProjects} />
        <section id="portfolio-archive" className="border-b border-[#a38d83] px-6 py-10 md:px-10 md:py-12">
          <div className="mb-6 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#4d131a]/70 md:mb-8">
            <p>
              The Archive <span className="ml-2 opacity-70">{projects.length} Projects</span>
            </p>
          </div>
          <div className="space-y-0">
            <div className="grid grid-cols-2">
              {featuredProjects[0] ? (
                <Link
                  href={`/portfolio/${featuredProjects[0].slug}`}
                  className="group relative min-h-[300px] overflow-hidden md:min-h-[460px]"
                >
                  <div
                    className="premium-photo absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${featuredProjects[0].coverImage})` }}
                  />
                  <div className="premium-overlay absolute inset-0" />
                  <div className="absolute left-4 top-4 z-10 max-w-[72%] text-[#f1ece7] md:left-5 md:top-5">
                    <p className="text-[11px] leading-snug md:text-[13px]">
                      [{featuredProjects[0].title} - {featuredProjects[0].category}, {featuredProjects[0].year}]
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="min-h-[300px] bg-[#d9cbc2] md:min-h-[460px]" />
              )}
              {featuredProjects[1] ? (
                <Link
                  href={`/portfolio/${featuredProjects[1].slug}`}
                  className="group relative min-h-[300px] overflow-hidden md:min-h-[460px]"
                >
                  <div
                    className="premium-photo absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${featuredProjects[1].coverImage})` }}
                  />
                  <div className="premium-overlay absolute inset-0" />
                  <div className="absolute right-4 top-4 z-10 max-w-[80%] text-right text-[#f1ece7] md:right-5 md:top-5">
                    <p className="text-[11px] leading-snug md:text-[13px]">
                      [{featuredProjects[1].title} - {featuredProjects[1].category}, {featuredProjects[1].year}]
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="min-h-[300px] bg-[#d9cbc2] md:min-h-[460px]" />
              )}
            </div>

            <div className="grid grid-cols-3">
              {[featuredProjects[2], featuredProjects[3], featuredProjects[0]].map((project, idx) =>
                project ? (
                  <Link
                    key={`${project.id}-${idx}`}
                    href={`/portfolio/${project.slug}`}
                    className="group relative min-h-[130px] overflow-hidden md:min-h-[170px]"
                  >
                    <div
                      className="premium-photo absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ backgroundImage: `url(${project.coverImage})` }}
                    />
                    <div className="premium-overlay absolute inset-0" />
                  </Link>
                ) : (
                  <div key={`portfolio-fill-${idx}`} className="min-h-[130px] bg-[#d9cbc2] md:min-h-[170px]" />
                ),
              )}
            </div>
          </div>
        </section>
        <div className="space-y-14 px-6 pt-12 md:space-y-20 md:px-10 md:pt-14">
          {rows.map(([left, right]) =>
            right ? (
              <div
                key={`${left.id}-${right.id}`}
                className="grid gap-10 md:grid-cols-2 md:items-start md:gap-x-10 md:gap-y-0"
              >
                <ProjectCard {...left} layout="tall" />
                <ProjectCard {...right} layout="wide" />
              </div>
            ) : (
              <div key={left.id} className="md:grid md:grid-cols-2 md:items-start md:gap-x-10">
                <ProjectCard {...left} layout="tall" />
              </div>
            ),
          )}
        </div>
      </main>
    </div>
  );
}
