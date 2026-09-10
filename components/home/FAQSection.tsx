"use client";

import { useState } from "react";
import { faqData } from "@/data/faq";
import { siteConfig } from "@/config/site";
import { ChevronDown, MessageSquareQuote } from "lucide-react";
import { motion } from "motion/react";
import { EASE_EXPO, SPRING_OVERSHOOT } from "@/components/motion/tokens";
import ArrowSwap from "@/components/motion/ArrowSwap";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-porcelain py-20 md:py-28 px-4 md:px-12 border-b border-slate-200/80" id="faq">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Section Header */}
        <Reveal className="text-center space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl text-midnight font-normal">
            Pertanyaan yang Sering Masuk
          </h2>
          <p className="font-story text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
            Soal kepemilikan kode, cara pembayaran, garansi, dan legalitas kontrak. Kami jawab apa adanya di sini.
          </p>
        </Reveal>

        {/* Accordion List */}
        <RevealGroup className="space-y-4" stagger={0.07}>
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <RevealItem key={item.id} distance={18} duration={0.55}>
                <div
                  className={`rounded-2xl border transition-[border-color,background-color,box-shadow] duration-500 overflow-hidden ${
                    isOpen
                      ? "bg-white border-accent/40 shadow-sm"
                      : "bg-white/80 border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group"
                    id={`${item.id}-trigger`}
                    aria-controls={`${item.id}-answer`}
                    aria-expanded={isOpen}
                  >
                    <span className="font-story text-base md:text-lg font-bold text-midnight leading-snug">
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

        {/* Prompt Card */}
        <Reveal distance={28} className="p-6 rounded-2xl bg-mist/25 border border-mist flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-story text-base md:text-lg font-bold text-midnight">
                Ada pertanyaan yang belum terjawab di sini?
              </h3>
              <p className="font-story text-xs text-slate-700 mt-0.5">
                Kami sediakan sesi online 30 menit untuk membahas kebutuhan Anda lebih detail.
              </p>
            </div>
          </div>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-meta px-6 py-2.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors flex items-center gap-1.5 shrink-0 shadow-md shadow-midnight/10"
          >
            <span>Hubungi Kami</span>
            <ArrowSwap className="w-3.5 h-3.5" />
          </a>
        </Reveal>

      </div>
    </section>
  );
}
