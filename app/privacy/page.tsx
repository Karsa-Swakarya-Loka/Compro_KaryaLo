import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, pageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata("privacy");

/**
 * The contact form promises confidentiality and routes submissions through a
 * wa.me deep link. That data flow needs to be written down somewhere the visitor
 * can read it, which is what this page is for.
 */
const sections = [
  {
    heading: "Data yang Kami Kumpulkan",
    body: "Kami hanya menyimpan data yang Anda kirim sendiri lewat formulir proyek atau kanal komunikasi resmi kami: nama, nama perusahaan atau organisasi, layanan yang dibutuhkan, perkiraan anggaran, dan ringkasan kebutuhan proyek. Situs ini tidak memakai cookie pelacak pihak ketiga dan tidak menjalankan skrip iklan.",
  },
  {
    heading: "Bagaimana Formulir Proyek Bekerja",
    body: "Formulir di halaman Kontak tidak mengirim data ke server kami. Isian Anda dirangkai jadi teks pesan, ditampilkan dulu untuk Anda tinjau, lalu diteruskan ke WhatsApp saat Anda menekan tombol lanjutan. Pesannya baru benar-benar terkirim setelah Anda menekan tombol kirim di dalam WhatsApp. Artinya data itu diproses WhatsApp sesuai kebijakan privasi mereka, dan sampai ke kami sebagai percakapan biasa.",
  },
  {
    heading: "Penggunaan Data",
    body: "Data yang Anda kirim hanya kami pakai untuk menjawab permintaan Anda, menyusun perkiraan ruang lingkup pekerjaan, dan menyiapkan penawaran atau Surat Perjanjian Kerja (SPK) bila kerja samanya berlanjut. Kami tidak menjual, menyewakan, atau menukar data Anda ke pihak mana pun.",
  },
  {
    heading: "Kerahasiaan & NDA",
    body: "Informasi teknis dan rencana bisnis yang Anda sampaikan kami perlakukan sebagai informasi rahasia. Kalau butuh perlindungan formal, kami siap menandatangani Non-Disclosure Agreement (NDA) sebelum diskusi teknis dimulai.",
  },
  {
    heading: "Penyimpanan & Retensi",
    body: "Riwayat percakapan dan dokumen proyek kami simpan selama kerja sama berlangsung, ditambah jangka waktu yang diwajibkan aturan perpajakan dan administrasi perusahaan di Indonesia. Data yang sudah tidak terikat kewajiban itu bisa Anda minta hapus.",
  },
  {
    heading: "Hak Anda",
    body: "Anda berhak meminta akses, perbaikan, atau penghapusan data pribadi yang kami simpan, dan bisa berhenti dihubungi kapan saja. Kirim permintaannya ke email resmi kami, dan akan kami tanggapi di hari kerja.",
  },
  {
    heading: "Layanan Pihak Ketiga",
    body: "Situs ini memuat tautan ke WhatsApp dan Google Maps. Begitu Anda membuka tautan itu, yang berlaku adalah kebijakan privasi masing-masing layanan tersebut, dan kami tidak mengendalikan pemrosesan data yang terjadi di sana.",
  },
];

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen flex flex-col bg-porcelain">
      <JsonLd
        data={[
          pageSchema("WebPage", "privacy"),
          breadcrumbSchema([{ name: "Kebijakan Privasi", path: "/privacy" }]),
        ]}
      />

      <section className="bg-mist border-b border-mist-border px-4 md:px-12 pt-8 md:pt-12 pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto space-y-5">
          <nav aria-label="Remah roti" className="font-meta text-xs font-semibold text-mist-ink flex items-center gap-1.5">
            <Link href="/" className="hover:text-midnight transition-colors">Beranda</Link>
            <ChevronRight aria-hidden="true" className="w-3.5 h-3.5" />
            <span className="text-midnight" aria-current="page">Kebijakan Privasi</span>
          </nav>
          <h1 className="font-headline text-[clamp(2rem,4.5vw,3.5rem)] text-midnight font-normal leading-[1.1] tracking-tight">
            Kebijakan Privasi
          </h1>
          <p className="font-story text-mist-ink text-lg leading-relaxed">
            Bagaimana {siteConfig.companyName} mengumpulkan, memakai, dan menjaga data yang Anda kirimkan lewat situs ini.
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

          <article className="space-y-3 p-6 rounded-2xl bg-mist/30 border border-mist">
            <h2 className="font-headline text-2xl text-midnight font-normal">Menghubungi Kami</h2>
            <p className="font-story text-slate-700 text-base leading-relaxed">
              Pertanyaan soal kebijakan ini bisa dikirim ke{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-accent hover:underline">
                {siteConfig.email}
              </a>{" "}
              atau ke alamat kantor kami di {siteConfig.address}.
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
