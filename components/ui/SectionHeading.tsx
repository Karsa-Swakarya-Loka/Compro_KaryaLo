import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";

/**
 * The Cargon section header: a small pill badge, the section title, and one
 * line of intro, centred over the content. Every page section uses it, so the
 * site has one way of saying "a new part starts here".
 *
 * `align="left"` is for split layouts (text beside an image), where the header
 * belongs to its column instead of the page.
 */
export default function SectionHeading({
  badge,
  title,
  intro,
  align = "center",
  tone = "light",
  as: Tag = "h2",
  className = "",
  children,
}: {
  badge?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
  children?: ReactNode;
}) {
  const centred = align === "center";
  return (
    <Reveal className={`${centred ? "mx-auto text-center items-center" : "items-start"} flex flex-col gap-4 max-w-3xl ${className}`}>
      {badge && (
        <span className="badge-pill" data-tone={tone === "dark" ? "dark" : undefined}>
          {badge}
        </span>
      )}
      <Tag className={`type-section-title ${tone === "dark" ? "text-white" : "text-ink"}`}>{title}</Tag>
      {intro && (
        <p className={`type-intro max-w-[60ch] ${tone === "dark" ? "text-midnight-muted" : "text-body"}`}>{intro}</p>
      )}
      {children}
    </Reveal>
  );
}
