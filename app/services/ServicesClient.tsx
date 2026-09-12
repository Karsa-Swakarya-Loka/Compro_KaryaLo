"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { portfolioData } from "@/data/portfolio";
import { getWhatsAppUrl } from "@/config/site";
import { ArrowUpRight, Check, Layers, Terminal } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { EASE_EXPO } from "@/components/motion/tokens";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import styles from "./services.module.css";

/*
  Sub-service card. Entry and hover live in one variant tree so `visible`
  doubles as the rest pose, and the card cascades its own checklist through
  `staggerChildren` once it lands.
*/
const subCardVariants = (from: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: from === "left" ? -30 : 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE_EXPO, staggerChildren: 0.05, delayChildren: 0.12 },
  },
});

const subItemVariants: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
  hover: { x: 4, transition: { duration: 0.45, ease: EASE_EXPO } },
};

/** Checkmark pops when the card is hovered; parent drives it by variant name. */
const subCheckVariants: Variants = {
  hidden: { scale: 1 },
  visible: { scale: 1 },
  hover: { scale: [1, 1.4, 1], transition: { duration: 0.5, ease: EASE_EXPO } },
};

const guarantees = [
  {
    icon: Terminal,
    title: "Siap Tumbuh Bareng Bisnis",
    description: "Dibangun dengan teknologi yang sudah teruji dan banyak dipakai, jadi mudah dikembangkan dan dirawat siapa pun.",
  },
  {
    icon: Layers,
    title: "Garansi Setelah Rilis",
    description: "Perbaikan bug tetap kami tangani selama 30–90 hari setelah sistem resmi dipakai.",
  },
];

