export function AboutPhilosophySection() {
  return (
    <section className="bg-[#f2efea]">
      <div className="mx-auto w-full max-w-[1120px] px-6 py-10 md:px-10 md:py-14 lg:py-18">
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          <div className="space-y-6 md:pr-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#b07d55] md:text-xs">
              Философия
            </p>
            <div className="space-y-5 text-[15px] leading-[1.62] text-[#1f1a17] md:text-base">
              <p>
                CLAVIS строит работу на том, что сильный интерьер возникает из напряжения между рамкой
                задачи и амбицией результата. Мы задаём отправную точку так: не «чем это должно
                впечатлять», а{" "}
                <em className="text-[#3d0d0a]">что пространство должно давать жизни</em> — ритм,
                тишину, ясность и опору на годы.
              </p>
              <p>
                Мы ведём проекты как единое поле архитектуры пространства, инжении и производства и
                верим, что самые живые интерьеры рождаются на пересечении дисциплины и чувственной
                красоты.
              </p>
            </div>
          </div>

          <div className="border-t border-[#d9d3cc] pt-12 md:border-l md:border-t-0 md:pl-12 md:pt-0 lg:pl-16">
            <blockquote className="space-y-8">
              <p className="font-serif text-[1.65rem] font-medium leading-snug tracking-[-0.02em] text-[#151210] md:text-[1.95rem] lg:text-[2.125rem]">
                Лучший дизайн не объявляет о себе. Он просто делает всё остальное неизбежным.
              </p>
              <footer className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b07d55] md:text-xs">
                — Команда CLAVIS
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
