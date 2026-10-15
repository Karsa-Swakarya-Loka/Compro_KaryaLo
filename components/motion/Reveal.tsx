"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, type TargetAndTransition, type Variants } from "motion/react";
import { EASE_EXPO } from "./tokens";

/**
 * Shared scroll-entry guard. `once` keeps content from re-hiding on the way
 * back up, and the negative margin fires the reveal slightly before the element
 * reaches the fold so fast scrolling never catches a half-faded block.
 */
export const REVEAL_VIEWPORT = { once: true, margin: "-60px" } as const;

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

/**
 * Default travel distance in px and duration in s, tuned to the Cargon
 * reference's AOS entrances (fade-up / fade-left / fade-right): a visible glide
 * that settles, not a snap. Every reveal on the site inherits these.
 */
const DISTANCE = 40;
const DURATION = 0.9;

function offsetFor(direction: RevealDirection, distance: number): { x?: number; y?: number } {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: -distance };
    case "right":
      return { x: distance };
    default:
      return {};
  }
}

interface VariantConfig {
  direction: RevealDirection;
  distance: number;
  duration: number;
  delay: number;
  scaleFrom?: number;
}

/**
 * Builds the hidden/visible pair, adding only the axes the caller actually
 * asked for — a reveal that never moves must not paint a `transform`, or every
 * heading it wraps gets rasterised onto its own layer and loses subpixel text.
 */
function buildVariants({ direction, distance, duration, delay, scaleFrom }: VariantConfig): Variants {
  const hidden: TargetAndTransition = { opacity: 0 };
  const visible: TargetAndTransition = { opacity: 1 };
  const offset = offsetFor(direction, distance);

  if (offset.x !== undefined) {
    hidden.x = offset.x;
    visible.x = 0;
  }
  if (offset.y !== undefined) {
    hidden.y = offset.y;
    visible.y = 0;
  }
  if (scaleFrom !== undefined) {
    hidden.scale = scaleFrom;
    visible.scale = 1;
  }

  return {
    hidden,
    visible: { ...visible, transition: { duration, ease: EASE_EXPO, delay } },
  };
}

interface RevealProps extends VariantPropsBase {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

interface VariantPropsBase {
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  scaleFrom?: number;
}

/**
 * Self-contained scroll reveal: fades and settles the moment it enters the
 * viewport. Safe to wrap around server-rendered children, so a server component
 * keeps rendering on the server and only the wrapper ships to the client.
 */
export default function Reveal({
  children,
  className,
  style,
  id,
  direction = "up",
  distance = DISTANCE,
  duration = DURATION,
  delay = 0,
  scaleFrom,
}: RevealProps) {
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      data-reveal=""
      variants={buildVariants({ direction, distance, duration, delay, scaleFrom })}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  /** Gap between each child's entrance. */
  stagger?: number;
  /** Beat before the first child moves. */
  delayChildren?: number;
}

/**
 * Stagger parent. Holds no visual state of its own — it only sequences the
 * `RevealItem`s beneath it, so it can sit directly on a grid or flex container
 * without disturbing the layout.
 */
export function RevealGroup({
  children,
  className,
  style,
  id,
  stagger = 0.1,
  delayChildren = 0,
}: RevealGroupProps) {
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren } } }}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps extends VariantPropsBase {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** One child of a `RevealGroup`. Timing comes from the parent, not from itself. */
export function RevealItem({
  children,
  className,
  style,
  direction = "up",
  distance = DISTANCE,
  duration = DURATION,
  delay = 0,
  scaleFrom,
}: RevealItemProps) {
  return (
    <motion.div
      className={className}
      style={style}
      data-reveal=""
      variants={buildVariants({ direction, distance, duration, delay, scaleFrom })}
    >
      {children}
    </motion.div>
  );
}

/**
 * Variant pair for elements that need to be a specific tag (`article`, `li`,
 * `section`) and so cannot go through the wrappers above. Spread onto any
 * `motion.*` element that already sits inside a `RevealGroup`.
 */
export function revealVariants(config: VariantPropsBase = {}): Variants {
  const { direction = "up", distance = DISTANCE, duration = DURATION, delay = 0, scaleFrom } = config;
  return buildVariants({ direction, distance, duration, delay, scaleFrom });
}