export default function ServicesClient() {
  return (
    <main id="main-content" tabIndex={-1} className={`${styles.page} flex min-h-screen flex-col bg-porcelain`}>
      {/*
        Hero entrance is CSS (`.enter-up`), not motion: the h1 here is the LCP
        element, and a scroll-reveal would hold it at opacity 0 until hydration.
        --i stages each block.
      */}
      <section className="border-b border-mist-border bg-mist px-4 py-8 md:px-12 md:py-10">
        <div className="mx-auto max-w-[66rem] space-y-5">
          <div className="max-w-3xl space-y-3">
            <h1 className="enter-up font-headline text-[clamp(2.5rem,5.5vw,4.5rem)] font-normal leading-[1.08] tracking-tight text-midnight">
              Tiga Bidang Layanan, <span className="text-accent">Satu Tim yang Sama</span>
            </h1>
            <p style={{ "--i": 1 } as CSSProperties} className="enter-up max-w-2xl font-story text-base leading-relaxed text-mist-ink md:text-lg">
              Software, desain, dan perangkat IoT dikerjakan orang-orang yang sama. Hasilnya nyambung satu sama lain, dan Anda tidak perlu jadi penerjemah antar vendor.
            </p>
          </div>

          <nav aria-label="Pilih layanan" className="flex flex-wrap gap-2">
            {servicesData.map((pillar, index) => (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                style={{ "--i": 2 + index } as CSSProperties}
                className="enter-up section-link"
              >
                {pillar.shortName} <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            ))}
          </nav>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-story text-sm text-mist-ink">
            {["Dikerjakan tim sendiri", "Ada masa garansi"].map((promise, index) => (
              <li
                key={promise}
                style={{ "--i": 5 + index } as CSSProperties}
                className="enter-up flex items-center gap-2"
              >
                <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                {promise}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {servicesData.map((pillar, index) => {
        /* Each pillar enters from the side it actually sits on, so the
           alternating layout reads as one movement rather than two. */
        const reversed = index % 2 === 1;
        const copyFrom = reversed ? "right" : "left";
        const visualFrom = reversed ? "left" : "right";

        /* Case studies already link back here; nothing linked the other way, so a
           buyer reading about a service had no route to the proof. Matched the same
           way the case study page does it — a project's `serviceCode` against this
           pillar's sub-service codes — rather than a second hand-kept list. IoT has
           no published project yet, and the block simply stays absent. */
        const pillarCodes = pillar.subServices.map((sub) => sub.code);
        const proof = portfolioData.filter((project) =>
          project.serviceCode
            .split("//")
            .map((code) => code.trim())
            .some((code) => pillarCodes.includes(code)),
        );

        return (
        <section
          key={pillar.id}
          id={pillar.id}
          aria-labelledby={`${pillar.id}-title`}
          className={`border-b px-4 py-8 md:px-12 md:py-12 ${
            reversed ? "border-mist-border bg-mist" : "border-mist-border/60 bg-porcelain"
          }`}
        >
          <div className="mx-auto max-w-[66rem] space-y-7 md:space-y-8">
            <RevealGroup
              className={`${styles.pillarIntro} ${reversed ? styles.pillarIntroReversed : ""}`}
              stagger={0.12}
            >
              <RevealItem direction={copyFrom} distance={30} className={`${styles.pillarCopy} space-y-4`}>
                <h2 id={`${pillar.id}-title`} className="max-w-2xl font-story text-2xl font-bold leading-tight text-midnight md:text-3xl">
                  {pillar.name}
                </h2>
                <p className="max-w-2xl font-story text-base leading-relaxed text-mist-ink">
                  {pillar.focus}
                </p>
              </RevealItem>
              <RevealItem
                direction={visualFrom}
                distance={30}
                duration={0.75}
                className={`${styles.pillarVisual} relative overflow-hidden rounded-2xl bg-midnight`}
              >
                <Image
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  fill
                  preload={index === 0}
                  sizes="(min-width: 1152px) 615px, (min-width: 1024px) calc(60vw - 77px), (min-width: 768px) calc(100vw - 96px), calc(100vw - 32px)"
                  className="object-cover"
                />
              </RevealItem>
              {/* Both CTAs occupy the one `action` slot, so they stay side by side
                 in every pillar, reversed or not. */}
              <RevealItem direction={copyFrom} distance={20} className={styles.pillarActions}>
                <a
                  href={getWhatsAppUrl(`Halo KaryaLo, kami ingin berdiskusi soal layanan ${pillar.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-midnight px-5 py-3 font-meta text-xs font-bold text-white transition-colors hover:bg-accent-hover sm:w-auto"
                >
                  <span>Diskusikan {pillar.shortName}</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <Link href="/contact" className="section-link">
                  Kirim brief proyek <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </RevealItem>
            </RevealGroup>

            <RevealGroup className="grid gap-5 lg:grid-cols-3 lg:gap-6" stagger={0.1}>
              {pillar.subServices.map((sub) => (
                <motion.article
                  key={sub.code}
                  variants={subCardVariants(visualFrom)}
                  whileHover="hover"
                  data-reveal=""
                  className="flex flex-col border-t border-mist-border pt-4"
                >
                  <h3 className="font-story text-lg font-bold leading-snug text-midnight">
                    {sub.name}
                  </h3>
                  <p className="mt-3 font-story text-sm leading-relaxed text-mist-ink">
                    {sub.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {sub.items.map((item) => (
                      <motion.li key={item} variants={subItemVariants} className="flex items-start gap-2 font-story text-sm leading-relaxed text-mist-ink">
                        <motion.span variants={subCheckVariants} className="mt-1 flex shrink-0">
                          <Check aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
                        </motion.span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </RevealGroup>

            {proof.length > 0 && (
              <RevealGroup className="space-y-3 border-t border-mist-border pt-6" stagger={0.08}>
                <RevealItem direction="none" distance={16}>
                  <h3 className="font-meta text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Contoh proyeknya
                  </h3>
                </RevealItem>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {proof.map((project) => (
                    <RevealItem key={project.slug} direction="none" distance={18}>
                      <Link
                        href={`/works/${project.slug}`}
                        className={`group/proof flex h-full flex-col gap-2 rounded-2xl border border-mist-border p-4 transition-shadow hover:shadow-lg ${
                          reversed ? "bg-porcelain" : "bg-white"
                        }`}
                      >
                        <span className="font-meta text-[11px] font-bold uppercase tracking-wider text-accent">
                          {project.serviceTags.join(" · ")}
                        </span>
                        <span className="font-story text-base font-bold leading-snug text-midnight transition-colors group-hover/proof:text-accent">
                          {project.title}
                        </span>
                        <span className="font-story text-sm leading-relaxed text-mist-ink">
                          {project.summary}
                        </span>
                        <span className="mt-auto inline-flex items-center gap-1 font-meta text-xs font-semibold text-accent">
                          {project.type === "client" ? "Proyek klien" : "Purwarupa internal"} · {project.year}
                          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                        </span>
                      </Link>
                    </RevealItem>
                  ))}
                </div>
              </RevealGroup>
            )}
          </div>
        </section>
        );
      })}

      <section aria-label="Jaminan layanan" className="border-t border-midnight-light bg-midnight px-4 py-8 text-white md:px-12 md:py-10">
        <RevealGroup className="mx-auto grid max-w-[66rem] gap-6 md:grid-cols-2" stagger={0.12}>
          {guarantees.map(({ icon: Icon, title, description }) => (
            <RevealItem key={title} direction="none" scaleFrom={0.94} duration={0.6} className="flex items-start gap-3">
              <Icon aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-mist" />
              <div className="space-y-2">
                <h2 className="font-story text-base font-bold leading-snug text-white">{title}</h2>
                <p className="font-story text-sm leading-relaxed text-midnight-muted">{description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </main>
  );
}
