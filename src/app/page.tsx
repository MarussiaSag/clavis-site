import { existsSync } from "node:fs";
import { join } from "node:path";
import { HomePageSections } from "@/components/home-page-sections";
import { HomeHeroSlider } from "@/components/home-hero-slider";
import { heroSlidesFromProjects } from "@/lib/hero-slides";
import { buildHeroSlidesFromObjectFolders } from "@/lib/object-photos";
import { getHomeFeaturedProject } from "@/lib/home-featured-project";
import { getSiteData } from "@/lib/site-data";
import { getSiteImage } from "@/lib/site-images";

const FALLBACK_IMG = "/media/fallback-a.jpg";
const SHOWCASE_HERO = "/media/showcase-hero.jpg";
const SHOWCASE_HOVER = "/media/showcase-hover.jpg";

export default async function Home() {
  const { projects } = await getSiteData();
  const founderImage = await getSiteImage("home.founder");
  const credoImage = await getSiteImage("home.credo");
  const ctaImage = await getSiteImage("home.cta");
  const [leadProject, secondProject, thirdProject] = projects;

  const showcaseImage = existsSync(join(process.cwd(), "public", "media", "showcase-hero.jpg"))
    ? SHOWCASE_HERO
    : leadProject?.coverImage ?? FALLBACK_IMG;
  const showcaseHoverImage = existsSync(join(process.cwd(), "public", "media", "showcase-hover.jpg"))
    ? SHOWCASE_HOVER
    : secondProject?.coverImage ?? showcaseImage;
  const mirrorShowcaseImage = thirdProject?.coverImage ?? showcaseHoverImage;

  const heroFromDb = heroSlidesFromProjects(projects);
  const fromFolders = buildHeroSlidesFromObjectFolders(12);

  let heroSlides = heroFromDb;

  if (heroSlides.length === 0) {
    if (fromFolders.length >= 2) {
      heroSlides = fromFolders.map((src) => ({ src }));
    } else if (fromFolders.length === 1) {
      heroSlides = [{ src: fromFolders[0] }];
    } else {
      heroSlides = [
        { src: "/media/fallback-b.jpg" },
        { src: showcaseImage },
        { src: showcaseHoverImage },
        { src: mirrorShowcaseImage },
      ];
    }
  }

  const quoteProjectImage = credoImage.trim() || FALLBACK_IMG;
  const archiveProjects = projects;
  const featuredProject = getHomeFeaturedProject(projects);

  return (
    <div className="min-h-screen">
      <main className="w-full">
        <HomeHeroSlider slides={heroSlides} />
        <HomePageSections
          quoteProjectImage={quoteProjectImage}
          archiveProjects={archiveProjects}
          featuredProject={featuredProject}
          founderImage={founderImage}
          ctaImage={ctaImage}
        />
      </main>
    </div>
  );
}
