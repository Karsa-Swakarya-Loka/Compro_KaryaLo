import type { Metadata } from "next";
import IndustryPage from "@/views/industry/IndustryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("industry", "id");

export default function Page() {
  return <IndustryPage lang="id" />;
}
