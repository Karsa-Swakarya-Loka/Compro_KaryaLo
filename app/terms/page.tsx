import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { processSteps } from "@/data/process";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, pageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata("terms");

/**
 * Written from the commitments the site already makes elsewhere: the five-stage
 * process in data/process.ts, the IP handover promise, and the milestone payment
 * structure described in the FAQ. Nothing here invents a new commercial term.
 */
const sections = [
  {
    heading: "Ruang Lingkup Kerja Sama",
    body: "Setiap kerja sama diikat lewat Surat Perjanjian Kerja (SPK) resmi yang memuat ruang lingkup pekerjaan, daftar hasil yang diserahkan, jadwal, dan nilai kontrak. Permintaan di luar ruang lingkup dibahas dan dihitung dulu sebagai adendum, bukan dikerjakan diam-diam lalu ditagihkan di akhir.",
  },
  {
    heading: "Tahapan Pengerjaan",
    body: "Proyek dijalankan melalui lima tahap yang sama: pemetaan kebutuhan dan rancangan sistem, purwarupa dan uji coba awal, pengerjaan bertahap dengan demo berkala, pengujian mutu dan keamanan, lalu serah terima. Klien mendapat akses ke server uji coba untuk meninjau kemajuan pekerjaan di setiap tahap.",
  },
  {
    heading: "Termin Pembayaran",
    body: "Pembayaran dilakukan bertahap mengikuti termin yang dicek bersama, bukan lunas di muka. Setiap termin disertai invoice resmi ber-NPWP perusahaan. Selama PT Karsa Swakarya Loka belum berstatus Pengusaha Kena Pajak (PKP), tagihan tidak dikenai PPN dan tidak disertai Faktur Pajak. Bila status ini berubah, ketentuan barunya kami sampaikan sebelum termin berikutnya ditagih.",
  },
  {
    heading: "Hak Kekayaan Intelektual",
    body: "Seluruh hak cipta atas hasil pekerjaan menjadi milik klien setelah Berita Acara Serah Terima (BAST) ditandatangani dan pembayaran diselesaikan. Yang diserahkan mencakup repositori Git, struktur basis data, akses server, skema perangkat, dan file desain. Tidak ada biaya lisensi lanjutan, dan klien bebas melanjutkan pengembangannya dengan tim lain.",
  },
  {
    heading: "Garansi & Dukungan",
    body: "Setiap penyerahan pekerjaan disertai masa garansi perbaikan bug sesuai ketentuan di dalam SPK. Garansi berlaku untuk fungsi yang tidak berjalan sebagaimana disepakati. Yang tidak termasuk: penambahan fitur baru, perubahan ruang lingkup, dan kerusakan akibat perubahan oleh pihak lain setelah serah terima.",
  },
  {
    heading: "Kerahasiaan",
    body: "Kami siap menandatangani Non-Disclosure Agreement (NDA) sebelum pembahasan teknis dimulai. Informasi bisnis, data operasional, dan rancangan sistem klien kami perlakukan sebagai informasi rahasia, selama maupun setelah masa kerja sama.",
  },
  {
    heading: "Penggunaan Materi Portofolio",
    body: "Pekerjaan klien hanya kami tampilkan di portofolio setelah mendapat persetujuan. Kalau klien meminta kerahasiaan penuh, proyeknya tidak ditampilkan sama sekali, atau ditampilkan tanpa menyebut nama klien.",
  },
  {
    heading: "Badan Hukum & Penyelesaian Perselisihan",
    body: `Kerja sama dilaksanakan oleh ${siteConfig.companyName} (NIB ${siteConfig.nib}, KBLI ${siteConfig.kbli}), badan usaha yang terdaftar resmi melalui OSS Republik Indonesia. Perselisihan diselesaikan terlebih dahulu melalui musyawarah, dan bila diperlukan diteruskan sesuai forum hukum yang disepakati di dalam SPK.`,
  },
];

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-porcelain">
      <JsonLd
        data={[pageSchema("WebPage", "terms"), breadcrumbSchema([{ name: "Syarat & Ketentuan", path: "/terms" }])]}
      />

      <section className="bg-mist border-b border-mist-border px-4 md:px-12 pt-8 md:pt-12 pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto space-y-5">
          <nav aria-label="Remah roti" className="font-meta text-xs font-semibold text-mist-ink flex items-center gap-1.5">
            <Link href="/" className="hover:text-midnight transition-colors">Beranda</Link>
            <ChevronRight aria-hidden="true" className="w-3.5 h-3.5" />
            <span className="text-midnight" aria-current="page">Syarat & Ketentuan</span>
          </nav>
          <h1 className="font-headline text-[clamp(2rem,4.5vw,3.5rem)] text-midnight font-normal leading-[1.1] tracking-tight">
            Syarat & Ketentuan Layanan
          </h1>
          <p className="font-story text-mist-ink text-lg leading-relaxed">
            Ketentuan umum kerja sama proyek bersama {siteConfig.brandName}. Ketentuan khusus tiap proyek mengikuti SPK yang ditandatangani kedua pihak.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-12 py-16 md:py-20">
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((section) => (
            <article key={section.heading} className="space-y-3">
              <h2 className="font-headline text-2xl md:text-3xl text-midnight font-normal">{section.heading}</h2>
              <p className="font-story text-slate-700 text-base leading-relaxed">{section.body}</p>
            </article>
          ))}

          <article className="space-y-4">
            <h2 className="font-headline text-2xl md:text-3xl text-midnight font-normal">Ringkasan Lima Tahap</h2>
            <ol className="space-y-3">
              {processSteps.map((step) => (
                <li key={step.step} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-200/90">
                  <span className="font-headline text-2xl text-accent shrink-0">{step.step}</span>
                  <div className="space-y-1">
                    <h3 className="font-story text-base font-bold text-midnight leading-snug">{step.title}</h3>
                    <p className="font-story text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <article className="space-y-3 p-6 rounded-2xl bg-mist/30 border border-mist">
            <h2 className="font-headline text-2xl text-midnight font-normal">Ada yang Ingin Ditanyakan?</h2>
            <p className="font-story text-slate-700 text-base leading-relaxed">
              Untuk meninjau SPK, NDA, atau dokumen legal perusahaan, hubungi kami di{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-accent hover:underline">
                {siteConfig.email}
              </a>
              .
            </p>
            <Link href="/contact" className="section-link inline-flex">
              Halaman Kontak
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-accent" />
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
