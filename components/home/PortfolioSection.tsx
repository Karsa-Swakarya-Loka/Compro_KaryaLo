"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioData, ProjectItem } from "@/data/portfolio";
import ProjectModal from "@/components/portfolio/ProjectModal";
import { ArrowRight, ArrowUpRight, CheckCircle2, Globe } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { SPRING_INTERACTIVE } from "@/components/motion/tokens";
import Magnetic from "@/components/motion/Magnetic";
import ArrowSwap from "@/components/motion/ArrowSwap";
import BrowserGlare from "@/components/motion/BrowserGlare";
import Reveal, { REVEAL_VIEWPORT, RevealGroup, RevealItem, revealVariants } from "@/components/motion/Reveal";

/*
  Both card lifts live in motion rather than a Tailwind `hover:-translate-y-*`.
  Tailwind v4 emits the standalone `translate` / `scale` properties, which
  compose with the inline `transform` motion writes rather than replacing it, so
  declaring the lift in both places would move the card twice. Motion owns it
  here, which also keeps the spring consistent with the other cards.
*/
const featuredCardVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
  hover: { y: -6, transition: SPRING_INTERACTIVE },
};

const secondaryCardVariants: Variants = {
  ...revealVariants({ distance: 28, duration: 0.7 }),
  hover: { y: -8, scale: 1.01, transition: SPRING_INTERACTIVE },
};

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const alinaProject = portfolioData.find((p) => p.id === "alina-omnichannel") || portfolioData[0];
  const secondaryProjects = portfolioData.filter((p) => p.id === "hij-corporate-web" || p.id === "karyalo-executive-bi");

  return (
    <section className="bg-mist py-20 md:py-28 px-4 md:px-12 border-b border-mist-border" id="portfolio">
      <div className="max-w-[66rem] mx-auto space-y-16">

        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-mist-border pb-8">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl text-midnight font-normal">
              Yang Sudah Kami Kerjakan
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-story text-mist-ink text-sm md:text-base max-w-sm leading-relaxed">
              Mulai dari toko online yang tersambung ke gudang, sampai dashboard laporan untuk manajemen.
            </p>
            <Link
              href="/works"
              className="btn btn-secondary shrink-0 self-start sm:self-auto group"
            >
              <span>Semua portofolio</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/*
          Featured Case Study: Alina Retail (Heroic Layout) — copy and mockup
          converge from opposite edges.
          The group is named: the trigger button inside carries a plain `group`
          for its ArrowSwap, and an unnamed group here would fire that arrow
          whenever the card itself was hovered.
        */}
        <motion.div
          className="group/feature bg-porcelain rounded-3xl p-6 md:p-10 border border-white shadow-xl shadow-midnight/5 hover:bg-midnight hover:border-midnight-light hover:shadow-2xl hover:shadow-midnight/25 transition-[background-color,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          variants={featuredCardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={REVEAL_VIEWPORT}
        >
          {/* Left: Metadata & Narrative */}
          <RevealItem direction="left" className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-matte text-midnight border border-mist-border font-meta text-[11px] font-bold uppercase tracking-wider transition-colors duration-[400ms] group-hover/feature:bg-white/10 group-hover/feature:text-porcelain group-hover/feature:border-white/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-matte0 "></span>
                  Klien aktif • 2025
                </span>
                <span className="font-meta text-xs font-bold text-accent uppercase tracking-wider transition-colors duration-[400ms] group-hover/feature:text-mist">
                  {alinaProject.serviceTags.join(" · ")}
                </span>
              </div>
              <h3 className="font-story text-2xl md:text-3xl font-bold text-midnight leading-snug transition-colors duration-[400ms] group-hover/feature:text-white">
                {alinaProject.title}
              </h3>
            </div>

            <p className="font-story text-slate-600 text-sm md:text-base leading-relaxed transition-colors duration-[400ms] group-hover/feature:text-porcelain/80">
              {alinaProject.summary}
            </p>

            {/* Impact Metric Banner */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3 transition-colors duration-[400ms] group-hover/feature:bg-white/10 group-hover/feature:border-white/20">
              <CheckCircle2 className="w-5 h-5 text-midnight shrink-0 mt-0.5 transition-colors duration-[400ms] group-hover/feature:text-mist" />
              <div>
                <span className="font-meta text-[11px] font-bold text-slate-600 uppercase tracking-wider transition-colors duration-[400ms] group-hover/feature:text-mist">
                  Hasilnya
                </span>
                <p className="font-story text-xs md:text-sm text-slate-800 font-medium mt-0.5 transition-colors duration-[400ms] group-hover/feature:text-porcelain">
                  {alinaProject.impact}
                </p>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5">
              {alinaProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-meta px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold ring-1 ring-transparent transition-[background-color,color,box-shadow] duration-[400ms] group-hover/feature:bg-white/10 group-hover/feature:text-porcelain group-hover/feature:ring-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Trigger Button */}
            <Magnetic className="inline-flex">
              <button
                onClick={() => setSelectedProject(alinaProject)}
                className="btn btn-primary cursor-pointer group group-hover/feature:bg-porcelain group-hover/feature:text-midnight"
              >
                <span>Lihat studi kasus Alina</span>
                <ArrowSwap />
              </button>
            </Magnetic>
          </RevealItem>

          {/* Right: Anti-Bleed macOS Browser Frame with Matte Stage */}
          <RevealItem direction="right" scaleFrom={0.96} duration={0.75} className="lg:col-span-7">
            <div
              className="glare-host rounded-2xl border border-slate-300/80 overflow-hidden bg-midnight shadow-xl group/mockup ring-0 ring-white/0 transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 group-hover/feature:ring-2 group-hover/feature:ring-white/20"
            >
              <BrowserGlare />
              {/* Browser Window Bar */}
              <div className="h-9 bg-midnight px-4 flex items-center justify-between border-b border-midnight-light">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-mist" />
                  <div className="w-2.5 h-2.5 rounded-full bg-mist" />
                  <div className="w-2.5 h-2.5 rounded-full bg-midnight-muted" />
                </div>
                <div className="flex items-center gap-1.5 px-4 py-1 rounded-md bg-[#16234A] text-[11px] font-mono text-midnight-muted border border-[#2C4076]">
                  <Globe className="w-3 h-3 text-mist" />
                  <span>Alina Fashion & Retail</span>
                </div>
                <span className="font-meta text-[11px] text-mist font-bold uppercase tracking-wider">Pratinjau</span>
              </div>

              {/* Inside Browser: Matte Stage + Screenshot */}
              <div className="relative aspect-[16/10] w-full bg-matte p-3 md:p-4">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm border border-slate-300/80 bg-white ring-1 ring-black/5">
                  <Image
                    src={alinaProject.coverImage}
                    alt={`Tampilan layar ${alinaProject.title} yang dikerjakan untuk ${alinaProject.client}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-contain p-2 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mockup:scale-[1.025]"
                  />
                </div>
              </div>
            </div>
          </RevealItem>
        </motion.div>

        {/* Secondary Case Studies Grid (2 Cards) */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-8" stagger={0.14}>
          {secondaryProjects.map((project) => (
            <motion.article
              key={project.id}
              variants={secondaryCardVariants}
              whileHover="hover"
              data-reveal=""
              className="bg-porcelain rounded-3xl p-6 border border-white shadow-xl shadow-midnight/5 hover:bg-midnight hover:border-midnight-light hover:shadow-2xl hover:shadow-midnight/25 transition-[background-color,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] project-card relative group flex flex-col justify-between space-y-6"
            >
              {/* Browser Window Frame for Screenshot */}
              <div className="glare-host rounded-2xl border border-slate-300/80 overflow-hidden bg-midnight shadow-md">
                <BrowserGlare />
                <div className="h-8 bg-midnight px-3 flex items-center justify-between border-b border-midnight-light">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-mist" />
                    <div className="w-2 h-2 rounded-full bg-mist" />
                    <div className="w-2 h-2 rounded-full bg-midnight-muted" />
                  </div>
                  <span className="font-meta text-[11px] text-midnight-muted truncate px-3">
                    {project.client}
                  </span>
                  <span className="font-meta text-[11px] text-mist uppercase font-semibold">Pratinjau</span>
                </div>
                {/* Matte Stage */}
                <div className="relative aspect-[16/10] w-full bg-matte p-2.5">
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xs border border-slate-300/80 bg-white ring-1 ring-black/5">
                    <Image
                      src={project.coverImage}
                      alt={`Tampilan layar ${project.title} yang dikerjakan untuk ${project.client}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </div>
                </div>
              </div>

              {/* Information */}
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <span className="font-meta text-xs font-bold text-accent uppercase tracking-wider transition-colors duration-[400ms] group-hover:text-mist">
                    {project.serviceTags.join(" · ")}
                  </span>
                  <span className="font-meta text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full ring-1 ring-transparent transition-[background-color,color,box-shadow] duration-[400ms] group-hover:bg-white/10 group-hover:text-porcelain group-hover:ring-white/20">
                    {project.type === "client" ? "Proyek klien" : "Purwarupa internal"}
                  </span>
                </div>

                <h3 className="font-story text-xl font-bold text-midnight leading-snug group-hover:text-white transition-colors duration-[400ms]">
                  {project.title}
                </h3>

                <p className="font-story text-slate-600 text-sm leading-relaxed transition-colors duration-[400ms] group-hover:text-porcelain/80">
                  {project.summary}
                </p>

                {project.impact && (
                  <p className="flex items-start gap-2 font-story text-sm text-slate-800 font-medium leading-snug transition-colors duration-[400ms] group-hover:text-porcelain">
                    <CheckCircle2 aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-midnight transition-colors duration-[400ms] group-hover:text-mist" />
                    <span><span className="sr-only">Hasilnya: </span>{project.impact}</span>
                  </p>
                )}
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between transition-colors duration-[400ms] group-hover:border-white/15">
                <button type="button" onClick={() => setSelectedProject(project)} aria-haspopup="dialog" aria-label={`Lihat studi kasus ${project.title}`} className="stretched-link font-meta text-xs font-bold text-accent transition-colors duration-[400ms] group-hover:text-mist">Lihat studi kasus</button>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-mist transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </motion.article>
          ))}
        </RevealGroup>

      </div>

      {/* Interactive Modal Lightbox */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </section>
  );
}
