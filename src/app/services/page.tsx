import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { getSiteImages } from "@/lib/site-images";

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

export default async function ServicesPage() {
  const images = await getSiteImages();
  const galleryPhotos = [
    { src: images["services.gallery.1"], alt: "Интерьер проекта Chaveta", short: false },
    { src: images["services.gallery.2"], alt: "Интерьер проекта Zil", short: true },
    { src: images["services.gallery.3"], alt: "Деталь проекта Chaveta", short: false },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="w-full">
        <section className="bg-[#f5f2ea]">
          <div className="mx-auto w-full max-w-[1240px] px-6 pb-16 pt-6 md:px-10 md:pb-24 md:pt-8 lg:pb-28 lg:pt-10">
            <div className="grid gap-12 md:grid-cols-2 md:items-stretch md:gap-x-16 lg:gap-x-24">
              <RevealOnScroll>
                <div className="flex h-full flex-col">
                  <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-[#8a8a8a] md:text-xs">
                    Услуги
                  </p>
                  <h1 className="mt-8 font-serif text-[2.75rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#151210] md:mt-10 md:text-[3.5rem] lg:text-[4.25rem] lg:leading-[1.05]">
                    Полный цикл —{" "}
                    <span className="block">от идеи до</span>
                    <em className="block font-normal italic">финального</em>
                    <em className="block font-normal italic">объекта</em>
                  </h1>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delayMs={140} className="h-full">
                <div className="flex h-full min-h-0 flex-col items-start md:items-end md:justify-between">
                  <div className="relative aspect-square w-[148px] shrink-0 sm:w-[168px] md:w-[180px] lg:w-[200px]">
                    <Image
                      src="/service/clavis-circle.svg"
                      alt="Эмблема CLAVIS — круг услуг студии"
                      fill
                      priority
                      sizes="(max-width: 640px) 148px, (max-width: 1024px) 180px, 200px"
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-10 max-w-[20rem] text-[15px] leading-[1.65] text-[#6a6a6a] md:mt-0 md:max-w-[21rem] md:text-right md:text-[15px] lg:max-w-[22rem]">
                    Мы сопровождаем проект на каждом этапе — от первой встречи до финальной
                    расстановки предметов. Можно подключить нас на любой стадии или довериться
                    полностью.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section aria-label="Интерьеры студии CLAVIS" className="bg-[#f5f2ea]">
          <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 md:px-6 md:pb-16 lg:px-8 lg:pb-20">
            <RevealOnScroll>
              <ul className="flex list-none flex-col gap-3 p-0 sm:flex-row sm:items-center sm:gap-3 md:gap-4">
                {galleryPhotos.map((photo) => (
                  <li
                    key={photo.src}
                    className={`relative w-full overflow-hidden bg-[#e8e2dc] sm:flex-1 ${
                      photo.short
                        ? "aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5]"
                        : "aspect-[4/5] sm:aspect-[3/5] md:aspect-[2/3] lg:aspect-[3/5]"
                    }`}
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

        <section className="bg-[#f5f2ea]">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
            <RevealOnScroll>
              <ol className="grid list-none p-0 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => {
                  const hasFixedPrice = Boolean(service.priceUnit);
                  const colMd = index % 2;
                  const colLg = index % 3;
                  const borderClass = [
                    index < 8 ? "border-b" : "",
                    index >= 6 ? "lg:border-b-0" : "",
                    colMd === 0 && index !== 8 ? "md:border-r" : "",
                    colLg !== 2 ? "lg:border-r" : "lg:border-r-0",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <li
                      key={service.n}
                      className={`group relative flex min-h-[200px] flex-col border-[#cfc7be] px-0 py-6 transition-colors duration-300 hover:bg-[#ebe6de] sm:min-h-[210px] sm:px-6 md:min-h-[220px] md:px-8 md:py-7 lg:px-10 ${borderClass}`}
                    >
                      <span className="font-mono text-xs tabular-nums text-[#9a9289]">
                        {service.n}
                      </span>

                      <h2 className="mt-5 font-serif text-[1.65rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#141414] transition-colors duration-300 group-hover:text-[#8c6b5a] md:mt-6 md:text-[1.75rem]">
                        {service.title}
                      </h2>

                      <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#5c5c5c] md:mt-4 md:text-[15px]">
                        {service.description}
                      </p>

                      <div className="mt-auto pt-6">
                        {hasFixedPrice ? (
                          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span className="font-serif text-xl font-medium text-[#141414] md:text-[1.35rem]">
                              {service.price}
                            </span>
                            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9a9289] md:text-xs">
                              {service.priceUnit}
                            </span>
                          </p>
                        ) : (
                          <p className="max-w-[16rem] text-[11px] font-medium uppercase leading-snug tracking-[0.2em] text-[#4d4d4d] md:text-xs">
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

        <section aria-label="Обсудить проект" className="relative isolate overflow-hidden bg-[#3d0d0a]">
          <div className="relative min-h-[58vh] w-full md:min-h-[68vh]">
            <Image
              src={images["services.cta"]}
              alt="Интерьер студии CLAVIS — сценарий пространства"
              fill
              sizes="100vw"
              className="premium-photo object-cover object-center"
              quality={88}
            />
            <div className="hero-text-overlay pointer-events-none absolute inset-0" />
            <div className="premium-overlay pointer-events-none absolute inset-0" />

            <div className="relative z-10 mx-auto flex h-full min-h-[58vh] w-full max-w-[1440px] items-end px-4 pb-12 md:min-h-[68vh] md:px-6 md:pb-16 lg:px-8 lg:pb-20">
              <RevealOnScroll className="w-full">
                <div className="grid w-full gap-10 text-[#f1ece7] md:grid-cols-2 md:items-end md:gap-16 lg:gap-24">
                  <h2 className="max-w-xl font-serif text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#f4f1ed] md:text-4xl lg:text-5xl">
                    Соберём состав работ и точную смету под{" "}
                    <em className="font-normal italic">ваш объект</em>
                  </h2>

                  <div className="flex max-w-md flex-col gap-8 md:ml-auto md:max-w-sm lg:max-w-md">
                    <p className="text-[15px] leading-relaxed text-[#e7d8d1]/85 md:text-base">
                      Расскажите о проекте — мы подготовим персональное предложение с перечнем
                      услуг и предварительной стоимостью в течение трёх рабочих дней.
                    </p>
                    <Link
                      href="/contacts"
                      className="inline-flex w-fit items-center justify-center border border-[#e7d8d1]/70 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-[#f4f1ed] transition-colors duration-300 hover:border-[#f4f1ed] hover:bg-[#f4f1ed] hover:text-[#3d0d0a] md:text-[13px]"
                    >
                      Связаться с нами →
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
