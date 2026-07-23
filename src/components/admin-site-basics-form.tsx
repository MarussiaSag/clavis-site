"use client";

import { useActionState, useState } from "react";
import {
  saveSiteBasicsAction,
  type SaveSiteBasicsState,
} from "@/app/actions";
import type { SocialLinkItem } from "@/lib/site-contact";

type BasicsFormProps = {
  initial: {
    city: string;
    address: string;
    mapUrl: string;
    phone: string;
    email: string;
    tagline: string;
    hoursWeekdays: string;
    hoursWeekend: string;
    instagramFootnote: string;
    socialLinks: SocialLinkItem[];
  };
};

type SocialDraft = {
  key: string;
  id?: number;
  label: string;
  href: string;
};

const initialState: SaveSiteBasicsState = null;

export function AdminSiteBasicsForm({ initial }: BasicsFormProps) {
  const [socialLinks, setSocialLinks] = useState<SocialDraft[]>(() =>
    initial.socialLinks.map((item) => ({
      key: item.id != null ? `db-${item.id}` : `new-${item.label}`,
      id: item.id,
      label: item.label,
      href: item.href,
    })),
  );
  const [state, formAction, isPending] = useActionState(saveSiteBasicsAction, initialState);

  return (
    <form action={formAction} className="grid gap-8">
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-[#151210]">Телефон и почта</h2>
        <div className="grid gap-4 border border-[#a38d83] bg-white/40 p-6 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Телефон</span>
            <input
              name="phone"
              defaultValue={initial.phone}
              required
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Email</span>
            <input
              name="email"
              type="email"
              defaultValue={initial.email}
              required
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-[#151210]">Адрес и часы</h2>
        <div className="grid gap-4 border border-[#a38d83] bg-white/40 p-6">
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Город</span>
            <input
              name="city"
              defaultValue={initial.city}
              required
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Адрес</span>
            <input
              name="address"
              defaultValue={initial.address}
              required
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Ссылка на карту</span>
            <input
              name="mapUrl"
              defaultValue={initial.mapUrl}
              required
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Слоган в футере</span>
            <input
              name="tagline"
              defaultValue={initial.tagline}
              required
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Будни</span>
            <input
              name="hoursWeekdays"
              defaultValue={initial.hoursWeekdays}
              required
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Выходные</span>
            <input
              name="hoursWeekend"
              defaultValue={initial.hoursWeekend}
              required
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Сноска к Instagram (*)</span>
            <input
              name="instagramFootnote"
              defaultValue={initial.instagramFootnote}
              required
              className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl text-[#151210]">Социальные сети</h2>
          <p className="text-sm text-[#6a6a6a]">Можно добавлять, редактировать и удалять ссылки.</p>
        </div>

        <input type="hidden" name="socialCount" value={socialLinks.length} />

        <div className="space-y-4">
          {socialLinks.length === 0 ? (
            <p className="border border-dashed border-[#cfc7be] px-4 py-6 text-sm text-[#6a6a6a]">
              Пока нет ссылок. Добавьте первую.
            </p>
          ) : null}

          {socialLinks.map((item, index) => (
            <div key={item.key} className="grid gap-3 border border-[#a38d83] bg-white/40 p-4 md:grid-cols-[1fr_2fr_auto]">
              {item.id != null ? <input type="hidden" name={`social_id_${index}`} value={item.id} /> : null}
              <label className="grid gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Название</span>
                <input
                  name={`social_label_${index}`}
                  value={item.label}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSocialLinks((prev) =>
                      prev.map((row) => (row.key === item.key ? { ...row, label: value } : row)),
                    );
                  }}
                  required
                  placeholder="Instagram"
                  className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">Ссылка</span>
                <input
                  name={`social_href_${index}`}
                  value={item.href}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSocialLinks((prev) =>
                      prev.map((row) => (row.key === item.key ? { ...row, href: value } : row)),
                    );
                  }}
                  required
                  placeholder="https://"
                  className="border border-[#a38d83] bg-[#e7d8d1] px-4 py-3"
                />
              </label>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => setSocialLinks((prev) => prev.filter((row) => row.key !== item.key))}
                  className="w-full border border-[#a38d83] px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-[#751f26] transition-colors hover:border-[#751f26] md:w-auto"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            setSocialLinks((prev) => [
              ...prev,
              { key: `new-${Date.now()}`, label: "", href: "" },
            ])
          }
          className="w-fit border border-[#a38d83] px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-[#4d131a] transition-colors hover:border-[#4d131a]"
        >
          Добавить сеть
        </button>
      </section>

      {state?.error ? <p className="text-sm text-[#751f26]">{state.error}</p> : null}
      {state?.ok ? <p className="text-sm text-[#3d0d0a]/80">Сохранено.</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-fit bg-[#751f26] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#e7d8d1] hover:bg-[#4d131a] disabled:opacity-50"
      >
        {isPending ? "Сохранение…" : "Сохранить данные"}
      </button>
    </form>
  );
}
