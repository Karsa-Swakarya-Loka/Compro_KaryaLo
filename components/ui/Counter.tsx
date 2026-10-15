"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import useReducedMotionSafe from "@/components/motion/useReducedMotionSafe";

/**
 * Cargon's count-up figure. The server renders the final value, so crawlers and
 * no-JS readers see the real number. On the client the count starts while the
 * figure is still 200px below the fold, so the reset to zero happens off screen
 * and the reader only ever sees it climbing. It writes straight to the text
 * node: no re-render per frame.
 */
export default function Counter({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 200px 0px" });
  const reduceMotion = useReducedMotionSafe();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduceMotion) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => { node.textContent = `${Math.round(latest)}${suffix}`; },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, suffix]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {to}
      {suffix}
    </span>
  );
}
