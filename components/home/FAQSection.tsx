"use client";

import { useState } from "react";
import { getFaq } from "@/data/faq";
import { whatsappUrl } from "@/config/site";
import { homeCopy } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { EASE_EXPO, SPRING_OVERSHOOT } from "@/components/motion/tokens";
import ArrowSwap from "@/components/motion/ArrowSwap";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Questions, in the Cargon manner: a centred header, then one column of white
 * cards. The open card gains a blue edge and its chevron turns solid blue.
 * Every answer stays mounted so it is in the server HTML for search engines and
 * assistants; collapsed answers are `inert`.
 */
export default function FAQSection({ lang }: { lang: Locale }) {
  const badges = homeCopy[lang].badges;
  const copy = homeCopy[lang].faq;
  const faqData = getFaq(lang);
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id || null);

  return (
    <section className="bg-white section-support px-4 md:px-12" id="faq">
      <div className="mx-auto max-w-[72rem]">
        <SectionHeading badge={badges.faq} title={copy.title} intro={copy.intro} className="mb-10" />

        <RevealGroup className="mx-auto max-w-3xl space-y-4" stagger={0.06}>
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <RevealItem key={item.id} distance={20}>
                <div className={`overflow-hidden rounded-xl bg-white shadow-card ring-1 transition-[box-shadow] duration-300 ${isOpen ? "ring-brand" : "ring-line hover:ring-brand/40"}`}>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                    id={`${item.id}-trigger`}
                    aria-controls={`${item.id}-answer`}
                    aria-expanded={isOpen}
                  >
                    <span className={`type-card-title transition-colors ${isOpen ? "text-brand" : "text-ink"}`}>{item.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={SPRING_OVERSHOOT}
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${isOpen ? "bg-brand text-white" : "bg-brand-soft text-brand"}`}
                    >
                      <ChevronDown aria-hidden="true" className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <motion.div
                    id={`${item.id}-answer`}
                    role="region"
                    aria-labelledby={`${item.id}-trigger`}
                    inert={!isOpen}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: EASE_EXPO }}
                    className="overflow-hidden"
                  >
                    <p className="type-body max-w-[68ch] px-6 pb-6 text-body">{item.answer}</p>
                  </motion.div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="type-intro text-body">
            <span className="font-semibold text-ink">{copy.askLead}</span> {copy.askBody}
          </p>
          <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary group">
            <span>{copy.askCta}</span>
            <ArrowSwap />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
