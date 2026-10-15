"use client";

import { CheckCircle2, MousePointerClick } from "lucide-react";
import { getProcess } from "@/data/process";
import { homeCopy } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The five stages, as Cargon cards: a numbered circle, the stage, its one-line
 * summary, and what you receive (the full description of each stage is on
 * /about). The prototype promise leads in a blue panel,
 * because it is the stage clients ask about first. The numbers stay: the order
 * is the information.
 */
export default function ProcessSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const process = copy.process;
  const steps = getProcess(lang);

  return (
    <section className="bg-white section-anchor px-4 md:px-12" id="process">
      <div className="mx-auto max-w-[72rem]">
        <SectionHeading badge={copy.badges.process} title={process.title} intro={process.intro} className="mb-10 md:mb-12" />

        <Reveal className="mb-8 grid grid-cols-1 items-center gap-5 rounded-xl bg-brand p-7 text-white shadow-lift md:grid-cols-[auto_1fr] md:gap-7 md:p-9">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15">
            <MousePointerClick aria-hidden="true" className="h-7 w-7 text-white" />
          </span>
          <div className="space-y-2">
            <p className="type-label text-cyan">{process.bannerBadge}</p>
            <p className="type-card-title-lg text-white">{process.bannerTitle}</p>
            <p className="type-body-card text-white max-w-[70ch]">{process.bannerBody}</p>
          </div>
        </Reveal>

        {/*
          Six columns at lg, each card spanning two, so the last two of five sit
          centred under the first three with matching gutters.
        */}
        <RevealGroup className="rail-mobile grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6" stagger={0.1}>
          {steps.map((step, idx) => (
            <RevealItem
              key={step.step}
              className={[
                "lg:col-span-2",
                idx === 3 ? "lg:col-start-2" : "",
                idx === 4 ? "md:col-span-2 lg:col-span-2" : "",
              ].filter(Boolean).join(" ")}
            >
              <article className="group flex h-full flex-col gap-5 rounded-xl bg-white p-7 shadow-card ring-1 ring-line transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-soft transition-colors duration-500 group-hover:bg-brand">
                    <span className="type-numeral text-2xl! text-brand transition-colors duration-500 group-hover:text-white">{step.step}</span>
                  </span>
                  <h3 className="type-card-title text-ink">{step.title}</h3>
                </div>
                <p className="type-body-card text-body">{step.tagline}</p>
                <div className="mt-auto space-y-2 border-t border-line pt-4">
                  <span className="type-label block text-ink">{process.youGet}</span>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 type-small text-body">
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
