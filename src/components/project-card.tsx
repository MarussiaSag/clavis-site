import Link from "next/link";

type ProjectCardProps = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  coverImage: string;
};

export function ProjectCard({
  slug,
  title,
  category,
  location,
  year,
  coverImage,
}: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${slug}`} className="group block space-y-3">
      <div className="relative h-72 w-full overflow-hidden">
        <div
          className="premium-photo h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
        <div className="premium-overlay absolute inset-0" />
      </div>
      <div>
        <h3 className="text-3xl">{title}</h3>
        <p className="text-sm uppercase tracking-[0.15em] text-[#4d131a]/80">
          {category} / {location} / {year}
        </p>
      </div>
    </Link>
  );
}
