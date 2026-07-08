import Link from "next/link";
import { PUBLIC_NAV_LINKS } from "@/lib/nav-links";
import { SITE_CONTACT } from "@/lib/site-contact";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2a2a2a] bg-[#141414] text-[#d9cec6]">
      <div className="mx-auto w-full max-w-[1180px] px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 lg:gap-20">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-semibold tracking-wide text-[#f1ece7]">
              Clavis
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[#c8bcb2]">{SITE_CONTACT.tagline}</p>
            <p className="text-xs uppercase tracking-[0.22em] text-[#a38d83]">
              {SITE_CONTACT.city} · {year}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:gap-10">
            <div className="space-y-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#a38d83]">
                Контакты
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={SITE_CONTACT.phoneHref}
                    className="text-[#e7d8d1] transition-colors hover:text-[#faf6f2]"
                  >
                    {SITE_CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONTACT.email}`}
                    className="text-[#e7d8d1] transition-colors hover:text-[#faf6f2]"
                  >
                    {SITE_CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#a38d83]">
                Навигация
              </p>
              <nav className="flex flex-col gap-2 text-sm uppercase tracking-[0.14em]">
                {PUBLIC_NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[#c8bcb2] transition-colors duration-300 hover:text-[#f8f5f1]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-wrap gap-4 pt-2 text-[11px] uppercase tracking-[0.2em]">
                <a
                  href={SITE_CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c8bcb2] transition-colors hover:text-[#f8f5f1]"
                >
                  Instagram
                </a>
                <a
                  href={SITE_CONTACT.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c8bcb2] transition-colors hover:text-[#f8f5f1]"
                >
                  Pinterest
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2a2a2a]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap gap-5 px-6 py-6 text-[12px] text-[#a38d83] md:gap-8 md:px-10 md:text-[13px]">
          <Link href="#" className="transition-colors duration-300 hover:text-[#f8f5f1]">
            Политика конфиденциальности
          </Link>
          <Link href="#" className="transition-colors duration-300 hover:text-[#f8f5f1]">
            Пользовательское соглашение
          </Link>
        </div>
      </div>
    </footer>
  );
}
