import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * The link preview card for every route that does not supply its own.
 *
 * The site's hero photo was previously reused as the OG image. It is a 2816px
 * WebP, and WebP previews still fail to render in WhatsApp — the channel this
 * business actually gets shared in. This renders a real 1200x630 PNG at build
 * time instead, at the exact ratio the platforms crop to.
 *
 * No custom font is loaded on purpose: `ImageResponse` only accepts ttf, otf
 * and woff, and the brand faces ship as woff2.
 */

export const alt = `${siteConfig.brandName} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MIDNIGHT = "#1F2E5A";
const MIST = "#C9D6DF";
const PORCELAIN = "#F7F6F5";

export default function OpengraphImage() {
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
        {/* A soft mist wash in the corner, echoing the site's dominant pair. */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -180,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: "#2C4076",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 44,
              borderRadius: 8,
              background: MIST,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: MIST,
            }}
          >
            {siteConfig.brandName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.15,
              color: PORCELAIN,
            }}
          >
            Website, aplikasi, dan perangkat IoT yang dipakai sehari-hari.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: MIST, lineHeight: 1.4 }}>
            Studio teknologi dan desain di Kota Bekasi.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid #33456F`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: MIST }}>
            {siteConfig.companyName}
          </div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: PORCELAIN }}>
            karyalo.id
          </div>
        </div>
      </div>
    ),
    size,
  );
}
