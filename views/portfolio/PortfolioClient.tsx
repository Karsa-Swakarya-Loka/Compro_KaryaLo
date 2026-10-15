"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Images } from "lucide-react";
import { motion } from "motion/react";
import { getPortfolio, type ProjectItem } from "@/data/portfolio";
import { portfolioCopy } from "@/content/portfolio-page";
import { type Locale, localePath } from "@/lib/i18n";
import { SPRING_INTERACTIVE } from "@/components/motion/tokens";
import Reveal, { RevealGroup, revealVariants } from "@/components/motion/Reveal";
import ProjectDetails from "./ProjectDetails";

type Filter = "all" | "client" | "product" | "prototype";

/**
 * The filter pills and the Cargon project grid ("Showcasing Our Expertise"):
 * image-led cards that lift on hover while the screenshot zooms, a white
 * caption panel underneath. The first project of the current filter leads and
 * spans two columns; its image keeps the same height as its neighbours.
 *
 * Each card is one link to its case study (stretched over the card); the quick
 * preview button sits above that link so it stays clickable.
 */
export default function PortfolioClient({ lang }: { lang: Locale }) {
  const copy = portfolioCopy[lang];
  const portfolio = getPortfolio(lang);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const filteredProjects = portfolio.filter((project) => activeFilter === "all" || project.type === activeFilter);

  /* Filtering is on `type` only: every project is either a client system or
     an internal prototype, and the counts beside each pill come from the same
     list, so a pill never promises more than it shows. */
  const clientCount = portfolio.filter((project) => project.type === "client").length;
  const prototypeCount = portfolio.filter((project) => project.type === "prototype").length;
  const productCount = portfolio.filter((project) => project.type === "product").length;
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: copy.index.filters.all, count: portfolio.length },
    { id: "client", label: copy.index.filters.client, count: clientCount },
    ...(productCount ? [{ id: "product" as const, label: copy.index.filters.product, count: productCount }] : []),
    { id: "prototype", label: copy.index.filters.prototype, count: prototypeCount },
  ];

  return (
    <>
      <Reveal distance={20} className="mt-10 mb-10 flex flex-col items-center gap-4">
        <div role="group" aria-label={copy.index.filterLabel} className="flex flex-wrap justify-center gap-2.5">
          {filters.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={active}
                aria-controls="project-results"
                onClick={() => setActiveFilter(filter.id)}
                className={`relative isolate inline-flex min-h-11 items-center gap-2.5 rounded-full px-5 py-2.5 type-label transition-colors duration-300 ${
                  active ? "text-white" : "bg-surface text-ink hover:bg-brand-soft hover:text-brand"
                }`}
              >
                {/*
                  One shared pill for all three buttons: every instance carries
                  the same layoutId, so motion slides the blue fill across
                  instead of cross-fading it.
                */}
                {active && (
                  <motion.span
                    layoutId="activePortfolioFilter"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-brand shadow-[0_12px_24px_-12px_rgb(29_70_157/0.7)]"
                    transition={SPRING_INTERACTIVE}
                  />
                )}
                {filter.label}
                <span className={`rounded-full px-2 py-0.5 type-meta ${active ? "bg-white/20 text-white" : "bg-white text-body"}`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" aria-atomic="true" className="type-small text-body">
          {copy.index.resultCount(filteredProjects.length)}
        </p>
      </Reveal>

      <RevealGroup id="project-results" className="md-orphan-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7" stagger={0.1}>
        {filteredProjects.map((project, index) => {
          const featured = index === 0;
          return (
            <motion.article
              key={project.id}
              variants={revealVariants()}
              data-reveal=""
              className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-line transition-[box-shadow,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-lift focus-within:ring-2 focus-within:ring-brand ${
                featured ? "md:col-span-2" : ""
              }`}
            >
              {/* 8:3 on the double-width card keeps its image as tall as a 4:3 single one. */}
              <div className={`img-zoom relative w-full bg-surface ${featured ? "aspect-[4/3] md:aspect-[8/3]" : "aspect-[4/3]"}`}>
                <Image
                  src={project.coverImage}
                  alt={copy.coverAlt(project.title, project.client)}
                  fill
                  preload={featured}
                  sizes={featured
                    ? "(min-width: 1152px) 760px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 32px)"
                    : "(min-width: 1152px) 370px, (min-width: 768px) calc(50vw - 60px), calc(100vw - 32px)"}
                  className="object-contain p-4"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 type-meta text-ink shadow-sm">
                  <span aria-hidden="true" className={`h-2 w-2 rounded-full ${project.type === "client" ? "bg-brand" : project.type === "product" ? "bg-emerald-500" : "bg-cyan"}`} />
                  {copy.types[project.type]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <p className="type-meta text-body">
                  {project.categoryLabel} · <time dateTime={project.year}>{project.year}</time>
                </p>
                {/* The leading project takes the larger card title. */}
                <h2 className={`mt-2 text-ink transition-colors duration-300 group-hover:text-brand ${featured ? "type-card-title-lg" : "type-card-title"}`}>
                  {project.title}
                </h2>
                <p className="type-body-card text-body mt-3 max-w-[60ch]">{project.summary}</p>
                {project.impact && (
                  <p className="mt-4 flex items-start gap-2.5 max-w-[60ch]">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <span className="type-small text-ink">
                      <span className="font-semibold text-brand">{copy.impact}:</span> {project.impact}
                    </span>
                  </p>
                )}

                <div className="mt-auto pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1 border-t border-line pt-4">
                    {/* Real, crawlable URL for the full case study; its ::after makes the whole card the link. */}
                    <Link
                      href={localePath(lang, `/portfolio/${project.slug}`)}
                      aria-label={copy.readCaseStudyAria(project.title)}
                      className="text-link text-brand after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-none"
                    >
                      {copy.readCaseStudy}
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <div className="flex items-center gap-4">
                      {project.galleryImages.length > 1 && (
                        <span className="inline-flex items-center gap-1.5 type-meta text-body">
                          <Images aria-hidden="true" className="h-4 w-4" /> {copy.index.galleryCount(project.galleryImages.length)}
                        </span>
                      )}
                      {/* The dialog stays as a fast in-page preview, above the stretched link. */}
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        aria-haspopup="dialog"
                        aria-label={copy.index.quickPreviewAria(project.title)}
                        className="relative z-10 text-link text-body hover:text-brand"
                      >
                        {copy.index.quickPreview}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </RevealGroup>

      {selectedProject && (
        <ProjectDetails key={selectedProject.id} lang={lang} project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}

