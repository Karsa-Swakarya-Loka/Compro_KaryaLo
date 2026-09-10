"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import Magnetic from "@/components/motion/Magnetic";
import ArrowSwap from "@/components/motion/ArrowSwap";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export default function ContactCTA() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <section className="bg-mist py-20 md:py-28 px-4 md:px-12 border-b border-mist-border">
      <div className="max-w-6xl mx-auto">

        {/* Main CTA Canvas */}
        <Reveal scaleFrom={0.98} duration={0.8} distance={28} className="rounded-3xl bg-midnight border border-midnight-light p-6 sm:p-8 md:p-16 text-white shadow-2xl shadow-midnight/20 relative overflow-hidden">
          {/* Pulsing Ambient Halo — two glows breathe and drift on an 8s cycle */}
          <motion.div
            aria-hidden="true"
            className="absolute -right-24 -top-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none will-change-transform"
            animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.4, 0.65, 0.4], x: [0, -18, 0], y: [0, 14, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -left-24 -bottom-24 w-96 h-96 bg-mist/15 rounded-full blur-3xl pointer-events-none will-change-transform"
            animate={reduceMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4], x: [0, 16, 0], y: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Narrative */}
            <RevealGroup className="lg:col-span-7 space-y-6" stagger={0.1} delayChildren={0.15}>
              <RevealItem>
                <h2 className="font-headline text-4xl md:text-6xl text-porcelain font-normal leading-[1.1] tracking-tight">
                  Ceritakan Kebutuhan Anda, Kami Bantu Petakan.
                </h2>
              </RevealItem>

              <RevealItem>
                <p className="font-story text-midnight-muted text-base md:text-lg leading-relaxed max-w-xl">
                  Mau bikin sistem baru, merapikan yang sudah ada, atau memasang perangkat pemantau? Ceritakan saja dulu. Kami beri masukan awal dan perkiraan ruang lingkupnya tanpa keharusan lanjut.
                </p>
              </RevealItem>

              {/* Action Buttons */}
              <RevealItem className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2">
                <Magnetic className="flex sm:inline-flex w-full sm:w-auto">
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-meta w-full px-8 py-4 rounded-full bg-mist text-midnight text-xs font-bold uppercase tracking-wider hover:bg-mist-border transition-all shadow-lg shadow-midnight/25 flex items-center justify-center gap-2 group"
                  >
                    <span>Mulai Diskusi via WhatsApp</span>
                    <ArrowSwap />
                  </a>
                </Magnetic>

                <Link href="/about"
                  className="group font-meta px-8 py-4 rounded-full bg-midnight-light/80 hover:bg-midnight-light border border-midnight-muted/30 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowUpRight className="w-4 h-4 text-mist transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span>Kenali KaryaLo</span>
                </Link>
              </RevealItem>
            </RevealGroup>

            {/* Right Information Card */}
            <RevealItem direction="right" delay={0.1} className="lg:col-span-5">
              <div className="rounded-2xl bg-midnight-light/80 border border-midnight-muted/20 p-6 md:p-8 space-y-6">
                <div>
                  <span className="font-meta text-xs font-bold uppercase tracking-wider text-mist block">
                    Kantor & Studio
                  </span>
                  <h3 className="font-story text-xl md:text-2xl font-bold text-white mt-1">
                    PT Karsa Swakarya Loka
                  </h3>
                </div>

                <div className="space-y-4 text-xs md:text-sm font-story text-porcelain/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-mist shrink-0 mt-1" />
                    <span>{siteConfig.address}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-mist shrink-0" />
                    <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                      {siteConfig.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-mist shrink-0" />
                    <a href={`tel:${siteConfig.phone.replace(/[^+0-9]/g, "")}`} className="hover:text-white">{siteConfig.phone}</a>
                  </div>
                </div>

                <div className="pt-4 border-t border-midnight-muted/20 flex flex-wrap gap-3 items-center justify-between font-meta text-[11px] text-midnight-muted">
                  <span>NIB: {siteConfig.nib}</span>
                  <span className="text-mist font-semibold">Senin - Jumat (09:00 - 18:00)</span>
                </div>
              </div>
            </RevealItem>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
