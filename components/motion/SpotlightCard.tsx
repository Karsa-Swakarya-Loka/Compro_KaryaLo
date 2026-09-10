"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card whose 1px border lights up around the cursor (see `.spotlight-card` in
 * globals.css). Position is written straight to CSS custom properties so
 * pointer moves never re-render React.
 */
export default function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={handleMove} className={`spotlight-card ${className ?? ""}`}>
      {children}
    </div>
  );
}
