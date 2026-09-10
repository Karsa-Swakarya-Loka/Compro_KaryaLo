import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = buildMetadata("services");

export default function ServicesRoute() {
  return (
    <>
      <JsonLd data={[...servicesSchema, breadcrumbSchema([{ name: "Layanan", path: "/services" }])]} />
      <ServicesClient />
    </>
  );
}
