import type { Metadata } from "next";
import CaseStudyPage, { caseStudyMetadata, caseStudyStaticParams } from "@/views/portfolio/CaseStudyPage";

/** Any slug outside `generateStaticParams` is a 404, never an on-demand render. */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return caseStudyMetadata("id", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyPage lang="id" slug={slug} />;
}
