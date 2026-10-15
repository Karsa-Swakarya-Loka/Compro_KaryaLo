import type { Metadata } from "next";
import AboutPage from "@/views/about/AboutPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("about", "id");

export default function Page() {
  return <AboutPage lang="id" />;
}
