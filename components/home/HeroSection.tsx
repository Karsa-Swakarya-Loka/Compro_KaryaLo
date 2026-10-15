"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowRight, CheckCircle2 } from "lucide-react";
import { whatsappUrl } from "@/config/site";
import { homeCopy } from "@/content/home";
import { getProblems } from "@/data/problems";
import { type Locale, localePath } from "@/lib/i18n";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import ArrowSwap from "@/components/motion/ArrowSwap";
import DecorCurves from "@/components/ui/DecorCurves";

const ADVANCE_MS = 6500;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * What each example shows in the panel. Screenshots sit as a card inside the
 * slanted panel, so the proof is seen whole; the IoT example is a photograph
 * and fills the panel (there is no IoT project to show yet).
 */
const SLIDE_ART: Record<string, { image: string; screen: boolean; fallbackHref: string }> = {
  "stok-tidak-cocok": { image: "/images/portofolio/alina-store.webp", screen: true, fallbackHref: "/portfolio" },
  "laporan-manual": { image: "/images/prototype/karyalo-admin.webp", screen: true, fallbackHref: "/portfolio" },
  "website-belum-meyakinkan": { image: "/images/portofolio/hij-compro.webp", screen: true, fallbackHref: "/portfolio" },
  "alat-tidak-terpantau": { image: "/images/service-iot-2.webp", screen: false, fallbackHref: "/services#iot-hardware" },
};

/**
 * Cargon's hero: text on the left over the light surface, a slanted panel
 * bleeding off the right edge, thin curves.
 *
 * The left column answers, in reading order and without moving: what KaryaLo
 * is (the category pill and the H1), who it is for and what it does, why it
 * matters (three reasons the site already backs), and what to do next (one
 * solid WhatsApp button, one secondary, and a line on what happens when you
 * write). It is server-rendered and readable without JavaScript.
 *
 * The panel on the right is the slider: one everyday client problem per
 * slide (the owner's problem-first hook), with what we build and the proof.
 * There is no pause button (owner's call): slides advance every 6.5s, hold
 * while the hero is hovered or focused, stop for good once a visitor picks a
 * slide, and never auto-advance for reduced-motion visitors.
 */
