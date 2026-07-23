const steps = [
  {
    n: "01",
    title: "Погружение",
    text: "Первая встреча — это разговор, а не презентация. Мы изучаем объект, задаём неудобные вопросы и слушаем то, что остаётся за словами. Только поняв, как вы живёте, мы можем предложить что-то настоящее.",
  },
  {
    n: "02",
    title: "Концепция",
    text: "Пространственная идея складывается из архитектурного анализа, материальных референсов и понимания света. Мы не приходим с готовыми решениями — мы создаём их специально для вас.",
  },
  {
    n: "03",
    title: "Реализация",
    text: "Каждый чертёж проверяется трижды. Каждый поставщик отобран. Авторский надзор — не формальность: мы присутствуем на объекте регулярно и отвечаем за результат.",
  },
  {
    n: "04",
    title: "Передача",
    text: "Финальный день — это не торопливый обход. Мы передаём объект основательно: вы получаете не просто красивую квартиру, но и понимание каждого материала, каждого источника света.",
  },
] as const;

export function AboutWorkflowSection() {
  return (
    <section className="bg-[#141210] text-[#f4f1ed]">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-14 md:px-10 md:py-18 lg:py-22">
        <header className="grid items-start gap-8 pb-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] md:gap-10 md:pb-14 lg:gap-14">
          <div className="space-y-3 md:space-y-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-[#9a9088] md:text-xs">
              Процесс
            </p>
            <h2 className="font-serif text-[1.85rem] font-normal leading-[1.15] tracking-[-0.03em] text-[#f4f1ed] md:text-[2.15rem] lg:text-[2.4rem] lg:leading-[1.12]">
              Как мы
              <br />
              <em className="font-normal italic">работаем</em>
            </h2>
          </div>
          <p className="max-w-none text-[15px] leading-[1.7] text-[#b8b0a8] md:mt-8 md:text-base md:leading-[1.72] lg:mt-9">
            Дизайн — это не одно вдохновенное решение. Это устойчивый диалог между замыслом и
            реальностью, выстроенный так, чтобы ничего не оказалось случайным.
          </p>
        </header>

        <ol className="grid list-none grid-cols-1 gap-10 p-0 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
          {steps.map((step, index) => (
            <li
              key={step.n}
              className={`flex flex-col lg:px-8 ${index === 0 ? "lg:pl-0" : "lg:border-l lg:border-[#2e2a27]"} ${
                index === steps.length - 1 ? "lg:pr-0" : ""
              }`}
            >
              <span className="text-[11px] font-medium tabular-nums tracking-[0.2em] text-[#7a726c] md:text-xs">
                {step.n}
              </span>
              <h3 className="mt-4 font-serif text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-[#f4f1ed] md:mt-5 md:text-[1.5rem]">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.7] text-[#9a9189] md:mt-4 md:text-[15px] md:leading-[1.72]">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
