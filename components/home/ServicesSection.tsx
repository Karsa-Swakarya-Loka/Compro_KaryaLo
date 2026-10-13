"use client";

import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { EASE_EXPO, SPRING_INTERACTIVE } from "@/components/motion/tokens";
import Reveal, { REVEAL_VIEWPORT } from "@/components/motion/Reveal";

/*
  Entry and hover share one variant tree, and `visible` doubles as the rest
  state. That is what lets a card be scroll-revealed and hover-lifted at once:
  hovering out returns it to exactly where the reveal left it, instead of
  fighting a separate `rest` pose. Every child repeats its resting values under
  both `hidden` and `visible` so variant propagation never leaves one
  un-posed — an overlay with no `visible` entry would sit fully opaque.
*/
const cardVariants = (index: number): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO, delay: index * 0.12 } },
  /* The lift stays in motion rather than a Tailwind `hover:-translate-y-*`.
     Tailwind v4 emits the standalone `translate` / `scale` properties, so a
     Tailwind lift would compose with motion's `transform` instead of replacing
     it — the card would travel twice. One owner, spring-driven like the rest. */
  hover: { y: -8, scale: 1.01, transition: SPRING_INTERACTIVE },
});

const imageVariants: Variants = {
  hidden: { scale: 1, rotate: 0 },
  visible: { scale: 1, rotate: 0, transition: { duration: 0.9, ease: EASE_EXPO } },
  hover: { scale: 1.06, rotate: -1.2, transition: { duration: 0.9, ease: EASE_EXPO } },
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
  hover: { opacity: 1, transition: { duration: 0.6, ease: EASE_EXPO } },
};

const codeChipVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 0, y: 10, transition: { duration: 0.4, ease: EASE_EXPO } },
  hover: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO, delay: 0.08 } },
};

const checkRowVariants = (index: number): Variants => ({
  hidden: { x: 0 },
  visible: { x: 0, transition: { duration: 0.45, ease: EASE_EXPO } },
  hover: { x: 3, transition: { duration: 0.5, ease: EASE_EXPO, delay: index * 0.05 } },
});

const checkIconVariants = (index: number): Variants => ({
  hidden: { rotate: 0, scale: 1 },
  visible: { rotate: 0, scale: 1, transition: { duration: 0.3 } },
  hover: {
    rotate: [0, -28, 8, 0],
    scale: [1, 1.32, 0.96, 1],
    transition: { duration: 0.6, ease: EASE_EXPO, delay: index * 0.06 },
  },
});

export default function ServicesSection() {
  return (
    <section className="bg-porcelain py-20 md:py-28 px-4 md:px-12 border-b border-slate-200/80" id="services">
      <div className="max-w-[66rem] mx-auto space-y-16">

        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl text-midnight font-normal">
              Tiga Bidang yang Kami Kerjakan
            </h2>
          </div>
          <p className="font-story text-slate-600 text-sm md:text-base max-w-md leading-relaxed">
            Tiap bidang bisa dipesan sendiri, atau digabung dalam satu proyek kalau sistem Anda membutuhkan ketiganya.
          </p>
        </Reveal>

        {/* 3 Sculptural Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicesData.map((pillar, index) => (
            <motion.article
              key={pillar.id}
              variants={cardVariants(index)}
              initial="hidden"
              whileInView="visible"
              viewport={REVEAL_VIEWPORT}
              whileHover="hover"
              data-reveal=""
              className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200/90 hover:bg-midnight hover:border-midnight-light hover:shadow-2xl hover:shadow-midnight/25 transition-[background-color,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group flex flex-col justify-between space-y-6"
            >
              {/* Image Preview Container — multi-layer depth reveal */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 shadow-sm relative">
                <motion.div variants={imageVariants} className="absolute inset-0 will-change-transform">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  variants={overlayVariants}
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-midnight/45 via-midnight/5 to-transparent pointer-events-none"
                />
                <motion.span
                  variants={codeChipVariants}
                  aria-hidden="true"
                  className="absolute left-3 bottom-3 font-meta text-[10px] font-bold uppercase tracking-[0.2em] text-porcelain bg-midnight/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/15"
                >
                  {pillar.shortName}
                </motion.span>
              </div>

              {/* Text & Content */}
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <span className="font-meta text-xs font-bold text-accent uppercase tracking-wider transition-colors duration-[400ms] group-hover:text-mist">
                    Bidang {pillar.pillarNumber}
                  </span>
                </div>

                <h3 className="font-story text-xl md:text-2xl font-bold text-midnight leading-snug transition-colors duration-[400ms] group-hover:text-white">
                  {pillar.name}
                </h3>

                <p className="font-story text-slate-600 text-sm leading-relaxed transition-colors duration-[400ms] group-hover:text-porcelain/80">
                  {pillar.focus}
                </p>

                {/* Sub-services Pills — cascading precision check */}
                <div className="pt-2 space-y-2 border-t border-slate-200/60 transition-colors duration-[400ms] group-hover:border-white/20">
                  {pillar.subServices.map((sub, index) => (
                    <motion.div
                      key={sub.code}
                      variants={checkRowVariants(index)}
                      className="flex items-start gap-2 text-xs text-slate-700 font-story transition-colors duration-[400ms] group-hover:text-white"
                    >
                      <motion.span variants={checkIconVariants(index)} className="flex shrink-0 mt-0.5 origin-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent transition-[color,transform] duration-[400ms] group-hover:text-white group-hover:scale-110" />
                      </motion.span>
                      <span className="font-medium">{sub.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-4 border-t border-slate-200/60 transition-colors duration-[400ms] group-hover:border-white/20">
                <Link
                  href={`/services#${pillar.id}`}
                  className="min-h-11 font-meta text-xs font-bold uppercase tracking-wider text-midnight group-hover:text-white flex flex-wrap gap-2 items-center justify-between transition-colors duration-[400ms]"
                >
                  <span>Lihat Detail Layanan</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
