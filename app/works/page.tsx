import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, worksCollectionSchema } from "@/lib/schema";
import WorksClient from "./WorksClient";

export const metadata: Metadata = buildMetadata("works");

export default function WorksRoute() {
  return (
    <>
      {/*
        No separate WebPage node here: CollectionPage is already a WebPage, and
        declaring both against the same URL would give one @id two conflicting
        types.
      */}
      <JsonLd data={[worksCollectionSchema, breadcrumbSchema([{ name: "Portofolio", path: "/works" }])]} />
      <WorksClient />
    </>
  );
}
