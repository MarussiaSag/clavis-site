"use client";

import Link from "next/link";
import { useRef } from "react";

type ArchiveProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  coverImage: string;
};

type ArchiveSwiperProps = {
  projects: ArchiveProject[];
};

export function ArchiveSwiper({ projects }: ArchiveSwiperProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCards = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const amount = Math.max(track.clientWidth * 0.75, 280);
    track.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Предыдущие проекты"
          onClick={() => scrollByCards("left")}
          className="inline-flex h-9 w-9 items-center justify-center border border-[#a38d83] text-lg leading-none text-[#4d131a] transition-colors hover:border-[#4d131a] hover:bg-[#f4f1ed]"
        >
          &#8592;
        </button>
        <button
          type="button"
          aria-label="Следующие проекты"
          onClick={() => scrollByCards("right")}
          className="inline-flex h-9 w-9 items-center justify-center border border-[#a38d83] text-lg leading-none text-[#4d131a] transition-colors hover:border-[#4d131a] hover:bg-[#f4f1ed]"
        >
          &#8594;
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex gap-8 overflow-x-auto pb-4 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.slug}`}
            className="group block min-w-[78vw] snap-start bg-[#f8f5f1] p-4 shadow-[0_14px_30px_rgba(61,13,10,0.08)] transition-transform duration-300 hover:-translate-y-1 md:min-w-[48vw] xl:min-w-[36vw]"
          >
            <div className="space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden bg-white p-3">
                <div
                  className="premium-photo h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${project.coverImage})` }}
                />
              </div>
              <div className="space-y-2 border-t border-[#d0b5a5] pt-3">
                <h3 className="text-3xl leading-none">{project.title}</h3>
                <p className="text-xs uppercase tracking-[0.18em] text-[#4d131a]/75">
                  {project.category} / {project.location} / {project.year}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
