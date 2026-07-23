"use client";

import { useMemo, useState } from "react";
import { PortfolioOverviewGrid } from "@/components/portfolio-overview-grid";
import { PortfolioPageHeader } from "@/components/portfolio-page-header";
import { PortfolioShowcaseStack } from "@/components/portfolio-showcase-stack";
import {
  countPortfolioFilters,
  matchesPortfolioFilter,
  type PortfolioFilterId,
} from "@/lib/portfolio-filters";

type PortfolioProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  areaLabel: string | null;
  description: string;
  coverImage: string;
  secondaryImage: string;
};

type PortfolioArchiveSectionProps = {
  projects: PortfolioProject[];
};

export function PortfolioArchiveSection({ projects }: PortfolioArchiveSectionProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilterId>("all");
  const counts = useMemo(() => countPortfolioFilters(projects), [projects]);

  const filteredProjects = useMemo(
    () => projects.filter((project) => matchesPortfolioFilter(project.category, activeFilter)),
    [activeFilter, projects],
  );

  return (
    <>
      <PortfolioPageHeader
        totalCount={projects.length}
        counts={counts}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <div id="portfolio-archive">
        {filteredProjects.length > 0 ? (
          <PortfolioShowcaseStack projects={filteredProjects} />
        ) : (
          <div className="bg-[#f5f2ea] px-6 py-20 text-center md:px-10">
            <p className="text-[15px] text-[#6a6a6a]">В этой категории пока нет проектов.</p>
          </div>
        )}
      </div>
      <PortfolioOverviewGrid projects={projects} />
    </>
  );
}
