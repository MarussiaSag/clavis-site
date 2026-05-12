import Link from "next/link";

export type ProjectCardLayout = "default" | "tall" | "wide";

type ProjectCardProps = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  coverImage: string;
  layout?: ProjectCardLayout;
};

const imageShellClass: Record<ProjectCardLayout, string> = {
  default: "relative h-72 w-full overflow-hidden md:h-[22rem]",
  tall: "relative h-[min(46vh,30rem)] w-full min-h-[19rem] overflow-hidden md:h-[min(50vh,32rem)] md:min-h-[22rem]",
  wide: "relative h-[min(30vh,19rem)] w-full min-h-[14rem] overflow-hidden md:h-[min(34vh,22rem)] md:min-h-[15.5rem]",
};

const captionAlignClass: Record<ProjectCardLayout, string> = {
  default: "text-left",
  tall: "text-left",
  wide: "text-right",
};

export function ProjectCard({
  slug,
  title,
  category,
  location,
  year,
  coverImage,
  layout = "default",
}: ProjectCardProps) {
  const shellClass = imageShellClass[layout];
  const captionAlign = captionAlignClass[layout];

  return (
    <Link href={`/portfolio/${slug}`} className="group flex flex-col gap-3 md:gap-4">
      <div className={`space-y-1 md:space-y-1.5 ${captionAlign}`}>
        <h3 className="text-[1.375rem] leading-tight text-[#3d0d0a] md:text-3xl">{title}</h3>
        <p className="text-[11px] uppercase leading-relaxed tracking-[0.14em] text-[#4d131a]/80 md:text-xs md:tracking-[0.15em]">
          {category} / {location} / {year}
        </p>
      </div>
      <div className={shellClass}>
        <div
          className="premium-photo h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
        <div className="premium-overlay absolute inset-0" />
      </div>
    </Link>
  );
}
