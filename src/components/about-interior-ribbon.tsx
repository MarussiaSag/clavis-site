import Image from "next/image";

const photos = [
  { src: "/productImg/hero.jpg", alt: "Интерьер студии CLAVIS" },
  { src: "/productImg/istockphoto-1334118685-2048x2048.jpg", alt: "Гостиная в проекте CLAVIS" },
  { src: "/productImg/istockphoto-1372682637-2048x2048.jpg", alt: "Столовая и детали отделки" },
] as const;

export function AboutInteriorRibbon() {
  return (
    <section aria-label="Интерьеры студии CLAVIS" className="bg-[#f2efea]">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-10 md:px-10 md:py-14 lg:py-18">
        <ul className="grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3 sm:gap-4">
          {photos.map((p) => (
            <li key={p.src} className="relative aspect-[4/5] overflow-hidden bg-[#e8e2dc] sm:aspect-[3/5] md:aspect-[4/5]">
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
      </div>
    </section>
  );
}
