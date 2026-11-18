import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { commonCopy } from "@/content/common";
import { homeCopy } from "@/content/home";
import { type Locale, localePath } from "@/lib/i18n";
import Giant from "@/components/home/Giant";
import { BlurText, FlipIn } from "@/components/motion/Entrance";

/**
 * The inner-page header, after Agenciex's About / Services / Contact pages:
 * a left-aligned filled badge with the page name, a very large medium-weight
 * title, a light one-line lede, and under it the huge faded phrase drifting
 * across the dot grid. `lede` and `children` (actions) follow the title, for
 * pages whose first job is an action (the contact page puts its WhatsApp
 * button here). The breadcrumb stays, small, under the actions.
 *
 * The title is the page's H1 and its LCP element, so it enters with the CSS
 * `.enter-up` animation rather than a hydration-bound reveal.
 */
export default function PageBanner({
  lang,
  title,
  crumbs,
  lede,
  badge,
  children,
}: {
  lang: Locale;
  title: ReactNode;
  /** Trail after "Beranda/Home"; the last item is the current page. Paths are language-neutral. */
  crumbs: { name: string; path?: string }[];
  lede?: ReactNode;
  /** The pill over the title; defaults to the current page's name. */
  badge?: string;
  children?: ReactNode;
}) {
  const home = commonCopy[lang].home;
  const current = badge ?? crumbs[crumbs.length - 1]?.name;
  return (
    <section className="agx-page-head relative overflow-hidden">
      <div className="agx-wrap pb-8 pt-28 md:pb-12 md:pt-36">
        {current && <span className="enter-up badge-pill">{current}</span>}
        <FlipIn as="h1" className="agx-h1" delay={0.1}>{title}</FlipIn>
        {lede && <BlurText className="agx-sub" delay={0.35}>{lede}</BlurText>}
        {children && (
          <div style={{ "--i": 3 } as CSSProperties} className="enter-up mt-7 flex flex-wrap items-center gap-3">
            {children}
          </div>
        )}
        <nav aria-label={lang === "en" ? "Breadcrumb" : "Jejak halaman"} style={{ "--i": 4 } as CSSProperties} className="enter-up mt-8">
          <ol className="flex flex-wrap items-center gap-1.5 type-small text-body">
            <li>
              <Link href={localePath(lang, "/")} className="transition-colors hover:text-brand">{home}</Link>
            </li>
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1;
              return (
                <li key={`${crumb.name}-${index}`} className="flex items-center gap-1.5">
                  <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
                  {last || !crumb.path ? (
                    <span aria-current={last ? "page" : undefined} className="font-medium text-ink">{crumb.name}</span>
                  ) : (
                    <Link href={localePath(lang, crumb.path)} className="transition-colors hover:text-brand">{crumb.name}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
      <Giant text={homeCopy[lang].hero.category} />
    </section>
  );
}
