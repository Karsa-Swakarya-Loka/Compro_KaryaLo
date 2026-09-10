"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getWhatsAppUrl } from "@/config/site";
import { productsData } from "@/data/products";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { EASE_EXPO } from "@/components/motion/tokens";
import Reveal, { RevealGroup } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

/**
 * Mockup column: slides in from its own edge and settles out of a slight
 * perspective tilt, so the browser frame reads as a physical panel turning to
 * face the reader rather than a flat card sliding sideways.
 */
const mockupVariants = (from: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: from === "left" ? -34 : 34, rotateY: from === "left" ? 7 : -7 },
  visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.85, ease: EASE_EXPO } },
});

/** Copy column: enters from the opposite edge, then cascades its feature list. */
const detailVariants = (from: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: from === "left" ? -30 : 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE_EXPO, staggerChildren: 0.06, delayChildren: 0.18 },
  },
});

const featureVariants: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
};

export default function ProductsClient() {
  const [product1, product2, product3] = productsData;

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-porcelain">
      {/* Header Canvas on #C9D6DF */}
      <section className="bg-mist border-b border-mist-border pb-14 md:pb-20 pt-8 md:pt-12 px-4 md:px-12">
        <div className="max-w-[66rem] mx-auto space-y-12">

          {/* CSS entrance, not motion: the h1 is the LCP element on this route. */}
          <div className="max-w-3xl space-y-6 pt-4">
            <h1 className="enter-up font-headline text-[clamp(2.5rem,5.5vw,4.5rem)] text-midnight font-normal leading-[1.08] tracking-tight">
              Platform Siap Pakai <span className="italic font-light text-accent">dari KaryaLo</span>
            </h1>

            <p style={{ "--i": 1 } as CSSProperties} className="enter-up font-story text-mist-ink text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              Selain proyek yang dibangun dari nol, kami juga punya beberapa platform yang sudah jadi. Tinggal disesuaikan dengan brand dan alur kerja Anda, jadi waktu peluncurannya jauh lebih singkat.
            </p>

            {/*
              The site sells both bespoke engineering and licensable platforms.
              Nothing previously explained the difference, which left buyers
              unsure whether to commission or to license.
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <article style={{ "--i": 2 } as CSSProperties} className="enter-up p-5 rounded-2xl bg-porcelain border border-white space-y-2 shadow-sm">
                <h2 className="font-story text-base font-bold text-midnight">Lisensi platform siap pakai</h2>
                <p className="font-story text-sm text-slate-600 leading-relaxed">
                  Cocok kalau kebutuhan Anda tidak jauh dari alur kerja umum dan waktunya mepet. Anda memakai platform yang sudah teruji, lalu kami sesuaikan tampilan, sambungan sistem, dan pengaturannya.
                </p>
              </article>
              <article style={{ "--i": 3 } as CSSProperties} className="enter-up p-5 rounded-2xl bg-porcelain border border-white space-y-2 shadow-sm">
                <h2 className="font-story text-base font-bold text-midnight">Dibangun dari nol</h2>
                <p className="font-story text-sm text-slate-600 leading-relaxed">
                  Cocok kalau proses bisnis Anda punya keunikan sendiri, harus nyambung ke sistem lama, atau Anda ingin memegang seluruh rancangannya sejak awal. Lihat{" "}
                  <Link href="/services" className="font-semibold text-accent hover:underline">tiga bidang layanan</Link> kami.
                </p>
              </article>
            </div>

            <nav aria-label="Pilih platform" style={{ "--i": 4 } as CSSProperties} className="enter-up flex flex-wrap gap-2 pt-2">
              <a href="#karyalo-bi" className="section-link">Analytics <ArrowUpRight aria-hidden="true" size={16} /></a>
              <a href="#karyalo-store" className="section-link">Storefront <ArrowUpRight aria-hidden="true" size={16} /></a>
              <a href="#karyalo-topup" className="section-link">Voucher & Top-Up <ArrowUpRight aria-hidden="true" size={16} /></a>
            </nav>
            <div style={{ "--i": 5 } as CSSProperties} className="enter-up flex flex-wrap items-center gap-3 pt-2">
              <span className="font-meta text-xs font-semibold px-3.5 py-1.5 rounded-full bg-porcelain text-mist-ink shadow-sm">
                Bisa disesuaikan
              </span>
              <span className="font-meta text-xs font-semibold px-3.5 py-1.5 rounded-full bg-porcelain text-mist-ink shadow-sm">
                Pakai brand & server sendiri
              </span>
              <span className="font-meta text-xs font-semibold px-3.5 py-1.5 rounded-full bg-porcelain text-mist-ink shadow-sm">
                Source code bisa jadi milik Anda
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Product 1: Executive Analytics BI on #F7F6F5 */}
      <section id={product1.id} className="py-20 md:py-24 px-4 md:px-12 max-w-6xl mx-auto w-full">
        <RevealGroup className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center hover:border-accent/30 hover:shadow-2xl transition-all duration-300" stagger={0.12}>
          {/* Mockup with Anti-Bleed Dark Frame */}
          <motion.div variants={mockupVariants("left")} style={{ transformPerspective: 1200 }} data-reveal="" className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-300/80 overflow-hidden bg-midnight shadow-xl">
              <div className="h-8 bg-midnight px-3.5 flex items-center justify-between border-b border-midnight-light">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-mist" />
                  <div className="w-2.5 h-2.5 rounded-full bg-mist" />
                  <div className="w-2.5 h-2.5 rounded-full bg-midnight-muted" />
                </div>
                <span className="font-meta text-[11px] text-midnight-muted truncate px-3">
                  {product1.title}
                </span>
                <span className="font-meta text-[11px] text-mist uppercase font-semibold">Pratinjau</span>
              </div>
              {/* Matte Stage: Soft mist-tinted matte prevents light screenshots from washing out */}
              <div className="relative aspect-[16/10] w-full bg-matte p-3 md:p-4">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm border border-slate-300/80 bg-white ring-1 ring-black/5">
                  <Image
                    src={product1.image}
                    alt={`Pratinjau tampilan ${product1.title}, ${product1.category.toLowerCase()}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div variants={detailVariants("right")} data-reveal="" className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h2 className="font-story text-2xl md:text-3xl font-bold text-midnight leading-snug">
                {product1.title}
              </h2>

              <p className="font-story text-sm font-medium text-slate-700">
                {product1.tagline}
              </p>

              <div className="pt-1">
                <span className="font-meta text-[11px] font-semibold text-midnight bg-matte border border-mist-border px-2.5 py-0.5 rounded-full inline-block">
                  {product1.status}
                </span>
              </div>
            </div>

            <p className="font-story text-slate-600 text-sm md:text-base leading-relaxed">
              {product1.summary}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200/60">
              <span className="font-meta text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Fitur utamanya:
              </span>
              <div className="space-y-1.5">
                {product1.features.map((feat, i) => (
                  <motion.div key={i} variants={featureVariants} className="flex items-start gap-2 text-xs font-story text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl(`Halo KaryaLo, kami ingin melihat demo atau menanyakan lisensi untuk ${product1.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-meta px-6 py-3 rounded-full bg-midnight text-white text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-md"
              >
                <span>Minta Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </RevealGroup>
      </section>

      {/* Product 2: SaaS Storefront on Dedicated #C9D6DF Band (50% Rhythm) */}
      <section id={product2.id} className="bg-mist py-20 md:py-24 px-4 md:px-12 border-y border-mist-border">
        <RevealGroup className="max-w-6xl mx-auto rounded-3xl bg-porcelain border border-white p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xl" stagger={0.12}>
          {/* Details Column First (Alternating) */}
          <motion.div variants={detailVariants("left")} data-reveal="" className="lg:col-span-6 space-y-6 lg:order-1">
            <div className="space-y-2">
              <h2 className="font-story text-2xl md:text-3xl font-bold text-midnight leading-snug">
                {product2.title}
              </h2>

              <p className="font-story text-sm font-medium text-slate-700">
                {product2.tagline}
              </p>

              <div className="pt-1">
                <span className="font-meta text-[11px] font-semibold text-midnight bg-matte border border-mist-border px-2.5 py-0.5 rounded-full inline-block">
                  {product2.status}
                </span>
              </div>
            </div>

            <p className="font-story text-slate-600 text-sm md:text-base leading-relaxed">
              {product2.summary}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200/60">
              <span className="font-meta text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Fitur utamanya:
              </span>
              <div className="space-y-1.5">
                {product2.features.map((feat, i) => (
                  <motion.div key={i} variants={featureVariants} className="flex items-start gap-2 text-xs font-story text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl(`Halo KaryaLo, kami ingin melihat demo atau menanyakan lisensi untuk ${product2.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-meta px-6 py-3 rounded-full bg-midnight text-white text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-md"
              >
                <span>Minta Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Mockup with Anti-Bleed Dark Frame (Order 2) */}
          <motion.div variants={mockupVariants("right")} style={{ transformPerspective: 1200 }} data-reveal="" className="lg:col-span-6 lg:order-2">
            <div className="rounded-2xl border border-slate-300/80 overflow-hidden bg-midnight shadow-xl">
              <div className="h-8 bg-midnight px-3.5 flex items-center justify-between border-b border-midnight-light">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-mist" />
                  <div className="w-2.5 h-2.5 rounded-full bg-mist" />
                  <div className="w-2.5 h-2.5 rounded-full bg-midnight-muted" />
                </div>
                <span className="font-meta text-[11px] text-midnight-muted truncate px-3">
                  {product2.title}
                </span>
                <span className="font-meta text-[11px] text-mist uppercase font-semibold">Pratinjau</span>
              </div>
              {/* Matte Stage: Soft mist-tinted matte prevents light screenshots from washing out */}
              <div className="relative aspect-[16/10] w-full bg-matte p-3 md:p-4">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm border border-slate-300/80 bg-white ring-1 ring-black/5">
                  <Image
                    src={product2.image}
                    alt={`Pratinjau tampilan ${product2.title}, ${product2.category.toLowerCase()}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </RevealGroup>
      </section>

      {/* Product 3: Top-Up Engine on #F7F6F5 */}
      <section id={product3.id} className="py-20 md:py-24 px-4 md:px-12 max-w-6xl mx-auto w-full">
        <RevealGroup className="rounded-3xl bg-white border border-slate-200/90 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center hover:border-accent/30 hover:shadow-2xl transition-all duration-300" stagger={0.12}>
          {/* Mockup with Anti-Bleed Dark Frame */}
          <motion.div variants={mockupVariants("left")} style={{ transformPerspective: 1200 }} data-reveal="" className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-300/80 overflow-hidden bg-midnight shadow-xl">
              <div className="h-8 bg-midnight px-3.5 flex items-center justify-between border-b border-midnight-light">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-mist" />
                  <div className="w-2.5 h-2.5 rounded-full bg-mist" />
                  <div className="w-2.5 h-2.5 rounded-full bg-midnight-muted" />
                </div>
                <span className="font-meta text-[11px] text-midnight-muted truncate px-3">
                  {product3.title}
                </span>
                <span className="font-meta text-[11px] text-mist uppercase font-semibold">Pratinjau</span>
              </div>
              {/* Matte Stage: Soft mist-tinted matte prevents light screenshots from washing out */}
              <div className="relative aspect-[16/10] w-full bg-matte p-3 md:p-4">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm border border-slate-300/80 bg-white ring-1 ring-black/5">
                  <Image
                    src={product3.image}
                    alt={`Pratinjau tampilan ${product3.title}, ${product3.category.toLowerCase()}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div variants={detailVariants("right")} data-reveal="" className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h2 className="font-story text-2xl md:text-3xl font-bold text-midnight leading-snug">
                {product3.title}
              </h2>

              <p className="font-story text-sm font-medium text-slate-700">
                {product3.tagline}
              </p>

              <div className="pt-1">
                <span className="font-meta text-[11px] font-semibold text-midnight bg-matte border border-mist-border px-2.5 py-0.5 rounded-full inline-block">
                  {product3.status}
                </span>
              </div>
            </div>

            <p className="font-story text-slate-600 text-sm md:text-base leading-relaxed">
              {product3.summary}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200/60">
              <span className="font-meta text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Fitur utamanya:
              </span>
              <div className="space-y-1.5">
                {product3.features.map((feat, i) => (
                  <motion.div key={i} variants={featureVariants} className="flex items-start gap-2 text-xs font-story text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl(`Halo KaryaLo, kami ingin melihat demo atau menanyakan lisensi untuk ${product3.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-meta px-6 py-3 rounded-full bg-midnight text-white text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-md"
              >
                <span>Minta Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </RevealGroup>
      </section>

      {/* Enterprise Licensing & Customization Callout on #1F2E5A */}
      <section className="bg-midnight py-20 px-4 md:px-12 border-t border-midnight-light text-white">
        <Reveal scaleFrom={0.98} distance={28} duration={0.8} className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <h3 className="font-story text-3xl md:text-4xl font-bold text-white leading-tight">
              Mau Menjalankan Platform Ini dengan Nama Perusahaan Anda?
            </h3>
            <p className="font-story text-midnight-muted text-base leading-relaxed">
              Platform ini bisa dipakai dengan nama dan tampilan perusahaan Anda, dipasang di server sendiri, dan disesuaikan dengan alur kerja yang sudah berjalan.
            </p>
          </div>
          <Magnetic className="flex shrink-0">
            <a
              href={getWhatsAppUrl(`Halo KaryaLo, kami ingin menanyakan opsi lisensi platform`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-meta px-8 py-4 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors shadow-xl flex items-center gap-2 shrink-0"
            >
              <span>Tanya Soal Lisensi</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </Reveal>
      </section>
    </main>
  );
}
