"use client";

/**
 * The Agenciex motion pieces that need client state:
 *
 *   Odometer     figures: every digit is a 0–9 column that rolls to its value.
 *   ScrollGiant  the huge brand phrase, sliding with the scroll position.
 *
 * The one-time entrances (FlipIn headings, BlurText paragraphs, FlyIn photos,
 * the Reveal fade-ups) are plain server-rendered elements in ./Entrance, played
 * by REVEAL_SCRIPT from one observer, so they cost no hydration.
 */

import { useRef, type CSSProperties, type ElementType } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";

export const AGX_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];


/* ─────────────────────────── Odometer ─────────────────────────── */

/**
 * A figure whose digits roll into place. `value` is the text as it should read
 * ("7-14", "100%", "5"); digits roll, every other character stands still.
 */
export function Odometer({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduced = useReducedMotion();
  const on = inView || reduced;
  let digitIndex = 0;
  return (
    <span ref={ref} className={`agx-odo ${className ?? ""}`} aria-label={value} role="img" data-on={on ? "" : undefined}>
      {value.split("").map((char, i) => {
        if (!/\d/.test(char)) {
          return (
            <span key={i} aria-hidden="true">
              {char}
            </span>
          );
        }
        const d = Number(char);
        const order = digitIndex++;
        return (
          <span key={i} className="agx-odo-digit" aria-hidden="true">
            <span className="agx-odo-col" style={{ "--d": d, "--o": order } as CSSProperties}>
              {"0123456789".split("").map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

/* ─────────────────────────── ScrollGiant ─────────────────────────── */

/**
 * The huge brand phrase ("Extended IT Partner · …") in a navy-to-blue
 * gradient so it reads clearly. It is far wider than the screen, so it runs as
 * a strip that slides left with the scroll: the whole phrase passes by instead
 * of being cut off at "Partr". Decoration only (the same words are in the hero).
 */
export function ScrollGiant({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Centred on the screen (progress 0.5), "Extended IT Partner" sits whole at the left edge.
  const x = useTransform(scrollYProgress, [0, 1], ["22%", "-22%"]);
  const parts = text.split(/\s*·\s*/);
  const phrase = (key: string) => (
    <span key={key} className="agx-giant-item">
      {parts.map((part, i) => (
        <span key={i} className="agx-giant-part">
          {i > 0 && <i className="agx-giant-dot" />}
          {part}
        </span>
      ))}
      <i className="agx-giant-dot" />
    </span>
  );
  return (
    <div ref={ref} className={`agx-giant ${className ?? ""}`} aria-hidden="true">
      <motion.div className="agx-giant-strip" style={reduced ? undefined : { x }}>
        {phrase("a")}
        {phrase("b")}
      </motion.div>
    </div>
  );
}

/*
 * FlipIn, BlurText, FlyIn and the Reveal family are plain server-rendered elements
 * in ./Entrance (played by REVEAL_SCRIPT): no client component per element. Only
 * what genuinely needs client state stays here.
 */
export type { ElementType };
