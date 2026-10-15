import HeroSection from "@/components/home/HeroSection";
import WhySection from "@/components/home/WhySection";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StudioSection from "@/components/home/StudioSection";
import ProblemsSection from "@/components/home/ProblemsSection";
import ProcessSection from "@/components/home/ProcessSection";
import TrustSection from "@/components/home/TrustSection";
import FAQSection from "@/components/home/FAQSection";
import ContactCTA from "@/components/home/ContactCTA";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/lib/i18n";
import { faqSchema, homePageSchema } from "@/lib/schema";

/**
 * The home page in the Cargon order (redesign, 2026-10-15), carrying
 * KaryaLo's own content:
 *
 *   hero slider → why KaryaLo (collage + principles) → services (expanding
 *   cards) → portfolio grid → studio band (commitments, team, coverage) →
 *   client problems (testimonial-style cards) → five stages → legal standing
 *   → FAQ → the closing blue band
 *
 * Cargon's testimonials, blog and percentage stats have no KaryaLo source yet,
 * so they are not invented: the problems take the testimonial shape without
 * names or stars, and testimonials render only once a client approves one.
 * Backgrounds alternate surface/white with one night band.
 */
export default function HomePage({ lang }: { lang: Locale }) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-white">
      <JsonLd data={[homePageSchema(lang), faqSchema(lang)]} />

      <HeroSection lang={lang} />
      <WhySection lang={lang} />
      <ServicesSection lang={lang} />
      <PortfolioSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <StudioSection lang={lang} />
      <ProblemsSection lang={lang} />
      <ProcessSection lang={lang} />
      <TrustSection lang={lang} />
      <FAQSection lang={lang} />
      <ContactCTA lang={lang} />
    </main>
  );
}
