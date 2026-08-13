/** Контейнер и вертикальный ритм секций. */
export const sectionContainer = "ui-section";

/** Широкий контейнер для split-секций (заголовок слева, сетка справа). */
export const splitSectionContainer = "ui-section max-w-[1360px]";

/** Горизонтальные отступы секции на всю ширину экрана (без max-width). */
export const fullWidthSectionX = "px-6 md:px-10 lg:px-16 xl:px-20";

/** Верхний отступ + горизонтальные поля для full-bleed секций. */
export const fullWidthSectionHeader = "px-6 pt-16 pb-0 md:px-10 md:pt-20 lg:px-16 xl:px-20";

/** @deprecated Используйте sectionContainer */
export const homeSectionPadding = sectionContainer;

/** Отступ между заголовком секции и контентом */
export const sectionContentGap = "ui-header-gap";

/** Сетка карточек на главной (портфолио). */
export const homeCardGridGap = "gap-6 lg:gap-8";

/**
 * Ширина карточки в home-секциях.
 * внутри fullWidthSectionX и homeCardGridGap.
 */
export const homeCardWidthClass =
  "w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-6rem)/4)]";
