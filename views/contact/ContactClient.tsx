"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig, siteText, buildWhatsAppMessage, getWhatsAppUrlFromText, whatsappUrl } from "@/config/site";
import { contactCopy } from "@/content/contact-page";
import { commonCopy } from "@/content/common";
import { getServices, supportServicesData } from "@/data/services";
import { type Locale, localePath } from "@/lib/i18n";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarClock,
  CircleCheck,
  Clock,
  Compass,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Plug,
  ShieldCheck,
  Target,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_EXPO } from "@/components/motion/tokens";
import ArrowSwap from "@/components/motion/ArrowSwap";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import ProfileDownload from "@/components/ui/ProfileDownload";
import { trackConversion } from "@/lib/analytics";

const DESCRIPTION_MAX = 3000;
/** Brief "preparing" beat so the button acknowledges the press before the preview lands. */
const PREPARE_DELAY_MS = 650;

/* Cargon form fields: soft grey fills, the brand blue on focus. */
const fieldClass =
  "w-full px-4 py-3.5 rounded-xl bg-surface border border-line text-base text-ink focus:outline-none focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/15";

const labelClass = "block type-label text-ink";

/* Cargon's contact info card: an icon circle, a title, a line of detail. */
const infoCardClass = "group flex items-start gap-4 lg:flex-1 rounded-3xl border border-line bg-white p-6 shadow-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";
/** On desktop each card grows by an equal share of the column's spare height. */
const infoItemClass = "lg:flex lg:flex-auto lg:flex-col";
const infoIconClass =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand transition-colors duration-300";

