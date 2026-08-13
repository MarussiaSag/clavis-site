"use client";

import {
  PORTFOLIO_FILTERS,
  type PortfolioFilterId,
} from "@/lib/portfolio-filters";

type PortfolioPageHeaderProps = {
  totalCount: number;
  counts: Record<PortfolioFilterId, number>;
  activeFilter: PortfolioFilterId;
  onFilterChange: (filter: PortfolioFilterId) => void;
};

export function PortfolioPageHeader({
  totalCount,
  counts,
  activeFilter,
  onFilterChange,
}: PortfolioPageHeaderProps) {
  return (
    <section className="bg-[#f5f2ea]">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-6 md:px-6 md:pb-10 md:pt-8 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="hidden grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-start gap-24 lg:grid">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.36em] text-[#8a8a8a]">
              Портфолио
            </p>
            <h1 className="mt-8 font-serif text-[4.25rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#151210]">
              Реализованные{" "}
              <em className="font-normal italic">проекты</em>
            </h1>
          </div>

          <div className="flex flex-col items-end">
            <p
              aria-hidden="true"
              className="font-serif text-[7rem] leading-none tracking-[-0.04em] text-[#cfc7be]"
            >
              {totalCount}
            </p>
            <p className="mt-6 max-w-[22rem] text-right text-[15px] leading-[1.65] text-[#6a6a6a]">
              Каждый проект уникален. Мы не повторяем решения — мы ищем ответ на конкретный вопрос
              конкретного места.
            </p>
          </div>
        </div>

        <h1 className="sr-only">Реализованные проекты</h1>

        <div
          className="flex flex-nowrap gap-1.5 md:gap-2 lg:mt-14 lg:gap-3"
          role="tablist"
          aria-label="Фильтр проектов"
        >
          {PORTFOLIO_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            const count = counts[filter.id];
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onFilterChange(filter.id)}
                className={`inline-flex min-w-0 flex-1 items-center justify-center gap-1 whitespace-nowrap border px-2 py-2.5 text-[9px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 sm:px-3 sm:text-[10px] sm:tracking-[0.14em] md:min-w-[9rem] md:flex-none md:gap-2 md:px-7 md:py-3.5 md:text-xs md:tracking-[0.2em] ${
                  isActive
                    ? "border-[#3d0d0a] bg-[#3d0d0a] text-[#f5f2ea]"
                    : "border-[#cfc7be] bg-transparent text-[#6a6a6a] hover:border-[#a38d83] hover:text-[#151210]"
                }`}
              >
                <span>{filter.label}</span>
                {filter.id !== "all" ? (
                  <span className={isActive ? "text-[#f5f2ea]/70" : "text-[#9a9289]"}>{count}</span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
