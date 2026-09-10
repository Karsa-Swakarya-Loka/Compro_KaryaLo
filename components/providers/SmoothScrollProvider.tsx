"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";

/** easeOutExpo, mirrors the motion easing so scroll and UI settle the same way. */
const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        easing: easeOutExpo,
        smoothWheel: true,
        autoRaf: true,
        anchors: { offset: -96 },
        respectReducedMotion: true,
      }}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
