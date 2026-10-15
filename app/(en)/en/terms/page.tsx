import type { Metadata } from "next";
import TermsPage from "@/views/legal/TermsPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("terms", "en");

export default function Page() {
  return <TermsPage lang="en" />;
}
