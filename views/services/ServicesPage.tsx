import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/lib/i18n";
import { routeBreadcrumb, servicesSchema } from "@/lib/schema";
import ServicesClient from "./ServicesClient";

/** /services and /en/services. Metadata is exported by the route wrappers. */
export default function ServicesPage({ lang }: { lang: Locale }) {
  return (
    <>
      <JsonLd data={[...servicesSchema(lang), routeBreadcrumb(lang, "services")]} />
      <ServicesClient lang={lang} />
    </>
  );
}
