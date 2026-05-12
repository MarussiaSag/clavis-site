import Image from "next/image";

const clients = [
  { name: "Нордвуд", src: "/logos/clients/nordwood.svg" },
  { name: "Вольта", src: "/logos/clients/volta.svg" },
  { name: "Stone Lab", src: "/logos/clients/stone-lab.svg" },
  { name: "LINEA", src: "/logos/clients/linea.svg" },
  { name: "Форма студия", src: "/logos/clients/forma-studio.svg" },
  { name: "Люмен", src: "/logos/clients/lumen.svg" },
] as const;

export function AboutClientsSection() {
  return (
    <section className="border-t border-[#d4cdc4] bg-[#eae6df]">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-10 md:px-10 md:py-14 lg:py-18">
        <header className="mb-10 max-w-3xl space-y-3 md:mb-12 md:space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#b07d55] md:text-xs">
            Партнёры
          </p>
          <h2 className="font-serif text-[2rem] font-semibold tracking-[-0.03em] text-[#151210] md:text-5xl lg:text-[3rem]">
            Наши клиенты
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-[#2a2420]/85 md:text-base">
            С нами работают подрядчики, производители материалов и бренды снабжения —
            там, где важна дисциплина качества и сроков.
          </p>
        </header>

        <div className="border-t border-[#d4cdc4] pt-10 md:pt-12">
          <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {clients.map((client) => (
              <li key={client.name} className="flex justify-center">
                <figure className="group relative h-11 w-full max-w-[9.5rem] md:h-12">
                  <Image
                    src={client.src}
                    alt={`Логотип ${client.name}`}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 160px"
                    className="object-contain object-center opacity-[0.72] grayscale transition-[opacity,filter] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
