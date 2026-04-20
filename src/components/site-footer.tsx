import Link from "next/link";

const links = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "Обо мне" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/contacts", label: "Контакты" },
  { href: "/admin", label: "Админка" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#4c5359] bg-[#23272b] text-[#d9cec6]">
      <div className="flex w-full items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="text-xl font-semibold tracking-wide text-[#f1ece7]">
          Clavis
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.15em]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#c8bcb2] transition-colors duration-300 hover:text-[#f8f5f1]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
