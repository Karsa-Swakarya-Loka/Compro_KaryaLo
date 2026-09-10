import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteFeatures } from "@/config/site";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, pageSchema, productsSchema } from "@/lib/schema";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = buildMetadata("products");

export default function ProductsRoute() {
  if (!siteFeatures.enableProductsSection) notFound();

  return (
    <>
      <JsonLd data={[pageSchema("WebPage", "products"), breadcrumbSchema([{ name: "Produk", path: "/products" }]), productsSchema]} />
      <ProductsClient />
    </>
  );
}
