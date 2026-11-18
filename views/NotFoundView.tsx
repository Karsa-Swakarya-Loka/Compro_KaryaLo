import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { commonCopy } from "@/content/common";
import { BlurText, FlipIn } from "@/components/motion/Entrance";
import { type Locale, localePath } from "@/lib/i18n";

/**
 * A 404 has nothing worth ranking, and letting it into the index would put an
 * empty page under the brand name. It gets its own title so the tab is not
 * mistaken for the home page, and an explicit no-index.
 */
export function notFoundMetadata(lang: Locale): Metadata {
  const copy = commonCopy[lang].notFound;
  return {
    title: copy.title,
    description: copy.description,
    robots: { index: false, follow: true },
  };
}

/**
 * Agenciex's 404: a huge faded "404" on the dot grid, the heading, one line of
 * help, and a dark pill back home. No conversation to start here, so no solid
 * blue button.
 */
export default function NotFoundView({ lang }: { lang: Locale }) {
  const copy = commonCopy[lang].notFound;
  return (
    <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
      <section className="agx-wrap flex flex-1 flex-col items-center justify-center pb-20 pt-32 text-center md:pb-28 md:pt-40">
        <p
          aria-hidden="true"
          className="enter-up select-none text-[clamp(8rem,4rem+22vw,20rem)] font-bold leading-[0.85] tracking-[-0.06em] text-[#EDF2F9]"
        >
          404
        </p>
        <FlipIn as="h1" className="agx-h2 -mt-[0.35em] max-w-[16ch]" delay={0.1}>
          {copy.heading}
        </FlipIn>
        <BlurText className="agx-lede mx-auto mt-5" delay={0.3}>{copy.body}</BlurText>
        <div className="enter-up mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-6" style={{ "--i": 3 } as CSSProperties}>
          <Link href={localePath(lang, "/")} className="btn btn-lg btn-dark">
            <span>{copy.home}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href={localePath(lang, "/services")} className="text-link text-brand">
            <span>{copy.services}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
