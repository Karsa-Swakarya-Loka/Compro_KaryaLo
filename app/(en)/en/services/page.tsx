import type { Metadata } from "next";
import ServicesPage from "@/views/services/ServicesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("services", "en");

export default function Page() {
  return <ServicesPage lang="en" />;
}
