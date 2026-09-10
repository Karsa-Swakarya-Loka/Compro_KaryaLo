import { ArrowUpRight } from "lucide-react";

/**
 * Diagonal "exit / enter" arrow: on hover of the enclosing link or button the
 * arrow slides out top-right while a twin slides in from bottom-left.
 * Styles live in globals.css (`.arrow-swap`).
 */
export default function ArrowSwap({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span className="arrow-swap" aria-hidden="true">
      <ArrowUpRight className={`arrow-swap__a ${className}`} />
      <ArrowUpRight className={`arrow-swap__b ${className}`} />
    </span>
  );
}
