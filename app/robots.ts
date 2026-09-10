import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Crawler policy.
 *
 * Retrieval crawlers are allowed. They fetch a page in response to a live user
 * question and can cite it with a link back, which is exactly the visibility
 * this site wants. Bulk training-corpus crawlers are disallowed: they produce
 * no attribution and no referral traffic.
 *
 * Google-Extended is allowed deliberately. It only governs training of Gemini
 * models, and it does not control eligibility for Google Search or AI Overviews
 * either way, so blocking it would cost goodwill without protecting anything.
 */
const RETRIEVAL_CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "DuckDuckBot",
];

const TRAINING_ONLY_CRAWLERS = ["CCBot", "anthropic-ai", "cohere-ai", "Bytespider", "Diffbot", "Omgilibot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...RETRIEVAL_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
      ...TRAINING_ONLY_CRAWLERS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
