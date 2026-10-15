import JsonLd from "@/components/seo/JsonLd";
import { pageSchema, routeBreadcrumb } from "@/lib/schema";
import type { Locale } from "@/lib/i18n";
import ContactClient from "./ContactClient";

export default function ContactPage({ lang }: { lang: Locale }) {
  return (
    <>
      <JsonLd data={[pageSchema("ContactPage", "contact", lang), routeBreadcrumb(lang, "contact")]} />
      <ContactClient lang={lang} />
    </>
  );
}
