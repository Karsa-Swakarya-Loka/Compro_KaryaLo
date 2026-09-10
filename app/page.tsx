import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TeamSection from "@/components/home/TeamSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import ProcessSection from "@/components/home/ProcessSection";
import TrustSection from "@/components/home/TrustSection";
import FAQSection from "@/components/home/FAQSection";
import ContactCTA from "@/components/home/ContactCTA";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema, homePageSchema } from "@/lib/schema";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-porcelain">
      {/*
        The home page carries no breadcrumb, so the page-level entity and the
        FAQ block are declared here instead of in the layout.
      */}
      <JsonLd data={[homePageSchema, faqSchema]} />

      {/* 1. Hero Section (Full-width Image with Navy Overlay) */}
      <HeroSection />

      {/* 2. Services Section (Pure Porcelain Canvas with 3 Pillar Cards) */}
      <ServicesSection />

      {/* 3. Team & Studio Section (Image Background with Hover Zoom & Transparent Overlay) */}
      <TeamSection />

      {/* 4. Portfolio Section (#C9D6DF Mist Canvas with Anti-Bleed Browser Frames & Modal) */}
      <PortfolioSection />

      {/* 5. Process Section (Pure Porcelain Canvas with 5-Stage Value Engineering Timeline) */}
      <ProcessSection />

      {/* 6. Legal & Trust Section (#C9D6DF Mist Canvas with 4 Corporate Standing Cards) */}
      <TrustSection />

      {/* 7. FAQ Section (Pure Porcelain Canvas with B2B Procurement Accordion) */}
      <FAQSection />

      {/* 8. Contact CTA Section (#C9D6DF Canvas with Midnight Conversion Card) */}
      <ContactCTA />
    </main>
  );
}
