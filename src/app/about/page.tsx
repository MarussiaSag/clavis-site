import { SiteHeader } from "@/components/site-header";
import { AboutCtaSection } from "@/components/about-cta-section";
import { AboutLeadershipSection } from "@/components/about-leadership-section";
import { AboutInteriorRibbon } from "@/components/about-interior-ribbon";
import { AboutPhilosophySection } from "@/components/about-philosophy-section";
import { AboutProcessSection } from "@/components/about-process-section";
import { AboutWorkflowSection } from "@/components/about-workflow-section";
import { AboutParallaxHero } from "@/components/about-parallax-hero";
import { getSiteData } from "@/lib/site-data";
import { getSiteImages } from "@/lib/site-images";

export default async function AboutPage() {
  await getSiteData();
  const images = await getSiteImages();

  return (
    <div className="min-h-screen">
      <SiteHeader variant="about" />
      <main className="space-y-0">
        <AboutParallaxHero imageSrc={images["about.hero"]} />
        <AboutPhilosophySection />
        <AboutInteriorRibbon
          photos={[
            { src: images["about.ribbon.1"], alt: "Интерьер студии CLAVIS" },
            { src: images["about.ribbon.2"], alt: "Гостиная в проекте CLAVIS" },
            { src: images["about.ribbon.3"], alt: "Столовая и детали отделки" },
          ]}
        />
        <AboutProcessSection />
        <AboutWorkflowSection />
        <AboutLeadershipSection />
        <AboutCtaSection />
      </main>
    </div>
  );
}
