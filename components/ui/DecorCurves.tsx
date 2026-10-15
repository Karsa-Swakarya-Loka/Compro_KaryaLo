/**
 * Cargon's thin blue curves at the left edge of the hero and the page banners.
 * Two strokes, drawn once on load (`.decor-curve` in globals.css), purely
 * decorative: hidden from assistive technology and from pointer events.
 */
export default function DecorCurves({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`decor-curve pointer-events-none absolute ${className}`}
      viewBox="0 0 220 520"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M-40 10 C 120 120, 150 260, 40 360 S -10 500, 60 540" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
      <path d="M-60 60 C 90 170, 110 290, 10 390 S -40 520, 30 560" stroke="var(--color-cyan)" strokeWidth="1.25" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
