import type { Metadata } from "next";
import ProductsPage from "@/views/products/ProductsPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("products", "en");

export default function Page() {
  return <ProductsPage lang="en" />;
}
