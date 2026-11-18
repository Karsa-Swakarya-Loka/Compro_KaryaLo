"use client";

import { useEffect, type RefObject } from "react";

/**
 * True only where the scroll scenes in `app/scroll-scenes.css` are actually
 * switched on: the browser knows view timelines and the visitor has not asked
 * for reduced motion. The same two conditions gate the CSS, so measuring and
 * styling always agree.
 */
export function scenesSupported(): boolean {
  return (
    typeof CSS !== "undefined" &&
    CSS.supports("animation-timeline: view()") &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}

/**
 * Runs `measure` against the section after layout, and again whenever the page
 * is resized or the fonts arrive, so the custom properties the scenes read
 * (rail distance, deck height, card offsets) stay true. `measure` must be a
 * stable function (declare it at module level).
 */
export function useSceneMeasure(ref: RefObject<HTMLElement | null>, measure: (root: HTMLElement) => void) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !scenesSupported()) return;

    let frame = 0;
    const run = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => measure(root));
    };

    run();
    const observer = new ResizeObserver(run);
    observer.observe(document.body);
    void document.fonts?.ready.then(run);
    window.addEventListener("load", run);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("load", run);
    };
  }, [ref, measure]);
}
