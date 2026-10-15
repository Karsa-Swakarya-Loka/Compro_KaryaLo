import SiteShell, { rootMetadata, rootViewport } from "@/components/layout/SiteShell";

/** Root layout for the English site, served under `/en`. */
export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
