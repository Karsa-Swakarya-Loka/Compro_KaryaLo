# Product Requirements Document (PRD)
# Website Company Profile — KaryaLo Digital Solution
**Entitas Legal:** PT Karsa Swakarya Loka  
**Branding Publik:** KaryaLo Digital Solution  
**Status Dokumen:** Approved & Production-Ready  
**Terakhir Diperbarui:** 2026-10-15 (positioning Extended IT Partner, navbar baru, situs dua bahasa, halaman Industri)  

---

## 1. Executive Summary & Brand Identity

### 1.1 Profil Perusahaan
* **Nama Badan Hukum:** PT Karsa Swakarya Loka
* **Brand Komersial:** KaryaLo Digital Solution
* **Nomor Induk Berusaha (NIB):** `3005260047228` (OSS Republik Indonesia, terdaftar 30 Mei 2026)
* **KBLI Utama:** `62019` — Aktivitas Pemrograman Komputer Lainnya
* **Pengesahan Legal:** Keputusan Menteri Hukum RI `AHU-A092678.AH.01.30.Tahun 2026`, ditetapkan 30 Mei 2026 (Perseroan Perorangan, Usaha Mikro)
* **Alamat Terdaftar & Operasional:** Jl. Al-Falah II, Jatiranggon, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17432
* **Google Maps Resmi:** [Karsa Swakarya Loka di Google Maps](https://maps.app.goo.gl/3YrD56ctLmne1fGR8)
* **Email Resmi:** `support@karyalo.com`
* **Jam Operasional:** Senin – Jumat, 09.00 – 18.00 WIB | Sabtu – Minggu: By Appointment

### 1.2 Value Proposition & Positioning
**Keputusan founder 2026-10-15** (record di `02_COMPANY_PROFILE_BRAND/02_BRAND_FOUNDATION/Karyalo_Brand_Strategy_and_Positioning.md` Bagian 0): KaryaLo memposisikan diri sebagai **Extended IT Partner** untuk perusahaan yang belum punya tim IT sendiri, atau timnya sedang penuh. KaryaLo bekerja seperti tim IT klien sendiri untuk tiga bidang — software, desain, dan perangkat IoT — dari perencanaan dan pembangunan sampai perawatan setelah rilis.

* **Istilah:** "Extended IT Partner" dipakai apa adanya di versi Indonesia maupun Inggris.
* **Headline Beranda:** "Tim IT Anda, Tanpa Harus Merekrut." / "Your IT Team, Without the Hiring."
* **Slogan:** "Satu mitra, dari ide sampai terpakai." / "One partner, from idea to everyday use." — usulan pengganti "Bukan yang paling canggih. Yang paling terpakai." (retired 2026-10-15), menunggu pilihan final founder. Satu konstanta: `siteText.tagline` di `config/site.ts`.
* **Riwayat:** sebelumnya "Boutique Full-Cycle Technology & Creative Partner" (versi 2026-09-09).

---

## 2. Arsitektur 3 Pilar Layanan & Kode Referensi Proyek

Setiap layanan memiliki kode referensi penawaran formal (*Project/Quotation Code*) untuk mempermudah penerbitan SPK, Quotation, BAST, dan Invoice Resmi:

```
[PILAR 1: DEV] Digital Engineering & Software Solutions
├── DEV-WEB: Web & Web Application Development
│   ├── Corporate & Interactive Websites (High-converting, SEO-ready)
│   ├── Modern Web Applications & PWA (Sistem informasi manajemen, portal klien)
│   └── SaaS & Custom Web Platforms
├── DEV-APP: Mobile Application Development
│   ├── Cross-Platform Mobile Apps (Flutter / React Native untuk iOS & Android)
│   └── Field & Operations Apps (Aplikasi lapangan, kasir POS, sistem inventaris)
└── DEV-ENT: Enterprise Systems & API Integration
    ├── Custom Dashboard & Business Intelligence Analytics
    └── Payment Gateway, Cloud Backend & 3rd Party API Integrations

[PILAR 2: DSG] Creative, UI/UX & Brand Design
├── DSG-UI: UI/UX & Product Experience Design
│   ├── User Journey, Wireframing & Interactive Prototyping (Figma)
│   ├── Design System Creation & UI Component Library
│   └── Usability Audit & Enterprise Application Redesign
├── DSG-BRD: Brand Identity & Corporate Design
│   ├── Logo Design, Visual Guidelines, Typography & Color Palette
│   └── Corporate Stationeries (Kop surat, kartu nama, invoice, company deck)
└── DSG-MKT: Digital & Marketing Assets
    ├── Social Media Kits & Template Packs
    └── Technical Infographics & Investor/Sales Pitch Decks

[PILAR 3: IOT] IoT & Smart Hardware Systems
├── IOT-HW: Hardware Engineering & Prototyping
│   ├── R&D Mikrokontroler/Mikroprosesor (ESP32, STM32, Raspberry Pi)
│   ├── Sensor Lingkungan, Telemetri, GPS Tracker, Aktuator & Relai
│   └── Custom Enclosure 3D Printing & Schematic / PCB Design
├── IOT-FW: IoT Firmware & Connectivity
│   ├── Komunikasi Data Aman (MQTT, HTTP REST API, LoRaWAN, BLE, Modbus)
│   └── Edge Processing & Low-Power Battery Optimization
└── IOT-PLT: IoT Platform & Smart Integration
    ├── Real-Time Cloud Monitoring Dashboard
    ├── Automated Alert System (WhatsApp Bot, Telegram, Email)
    └── Hardware-to-Cloud Integration ke Sistem Software Web/Mobile
```

---

## 3. Kurasi Portofolio & Aset Studi Kasus

Aset gambar bersumber langsung dari `D:\KaryaLo\Projects\Internal\Compro_Karyalo\images\`:

### 3.1 Proyek Produksi Klien (*Live Deployments*)
1. **Alina Omnichannel Retail & Order Management System**
   * **Kode Layanan:** `DEV-WEB`, `DEV-ENT`, `DSG-UI`
   * **Koleksi Gambar:**
     * `images/portofolio/alina-store.png` (Toko online B2C modern)
     * `images/portofolio/alina-oms.png` (Order Management System fulfillment)
     * `images/portofolio/alina-admin.png` (Dashboard analitik penjualan)
   * **Tantangan:** Ketidaksinkronan data transaksi belanja online dengan stok fisik gudang.
   * **Solusi:** Ekosistem terintegrasi etalase toko dan sistem backend OMS terpadu.
   * **Dampak:** Efisiensi pemrosesan transaksi meningkat 40%.

2. **HIJ Corporate Web & Digital Presence**
   * **Kode Layanan:** `DEV-WEB`, `DSG-BRD`
   * **Gambar:** `images/portofolio/hij-compro.png`
   * **Tantangan:** Kebutuhan profil korporat interaktif berwibawa untuk kemitraan B2B.
   * **Solusi:** Website profil perusahaan cepat, responsif, dan dioptimalkan untuk SEO & konversi.

3. **Website Perusahaan PT Ape Gale Indonesia** (ditambahkan 2026-10-15)
   * **Kode Layanan:** `DEV-WEB`, `DSG-UI` · tahun 2026 (perlu konfirmasi pemilik)
   * **Gambar:** `images/portofolio/apegale-compro.webp`, `apegale-layanan.webp`
   * Website dua bahasa layanan perizinan ekspatriat & TKA: halaman per layanan, GARIS, pustaka regulasi, berita, formulir minta penawaran.

4. **Website Perusahaan Affirmate Administrative** (ditambahkan 2026-10-15)
   * **Kode Layanan:** `DEV-WEB`, `DSG-UI` · tahun 2026
   * **Gambar:** `images/portofolio/affirmate-compro.webp`, `affirmate-services.webp`, `affirmate-network.webp`
   * Website dua bahasa (EN/ID) unit korporat & administrasi Affirmate Group.

5. **Sistem ERP Konveksi HIJ** (ditambahkan 2026-10-15)
   * **Kode Layanan:** `DEV-ENT`, `DSG-UI` · tahun 2026 (perlu konfirmasi pemilik)
   * **Gambar:** `images/portofolio/hij-erp.webp` (nominal rupiah diburamkan)
   * ERP web konveksi: penjualan, perencanaan, produksi (progres per tahap, SPK), logistik, keuangan, scan QR, portal pelanggan.

### 3.1b Produk KaryaLo (live, milik sendiri)
1. **DeliaStore: Toko Top Up Game & Produk Digital** (ditambahkan 2026-10-15, wajib tampil; ikut tampil di Beranda)
   * **Kode Layanan:** `DEV-WEB`, `DEV-ENT`, `DSG-UI` · 2026 · tipe `product` (label "Produk KaryaLo", bukan proyek klien/purwarupa)
   * **Gambar:** `images/portofolio/deliastore.webp`, `deliastore-track.webp`; sampul `mockup/deliastore.webp`
   * Next.js 16 + PostgreSQL, pembayaran DOKU (QRIS/VA), pengiriman otomatis Digiflazz, flash sale & voucher, poin member (login WA), lacak pesanan, dasbor admin, PWA. Juga jadi bukti di Industri "Produk Digital & Pembayaran".

Galeri Alina diperbarui dengan tangkapan baru: toko (katalog), OMS (nama mitra & nomor pesanan diburamkan), dan dasbor admin (omzet diburamkan).

**Aturan gambar (2026-10-15):** sampul setiap proyek adalah mockup laptop 3D transparan dengan bayangan (`images/portofolio/mockup/*.webp`, dibuat dari tangkapan viewport 16:10 di atas template laptop dari pemilik) dan ditampilkan utuh (`object-contain`). Mockup 3D hanya dipakai di kartu portofolio besar (Beranda dan indeks Portofolio). Slider hero memakai tangkapan datar dalam bingkai jendela browser, dan kartu kecil (bukti di Layanan, "Proyek Lainnya" di studi kasus) memakai `galleryImages[0]` (`object-cover object-top`), karena di ukuran kecil layar laptop 3D terlalu kecil untuk dibaca. Galeri studi kasus memakai tangkapan viewport 16:9 biasa.

**Aturan kolom (2026-10-15):** di tata letak dua kolom (gambar di samping teks), kolom gambar direntangkan setinggi kolom teks di desktop: tepi atas gambar sejajar badge/judul, tepi bawah sejajar tombol. Gambar tidak diletakkan di tengah secara vertikal dengan ruang kosong di atas dan bawahnya. URL situs klien tidak pernah ditampilkan. Panel admin/OMS/ERP klien hanya dari tangkapan yang diambil pemilik sendiri; data pelanggan diburamkan.

### 3.2 Inovasi & R&D Internal KaryaLo (*Prototypes*)
1. **KaryaLo Executive Analytics Dashboard** (`images/prototype/karyalo-admin.png`) — `DEV-ENT`
2. **KaryaLo SaaS Storefront Platform** (`images/prototype/karyalo-store.png`) — `DEV-WEB`
3. **KaryaLo Digital Voucher & Top-Up Engine** (`images/prototype/karyalo-topup.png`) — `DEV-ENT`

---

## 4. Design System & Spesifikasi Visual

> Diganti 2026-10-15: tampilan sekarang mengikuti tata letak dan animasi template Cargon (referensi, kode & foto tidak disalin) dengan warna logo KaryaLo. Sistem tri-font (Aestera/Satoshi/Archivo) dan palet `#C9D6DF`/`#0056FA` sebelumnya tidak dipakai lagi.

### 4.1 Palet Warna (token di `app/globals.css`)
* **Brand `#1D469D`** (biru logo): tombol solid, judul aksen, ikon, band CTA & footer. Hover `#163A85`, latar lembut `#E9EFF9`.
* **Cyan `#3ABBCE`**: aksen kedua dari logo (garis dekorasi, label di atas biru).
* **Ink `#0E1A2E`** untuk judul, **Body `#5A6578`** untuk paragraf (kontras 5,9:1 di putih).
* **Surface `#F5F7FB`** untuk section selang-seling dan banner halaman, **Line `#E3E8F0`** untuk garis.
* **Night `#071430`**: satu band gelap per halaman.

### 4.2 Tipografi
* Satu keluarga: **Outfit** (`app/fonts.ts`), judul weight 600 tanpa huruf kapital.
* Peran `type-*` (display, page title, section title, card title, intro, body, small, meta, label) dipakai di semua halaman; tidak ada kalimat di bawah 14px.

### 4.3 Komponen & Bentuk
* Radius rapat (8–12px), `shadow-card` dan `shadow-lift` saat hover.
* Tombol kapsul `.btn` dengan ikon di lingkaran di ujung kanan. **Tombol solid hanya untuk memulai percakapan** (WhatsApp/form); selebihnya tombol sekunder atau tautan teks.
* `SectionHeading` (badge kapsul + judul tengah + intro), `PageBanner` (banner halaman dalam: H1 + breadcrumb), `DecorCurves` (garis lengkung biru/cyan), `Counter` (angka naik saat terlihat).
* Navbar: kapsul putih mengapung di atas semua halaman, lockup "KaryaLo / Digital Solution".
* Footer: band biru dengan slogan + kartu putih berisi kolom tautan.

### 4.4 Animasi
* Reveal saat scroll: geser 40px, 0,9 detik, berurutan per kartu; gambar zoom pelan saat hover; hero berupa slider 4 slide dengan panel miring dan titik vertikal, **tanpa tombol jeda** (diminta pemilik). Slider berhenti saat disorot/difokus, berhenti permanen setelah pengunjung memilih slide, dan tidak berjalan untuk *reduced motion*.
* **Loader logo:** potongan logo KaryaLo menyatu, wordmark muncul, lalu bar progres. Tampil sekali per sesi (`sessionStorage` `kl-preloaded`), sekitar 1–1,5 detik, dan dilewati bila pengunjung memilih *reduced motion*.
* Semua animasi mati bila `prefers-reduced-motion` aktif.

### 4.5 Screenshot Berlatar Putih
Screenshot dashboard berlatar putih (Alina, KaryaLo) tetap dibungkus bingkai browser tipis dengan border `line` dan bayangan lembut agar tidak menyatu dengan latar putih.

---

## 5. Alur Halaman & Arsitektur Multi-Page

Struktur informasi diadopsi dari tinjauan situs Nexora Technology (2026-10-15) dan dipertahankan jujur: tanpa angka klaim, tanpa harga "Coming Soon", form yang benar-benar mengirim (ke WhatsApp), dan tanpa konten berulang.

### 5.1 Navbar (keputusan founder 2026-10-15)
**Beranda · Tentang Kami · Services · Portfolio · Industri · Kontak** + toggle **ID | EN**, tanpa dropdown. Versi EN: Home · About Us · Services · Portfolio · Industries · Contact. Mulai lebar 1280px navbar menampilkan tombol "Chat WhatsApp"; di bawah itu tombol WhatsApp melayang yang menyingkir saat tombol WhatsApp utama di halaman terlihat.

### 5.2 Struktur Routing (Next.js App Router, dua bahasa)
Bahasa Indonesia tanpa awalan, bahasa Inggris di `/en/...`. Masing-masing punya root layout sendiri (`app/(id)` dan `app/(en)/en`), semua halaman statis, dengan canonical + hreflang + sitemap dua bahasa. Teks halaman ada di `content/*.ts` dan data di `data/*.ts`, masing-masing dengan versi `id` dan `en`.
* **`/` (Beranda):** Rangkuman lengkap dengan alur konversi (lihat 5.3).
* **`/about` (Tentang Kami):** Profil PT, studio & bengkel perangkat, visi & misi, fungsi tim (tanpa nama), cara kerja 5 tahap, area & model kerja sama, kartu legalitas, CTA.
* **`/services`:** 3 bidang layanan dengan sub-layanan dan bukti proyek; blok jujur untuk IoT (belum ada proyek, mulai dari alat contoh); layanan pendamping (`#support`: perawatan & pendampingan, pemetaan kebutuhan); tanpa tabel harga.
* **`/portfolio`:** (dulu `/works`, redirect permanen 308) arsip studi kasus dengan filter dan jumlah per kelompok, baris "Dampak", halaman detail `/portfolio/[slug]`, dan catatan bahwa belum ada proyek IoT yang dipublikasikan.
* **`/industry` (baru):** contoh yang bisa dibangun per industri (Ritel & E-commerce, Perusahaan Jasa & Korporat, Produk Digital & Pembayaran, Distribusi & Logistik, Manufaktur & Workshop, Properti & Pengelolaan Gedung). Studi kasus hanya ditautkan bila proyeknya ada.
* **`/products`:** platform siap pakai (feature flag `enableProductsSection`); **tidak ada di navbar**, ditautkan dari Beranda dan footer.
* **`/contact`:** form kebutuhan yang menyusun pesan WhatsApp untuk ditinjau, kanal langsung, alamat & Maps.

### 5.3 Alur Seksi di Halaman Beranda (`/`) — urutan Cargon, 2026-10-15
1. **Hero (di atas lipatan, empat jawaban berurutan):** *apa* — pill "Extended IT Partner · Software, Desain & IoT" + H1 "Tim IT Anda, Tanpa Harus Merekrut."; *untuk siapa* — perusahaan yang belum punya tim IT sendiri atau timnya penuh, dan apa yang kami kerjakan; *kenapa penting* — tiga alasan (tim inti tidak dioper, purwarupa 7–14 hari kerja, source code milik Anda); *langkah berikutnya* — tombol WhatsApp "Ceritakan kebutuhan Anda", tombol sekunder "Lihat contoh proyek", dan keterangan waktu balas. Panel miring di kanan berisi slider contoh masalah (pilihan pemilik "masalah dulu"): tangkapan layar bukti + kartu masalah → yang kami bangun → "Lihat buktinya", tanpa tombol jeda.
2. **Kenapa KaryaLo:** kolase foto studio, empat prinsip kerja, kutipan deskripsi perusahaan, tombol ke Tentang Kami.
3. **Layanan:** kartu yang melebar untuk tiga bidang + layanan pendamping.
4. **Portofolio:** tiga kartu gambar tinggi menuju studi kasus; testimoni hanya tampil setelah disetujui klien.
5. **Studio:** foto studio + kotak komitmen biru dengan angka (7–14 hari kerja sampai purwarupa, 100% source code milik klien, 3 bidang dalam satu tim; janji yang sudah ada di situs, bukan metrik), lalu band gelap berisi keahlian tim dan cakupan wilayah.
6. **Masalah yang Sering Kami Bereskan:** berbentuk kartu testimoni tanpa nama/bintang, ditutup tombol WhatsApp utama.
7. **Lima Tahap Pengerjaan:** kartu bernomor + panel purwarupa.
8. **Legalitas yang Bisa Dicek:** empat kartu fakta + permintaan dokumen (tombol sekunder).
9. **FAQ:** accordion di tengah.
10. **CTA penutup:** band biru dengan garis lengkung putih.

Bagian Cargon yang belum punya sumber nyata di KaryaLo (testimoni, blog, video, statistik persen) tidak dibuat-buat: diisi konten KaryaLo yang ada atau tidak ditampilkan.

**Sistem hierarki (berlaku di semua halaman):** peran tipografi `type-*` di `app/globals.css` (satu ukuran judul section untuk semua halaman, tidak ada kalimat di bawah 14px, tanpa huruf kapital penuh); tombol solid hanya untuk memulai percakapan (WhatsApp/form), selebihnya tombol sekunder atau tautan teks; padding section bertingkat `section-anchor | standard | support | band`; navbar menampilkan tombol WhatsApp mulai lebar 1280px, di bawahnya tombol melayang yang menyingkir saat tombol WhatsApp utama di halaman terlihat.

### 5.4 Keputusan Konten Terkait (2026-10-15)
* **IoT tanpa portofolio:** IoT tetap tampil sebagai bidang ke-3 di Services dan Industri, dengan alat contoh/purwarupa sebagai langkah pertama. Tidak ada entri IoT di Portfolio sampai ada proyek nyata.
* **Tim tanpa nama:** halaman Tentang Kami menampilkan fungsi tim (Manajemen & Arah Bisnis, Teknologi & Rekayasa Software, Desain & Pemasaran, Perangkat IoT, Administrasi & Keuangan), tanpa nama atau foto.
* **Perlu konfirmasi founder:** slogan final (tetap usulan, boleh tampil), catatan bahasa di halaman legal versi Inggris, daftar teknologi IoT di Beranda (ESP32, MQTT).
* **Diputuskan pemilik 2026-10-15:** klaim dampak Alina "sekitar 40%" dikonfirmasi benar; teks visi & misi (`content/about.ts`) tetap tampil sebagai draf.
* **Riwayat tampilan 2026-10-15:** Cargon dipasang pagi hari; siang dicoba dunia visual "Gambar Kerja" (lembar gambar teknik); sore pemilik meminta kembali ke Cargon. Versi Cargon dipulihkan persis dari snapshot, dengan perbaikan yang dibawa: hero "masalah dulu", tanpa tombol jeda, tombol WhatsApp melayang tidak tampil di /contact.

---

## 6. Alur Rekayasa 5 Tahap (*Value Engineering Framework*)
1. **Phase 01: Strategic Discovery & Architecture Blueprint**  
   Audit kebutuhan bisnis, pemetaan KPI, penyusunan Software Architecture Document (SAD), dan penandatanganan SPK & NDA resmi.
2. **Phase 02: Interactive Prototyping & Usability Testing**  
   Pengujian prototype Figma interaktif atau Proof-of-Concept (PoC) hardware dalam 7–14 hari kerja sebelum penulisan kode dimulai.
3. **Phase 03: Milestone Sprints & Transparent Live Demos**  
   Siklus sprint berkala dengan akses demo server staging langsung bagi klien.
4. **Phase 04: Rigorous QA, Security Audit & Field Calibration**  
   Pengujian beban performa, audit enkripsi data, dan kalibrasi sensor IoT di lapangan.
5. **Phase 05: 100% IP Handover, Staff Training & SLA Warranty**  
   Serah terima penuh seluruh source code Git dan kredensial server cloud via BAST resmi, sesi pelatihan tim klien, dan masa garansi aktif bug-free.

---

## 7. Kebijakan Legalitas & FAQ Kemitraan
* **100% Intellectual Property Handover:** Tidak ada biaya lisensi tersembunyi (*no vendor lock-in*). Seluruh hak cipta menjadi milik klien setelah BAST.
* **Perjanjian Resmi:** Pengikatan kerja sama melalui Surat Perjanjian Kerja (SPK) dan Non-Disclosure Agreement (NDA) resmi PT Karsa Swakarya Loka.
* **Perpajakan:** Invoice resmi ber-NPWP perusahaan. Status **belum PKP** (dikonfirmasi 14 Okt 2026): tagihan tanpa PPN dan tanpa Faktur Pajak. Jangan klaim e-Faktur di materi apa pun sampai status PKP terbit.
* **Termin Bertahap:** Pembayaran berbasis *milestone* yang diverifikasi bersama.

---

## 8. Stack Teknologi & Standar Performa
* **Framework:** Next.js (App Router, Server & Client Component architecture)
* **Bahasa:** TypeScript (Strict mode)
* **Styling:** Tailwind CSS + PostCSS
* **Animasi:** `motion` (Framer Motion) — *GPU accelerated (transform & opacity only)*
* **Smooth Scroll:** `lenis` (~3KB zero-jank physics scroll)
* **Ikon:** `lucide-react`
* **Optimasi Gambar:** `next/image` dengan format WebP/AVIF adaptif
