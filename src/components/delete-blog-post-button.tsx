"use client";

import { deleteBlogPostAction } from "@/app/actions";

type DeleteBlogPostButtonProps = {
  id: number;
  title: string;
};

export function DeleteBlogPostButton({ id, title }: DeleteBlogPostButtonProps) {
  return (
    <form
      action={deleteBlogPostAction}
      onSubmit={(event) => {
        const confirmed = window.confirm(`Удалить статью «${title}»? Это действие нельзя отменить.`);
        if (!confirmed) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="border border-[#751f26] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#751f26] transition-colors hover:bg-[#751f26] hover:text-[#f4f1ed]"
      >
        Удалить
      </button>
    </form>
  );
}
