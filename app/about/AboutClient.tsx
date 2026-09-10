"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { processSteps } from "@/data/process";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, Building2, Layers, MapPin, ShieldCheck, Users } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { EASE_EXPO, SPRING_INTERACTIVE } from "@/components/motion/tokens";
import Reveal, { RevealGroup, RevealItem, revealVariants } from "@/components/motion/Reveal";

/* Entry and hover in one tree, `visible` doubling as the rest pose. */
const principleCardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
  hover: { y: -4, transition: SPRING_INTERACTIVE },
};

/** Icon tile bounces when its card is hovered; the card drives it by name. */
const principleIconVariants: Variants = {
  hidden: { scale: 1, rotate: 0 },
  visible: { scale: 1, rotate: 0 },
  hover: {
    scale: [1, 1.18, 0.97, 1],
    rotate: [0, -8, 4, 0],
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
};

/* Lifted out of the markup so the grid can stagger them by index. */
const principles = [
  { icon: Users, title: "Dikerjakan Tim Sendiri", description: "Proyek Anda tidak dioper diam-diam ke pihak lain. Anda bicara langsung dengan developer dan desainer yang mengerjakannya." },
  { icon: ShieldCheck, title: "Hasil Kerja Jadi Milik Anda", description: "Source code, file desain Figma, dan dokumentasinya kami serahkan seluruhnya begitu dokumen serah terima ditandatangani." },
  { icon: Layers, title: "Progres Terlihat Tiap Minggu", description: "Setiap satu target mingguan selesai, Anda dapat akses ke server uji coba untuk mencoba sendiri fitur yang baru jadi. Tidak ada yang kami sembunyikan." },
  { icon: Building2, title: "Terikat Kontrak yang Jelas", description: "Semua kerja sama diikat SPK dan NDA resmi atas nama PT Karsa Swakarya Loka, lengkap dengan penerbitan e-Faktur Pajak." },
];

export default function AboutClient() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-porcelain">
      {/* Header Canvas on #C9D6DF */}
      <section className="bg-mist border-b border-mist-border pb-14 md:pb-20 pt-8 md:pt-12 px-4 md:px-12">
        <div className="max-w-[66rem] mx-auto space-y-12">

          {/* CSS entrance, not motion: the h1 is the LCP element on this route. */}
          <div className="max-w-3xl space-y-6 pt-4">
            <h1 className="enter-up font-headline text-[clamp(2.5rem,5.5vw,4.5rem)] text-midnight font-normal leading-[1.08] tracking-tight">
              Studio Teknologi Kecil dengan <span className="italic font-light text-accent">Cara Kerja Terbuka</span>
            </h1>

            <p style={{ "--i": 1 } as CSSProperties} className="enter-up font-story text-mist-ink text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              KaryaLo berdiri karena kami terlalu sering melihat dua kutub yang sama-sama merepotkan klien: agensi desain yang tampilannya bagus tapi sistemnya rapuh, dan software house yang sistemnya jalan tapi susah dipakai. Kami mencoba berdiri di tengahnya.
            </p>

            <div style={{ "--i": 2 } as CSSProperties} className="enter-up flex flex-wrap items-center gap-3 pt-2">
              <span className="font-meta text-xs font-semibold px-3.5 py-1.5 rounded-full bg-porcelain text-mist-ink shadow-sm">
                Terdaftar di Kemenkumham RI
              </span>
              <span className="font-meta text-xs font-semibold px-3.5 py-1.5 rounded-full bg-porcelain text-mist-ink shadow-sm">
                NIB: {siteConfig.nib}
              </span>
              <span className="font-meta text-xs font-semibold px-3.5 py-1.5 rounded-full bg-porcelain text-mist-ink shadow-sm">
                Kota Bekasi, Jawa Barat
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Studio & Workstation Showcase */}
      <section className="py-12 md:py-16 px-4 md:px-12 mx-auto w-full">
        <div className="max-w-[66rem] mx-auto space-y-8 md:space-y-10">
          {/* Main Story & Large Photo */}
          <RevealGroup className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start" stagger={0.12}>
            <RevealItem direction="left" className="lg:col-span-5">
              <h2 className="font-headline text-3xl md:text-5xl text-midnight font-normal leading-tight text-balance">
                Satu Studio, Sekaligus Bengkel Perangkat
              </h2>
            </RevealItem>
            <RevealItem direction="right" className="lg:col-span-7 space-y-6">
              <p className="font-story text-mist-ink text-base md:text-lg leading-relaxed">
                Hasil terbaik jarang datang dari pekerjaan yang dioper ke sana-sini. Di studio kami di Kota Bekasi, developer, desainer, dan teknisi perangkat duduk berdekatan, saling menguji fitur, kecepatan aplikasi, sampai kestabilan sinyal alat di lapangan.
              </p>
              <div className="pt-5 border-t border-mist-border space-y-2">
                <span className="font-meta text-xs font-bold text-midnight uppercase tracking-wider block">
                  Janji kami: Anda tidak dikunci
                </span>
                <p className="font-story text-xs md:text-sm text-mist-ink leading-relaxed">
                  Repositori, dokumentasi, dan file desainnya sepenuhnya milik Anda. Kami dampingi sampai tim Anda bisa jalan sendiri tanpa perlu balik lagi ke kami.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>

          {/*
            The studio photograph runs as a background plate with the caption
            sitting on it. The blue wash is two stacked gradients cross-fading on
            opacity rather than one gradient changing colour on hover: gradient
            colour stops are not interpolatable, so animating them directly would
            snap between states instead of easing.
          */}
          <Reveal scaleFrom={0.96} distance={24} duration={0.85}>
            <figure className="group relative aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-2xl bg-midnight">
              <Image
                src="/images/about-studio.webp"
                alt="Ruang studio KaryaLo dengan meja kerja pengembangan software"
                fill
                sizes="(min-width: 1152px) 1056px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 32px)"
                className="object-cover object-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/35 to-midnight/5"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/30 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-7 font-meta text-xs md:text-sm leading-relaxed text-porcelain">
                Studio sekaligus tempat merakit perangkat
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 4 Core Pillars on Dedicated #C9D6DF Band (50% Rhythm) */}
      <section className="bg-mist py-20 md:py-28 px-4 md:px-12 border-y border-mist-border">
        <div className="max-w-[66rem] mx-auto space-y-12">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-headline text-3xl md:text-5xl text-midnight font-normal">
              Empat Hal yang Kami Pegang
            </h2>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
            {principles.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={principleCardVariants}
                whileHover="hover"
                data-reveal=""
                className="p-8 rounded-3xl bg-porcelain border border-white space-y-3 shadow-md"
              >
                <motion.div
                  variants={principleIconVariants}
                  className="w-10 h-10 rounded-xl bg-mist/40 border border-mist-border flex items-center justify-center text-midnight"
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <h3 className="font-story text-xl font-bold text-midnight">{title}</h3>
                <p className="font-story text-slate-600 text-sm leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/*
        Working method and coverage area. Both are drawn from data the site
        already treats as true (data/process.ts and the registered office), and
        both answer questions a buyer asks before sending an RFP.
      */}
      <section aria-labelledby="cara-kerja" className="py-20 md:py-24 px-4 md:px-12 max-w-6xl mx-auto w-full space-y-12">
        <RevealGroup className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" stagger={0.08}>
          <RevealItem direction="left" className="lg:col-span-5 space-y-4">
            <h2 id="cara-kerja" className="font-headline text-3xl md:text-5xl text-midnight font-normal leading-tight">
              Cara Kami Menjalankan Proyek
            </h2>
            <p className="font-story text-slate-600 text-base leading-relaxed">
              Semua proyek melewati lima tahap yang sama, dengan hasil dan titik evaluasi yang disepakati sejak awal. Anda tidak membayar untuk proses yang tidak bisa Anda lihat.
            </p>
            <Link href="/terms" className="section-link inline-flex">
              Baca ketentuan kerja sama
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-accent" />
            </Link>
          </RevealItem>

          <ol className="lg:col-span-7 space-y-4">
            {processSteps.map((step) => (
              <motion.li key={step.step} variants={revealVariants({ direction: "right", distance: 20, duration: 0.55 })} data-reveal="" className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200/90">
                <span className="font-headline text-2xl text-accent shrink-0 leading-none pt-1">{step.step}</span>
                <div className="space-y-1.5">
                  <h3 className="font-story text-base font-bold text-midnight leading-snug">{step.title}</h3>
                  <p className="font-story text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  <p className="font-meta text-[11px] text-slate-600 uppercase tracking-wider pt-1">
                    Yang Anda terima: {step.deliverables.join(" • ")}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </RevealGroup>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
          <motion.article variants={revealVariants({ distance: 22 })} data-reveal="" className="p-6 rounded-2xl bg-mist/30 border border-mist space-y-3">
            <h2 className="font-headline text-2xl text-midnight font-normal">Area Layanan</h2>
            <p className="font-story text-slate-700 text-sm md:text-base leading-relaxed">
              Kantor dan bengkel perangkat kami ada di Jatisampurna, Kota Bekasi, jadi klien Jabodetabek bisa mampir kapan saja. Untuk klien luar kota, seluruh prosesnya berjalan online tanpa mengurangi apa pun. Yang tetap butuh kehadiran fisik hanya pemasangan dan kalibrasi perangkat IoT, dan itu kami datangi langsung.
            </p>
          </motion.article>

          <motion.article variants={revealVariants({ distance: 22 })} data-reveal="" className="p-6 rounded-2xl bg-mist/30 border border-mist space-y-3">
            <h2 className="font-headline text-2xl text-midnight font-normal">Model Kerja Sama</h2>
            <p className="font-story text-slate-700 text-sm md:text-base leading-relaxed">
              Kerja sama diikat lewat SPK resmi dengan pembayaran bertahap, bukan lunas di depan. Tiap termin disertai invoice ber-NPWP dan Faktur Pajak. NDA bisa ditandatangani sebelum pembahasan teknis dimulai, dan seluruh hak cipta berpindah ke Anda setelah serah terima.
            </p>
          </motion.article>
        </RevealGroup>
      </section>

      {/* Legal Identity Card Section on porcelain */}
      <section className="py-20 md:py-24 px-4 md:px-12 max-w-6xl mx-auto w-full">
        <Reveal distance={30} duration={0.75} className="rounded-3xl bg-midnight text-white p-8 md:p-12 border border-midnight-light space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <h2 className="font-story text-2xl font-bold text-white">
                PT Karsa Swakarya Loka
              </h2>
            </div>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-meta px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-porcelain text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              <MapPin className="w-3.5 h-3.5 text-mist" />
              <span>Buka di Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-story text-sm text-midnight-muted">
            <div>
              <span className="font-meta text-xs font-semibold text-midnight-muted block">Nomor Induk Berusaha (NIB)</span>
              <span className="text-white font-mono text-base font-bold mt-1 block">{siteConfig.nib}</span>
              <span className="text-xs text-midnight-muted mt-0.5 block">Online Single Submission (OSS)</span>
            </div>

            <div>
              <span className="font-meta text-xs font-semibold text-midnight-muted block">Klasifikasi Baku (KBLI)</span>
              <span className="text-white font-mono text-base font-bold mt-1 block">62019</span>
              <span className="text-xs text-midnight-muted mt-0.5 block">Aktivitas Pemrograman Komputer Lainnya</span>
            </div>

            <div>
              <span className="font-meta text-xs font-semibold text-midnight-muted block">Alamat Kantor & Studio</span>
              <span className="text-white text-sm mt-1 block">{siteConfig.address}</span>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
