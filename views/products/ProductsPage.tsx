import { notFound } from "next/navigation";
import { siteFeatures } from "@/config/site";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/lib/i18n";
import { pageSchema, productsSchema, routeBreadcrumb } from "@/lib/schema";
import ProductsClient from "./ProductsClient";

/** /products and /en/products. Metadata is exported by the route wrappers. */
export default function ProductsPage({ lang }: { lang: Locale }) {
  if (!siteFeatures.enableProductsSection) notFound();

  return (
    <>
      <JsonLd data={[pageSchema("WebPage", "products", lang), routeBreadcrumb(lang, "products"), productsSchema(lang)]} />
      <ProductsClient lang={lang} />
    </>
  );
}
