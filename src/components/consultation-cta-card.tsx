import Image from "next/image";
import Link from "next/link";

type ConsultationCtaCardProps = {
  imageSrc: string;
  href?: string;
};

export function ConsultationCtaCard({
  imageSrc,
  href = "/contacts#contact-form",
}: ConsultationCtaCardProps) {
  return (
    <div className="flex gap-4 bg-[#ebe5dd] p-4 md:gap-5 md:p-5">
      <div className="relative w-24 shrink-0 self-stretch overflow-hidden bg-[#e0d8cf] md:w-28">
        <Image
          src={imageSrc}
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
          href={href}
          className="inline-flex text-[11px] font-medium uppercase tracking-[0.24em] text-[#2a2420]/75 transition-colors duration-300 hover:text-[#3d0d0a] md:text-xs"
        >
          Записаться →
        </Link>
      </div>
    </div>
  );
}
