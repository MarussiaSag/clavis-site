import { kuulaEmbedSrc } from "@/lib/kuula-embed";

type ProjectVirtualTourProps = {
  tourUrl: string;
  title: string;
  id?: string;
};

export function ProjectVirtualTour({ tourUrl, title, id }: ProjectVirtualTourProps) {
  const embedSrc = kuulaEmbedSrc(tourUrl);
  if (!embedSrc) return null;

  return (
    <section id={id} className="bg-[#332f2c] py-16 md:py-24" aria-labelledby="project-tour-heading">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <header className="mb-8 space-y-3 md:mb-10">
          <span className="block h-px w-8 bg-[#b07d55]" aria-hidden />
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/60 md:text-[11px]">
            Виртуальный тур
          </p>
          <h2
            id="project-tour-heading"
            className="font-serif text-3xl tracking-[-0.02em] text-white md:text-4xl"
          >
            {title}
          </h2>
        </header>

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1f1c1a] md:aspect-[16/9]">
          <iframe
            src={embedSrc}
            title={`Виртуальный тур — ${title}`}
            className="absolute inset-0 h-full w-full border-0"
            allow="xr-spatial-tracking; gyroscope; accelerometer"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
