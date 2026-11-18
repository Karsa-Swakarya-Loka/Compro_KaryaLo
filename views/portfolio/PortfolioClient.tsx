"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Expand } from "lucide-react";
import { motion } from "motion/react";
import { getPortfolio, type ProjectItem } from "@/data/portfolio";
import { portfolioCopy } from "@/content/portfolio-page";
import { type Locale, localePath } from "@/lib/i18n";
import { SPRING_INTERACTIVE } from "@/components/motion/tokens";
import { REVEAL_VIEWPORT, revealVariants } from "@/components/motion/Reveal";
import ProjectDetails from "./ProjectDetails";

type Filter = "all" | "client" | "product" | "prototype";

/**
 * The Agenciex projects grid: large rounded tinted cards of mixed sizes on a
 * 12-column grid, the right-hand card of every pair dropped lower so the two
 * columns never line up. The pattern repeats every four cards; DOM order stays
 * the reading order, so keyboard and screen-reader order match what is seen.
 * On phones every card is one 4:3 column.
 */
const LAYOUTS = [
  { span: "md:col-span-7", aspect: "md:aspect-[5/4]", offset: "" },
  { span: "md:col-span-5", aspect: "md:aspect-[4/5]", offset: "md:mt-20" },
  { span: "md:col-span-5", aspect: "md:aspect-square", offset: "" },
  { span: "md:col-span-7", aspect: "md:aspect-[4/3]", offset: "md:mt-20" },
] as const;

const cardLayout = (index: number) => LAYOUTS[index % LAYOUTS.length];

/**
 * One project card: the laptop mockup shown whole on a tinted panel, the type
 * on a small white tag, then the name and a round arrow. The title link is
 * stretched over the whole card; the optional quick-preview button sits above
 * that link so it stays clickable. Each card fades and scales up as it enters.
 */
export function ProjectCard({
  lang,
  project,
  index,
  preload = false,
  onPreview,
}: {
  lang: Locale;
  project: ProjectItem;
  index: number;
  preload?: boolean;
  onPreview?: (project: ProjectItem) => void;
}) {
  const copy = portfolioCopy[lang];
  const layout = cardLayout(index);
  return (
    <motion.article
      variants={revealVariants({ scaleFrom: 0.94, delay: index % 2 ? 0.12 : 0 })}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      data-reveal=""
      className={`group relative col-span-1 self-start ${layout.span} ${layout.offset}`}
    >
      <div className={`relative isolate aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-(--agx-tint) ${layout.aspect}`}>
        <span aria-hidden="true" className="absolute -left-[12%] -top-[8%] -z-10 aspect-square w-[70%] rounded-full bg-(--agx-tint-2)" />
        <Image
          src={project.coverImage}
          alt={copy.coverAlt(project.title, project.client)}
          fill
          preload={preload}
          sizes="(min-width: 1344px) 720px, (min-width: 768px) 58vw, calc(100vw - 40px)"
          className="object-contain p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] md:p-10"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[0.875rem] font-medium leading-none text-ink md:left-5 md:top-5">
          <span aria-hidden="true" className={`h-2 w-2 rounded-full ${project.type === "client" ? "bg-brand" : project.type === "product" ? "bg-emerald-500" : "bg-cyan"}`} />
          {copy.types[project.type]}
        </span>
        {onPreview && (
          <button
            type="button"
            onClick={() => onPreview(project)}
            aria-haspopup="dialog"
            aria-label={copy.index.quickPreviewAria(project.title)}
            title={copy.index.quickPreview}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-colors duration-300 hover:bg-(--agx-ink) hover:text-white focus-visible:bg-(--agx-ink) focus-visible:text-white md:right-5 md:top-5"
          >
            <Expand aria-hidden="true" className="h-[18px] w-[18px]" />
          </button>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="text-sm text-body">
            {project.categoryLabel} · <time dateTime={project.year}>{project.year}</time>
          </p>
          <h3 className="mt-1.5 text-balance text-[clamp(1.375rem,1.1rem+0.9vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-brand">
            {/* Real, crawlable URL; its ::after makes the whole card the link. */}
            <Link
              href={localePath(lang, `/portfolio/${project.slug}`)}
              className="after:absolute after:inset-0 after:rounded-[1.75rem] after:content-[''] focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 max-w-[56ch] text-body">{project.summary}</p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-[rotate,background-color,color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 group-hover:border-(--agx-ink) group-hover:bg-(--agx-ink) group-hover:text-white"
        >
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
      {/* Keyboard focus on the stretched link outlines the whole card. */}
      <span aria-hidden="true" className="pointer-events-none absolute -inset-2 rounded-[2rem] opacity-0 ring-2 ring-brand transition-opacity group-has-[a:focus-visible]:opacity-100" />
    </motion.article>
  );
}

/** The filter pills, the result count, the staggered grid and the quick-preview dialog. */
export default function PortfolioClient({ lang }: { lang: Locale }) {
  const copy = portfolioCopy[lang];
  const portfolio = getPortfolio(lang);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const filteredProjects = portfolio.filter((project) => activeFilter === "all" || project.type === activeFilter);

  /* Filtering is on `type` only; the count beside each pill comes from the
     same list, so a pill never promises more than it shows. */
  const count = (type: ProjectItem["type"]) => portfolio.filter((project) => project.type === type).length;
  const productCount = count("product");
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: copy.index.filters.all, count: portfolio.length },
    { id: "client", label: copy.index.filters.client, count: count("client") },
    ...(productCount ? [{ id: "product" as const, label: copy.index.filters.product, count: productCount }] : []),
    { id: "prototype", label: copy.index.filters.prototype, count: count("prototype") },
  ];

  return (
    <>
      <div className="mt-12 flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label={copy.index.filterLabel} className="flex flex-wrap gap-2.5">
          {filters.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={active}
                aria-controls="project-results"
                onClick={() => setActiveFilter(filter.id)}
                className={`relative isolate inline-flex min-h-11 items-center gap-2.5 rounded-full border px-5 py-2.5 text-[0.9375rem] font-medium transition-colors duration-300 ${
                  active ? "border-transparent text-white" : "border-line bg-white text-ink hover:border-(--agx-ink)"
                }`}
              >
                {/* One shared fill: the same layoutId slides the navy pill across. */}
                {active && (
                  <motion.span
                    layoutId="activePortfolioFilter"
                    aria-hidden="true"
                    className="absolute -inset-px -z-10 rounded-full bg-(--agx-ink)"
                    transition={SPRING_INTERACTIVE}
                  />
                )}
                {filter.label}
                <span className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${active ? "bg-white/20 text-white" : "bg-(--agx-tint) text-body"}`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-body">
          {copy.index.resultCount(filteredProjects.length)}
        </p>
      </div>

      <div key={activeFilter} id="project-results" className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-16 md:grid-cols-12 md:gap-y-14 lg:gap-x-10">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} lang={lang} project={project} index={index} preload={index === 0} onPreview={setSelectedProject} />
        ))}
      </div>

      {selectedProject && (
        <ProjectDetails key={selectedProject.id} lang={lang} project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
