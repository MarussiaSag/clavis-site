"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "Обо мне" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/contacts", label: "Контакты" },
  { href: "/admin", label: "Админка" },
];

type SiteHeaderProps = {
  variant?: "default" | "hero";
};

export function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHero = variant === "hero";

  const burgerLineColor = "bg-[#a38d83]";

  if (variant === "hero") {
    return (
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="relative flex items-center justify-start px-6 py-5 md:px-10">
          <button
            type="button"
            aria-label="Открыть меню"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center"
          >
            <span className="sr-only">Открыть меню</span>
            <span className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 ${burgerLineColor}`} />
              <span className={`h-0.5 w-5 ${burgerLineColor}`} />
              <span className={`h-0.5 w-5 ${burgerLineColor}`} />
            </span>
          </button>
        </div>
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/35"
          />
          <aside
            className={`absolute left-0 top-0 h-full w-[82vw] max-w-sm bg-[#f4f1ed] p-6 shadow-2xl transition-transform duration-300 md:p-8 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mb-8 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-[#4d131a]/80">Menu</p>
              <button
                type="button"
                aria-label="Закрыть меню"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl leading-none text-[#4d131a]"
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base uppercase tracking-[0.15em] text-[#3d0d0a] transition-colors duration-300 hover:text-[#751f26]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#a38d83] bg-[#f4f1ed]">
        <div className="relative flex w-full items-center justify-between px-6 py-5 md:px-10">
          <button
            type="button"
            aria-label="Открыть меню"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center"
          >
            <span className="sr-only">Открыть меню</span>
            <span className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 ${burgerLineColor}`} />
              <span className={`h-0.5 w-5 ${burgerLineColor}`} />
              <span className={`h-0.5 w-5 ${burgerLineColor}`} />
            </span>
          </button>
          <div className="h-10 w-10" />
        </div>
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/35"
          />
          <aside
            className={`absolute left-0 top-0 h-full w-[82vw] max-w-sm bg-[#f4f1ed] p-6 shadow-2xl transition-transform duration-300 md:p-8 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mb-8 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-[#4d131a]/80">Menu</p>
              <button
                type="button"
                aria-label="Закрыть меню"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl leading-none text-[#4d131a]"
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base uppercase tracking-[0.15em] text-[#3d0d0a] transition-colors duration-300 hover:text-[#751f26]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </header>
      <div className="h-[84px] md:h-[92px]" />
    </>
  );
}
