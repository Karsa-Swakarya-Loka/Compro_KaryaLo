# Compro KaryaLo

Situs company profile **KaryaLo Digital Solution** (PT Karsa Swakarya Loka). Dua bahasa: Indonesia di `/` dan Inggris di `/en`. Dibangun dengan Next.js 16 (App Router), React 19, Tailwind CSS v4, dan `motion` untuk animasi.

> **Penting:** Next.js 16 punya perubahan besar dibanding versi lama. Sebelum mengubah routing, caching, atau konfigurasi, baca panduan di `node_modules/next/dist/docs/` (lihat juga `AGENTS.md`).

## Cepat mulai

```bash
git clone https://github.com/Karsa-Swakarya-Loka/Compro_KaryaLo.git
cd Compro_KaryaLo
npm install
cp .env.example .env.local   # isi SMTP_PASS jika ingin menguji pengiriman email
npm run dev                  # http://localhost:3000
```

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Server pengembangan |
| `npm run build` | Build produksi (sekaligus cek tipe) |
| `npm start` | Jalankan hasil build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Cek tipe saja |

Catatan Windows di Google Drive: file `desktop.ini` bisa merusak build. Hapus `desktop.ini` di `.next` sebelum `next build`, dan di `.git` sebelum fetch atau pull.

## Struktur proyek

```
app/
  (id)/        halaman bahasa Indonesia (root layout sendiri, <html lang="id">)
  (en)/en/     halaman bahasa Inggris (root layout sendiri, <html lang="en">)
  api/contact/ route handler form kontak (kirim email via SMTP)
  sitemap.ts, robots.ts, llms.txt/, manifest.ts, opengraph-image.tsx
components/    home/ layout/ motion/ portfolio/ seo/ ui/ analytics/ providers/
views/         isi halaman (dipakai bersama oleh versi ID dan EN)
content/       teks per halaman, dua bahasa (id dan en) dalam satu file
data/          data terstruktur: layanan, portofolio, produk, industri, FAQ, proses, testimoni
config/site.ts fakta perusahaan, kontak, template pesan WhatsApp
lib/           i18n, SEO, schema.org, analytics
public/        gambar, ikon, dan PDF company profile
```

Pola utamanya: **halaman di `app/` hanya tipis**, memilih bahasa lalu merender komponen dari `views/`. Teks ada di `content/` dan `data/`, bukan di JSX. Jadi hampir semua perubahan copy cukup menyentuh satu file.

## Dua bahasa

- ID adalah default dan tidak berprefiks (`/about`). EN berprefiks `/en` (`/en/about`).
- Setiap bahasa punya root layout sendiri, sehingga `<html lang>` benar di semua halaman dan semua rute tetap statis.
- Pakai `localePath(lang, "/services")` dari `lib/i18n.ts` untuk membuat tautan internal. Jangan menulis `/en/...` manual.
- Setiap teks baru wajib ada di dua bahasa. Tipe TypeScript di `content/*.ts` akan mengeluh kalau salah satu terlewat.

## Alur konten yang sering dikerjakan

| Tugas | Ubah di |
| --- | --- |
| Ganti teks halaman | `content/<halaman>.ts` (ID dan EN) |
| Tambah proyek portofolio | `data/portfolio.ts` + gambar di `public/images/portofolio/` |
| Tambah atau ubah layanan | `data/services.ts` |
| Tambah produk KaryaLo | `data/products.ts` |
| Ubah daftar industri | `data/industries.ts` dan `content/industry.ts` |
| Ubah FAQ atau proses kerja | `data/faq.ts`, `data/process.ts` |
| Ubah nomor WhatsApp, email, alamat, NIB | `config/site.ts` (nomor cukup ditulis sekali, link `wa.me` diturunkan otomatis) |
| Ganti PDF company profile | timpa `public/downloads/Company-Profile-KaryaLo.pdf` |

Aturan konten yang harus dipatuhi:

- **Testimoni** (`data/testimonials.ts`) hanya tampil jika `approved: true`, yaitu klien sudah menyetujui kutipan, nama, dan jabatan, termasuk terjemahan Inggrisnya. Jangan ubah jadi `true` sebelum itu.
- **Kartu Industri** sengaja tidak menampilkan proyek terkait, karena tidak semua industri punya proyek. Jangan dikembalikan tanpa keputusan tim.
- **IoT** ditampilkan sebagai kemampuan, bukan sebagai portofolio.
- **Teks situs** tidak memakai tanda strip panjang (— atau –) dan tidak memakai contoh nama perusahaan di placeholder. Gunakan titik dua, koma, atau "sampai".
- **Pajak:** PT Karsa Swakarya Loka belum PKP, jadi jangan menulis PPN atau e-Faktur di compro.
- Gambar cover portofolio adalah mockup laptop 3D transparan: tampilkan utuh (`object-contain`), jangan dipotong.

