import { existsSync } from "node:fs";
import { join } from "node:path";
import { HomePageSections } from "@/components/home-page-sections";
import { HomeHeroSlider } from "@/components/home-hero-slider";
import { heroSlidesFromProjects } from "@/lib/hero-slides";
import { buildHeroSlidesFromObjectFolders, listPublicFolderImages } from "@/lib/object-photos";
import { getSiteData } from "@/lib/site-data";

const FALLBACK_IMG = "/productImg/istockphoto-1334118685-2048x2048.jpg";

export default async function Home() {
  const { projects } = await getSiteData();
  const [leadProject, secondProject, thirdProject] = projects;

  const showcaseImagePath = "/productImg/hero.jpg";
  const showcaseHoverImagePath = "/productImg/hero-hover.jpg";
  const mirrorShowcaseImagePath = "/productImg/hero-2.jpg";

  const showcaseImage = existsSync(join(process.cwd(), "public", "productImg", "hero.jpg"))
    ? showcaseImagePath
    : leadProject?.coverImage ?? "/vercel.svg";
  const showcaseHoverImage = existsSync(join(process.cwd(), "public", "productImg", "hero-hover.jpg"))
    ? showcaseHoverImagePath
    : secondProject?.coverImage ?? showcaseImage;
  const mirrorShowcaseImage = existsSync(join(process.cwd(), "public", "productImg", "hero-2.jpg"))
    ? mirrorShowcaseImagePath
    : thirdProject?.coverImage ?? showcaseHoverImage;

  const objectGallery = [...listPublicFolderImages("chaveta"), ...listPublicFolderImages("zil")];

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
        { src: "/productImg/istockphoto-1372682637-2048x2048.jpg" },
        { src: showcaseImage },
        { src: showcaseHoverImage },
        { src: mirrorShowcaseImage },
      ];
    }
  }

  const nextProjectImage = existsSync(join(process.cwd(), "public", "Next-Project.png"))
    ? "/Next-Project.png"
    : objectGallery[Math.min(3, objectGallery.length > 0 ? objectGallery.length - 1 : 0)] ??
      FALLBACK_IMG;
  const servicesImages: [string, string, string, string] = [
    objectGallery[0] ?? showcaseImage,
    objectGallery[1] ?? showcaseHoverImage,
    objectGallery[2] ?? mirrorShowcaseImage,
    objectGallery[3] ?? nextProjectImage,
  ];
  const archiveProjects = projects.slice(0, 4);

  return (
    <div className="min-h-screen">
      <main className="w-full">
        <HomeHeroSlider slides={heroSlides} />
        <HomePageSections
          nextProjectImage={nextProjectImage}
          servicesImages={servicesImages}
          archiveProjects={archiveProjects}
        />
      </main>
    </div>
  );
}
