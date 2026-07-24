"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import {
  saveAboutStudioPeopleAction,
  type SaveAboutStudioPeopleState,
} from "@/app/actions";
import { MAX_ABOUT_STUDIO_PEOPLE } from "@/lib/about-studio-people";
import { compressFormDataImages } from "@/lib/compress-image-client";

type PersonDraft = {
  key: string;
  id?: number;
  name: string;
  role: string;
  competencies: string;
};

type AdminAboutStudioPeopleFormProps = {
  initial: {
    teamPhoto: string;
    people: { id: number; name: string; role: string; competencies: string }[];
  };
};

const initialState: SaveAboutStudioPeopleState = null;

export function AdminAboutStudioPeopleForm({ initial }: AdminAboutStudioPeopleFormProps) {
  const router = useRouter();
  const teamPhoto = initial.teamPhoto;
  const [items, setItems] = useState<PersonDraft[]>(() =>
    initial.people.map((item) => ({
      key: `db-${item.id}`,
      id: item.id,
      name: item.name,
      role: item.role,
      competencies: item.competencies,
    })),
  );
  const [state, formAction, isPending] = useActionState(
    saveAboutStudioPeopleAction,
    initialState,
  );
  const [isCompressing, startCompress] = useTransition();
  const [compressError, setCompressError] = useState<string | null>(null);
  const busy = isPending || isCompressing;

  useEffect(() => {
    if (state?.ok) router.refresh();
  }, [state?.ok, router]);

  const canAdd = items.length < MAX_ABOUT_STUDIO_PEOPLE;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setCompressError(null);
    startCompress(async () => {
      try {
        const compressed = await compressFormDataImages(new FormData(form));
        formAction(compressed);
      } catch {
        setCompressError(
          "Не удалось сжать фото. Попробуйте ещё раз или уменьшите размер файла.",
        );
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 border border-[#a38d83] bg-white/40 p-6">
      <input type="hidden" name="count" value={items.length} />
      <input type="hidden" name="teamPhotoUrl" value={teamPhoto} />

      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="font-serif text-xl text-[#151210]">Общее фото</h3>
          <p className="text-sm text-[#6a6a6a]">
            Одно фото слева в блоке «Люди студии» на странице «О нас».
          </p>
        </div>

        {teamPhoto ? (
          <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden border border-[#d4cdc4] bg-[#eae6e0]">
            <Image
              src={teamPhoto}
              alt="Текущее фото команды"
              fill
              className="object-cover"
              sizes="220px"
            />
          </div>
        ) : null}

        {teamPhoto ? (
          <p className="text-sm text-[#6a6a6a]">
            Текущее: <code className="rounded bg-[#e7d8d1] px-1">{teamPhoto}</code>
          </p>
        ) : null}

        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">
            Загрузить новое фото
          </span>
          <input
            name="teamPhotoFile"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3 file:mr-4 file:border-0 file:bg-[#751f26] file:px-3 file:py-1.5 file:text-[11px] file:uppercase file:tracking-[0.14em] file:text-[#e7d8d1]"
          />
        </label>
      </section>

      <section className="space-y-4 border-t border-[#d4cdc4] pt-8">
        <div className="space-y-1">
          <h3 className="font-serif text-xl text-[#151210]">Список людей</h3>
          <p className="text-sm text-[#6a6a6a]">
            Фамилия, должность и компетенции. Максимум {MAX_ABOUT_STUDIO_PEOPLE}.
          </p>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-[#6a6a6a]">Пока никого нет. Добавьте первого человека.</p>
        ) : null}

        <div className="space-y-6">
          {items.map((item, index) => (
            <div
              key={item.key}
              className="grid gap-3 border border-[#d4cdc4] bg-[#f4f1ed]/60 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6a6a6a]">
                  Человек {index + 1}
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
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">
                  Фамилия
                </span>
                <input
                  name={`name_${index}`}
                  value={item.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setItems((prev) =>
                      prev.map((row) => (row.key === item.key ? { ...row, name: value } : row)),
                    );
                  }}
                  required
                  className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">
                  Должность
                </span>
                <input
                  name={`role_${index}`}
                  value={item.role}
                  onChange={(e) => {
                    const value = e.target.value;
                    setItems((prev) =>
                      prev.map((row) => (row.key === item.key ? { ...row, role: value } : row)),
                    );
                  }}
                  required
                  className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">
                  Компетенции
                </span>
                <textarea
                  name={`competencies_${index}`}
                  value={item.competencies}
                  onChange={(e) => {
                    const value = e.target.value;
                    setItems((prev) =>
                      prev.map((row) =>
                        row.key === item.key ? { ...row, competencies: value } : row,
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
                  name: "",
                  role: "",
                  competencies: "",
                },
              ])
            }
            className="border border-[#a38d83] px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-[#4d131a] transition-colors hover:border-[#4d131a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Добавить человека
          </button>
          <p className="text-sm text-[#6a6a6a]">
            {items.length} / {MAX_ABOUT_STUDIO_PEOPLE}
          </p>
        </div>
      </section>

      {state?.error || compressError ? (
        <p className="text-sm text-[#751f26]">{state?.error ?? compressError}</p>
      ) : null}
      {state?.ok ? <p className="text-sm text-[#3d0d0a]/80">Сохранено.</p> : null}

      <button
        type="submit"
        disabled={busy}
        className="w-fit bg-[#751f26] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#e7d8d1] hover:bg-[#4d131a] disabled:opacity-50"
      >
        {isCompressing ? "Сжатие…" : isPending ? "Сохранение…" : "Сохранить"}
      </button>
    </form>
  );
}
