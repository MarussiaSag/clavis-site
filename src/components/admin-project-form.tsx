"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import type { Project } from "@prisma/client";
import {
  createProjectAction,
  updateProjectAction,
  type CreateProjectState,
  type UpdateProjectState,
} from "@/app/actions";
import { compressFormDataImages } from "@/lib/compress-image-client";
import { PROJECT_CATEGORY_OPTIONS } from "@/lib/portfolio-filters";
import { parseParagraphs, parseMaterials, parseRooms, parseTeam } from "@/lib/project-content";

type RoomDraft = {
  key: string;
  label: string;
  description: string;
  mainImage: string;
  secondaryImage: string;
};

type MaterialDraft = {
  key: string;
  category: string;
  supplier: string;
  detail: string;
};

type TeamDraft = {
  key: string;
  role: string;
  name: string;
};

type AdminProjectFormProps =
  | { mode: "create"; galleryImages?: string[] }
  | { mode: "edit"; project: Project; galleryImages?: string[] };

const fieldClass = "border border-[#a38d83] bg-[#e7d8d1] px-4 py-3";
const labelClass = "text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]";
const sectionClass = "space-y-4 border border-[#a38d83] bg-white/40 p-6";

function newKey(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function RoomPhotoPicker({
  label,
  value,
  images,
  fileInputName,
  onSelect,
  onClear,
}: {
  label: string;
  value: string;
  images: string[];
  fileInputName: string;
  onSelect: (url: string) => void;
  onClear: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  function selectFromGallery(url: string) {
    if (fileRef.current) fileRef.current.value = "";
    onSelect(url);
  }

  function clearSelection() {
    if (fileRef.current) fileRef.current.value = "";
    onClear();
  }

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className={labelClass}>{label}</span>
        {value ? (
          <button
            type="button"
            onClick={clearSelection}
            className="text-[10px] uppercase tracking-[0.14em] text-[#751f26]"
          >
            Сбросить
          </button>
        ) : null}
      </div>

      {value ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#d4cdc4] bg-[#eae6e0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      ) : null}

      {images.length > 0 ? (
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
          {images.map((src) => {
            const selected = value === src;
            return (
              <button
                key={src}
                type="button"
                onClick={() => selectFromGallery(src)}
                title={src}
                className={`relative aspect-square overflow-hidden border bg-[#eae6e0] ${
                  selected ? "border-[#751f26] ring-2 ring-[#751f26]/35" : "border-[#d4cdc4]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-[#6a6a6a]">
          Нет загруженных фото — загрузите галерею выше или новый файл ниже.
        </p>
      )}

      <label className="grid gap-1">
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#6a6a6a]">
          Или загрузить новый файл
        </span>
        <input
          ref={fileRef}
          name={fileInputName}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="text-sm file:mr-3 file:border file:border-[#a38d83] file:bg-[#f4f1ed] file:px-3 file:py-2"
        />
      </label>
    </div>
  );
}

export function AdminProjectForm(props: AdminProjectFormProps) {
  const isEdit = props.mode === "edit";
  const project = isEdit ? props.project : null;
  const galleryImages = props.galleryImages ?? [];
  const coverImage = project?.coverImage ?? "";
  const removableGallery = galleryImages.filter((src) => {
    if (!src.startsWith("/projects/")) return false;
    if (coverImage && src === coverImage) return false;
    const name = src.split("/").pop() ?? "";
    return !/^cover/i.test(name);
  });

  const [rooms, setRooms] = useState<RoomDraft[]>(() => {
    const parsed = parseRooms(project?.roomsJson);
    if (parsed.length === 0) return [];
    return parsed.map((room) => ({
      key: newKey("room"),
      label: room.label,
      description: room.description,
      mainImage: room.mainImage,
      secondaryImage: room.secondaryImage,
    }));
  });

  const [materials, setMaterials] = useState<MaterialDraft[]>(() => {
    const parsed = parseMaterials(project?.materialsJson);
    return parsed.map((item) => ({
      key: newKey("mat"),
      category: item.category,
      supplier: item.supplier,
      detail: item.detail,
    }));
  });

  const [team, setTeam] = useState<TeamDraft[]>(() => {
    const parsed = parseTeam(project?.teamJson);
    return parsed.map((item) => ({
      key: newKey("team"),
      role: item.role,
      name: item.name,
    }));
  });

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateProjectAction : createProjectAction,
    null as CreateProjectState | UpdateProjectState,
  );
  const [isCompressing, startCompress] = useTransition();
  const [compressError, setCompressError] = useState<string | null>(null);
  const busy = isPending || isCompressing;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setCompressError(null);
    startCompress(async () => {
      try {
        const compressed = await compressFormDataImages(new FormData(form));
        // React state is the source of truth for gallery picks — ensure URLs reach the server.
        compressed.set("roomCount", String(rooms.length));
        rooms.forEach((room, index) => {
          compressed.set(`room_label_${index}`, room.label);
          compressed.set(`room_description_${index}`, room.description);
          compressed.set(`room_mainUrl_${index}`, room.mainImage);
          compressed.set(`room_secondaryUrl_${index}`, room.secondaryImage);
        });
        formAction(compressed);
      } catch {
        setCompressError("Не удалось подготовить изображения. Попробуйте ещё раз или уменьшите размер файлов.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {isEdit ? <input type="hidden" name="id" value={project!.id} /> : null}

      {state?.error || compressError ? (
        <p className="rounded border border-[#751f26] bg-[#f4f1ed] px-4 py-3 text-sm text-[#4d131a]">
          {state?.error ?? compressError}
        </p>
      ) : null}

      <section className={sectionClass}>
        <h3 className="font-serif text-xl text-[#151210]">Основная информация</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 md:col-span-2">
            <span className={labelClass}>Название</span>
            <input name="title" defaultValue={project?.title ?? ""} required className={fieldClass} />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Slug</span>
            <input
              name="slug"
              defaultValue={project?.slug ?? ""}
              required
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              title="Только латиница, цифры и дефисы"
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Тип</span>
            <select
              name="category"
              defaultValue={
                PROJECT_CATEGORY_OPTIONS.some((option) => option.value === project?.category)
                  ? project?.category
                  : ""
              }
              required
              className={fieldClass}
            >
              <option value="" disabled>
                Выберите тип
              </option>
              {PROJECT_CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Локация</span>
            <input name="location" defaultValue={project?.location ?? ""} required className={fieldClass} />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Год</span>
            <input
              name="year"
              type="number"
              defaultValue={project?.year ?? new Date().getFullYear()}
              required
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Площадь</span>
            <input
              name="areaLabel"
              defaultValue={project?.areaLabel ?? ""}
              placeholder="101,7 м²"
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Стиль</span>
            <input
              name="styleLabel"
              defaultValue={project?.styleLabel ?? ""}
              placeholder="Современный"
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Планировка</span>
            <input
              name="layoutLabel"
              defaultValue={project?.layoutLabel ?? ""}
              placeholder="3 комнаты"
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Срок реализации</span>
            <input
              name="durationLabel"
              defaultValue={project?.durationLabel ?? ""}
              placeholder="8 месяцев"
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2 md:col-span-2">
            <span className={labelClass}>Описание для портфолио / карточек</span>
            <textarea
              name="description"
              defaultValue={project?.description ?? ""}
              required
              rows={3}
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2 md:col-span-2">
            <span className={labelClass}>Краткий теглайн в hero (опционально)</span>
            <textarea
              name="taskBrief"
              defaultValue={project?.taskBrief ?? ""}
              rows={2}
              className={fieldClass}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-3 text-sm">
            <input
              name="showOnHero"
              type="checkbox"
              value="on"
              defaultChecked={project?.showOnHero ?? true}
              className="h-4 w-4"
            />
            В слайдере на главной
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input
              name="isFeaturedHome"
              type="checkbox"
              value="on"
              defaultChecked={project?.isFeaturedHome ?? false}
              className="h-4 w-4"
            />
            Проект месяца на главной
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Порядок в hero</span>
            <input
              name="heroOrder"
              type="number"
              defaultValue={project?.heroOrder ?? 0}
              className={`${fieldClass} w-28`}
            />
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <h3 className="font-serif text-xl text-[#151210]">Обложка и галерея</h3>
        {project?.coverImage ? (
          <p className="text-sm text-[#4d131a]/85">
            Текущая обложка: <code className="rounded bg-[#e7d8d1] px-1">{project.coverImage}</code>
          </p>
        ) : null}
        <label className="grid gap-2">
          <span className={labelClass}>Главное фото</span>
          <input
            name="mainImage"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="w-full max-w-md text-sm file:mr-3 file:border file:border-[#a38d83] file:bg-[#f4f1ed] file:px-3 file:py-2"
          />
        </label>

        {galleryImages.length > 0 ? (
          <div className="space-y-3">
            <div>
              <p className={labelClass}>Фотографии проекта</p>
              <p className="mt-1 text-sm text-[#6a6a6a]">
                Отметьте дубли или лишние кадры — они удалятся при сохранении. Обложку удалить нельзя.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((src) => {
                const canRemove = removableGallery.includes(src);
                const isCover = coverImage === src || /^cover/i.test(src.split("/").pop() ?? "");
                return (
                  <li key={src} className="space-y-2 border border-[#d4cdc4] bg-white/50 p-2">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#eae6e0]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <p className="truncate text-[10px] text-[#6a6a6a]" title={src}>
                      {src.split("/").pop()}
                      {isCover ? " · обложка" : ""}
                    </p>
                    {canRemove ? (
                      <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#751f26]">
                        <input
                          type="checkbox"
                          name="removeGallery"
                          value={src}
                          className="accent-[#751f26]"
                        />
                        Удалить
                      </label>
                    ) : (
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#6a6a6a]">
                        Не удаляется
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        <label className="grid gap-2">
          <span className={labelClass}>Дополнительные фото галереи</span>
          <input
            name="gallery"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            className="w-full max-w-md text-sm file:mr-3 file:border file:border-[#a38d83] file:bg-[#f4f1ed] file:px-3 file:py-2"
          />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>URL обложки (если без файла)</span>
          <input
            name="coverImage"
            defaultValue={project?.coverImage ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Ссылка на виртуальный тур</span>
          <input
            name="virtualTourUrl"
            defaultValue={project?.virtualTourUrl ?? ""}
            placeholder="https://kuula.co/..."
            className={fieldClass}
          />
        </label>
      </section>

      <section className={sectionClass}>
        <h3 className="font-serif text-xl text-[#151210]">О проекте и цитата</h3>
        <label className="grid gap-2">
          <span className={labelClass}>Текст «О проекте»</span>
          <textarea
            name="aboutSummary"
            defaultValue={project?.aboutSummary ?? ""}
            rows={4}
            className={fieldClass}
          />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Цитата Clavis</span>
          <textarea name="quote" defaultValue={project?.quote ?? ""} rows={3} className={fieldClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Подпись к цитате</span>
          <input
            name="quoteAttribution"
            defaultValue={project?.quoteAttribution ?? "Студия Clavis"}
            className={fieldClass}
          />
        </label>
      </section>

      <section className={sectionClass}>
        <h3 className="font-serif text-xl text-[#151210]">Основной текст 01 / 02</h3>
        <p className="text-sm text-[#6a6a6a]">Абзацы разделяйте пустой строкой.</p>
        <label className="grid gap-2">
          <span className={labelClass}>Текст колонки 01</span>
          <textarea
            name="aboutBody"
            defaultValue={parseParagraphs(project?.aboutBody).join("\n\n")}
            rows={8}
            className={fieldClass}
          />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Текст колонки 02 (под картинкой)</span>
          <textarea
            name="aboutSideBody"
            defaultValue={parseParagraphs(project?.aboutSideBody).join("\n\n")}
            rows={6}
            className={fieldClass}
          />
        </label>
        {project?.aboutImage ? (
          <p className="text-sm text-[#4d131a]/85">
            Текущая картинка: <code className="rounded bg-[#e7d8d1] px-1">{project.aboutImage}</code>
          </p>
        ) : null}
        <label className="grid gap-2">
          <span className={labelClass}>Картинка блока 01/02</span>
          <input
            name="aboutImageFile"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="w-full max-w-md text-sm file:mr-3 file:border file:border-[#a38d83] file:bg-[#f4f1ed] file:px-3 file:py-2"
          />
        </label>
        <input type="hidden" name="aboutImageUrl" value={project?.aboutImage ?? ""} />
      </section>

      <section className={sectionClass}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-xl text-[#151210]">По помещениям</h3>
          <button
            type="button"
            onClick={() =>
              setRooms((prev) => [
                ...prev,
                { key: newKey("room"), label: "", description: "", mainImage: "", secondaryImage: "" },
              ])
            }
            className="text-[11px] uppercase tracking-[0.16em] text-[#751f26] hover:text-[#3d0d0a]"
          >
            Добавить помещение
          </button>
        </div>
        <input type="hidden" name="roomCount" value={rooms.length} />
        {rooms.length === 0 ? (
          <p className="text-sm text-[#6a6a6a]">Пока нет помещений.</p>
        ) : (
          <div className="space-y-6">
            {rooms.map((room, index) => (
              <div key={room.key} className="grid gap-3 border border-[#d4cdc4] bg-[#f4f1ed]/60 p-4">
                <div className="flex items-center justify-between">
                  <p className={labelClass}>Помещение {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => setRooms((prev) => prev.filter((row) => row.key !== room.key))}
                    className="text-[11px] uppercase tracking-[0.16em] text-[#751f26]"
                  >
                    Удалить
                  </button>
                </div>
                <input type="hidden" name={`room_mainUrl_${index}`} value={room.mainImage} readOnly />
                <input
                  type="hidden"
                  name={`room_secondaryUrl_${index}`}
                  value={room.secondaryImage}
                  readOnly
                />
                <label className="grid gap-2">
                  <span className={labelClass}>Название</span>
                  <input
                    name={`room_label_${index}`}
                    value={room.label}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRooms((prev) =>
                        prev.map((row) => (row.key === room.key ? { ...row, label: value } : row)),
                      );
                    }}
                    className={fieldClass}
                  />
                </label>
                <label className="grid gap-2">
                  <span className={labelClass}>Текст</span>
                  <textarea
                    name={`room_description_${index}`}
                    value={room.description}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRooms((prev) =>
                        prev.map((row) =>
                          row.key === room.key ? { ...row, description: value } : row,
                        ),
                      );
                    }}
                    rows={3}
                    className={fieldClass}
                  />
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <RoomPhotoPicker
                    label="Фото 1"
                    value={room.mainImage}
                    images={galleryImages}
                    fileInputName={`room_main_${index}`}
                    onSelect={(url) =>
                      setRooms((prev) =>
                        prev.map((row) => (row.key === room.key ? { ...row, mainImage: url } : row)),
                      )
                    }
                    onClear={() =>
                      setRooms((prev) =>
                        prev.map((row) => (row.key === room.key ? { ...row, mainImage: "" } : row)),
                      )
                    }
                  />
                  <RoomPhotoPicker
                    label="Фото 2"
                    value={room.secondaryImage}
                    images={galleryImages}
                    fileInputName={`room_secondary_${index}`}
                    onSelect={(url) =>
                      setRooms((prev) =>
                        prev.map((row) =>
                          row.key === room.key ? { ...row, secondaryImage: url } : row,
                        ),
                      )
                    }
                    onClear={() =>
                      setRooms((prev) =>
                        prev.map((row) =>
                          row.key === room.key ? { ...row, secondaryImage: "" } : row,
                        ),
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={sectionClass}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-xl text-[#151210]">Материалы и поставщики</h3>
          <button
            type="button"
            onClick={() =>
              setMaterials((prev) => [
                ...prev,
                { key: newKey("mat"), category: "", supplier: "", detail: "" },
              ])
            }
            className="text-[11px] uppercase tracking-[0.16em] text-[#751f26] hover:text-[#3d0d0a]"
          >
            Добавить
          </button>
        </div>
        <input type="hidden" name="materialCount" value={materials.length} />
        {materials.length === 0 ? (
          <p className="text-sm text-[#6a6a6a]">Пока нет материалов.</p>
        ) : (
          <div className="space-y-4">
            {materials.map((item, index) => (
              <div key={item.key} className="grid gap-3 border border-[#d4cdc4] bg-[#f4f1ed]/60 p-4 md:grid-cols-3">
                <div className="flex items-center justify-between md:col-span-3">
                  <p className={labelClass}>Позиция {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => setMaterials((prev) => prev.filter((row) => row.key !== item.key))}
                    className="text-[11px] uppercase tracking-[0.16em] text-[#751f26]"
                  >
                    Удалить
                  </button>
                </div>
                <input
                  name={`material_category_${index}`}
                  value={item.category}
                  onChange={(e) => {
                    const value = e.target.value;
                    setMaterials((prev) =>
                      prev.map((row) => (row.key === item.key ? { ...row, category: value } : row)),
                    );
                  }}
                  placeholder="Категория"
                  className={fieldClass}
                />
                <input
                  name={`material_supplier_${index}`}
                  value={item.supplier}
                  onChange={(e) => {
                    const value = e.target.value;
                    setMaterials((prev) =>
                      prev.map((row) => (row.key === item.key ? { ...row, supplier: value } : row)),
                    );
                  }}
                  placeholder="Поставщик"
                  className={fieldClass}
                />
                <input
                  name={`material_detail_${index}`}
                  value={item.detail}
                  onChange={(e) => {
                    const value = e.target.value;
                    setMaterials((prev) =>
                      prev.map((row) => (row.key === item.key ? { ...row, detail: value } : row)),
                    );
                  }}
                  placeholder="Деталь"
                  className={fieldClass}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={sectionClass}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-xl text-[#151210]">Команда проекта</h3>
          <button
            type="button"
            onClick={() =>
              setTeam((prev) => [...prev, { key: newKey("team"), role: "", name: "" }])
            }
            className="text-[11px] uppercase tracking-[0.16em] text-[#751f26] hover:text-[#3d0d0a]"
          >
            Добавить
          </button>
        </div>
        <input type="hidden" name="teamCount" value={team.length} />
        {team.length === 0 ? (
          <p className="text-sm text-[#6a6a6a]">Пока нет участников.</p>
        ) : (
          <div className="space-y-4">
            {team.map((member, index) => (
              <div key={member.key} className="grid gap-3 border border-[#d4cdc4] bg-[#f4f1ed]/60 p-4 md:grid-cols-2">
                <div className="flex items-center justify-between md:col-span-2">
                  <p className={labelClass}>Участник {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => setTeam((prev) => prev.filter((row) => row.key !== member.key))}
                    className="text-[11px] uppercase tracking-[0.16em] text-[#751f26]"
                  >
                    Удалить
                  </button>
                </div>
                <input
                  name={`team_role_${index}`}
                  value={member.role}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTeam((prev) =>
                      prev.map((row) => (row.key === member.key ? { ...row, role: value } : row)),
                    );
                  }}
                  placeholder="Роль"
                  className={fieldClass}
                />
                <input
                  name={`team_name_${index}`}
                  value={member.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTeam((prev) =>
                      prev.map((row) => (row.key === member.key ? { ...row, name: value } : row)),
                    );
                  }}
                  placeholder="Имя"
                  className={fieldClass}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <button
        type="submit"
        disabled={busy}
        className="w-fit bg-[#751f26] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#e7d8d1] hover:bg-[#4d131a] disabled:opacity-50"
      >
        {isCompressing
          ? "Сжатие фото…"
          : isPending
            ? "Сохранение…"
            : isEdit
              ? "Сохранить проект"
              : "Добавить проект"}
      </button>
    </form>
  );
}
