"use client";

import { usePathname } from "next/navigation";

type TelegramFloatButtonProps = {
  href: string;
};

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.8 3.2 2.9 10.5c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 11.1-7c.5-.3.9-.1.5.2L9.7 15.3v3.6c0 .9.4 1.1 1 .6l2.9-2.8 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.6Z" />
    </svg>
  );
}

export function TelegramFloatButton({ href }: TelegramFloatButtonProps) {
  const pathname = usePathname();
  const cleanHref = href.trim();

  if (!cleanHref || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={cleanHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Telegram"
      className="telegram-float fixed z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#3d0d0a] text-[#f4f1ed] shadow-[0_10px_28px_rgba(61,13,10,0.35)] transition-transform duration-300 hover:scale-105 md:hidden"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
    >
      <span className="telegram-float-ring" aria-hidden />
      <TelegramIcon className="relative z-10 h-7 w-7" />
    </a>
  );
}
