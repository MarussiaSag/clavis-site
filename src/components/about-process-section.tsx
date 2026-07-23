const principles = [
  {
    n: "01",
    title: "Сдержанность",
    text: "Мы не добавляем детали ради деталей. Каждый элемент должен заработать своё место в пространстве.",
  },
  {
    n: "02",
    title: "Честность материала",
    text: "Мрамор остаётся мрамором. Дерево — деревом. Мы не скрываем природу вещей и не имитируем то, чем они не являются.",
  },
  {
    n: "03",
    title: "Свет как первооснова",
    text: "Прежде чем выбрать ткань или отделку, мы изучаем свет. Как комната встречает утро и как переходит в вечер — это определяет всё.",
  },
  {
    n: "04",
    title: "Долговечность",
    text: "Мы проектируем не для фотографий, а для жизни. Через десять лет ваш интерьер должен быть таким же точным и живым, как в день передачи.",
  },
] as const;

export function AboutProcessSection() {
  return (
    <section className="bg-[#f2eee9]">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-10 md:px-10 md:py-14 lg:py-18">
        <header className="grid items-start gap-8 pb-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] md:gap-10 md:pb-12 lg:gap-14">
          <div className="space-y-3 md:space-y-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-[#8a8a8a] md:text-xs">
              Принципы работы
            </p>
            <h2 className="font-serif text-[1.85rem] font-normal leading-[1.15] tracking-[-0.03em] text-[#151210] md:text-[2.15rem] lg:text-[2.4rem] lg:leading-[1.12]">
              То, что нас
              <br />
              <em className="font-normal italic">определяет</em>
            </h2>
          </div>
          <p className="max-w-none text-[15px] leading-[1.7] text-[#5c5c5c] md:mt-8 md:text-base md:leading-[1.72] lg:mt-9">
            Эти принципы не выбиты на стене студии. Они проявляются в каждом чертеже, каждом выборе
            материала и каждом разговоре с заказчиком — если знаешь, куда смотреть.
          </p>
        </header>

        <ol className="grid list-none grid-cols-1 p-0 md:grid-cols-2">
          {principles.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isTop = index < 2;
            const isLast = index === principles.length - 1;

            return (
              <li
                key={item.n}
                className={[
                  "flex flex-col py-9 md:px-10 md:py-12 lg:px-14",
                  "border-[#d4cdc4]",
                  !isLast ? "border-b" : "",
                  isTop ? "md:border-b" : "md:border-b-0",
                  isLeft ? "md:border-r" : "",
                ].join(" ")}
              >
                <span className="font-serif text-sm tabular-nums tracking-[0.04em] text-[#8a8a8a] md:text-[15px]">
                  {item.n}
                </span>
                <h3 className="mt-4 font-serif text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] text-[#151210] md:mt-5 md:text-[1.65rem] lg:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[34rem] text-[14px] leading-[1.7] text-[#6a6a6a] md:mt-4 md:text-[15px] md:leading-[1.72]">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
