import type { Metadata } from "next";
import PortfolioPage from "@/views/portfolio/PortfolioPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("portfolio", "id");

export default function Page() {
  return <PortfolioPage lang="id" />;
}
