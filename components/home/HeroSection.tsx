"use client";

import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { whatsappUrl } from "@/config/site";
import { homeCopy } from "@/content/home";
import { portfolioCopy } from "@/content/portfolio-page";
import { getPortfolio, type ProjectItem } from "@/data/portfolio";
import { type Locale, localePath } from "@/lib/i18n";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";
import ArrowSwap from "@/components/motion/ArrowSwap";
import DecorCurves from "@/components/ui/DecorCurves";
import ProfileDownload from "@/components/ui/ProfileDownload";

/** Time on each slide; slower while the pointer is over the slider, so a visitor can look without it stopping. */
const ADVANCE_MS = 6500;
const ADVANCE_HOVER_MS = 15000;

/**
 * The projects in the slider, in order: client work and KaryaLo's own product,
 * no prototypes. Every cover is the same 3D laptop mockup (1600×1240 on a
 * transparent background), so each slide has the same size, angle and light.
 */
const SLIDE_SLUGS = [
  "alina-omnichannel-retail",
  "deliastore-topup",
  "hij-garment-erp",
  "affirmate-company-profile",
  "apegale-company-profile",
  "hij-corporate-profile",
];

const SPRING = { stiffness: 120, damping: 22, mass: 0.8 };
const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (n: number) => Math.max(-0.5, Math.min(0.5, n));

/**
 * Cargon's hero: text on the left over the light surface, and on the right a
 * slanted panel (a blue-toned photograph) with a 3D object standing in front of
 * it, its base breaking out over the panel's leaning left edge.
 *
 * The left column is short on purpose (hierarchy pass, 2026-10-16): what
 * KaryaLo is (the category pill and the H1), one line on what it does, one
 * solid WhatsApp button with a quiet link beside it, and one line that lowers
 * the stakes. It is server-rendered and readable without JavaScript.
 *
 * The slider shows one project per slide as the same laptop mockup, with a
 * short caption centred under it that names the mockup in reading order:
 * project type and field, the title, then the slide bars and count. A new
 * laptop swings in from the right as in Cargon, then floats; with a mouse, the
 * laptop tilts toward the pointer and the photograph drifts the other way, so
 * the panel reads as depth. Each laptop links to its case study.
 *
 * Timing (owner's calls): no pause button; slides advance every 6.5s, or every
 * 15s while the pointer is over the slider, and picking a slide restarts the
 * clock rather than stopping it. The slider holds while a keyboard user is on
 * its controls, and never auto-advances or moves for reduced-motion visitors.
 */
