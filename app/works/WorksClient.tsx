"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData, type ProjectItem } from "@/data/portfolio";
import { getWhatsAppUrl } from "@/config/site";
import { SPRING_INTERACTIVE } from "@/components/motion/tokens";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import Reveal, { RevealGroup, revealVariants } from "@/components/motion/Reveal";
import ProjectDetails from "./ProjectDetails";
import styles from "./works.module.css";

type Filter = "all" | "client" | "prototype";

const filters: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "Semua proyek", count: portfolioData.length },
  { id: "client", label: "Proyek klien", count: portfolioData.filter((project) => project.type === "client").length },
  { id: "prototype", label: "Purwarupa internal", count: portfolioData.filter((project) => project.type === "prototype").length },
];

export default function WorksClient() {
  const reduceMotion = useReducedMotionSafe();
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const filteredProjects = portfolioData.filter((project) => activeFilter === "all" || project.type === activeFilter);

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          {/* CSS entrance, not motion: the h1 is the LCP element here. */}
          <h1 className="enter-up font-headline text-[clamp(2.5rem,5.5vw,4.5rem)] font-normal leading-[1.08] tracking-tight text-midnight">
            Proyek yang <span className="font-light italic text-accent">Sudah Berjalan</span>
          </h1>
          <p style={{ "--i": 1 } as CSSProperties} className={`${styles.intro} enter-up`}>
            Sistem yang kami bangun untuk klien, ditambah purwarupa internal yang kami pakai untuk menguji pendekatan baru sebelum dipakai di proyek berbayar.
          </p>
          <p style={{ "--i": 2 } as CSSProperties} className={`${styles.intro} enter-up`}>
            Ada {portfolioData.length} proyek di sini: {portfolioData.filter((p) => p.type === "client").length} sistem yang sudah dipakai klien, dan{" "}
            {portfolioData.filter((p) => p.type === "prototype").length} purwarupa internal. Tiap studi kasus menjelaskan masalah yang dihadapi, cara kami menyelesaikannya, dan layanan apa saja yang terlibat. Untuk rincian tiap layanan, lihat{" "}
            <Link href="/services" className="font-semibold text-accent hover:underline">halaman layanan</Link>.
          </p>
        </div>
      </section>

      <section aria-label="Daftar portofolio" className={`${styles.container} ${styles.collection}`}>
        <Reveal distance={16} duration={0.55} className={styles.toolbar}>
          <div role="group" aria-label="Filter portofolio" className={styles.filters}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={activeFilter === filter.id}
                aria-controls="project-results"
                onClick={() => setActiveFilter(filter.id)}
                className={styles.filter}
              >
                {/*
                  One shared pill for all three tabs: because every instance
                  carries the same layoutId, motion treats them as the same
                  element and slides the fill across instead of cross-fading it.
                */}
                {activeFilter === filter.id && (
                  <motion.span
                    layoutId="activeWorksTab"
                    aria-hidden="true"
                    className={styles.filterPill}
                    transition={SPRING_INTERACTIVE}
                  />
                )}
                <span className={styles.filterLabel}>
                  {filter.label} <span className={styles.count}>{filter.count}</span>
                </span>
              </button>
            ))}
          </div>
          <p role="status" aria-live="polite" aria-atomic="true" className={styles.resultCount}>
            {filteredProjects.length} proyek ditampilkan
          </p>
        </Reveal>

        <RevealGroup id="project-results" className={styles.projects} stagger={0.09}>
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={revealVariants({ distance: 26, duration: 0.65 })}
              data-reveal=""
              className={`${styles.project} ${index === 0 ? styles.featured : ""}`}
            >
                <div className={styles.preview}>
                  <Image
                    src={project.coverImage}
                    alt={`Tampilan layar ${project.title} yang dikerjakan untuk ${project.client}`}
                    fill
                    preload={index === 0}
                    sizes={index === 0
                      ? "(min-width: 1152px) 615px, (min-width: 1024px) 56vw, (min-width: 768px) calc(100vw - 96px), calc(100vw - 32px)"
                      : "(min-width: 1152px) 516px, (min-width: 768px) calc(50vw - 60px), calc(100vw - 32px)"}
                    className={styles.cover}
                  />
                </div>
                <div className={styles.projectBody}>
                  <div className={styles.projectMeta}>
                    <span className={`${styles.projectType} ${project.type === "client" ? styles.clientType : ""}`}>
                      {project.type === "client" ? "Proyek klien" : "Purwarupa internal"}
                    </span>
                    <span>{project.categoryLabel}</span>
                    <time dateTime={project.year}>{project.year}</time>
                  </div>
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <p className={styles.summary}>{project.summary}</p>
                  {index === 0 && project.impact && <p className={styles.impact}>{project.impact}</p>}
                  <div className={styles.projectFooter}>
                    {/* Real, crawlable URL for the full case study. */}
                    <Link
                      href={`/works/${project.slug}`}
                      aria-label={`Baca studi kasus ${project.title}`}
                      className={styles.projectLink}
                    >
                      Baca studi kasus <ArrowUpRight aria-hidden="true" size={18} />
                    </Link>
                    {/* The dialog stays as a fast in-page preview on top of that page. */}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      aria-haspopup="dialog"
                      aria-label={`Pratinjau cepat ${project.title}`}
                      className={styles.projectLink}
                    >
                      Pratinjau cepat
                    </button>
                    {project.galleryImages.length > 1 && (
                      <span className={styles.galleryCount}><Images aria-hidden="true" size={16} /> {project.galleryImages.length} tampilan</span>
                    )}
                  </div>
                </div>
            </motion.article>
          ))}
        </RevealGroup>
      </section>

      <section className={styles.consultation}>
        <Reveal distance={28} className={`${styles.container} ${styles.consultationInner}`}>
          <div>
            <h2 className={styles.consultationTitle}>Mau Bahas Rencana Sistem Anda?</h2>
            <p>Kami bantu tinjau kebutuhan datanya, perkiraan beban pemakaian, dan sambungan ke sistem yang sudah berjalan, sebelum kontrak dimulai.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={getWhatsAppUrl("Halo KaryaLo, saya ingin berdiskusi soal rencana sistem kami.")} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}>
              {/* Slow outward pulse — draws the eye without moving the button. */}
              <motion.span
                aria-hidden="true"
                className={styles.actionPulse}
                animate={reduceMotion ? undefined : { boxShadow: ["0 0 0 0 rgba(31, 46, 90, 0.35)", "0 0 0 14px rgba(31, 46, 90, 0)"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", repeatDelay: 0.6 }}
              />
              Mulai diskusi <ArrowUpRight aria-hidden="true" size={18} />
            </a>
            <Link href="/contact" className="section-link">
              Kirim brief proyek <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
      {selectedProject && <ProjectDetails key={selectedProject.id} project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}
