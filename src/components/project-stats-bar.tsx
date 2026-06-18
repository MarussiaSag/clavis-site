import { Fragment } from "react";

type StatItem = {
  label: string;
  value: string;
  icon: "area" | "rooms" | "bath" | "style" | "duration";
};

function StatIcon({ type }: { type: StatItem["icon"] }) {
  const paths: Record<StatItem["icon"], React.ReactNode> = {
    area: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M4 12h16M12 4v16" />
      </svg>
    ),
    rooms: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
        <path d="M3 10.5V20h18v-9.5" />
        <path d="M3 10.5 12 4l9 6.5" />
        <path d="M9 20v-5h6v5" />
      </svg>
    ),
    bath: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
        <path d="M4 14h16v3a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-3Z" />
        <path d="M6 14V9a2 2 0 0 1 2-2h1" />
        <path d="M18 7v7" />
      </svg>
    ),
    style: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
        <path d="M12 3c-3 4-7 5-7 10a7 7 0 0 0 14 0c0-5-4-6-7-10Z" />
        <path d="M12 17v4" />
      </svg>
    ),
    duration: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  };

  return <span className="text-[#4d131a]/55">{paths[type]}</span>;
}

function StatCell({ stat }: { stat: StatItem }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 text-center md:gap-3">
      <StatIcon type={stat.icon} />
      <p className="text-[10px] uppercase tracking-[0.26em] text-[#4d131a]/60 md:text-[11px]">{stat.label}</p>
      <p className="text-sm font-medium text-[#151210] md:text-base">{stat.value}</p>
    </div>
  );
}

function StatDivider() {
  return (
    <div className="flex shrink-0 items-center justify-center px-1" aria-hidden>
      <span className="h-14 w-px bg-[#e0dbd5] md:h-16" />
    </div>
  );
}

function StatRow({ items }: { items: StatItem[] }) {
  return (
    <div className="flex items-center">
      {items.map((stat, index) => (
        <Fragment key={stat.label}>
          {index > 0 ? <StatDivider /> : null}
          <div className="min-w-0 flex-1">
            <StatCell stat={stat} />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

type ProjectStatsBarProps = {
  stats: StatItem[];
};

export function ProjectStatsBar({ stats }: ProjectStatsBarProps) {
  return (
    <section className="border-y border-[#e0dbd5] bg-[#f5f3f0]" aria-label="Характеристики проекта">
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="hidden lg:block">
          <StatRow items={stats} />
        </div>

        <div className="hidden sm:block lg:hidden">
          <StatRow items={stats.slice(0, 3)} />
          <div className="my-8 h-px bg-[#e0dbd5]" aria-hidden />
          <div className="mx-auto max-w-2xl">
            <StatRow items={stats.slice(3)} />
          </div>
        </div>

        <div className="space-y-8 sm:hidden">
          <StatRow items={stats.slice(0, 2)} />
          <div className="h-px bg-[#e0dbd5]" aria-hidden />
          <StatRow items={stats.slice(2, 4)} />
          <div className="h-px bg-[#e0dbd5]" aria-hidden />
          <div className="mx-auto max-w-[50%]">
            <StatCell stat={stats[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export type { StatItem };
