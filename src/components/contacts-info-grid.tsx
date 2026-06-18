import { SITE_CONTACT } from "@/lib/site-contact";

function ColumnDivider() {
  return (
    <div className="hidden items-center justify-center md:flex" aria-hidden>
      <span className="h-16 w-px bg-[#d4cdc4] lg:h-20" />
    </div>
  );
}

function MobileDivider() {
  return <div className="h-px w-full bg-[#d4cdc4] md:hidden" aria-hidden />;
}

export function ContactsInfoGrid() {
  return (
    <section className="border-b border-[#d4cdc4] bg-[#f5f1eb]" aria-label="Контактная информация">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-14 md:px-10 md:py-16 lg:py-20">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-0">
          <div className="space-y-4 md:pr-10 lg:pr-14">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#2a2420]/55 md:text-xs">
              Офис
            </p>
            <p className="max-w-xs text-[15px] leading-relaxed text-[#151210] md:text-base">
              {SITE_CONTACT.address}
            </p>
            <a
              href={SITE_CONTACT.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-[11px] font-medium uppercase tracking-[0.24em] text-[#2a2420]/75 transition-colors duration-300 hover:text-[#3d0d0a] md:text-xs"
            >
              Смотреть на карте →
            </a>
          </div>

          <ColumnDivider />
          <MobileDivider />

          <div className="space-y-6 md:px-10 lg:px-14">
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#2a2420]/55 md:text-xs">
                Телефон
              </p>
              <a
                href={SITE_CONTACT.phoneHref}
                className="block text-[15px] text-[#151210] transition-colors duration-300 hover:text-[#751f26] md:text-base"
              >
                {SITE_CONTACT.phone}
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#2a2420]/55 md:text-xs">
                Email
              </p>
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="block text-[15px] text-[#151210] transition-colors duration-300 hover:text-[#751f26] md:text-base"
              >
                {SITE_CONTACT.email}
              </a>
            </div>
          </div>

          <ColumnDivider />
          <MobileDivider />

          <div className="space-y-4 md:pl-10 lg:pl-14">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#2a2420]/55 md:text-xs">
              Часы работы
            </p>
            <div className="space-y-1 text-[15px] leading-relaxed text-[#151210] md:text-base">
              <p>{SITE_CONTACT.workingHours.weekdays}</p>
              <p>{SITE_CONTACT.workingHours.weekend}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
