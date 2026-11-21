"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, siteText, buildWhatsAppMessage, getWhatsAppUrlFromText, whatsappUrl } from "@/config/site";
import { contactCopy } from "@/content/contact-page";
import { commonCopy } from "@/content/common";
import { getServices, supportServicesData } from "@/data/services";
import { type Locale, localePath } from "@/lib/i18n";
import { ArrowRight, ArrowUpRight, CircleCheck, Loader2, MapPin, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_EXPO } from "@/components/motion/tokens";
import ArrowSwap from "@/components/motion/ArrowSwap";
import { BlurText, FlipIn, FlyIn } from "@/components/motion/Entrance";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import ProfileDownload from "@/components/ui/ProfileDownload";
import { trackConversion } from "@/lib/analytics";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const DESCRIPTION_MAX = 3000;
/** Brief "preparing" beat so the button acknowledges the press before the preview lands. */
const PREPARE_DELAY_MS = 650;

/* Fields: white on the blush panel, 16px text (no zoom on phones), the brand blue on focus. */
const fieldClass =
  "w-full min-h-[3.25rem] px-4 py-3.5 rounded-2xl bg-white border border-line text-base text-ink placeholder:text-body/70 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15";

const labelClass = "block type-label text-ink";

/** The template's small uppercase grey label over a large value. */
const rowLabel = "text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-body";

/**
 * Labels carry their own " *" in the copy; it is drawn here as a brand-blue
 * mark (hidden from screen readers, which get the `required` attribute).
 */
function FieldLabel({ htmlFor, text, required = false }: { htmlFor: string; text: string; required?: boolean }) {
  const bare = text.replace(/\s*\*\s*$/, "");
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {bare}
      {required && <span aria-hidden="true" className="ml-1 text-brand">*</span>}
    </label>
  );
}

