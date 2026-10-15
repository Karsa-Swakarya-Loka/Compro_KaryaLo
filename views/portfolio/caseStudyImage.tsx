import { ImageResponse } from "next/og";
import { getPortfolio, portfolioSlugs } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import { portfolioCopy } from "@/content/portfolio-page";
import { type Locale, localePath } from "@/lib/i18n";

/**
 * A link preview card per case study, so a project pasted into WhatsApp shows
 * its own title instead of the generic site card. Rendered as PNG for the same
 * reason as the site-wide card: WebP previews do not render in every chat app.
 *
 * The card speaks the page's language. The `opengraph-image.tsx` and
 * `twitter-image.tsx` files under app/(id)/portfolio/[slug] and
 * app/(en)/en/portfolio/[slug] bind the language and call this.
 */

/** Render one card per project at build time rather than on first request. */
export function caseStudyImageParams() {
  return portfolioSlugs.map((slug) => ({ slug }));
}

export const caseStudyImageSize = { width: 1200, height: 630 };

// The logo blue, its cyan, and white: the Cargon-style palette (2026-10-15).
const MIDNIGHT = "#1D469D";
const MIST = "#9FE3EC";
const PORCELAIN = "#FFFFFF";

export function renderCaseStudyImage(lang: Locale, slug: string) {
  const copy = portfolioCopy[lang].og;
  const project = getPortfolio(lang).find((item) => item.slug === slug);
  // The URL on the card points at the page being shared, in its own language.
  const domain = siteConfig.url.replace(/^https?:\/\//, "");
  const footerUrl = lang === "id" ? domain : `${domain}${localePath(lang, "/")}`;

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
            background: "#163A85",
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
            {project?.type === "prototype" ? copy.kickerPrototype : copy.kickerClient}
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
            {project?.title ?? copy.fallbackTitle}
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
            borderTop: "2px solid #4A6CB5",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: MIST }}>
            {siteConfig.brandName}
          </div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: PORCELAIN }}>
            {footerUrl}
          </div>
        </div>
      </div>
    ),
    caseStudyImageSize,
  );
}

