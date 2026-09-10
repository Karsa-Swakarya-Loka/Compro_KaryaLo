import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, pageSchema } from "@/lib/schema";
import ContactClient from "./ContactClient";

export const metadata: Metadata = buildMetadata("contact");

export default function ContactRoute() {
  return (
    <>
      <JsonLd data={[pageSchema("ContactPage", "contact"), breadcrumbSchema([{ name: "Kontak", path: "/contact" }])]} />
      <ContactClient />
    </>
  );
}
