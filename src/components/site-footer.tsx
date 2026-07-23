import Link from "next/link";
import { PUBLIC_NAV_LINKS } from "@/lib/nav-links";
import { getSiteContact, socialLinksFromContact } from "@/lib/site-contact";

export async function SiteFooter() {
  const contact = await getSiteContact();
  const socialLinks = socialLinksFromContact(contact);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2a2a2a] bg-[#141414] text-[#d9cec6]">
      <div className="mx-auto w-full max-w-[1180px] px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 lg:gap-20">
          <div className="space-y-4">
            <Link
              href="/"
              aria-label="На главную"
              className="inline-flex items-center transition-opacity duration-300 hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/svg/header-logo.svg"
                alt="Clavis"
                className="h-7 w-auto md:h-8"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[#c8bcb2]">{contact.tagline}</p>
            <p className="text-xs uppercase tracking-[0.22em] text-[#a38d83]">
              {contact.city} · {year}
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
                    href={contact.phoneHref}
                    className="text-[#e7d8d1] transition-colors hover:text-[#faf6f2]"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[#e7d8d1] transition-colors hover:text-[#faf6f2]"
                  >
                    {contact.email}
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
              {socialLinks.length > 0 ? (
                <div className="flex flex-wrap gap-4 pt-2 text-[11px] uppercase tracking-[0.2em]">
                  {socialLinks.map((social) => (
                    <a
                      key={`${social.label}-${social.href}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c8bcb2] transition-colors hover:text-[#f8f5f1]"
                    >
                      {social.label}
                      {social.label.toLowerCase() === "instagram" ? "*" : null}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2a2a2a]">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-6 md:px-10">
          <p className="text-[11px] leading-relaxed text-[#8a7f76] md:text-[12px]">
            * — {contact.instagramFootnote}
          </p>
          <div className="mt-4 flex flex-wrap gap-5 text-[12px] text-[#a38d83] md:mt-5 md:gap-8 md:text-[13px]">
            <Link href="#" className="transition-colors duration-300 hover:text-[#f8f5f1]">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="transition-colors duration-300 hover:text-[#f8f5f1]">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
