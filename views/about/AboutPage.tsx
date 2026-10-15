import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/lib/i18n";
import { pageSchema, routeBreadcrumb } from "@/lib/schema";
import AboutClient from "./AboutClient";

export default function AboutPage({ lang }: { lang: Locale }) {
  return (
    <>
      <JsonLd data={[pageSchema("AboutPage", "about", lang), routeBreadcrumb(lang, "about")]} />
      <AboutClient lang={lang} />
    </>
  );
}