const BEFORE_ICONS = [Target, CalendarClock, Plug];

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
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-white">
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
          <MessageSquare aria-hidden="true" className="h-5 w-5" />
          <span>{copy.hero.whatsappCta}</span>
          <ArrowSwap />
        </a>
        <ProfileDownload lang={lang} />
        <p className="type-small text-body">
          {copy.hero.emailLead}{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand transition-colors">
            {siteConfig.email}
          </a>
        </p>
        <ul className="flex basis-full flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1">
          {copy.hero.badges.map((badge) => (
            <li key={badge} className="flex items-center gap-2 type-small text-ink">
              <CircleCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
              {badge}
            </li>
          ))}
        </ul>
      </PageBanner>

      {/* Cargon's contact block: the message form on the left, contact cards stacked on the right. */}
      <section className="section-standard bg-white px-4 md:px-12">
        <div className="mx-auto grid max-w-[72rem] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">

          <Reveal direction="left" className="space-y-6 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8 md:p-10 lg:col-span-7">
            <div className="space-y-2">
              <h2 className="type-card-title-lg text-ink">{copy.form.heading}</h2>
              <p className="type-small text-body">{copy.form.intro}</p>
            </div>

            <form onSubmit={handleSubmit} onChange={() => { setPreparedMessage(null); setEmailSent(false); }} onInput={(event) => { const field = event.target; if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity(""); }} className="space-y-5">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="field space-y-2">
                  <label htmlFor="name" className={labelClass}>{copy.form.nameLabel}</label>
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
                  <label htmlFor="company" className={labelClass}>{copy.form.companyLabel}</label>
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="field space-y-2">
                  <label htmlFor="service" className={labelClass}>{copy.form.serviceLabel}</label>
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
                  <label htmlFor="budget" className={labelClass}>{copy.form.budgetLabel}</label>
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
                  <label htmlFor="description" className={labelClass}>{copy.form.descriptionLabel}</label>
                  <span
                    aria-hidden="true"
                    className={`type-meta transition-colors duration-300 ${nearLimit ? "text-brand font-semibold" : "text-body"}`}
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

              {/* The section's one solid button: it hands the brief to WhatsApp. */}
              <motion.button
                type="submit"
                disabled={isPreparing}
                aria-busy={isPreparing}
                whileTap={isPreparing ? undefined : { scale: 0.985 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="btn btn-lg btn-primary w-full disabled:opacity-100 disabled:cursor-progress"
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

              <div className="flex items-center justify-center gap-2 type-small text-body">
                <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
                <span>{copy.form.confidentiality}</span>
              </div>

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
                    <div ref={previewRef} tabIndex={-1} role="region" aria-label={copy.form.previewLabel} className="message-preview space-y-4 rounded-2xl border border-line bg-surface p-5">
                      <p role="status" className="type-card-title text-ink">{emailSent ? copy.form.sentStatus : copy.form.previewStatus}</p>
                      <p className="whitespace-pre-wrap break-words type-small text-body">{preparedMessage}</p>
                      <a href={getWhatsAppUrlFromText(preparedMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        {copy.form.continueToWhatsapp} <ArrowUpRight aria-hidden="true" size={16} />
                      </a>
                      <p className="type-small text-body">{emailSent ? copy.form.sentHint : copy.form.previewHint}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          {/*
            Direct channels and the registered office, as stacked contact cards.
            On desktop the heading drops to the form heading's line (the card's
            padding) and the cards share out the rest, so both columns end together.
          */}
          <div className="space-y-5 lg:col-span-5 lg:flex lg:flex-col lg:gap-5 lg:space-y-0 lg:pt-10">
            <Reveal direction="right">
              <h2 className="type-card-title-lg text-ink">{copy.channels.heading}</h2>
            </Reveal>

            <RevealGroup className="space-y-5 lg:flex lg:flex-1 lg:flex-col lg:gap-5 lg:space-y-0" stagger={0.1}>
              <RevealItem direction="right" className={infoItemClass}>
                <a href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer" className={`${infoCardClass} hover:-translate-y-1 hover:shadow-lift`}>
                  <span className={`${infoIconClass} group-hover:bg-brand group-hover:text-white`}>
                    <MessageSquare aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <span className="flex-1 space-y-1">
                    <span className="block type-card-title text-ink group-hover:text-brand transition-colors">{copy.channels.whatsappTitle}</span>
                    <span className="block type-small text-body">{copy.channels.whatsappSubtitle}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
                </a>
              </RevealItem>

              <RevealItem direction="right" className={infoItemClass}>
                <a href={`mailto:${siteConfig.email}`} className={`${infoCardClass} hover:-translate-y-1 hover:shadow-lift`}>
                  <span className={`${infoIconClass} group-hover:bg-brand group-hover:text-white`}>
                    <Mail aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <span className="flex-1 space-y-1">
                    <span className="block type-card-title text-ink group-hover:text-brand transition-colors">{copy.channels.emailTitle}</span>
                    <span className="block break-all type-small text-body">{siteConfig.email}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
                </a>
              </RevealItem>

              <RevealItem direction="right" className={infoItemClass}>
                <div className={infoCardClass}>
                  <span className={infoIconClass}>
                    <Clock aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <span className="space-y-1">
                    <span className="block type-card-title text-ink">{copy.channels.hoursTitle}</span>
                    <span className="block type-small text-body">{text.workingHours}</span>
                  </span>
                </div>
              </RevealItem>

              {/* Registered office. Static card with its Maps link. */}
              <RevealItem direction="right" className={infoItemClass}>
                <div className={infoCardClass}>
                  <span className={infoIconClass}>
                    <Building2 aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <span className="space-y-1">
                    <span className="block type-card-title text-ink">{siteConfig.companyName}</span>
                    <span className="block type-small text-body">{siteConfig.address}</span>
                    <span className="block type-meta text-body pt-1">NIB: {siteConfig.nib}</span>
                    <a
                      href={siteConfig.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link text-brand"
                    >
                      <MapPin aria-hidden="true" className="h-4 w-4" />
                      {copy.channels.mapsLink}
                    </a>
                  </span>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>

        </div>
      </section>

      {/* Preparation & coverage — the two things people ask before writing in. */}
      <section className="section-support bg-surface px-4 md:px-12">
        <div className="mx-auto max-w-[72rem] space-y-12">
          <SectionHeading badge={copy.before.badge} title={copy.before.heading} intro={copy.before.intro} />

          <RevealGroup className="fit-grid fit-md-2 fit-lg-3" stagger={0.1}>
            {copy.before.cards.map((card, index) => {
              const Icon = BEFORE_ICONS[index % BEFORE_ICONS.length];
              return (
                <RevealItem key={card.title} className="h-full">
                  <article className="flex h-full flex-col gap-4 rounded-3xl bg-white p-7 shadow-card">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <h3 className="type-card-title text-ink">{card.title}</h3>
                    <p className="type-body-card text-body">{card.body}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <RevealGroup className="fit-grid fit-md-2" stagger={0.1}>
            <RevealItem direction="left" className="h-full">
              <article className="flex h-full gap-5 rounded-3xl bg-white p-7 shadow-card">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <MapPin aria-hidden="true" className="h-6 w-6" />
                </span>
                <div className="space-y-2">
                  <h3 className="type-card-title text-ink">{copy.before.coverage.title}</h3>
                  <p className="type-body-card text-body">{copy.before.coverage.body}</p>
                </div>
              </article>
            </RevealItem>

            <RevealItem direction="right" className="h-full">
              <article className="flex h-full gap-5 rounded-3xl bg-white p-7 shadow-card">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Compass aria-hidden="true" className="h-6 w-6" />
                </span>
                <div className="space-y-2">
                  <h3 className="type-card-title text-ink">{copy.before.browse.title}</h3>
                  <p className="type-body-card text-body">{copy.before.browse.body}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <Link href={localePath(lang, "/services")} className="text-link text-brand">
                      {copy.before.browse.services}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                    <Link href={localePath(lang, "/portfolio")} className="text-link text-brand">
                      {copy.before.browse.portfolio}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}

