"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogoutAction } from "@/app/actions/auth";
import { ADMIN_NAV_LINKS } from "@/lib/admin-nav";

type AdminPanelShellProps = {
  children: React.ReactNode;
};

function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Persistent admin chrome — keep in the panel layout so tab switches don't remount the nav. */
export function AdminPanelShell({ children }: AdminPanelShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f4f1ed]">
      <header className="border-b border-[#a38d83] bg-[#f4f1ed]">
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-10">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a8a8a]">
              Clavis · Админка
            </p>
          </div>
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="border border-[#a38d83] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#4d131a] transition-colors hover:border-[#4d131a]"
            >
              Выйти
            </button>
          </form>
        </div>

        <nav
          aria-label="Разделы админки"
          className="mx-auto flex w-full max-w-[1100px] gap-1 overflow-x-auto px-6 pb-4 md:px-10"
        >
          {ADMIN_NAV_LINKS.map((link) => {
            const isActive = isNavActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                className={`shrink-0 border px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors md:text-xs ${
                  isActive
                    ? "border-[#151210] bg-[#151210] text-[#f4f1ed]"
                    : "border-[#cfc7be] text-[#6a6a6a] hover:border-[#a38d83] hover:text-[#151210]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1100px] space-y-10 px-6 py-10 md:px-10 md:py-12">
        {children}
      </main>
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="space-y-2">
      <h1 className="font-serif text-2xl text-[#151210] md:text-3xl">{title}</h1>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-[#5c5c5c]">{description}</p>
      ) : null}
    </header>
  );
}
