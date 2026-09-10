import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, pageSchema } from "@/lib/schema";
import AboutClient from "./AboutClient";

export const metadata: Metadata = buildMetadata("about");

export default function AboutRoute() {
  return (
    <>
      <JsonLd data={[pageSchema("AboutPage", "about"), breadcrumbSchema([{ name: "Tentang", path: "/about" }])]} />
      <AboutClient />
    </>
  );
}
