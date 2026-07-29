"use client";

import Image from "next/image";
import { useState } from "react";
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
  const [activeId, setActiveId] = useState(rooms[0]?.id);
  const active = rooms.find((room) => room.id === activeId) ?? rooms[0];

  if (!active) return null;

  return (
    <section
      id="project-rooms"
      className="scroll-mt-14 bg-[#f5f2ea] pb-8 pt-6 md:scroll-mt-16 md:pb-10 md:pt-8"
      aria-label="По помещениям"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#a38d83] md:text-xs">
          По помещениям
        </p>

        <div
          role="tablist"
          aria-label="Помещения проекта"
          className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-[#d9d2c7] md:mt-10 md:gap-x-12"
        >
          {rooms.map((room) => {
            const isActive = room.id === active.id;
            return (
              <button
                key={room.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(room.id)}
                className={`relative -mb-px pb-4 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 md:text-xs ${
                  isActive ? "text-[#151210]" : "text-[#9a9086] hover:text-[#151210]"
                }`}
              >
                {room.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 bottom-0 h-px transition-colors duration-300 ${
                    isActive ? "bg-[#b07d55]" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] md:items-start md:gap-8 lg:gap-10">
          <div className="relative w-full overflow-hidden bg-[#e8e2dc]">
            <Image
              key={active.mainImage}
              src={active.mainImage}
              alt={`${title} — ${active.label}`}
              width={1600}
              height={1200}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="h-auto w-full"
            />
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            <p className="text-[15px] leading-[1.8] text-[#3a3530] md:text-[16px] md:leading-[1.85]">
              {active.description}
            </p>

            {active.secondaryImage ? (
              <div className="relative w-full overflow-hidden bg-[#e8e2dc]">
                <Image
                  key={active.secondaryImage}
                  src={active.secondaryImage}
                  alt={`${title} — ${active.label}, деталь`}
                  width={1200}
                  height={1500}
                  sizes="(max-width: 768px) 100vw, 38vw"
                  className="h-auto w-full"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
