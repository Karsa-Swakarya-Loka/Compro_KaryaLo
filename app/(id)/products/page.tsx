import type { Metadata } from "next";
import ProductsPage from "@/views/products/ProductsPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("products", "id");

export default function Page() {
  return <ProductsPage lang="id" />;
}
