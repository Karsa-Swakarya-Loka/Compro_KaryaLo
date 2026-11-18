import type { CSSProperties, ReactNode } from "react";

/**
 * The site's one-time entrance animations, without a client component per
 * element (2026-11-18).
 *
 * These used to be ~95 `motion.*` components on the home page alone (every
 * fade-up, heading flip, blurred word and flying photo), each one hydrated by
 * React with its own observer: that hydration was the biggest block of main-
 * thread work on a phone. Their behaviour is simple (go from a hidden state to
 * rest once, when they come into view), so they are now plain server-rendered
 * elements that carry their hidden state inline plus a few data attributes, and
 * REVEAL_SCRIPT (components/motion/earlyReveal.ts) plays them all from one
 * IntersectionObserver with the Web Animations API: the same start states,
 * durations, delays, staggers, curve (0.22, 1, 0.36, 1) and 60px trigger margin
 * as the Motion versions, so they look and move exactly as before.
 *
 * Attributes read by the script:
 *   data-reveal-css         an element that animates to rest
 *   data-reveal-css-group   a parent whose items enter one after another
 *   data-reveal-delay       seconds before this element starts
 *   data-reveal-dur         seconds the entrance takes
 *   data-reveal-stagger     (group) seconds between items
 *   data-reveal-delay-children  (group) seconds before the first item
 *   data-reveal-amount      share of the element that must be visible (default: any)
 *   data-reveal-blur        the entrance also clears a blur
 */

export type RevealDirection = "up" | "down" | "left" | "right" | "none";
type Tag = "div" | "ul" | "ol" | "li" | "tbody" | "tr" | "section" | "article" | "h1" | "h2" | "h3" | "h4" | "p" | "span";

const DISTANCE = 30;
const DURATION = 0.8;

/** The hidden state as inline style: opacity 0 plus only the transform axes the caller asked for. */
function hidden(direction: RevealDirection, distance: number, scaleFrom?: number, extra: string[] = []): CSSProperties {
  const parts: string[] = [...extra];
  if (direction === "left") parts.push(`translateX(${-distance}px)`);
  if (direction === "right") parts.push(`translateX(${distance}px)`);
  if (direction === "up") parts.push(`translateY(${distance}px)`);
  if (direction === "down") parts.push(`translateY(${-distance}px)`);
  if (scaleFrom !== undefined) parts.push(`scale(${scaleFrom})`);
  return parts.length ? { opacity: 0, transform: parts.join(" ") } : { opacity: 0 };
}

const n = (v: number | undefined, fallback?: number) => (v === undefined || v === fallback ? undefined : v);

interface EntranceProps {
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  scaleFrom?: number;
}

/** Fades and settles the moment it enters the viewport. */
export function Reveal({
  children,
  className,
  style,
  id,
  direction = "up",
  distance = DISTANCE,
  duration = DURATION,
  delay = 0,
  scaleFrom,
}: EntranceProps & { children: ReactNode; className?: string; style?: CSSProperties; id?: string }) {
  return (
    <div
      id={id}
      className={className}
      style={{ ...style, ...hidden(direction, distance, scaleFrom) }}
      data-reveal=""
      data-reveal-css=""
      data-reveal-delay={n(delay, 0)}
      data-reveal-dur={n(duration, DURATION)}
    >
      {children}
    </div>
  );
}

/** Stagger parent: holds no visual state of its own, only sequences the RevealItems inside it. */
export function RevealGroup({
  children,
  className,
  style,
  id,
  stagger = 0.1,
  delayChildren = 0,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  stagger?: number;
  delayChildren?: number;
  as?: Tag;
}) {
  return (
    <Component
      id={id}
      className={className}
      style={style}
      data-reveal-group=""
      data-reveal-css-group=""
      data-reveal-stagger={stagger}
      data-reveal-delay-children={n(delayChildren, 0)}
    >
      {children}
    </Component>
  );
}

/** One child of a RevealGroup. Timing comes from the group (plus its own delay). */
export function RevealItem({
  children,
  className,
  style,
  direction = "up",
  distance = DISTANCE,
  duration = DURATION,
  delay = 0,
  scaleFrom,
  as: Component = "div",
}: EntranceProps & { children: ReactNode; className?: string; style?: CSSProperties; as?: Tag }) {
  return (
    <Component
      className={className}
      style={{ ...style, ...hidden(direction, distance, scaleFrom) }}
      data-reveal=""
      data-reveal-css=""
      data-reveal-delay={n(delay, 0)}
      data-reveal-dur={n(duration, DURATION)}
    >
      {children}
    </Component>
  );
}

/** Headings: perspective(400px) translateY(30px) scale(1.1) rotateX(-80deg) → rest, 0.9s. */
export function FlipIn({
  as: Component = "h2",
  id,
  className,
  style,
  delay = 0,
  children,
}: {
  as?: Tag;
  id?: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Component
      id={id}
      className={className}
      style={{ transformOrigin: "50% 100%", ...style, opacity: 0, transform: "perspective(400px) translateY(30px) scale(1.1) rotateX(-80deg)" }}
      data-reveal=""
      data-reveal-css=""
      data-reveal-delay={n(delay, 0)}
      data-reveal-dur={0.9}
    >
      {children}
    </Component>
  );
}

const WORD_HIDDEN: CSSProperties = { opacity: 0, filter: "blur(10px)", transform: "translateY(30px) scale(1.1)" };

/**
 * A paragraph whose words blur in one after another (0.7s each, staggered).
 * Only plain strings are split; anything else enters as one block.
 */
export function BlurText({
  as: Component = "p",
  id,
  className,
  style,
  delay = 0.15,
  stagger = 0.025,
  children,
}: {
  as?: Tag;
  id?: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  children: ReactNode;
}) {
  if (typeof children !== "string") {
    return (
      <Component
        id={id}
        className={className}
        style={{ ...style, ...WORD_HIDDEN }}
        data-reveal=""
        data-reveal-css=""
        data-reveal-blur=""
        data-reveal-delay={n(delay, 0)}
        data-reveal-dur={0.7}
      >
        {children}
      </Component>
    );
  }
  const words = children.split(/\s+/).filter(Boolean);
  return (
    <Component
      id={id}
      className={className}
      style={style}
      data-reveal-group=""
      data-reveal-css-group=""
      data-reveal-stagger={stagger}
      data-reveal-delay-children={n(delay, 0)}
    >
      {words.map((word, i) => (
        <span key={i}>
          <span className="agx-word" style={WORD_HIDDEN} data-reveal="" data-reveal-css="" data-reveal-blur="" data-reveal-dur={0.7}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Component>
  );
}

/**
 * A photograph that flies in from a distance the first time it is a fifth on
 * screen, then rests exactly in place (1.2s). `side` mirrors the path. The
 * wrapper carries the layout and must not clip: put the rounded frame inside.
 */
export function FlyIn({
  side = "right",
  className,
  style,
  children,
}: {
  side?: "left" | "right";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const k = side === "left" ? -1 : 1;
  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: 0,
        transform: `perspective(1200px) translateX(${90 * k}px) translateY(-60px) scale(0.78) rotateY(${22 * k}deg) rotateZ(${-7 * k}deg)`,
      }}
      data-reveal=""
      data-reveal-css=""
      data-reveal-dur={1.2}
      data-reveal-amount={0.2}
    >
      {children}
    </div>
  );
}
