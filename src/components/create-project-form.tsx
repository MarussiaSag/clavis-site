"use client";

import { useActionState } from "react";
import {
  createProjectAction,
  type CreateProjectState,
} from "@/app/actions";

const initial: CreateProjectState = null;

export function CreateProjectForm() {
  const [state, formAction, isPending] = useActionState(
    createProjectAction,
    initial,
  );

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="grid gap-4 border border-[#a38d83] p-6 md:grid-cols-2"
    >
      {state?.error ? (
        <p className="rounded border border-[#751f26] bg-[#f4f1ed] px-4 py-3 text-sm text-[#4d131a] md:col-span-2">
          {state.error}
        </p>
      ) : null}

      <input
        name="title"
        placeholder="Название"
        required
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />
      <input
        name="slug"
        placeholder="slug (папка на сервере: projects/slug)"
        required
        pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
        title="Только латиница, цифры и дефисы"
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />
      <input
        name="category"
        placeholder="Категория"
        required
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />
      <input
        name="location"
        placeholder="Локация"
        required
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />
      <input
        name="year"
        type="number"
        placeholder="Год"
        required
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />
      <input
        name="heroOrder"
        type="number"
        placeholder="Порядок в hero (меньше — раньше)"
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />

      <label className="flex items-center gap-3 text-sm md:col-span-2">
        <input name="showOnHero" type="checkbox" value="on" defaultChecked className="h-4 w-4" />
        Показывать в слайдере на главной
      </label>

      <div className="space-y-2 md:col-span-2">
        <p className="text-sm text-[#4d131a]/85">
          Главное фото — обложка и слайд hero. Остальные файлы попадут в галерею проекта (папка{" "}
          <code className="rounded bg-[#e7d8d1] px-1">public/projects/ваш-slug/</code>).
        </p>
        <input
          name="mainImage"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="w-full max-w-md text-sm file:mr-3 file:border file:border-[#a38d83] file:bg-[#f4f1ed] file:px-3 file:py-2"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <p className="text-sm text-[#4d131a]/80">Дополнительные фото проекта (несколько файлов)</p>
        <input
          name="gallery"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          className="w-full max-w-md text-sm file:mr-3 file:border file:border-[#a38d83] file:bg-[#f4f1ed] file:px-3 file:py-2"
        />
      </div>

      <input
        name="coverImage"
        placeholder="URL обложки (если не загружаете главный файл)"
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3 md:col-span-2"
      />

      <textarea
        name="description"
        placeholder="Описание проекта"
        required
        rows={4}
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3 md:col-span-2"
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-fit bg-[#751f26] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#e7d8d1] hover:bg-[#4d131a] disabled:opacity-50"
      >
        {isPending ? "Сохранение…" : "Добавить проект"}
      </button>
    </form>
  );
}
