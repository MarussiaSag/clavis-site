import Image from "next/image";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { homeSectionPadding } from "@/lib/home-layout";

const FOUNDER_IMAGE = "/Tatiana/IMG_6579.JPG";

export function HomeFounderMagazineSection() {
  return (
    <section className="border-b border-[#a38d83] bg-[#fafafa]">
      <div className={`mx-auto max-w-[1180px] ${homeSectionPadding}`}>
        <header className="text-center">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.38em] text-[#b07d55] md:text-xs md:tracking-[0.42em]">
            Обращение основателя
          </p>
        </header>

        <div className="mt-12 grid gap-12 md:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] md:items-start md:gap-12 lg:gap-14">
          <RevealOnScroll className="space-y-7 md:pt-2" delayMs={30} once>
            <p className="text-[13px] font-bold uppercase leading-snug tracking-[0.06em] text-[#141414] md:text-sm md:leading-snug md:tracking-[0.07em]">
              Я основала студию CLAVIS с пониманием, что пришло время пересмотреть привычные коды
              интерьерного проектирования: меньше декора ради галереи, больше ясности, характера и
              доверия к материалу.
            </p>
            <div className="h-px w-full max-w-[4.5rem] bg-[#c8c8c8]" />
            <div className="space-y-5 text-[15px] font-normal leading-[1.72] tracking-[-0.01em] text-[#252525]/92 md:text-base md:leading-[1.75]">
              <p>
                Для меня дом — это не набор стилевых клише, а среда под ваш семейный сценарий: свет,
                тишина, тактильность и аккуратная логика планировки. Я строю проекты так, чтобы
                пространство оставалось «в фокусе» и через годы, без усталости от трендов.
              </p>
              <p>
                Мы ведём цикл от первой консультации до реализации с единым кураторским вниманием:
                связка архитектуры пространства, инжении и производства позволяет избежать разрыва
                между образом на эскизах и тем, как это живёт после сдачи.
              </p>
              <p>
                Если ваш запрос звучит как «дорого, но сдержанно» и «сложно по задаче — спокойно по
                ощущению», нам по пути.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="relative md:pt-6" delayMs={120} once>
            <div className="relative mx-auto flex w-full max-w-[420px] flex-col md:mx-0 md:ml-auto md:max-w-[460px]">
              <figure className="relative aspect-[3/4] w-full overflow-hidden bg-[#e8e8e8]">
                <Image
                  src={FOUNDER_IMAGE}
                  alt="Основатель студии CLAVIS"
                  fill
                  sizes="(max-width: 768px) 100vw, 44vw"
                  className="object-cover object-[center_20%]"
                  priority={false}
                />
              </figure>
              <div className="mt-8 flex w-full flex-col items-end md:mt-10">
                <p className="font-serif text-4xl italic leading-none tracking-tight text-[#141414] md:text-[2.85rem]">
                  Татьяна Кожевникова
                </p>
                <p className="mt-5 max-w-[14rem] text-right text-[10px] font-medium uppercase leading-snug tracking-[0.34em] text-[#454545] md:text-[11px] md:tracking-[0.38em]">
                  Основатель студии
                  <br />
                  CLAVIS
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
