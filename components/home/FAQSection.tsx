"use client";

import { useState } from "react";
import { faqData } from "@/data/faq";
import { siteConfig } from "@/config/site";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { EASE_EXPO, SPRING_OVERSHOOT } from "@/components/motion/tokens";
import ArrowSwap from "@/components/motion/ArrowSwap";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** The exit for a question the list does not answer. */
function AskPrompt({ className = "" }: { className?: string }) {
  return (
    <Reveal className={`space-y-4 pt-6 border-t border-slate-200/80 ${className}`}>
      <p className="font-story text-sm text-slate-700 leading-relaxed">
        <span className="font-bold text-midnight">Pertanyaan Anda tidak ada di sini?</span> Kami sediakan sesi online 30 menit untuk membahas kebutuhan Anda lebih detail.
      </p>
      <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary group">
        <span>Tanya via WhatsApp</span>
        <ArrowSwap className="w-3.5 h-3.5" />
      </a>
    </Reveal>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-porcelain py-20 md:py-28 px-4 md:px-12 border-b border-slate-200/80" id="faq">
      <div className="max-w-[66rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        {/* Left: the question this section answers and the way out when an answer is missing.
            Sticks beside the answers on desktop so the exit stays in reach while reading. */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
          <Reveal className="space-y-4">
            <h2 className="font-headline text-4xl md:text-5xl text-midnight font-normal">
              Pertanyaan yang Sering Masuk
            </h2>
            <p className="font-story text-slate-600 text-base leading-relaxed">
              Soal kepemilikan kode, cara pembayaran, garansi, dan legalitas kontrak. Kami jawab apa adanya di sini.
            </p>
          </Reveal>
          <AskPrompt className="hidden lg:block" />
        </div>

        {/* Accordion List */}
        <RevealGroup className="lg:col-span-8 space-y-4" stagger={0.07}>
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <RevealItem key={item.id} distance={18} duration={0.55}>
                {/*
                  Named group: the trigger button below carries its own plain
                  `group` for the chevron, and an unnamed group here would fire
                  that chevron whenever the row was hovered anywhere.
                  This row stays deliberately lighter than the other cards — a
                  full surface flip on an open accordion would recolour the
                  answer text mid-read.
                */}
                <div
                  className={`group/faq rounded-2xl border transition-[border-color,background-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                    isOpen
                      ? "bg-white border-accent/40 shadow-sm hover:border-accent/60"
                      : "bg-white/80 border-slate-200/80 hover:border-accent/40 hover:bg-mist/15 hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group"
                    id={`${item.id}-trigger`}
                    aria-controls={`${item.id}-answer`}
                    aria-expanded={isOpen}
                  >
                    <span className="font-story text-base md:text-lg font-bold text-midnight leading-snug transition-colors duration-[400ms] group-hover/faq:text-midnight-light">
                      {item.question}
                    </span>
                    {/* Chevron flips with a micro spring overshoot instead of a rigid rotation */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.05 : 1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={SPRING_OVERSHOOT}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isOpen
                          ? "bg-accent text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/*
                    Every answer stays mounted so it is present in the server-rendered
                    HTML. Collapsing it by unmounting kept five of these answers out of
                    the markup entirely, which meant crawlers and AI assistants never
                    saw the most specific, most quotable copy on the site.
                  */}
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
                    <div className="px-6 pb-6 pt-1 border-t border-slate-200/50">
                      <p className="font-story text-slate-600 text-sm md:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* On one column the way out belongs after the answers, not before them. */}
        <AskPrompt className="lg:hidden" />

      </div>
    </section>
  );
}
