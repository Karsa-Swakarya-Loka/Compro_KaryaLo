import type { Transition } from "motion/react";

/** easeOutExpo — editorial "settle" for entrances, masks and layout moves. */
export const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Snappy, slightly damped spring for hover pills, magnetic pulls and tabs. */
export const SPRING_INTERACTIVE: Transition = { type: "spring", stiffness: 300, damping: 30 };

/** Modal / lightbox zoom. */
export const SPRING_MODAL: Transition = { type: "spring", stiffness: 350, damping: 28 };

/** Micro overshoot for chevrons and icons. */
export const SPRING_OVERSHOOT: Transition = { type: "spring", stiffness: 320, damping: 16 };

/** Long, cinematic reveal used by the hero. */
export const EDITORIAL: Transition = { duration: 1, ease: EASE_EXPO };
