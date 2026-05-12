import Link from "next/link";

type ShowcaseProject = {
  id: number;
  slug: string;
  title: string;
  coverImage: string;
};

type PortfolioShowcaseStackProps = {
  projects: ShowcaseProject[];
};

export function PortfolioShowcaseStack({ projects }: PortfolioShowcaseStackProps) {
  const rows = projects.slice(0, 5);
  if (rows.length === 0) return null;

  const n = rows.length;

  return (
    <>
      {rows.map((project, index) => {
        const hoverImage = n > 1 ? rows[(index + 1) % n].coverImage : project.coverImage;
        const href = `/portfolio/${project.slug}`;
        const imageLeft = index % 2 === 0;
        const isCuratedRow = index % 2 === 1;

        const imageSide = (
          <Link
            href={href}
            className="group relative block min-h-[460px] overflow-hidden md:min-h-[700px]"
          >
            <div
              className="premium-photo absolute inset-0 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-0"
              style={{ backgroundImage: `url(${project.coverImage})` }}
            />
            <div
              className="premium-photo absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ backgroundImage: `url(${hoverImage})` }}
            />
          </Link>
        );

        const textSide = (
          <div className="flex min-h-[460px] items-center justify-center bg-[#f4f1ed] px-8 py-14 md:min-h-[700px] md:px-14">
            <div className="max-w-md space-y-8 text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-[#4d131a]/80">
                {isCuratedRow ? "Clavis curated" : "Clavis presents"}
              </p>
              <h2 className="text-5xl leading-[1] md:text-7xl">
                <span className="block text-xs uppercase tracking-[0.24em] text-[#4d131a]/80 md:text-sm">
                  {isCuratedRow ? "the collection" : "the project"}
                </span>
                <br />
                &ldquo;{project.title}&rdquo;
              </h2>
              <Link
                href={href}
                className="inline-block border-b border-[#4d131a] pb-1 text-sm text-[#4d131a]/90 hover:text-[#751f26]"
              >
                {isCuratedRow ? "Посмотреть коллекцию" : "Смотреть детали проекта"}
              </Link>
            </div>
          </div>
        );

        return (
          <section
            key={project.id}
            className="grid border-b border-[#a38d83] md:grid-cols-2"
          >
            {imageLeft ? (
              <>
                {imageSide}
                {textSide}
              </>
            ) : (
              <>
                {textSide}
                {imageSide}
              </>
            )}
          </section>
        );
      })}
    </>
  );
}
