import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import { BlurText, FlipIn } from "@/components/motion/Entrance";

/**
 * The Agenciex section header, used by every section on every page so the
 * site has one way of saying "a new part starts here", and one hierarchy:
 *
 *   badge   filled pill, fades up
 *   title   large, medium weight, flips up into place (FlipIn)
 *   intro   one light paragraph, words blur in (BlurText)
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
  as = "h2",
  id,
  className = "",
  children,
}: {
  badge?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  children?: ReactNode;
}) {
  const centred = align === "center";
  const dark = tone === "dark";
  return (
    <div className={`${centred ? "mx-auto items-center text-center" : "items-start"} flex max-w-4xl flex-col gap-5 ${className}`}>
      {badge && (
        <Reveal>
          <span className="badge-pill" data-tone={dark ? "dark" : undefined}>
            {badge}
          </span>
        </Reveal>
      )}
      <FlipIn as={as} id={id} className={`agx-h2 ${dark ? "!text-white" : ""}`}>
        {title}
      </FlipIn>
      {intro && <BlurText className={`agx-lede ${dark ? "!text-white/80" : ""}`}>{intro}</BlurText>}
      {children && <Reveal delay={0.2}>{children}</Reveal>}
    </div>
  );
}
