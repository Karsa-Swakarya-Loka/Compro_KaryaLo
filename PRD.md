# Product Requirements Document (PRD)
# Website Company Profile — KaryaLo Digital Solution
**Entitas Legal:** PT Karsa Swakarya Loka  
**Branding Publik:** KaryaLo Digital Solution  
**Status Dokumen:** Approved & Production-Ready  
**Terakhir Diperbarui:** 2026-09-09  

---

## 1. Executive Summary & Brand Identity

### 1.1 Profil Perusahaan
* **Nama Badan Hukum:** PT Karsa Swakarya Loka
* **Brand Komersial:** KaryaLo Digital Solution
* **Nomor Induk Berusaha (NIB):** `3005260047228` (OSS Republik Indonesia, terdaftar 30 Mei 2026)
* **KBLI Utama:** `62019` — Aktivitas Pemrograman Komputer Lainnya
* **Pengesahan Legal:** Surat Keputusan (SK) Pengesahan Kementerian Hukum dan HAM Republik Indonesia
* **Alamat Terdaftar & Operasional:** Jl. Al-Falah II, Jatiranggon, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17432
* **Google Maps Resmi:** [Karsa Swakarya Loka di Google Maps](https://maps.app.goo.gl/3YrD56ctLmne1fGR8)
* **Email Resmi:** `support@karyalo.com`
* **Jam Operasional:** Senin – Jumat, 09.00 – 18.00 WIB | Sabtu – Minggu: By Appointment

### 1.2 Value Proposition & Positioning
KaryaLo memposisikan diri sebagai **Boutique Full-Cycle Technology & Creative Partner** untuk klien korporat B2B, perusahaan berkembang, dan institusi. Kami tidak hanya membuat website atau aplikasi lepas, melainkan merekayasa sistem perangkat lunak yang *scalable*, antarmuka pengguna fungsional berkelas dunia, serta integrasi perangkat keras IoT dari hulu ke hilir.

---

## 2. Arsitektur 3 Pilar Layanan & Kode Referensi Proyek

Setiap layanan memiliki kode referensi penawaran formal (*Project/Quotation Code*) untuk mempermudah penerbitan SPK, Quotation, BAST, dan Faktur Resmi:

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

### 3.2 Inovasi & R&D Internal KaryaLo (*Prototypes*)
1. **KaryaLo Executive Analytics Dashboard** (`images/prototype/karyalo-admin.png`) — `DEV-ENT`
2. **KaryaLo SaaS Storefront Platform** (`images/prototype/karyalo-store.png`) — `DEV-WEB`
3. **KaryaLo Digital Voucher & Top-Up Engine** (`images/prototype/karyalo-topup.png`) — `DEV-ENT`

---

## 4. Design System & Spesifikasi Visual

### 4.1 Ritme Spasial 50:50 & Palet Warna Resmi
* **Latar Awal Halaman Pertama:** Menggunakan warna sejuk **`#C9D6DF` (Cool Slate Blue)** di area Hero Section.
* **Navbar:** Berwarna **Murni Putih (`#FFFFFF`)** berbentuk kapsul mengapung di atas latar `#C9D6DF`, dengan efek *hover* transparan lembut (`hover:bg-slate-100/80`).
* **Proporsi Seimbang 50:50:**
  * Area `#C9D6DF`: Hero Section, Seksi Portofolio, dan aksen panggung.
  * Area Putih (`#FFFFFF`): Seksi 3 Pilar Layanan, Bingkai Browser Tangkapan Layar, dan Footer.
* **Deep Corporate Navy (`#1F2E5A`):** Teks judul (H1/H2), tombol utama, dan aksen brand (diambil dari logo Karsa).
* **Vivid Royal Blue (`#0056FA`):** Tombol aksi utama (CTA), link aktif, dan penanda fokus.
* **Electric Cyan (`#3AAED8`):** Aksen sekunder, badge status, dan kilau hover interaktif.
* **Soft Lavender (`#C8B6FF`):** Aksen khusus produk inovasi dan UI/UX.

### 4.2 Arsitektur Tipografi Tri-Font Kustom
* **Layer 1 (Headings & Display): `Aestera`**
  * Penerapan: H1, H2, H3, Judul Seksi, dan Kutipan Pernyataan.
  * Karakter: Modern Architectural Editorial Serif, anggun, mewah, distingtif.
* **Layer 2 (Storytelling & Paragraf > 2 baris): `Satoshi`**
  * Penerapan: Paragraf narasi, studi kasus, deskripsi layanan, dan jawaban FAQ.
  * Karakter: Modernist Swiss Grotesque, sangat mulus, seimbang, ramah di mata.
* **Layer 3 (Metadata & Technical Labels): `Archivo`**
  * Penerapan: Nomor NIB, kode layanan (`DEV-WEB`), label tombol CTA, dan tech stack badges.
  * Karakter: Architectural Grotesque, tegas, presisi rekayasa.

### 4.3 Teknik Anti-Bleed Gambar Screenshot Putih
Screenshot dashboard yang berlatar belakang putih (seperti Alina dan KaryaLo) **wajib dibungkus dengan Minimalist Browser Frame**:
* Bilah atas macOS (*3 dots styling*) setinggi 30px berwarna `bg-slate-50`.
* Border sub-piksel `border border-slate-200/90`.
* Bayangan lembut `shadow-xl shadow-slate-900/5`.
* Diletakkan di atas kanvas panggung `#C9D6DF` sehingga batas screenshot kontras 100% dan tidak menyatu dengan latar web.

---

## 5. Alur Halaman & Arsitektur Multi-Page

### 5.1 Struktur Routing (Next.js App Router)
* **`/` (Home):** Rangkuman eksekutif lengkap dengan alur konversi terpadu.
* **`/services`:** Eksplorasi mendalam 3 pilar layanan, rincian deliverables, dan tech stack.
* **`/works`:** Arsip galeri portofolio lengkap dengan filter kategori dinamis dan modal detail.
* **`/products`:** Modul produk mandiri (disiapkan melalui konfigurasi *feature flag*).
* **`/about`:** Profil resmi PT Karsa Swakarya Loka, visi, komitmen hukum, dan fasilitas studio lab.
* **`/contact`:** Peta interaktif Google Maps, alamat Bekasi, formulir pesan, dan direct chat WhatsApp.

### 5.2 Alur Seksi di Halaman Home (`/`)
1. **Header / Navbar:** Kapsul putih melayang di atas `#C9D6DF`, logo Karsa, navigasi, dan CTA WA.
2. **Hero Section:** Latar `#C9D6DF`, headline megah Aestera, panggung putih foto 3D workstation `hero-centerpiece.webp`.
3. **Pilar Layanan (Services):** Latar putih bersih, 3 kartu layanan dengan foto studio nyata (`service-software.webp`, `service-design.webp`, `service-iot.webp`).
4. **Tim & Budaya Studio (Culture):** Latar foto studio lab `about-studio.webp` dengan efek *slow zoom hover* dan gradasi transparan biru navy.
5. **Showcase Portofolio:** Latar kanvas `#C9D6DF`, studi kasus Alina Retail dengan bingkai browser anti-bleed dan modal detail (`layoutId`).
6. **Alur Kerja 5 Tahap (*Value Engineering Framework*):** Timeline interaktif vertikal.
7. **Legalitas & Kredibilitas (*Corporate Trust*):** 4 Kartu Trust (SK Kemenkumham, NIB, NPWP/Faktur, SPK/NDA).
8. **Testimoni Klien Mendalam:** 2 ulasan berdampak bisnis dari Alina Retail dan PT HIJ.
9. **FAQ Korporat:** Accordion seputar hak cipta (100% IP Handover), garansi, dan skema termin.
10. **CTA Banner & Footer Resmi:** Ajakan konsultasi langsung ke WhatsApp Business + legalitas copyright.

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
* **Perpajakan & Faktur:** Penerbitan Invoice resmi ber-NPWP dan Faktur Pajak.
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