export default function HeroSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const hero = copy.hero;
  const slider = copy.slider;
  const reduceMotion = useReducedMotionSafe();
  const problems = getProblems(lang);

  const slides = hero.slides.map((slide) => {
    const problem = problems.find((item) => item.id === slide.problemId);
    const art = SLIDE_ART[slide.problemId];
    return {
      ...slide,
      ...art,
      solution: problem?.solution ?? "",
      proofHref: problem?.proof ? `/portfolio/${problem.proof.slug}` : art.fallbackHref,
    };
  });

  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(false);
  const [holding, setHolding] = useState(false);
  const autoplay = !reduceMotion && !chosen && !holding;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % slides.length), ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, index, slides.length]);

  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden bg-surface pb-10 lg:min-h-[44rem] lg:pb-0"
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocusCapture={() => setHolding(true)}
      onBlurCapture={() => setHolding(false)}
    >
      <DecorCurves className="-left-10 bottom-[-2rem] h-[26rem] w-auto lg:h-[34rem]" />

      {/* What it is, who it is for, why it matters, what to do next. */}
      <div className="relative z-10 mx-auto max-w-[76rem] px-4 pt-28 pb-10 md:px-12 md:pt-32 lg:px-8 lg:pt-36 lg:pb-20">
        <div className="lg:w-[54%] lg:pr-12">
          <p className="enter-up badge-pill">{hero.category}</p>

          <h1 className="enter-up mt-5 type-display-hero text-ink" style={{ "--i": 1 } as CSSProperties}>
            {hero.headline.lead} <span className="text-brand">{hero.headline.accent}</span>
          </h1>

          <p className="enter-up mt-5 max-w-[52ch] type-lede text-body" style={{ "--i": 2 } as CSSProperties}>
            {hero.audience}
          </p>

          <ul className="enter-up mt-5 flex flex-wrap gap-x-5 gap-y-2" style={{ "--i": 3 } as CSSProperties}>
            {hero.reasons.map((reason) => (
              <li key={reason} className="flex items-center gap-2 type-small font-medium text-ink">
                <CheckCircle2 aria-hidden="true" className="h-[1.125rem] w-[1.125rem] shrink-0 text-brand" />
                {reason}
              </li>
            ))}
          </ul>

          <div className="enter-up mt-7 flex flex-wrap items-center gap-3" style={{ "--i": 4 } as CSSProperties}>
            {/* `data-wa-primary`: the floating WhatsApp button steps aside while this one is on screen. */}
            <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" data-wa-primary="" className="btn btn-lg btn-primary group">
              <span>{hero.primaryCta}</span>
              <ArrowSwap />
            </a>
            <a href="#portfolio" className="btn btn-lg btn-secondary group">
              <span>{hero.secondaryCta}</span>
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <p className="enter-up mt-4 type-small text-body" style={{ "--i": 5 } as CSSProperties}>
            {hero.reassurance}
          </p>
        </div>
      </div>

      {/* The examples: the slanted panel with the evidence, and a card naming the problem. */}
      <div aria-roledescription="carousel" aria-label={slider.label}>
        <div className="relative h-[20rem] sm:h-[26rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[46%]">
          <div className="hero-media-frame hidden lg:block" aria-hidden="true" />
          <div className="hero-media absolute inset-0 overflow-hidden bg-brand-soft">
            <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
              <DecorCurves className="right-0 top-0 h-full w-auto" />
            </div>
            {slides.map((item, i) => (
              <div
                key={item.problemId}
                aria-hidden={i !== index}
                className="absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ opacity: i === index ? 1 : 0, transform: i === index ? "scale(1)" : "scale(1.04)" } as CSSProperties}
              >
                {item.screen ? (
                  /*
                    A flat screenshot in a plain browser window: at this size a laptop
                    mockup shrinks the screen past legibility. On desktop its top sits
                    on the category pill's line (pt-36, as the text column).
                  */
                  <div className="absolute inset-0 flex items-start px-4 pt-6 sm:px-10 sm:pt-10 lg:pl-[19%] lg:pr-10 lg:pt-36">
                    <div className="w-full overflow-hidden rounded-xl bg-white shadow-lift ring-1 ring-brand/15 lg:max-w-[32rem]">
                      <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3.5 py-2.5" aria-hidden="true">
                        <span className="h-2 w-2 rounded-full bg-[#C3CDDC]" />
                        <span className="h-2 w-2 rounded-full bg-[#C3CDDC]" />
                        <span className="h-2 w-2 rounded-full bg-[#C3CDDC]" />
                      </div>
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={item.image}
                          alt={i === index ? item.imageAlt : ""}
                          fill
                          priority={i === 0}
                          sizes="(min-width: 1024px) 36vw, 90vw"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Image src={item.image} alt={i === index ? item.imageAlt : ""} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
                    {/* A blue wash so the photograph sits in the brand's light. */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand/45 via-brand/10 to-transparent" aria-hidden="true" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* The problem card: under the panel on phones, overlapping its lower edge on desktop. */}
        <div className="relative z-20 mx-4 -mt-16 rounded-2xl bg-white p-5 shadow-lift sm:mx-10 sm:p-6 lg:absolute lg:top-[21rem] lg:left-[57%] xl:top-[24.5rem] lg:mx-0 lg:mt-0 lg:w-[23rem]">
          <p className="type-meta text-brand">{hero.problemLabel}</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.problemId}
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${slides.length}`}
              aria-live={autoplay ? "off" : "polite"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="mt-2 space-y-2"
            >
              <p className="type-label text-[1.0625rem] leading-snug text-ink">“{slide.headline}”</p>
              <p className="type-small text-body">
                <span className="font-semibold text-ink">{hero.builds}:</span> {slide.solution}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
            <Link href={localePath(lang, slide.proofHref)} className="text-link min-h-0 text-brand">
              {hero.proofLink}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-1">
              {slides.map((item, i) => (
                <button
                  key={item.problemId}
                  type="button"
                  onClick={() => {
                    setChosen(true);
                    setIndex(i);
                  }}
                  aria-label={slider.goTo(i + 1, slides.length)}
                  aria-current={i === index ? "true" : undefined}
                  className="grid h-8 w-8 place-items-center rounded-full"
                >
                  <span className="hero-dot" aria-current={i === index ? "true" : undefined} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
