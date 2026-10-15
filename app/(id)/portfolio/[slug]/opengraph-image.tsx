import { caseStudyImageParams, renderCaseStudyImage } from "@/views/portfolio/caseStudyImage";

/** The case study's link preview card, in Indonesian. */
export const alt = "Studi kasus KaryaLo Digital Solution";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Render one card per project at build time rather than on first request. */
export function generateStaticParams() {
  return caseStudyImageParams();
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderCaseStudyImage("id", slug);
}
