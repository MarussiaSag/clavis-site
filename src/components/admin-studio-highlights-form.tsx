"use client";

import { useActionState, useState } from "react";
import {
  saveStudioHighlightsAction,
  type SaveStudioHighlightsState,
} from "@/app/actions";
import { MAX_STUDIO_HIGHLIGHTS } from "@/lib/home-studio-highlights";

type HighlightDraft = {
  key: string;
  id?: number;
  title: string;
  description: string;
};

type AdminStudioHighlightsFormProps = {
  initial: { id: number; title: string; description: string }[];
};

const initialState: SaveStudioHighlightsState = null;

export function AdminStudioHighlightsForm({ initial }: AdminStudioHighlightsFormProps) {
  const [items, setItems] = useState<HighlightDraft[]>(() =>
    initial.map((item) => ({
      key: `db-${item.id}`,
      id: item.id,
      title: item.title,
      description: item.description,
    })),
  );
  const [state, formAction, isPending] = useActionState(saveStudioHighlightsAction, initialState);

  const canAdd = items.length < MAX_STUDIO_HIGHLIGHTS;

  return (
    <form action={formAction} className="space-y-4 border border-[#a38d83] bg-white/40 p-6">
      <input type="hidden" name="count" value={items.length} />

      {items.length === 0 ? (
        <p className="text-sm text-[#6a6a6a]">Пока нет фактов. Добавьте до {MAX_STUDIO_HIGHLIGHTS}.</p>
      ) : null}

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.key} className="grid gap-3 border border-[#d4cdc4] bg-[#f4f1ed]/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6a6a6a]">
                Факт {index + 1}
              </p>
              <button
                type="button"
                onClick={() => setItems((prev) => prev.filter((row) => row.key !== item.key))}
                className="text-[11px] uppercase tracking-[0.16em] text-[#751f26] transition-colors hover:text-[#3d0d0a]"
              >
                Удалить
              </button>
            </div>
            {item.id != null ? <input type="hidden" name={`id_${index}`} value={item.id} /> : null}
            <label className="grid gap-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Заголовок</span>
              <input
                name={`title_${index}`}
                value={item.title}
                onChange={(e) => {
                  const value = e.target.value;
                  setItems((prev) =>
                    prev.map((row) => (row.key === item.key ? { ...row, title: value } : row)),
                  );
                }}
                required
                className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Описание</span>
              <textarea
                name={`description_${index}`}
                value={item.description}
                onChange={(e) => {
                  const value = e.target.value;
                  setItems((prev) =>
                    prev.map((row) =>
                      row.key === item.key ? { ...row, description: value } : row,
                    ),
                  );
                }}
                required
                rows={2}
                className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
              />
            </label>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!canAdd}
          onClick={() =>
            setItems((prev) => [
              ...prev,
              {
                key: `new-${Date.now()}`,
                title: "",
                description: "",
              },
            ])
          }
          className="border border-[#a38d83] px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-[#4d131a] transition-colors hover:border-[#4d131a] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Добавить факт
        </button>
        <p className="text-sm text-[#6a6a6a]">
          {items.length} / {MAX_STUDIO_HIGHLIGHTS}
        </p>
      </div>

      {state?.error ? <p className="text-sm text-[#751f26]">{state.error}</p> : null}
      {state?.ok ? <p className="text-sm text-[#3d0d0a]/80">Сохранено.</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-fit bg-[#751f26] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#e7d8d1] hover:bg-[#4d131a] disabled:opacity-50"
      >
        {isPending ? "Сохранение…" : "Сохранить факты"}
      </button>
    </form>
  );
}
