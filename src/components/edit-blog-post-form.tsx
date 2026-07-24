"use client";

import Image from "next/image";
import { useActionState } from "react";
import type { BlogPost as BlogPostModel } from "@prisma/client";
import { updateBlogPostAction, type UpdateBlogPostState } from "@/app/actions";
import { parseBlogContent } from "@/lib/blog-posts";

type EditBlogPostFormProps = {
  post: BlogPostModel;
  galleryImages?: string[];
};

const initial: UpdateBlogPostState = null;

export function EditBlogPostForm({ post, galleryImages = [] }: EditBlogPostFormProps) {
  const [state, formAction, isPending] = useActionState(updateBlogPostAction, initial);
  const publishedAt = post.publishedAt.toISOString().slice(0, 10);
  const content = parseBlogContent(post.content).join("\n\n");

  return (
    <form action={formAction} className="grid gap-4 border border-[#a38d83] p-6 md:grid-cols-2">
      <input type="hidden" name="id" value={post.id} />

      {state?.error ? (
        <p className="rounded border border-[#751f26] bg-[#f4f1ed] px-4 py-3 text-sm text-[#4d131a] md:col-span-2">
          {state.error}
        </p>
      ) : null}

      <input
        name="title"
        defaultValue={post.title}
        placeholder="Заголовок"
        required
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3 md:col-span-2"
      />
      <input
        name="slug"
        defaultValue={post.slug}
        placeholder="slug"
        required
        pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
        title="Только латиница, цифры и дефисы"
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />
      <input
        name="publishedAt"
        type="date"
        defaultValue={publishedAt}
        required
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />
      <input
        name="readingMinutes"
        type="number"
        min={1}
        defaultValue={post.readingMinutes}
        placeholder="Минут чтения"
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
      />

      <textarea
        name="excerpt"
        defaultValue={post.excerpt}
        placeholder="Краткое описание для карточки"
        required
        rows={3}
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3 md:col-span-2"
      />

      <textarea
        name="content"
        defaultValue={content}
        placeholder="Текст статьи — абзацы через пустую строку"
        required
        rows={10}
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3 md:col-span-2"
      />

      <div className="space-y-2 md:col-span-2">
        <p className="text-sm text-[#4d131a]/85">
          Текущая обложка (разворот 01):{" "}
          <code className="rounded bg-[#e7d8d1] px-1">{post.coverImage}</code>
        </p>
        {post.coverImage ? (
          <div className="relative aspect-[5/4] w-full max-w-[220px] overflow-hidden border border-[#d4cdc4] bg-[#eae6e0]">
            <Image src={post.coverImage} alt="" fill className="object-cover" sizes="220px" />
          </div>
        ) : null}
        <input
          name="coverFile"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="w-full max-w-md text-sm file:mr-3 file:border file:border-[#a38d83] file:bg-[#f4f1ed] file:px-3 file:py-2"
        />
      </div>

      <input
        name="coverImage"
        defaultValue={post.coverImage}
        placeholder="URL обложки"
        className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3 md:col-span-2"
      />

      <div className="space-y-3 border border-[#d4cdc4] bg-[#f4f1ed]/50 p-4 md:col-span-2">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6a6a6a]">
            Мини-галерея
          </p>
          <p className="text-sm text-[#6a6a6a]">
            Фото под разворотом 01/02. Сохраняются в{" "}
            <code className="rounded bg-[#e7d8d1] px-1">public/blog/{post.slug}/</code>
          </p>
        </div>

        {galleryImages.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((src) => (
              <li key={src} className="space-y-2 border border-[#d4cdc4] bg-white/50 p-2">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#eae6e0]">
                  <Image src={src} alt="" fill className="object-cover" sizes="180px" />
                </div>
                <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#751f26]">
                  <input type="checkbox" name="removeGallery" value={src} className="accent-[#751f26]" />
                  Удалить
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#6a6a6a]">Пока нет фото в галерее.</p>
        )}

        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">
            Добавить фото
          </span>
          <input
            name="galleryFiles"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            className="w-full text-sm file:mr-3 file:border file:border-[#a38d83] file:bg-[#f4f1ed] file:px-3 file:py-2"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-fit bg-[#751f26] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#e7d8d1] hover:bg-[#4d131a] disabled:opacity-50"
      >
        {isPending ? "Сохранение…" : "Сохранить изменения"}
      </button>
    </form>
  );
}
