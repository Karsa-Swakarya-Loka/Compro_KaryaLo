import { ImageResponse } from "next/og";
import { portfolioData } from "@/data/portfolio";
import { siteConfig } from "@/config/site";

/**
 * A link preview card per case study, so a project pasted into WhatsApp shows
 * its own title instead of the generic site card. Rendered as PNG for the same
 * reason as the site-wide card: WebP previews do not render in every chat app.
 */

/** Render one card per project at build time rather than on first request. */
export function generateStaticParams() {
  return portfolioData.map((project) => ({ slug: project.slug }));
}

export const alt = `Studi kasus ${siteConfig.brandName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MIDNIGHT = "#1F2E5A";
const MIST = "#C9D6DF";
const PORCELAIN = "#F7F6F5";

export default async function CaseStudyOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioData.find((item) => item.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: MIDNIGHT,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -160,
            width: 640,
            height: 640,
            borderRadius: 640,
            background: "#2C4076",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: MIST,
            }}
          >
            {project?.type === "prototype" ? "Purwarupa Internal" : "Studi Kasus"}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#A9BBD8" }}>
            {project ? `${project.categoryLabel} · ${project.year}` : siteConfig.brandName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 940 }}>
          <div
            style={{
              display: "flex",
              fontSize: project && project.title.length > 44 ? 56 : 66,
              fontWeight: 700,
              lineHeight: 1.14,
              color: PORCELAIN,
            }}
          >
            {project?.title ?? "Portofolio proyek KaryaLo"}
          </div>
          {project ? (
            <div style={{ display: "flex", fontSize: 27, color: MIST, lineHeight: 1.4 }}>
              {project.summary.length > 130
                ? `${project.summary.slice(0, 127)}...`
                : project.summary}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #33456F",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: MIST }}>
            {siteConfig.brandName}
          </div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: PORCELAIN }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