export default function HeroSection({ lang }: { lang: Locale }) {
  const copy = homeCopy[lang];
  const hero = copy.hero;
  const slider = copy.slider;
  const types = portfolioCopy[lang].types;
  const reduceMotion = useReducedMotionSafe();
  const projects = getPortfolio(lang);
  const slides = SLIDE_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(
    (project): project is ProjectItem => Boolean(project),
  );
  const total = slides.length;

  const [{ index, previous }, setSlide] = useState({ index: 0, previous: -1 });
  const [hovering, setHovering] = useState(false);
  const [keyboardHold, setKeyboardHold] = useState(false);
  const autoplay = !reduceMotion && !keyboardHold;
  const delay = hovering ? ADVANCE_HOVER_MS : ADVANCE_MS;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(
      () => setSlide((current) => ({ index: (current.index + 1) % total, previous: current.index })),
      delay,
    );
    return () => window.clearTimeout(timer);
  }, [autoplay, delay, index, total]);

  const pick = (next: number) =>
    setSlide((current) => (next === current.index ? current : { index: next, previous: current.index }));

  // The other five laptops load once the page has finished loading, so they never compete with the first one.
  const [warm, setWarm] = useState(false);
  useEffect(() => {
    const start = () => setWarm(true);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  // Only keyboard focus holds the slider; a mouse click on a bar leaves it running.
  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.target.matches(":focus-visible")) setKeyboardHold(true);
  };

  // Pointer depth: the laptop leans toward the mouse, the photograph drifts away from it.
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, SPRING);
  const smoothY = useSpring(pointerY, SPRING);
  const deviceRotateY = useTransform(smoothX, (v) => v * 14);
  const deviceRotateX = useTransform(smoothY, (v) => v * -10);
  const photoX = useTransform(smoothX, (v) => v * -28);
  const photoY = useTransform(smoothY, (v) => v * -18);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    pointerX.set(clamp((event.clientX - rect.left) / rect.width - 0.5));
    pointerY.set(clamp((event.clientY - rect.top) / rect.height - 0.5));
  };
  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const slide = slides[index];

  return (
    <section className="hero-fit relative overflow-hidden bg-surface" onPointerMove={handlePointerMove} onMouseLeave={resetPointer}>
      <DecorCurves className="-left-10 bottom-[-2rem] h-[26rem] w-auto lg:h-[34rem]" />

      {/*
        The copy, in the order the eye should take it: the headline first, the
        slider beside it as the proof, then one action. A single solid button
        (starting a conversation) with a quiet link beside it, and one short
        line that lowers the stakes. Centred vertically beside the slider.
      */}
      <div className="relative z-10 mx-auto max-w-[76rem] px-4 pt-28 pb-8 md:px-12 md:pt-32 md:pb-10 hero-fit lg:flex lg:items-center lg:px-8 lg:pt-24 lg:pb-16">
        <div className="lg:w-[54%] lg:pr-12">
          <p className="enter-up badge-pill">{hero.category}</p>

          <h1 className="enter-up mt-6 type-display-hero text-ink" style={{ "--i": 1 } as CSSProperties}>
            {hero.headline.lead} <span className="text-brand">{hero.headline.accent}</span>
          </h1>

          <p className="enter-up mt-5 max-w-[42ch] type-lede text-body" style={{ "--i": 2 } as CSSProperties}>
            {hero.audience}
          </p>

          <div className="enter-up mt-9 flex flex-wrap items-center gap-x-7 gap-y-3" style={{ "--i": 3 } as CSSProperties}>
            {/* `data-wa-primary`: the floating WhatsApp button steps aside while this one is on screen. */}
            <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" data-wa-primary="" className="btn btn-lg btn-primary group">
              <span>{hero.primaryCta}</span>
              <ArrowSwap />
            </a>
            <a href="#portfolio" className="text-link text-ink hover:text-brand">
              {hero.secondaryCta}
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </a>
            <ProfileDownload lang={lang} variant="link" className="text-link text-ink hover:text-brand" />
          </div>
          <p className="enter-up mt-4 type-small text-body" style={{ "--i": 4 } as CSSProperties}>
            {hero.reassurance}
          </p>
        </div>
      </div>

      {/* The stage: the slanted panel, and the laptop with its caption standing in front of it. */}
      <div
        ref={stageRef}
        className="hero-stage"
        aria-roledescription="carousel"
        aria-label={slider.label}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocusCapture={handleFocus}
        onBlurCapture={() => setKeyboardHold(false)}
      >
        <div className="hero-panel-frame" aria-hidden="true" />
        <div className="hero-panel" aria-hidden="true">
          {/*
            Cargon's blue duotone, baked into the file (hero-centerpiece.webp in
            grayscale, contrast 1.25, multiplied by the brand blue) rather than
            drawn with CSS filters and a blend layer on every frame. It is the
            page's largest paint, so it loads first.
          */}
          <motion.div className="absolute -inset-8" style={{ x: photoX, y: photoY }}>
            <Image src="/images/hero-panel.webp" alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-[0.16]" />
          </motion.div>
          {/* Deepening toward the floor the laptop stands on. */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />
          <div className="hero-floor" />
          <div className="hero-spotlight" />
        </div>

        <div className="hero-showcase">
          <motion.div
            className="hero-device-box"
            style={{ rotateX: deviceRotateX, rotateY: deviceRotateY, transformPerspective: 1600 }}
          >
            <div className="hero-device-enter">
              {slides.map((project, i) => {
                const state = i === index ? "active" : i === previous ? "leaving" : "waiting";
                return (
                  <div key={project.slug} className="hero-device" data-state={state} aria-hidden={i !== index}>
                    <div className="hero-device-shadow" aria-hidden="true" />
                    <div className="hero-float">
                      <Link
                        href={localePath(lang, `/portfolio/${project.slug}`)}
                        aria-label={slider.openProject(project.title)}
                        tabIndex={i === index ? undefined : -1}
                        className="block rounded-[4%]"
                      >
                        {i === 0 || i === index || i === previous || warm ? (
                          <Image
                            src={project.coverImage}
                            alt={slider.slideAlt(project.title)}
                            width={1600}
                            height={1240}
                            priority={i === 0}
                            sizes="(min-width: 1024px) 40rem, 92vw"
                            className="hero-device-img h-auto w-full"
                          />
                        ) : (
                          <span className="block aspect-[1600/1240]" />
                        )}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* What the mockup is: type and field, then the title; then the slide bars and count. */}
          <div className="hero-caption">
            <div
              key={slide.slug}
              className="hero-caption-text"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${total}`}
              aria-live={autoplay ? "off" : "polite"}
            >
              <p className="type-meta text-brand">
                {types[slide.type]} · {slide.categoryLabel}
              </p>
              <p className="type-card-title mt-1.5 text-ink">{slide.title}</p>
            </div>

            <div className="hero-caption-nav" role="group" aria-label={slider.label}>
              <div className="flex items-center">
                {slides.map((project, i) => (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => pick(i)}
                    aria-label={slider.goTo(i + 1, total)}
                    aria-current={i === index ? "true" : undefined}
                    className="grid h-8 place-items-center px-1"
                  >
                    <span className="hero-bar" data-active={i === index ? "" : undefined}>
                      {i === index && (
                        <span
                          key={`${index}-${autoplay}-${delay}`}
                          className="hero-bar-fill"
                          data-run={autoplay ? "" : undefined}
                          style={{ "--hero-ms": `${delay}ms` } as CSSProperties}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <p className="type-meta text-body" aria-hidden="true">
                <span className="font-semibold text-ink">{pad(index + 1)}</span> / {pad(total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
