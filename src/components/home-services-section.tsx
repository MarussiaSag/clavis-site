import Link from "next/link";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { sectionContainer } from "@/lib/home-layout";
import { HOME_SERVICES, HOME_SERVICES_INTRO } from "@/lib/home-services";

function serviceCellBorderClass(index: number) {
  if (index === 0) return "border-b border-[#cfc7be] sm:border-r";
  if (index === 1) return "border-b border-[#cfc7be]";
  if (index === 2) return "border-b border-[#cfc7be] sm:border-b-0 sm:border-r";
  return "";
}

const cellX = "px-0 sm:px-6 md:px-8 lg:px-10";

export function HomeServicesSection() {
  return (
    <section className="border-b border-[#a38d83]/45 bg-[#f2eee8]" aria-labelledby="home-services-heading">
      <div className={`${sectionContainer} py-16 md:py-20 lg:py-24`}>
        <RevealOnScroll once>
          <div>
            <p id="home-services-heading" className="ui-eyebrow text-[#8a8a8a]">
              Что мы предлагаем
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-[minmax(0,30%)_minmax(0,70%)] sm:items-start">
              <h2 className="ui-title text-[#141414]">Услуги</h2>
              <p className={`ui-body mt-4 min-w-0 text-[#4d4d4d] sm:col-start-2 sm:row-start-1 sm:mt-0 ${cellX}`}>
                {HOME_SERVICES_INTRO}
              </p>
            </div>
          </div>

          <ul className="mt-12 grid sm:grid-cols-2 md:mt-16 lg:mt-20">
            {HOME_SERVICES.map((service, index) => (
              <li key={service.title} className={serviceCellBorderClass(index)}>
                <Link
                  href={service.href}
                  className={`group flex h-full min-h-0 flex-col py-8 transition-colors duration-300 hover:bg-[#ebe6de] md:min-h-[280px] md:py-12 lg:py-14 ${cellX}`}
                >
                  <span className="font-mono text-xs tabular-nums text-[#9a9289]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-serif text-[1.45rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#141414] transition-colors duration-300 group-hover:text-[#4d131a] md:mt-10 md:text-[1.85rem]">
                    {service.title}
                  </h3>
                  <p className="ui-body-sm mt-3 max-w-md text-[#5c5c5c] md:mt-6">{service.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
