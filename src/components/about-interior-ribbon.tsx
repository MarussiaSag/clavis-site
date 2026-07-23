import Image from "next/image";

type RibbonPhoto = {
  src: string;
  alt: string;
};

type AboutInteriorRibbonProps = {
  photos: RibbonPhoto[];
};

export function AboutInteriorRibbon({ photos }: AboutInteriorRibbonProps) {
  return (
    <section aria-label="Интерьеры студии CLAVIS" className="bg-[#f2efea]">
      <ul className="grid list-none grid-cols-1 gap-0 p-0 sm:grid-cols-3">
        {photos.map((p) => (
          <li
            key={p.src}
            className="relative aspect-[4/5] overflow-hidden bg-[#e8e2dc] sm:aspect-[3/4] md:aspect-[4/5]"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width:640px) 100vw, 33vw"
              className="premium-photo object-cover"
              quality={90}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
