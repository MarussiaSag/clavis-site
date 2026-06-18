import Image from "next/image";

type ContactsHeroSectionProps = {
  imageSrc: string;
};

export function ContactsHeroSection({ imageSrc }: ContactsHeroSectionProps) {
  return (
    <section className="relative border-b border-[#d4cdc4] bg-[#f5f1eb] md:h-[clamp(620px,74vh,860px)]">
      <div className="absolute inset-y-0 right-0 hidden overflow-hidden md:block md:left-[42%] lg:left-[40%]">
        <Image
          src={imageSrc}
          alt="Интерьер студии CLAVIS"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 58vw"
          className="premium-photo object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pb-10 pt-[84px] text-center md:w-[42%] md:max-w-none md:items-center md:px-10 md:pb-12 md:pt-[92px] lg:pb-16">
        <div className="max-w-xl space-y-5 md:space-y-6">
          <h1 className="font-serif text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[#151210] md:text-6xl lg:text-[4.25rem]">
            Контакты
          </h1>
          <p className="mx-auto max-w-md text-[15px] leading-relaxed text-[#2a2420]/80 md:text-base">
            Мы всегда открыты к новым проектам и интересным сотрудничествам
          </p>
        </div>
      </div>

      <div className="relative min-h-[56vh] w-full overflow-hidden md:hidden">
        <Image
          src={imageSrc}
          alt="Интерьер студии CLAVIS"
          fill
          sizes="100vw"
          className="premium-photo object-cover object-center"
        />
      </div>
    </section>
  );
}
