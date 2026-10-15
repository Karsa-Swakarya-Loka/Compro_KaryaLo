import type { Metadata } from "next";
import PrivacyPage from "@/views/legal/PrivacyPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("privacy", "en");

export default function Page() {
  return <PrivacyPage lang="en" />;
}
