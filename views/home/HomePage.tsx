import HeroSection from "@/components/home/HeroSection";
import AdvantageSection from "@/components/home/AdvantageSection";
import Giant from "@/components/home/Giant";
import ServicesSection from "@/components/home/ServicesSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactCTA from "@/components/home/ContactCTA";
import JsonLd from "@/components/seo/JsonLd";
import { homeCopy } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { faqSchema, homePageSchema } from "@/lib/schema";

/**
 * The home page, kept to the point (2026-11-17): each topic appears once and
 * hands off to the page that covers it in full.
 *
 *   hero          the work itself (the 3D ring of projects → /portfolio) and the four commitments
 *   why KaryaLo   the goal and how we differ from the usual IT vendor → /about
 *   services      three fields + support, one line each → /services
 *   industries    the blue band → /industry
 *   process       five stages, one line each → /about#cara-kerja
 *   FAQ           questions only, answers on demand
 *   closing       marquee bands and the conversation panel
 *
 * Removed because they repeated another section or page: the projects table
 * (the hero ring already shows the work), the team band (/about), the client
 * situations (/industry, /services) and the legal cards (/about, the footer).
 */
export default function HomePage({ lang }: { lang: Locale }) {
  return (
    <main id="main-content" tabIndex={-1} className="home-main flex min-h-screen flex-col">
      <JsonLd data={[homePageSchema(lang), faqSchema(lang)]} />

      <HeroSection lang={lang} />
      <AdvantageSection lang={lang} />
      <Giant text={homeCopy[lang].hero.category} />
      <ServicesSection lang={lang} />
      <IndustriesSection lang={lang} />
      <ProcessSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <FAQSection lang={lang} />
      <ContactCTA lang={lang} />
    </main>
  );
}
