import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { commonCopy } from "@/content/common";
import PageBanner from "@/components/ui/PageBanner";
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

/** The Cargon page banner on its own: heading, breadcrumb, a line of help, and two ways out. */
export default function NotFoundView({ lang }: { lang: Locale }) {
  const copy = commonCopy[lang].notFound;
  return (
    <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col bg-white">
      <PageBanner lang={lang} title={copy.heading} crumbs={[{ name: copy.title }]} lede={copy.body}>
        {/* No conversation to start here, so both ways out are secondary. */}
        <Link href={localePath(lang, "/")} className="btn btn-secondary">
          {copy.home}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
        <Link href={localePath(lang, "/services")} className="text-link text-brand">
          {copy.services}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </PageBanner>
    </main>
  );
}
