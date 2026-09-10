"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { ArrowUpRight, Clock, Loader2, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { EASE_EXPO } from "@/components/motion/tokens";
import ArrowSwap from "@/components/motion/ArrowSwap";
import Reveal, { RevealGroup, RevealItem, revealVariants } from "@/components/motion/Reveal";
import { trackConversion } from "@/lib/analytics";

/*
  The channels card enters from the right and cascades its three rows. The rows
  are wrapped rather than animated directly: two of them are anchors that
  already lift on hover via a Tailwind transform, and an inline transform from
  motion would override that rule.
*/
const channelCardVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE_EXPO, staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const channelItemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE_EXPO } },
};

const DESCRIPTION_MAX = 3000;
/** Brief "preparing" beat so the button acknowledges the press before the preview lands. */
const PREPARE_DELAY_MS = 650;

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    service: "",
    budget: "Belum ditentukan",
    description: "",
  });

  const [preparedMessage, setPreparedMessage] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
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
    for (const fieldName of ["name", "description"]) {
      const field = form.elements.namedItem(fieldName) as HTMLInputElement | HTMLTextAreaElement;
      if (!field.value.trim()) {
        field.setCustomValidity("Isi bagian ini dengan teks, bukan hanya spasi.");
        field.reportValidity();
        return;
      }
    }
    const text = `Halo Tim KaryaLo,\n\nNama: ${formData.name.trim()}\nPerusahaan: ${formData.company.trim() || "-"}\nLayanan yang dibutuhkan: ${formData.service}\nPerkiraan anggaran: ${formData.budget}\n\nKebutuhan kami:\n${formData.description.trim()}`;
    /*
      The form cleared validation — that is the conversion. Only the fact is
      reported: no name, company, budget or brief ever leaves the page, because
      whatever consumes dataLayer later is a third-party processor.
    */
    trackConversion("lead_form_submit", { page: "/contact", location: "contact-form" });

    setIsPreparing(true);
    prepareTimer.current = window.setTimeout(() => {
      setPreparedMessage(text);
      setIsPreparing(false);
    }, PREPARE_DELAY_MS);
  };

  const descriptionLength = formData.description.length;
  const nearLimit = descriptionLength > DESCRIPTION_MAX * 0.9;

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-porcelain">
      {/* Header Canvas on #C9D6DF */}
      <section className="bg-mist border-b border-mist-border pb-14 md:pb-20 pt-8 md:pt-12 px-4 md:px-12">
        <div className="max-w-[66rem] mx-auto space-y-12">

          {/* CSS entrance, not motion: the h1 is the LCP element on this route. */}
          <div className="max-w-3xl space-y-6 pt-4">
            <h1 className="enter-up font-headline text-[clamp(2.5rem,5.5vw,4.5rem)] text-midnight font-normal leading-[1.08] tracking-tight">
              Ceritakan Kebutuhan <span className="italic font-light text-accent">Proyek Anda</span>
            </h1>

            <p style={{ "--i": 1 } as CSSProperties} className="enter-up font-story text-mist-ink text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              Ceritakan masalah yang mau diselesaikan atau ide sistem yang ada di kepala. Kami bantu petakan kebutuhannya dan beri perkiraan ruang lingkupnya, tanpa keharusan lanjut.
            </p>

            <div style={{ "--i": 2 } as CSSProperties} className="enter-up flex flex-wrap items-center gap-3 pt-2">
              <span className="font-meta text-xs font-semibold px-3.5 py-1.5 rounded-full bg-porcelain text-mist-ink shadow-sm">
                Biasanya dibalas &lt; 15 menit di jam kerja
              </span>
              <span className="font-meta text-xs font-semibold px-3.5 py-1.5 rounded-full bg-porcelain text-mist-ink shadow-sm">
                Siap tanda tangan NDA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Contact Grid */}
      <section className="py-20 md:py-28 px-4 md:px-12 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Form Column */}
          <Reveal distance={30} duration={0.75} className="lg:col-span-7 bg-porcelain p-5 sm:p-8 md:p-10 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
            <div className="space-y-1.5">
              <h2 className="font-story text-2xl md:text-3xl font-bold text-midnight">
                Formulir Kebutuhan Proyek
              </h2>
              <p className="font-story text-xs md:text-sm text-slate-600">
                Isi kebutuhan Anda, lalu tinjau pesan sebelum melanjutkan ke WhatsApp. Tanda * wajib diisi.
              </p>
            </div>

            <form onSubmit={handleSubmit} onChange={() => setPreparedMessage(null)} onInput={(event) => { const field = event.target; if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity(""); }} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="field space-y-1.5">
                  <label htmlFor="name" className="font-meta text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Nama Lengkap *
                  </label>
                  <input id="name" name="name" autoComplete="name" maxLength={120}
                    type="text"
                    required
                    placeholder="Contoh: Budi Pratama"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-porcelain border border-mist-border text-base font-story text-midnight focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                  />
                  <span className="field-line" aria-hidden="true" />
                </div>

                <div className="field space-y-1.5">
                  <label htmlFor="company" className="font-meta text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Nama Perusahaan / Organisasi
                  </label>
                  <input id="company" name="company" autoComplete="organization" maxLength={180}
                    type="text"
                    placeholder="Contoh: PT Maju Bersama"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-porcelain border border-mist-border text-base font-story text-midnight focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                  />
                  <span className="field-line" aria-hidden="true" />
                </div>
              </div>

              {/* Service Pillar Select */}
              <div className="field space-y-1.5">
                <label htmlFor="service" className="font-meta text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Layanan yang Dibutuhkan *
                </label>
                <select id="service" name="service" required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-porcelain border border-mist-border text-base font-story text-midnight focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                >
                  <option value="" disabled>Pilih layanan</option>
                  <option value="Website & aplikasi">
                    Website & aplikasi
                  </option>
                  <option value="Sistem internal (kasir, gudang, ERP)">
                    Sistem internal (kasir, gudang, ERP)
                  </option>
                  <option value="Desain UI/UX & identitas merek">
                    Desain UI/UX & identitas merek
                  </option>
                  <option value="Perangkat IoT & sistem pemantauan">
                    Perangkat IoT & sistem pemantauan
                  </option>
                  <option value="Gabungan beberapa layanan">
                    Gabungan beberapa layanan
                  </option>
                </select>
                <span className="field-line" aria-hidden="true" />
              </div>

              {/* Budget Range */}
              <div className="field space-y-1.5">
                <label htmlFor="budget" className="font-meta text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Perkiraan Anggaran
                </label>
                <select id="budget" name="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-porcelain border border-mist-border text-base font-story text-midnight focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                >
                  <option value="< Rp 25.000.000">&lt; Rp 25.000.000</option>
                  <option value="Rp 25.000.000 – Rp 50.000.000">Rp 25.000.000 – Rp 50.000.000</option>
                  <option value="Rp 50.000.000 – Rp 100.000.000">Rp 50.000.000 – Rp 100.000.000</option>
                  <option value="Rp 100.000.000 – Rp 250.000.000+">Rp 100.000.000 – Rp 250.000.000+</option>
                  <option value="Belum ditentukan">Belum ditentukan</option>
                </select>
                <span className="field-line" aria-hidden="true" />
              </div>

              {/* Project Description */}
              <div className="field space-y-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <label htmlFor="description" className="font-meta text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Ringkasan Kebutuhan Proyek *
                  </label>
                  <span
                    aria-hidden="true"
                    className={`font-meta text-[11px] tabular-nums transition-colors duration-300 ${
                      nearLimit ? "text-accent font-bold" : descriptionLength > 0 ? "text-mist-ink" : "text-slate-600"
                    }`}
                  >
                    {descriptionLength} / {DESCRIPTION_MAX}
                  </span>
                </div>
                <textarea id="description" name="description" maxLength={DESCRIPTION_MAX} aria-describedby="description-help"
                  required
                  rows={4}
                  placeholder="Ceritakan fitur yang dibutuhkan, alur kerjanya, atau target kapan mau dipakai..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-porcelain border border-mist-border text-base font-story text-midnight focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-y min-h-32"
                />
                <span className="field-line" aria-hidden="true" />
              </div>

              <p id="description-help" className="text-sm text-mist-ink">Sertakan tujuan, fitur utama, dan perkiraan waktu peluncuran. Maksimal 3.000 karakter.</p>

              <motion.button
                type="submit"
                disabled={isPreparing}
                aria-busy={isPreparing}
                whileTap={isPreparing ? undefined : { scale: 0.985 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full font-meta py-4 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-all shadow-lg shadow-midnight/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-100 disabled:cursor-progress"
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
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Menyiapkan Pesan…</span>
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
                      <span>Siapkan Pesan WhatsApp</span>
                      <ArrowSwap />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="flex items-center justify-center gap-2 text-slate-600 font-story text-xs pt-1">
                <ShieldCheck className="w-4 h-4 text-midnight" />
                <span>Isi pesan Anda kami perlakukan sebagai informasi rahasia.</span>
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
                    <div ref={previewRef} tabIndex={-1} role="region" aria-label="Pratinjau pesan WhatsApp" className="message-preview space-y-4 rounded-2xl border border-mist-border bg-matte p-5">
                      <p role="status" className="font-story font-bold text-midnight">Pesan siap ditinjau. Belum ada pesan yang dikirim.</p>
                      <p className="whitespace-pre-wrap break-words text-sm text-mist-ink">{preparedMessage}</p>
                      <a href={getWhatsAppUrl(preparedMessage)} target="_blank" rel="noopener noreferrer" className="nav-cta inline-flex">
                        Lanjutkan ke WhatsApp <ArrowUpRight aria-hidden="true" size={16} />
                      </a>
                      <p className="text-sm text-mist-ink">WhatsApp terbuka di tab baru. Tinjau pesan lalu tekan Kirim di sana.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          {/* Contact Details & Legal Information Column */}
          <RevealGroup className="lg:col-span-5 space-y-6" stagger={0.12}>

            {/* Direct Channels Card on Mist */}
            <motion.div variants={channelCardVariants} data-reveal="" className="p-7 rounded-3xl bg-mist border border-mist-border space-y-6 shadow-md">
              <div>
                <h2 className="font-story text-xl font-bold text-midnight">
                  Kontak Langsung
                </h2>
              </div>

              <div className="space-y-4 font-story text-sm text-mist-ink">
                <motion.div variants={channelItemVariants}>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-porcelain border border-white flex items-center gap-3.5 shadow-sm group hover:bg-midnight hover:border-midnight-light hover:shadow-xl hover:shadow-midnight/25 hover:-translate-y-1.5 transition-[background-color,border-color,box-shadow,translate] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-matte text-midnight flex items-center justify-center shrink-0 transition-[background-color,color,scale] duration-[400ms] group-hover:bg-white/15 group-hover:text-mist group-hover:scale-110">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-meta text-xs font-bold text-midnight block group-hover:text-white transition-colors duration-[400ms]">
                        WhatsApp Bisnis Resmi
                      </span>
                      <span className="text-xs text-slate-600 transition-colors duration-[400ms] group-hover:text-porcelain/80">Kanal paling cepat dibalas</span>
                    </div>
                  </a>
                </motion.div>

                <motion.div variants={channelItemVariants}>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="p-4 rounded-2xl bg-porcelain border border-white flex items-center gap-3.5 shadow-sm group hover:bg-midnight hover:border-midnight-light hover:shadow-xl hover:shadow-midnight/25 hover:-translate-y-1.5 transition-[background-color,border-color,box-shadow,translate] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 transition-[background-color,color,scale] duration-[400ms] group-hover:bg-white/15 group-hover:text-mist group-hover:scale-110">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-meta text-xs font-bold text-midnight block group-hover:text-white transition-colors duration-[400ms]">
                        Email
                      </span>
                      <span className="text-xs text-slate-600 transition-colors duration-[400ms] group-hover:text-porcelain/80">{siteConfig.email}</span>
                    </div>
                  </a>
                </motion.div>

                <motion.div variants={channelItemVariants} className="p-4 rounded-2xl bg-porcelain border border-white flex items-center gap-3.5 shadow-sm group hover:bg-midnight hover:border-midnight-light hover:shadow-xl hover:shadow-midnight/25 hover:-translate-y-1.5 transition-[background-color,border-color,box-shadow,translate] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 transition-[background-color,color,scale] duration-[400ms] group-hover:bg-white/15 group-hover:text-mist group-hover:scale-110">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-meta text-xs font-bold text-midnight block transition-colors duration-[400ms] group-hover:text-white">
                      Jam Kerja
                    </span>
                    <span className="text-xs text-slate-600 transition-colors duration-[400ms] group-hover:text-porcelain/80">{siteConfig.workingHours}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Studio Location Card */}
            <RevealItem distance={26} duration={0.65} className="group/loc p-7 rounded-3xl bg-midnight text-white space-y-4 shadow-xl border border-midnight-light hover:bg-midnight-light hover:border-mist/30 transition-[background-color,border-color,box-shadow,translate] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
              <h2 className="font-story text-xl font-bold text-porcelain">
                PT Karsa Swakarya Loka
              </h2>

              <p className="font-story text-xs md:text-sm text-midnight-muted leading-relaxed transition-colors duration-[400ms] group-hover/loc:text-porcelain/90">
                {siteConfig.address}
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="font-meta text-[11px] text-midnight-muted transition-colors duration-[400ms] group-hover/loc:text-porcelain/80">NIB: {siteConfig.nib}</span>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-meta text-xs font-bold text-mist hover:text-white transition-colors duration-[400ms] group-hover/loc:text-white inline-flex items-center gap-1"
                >
                  <span>Lihat di Maps</span>
                  <ArrowSwap className="w-3.5 h-3.5" />
                </a>
              </div>
            </RevealItem>

          </RevealGroup>

        </div>
      </section>

      {/* Preparation & coverage — the two things people ask before writing in. */}
      <section className="bg-mist border-t border-mist-border px-4 md:px-12 py-16 md:py-20">
        <div className="max-w-[66rem] mx-auto space-y-10">
          <Reveal className="max-w-2xl space-y-4">
            <h2 className="font-headline text-[clamp(1.75rem,3.5vw,2.75rem)] text-midnight font-normal leading-tight tracking-tight">
              Sebelum Mengirim Pesan
            </h2>
            <p className="font-story text-mist-ink text-base md:text-lg leading-relaxed">
              Tidak perlu menyiapkan dokumen apa pun. Tapi kalau tiga hal ini sudah ada gambarannya, obrolan pertama biasanya langsung nyambung dan perkiraan ruang lingkupnya bisa kami berikan lebih cepat.
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.1}>
            <motion.article variants={revealVariants({ distance: 22 })} data-reveal="" className="p-6 rounded-2xl bg-porcelain border border-white shadow-sm space-y-2 group hover:bg-midnight hover:border-midnight-light hover:shadow-xl hover:shadow-midnight/25 hover:-translate-y-1.5 transition-[background-color,border-color,box-shadow,translate] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
              <h3 className="font-story text-base font-bold text-midnight transition-colors duration-[400ms] group-hover:text-white">Masalah yang mau diselesaikan</h3>
              <p className="font-story text-sm text-slate-600 leading-relaxed transition-colors duration-[400ms] group-hover:text-porcelain/80">
                Cukup ceritakan kondisi sekarang dan bagian mana yang paling merepotkan. Dari situ kami bantu petakan sistem seperti apa yang sebenarnya Anda butuhkan.
              </p>
            </motion.article>

            <motion.article variants={revealVariants({ distance: 22 })} data-reveal="" className="p-6 rounded-2xl bg-porcelain border border-white shadow-sm space-y-2 group hover:bg-midnight hover:border-midnight-light hover:shadow-xl hover:shadow-midnight/25 hover:-translate-y-1.5 transition-[background-color,border-color,box-shadow,translate] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
              <h3 className="font-story text-base font-bold text-midnight transition-colors duration-[400ms] group-hover:text-white">Target waktu pemakaian</h3>
              <p className="font-story text-sm text-slate-600 leading-relaxed transition-colors duration-[400ms] group-hover:text-porcelain/80">
                Kapan sistemnya diharapkan sudah bisa dipakai. Tanggal perkiraan pun cukup, karena angka ini yang menentukan urutan pengerjaan dan tahapannya.
              </p>
            </motion.article>

            <motion.article variants={revealVariants({ distance: 22 })} data-reveal="" className="p-6 rounded-2xl bg-porcelain border border-white shadow-sm space-y-2 group hover:bg-midnight hover:border-midnight-light hover:shadow-xl hover:shadow-midnight/25 hover:-translate-y-1.5 transition-[background-color,border-color,box-shadow,translate] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
              <h3 className="font-story text-base font-bold text-midnight transition-colors duration-[400ms] group-hover:text-white">Sistem yang sudah dipakai</h3>
              <p className="font-story text-sm text-slate-600 leading-relaxed transition-colors duration-[400ms] group-hover:text-porcelain/80">
                Aplikasi kasir, spreadsheet, atau alat lain yang sedang berjalan. Sebisa mungkin kami sambungkan, bukan diganti semua dari awal.
              </p>
            </motion.article>
          </RevealGroup>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-5" stagger={0.1}>
            <motion.article variants={revealVariants({ distance: 22 })} data-reveal="" className="p-6 rounded-2xl bg-porcelain border border-white shadow-sm space-y-2 group hover:bg-midnight hover:border-midnight-light hover:shadow-xl hover:shadow-midnight/25 hover:-translate-y-1.5 transition-[background-color,border-color,box-shadow,translate] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
              <h3 className="font-story text-base font-bold text-midnight transition-colors duration-[400ms] group-hover:text-white">Kami melayani dari mana saja</h3>
              <p className="font-story text-sm text-slate-600 leading-relaxed transition-colors duration-[400ms] group-hover:text-porcelain/80">
                Studio dan bengkel perangkat kami ada di Jatisampurna, Kota Bekasi, dan kami biasa bertemu langsung dengan klien di Jabodetabek. Untuk kota lain, seluruh prosesnya berjalan daring; kami hanya datang ke lokasi saat pemasangan perangkat IoT.
              </p>
            </motion.article>

            <motion.article variants={revealVariants({ distance: 22 })} data-reveal="" className="p-6 rounded-2xl bg-porcelain border border-white shadow-sm space-y-3 group hover:bg-midnight hover:border-midnight-light hover:shadow-xl hover:shadow-midnight/25 hover:-translate-y-1.5 transition-[background-color,border-color,box-shadow,translate] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
              <h3 className="font-story text-base font-bold text-midnight transition-colors duration-[400ms] group-hover:text-white">Ingin lihat dulu sebelum bertanya</h3>
              <p className="font-story text-sm text-slate-600 leading-relaxed transition-colors duration-[400ms] group-hover:text-porcelain/80">
                Wajar saja. Halaman layanan menjelaskan apa saja yang kami kerjakan, dan halaman portofolio memuat proyek yang sudah berjalan beserta hasilnya.
              </p>
              <div className="flex flex-wrap gap-4 pt-1">
                <Link href="/services" className="section-link inline-flex">
                  Lihat layanan
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-accent" />
                </Link>
                <Link href="/works" className="section-link inline-flex">
                  Lihat portofolio
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-accent" />
                </Link>
              </div>
            </motion.article>
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}
