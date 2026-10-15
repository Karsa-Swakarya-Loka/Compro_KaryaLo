import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { commonCopy } from "@/content/common";
import { type Locale, localePath } from "@/lib/i18n";
import DecorCurves from "@/components/ui/DecorCurves";

/**
 * The Cargon inner-page banner: a light band under the floating navbar with
 * the page title centred and a breadcrumb beneath it. Optional `lede` and
 * `children` (actions) follow, for pages whose first job is an action — the
 * contact page puts its WhatsApp button here.
 *
 * The title is the page's H1 and its LCP element, so it enters with the CSS
 * `.enter-up` animation rather than a hydration-bound reveal.
 */
export default function PageBanner({
  lang,
  title,
  crumbs,
  lede,
  children,
}: {
  lang: Locale;
  title: ReactNode;
  /** Trail after "Beranda/Home"; the last item is the current page. Paths are language-neutral. */
  crumbs: { name: string; path?: string }[];
  lede?: ReactNode;
  children?: ReactNode;
}) {
  const home = commonCopy[lang].home;
  return (
    <section className="relative overflow-hidden bg-surface px-4 md:px-12 pt-32 pb-12 md:pt-40 md:pb-16">
      <DecorCurves className="-left-6 top-6 h-[24rem] w-auto md:h-[30rem]" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center gap-5">
        <h1 className="enter-up type-display-page text-ink">{title}</h1>
        <nav aria-label={lang === "en" ? "Breadcrumb" : "Jejak halaman"} style={{ "--i": 1 } as CSSProperties} className="enter-up">
          <ol className="flex flex-wrap items-center justify-center gap-1.5 type-intro text-ink">
            <li>
              <Link href={localePath(lang, "/")} className="hover:text-brand transition-colors">{home}</Link>
            </li>
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1;
              return (
                <li key={`${crumb.name}-${index}`} className="flex items-center gap-1.5">
                  <ChevronRight aria-hidden="true" className="h-4 w-4 text-ink" strokeWidth={2.5} />
                  {last || !crumb.path ? (
                    <span aria-current={last ? "page" : undefined} className="font-semibold">{crumb.name}</span>
                  ) : (
                    <Link href={localePath(lang, crumb.path)} className="hover:text-brand transition-colors">{crumb.name}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        {lede && (
          <p style={{ "--i": 2 } as CSSProperties} className="enter-up type-lede text-body max-w-[60ch]">{lede}</p>
        )}
        {children && (
          <div style={{ "--i": 3 } as CSSProperties} className="enter-up flex flex-wrap items-center justify-center gap-3 pt-1">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
