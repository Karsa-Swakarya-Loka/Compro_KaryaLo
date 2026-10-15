import SiteShell, { rootMetadata, rootViewport } from "@/components/layout/SiteShell";

/** Root layout for the Indonesian site, served without a language prefix. */
export const metadata = rootMetadata("id");
export const viewport = rootViewport;

export default function IndonesianLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="id">{children}</SiteShell>;
}
