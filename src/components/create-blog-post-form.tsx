"use client";

import { useActionState } from "react";
import { createBlogPostAction, type CreateBlogPostState } from "@/app/actions";

const initial: CreateBlogPostState = null;

export function CreateBlogPostForm() {
  const [state, formAction, isPending] = useActionState(createBlogPostAction, initial);

  return (
    <form action={formAction} className="grid gap-4 border border-[#a38d83] p-6 md:grid-cols-2">
      {state?.error ? (
        <p className="rounded border border-[#751f26] bg-[#f4f1ed] px-4 py-3 text-sm text-[#4d131a] md:col-span-2">
          {state.error}
        </p>
      ) : null}

      <input
        name="title"
        placeholder="Заголовок"
        required
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3 md:col-span-2"
      />
      <input
        name="slug"
        placeholder="slug (латиница, например svet-v-interere)"
        required
        pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
        title="Только латиница, цифры и дефисы"
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />
      <input
        name="publishedAt"
        type="date"
        required
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />
      <input
        name="readingMinutes"
        type="number"
        min={1}
        defaultValue={5}
        placeholder="Минут чтения"
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />

      <textarea
        name="excerpt"
        placeholder="Краткое описание для карточки"
        required
        rows={3}
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3 md:col-span-2"
      />

      <textarea
        name="content"
        placeholder="Текст статьи — абзацы через пустую строку"
        required
        rows={8}
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3 md:col-span-2"
      />

      <div className="space-y-2 md:col-span-2">
        <p className="text-sm text-[#4d131a]/85">
          Обложка (разворот 01) сохраняется в{" "}
          <code className="rounded bg-[#e7d8d1] px-1">public/blog/ваш-slug/</code>
        </p>
        <input
          name="coverFile"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="w-full max-w-md text-sm file:mr-3 file:border file:border-[#a38d83] file:bg-[#f4f1ed] file:px-3 file:py-2"
        />
      </div>

      <input
        name="coverImage"
        placeholder="URL обложки (если не загружаете файл)"
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3 md:col-span-2"
      />

      <div className="space-y-2 border border-[#d4cdc4] bg-[#f4f1ed]/50 p-4 md:col-span-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6a6a6a]">
          Мини-галерея
        </p>
        <p className="text-sm text-[#6a6a6a]">
          Необязательно. Фото появятся под разворотом статьи.
        </p>
        <input
          name="galleryFiles"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          className="w-full text-sm file:mr-3 file:border file:border-[#a38d83] file:bg-[#f4f1ed] file:px-3 file:py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-fit bg-[#751f26] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#e7d8d1] hover:bg-[#4d131a] disabled:opacity-50"
      >
        {isPending ? "Сохранение…" : "Добавить статью"}
      </button>
    </form>
  );
}
