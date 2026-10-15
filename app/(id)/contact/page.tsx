import type { Metadata } from "next";
import ContactPage from "@/views/contact/ContactPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("contact", "id");

export default function Page() {
  return <ContactPage lang="id" />;
}