## Alur form kontak dan WhatsApp

1. Pengunjung mengisi form di `/contact` (nama, perusahaan, layanan, anggaran, kebutuhan). Perusahaan wajib diisi supaya tim tahu entitas klien.
2. Klik **Siapkan Pesan WhatsApp**. Browser mengirim data ke `POST /api/contact`.
3. Server memvalidasi (honeypot `website`, batas 5 permintaan per 10 menit per IP) lalu mengirim email ke `support@karyalo.com` lewat SMTP.
4. Pengunjung melihat pratinjau pesan WhatsApp dan tombol **Lanjutkan ke WhatsApp**.
5. Jika SMTP belum diatur atau gagal (503 atau 502), form **tidak error**: pengunjung tetap mendapat pratinjau WhatsApp sehingga kebutuhan proyeknya tidak hilang.

Semua tombol WhatsApp di situs (hero, layanan, industri, portofolio, produk, studi kasus) memakai satu pembuat pesan di `config/site.ts`: `buildWhatsAppMessage` dan `getWhatsAppUrl`. Template berisi Nama, Perusahaan, Jenis Layanan (sesuai konten yang diklik), Perkiraan, dan Catatan. Kalau menambah tombol WhatsApp baru, selalu lewat fungsi ini dan isi `service`, supaya pesannya kontekstual.

Data form tidak disimpan di database. Ini sudah tertulis di halaman Kebijakan Privasi (`content/legal.ts`), jadi ubah kalimatnya juga bila alurnya berubah.

## Variabel lingkungan

Lihat `.env.example`. File `.env.local` tidak boleh di-commit.

| Variabel | Fungsi |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Akun pengirim (Hostinger, port 465 secure). Wajib di produksi agar email terkirim |
| `MAIL_TO`, `MAIL_FROM` | Opsional. Default ke `support@karyalo.com` |
| `NEXT_PUBLIC_GTM_ID` | Opsional. Google Tag Manager, dimuat setelah interaksi pertama |

Di hosting produksi, set variabel yang sama di panel hosting lalu deploy ulang. Tanpa itu situs tetap jalan, tetapi form hanya memakai fallback WhatsApp.

## SEO

- `lib/seo.ts` dan `lib/schema.ts` membuat metadata dan JSON-LD (Organization, WebSite, case study). `hreflang` ID dan EN dibuat otomatis.
- `app/sitemap.ts`, `app/robots.ts`, dan `app/llms.txt` dibuat dari data, jadi proyek atau layanan baru ikut masuk tanpa kerja tambahan.
- `/works` dialihkan permanen ke `/portfolio` (lihat `next.config.ts`). Jangan hapus pengalihan itu.
- Properti `sameAs` di `config/site.ts` sengaja kosong sampai profil Google Business dan LinkedIn aktif.

## Performa dan animasi

- Ukur Lighthouse di **build produksi**, bukan dev server.
- GTM ditunda sampai interaksi pertama. Jangan memindahkannya ke pemuatan awal.
- Animasi (komponen `Reveal`, `RevealGroup`, `RevealItem` di `components/motion/`) adalah bagian dari desain. Pertahankan. Jika daftar berganti isi (misalnya filter), beri `key` agar item baru ikut beranimasi.
- Gambar memakai `next/image` dengan format WebP. Kompres sebelum commit, dan beri nama file baru bila mengganti gambar agar cache tidak menahan versi lama.

## Catatan CSS yang sering membuat bingung

- Kartu sejajar tinggi di baris flex: pakai `flex` pada pembungkus dan `w-full` pada kartu. `h-full` di dalam baris flex dengan tinggi induk tidak pasti akan mematikan `align-items: stretch`.
- Kartu ganjil di baris terakhir diposisikan tengah lewat utilitas `.fit-grid` (`fit-md-2`, `fit-lg-3`).

## Alur kerja Git

- Cabang `main` adalah produksi. Kerjakan di cabang `feat/...` atau `fix/...`, lalu buka Pull Request.
- Pesan commit gaya Conventional Commits (`feat:`, `fix:`, `docs:`).
- Jangan menaruh nama atau atribusi alat AI di commit, PR, maupun issue (aturan founder).
- Pastikan `npm run build` lulus sebelum membuka PR.

## Dokumen pendukung

- `PRD.md`: kebutuhan produk dan keputusan positioning (Extended IT Partner).
- `PRODUCT.md`: ringkasan produk dan penawaran.
- `AGENTS.md` dan `CLAUDE.md`: aturan untuk asisten kode.

## Data perusahaan (rujukan cepat)

PT Karsa Swakarya Loka · NIB 3005260047228 · KBLI 62019 · email resmi support@karyalo.com. Semua nilai ada di `config/site.ts`, ubah hanya di sana.
