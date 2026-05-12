import { SiteHeader } from "@/components/site-header";
import { AboutClientsSection } from "@/components/about-clients-section";
import { AboutLeadershipSection } from "@/components/about-leadership-section";
import { AboutInteriorRibbon } from "@/components/about-interior-ribbon";
import { AboutPhilosophySection } from "@/components/about-philosophy-section";
import { AboutProcessSection } from "@/components/about-process-section";
import { AboutParallaxHero } from "@/components/about-parallax-hero";
import { getSiteData } from "@/lib/site-data";

export default async function AboutPage() {
  await getSiteData();

  return (
    <div className="min-h-screen">
      <SiteHeader variant="hero" />
      <main className="space-y-0 pb-10 md:pb-14">
        <AboutParallaxHero />
        <AboutPhilosophySection />
        <AboutInteriorRibbon />
        <AboutProcessSection />
        <AboutLeadershipSection />
        <AboutClientsSection />
      </main>
    </div>
  );
}
