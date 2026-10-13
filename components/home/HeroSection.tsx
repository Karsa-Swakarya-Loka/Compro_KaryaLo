"use client";

import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, FileCode2, MousePointerClick, ShieldCheck } from "lucide-react";
import { motion, type Variants } from "motion/react";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import { EASE_EXPO } from "@/components/motion/tokens";
import Magnetic from "@/components/motion/Magnetic";
import ArrowSwap from "@/components/motion/ArrowSwap";

/**
 * Headline tokens — one word per token so the curtain reveal can stagger them.
 * Reads as: "Software, Desain & IoT dalam Satu Tim." Short enough to take in at a glance;
 * the lede below says what gets built.
 */
const HEADLINE: Array<{ text: string; accent?: boolean }> = [
  { text: "Software," },
  { text: "Desain" },
  { text: "&" },
  { text: "IoT" },
  { text: "dalam", accent: true },
  { text: "Satu", accent: true },
  { text: "Tim.", accent: true },
];

/** Commitments a visitor can hold us to, taken from the process and FAQ — not vanity metrics. */
const PROOF = [
  { icon: MousePointerClick, text: "Purwarupa bisa diklik dalam 7–14 hari kerja" },
  { icon: FileCode2, text: "Source code jadi milik Anda setelah serah terima" },
  { icon: ShieldCheck, text: "Kontrak resmi atas nama PT: SPK, NDA, dan BAST" },
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
          <h1 className="font-headline text-[clamp(2.75rem,6.5vw,5.25rem)] text-white font-normal leading-[1.04] tracking-tight">
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
              Kami merancang dan membangun website, aplikasi, dan perangkat pemantau yang dipakai tim Anda setiap hari, dari rancangan pertama sampai serah terima. Tanpa perlu mengoordinasi tiga vendor yang saling menunggu.
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
                  className="btn btn-lg btn-primary-light w-full group"
                >
                  <span>Diskusi via WhatsApp</span>
                  <ArrowSwap />
                </a>
              </Magnetic>
            </motion.div>

            <motion.div variants={ctaItemVariants} className="flex sm:inline-flex">
              <Magnetic className="flex w-full sm:w-auto">
                <Link href="/works"
                  className="btn btn-lg btn-secondary-light w-full group"
                >
                  <span>Lihat hasil kerja</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.ul
            variants={ctaGroupVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 border-t border-white/15 pt-6 max-w-3xl"
          >
            {PROOF.map(({ icon: Icon, text }) => (
              <motion.li key={text} variants={ctaItemVariants} className="flex items-start gap-2.5 font-story text-sm leading-snug text-porcelain/85">
                <Icon aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-mist" />
                <span>{text}</span>
              </motion.li>
            ))}
          </motion.ul>

        </div>

      </div>
    </section>
  );
}
