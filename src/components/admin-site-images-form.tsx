"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import {
  saveSiteImagesAction,
  type SaveSiteImagesState,
} from "@/app/actions";
import { SITE_IMAGE_SLOTS, type SiteImageMap } from "@/lib/site-images";

type AdminSiteImagesFormProps = {
  initial: SiteImageMap;
};

const initialState: SaveSiteImagesState = null;

const groups = [...new Set(SITE_IMAGE_SLOTS.map((item) => item.group))];

export function AdminSiteImagesForm({ initial }: AdminSiteImagesFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(saveSiteImagesAction, initialState);

  useEffect(() => {
    if (state?.ok) router.refresh();
  }, [state?.ok, router]);

  return (
    <form action={formAction} className="space-y-10">
      {groups.map((group) => (
        <section key={group} className="space-y-4 border border-[#a38d83] bg-white/40 p-6">
          <h2 className="font-serif text-2xl text-[#151210]">{group}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {SITE_IMAGE_SLOTS.filter((item) => item.group === group).map((item) => {
              const url = initial[item.slot];
              return (
                <div key={item.slot} className="space-y-3 border border-[#d4cdc4] bg-[#f4f1ed]/60 p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6a6a6a]">
                    {item.label}
                  </p>
                  <input type="hidden" name={`${item.slot}__url`} value={url} />
                  {url ? (
                    <div className="relative aspect-[4/5] w-full max-w-[200px] overflow-hidden border border-[#d4cdc4] bg-[#eae6e0]">
                      <Image
                        src={url}
                        alt={item.label}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  ) : null}
                  {url ? (
                    <p className="truncate text-xs text-[#6a6a6a]">
                      <code className="rounded bg-[#e7d8d1] px-1">{url}</code>
                    </p>
                  ) : null}
                  <label className="grid gap-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">
                      Загрузить новое
                    </span>
                    <input
                      name={`${item.slot}__file`}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      className="border border-[#a38d83] bg-[#e7d8d1] px-3 py-2 file:mr-3 file:border-0 file:bg-[#751f26] file:px-3 file:py-1.5 file:text-[10px] file:uppercase file:tracking-[0.14em] file:text-[#e7d8d1]"
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {state?.error ? <p className="text-sm text-[#751f26]">{state.error}</p> : null}
      {state?.ok ? <p className="text-sm text-[#3d0d0a]/80">Сохранено.</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-fit bg-[#751f26] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#e7d8d1] hover:bg-[#4d131a] disabled:opacity-50"
      >
        {isPending ? "Сохранение…" : "Сохранить изображения"}
      </button>
    </form>
  );
}
