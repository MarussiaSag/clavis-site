import { PortfolioParallaxHero } from "@/components/portfolio-parallax-hero";
import { PortfolioShowcaseStack } from "@/components/portfolio-showcase-stack";
import { SiteHeader } from "@/components/site-header";
import { getSiteData } from "@/lib/site-data";

const PORTFOLIO_HERO_FALLBACK = "/productImg/istockphoto-1372682637-2048x2048.jpg";

export default async function PortfolioPage() {
  const { projects } = await getSiteData();
  const showcaseProjects = projects.slice(0, 5);

  const heroImageSrc = projects[0]?.coverImage ?? PORTFOLIO_HERO_FALLBACK;

  return (
    <div className="min-h-screen">
      <SiteHeader variant="hero" />
      <main className="w-full pb-12 md:pb-16">
        <PortfolioParallaxHero imageSrc={heroImageSrc} />
        <div id="portfolio-archive">
          <PortfolioShowcaseStack projects={showcaseProjects} />
        </div>
      </main>
    </div>
  );
}
