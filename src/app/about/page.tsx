import { SiteHeader } from "@/components/site-header";
import { getSiteData } from "@/lib/site-data";

export default async function AboutPage() {
  const { content } = await getSiteData();
  const ringText = "СТУДИЯ ДИЗАЙНА ИНТЕРЬЕРА";

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="grid w-full gap-10 px-6 py-14 md:grid-cols-[1.1fr,1fr] md:px-10 md:items-start">
        <div className="mx-auto w-full max-w-[420px]">
          <svg viewBox="0 0 500 500" className="h-auto w-full">
            <defs>
              <path
                id="about-circle-path"
                d="M 250, 250 m -190, 0 a 190,190 0 1,1 380,0 a 190,190 0 1,1 -380,0"
              />
            </defs>
            <circle cx="250" cy="250" r="190" fill="none" stroke="#a38d83" strokeWidth="52" />
            <text
              fill="#e7d8d1"
              fontSize="34"
              fontWeight="600"
              letterSpacing="8"
              textAnchor="middle"
            >
              <textPath href="#about-circle-path" startOffset="50%">
                {ringText}
              </textPath>
            </text>
          </svg>
        </div>
        <section className="space-y-8">
        <p className="text-sm uppercase tracking-[0.2em] text-[#4d131a]/80">О дизайнере</p>
        <h1 className="text-5xl">{content.aboutTitle}</h1>
        <p className="text-lg leading-relaxed text-[#4d131a]/85">{content.aboutText}</p>
        </section>
      </main>
    </div>
  );
}
