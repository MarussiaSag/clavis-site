export type PortfolioFilterId = "all" | "residential" | "hospitality" | "commercial";

export type PortfolioFilterOption = {
  id: PortfolioFilterId;
  label: string;
};

export const PORTFOLIO_FILTERS: PortfolioFilterOption[] = [
  { id: "all", label: "Все" },
  { id: "residential", label: "Жилые" },
  { id: "hospitality", label: "Гостеприимство" },
  { id: "commercial", label: "Коммерческие" },
];

/** Fixed project types for admin — must match portfolio filter groups. */
export const PROJECT_CATEGORY_OPTIONS = [
  { value: "Жилые", filterId: "residential" as const },
  { value: "Гостеприимство", filterId: "hospitality" as const },
  { value: "Коммерческие", filterId: "commercial" as const },
] as const;

export type ProjectCategoryValue = (typeof PROJECT_CATEGORY_OPTIONS)[number]["value"];

export function isProjectCategory(value: string): value is ProjectCategoryValue {
  return PROJECT_CATEGORY_OPTIONS.some((option) => option.value === value);
}

const RESIDENTIAL = new Set([
  "жилые",
  "квартира",
  "апартаменты",
  "дом",
  "вилла",
  "пентхаус",
  "резиденция",
]);

const HOSPITALITY = new Set([
  "гостеприимство",
  "кафе",
  "ресторан",
  "отель",
  "бар",
  "лаундж",
  "сигарный лаундж",
  "гостиница",
]);

const COMMERCIAL = new Set([
  "коммерческие",
  "офис",
  "шоурум",
  "бутик",
  "магазин",
  "клиника",
  "салон",
]);

export function resolvePortfolioGroup(category: string): Exclude<PortfolioFilterId, "all"> | null {
  const exact = PROJECT_CATEGORY_OPTIONS.find((option) => option.value === category.trim());
  if (exact) return exact.filterId;

  const value = category.trim().toLowerCase();
  if (!value) return null;
  if (RESIDENTIAL.has(value) || [...RESIDENTIAL].some((key) => value.includes(key))) {
    return "residential";
  }
  if (HOSPITALITY.has(value) || [...HOSPITALITY].some((key) => value.includes(key))) {
    return "hospitality";
  }
  if (COMMERCIAL.has(value) || [...COMMERCIAL].some((key) => value.includes(key))) {
    return "commercial";
  }
  return null;
}

export function matchesPortfolioFilter(category: string, filter: PortfolioFilterId) {
  if (filter === "all") return true;
  return resolvePortfolioGroup(category) === filter;
}

export function countPortfolioFilters<T extends { category: string }>(projects: T[]) {
  const counts: Record<PortfolioFilterId, number> = {
    all: projects.length,
    residential: 0,
    hospitality: 0,
    commercial: 0,
  };

  for (const project of projects) {
    const group = resolvePortfolioGroup(project.category);
    if (group) counts[group] += 1;
  }

  return counts;
}

const PORTFOLIO_GROUP_LABELS: Record<Exclude<PortfolioFilterId, "all">, string> = {
  residential: "ЖИЛЫЕ",
  hospitality: "ГОСТЕПРИИМСТВО",
  commercial: "КОММЕРЧЕСКИЕ",
};

export function portfolioCategoryLabel(category: string) {
  const group = resolvePortfolioGroup(category);
  if (group) return PORTFOLIO_GROUP_LABELS[group];
  return category.toUpperCase();
}
