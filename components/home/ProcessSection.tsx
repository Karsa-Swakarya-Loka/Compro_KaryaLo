"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { processSteps } from "@/data/process";
import { CheckCircle2, Terminal } from "lucide-react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { EASE_EXPO } from "@/components/motion/tokens";
import Reveal, { REVEAL_VIEWPORT, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** One node on the kinetic rail: lights accent once scroll progress passes its threshold. */
function RailTick({ progress, threshold, label }: { progress: MotionValue<number>; threshold: number; label: string }) {
  const from = Math.max(0, threshold - 0.05);
  const backgroundColor = useTransform(progress, [from, threshold], ["#C9D6DF", "#1F2E5A"]);
  const scale = useTransform(progress, [from, threshold], [1, 1.4]);
  const labelColor = useTransform(progress, [from, threshold], ["#6B7C99", "#1F2E5A"]);

  return (
    <span className="flex flex-col items-center gap-2.5">
      <motion.span style={{ backgroundColor, scale }} className="block w-2.5 h-2.5 rounded-full ring-4 ring-porcelain" />
      <motion.span style={{ color: labelColor }} className="font-meta text-[10px] font-bold tracking-[0.2em]">
        {label}
      </motion.span>
    </span>
  );
}

export default function ProcessSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.85", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  return (
    <section className="bg-porcelain py-20 md:py-28 px-4 md:px-12 border-b border-slate-200/80" id="process">
      <div className="max-w-[66rem] mx-auto space-y-16">

        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl text-midnight font-normal">
              Lima Tahap Pengerjaan
            </h2>
          </div>
          <p className="font-story text-slate-600 text-sm md:text-base max-w-md leading-relaxed">
            Anda tahu apa yang dikerjakan di tiap tahap, apa hasilnya, dan kapan selesainya. Tidak ada biaya yang muncul mendadak di tengah jalan.
          </p>
        </Reveal>

        {/* Blueprint Visual Callout Banner */}
        <Reveal scaleFrom={0.98} duration={0.8} className="relative rounded-3xl overflow-hidden bg-midnight border border-midnight-light p-6 md:p-10 text-white shadow-xl shadow-midnight/10">
          {/* One-shot border glow: flares as the banner lands, then settles to a faint inset rim. */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-3xl"
            style={{ boxShadow: "inset 0 0 0 1px rgba(201, 214, 223, 0.55), inset 0 0 22px -16px rgba(201, 214, 223, 0.6)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 0.35] }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.1, times: [0, 0.35, 1] }}
          />
          <div className="absolute inset-0 opacity-20 mix-blend-luminosity">
            <Image
              src="/images/process-blueprint.webp"
              alt=""
              sizes="(max-width: 1152px) 100vw, 1056px"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-mist font-meta text-xs font-bold uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5" />
                <span>Rancangan dulu, baru koding</span>
              </div>
              <h3 className="font-story text-xl md:text-2xl font-bold text-porcelain">
                Anda Bisa Mencoba Purwarupanya Sebelum Kami Menulis Kode.
              </h3>
              <p className="font-story text-midnight-muted text-sm md:text-base leading-relaxed">
                Dalam 7–14 hari kerja pertama, Anda sudah bisa mengklik simulasi sistemnya. Kalau ada yang kurang pas, perbaikannya masih murah dan cepat di tahap ini.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center w-full max-w-xs space-y-1">
                <span className="font-meta text-3xl md:text-4xl font-bold text-mist block">100%</span>
                <span className="font-meta text-xs text-porcelain uppercase tracking-wider font-semibold">
                  Source code jadi milik Anda
                </span>
                <p className="font-story text-[11px] text-midnight-muted pt-1">
                  Tanpa biaya lisensi lanjutan dan tanpa terikat ke kami.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div ref={timelineRef} className="space-y-10">
          {/* Kinetic connection rail — fills with scroll, nodes 01–05 light up in sequence */}
          <div className="relative hidden md:block px-2" aria-hidden="true">
            <div className="absolute left-2 right-2 top-[5px] h-px bg-mist-border" />
            <motion.div
              style={{ scaleX: progress, originX: 0 }}
              className="absolute left-2 right-2 top-[5px] h-px bg-accent will-change-transform"
            />
            <div className="relative flex justify-between">
              {processSteps.map((step, index) => (
                <RailTick
                  key={step.step}
                  progress={progress}
                  threshold={0.08 + (index / Math.max(1, processSteps.length - 1)) * 0.84}
                  label={step.step}
                />
              ))}
            </div>
          </div>

          {/*
            5-Step Process Timeline Cards.
            The reveal rides a wrapper rather than the card itself: `.process-card`
            lifts on hover with a CSS transform, and an inline transform left
            behind by motion would outrank that rule and kill the hover.
          */}
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
            {processSteps.map((step, idx) => (
              <RevealItem
                key={step.step}
                distance={28}
                duration={0.65}
                className={idx === 4 ? "md:col-span-2 lg:col-span-1" : undefined}
              >
                <div
                  className={`process-card group h-full rounded-3xl p-7 border flex flex-col justify-between space-y-6 ${
                    idx === 4
                      ? "bg-mist/25 border-mist shadow-sm hover:bg-midnight hover:border-midnight-light hover:shadow-2xl hover:shadow-midnight/25"
                      : "bg-white border-slate-200/90 hover:bg-midnight hover:border-midnight-light hover:shadow-2xl hover:shadow-midnight/25"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 transition-colors duration-[400ms] group-hover:border-white/20">
                      <span className="process-number font-headline text-3xl font-bold text-accent transition-colors duration-[400ms] group-hover:text-white">
                        {step.step}
                      </span>
                      <span className="font-meta text-[11px] font-bold uppercase tracking-wider text-slate-600 transition-colors duration-[400ms] group-hover:text-mist">
                        Tahap
                      </span>
                    </div>

                    <h3 className="font-story text-lg md:text-xl font-bold text-midnight leading-snug transition-colors duration-[400ms] group-hover:text-white">
                      {step.title}
                    </h3>

                    <p className="font-story text-slate-600 text-sm leading-relaxed transition-colors duration-[400ms] group-hover:text-porcelain/80">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverables Box */}
                  <div className="pt-4 border-t border-slate-200/60 space-y-2 transition-colors duration-[400ms] group-hover:border-white/20">
                    <span className="font-meta text-[11px] font-bold text-slate-600 uppercase tracking-wider block transition-colors duration-[400ms] group-hover:text-white/90">
                      Yang Anda terima:
                    </span>
                    <div className="space-y-1.5">
                      {step.deliverables.map((item, i) => (
                        <div
                          key={i}
                          style={{ "--i": i } as CSSProperties}
                          className="process-item flex items-start gap-2 text-xs font-story text-slate-700 transition-colors duration-[400ms] group-hover:text-white/90"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5 transition-colors duration-[400ms] group-hover:text-mist" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

      </div>
    </section>
  );
}
