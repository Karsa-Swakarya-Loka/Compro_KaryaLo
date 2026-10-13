"use client";

import Image from "next/image";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { Building2, FileCheck, FileSpreadsheet, Lock, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export default function TrustSection() {
  const reduceMotion = useReducedMotionSafe();

  const trustCards = [
    {
      icon: Building2,
      badge: "KEMENTERIAN HUKUM RI",
      title: "PT Karsa Swakarya Loka",
      detail: `SK: ${siteConfig.skAhu}`,
      description: "Badan hukum yang disahkan Kementerian Hukum RI pada 30 Mei 2026, jadi kerja samanya diikat kontrak perusahaan, bukan kesepakatan personal."
    },
    {
      icon: FileCheck,
      badge: "SISTEM OSS",
      title: "NIB: 3005260047228",
      detail: `KBLI: ${siteConfig.kbli}`,
      description: "Izin usaha aktif dan tercatat di sistem OSS pemerintah, dengan bidang usaha pemrograman komputer."
    },
    {
      icon: FileSpreadsheet,
      badge: "ADMINISTRASI",
      title: "Invoice Resmi & Rekening Perusahaan",
      detail: "Belum PKP: tagihan tanpa PPN",
      description: "Setiap termin ditagih lewat invoice resmi atas nama PT, dan pembayaran masuk ke rekening perusahaan, bukan rekening pribadi."
    },
    {
      icon: Lock,
      badge: "KERAHASIAAN",
      title: "Perjanjian Kerahasiaan",
      detail: "NDA sebelum diskusi teknis",
      description: "Dokumen, data, dan rencana bisnis yang Anda bagikan kami perlakukan sebagai informasi rahasia, diikat NDA resmi."
    }
  ];

  return (
    <section className="bg-mist py-20 md:py-28 px-4 md:px-12 border-b border-mist-border" id="trust">
      <div className="max-w-[66rem] mx-auto space-y-16">
        
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-mist-border pb-8">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl text-midnight font-normal">
              Legalitas yang Bisa Dicek
            </h2>
          </div>
          <p className="font-story text-mist-ink text-sm md:text-base max-w-md leading-relaxed">
            Dokumen yang biasanya diminta tim pengadaan dan legal sudah kami siapkan dari awal.
          </p>
        </Reveal>

        {/*
          4 Trust Cards Grid — each card pops in from 95%.
          The scale rides a wrapper because the card itself carries
          `transition-all`, and a CSS transition on `transform` would smear
          every frame motion writes.
        */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {trustCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <RevealItem key={card.badge} direction="none" scaleFrom={0.95} duration={0.55}>
                <div
                  className="group bg-porcelain rounded-3xl p-6 md:p-7 border border-white shadow-xl shadow-midnight/5 hover:bg-midnight hover:border-midnight-light hover:shadow-2xl hover:shadow-midnight/25 hover:-translate-y-2 hover:scale-[1.01] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] h-full flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-mist/30 border border-mist-border/60 flex items-center justify-center text-midnight transition-[background-color,border-color,color,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-white/10 group-hover:border-white/25 group-hover:text-mist group-hover:rotate-3 group-hover:scale-110">
                        <Icon className="w-5 h-5" />
                      </div>
                      {/* `ring` rather than `border` so the hover outline costs no layout. */}
                      <span className="font-meta text-[11px] font-bold uppercase tracking-wider text-mist-ink bg-slate-100 px-2 py-0.5 rounded-full ring-1 ring-transparent transition-[background-color,color,box-shadow] duration-[400ms] group-hover:bg-white/10 group-hover:text-porcelain group-hover:ring-white/20">
                        {card.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-story text-lg md:text-xl font-bold text-midnight leading-snug transition-colors duration-[400ms] group-hover:text-white">
                        {card.title}
                      </h3>
                      <p className="font-meta text-xs font-bold text-accent transition-colors duration-[400ms] group-hover:text-mist">
                        {card.detail}
                      </p>
                    </div>

                    <p className="font-story text-mist-ink text-xs md:text-sm leading-relaxed transition-colors duration-[400ms] group-hover:text-porcelain/80">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-mist-ink font-meta text-[11px] font-medium transition-colors duration-[400ms] group-hover:border-white/15 group-hover:text-porcelain/80">
                    <ShieldCheck className="w-3.5 h-3.5 text-midnight transition-colors duration-[400ms] group-hover:text-mist" />
                    <span>Terdaftar & aktif</span>
                    {/* Live status tell — the four dots breathe out of phase. */}
                    <motion.span
                      aria-hidden="true"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-accent transition-colors duration-[400ms] group-hover:bg-mist"
                      animate={reduceMotion ? undefined : { scale: [1, 1.7, 1], opacity: [1, 0.45, 1] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.28 }}
                    />
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Legal Badge Banner */}
        {/* The lift is safe on a motion-driven element here: Tailwind v4's
           `translate` is its own property, so it stacks with the `transform`
           Reveal leaves behind instead of being overridden by it. */}
        <Reveal distance={28} duration={0.7} className="group bg-porcelain rounded-3xl p-6 md:p-8 border border-white shadow-xl shadow-midnight/5 hover:bg-midnight hover:border-midnight-light hover:shadow-2xl hover:shadow-midnight/25 hover:-translate-y-1 transition-[background-color,border-color,box-shadow,translate] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 transition-colors duration-[400ms] group-hover:border-white/20">
              <Image
                src="/images/legal-trust.webp"
                alt=""
                sizes="64px"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-story text-lg md:text-xl font-bold text-midnight transition-colors duration-[400ms] group-hover:text-white">
                Butuh Dokumen Legal untuk Pendaftaran Vendor?
              </h3>
              <p className="font-story text-mist-ink text-xs md:text-sm mt-0.5 transition-colors duration-[400ms] group-hover:text-porcelain/80">
                Kami kirimkan salinan SK Kementerian Hukum, NPWP, NIB, dan company profile dalam bentuk PDF.
              </p>
            </div>
          </div>
          <a
            href={getWhatsAppUrl(`Halo KaryaLo, kami butuh dokumen legal dan NIB PT Karsa Swakarya Loka untuk proses pendaftaran vendor.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary shrink-0 group-hover:bg-porcelain group-hover:text-midnight"
          >
            Minta dokumen legal
          </a>
        </Reveal>

      </div>
    </section>
  );
}
