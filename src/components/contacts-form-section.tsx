import { createInquiry } from "@/app/actions";
import { ContactsPhoneInput } from "@/components/contacts-phone-input";
import { getSiteContact, socialLinksFromContact } from "@/lib/site-contact";
import Image from "next/image";
import Link from "next/link";

type ContactsFormSectionProps = {
  consultationImageSrc: string;
};

function SocialIcon({ label }: { label: string }) {
  const common = "h-4 w-4 text-[#2a2420]/70";

  switch (label) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={common} aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Telegram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={common} aria-hidden>
          <path d="M5 12l12-5-3 11-3-4-5 2 3-4-9 0z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={common} aria-hidden>
          <path d="M6 18h4l8-12H10L6 18z" />
        </svg>
      );
  }
}

const fieldClassName =
  "w-full border-0 border-b border-[#c9bfb4] bg-transparent px-0 py-3 text-[15px] text-[#151210] placeholder:text-[#2a2420]/45 outline-none transition-colors focus:border-[#2a2420]/70";

export async function ContactsFormSection({ consultationImageSrc }: ContactsFormSectionProps) {
  const socialLinks = socialLinksFromContact(await getSiteContact());

  return (
    <section className="bg-[#f5f1eb]">
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-6 py-12 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-16 md:px-10 md:py-16 lg:gap-20">
        <div className="space-y-10">
          <div>
            <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.32em] text-[#2a2420]/55 md:text-xs">
              Мы в социальных сетях
            </p>
            <ul className="divide-y divide-[#d4cdc4] border-y border-[#d4cdc4]">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-4 transition-colors duration-300 hover:text-[#3d0d0a]"
                  >
                    <SocialIcon label={social.label} />
                    <span className="flex-1 text-[15px] text-[#151210] md:text-base">
                      {social.label}
                      {social.label === "Instagram" ? "*" : null}
                    </span>
                    <span className="text-sm text-[#2a2420]/45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#2a2420]/70">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 bg-[#ebe5dd] p-4 md:gap-5 md:p-5">
            <div className="relative w-24 shrink-0 self-stretch overflow-hidden bg-[#e0d8cf] md:w-28">
              <Image
                src={consultationImageSrc}
                alt="Текстура интерьера CLAVIS"
                fill
                sizes="112px"
                className="premium-photo object-cover object-center"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-between gap-4 py-1">
              <div className="space-y-2">
                <p className="font-serif text-lg leading-snug text-[#151210] md:text-xl">
                  Обсудим ваш проект?
                </p>
                <p className="text-[13px] leading-relaxed text-[#2a2420]/75 md:text-sm">
                  Запишитесь на консультацию — подберём лучшее решение
                </p>
              </div>
              <Link
                href="#contact-form"
                className="inline-flex text-[11px] font-medium uppercase tracking-[0.24em] text-[#2a2420]/75 transition-colors duration-300 hover:text-[#3d0d0a] md:text-xs"
              >
                Записаться →
              </Link>
            </div>
          </div>
        </div>

        <div id="contact-form" className="scroll-mt-24">
          <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.32em] text-[#2a2420]/55 md:text-xs">
            Напишите нам
          </p>
          <form action={createInquiry} className="space-y-6">
            <input name="name" placeholder="Имя" required className={fieldClassName} />
            <input name="email" type="email" placeholder="Email" required className={fieldClassName} />
            <ContactsPhoneInput className={fieldClassName} />
            <textarea
              name="message"
              placeholder="Сообщение"
              required
              rows={4}
              className={`${fieldClassName} resize-none`}
            />
            <div className="space-y-4 pt-2">
              <button
                type="submit"
                className="w-full bg-[#4d131a] px-6 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#f5f1eb] transition-colors duration-300 hover:bg-[#3d0d0a] md:text-xs"
              >
                Отправить сообщение
              </button>
              <p className="text-[12px] leading-relaxed text-[#2a2420]/55">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link href="/privacy" className="underline underline-offset-2 transition-colors hover:text-[#2a2420]/75">
                  политикой конфиденциальности
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