export default function ContactClient({ lang }: { lang: Locale }) {
  const copy = contactCopy[lang];
  const text = siteText[lang];
  const crumb = commonCopy[lang].nav.find((link) => link.href === "/contact")?.label ?? copy.hero.titleAccent;

  /* The three fields by the names the Services page uses, then the
     maintenance line, then the two catch-alls for a mixed or unscoped brief. */
  const serviceOptions = [
    ...getServices(lang).map((pillar) => pillar.name),
    ...supportServicesData[lang].filter((item) => item.id === "maintenance").map((item) => item.name),
    copy.form.serviceCombined,
    copy.form.serviceUnsure,
  ];
  const budgetOptions = [...copy.form.budgetRanges, copy.form.budgetUndecided];

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    service: "",
    budget: copy.form.budgetUndecided,
    description: "",
  });

  const [preparedMessage, setPreparedMessage] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const prepareTimer = useRef<number | null>(null);

  useEffect(() => {
    if (preparedMessage) previewRef.current?.focus();
  }, [preparedMessage]);

  useEffect(() => {
    return () => {
      if (prepareTimer.current) window.clearTimeout(prepareTimer.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPreparing) return;
    const form = e.currentTarget as HTMLFormElement;
    for (const fieldName of ["name", "company", "description"]) {
      const field = form.elements.namedItem(fieldName) as HTMLInputElement | HTMLTextAreaElement;
      if (!field.value.trim()) {
        field.setCustomValidity(copy.form.whitespaceError);
        field.reportValidity();
        return;
      }
    }
    const message = buildWhatsAppMessage(lang, {
      name: formData.name,
      company: formData.company,
      service: formData.service,
      budget: formData.budget,
      note: formData.description,
    });
    /*
      The form cleared validation — that is the conversion. Only the fact is
      reported: no name, company, budget or brief ever leaves the page, because
      whatever consumes dataLayer later is a third-party processor.
    */
    trackConversion("lead_form_submit", { page: localePath(lang, "/contact"), location: "contact-form" });

    setIsPreparing(true);
    setEmailSent(false);
    const website = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    const startedAt = Date.now();
    /* The brief goes to the company inbox. If mail is unavailable the visitor
       still gets the WhatsApp preview, so a brief is never lost. */
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, website }),
    })
      .then((response) => response.ok)
      .catch(() => false)
      .then((sent) => {
        const wait = Math.max(0, PREPARE_DELAY_MS - (Date.now() - startedAt));
        prepareTimer.current = window.setTimeout(() => {
          setEmailSent(sent);
          setPreparedMessage(message);
          setIsPreparing(false);
        }, wait);
      });
  };

  const descriptionLength = formData.description.length;
  const nearLimit = descriptionLength > DESCRIPTION_MAX * 0.9;

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col">
      {/*
        The page's one solid button sits in the banner: someone who came to
        /contact to talk should not have to scroll past a form to find the
        fastest channel. The form below is the second route, for a written brief.
      */}
      <PageBanner
        lang={lang}
        title={<>{copy.hero.titleLead} <span className="text-brand">{copy.hero.titleAccent}</span></>}
        crumbs={[{ name: crumb }]}
        lede={copy.hero.lede}
      >
        <a
          href={whatsappUrl(lang)}
          target="_blank"
          rel="noopener noreferrer"
          data-wa-primary=""
          className="btn btn-lg btn-primary group"
        >
          <WhatsAppIcon size={20} />
          <span>{copy.hero.whatsappCta}</span>
          <ArrowSwap />
        </a>
        <ProfileDownload lang={lang} />
        <ul className="flex basis-full flex-wrap items-center gap-x-6 gap-y-2 pt-2">
          {copy.hero.badges.map((badge) => (
            <li key={badge} className="flex items-center gap-2 type-small text-ink">
              <CircleCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
              {badge}
            </li>
          ))}
        </ul>
      </PageBanner>

      {/* Agenciex's contact block: one large photograph, then label / value pairs. */}
      <section aria-labelledby="channels-title" className="pb-12 md:pb-16">
        <div className="agx-wrap">
          <FlyIn side="left">
            <div className="agx-photo relative aspect-[4/3] sm:aspect-[16/8] lg:aspect-[16/6]">
              <Image src="/images/contact/desk.webp" alt="" fill sizes="(min-width: 1344px) 1264px, 100vw" className="object-cover" style={{ objectPosition: "50% 55%" }} />
            </div>
          </FlyIn>

          <h2 id="channels-title" className="sr-only">{copy.channels.heading}</h2>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-12 lg:grid-cols-4" stagger={0.08}>
            <RevealItem className="space-y-3">
              <p className={rowLabel}>{copy.channels.whatsappTitle}</p>
              <p className="agx-underline font-medium">
                <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" className="inline-block whitespace-nowrap">
                  {siteConfig.phone}
                </a>
              </p>
              <p className="type-small text-body">{copy.channels.whatsappSubtitle}</p>
            </RevealItem>

            <RevealItem className="space-y-3">
              <p className={rowLabel}>{copy.channels.emailTitle}</p>
              <p className="agx-underline font-medium">
                <a href={`mailto:${siteConfig.email}`} className="inline-block break-all">
                  {siteConfig.email}
                </a>
              </p>
            </RevealItem>

            <RevealItem className="space-y-3">
              <p className={rowLabel}>{copy.channels.hoursTitle}</p>
              <ul className="space-y-1 text-[1.0625rem] leading-snug text-ink">
                {text.workingHours.split("|").map((line) => (
                  <li key={line}>{line.trim()}</li>
                ))}
              </ul>
            </RevealItem>

            <RevealItem className="space-y-3">
              <p className={rowLabel}>{siteConfig.companyName}</p>
              <p className="text-[1.0625rem] leading-snug text-ink">{siteConfig.address}</p>
              <p className="type-meta text-body">NIB: {siteConfig.nib}</p>
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link text-brand">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                <span>{copy.channels.mapsLink}</span>
              </a>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* The written brief: header on the left, the form in a blush panel on the right. */}
      <section aria-labelledby="form-title" className="agx-section !pt-0">
        <div className="agx-wrap grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-5 lg:col-span-5 lg:pt-4">
            <FlipIn id="form-title" className="agx-h2 max-w-[14ch]">{copy.form.heading}</FlipIn>
            <BlurText className="agx-lede">{copy.form.intro}</BlurText>
            <Reveal delay={0.2} className="flex items-start gap-2.5 type-small text-body">
              <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>{copy.form.confidentiality}</span>
            </Reveal>
          </div>

          <Reveal className="agx-card lg:col-span-7">
            <form onSubmit={handleSubmit} onChange={() => { setPreparedMessage(null); setEmailSent(false); }} onInput={(event) => { const field = event.target; if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity(""); }} className="space-y-5">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="field space-y-2">
                  <FieldLabel htmlFor="name" text={copy.form.nameLabel} required />
                  <input id="name" name="name" autoComplete="name" maxLength={120}
                    type="text"
                    required
                    placeholder={copy.form.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={fieldClass}
                  />
                  <span className="field-line" aria-hidden="true" />
                </div>

                <div className="field space-y-2">
                  <FieldLabel htmlFor="company" text={copy.form.companyLabel} required />
                  <input id="company" name="company" autoComplete="organization" maxLength={180} required
                    type="text"
                    placeholder={copy.form.companyPlaceholder}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={fieldClass}
                  />
                  <span className="field-line" aria-hidden="true" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="field space-y-2">
                  <FieldLabel htmlFor="service" text={copy.form.serviceLabel} required />
                  <select id="service" name="service" required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={fieldClass}
                  >
                    <option value="" disabled>{copy.form.servicePlaceholder}</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className="field-line" aria-hidden="true" />
                </div>

                <div className="field space-y-2">
                  <FieldLabel htmlFor="budget" text={copy.form.budgetLabel} />
                  <select id="budget" name="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={fieldClass}
                  >
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className="field-line" aria-hidden="true" />
                </div>
              </div>

              <div className="field space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <FieldLabel htmlFor="description" text={copy.form.descriptionLabel} required />
                  <span
                    aria-hidden="true"
                    className={`type-meta tabular-nums transition-colors duration-300 ${nearLimit ? "text-brand font-semibold" : "text-body"}`}
                  >
                    {descriptionLength} / {DESCRIPTION_MAX}
                  </span>
                </div>
                <textarea id="description" name="description" maxLength={DESCRIPTION_MAX} aria-describedby="description-help"
                  required
                  rows={5}
                  placeholder={copy.form.descriptionPlaceholder}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${fieldClass} min-h-36 resize-y`}
                />
                <span className="field-line" aria-hidden="true" />
              </div>

              <p id="description-help" className="type-small text-body">{copy.form.descriptionHelp}</p>

              {/*
                The panel's one solid button hands the brief over. Once the
                preview is up, its "Continue to WhatsApp" becomes the solid
                one and this steps back to an outline.
              */}
              <motion.button
                type="submit"
                disabled={isPreparing}
                aria-busy={isPreparing}
                whileTap={isPreparing ? undefined : { scale: 0.985 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`btn btn-lg w-full disabled:opacity-100 disabled:cursor-progress ${preparedMessage ? "btn-secondary" : "btn-primary"}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isPreparing ? (
                    <motion.span
                      key="preparing"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: EASE_EXPO }}
                    >
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>{copy.form.preparing}</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: EASE_EXPO }}
                    >
                      <span>{copy.form.submit}</span>
                      <ArrowSwap />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence initial={false}>
                {preparedMessage && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, height: 0, y: 12 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE_EXPO }}
                    className="overflow-hidden"
                  >
                    <div ref={previewRef} tabIndex={-1} role="region" aria-label={copy.form.previewLabel} className="message-preview space-y-4 rounded-2xl border border-line bg-white p-5">
                      <p role="status" className="type-card-title text-ink">{emailSent ? copy.form.sentStatus : copy.form.previewStatus}</p>
                      <p className="whitespace-pre-wrap break-words type-small text-body">{preparedMessage}</p>
                      <a href={getWhatsAppUrlFromText(preparedMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        <WhatsAppIcon size={18} />
                        {copy.form.continueToWhatsapp} <ArrowUpRight aria-hidden="true" size={16} />
                      </a>
                      <p className="type-small text-body">{emailSent ? copy.form.sentHint : copy.form.previewHint}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Before you write: the three things worth knowing, then coverage and where to look. */}
      <section aria-labelledby="before-title" className="agx-section !pt-0">
        <div className="agx-wrap space-y-12 md:space-y-14">
          <SectionHeading id="before-title" badge={copy.before.badge} title={copy.before.heading} intro={copy.before.intro} />

          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.1}>
            {copy.before.cards.map((card, index) => (
              <RevealItem key={card.title} className="h-full">
                <article className="agx-card flex h-full flex-col gap-5">
                  <span aria-hidden="true" className="agx-panel-num text-ink">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-[1.375rem] font-medium leading-snug tracking-[-0.02em] text-ink">{card.title}</h3>
                  <p className="type-body text-body">{card.body}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.1}>
            <RevealItem className="h-full">
              <article className="agx-card flex h-full flex-col gap-4">
                <h3 className="text-[1.375rem] font-medium leading-snug tracking-[-0.02em] text-ink">{copy.before.coverage.title}</h3>
                <p className="type-body text-body">{copy.before.coverage.body}</p>
              </article>
            </RevealItem>

            <RevealItem className="h-full">
              <article className="agx-card flex h-full flex-col gap-4">
                <h3 className="text-[1.375rem] font-medium leading-snug tracking-[-0.02em] text-ink">{copy.before.browse.title}</h3>
                <p className="type-body text-body">{copy.before.browse.body}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                  <Link href={localePath(lang, "/services")} className="btn btn-dark">
                    <span>{copy.before.browse.services}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href={localePath(lang, "/portfolio")} className="text-link text-brand">
                    <span>{copy.before.browse.portfolio}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}
