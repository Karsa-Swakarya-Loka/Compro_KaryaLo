"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Cpu, Layers, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import SpotlightCard from "@/components/motion/SpotlightCard";
import ArrowSwap from "@/components/motion/ArrowSwap";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionSafe();

  // Atmospheric parallax: the studio photo drifts ~7% slower than the page.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <section
      ref={sectionRef}
      data-surface="dark"
      className="relative overflow-hidden group min-h-[580px] md:min-h-[660px] flex items-center py-20 md:py-28 px-4 md:px-12 border-b border-midnight"
    >

      {/* Background Image with Scroll Parallax, Zoom on Hover & Transparent Palette Tint Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute inset-x-0 -inset-y-[9%] will-change-transform">
          <Image
            src="/images/about-studio.webp"
            alt="Studio dan meja kerja tim KaryaLo"
            fill
            sizes="100vw"
            className="object-cover object-center scale-100 group-hover:scale-[1.04] transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        </motion.div>
        {/* Architectural Tint Overlay: Deep Navy to Midnight */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/85 to-accent/60 transition-opacity duration-700" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Storytelling & Headings — unmasks in from the left */}
          <RevealGroup className="lg:col-span-7 space-y-6" stagger={0.12}>
            <RevealItem direction="left">
              <h2 className="font-headline text-4xl md:text-6xl text-porcelain font-normal leading-[1.1] tracking-tight">
                Anda Bicara Langsung dengan yang Mengerjakan.
              </h2>
            </RevealItem>

            <RevealItem direction="left">
              <p className="font-story text-porcelain/80 text-base md:text-lg leading-relaxed max-w-xl">
                KaryaLo adalah studio kecil di Kota Bekasi yang bernaung di bawah PT Karsa Swakarya Loka. Developer, desainer, dan teknisi perangkat kami bekerja di ruangan yang sama, jadi Anda bicara langsung dengan orang yang mengerjakan proyeknya.
              </p>
            </RevealItem>

            {/* Quick Action Links */}
            <RevealItem direction="left" className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/about"
                className="font-meta px-7 py-3.5 rounded-full bg-porcelain text-midnight text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg shadow-black/10 flex items-center gap-2"
              >
                <span>Lihat Profil Studio</span>
                <ArrowSwap className="w-4 h-4 text-accent" />
              </Link>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-meta px-7 py-3.5 rounded-full bg-midnight-light/80 hover:bg-midnight-light border border-midnight-muted/30 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Bicara dengan Tim Teknis
              </a>
            </RevealItem>
          </RevealGroup>

          {/* Right Column: Architectural Pillars & Metrics Cards — cursor spotlight borders */}
          <RevealGroup className="lg:col-span-5 space-y-4" stagger={0.12} delayChildren={0.15}>

            <RevealItem direction="right">
              <SpotlightCard className="group/card p-6 rounded-2xl bg-midnight-light/80 border border-midnight-muted/20 text-white space-y-2 hover:bg-midnight hover:border-mist/40 hover:shadow-xl hover:shadow-midnight/30 hover:-translate-y-1 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/30 border border-accent/40 flex items-center justify-center text-porcelain transition-[background-color,border-color,color,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:bg-white/15 group-hover/card:border-white/30 group-hover/card:text-white group-hover/card:scale-110">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-story text-lg font-bold text-white">Dikerjakan Tim Sendiri</h3>
                    <span className="font-meta text-[11px] text-midnight-muted uppercase transition-colors duration-[400ms] group-hover/card:text-mist">Tanpa dioper ke pihak lain</span>
                  </div>
                </div>
                <p className="font-story text-xs text-midnight-muted leading-relaxed pt-1 transition-colors duration-[400ms] group-hover/card:text-porcelain/85">
                  Kode, rancangan sistem, dan desainnya dikerjakan tim internal kami. Isi repositorinya bisa Anda lihat kapan saja.
                </p>
              </SpotlightCard>
            </RevealItem>

            <RevealItem direction="right">
              <SpotlightCard className="group/card p-6 rounded-2xl bg-midnight-light/80 border border-midnight-muted/20 text-white space-y-2 hover:bg-midnight hover:border-mist/40 hover:shadow-xl hover:shadow-midnight/30 hover:-translate-y-1 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-mist/20 border border-mist/40 flex items-center justify-center text-mist transition-[background-color,border-color,color,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:bg-white/15 group-hover/card:border-white/30 group-hover/card:text-white group-hover/card:scale-110">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-story text-lg font-bold text-white">Ada Bengkel Perangkatnya</h3>
                    <span className="font-meta text-[11px] text-midnight-muted uppercase transition-colors duration-[400ms] group-hover/card:text-mist">Meja uji coba di studio</span>
                  </div>
                </div>
                <p className="font-story text-xs text-midnight-muted leading-relaxed pt-1 transition-colors duration-[400ms] group-hover/card:text-porcelain/85">
                  Kami punya meja kerja untuk merakit dan menguji alat, mulai dari pemasangan sensor sampai uji coba langsung di lokasi.
                </p>
              </SpotlightCard>
            </RevealItem>

            <RevealItem direction="right">
              <SpotlightCard className="group/card p-6 rounded-2xl bg-midnight-light/80 border border-midnight-muted/20 text-white space-y-2 hover:bg-midnight hover:border-mist/40 hover:shadow-xl hover:shadow-midnight/30 hover:-translate-y-1 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-matte0/20 border border-mist/40 flex items-center justify-center text-mist transition-[background-color,border-color,color,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:bg-white/15 group-hover/card:border-white/30 group-hover/card:text-white group-hover/card:scale-110">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-story text-lg font-bold text-white">Berbadan Hukum Jelas</h3>
                    <span className="font-meta text-[11px] text-midnight-muted uppercase transition-colors duration-[400ms] group-hover/card:text-mist">NIB: {siteConfig.nib}</span>
                  </div>
                </div>
                <p className="font-story text-xs text-midnight-muted leading-relaxed pt-1 transition-colors duration-[400ms] group-hover/card:text-porcelain/85">
                  Kerja sama berjalan di bawah PT yang terdaftar resmi, lengkap dengan serah terima hak cipta dan Faktur Pajak.
                </p>
              </SpotlightCard>
            </RevealItem>

          </RevealGroup>

        </div>
      </div>

    </section>
  );
}
