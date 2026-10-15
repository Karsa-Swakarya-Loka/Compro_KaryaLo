import type { Metadata } from "next";
import ServicesPage from "@/views/services/ServicesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("services", "id");

export default function Page() {
  return <ServicesPage lang="id" />;
}
