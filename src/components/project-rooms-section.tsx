import Image from "next/image";
import type { ProjectRoomContent } from "@/lib/project-content";

type Room = ProjectRoomContent;

type ProjectRoomsSectionProps = {
  rooms: Room[];
  gallery: string[];
  title: string;
};

const ROOMS_FALLBACK: Omit<Room, "mainImage" | "secondaryImage">[] = [
  {
    id: "kitchen-living",
    label: "Кухня — гостиная",
    description:
      "Единое открытое пространство объединяет зоны приготовления пищи, обеда и отдыха. Кухонный гарнитур от Lithium — матовые фасады в тёплом серо-бежевом. Диван и журнальный столик — акцентный зелёный.",
  },
  {
    id: "master-bedroom",
    label: "Хозяйская спальня",
    description:
      "Спокойная приватная зона с зонированием перегородкой: кровать отделена от системы хранения и небольшого уголка с письменным столом. Приглушённая природная палитра создаёт атмосферу отдыха.",
  },
  {
    id: "kids-room",
    label: "Детская комната",
    description:
      "Изолированная комната для дочери, обеспечивающая спокойствие и приватность. Мягкие тона, продуманное хранение и рабочее место — пространство растёт вместе с ребёнком.",
  },
];

function resolveRooms(rooms: Room[], gallery: string[]): Room[] {
  if (rooms.length > 0) {
    return rooms.map((room, index) => ({
      ...room,
      mainImage: room.mainImage || gallery[(index * 2) % Math.max(gallery.length, 1)] || gallery[0] || "",
      secondaryImage:
        room.secondaryImage ||
        gallery[(index * 2 + 1) % Math.max(gallery.length, 1)] ||
        gallery[0] ||
        "",
    }));
  }

  const pool = gallery.length > 0 ? gallery : [];
  return ROOMS_FALLBACK.map((room, index) => ({
    ...room,
    mainImage: pool[(index * 2) % pool.length] ?? pool[0] ?? "",
    secondaryImage: pool[(index * 2 + 1) % pool.length] ?? pool[0] ?? "",
  })).filter((room) => room.mainImage);
}

export function ProjectRoomsSection({ rooms: roomsProp, gallery, title }: ProjectRoomsSectionProps) {
  const rooms = resolveRooms(roomsProp, gallery);
  if (rooms.length === 0) return null;

  return (
    <section
      id="project-rooms"
      className="scroll-mt-14 bg-[#f5f2ea] pb-0 pt-6 md:scroll-mt-16 md:pt-8 lg:pt-10"
      aria-label="Описание"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          {rooms.map((room, index) => {
            const imageLeft = index % 2 === 0;

            return (
              <article key={room.id}>
                <div
                  className={
                    imageLeft
                      ? "grid gap-6 md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] md:items-center md:gap-8 lg:gap-10"
                      : "grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] md:items-center md:gap-8 lg:gap-10"
                  }
                >
                  <div
                    className={`relative w-full overflow-hidden bg-[#e8e2dc] ${
                      imageLeft ? "" : "md:order-2"
                    }`}
                  >
                    <Image
                      src={room.mainImage}
                      alt={`${title} — детальное описание, фото ${index * 2 + 1}`}
                      width={1600}
                      height={1200}
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="h-auto w-full"
                    />
                  </div>

                  <div
                    className={`flex flex-col gap-6 md:gap-8 ${imageLeft ? "" : "md:order-1"}`}
                  >
                    {room.description ? (
                      <p className="text-[15px] leading-[1.8] text-[#3a3530] md:text-[16px] md:leading-[1.85]">
                        {room.description}
                      </p>
                    ) : null}

                    {room.secondaryImage ? (
                      <div className="relative w-full overflow-hidden bg-[#e8e2dc]">
                        <Image
                          src={room.secondaryImage}
                          alt={`${title} — детальное описание, фото ${index * 2 + 2}`}
                          width={1200}
                          height={1500}
                          sizes="(max-width: 768px) 100vw, 38vw"
                          className="h-auto w-full"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
