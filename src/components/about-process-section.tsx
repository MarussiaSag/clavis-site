const steps = [
  {
    n: "01",
    title: "Погружение",
    text: "Изучаем объект, сценарии жизни и ограничения площадки: планировка, инженерия, сроки и бюджет. Собираем референсы и фиксируем критерии успеха, чтобы дальше не спорить с реальностью стройки.",
  },
  {
    n: "02",
    title: "Концепция",
    text: "Собираем образ пространства в цельную систему: зонирование, материалы, свет и характер деталей. Утверждаем направление, от которого будут отталкиваться все последующие решения.",
  },
  {
    n: "03",
    title: "Проектирование",
    text: "Готовим рабочую документацию и спецификации: чертежи для подрядчиков, узлы, привязка мебели и оборудования. Уточняем детали в итерациях, пока проект не становится однозначным для реализации.",
  },
  {
    n: "04",
    title: "Реализация",
    text: "Комплектация, заказы и авторский надзор на объекте. Контролируем поставки, монтаж и финиш — чтобы готовое пространство совпало с утверждённой концепцией и оставалось удобным в эксплуатации.",
  },
] as const;

export function AboutProcessSection() {
  return (
    <section className="bg-[#f2eee9]">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-10 md:px-10 md:py-14 lg:py-18">
        <header className="max-w-3xl space-y-3 pb-8 md:space-y-4 md:pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#b07d55] md:text-xs">
            Как мы работаем
          </p>
          <h2 className="font-serif text-[2rem] font-semibold tracking-[-0.03em] text-[#151210] md:text-5xl lg:text-[3rem]">
            Процесс
          </h2>
        </header>

        <div className="border-t border-[#d4cdc4] pt-10 md:pt-12">
          <ol className="grid list-none gap-10 p-0 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
            {steps.map((step) => (
              <li key={step.n} className="flex flex-col">
                <span className="text-[11px] font-semibold tabular-nums tracking-[0.2em] text-[#b07d55] md:text-xs md:tracking-[0.26em]">
                  {step.n}
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold tracking-tight text-[#151210] md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#2a2420]/90 md:text-[15px]">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
