"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CornerDownRight } from "lucide-react";
import { motion } from "motion/react";
import { problemsData } from "@/data/problems";
import { servicesData } from "@/data/services";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import Reveal, { RevealGroup, revealVariants } from "@/components/motion/Reveal";

const pillarLabel = (pillarId: string) => {
  const pillar = servicesData.find((p) => p.id === pillarId);
  return pillar ? `Bidang ${pillar.pillarNumber} · ${pillar.shortName}` : "";
};

const linkClass =
  "stretched-link font-meta text-xs font-bold uppercase tracking-wider text-midnight flex items-center justify-between gap-2 min-h-11";

/**
 * Entry by situation rather than by service name: a visitor who recognises their own problem
 * sees what we build for it, which field handles it, and the proof or a WhatsApp opener.
 */
export default function ProblemsSection() {
  return (
    <section className="bg-mist py-20 md:py-28 px-4 md:px-12 border-b border-mist-border" id="masalah">
      <div className="max-w-[66rem] mx-auto space-y-14">

        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-mist-border pb-8">
          <h2 className="font-headline text-4xl md:text-5xl text-midnight font-normal max-w-xl">
            Masalah yang Sering Kami Bereskan
          </h2>
          <p className="font-story text-mist-ink text-sm md:text-base max-w-md leading-relaxed">
            Pilih yang paling mirip dengan kondisi Anda. Di tiap kartu ada yang kami bangun untuk mengatasinya, dan contoh hasilnya bila sudah ada.
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" stagger={0.07}>
          {problemsData.map((item) => (
            <motion.article
              key={item.id}
              variants={revealVariants()}
              data-reveal=""
              className="relative bg-white rounded-3xl p-6 md:p-7 border border-white flex flex-col gap-5 shadow-sm shadow-midnight/5 hover:border-midnight/30 hover:shadow-xl hover:shadow-midnight/10 transition-[border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group"
            >
              <span className="font-meta text-[11px] font-bold uppercase tracking-wider text-mist-ink">
                {pillarLabel(item.pillarId)}
              </span>

              <h3 className="font-story text-lg md:text-xl font-bold text-midnight leading-snug">
                “{item.problem}”
              </h3>

              <div className="flex gap-3 flex-1">
                <CornerDownRight aria-hidden="true" className="w-4 h-4 mt-1 shrink-0 text-mist-border" />
                <div className="space-y-1.5">
                  <p className="font-meta text-[11px] font-bold uppercase tracking-wider text-slate-500">Yang kami bangun</p>
                  <p className="font-story text-sm text-slate-600 leading-relaxed">{item.solution}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/70">
                {item.proof ? (
                  <Link href={`/works/${item.proof.slug}`} className={linkClass}>
                    <span>{item.proof.label}</span>
                    <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <a href={getWhatsAppUrl(item.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <span>Bahas kebutuhan ini</span>
                    <ArrowUpRight aria-hidden="true" className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </RevealGroup>

        <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-mist-border px-6 py-5">
          <p className="font-story text-sm md:text-base text-midnight">
            Kondisi Anda tidak ada di daftar ini? Ceritakan saja, kami bantu tentukan mulai dari mana.
          </p>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary shrink-0 self-start sm:self-auto">
            <span>Konsultasi WhatsApp</span>
            <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
          </a>
        </Reveal>

      </div>
    </section>
  );
}
