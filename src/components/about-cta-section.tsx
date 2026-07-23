import Link from "next/link";

export function AboutCtaSection() {
  return (
    <section className="bg-[#141414]" aria-labelledby="about-cta-heading">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center px-6 py-20 text-center md:px-10 md:py-28 lg:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 md:gap-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-white/45 md:text-xs">
            Начнём разговор
          </p>

          <h2
            id="about-cta-heading"
            className="font-serif text-[2.5rem] font-normal leading-[1.12] tracking-[-0.03em] text-[#f1ece7] md:text-[3.25rem] lg:text-[3.75rem] lg:leading-[1.08]"
          >
            Готовы обсудить
            <br />
            <em className="font-normal italic">ваш проект?</em>
          </h2>

          <p className="max-w-xl text-[15px] leading-[1.7] text-[#b8b0a8] md:text-lg md:leading-[1.65]">
            Мы берём ограниченное число новых проектов в год. Напишите нам — мы будем рады узнать о
            вашем пространстве.
          </p>

          <div className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 bg-[#b07d55] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#f1ece7] transition-colors duration-300 hover:bg-[#9a6c48] md:text-xs"
            >
              Связаться с нами
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center border border-[#f1ece7]/85 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#f1ece7] transition-colors duration-300 hover:bg-[#f1ece7]/10 md:text-xs"
            >
              Смотреть проекты
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
