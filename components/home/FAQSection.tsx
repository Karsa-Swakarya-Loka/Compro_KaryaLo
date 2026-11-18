"use client";

import { useState } from "react";
import { getFaq } from "@/data/faq";
import { whatsappUrl } from "@/config/site";
import { homeCopy } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { EASE_EXPO, SPRING_OVERSHOOT } from "@/components/motion/tokens";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function FAQSection({ lang }: { lang: Locale }) {
  const badges = homeCopy[lang].badges;
  const copy = homeCopy[lang].faq;
  const faqData = getFaq(lang);
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id || null);

  return (
    <section className="agx-section" id="faq">
      <div className="agx-wrap">
        <SectionHeading badge={badges.faq} title={copy.title} />

        <RevealGroup className="mx-auto mt-14 max-w-3xl space-y-3" stagger={0.06}>
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <RevealItem key={item.id} distance={20}>
                <div className="agx-faq-item" data-open={isOpen ? "" : undefined}>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                    id={`${item.id}-trigger`}
                    aria-controls={`${item.id}-answer`}
                    aria-expanded={isOpen}
                  >
                    <span className={`text-[1.125rem] font-medium leading-snug tracking-[-0.01em] transition-colors ${isOpen ? "text-brand" : "text-ink"}`}>{item.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={SPRING_OVERSHOOT}
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${isOpen ? "bg-brand text-white" : "bg-white text-ink ring-1 ring-line"}`}
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

        <Reveal className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="type-intro text-body">
            <span className="font-medium text-ink">{copy.askLead}</span> {copy.askBody}
          </p>
          <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            <WhatsAppIcon size={18} />
            <span>{copy.askCta}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
