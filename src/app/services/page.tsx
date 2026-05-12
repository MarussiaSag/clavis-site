import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

type Service = {
  n: string;
  title: string;
  price: string;
  priceUnit?: string;
  description: string;
};

const services: Service[] = [
  {
    n: "01",
    title: "Дизайн-проект",
    price: "6 000 ₽",
    priceUnit: "за м²",
    description:
      "Полный пакет рабочей документации: чертежи, развёртки, спецификации и узлы — для безошибочной реализации на объекте.",
  },
  {
    n: "02",
    title: "3D-визуализация",
    price: "1 500 ₽",
    priceUnit: "за м²",
    description:
      "Фотореалистичные ракурсы будущего пространства до начала работ. Помогают принять решения «на берегу».",
  },
  {
    n: "03",
    title: "Концепт",
    price: "4 000 ₽",
    priceUnit: "за м²",
    description:
      "Образ и стилистика интерьера: палитра, материалы, свет и характер деталей — собранные в единую систему.",
  },
  {
    n: "04",
    title: "Комплектация",
    price: "Осмечивается индивидуально",
    description:
      "Подбор мебели, света, текстиля и декора. Заказы у проверенных поставщиков и контроль доставки на объект.",
  },
  {
    n: "05",
    title: "Декор",
    price: "4 000 ₽",
    priceUnit: "за м²",
    description:
      "Финальный слой проекта: предметы, текстиль, аксессуары и арт — подбор и расстановка в готовом интерьере.",
  },
  {
    n: "06",
    title: "Авторский надзор",
    price: "Осмечивается индивидуально",
    description:
      "Сопровождение стройки на объекте: контроль качества, узлов и материалов — чтобы проект совпал с эскизом.",
  },
  {
    n: "07",
    title: "Умный дом",
    price: "Осмечивается индивидуально",
    description:
      "Сценарии света, климата, штор и мультимедиа. Подбор системы под архитектуру пространства и привычки.",
  },
  {
    n: "08",
    title: "Архитектура",
    price: "Осмечивается индивидуально",
    description:
      "Объёмно-планировочные решения, фасады и связь с участком — работаем с архитектором проекта.",
  },
  {
    n: "09",
    title: "Инженерные проекты",
    price: "Осмечиваются индивидуально",
    description:
      "Электрика, вода, отопление, вентиляция и слаботочка — увязка с планировкой и сценариями жизни.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="w-full">
        <section className="bg-[#f2efea]">
          <div className="mx-auto w-full max-w-[1240px] px-6 py-14 md:px-10 md:py-20 lg:py-24">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] md:gap-12 lg:gap-16">
              <RevealOnScroll>
                <div className="max-w-3xl space-y-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#b07d55] md:text-xs">
                    Услуги
                  </p>
                  <h1 className="font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-[#151210] md:text-6xl lg:text-[4rem]">
                    Полный цикл — от идеи до финального декора
                  </h1>
                  <p className="max-w-2xl text-[15px] leading-relaxed text-[#2a2420]/85 md:text-base">
                    Берём проект под кураторское внимание и ведём связку архитектуры, инженерии
                    и производства. Ниже — состав услуг и ориентир по стоимости. Финальную смету
                    собираем по составу работ и материалам объекта.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delayMs={140}>
                <div className="relative mx-auto aspect-square w-full max-w-[320px] md:ml-auto md:mr-0 md:max-w-[420px] lg:max-w-[460px]">
                  <Image
                    src="/service/clavis-circle.svg"
                    alt="Эмблема CLAVIS — круг услуг студии"
                    fill
                    priority
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 420px, 460px"
                    className="object-contain"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section aria-label="Интерьеры студии CLAVIS" className="bg-[#f2efea]">
          <div className="mx-auto w-full max-w-[1240px] px-6 pb-10 md:px-10 md:pb-14 lg:pb-16">
            <RevealOnScroll>
              <ul className="grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3 sm:gap-4">
                {[
                  { src: "/chaveta/5.jpg", alt: "Интерьер проекта Chaveta" },
                  { src: "/zil/12.jpg", alt: "Интерьер проекта Zil" },
                  { src: "/chaveta/27.jpg", alt: "Деталь проекта Chaveta" },
                ].map((photo) => (
                  <li
                    key={photo.src}
                    className="relative aspect-[4/5] overflow-hidden bg-[#e8e2dc] sm:aspect-[3/5] md:aspect-[4/5]"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="premium-photo object-cover"
                      quality={90}
                    />
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </section>

        <section className="bg-[#fafafa]">
          <div className="mx-auto w-full max-w-[1240px] px-6 py-12 md:px-10 md:py-16 lg:py-20">
            <RevealOnScroll>
              <ol className="grid list-none gap-px overflow-hidden border border-[#d4cdc4] bg-[#d4cdc4] p-0 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => {
                  const hasFixedPrice = Boolean(service.priceUnit);
                  return (
                    <li
                      key={service.n}
                      className="group relative flex min-h-[320px] flex-col gap-6 bg-[#fafafa] p-7 transition-colors duration-300 hover:bg-[#f4f1ed] md:min-h-[360px] md:p-9"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[11px] font-semibold tabular-nums tracking-[0.26em] text-[#b07d55] md:text-xs">
                          {service.n}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-px flex-1 origin-right scale-x-0 bg-[#b07d55]/40 transition-transform duration-500 group-hover:scale-x-100"
                        />
                      </div>

                      <div className="space-y-3">
                        <h2 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-[#151210] md:text-[1.75rem]">
                          {service.title}
                        </h2>
                        <p className="text-[14px] leading-relaxed text-[#2a2420]/85 md:text-[15px]">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-auto border-t border-[#d4cdc4] pt-5">
                        {hasFixedPrice ? (
                          <p className="flex items-baseline gap-2">
                            <span className="font-serif text-2xl font-medium text-[#3d0d0a] md:text-[1.75rem]">
                              {service.price}
                            </span>
                            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#b07d55] md:text-xs">
                              {service.priceUnit}
                            </span>
                          </p>
                        ) : (
                          <p className="max-w-[16rem] text-[11px] font-semibold uppercase leading-snug tracking-[0.24em] text-[#3d0d0a] md:text-xs">
                            {service.price}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </RevealOnScroll>

            <RevealOnScroll delayMs={120}>
              <p className="mt-8 max-w-3xl text-[12px] uppercase tracking-[0.22em] text-[#2a2420]/70 md:mt-10 md:text-[13px]">
                Услуги можно комбинировать в любом сочетании — от отдельного блока до полного
                сопровождения «под ключ».
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section aria-label="Сценарий пространства" className="relative isolate overflow-hidden bg-[#1a1614]">
          <div className="relative min-h-[58vh] w-full md:min-h-[68vh]">
            <Image
              src="/zil/17.jpg"
              alt="Интерьер студии CLAVIS — сценарий пространства"
              fill
              sizes="100vw"
              className="premium-photo object-cover object-center"
              quality={88}
            />
            <div className="hero-text-overlay pointer-events-none absolute inset-0" />
            <div className="premium-overlay pointer-events-none absolute inset-0" />

            <div className="relative z-10 mx-auto flex h-full min-h-[58vh] w-full max-w-[1240px] flex-col justify-end px-6 pb-12 md:min-h-[68vh] md:px-10 md:pb-16">
              <RevealOnScroll>
                <div className="max-w-2xl space-y-5 text-[#f1ece7]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#e7d8d1]/85 md:text-xs">
                    CLAVIS — сценарии пространства
                  </p>
                  <p className="font-serif text-2xl leading-[1.18] tracking-[-0.02em] text-[#f4f1ed] md:text-4xl">
                    Каждая услуга — это часть единой партитуры: материал, свет, ритм планировки
                    и сценарий жизни в одном проекте.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section className="border-t border-[#a38d83] bg-[#1a1614] text-[#e7d8d1]">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col items-start gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:gap-12 md:px-10 md:py-20">
            <div className="max-w-xl space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#b07d55] md:text-xs">
                Готовы обсудить проект?
              </p>
              <h2 className="font-serif text-3xl font-semibold leading-[1.04] tracking-[-0.02em] text-[#f4f1ed] md:text-5xl">
                Соберём состав работ и точную смету под ваш объект
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center bg-[#f4f1ed] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-[#1a1614] transition-colors duration-300 hover:bg-[#e7d8d1] md:text-[13px]"
              >
                Обсудить проект
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center border border-[#a38d83] bg-transparent px-6 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-[#e7d8d1] transition-colors duration-300 hover:border-[#f4f1ed] hover:text-[#f4f1ed] md:text-[13px]"
              >
                Смотреть портфолио
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
