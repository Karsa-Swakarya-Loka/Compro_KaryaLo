import { Download } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n";

const LABEL: Record<Locale, { button: string; link: string; fileHint: string }> = {
  id: {
    button: "Unduh Profil Perusahaan",
    link: "Unduh Profil Perusahaan (PDF)",
    fileHint: "PDF, 10 halaman",
  },
  en: {
    button: "Download Company Profile",
    link: "Download Company Profile (PDF)",
    fileHint: "PDF, 10 pages",
  },
};

/**
 * Link to the company profile PDF. `button` is a secondary pill for banners and
 * CTAs; `link` is a quiet text link for the footer.
 */
export default function ProfileDownload({
  lang,
  variant = "button",
  className = "",
}: {
  lang: Locale;
  variant?: "button" | "link";
  className?: string;
}) {
  const text = LABEL[lang];
  const common = {
    href: siteConfig.companyProfilePdf,
    download: "Company-Profile-KaryaLo.pdf",
    type: "application/pdf",
  };

  if (variant === "link") {
    return (
      <a {...common} className={`inline-flex items-center gap-2 transition-colors ${className || "text-body hover:text-brand"}`}>
        <Download aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
        <span>{text.link}</span>
      </a>
    );
  }

  return (
    <a {...common} aria-label={`${text.button} (${text.fileHint})`} className={`btn btn-lg btn-secondary group ${className}`}>
      <Download aria-hidden="true" className="h-5 w-5" />
      <span>{text.button}</span>
    </a>
  );
}
