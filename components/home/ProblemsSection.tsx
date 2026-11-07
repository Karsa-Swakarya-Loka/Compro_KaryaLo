"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { motion } from "motion/react";
import { getProblems } from "@/data/problems";
import { getServices } from "@/data/services";
import { homeCopy } from "@/content/home";
import { getWhatsAppUrl, whatsappUrl } from "@/config/site";
import { type Locale, localePath } from "@/lib/i18n";
import Reveal, { RevealGroup, revealVariants } from "@/components/motion/Reveal";
import ArrowSwap from "@/components/motion/ArrowSwap";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The situations we fix, in the shape of Cargon's testimonial cards: a quote
 * mark, the problem in the client's own words, then what we build for it.
 * These are not testimonials and carry no star ratings or names — real client
 * quotes live in TestimonialsSection and only render once approved.
 *
 * Each card is one link (the proof, or a WhatsApp opener). The section ends on
 * its solid WhatsApp button: right after a visitor recognises their problem.
 */
export default function ProblemsSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const problems = copy.problems;
  const services = getServices(lang);
  const fieldName = (pillarId: string) => services.find((p) => p.id === pillarId)?.shortName ?? "";

  return (
    <section className="bg-surface section-anchor px-4 md:px-12" id="masalah">
      <div className="mx-auto max-w-[72rem]">
        <SectionHeading badge={copy.badges.problems} title={problems.title} intro={problems.intro} className="mb-10 md:mb-12" />

        <RevealGroup className="fit-grid rail-mobile fit-md-2 fit-lg-3" stagger={0.08}>
          {getProblems(lang).map((item) => (
            <motion.article
              key={item.id}
              variants={revealVariants()}
              data-reveal=""
              className="project-card group relative flex flex-col gap-5 rounded-xl bg-white p-7 shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between gap-3">
                <Quote aria-hidden="true" className="h-8 w-8 fill-brand-soft text-brand" />
                <span className="type-meta rounded-full bg-surface px-3 py-1 text-body">{fieldName(item.pillarId)}</span>
              </div>

              <h3 className="type-card-title text-ink">“{item.problem}”</h3>

              <div className="flex-1 space-y-1.5 border-t border-line pt-4">
                <p className="type-label text-brand">{problems.builds}</p>
                <p className="type-body-card text-body">{item.solution}</p>
              </div>

              {item.proof ? (
                <Link href={localePath(lang, `/portfolio/${item.proof.slug}`)} className="stretched-link text-link self-start text-brand">
                  {item.proof.label}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              ) : (
                <a href={getWhatsAppUrl(item.whatsappMessage, lang, { service: fieldName(item.pillarId) })} target="_blank" rel="noopener noreferrer" className="stretched-link text-link self-start text-brand">
                  {problems.discuss}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              )}
            </motion.article>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex flex-col items-center gap-5 text-center">
          <p className="type-intro text-ink max-w-[56ch]">{problems.notListed}</p>
          <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" data-wa-primary="" className="btn btn-primary group">
            <span>{problems.whatsapp}</span>
            <ArrowSwap />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
