"use client";

import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { EASE_EXPO } from "@/components/motion/tokens";
import Magnetic from "@/components/motion/Magnetic";
import ArrowSwap from "@/components/motion/ArrowSwap";

/**
 * Headline tokens — one word per token so the curtain reveal can stagger them.
 * Reads as: "Website, Aplikasi, dan Perangkat IoT untuk Bisnis yang Sedang Tumbuh."
 */
const HEADLINE: Array<{ text: string; accent?: boolean }> = [
  { text: "Website," },
  { text: "Aplikasi," },
  { text: "dan" },
  { text: "Perangkat" },
  { text: "IoT" },
  { text: "untuk" },
  { text: "Bisnis" },
  { text: "yang", accent: true },
  { text: "Sedang", accent: true },
  { text: "Tumbuh.", accent: true },
];

/* Index of the first accent word; CSS reads it to time the shimmer. */
const ACCENT_INDEX = HEADLINE.findIndex((word) => word.accent);

const ctaGroupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } },
};

const ctaItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_EXPO } },
};

export default function HeroSection() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <section data-surface="dark" className="group/hero relative isolate overflow-hidden bg-midnight text-white border-b border-midnight pt-24 lg:pt-28">
      {/*
        Centrepiece settle: the photograph eases out of a slight over-scale as
        the page lands, then keeps drifting on a long ambient loop. It scales
        down into place rather than up because a `fill` image below 1 would
        expose the section behind it at the edges. Both moves are CSS (see
        `.hero-canvas` / `.hero-drift`) so the LCP image never waits on React.
      */}
      <div className="hero-canvas pointer-events-none absolute inset-0">
        <div className="hero-drift absolute inset-0 will-change-transform">
          <Image
            src="/images/hero-centerpiece.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-midnight/80 transition-colors duration-500 group-hover/hero:bg-midnight/85 motion-reduce:transition-none"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-12 py-16 md:py-24 space-y-10 md:space-y-12">


        {/* Hero Typography & CTA Area */}
        <div className="max-w-3xl space-y-6 pt-2">

          {/* Legal badge — unmasks left to right, then the dot breathes */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0 round 999px)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0 round 999px)", opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.05 }}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-porcelain/90 border border-white text-midnight font-meta text-[11px] font-semibold uppercase tracking-wider shadow-sm"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-accent"
              animate={reduceMotion ? undefined : { scale: [1, 1.7, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
            />
            <span>PT Karsa Swakarya Loka • NIB: {siteConfig.nib}</span>
          </motion.div>

          {/*
            Signature curtain reveal, driven by CSS rather than by motion.
            This is the LCP element. Running it through React meant the headline
            could not paint until the JS bundle had downloaded, parsed and
            hydrated. As a CSS animation it starts as soon as the stylesheet
            applies, which takes the largest paint off the hydration path
            entirely. The reduced-motion block in globals.css neutralises it.
          */}
          <h1 className="font-headline text-[clamp(2.5rem,5.5vw,4.5rem)] text-white font-normal leading-[1.08] tracking-tight">
            {HEADLINE.map((word, index) => (
              <Fragment key={`${word.text}-${index}`}>
                <span className="hero-word">
                  <span
                    className={`hero-word__inner${word.accent ? " hero-accent text-mist" : ""}`}
                    style={{ "--i": index } as CSSProperties}
                  >
                    {word.text}
                    {word.accent && (
                      /* The sweep's copy of the word rides on `data-text` and is
                         painted by CSS generated content. As a text node it made the
                         headline read "yangyang SedangSedang" to text extractors. */
                      <span
                        className="hero-shimmer"
                        aria-hidden="true"
                        data-text={word.text}
                        style={{ "--i": index - ACCENT_INDEX } as CSSProperties}
                      />
                    )}
                  </span>
                </span>
                {index < HEADLINE.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>

          <div className="overflow-hidden">
            <p className="hero-lede font-story text-mist text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              Kami merancang dan membangun sistem yang dipakai tim Anda setiap hari: web dan aplikasi yang stabil, tampilan yang mudah dimengerti, dan perangkat lapangan yang terpantau dari satu dashboard. Semuanya dikerjakan dari studio kami di Jatisampurna, Kota Bekasi.
            </p>
          </div>

          <motion.div
            variants={ctaGroupVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2"
          >
            <motion.div variants={ctaItemVariants} className="flex sm:inline-flex">
              <Magnetic className="flex w-full sm:w-auto">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-meta w-full px-8 py-4 rounded-full bg-porcelain text-midnight text-xs font-bold uppercase tracking-wider hover:bg-white focus-visible:outline-white transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>Mulai Diskusi Proyek</span>
                  <ArrowSwap />
                </a>
              </Magnetic>
            </motion.div>

            <motion.div variants={ctaItemVariants} className="flex sm:inline-flex">
              <Magnetic className="flex w-full sm:w-auto">
                <Link href="/about"
                  className="font-meta w-full px-8 py-4 rounded-full text-white border border-white/60 text-xs font-bold uppercase tracking-wider hover:bg-white/10 focus-visible:outline-white transition-colors flex items-center justify-center gap-2 group"
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span>Kenali KaryaLo</span>
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
