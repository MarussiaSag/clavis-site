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
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-6 md:px-6 md:pb-14 md:pt-8 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-start md:gap-16 lg:gap-24">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-[#8a8a8a] md:text-xs">
              Портфолио
            </p>
            <h1 className="mt-6 font-serif text-[2.75rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#151210] md:mt-8 md:text-[3.5rem] lg:text-[4.25rem] lg:leading-[1.05]">
              Реализованные{" "}
              <em className="font-normal italic">проекты</em>
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <p
              aria-hidden="true"
              className="font-serif text-[4.5rem] leading-none tracking-[-0.04em] text-[#cfc7be] md:text-[6rem] lg:text-[7rem]"
            >
              {totalCount}
            </p>
            <p className="mt-4 max-w-[22rem] text-[15px] leading-[1.65] text-[#6a6a6a] md:mt-6 md:text-right md:text-[15px]">
              Каждый проект уникален. Мы не повторяем решения — мы ищем ответ на конкретный вопрос
              конкретного места.
            </p>
          </div>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-2 md:mt-14 md:gap-3"
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
                className={`inline-flex min-w-[7.5rem] items-center justify-center gap-2 border px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 md:min-w-[9rem] md:px-7 md:py-3.5 md:text-xs ${
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
