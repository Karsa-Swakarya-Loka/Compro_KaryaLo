import type { TargetAndTransition, Variants } from "motion/react";
import { EASE_EXPO } from "./tokens";

/**
 * Scroll entrances. `Reveal`, `RevealGroup` and `RevealItem` are the plain,
 * server-rendered versions in Entrance.tsx, played by REVEAL_SCRIPT (no client
 * component per element). What stays here is for the few places that still
 * animate a `motion.*` element themselves (the industry tabs, portfolio cards):
 * the shared viewport rule and the matching hidden/visible variants, so those
 * move exactly like the rest.
 */
export { Reveal as default, RevealGroup, RevealItem } from "./Entrance";
export type { RevealDirection } from "./Entrance";

/** Fire once, slightly before the element reaches the fold (60px in from every edge). */
export const REVEAL_VIEWPORT = { once: true, margin: "-60px" } as const;

const DISTANCE = 30;
const DURATION = 0.8;

type Direction = "up" | "down" | "left" | "right" | "none";

/** Hidden → visible variant pair for a `motion.*` element inside a motion parent. */
export function revealVariants(config: { direction?: Direction; distance?: number; duration?: number; delay?: number; scaleFrom?: number } = {}): Variants {
  const { direction = "up", distance = DISTANCE, duration = DURATION, delay = 0, scaleFrom } = config;
  const hidden: TargetAndTransition = { opacity: 0 };
  const visible: TargetAndTransition = { opacity: 1 };
  if (direction === "left" || direction === "right") {
    hidden.x = direction === "left" ? -distance : distance;
    visible.x = 0;
  }
  if (direction === "up" || direction === "down") {
    hidden.y = direction === "up" ? distance : -distance;
    visible.y = 0;
  }
  if (scaleFrom !== undefined) {
    hidden.scale = scaleFrom;
    visible.scale = 1;
  }
  return { hidden, visible: { ...visible, transition: { duration, ease: EASE_EXPO, delay } } };
}
