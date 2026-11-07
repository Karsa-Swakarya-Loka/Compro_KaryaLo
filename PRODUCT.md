# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pemilik usaha, kepala operasional, pimpinan cabang, dan manajer pengadaan di Indonesia yang belum punya tim IT sendiri, atau timnya sedang penuh. Banyak yang pernah mengeluarkan anggaran untuk sistem yang akhirnya ditinggalkan staf dan kembali ke kertas/Excel. Mereka sibuk dengan operasional harian, tidak wajib paham teknis, dan butuh kejelasan wujud serah terima serta lama pengerjaan sebelum percaya pada vendor baru.

Sekunder: tim verifikasi vendor / pengadaan yang perlu memeriksa legalitas (NIB, SK AHU, KBLI) untuk tender.

## Product Purpose

Situs company profile KaryaLo Digital Solution (PT Karsa Swakarya Loka). Tugasnya membuat calon klien paham apa yang KaryaLo kerjakan, percaya bahwa timnya nyata dan prosesnya jelas, lalu memulai percakapan lewat WhatsApp atau mengirim brief proyek lewat form. Sukses = percakapan WhatsApp / brief yang masuk dari calon klien yang tepat.

## Positioning

Extended IT partner: bekerja seperti tim IT klien sendiri untuk software (website, aplikasi, sistem internal), desain (UI/UX dan identitas merek), dan perangkat IoT, dari perencanaan dan pembangunan sampai perawatan setelah rilis. Dikerjakan tim inti sendiri (tidak dioper), lima tahap transparan, purwarupa bisa diklik sebelum kode ditulis, dan batas kerja dinyatakan tertulis.

## Operating Context

Calon klien biasanya datang dari rekomendasi, pencarian, atau tautan yang dikirim lewat chat, sering membuka di ponsel. Keputusan lanjut terjadi di WhatsApp (kanal utama), lalu surat penawaran dan invoice DP. Tim pengadaan memeriksa dokumen legal sebelum vendor bisa ikut tender.

## Capabilities and Constraints

- Next.js App Router, statis, dua bahasa: Indonesia tanpa awalan, Inggris di `/en/...`.
- Navbar tetap enam entri tanpa dropdown: Beranda · Tentang Kami · Services · Portfolio · Industri · Kontak, plus toggle ID/EN.
- Form kontak menyusun pesan WhatsApp untuk ditinjau; tidak ada backend email.
- Tiga bidang layanan: Software & Aplikasi, Desain & Branding, IoT & Perangkat; plus layanan pendamping (perawatan & pendampingan, pemetaan kebutuhan). Platform siap pakai di `/products` (feature flag).
- PT belum PKP: tidak ada PPN / e-Faktur di materi apa pun.
- Belum diputuskan founder: slogan final ("Satu mitra, dari ide sampai terpakai." tetap usulan, boleh tampil), catatan bahasa di halaman legal EN, daftar teknologi IoT (ESP32, MQTT).
- Teks visi & misi masih draf; pemilik memilih tetap menampilkannya (2026-10-15) dan akan merevisi bila perlu.

## Brand Commitments

- Nama: KaryaLo Digital Solution, milik PT Karsa Swakarya Loka, Kota Bekasi.
- Logo KaryaLo dengan warna biru `#1D469D` dan cyan `#3ABBCE`; keduanya tetap warna utama merek (dikonfirmasi pemilik 2026-10-15).
- Loader logo (potongan logo merakit diri) tampil di setiap muat halaman penuh, termasuk *refresh* (diminta pemilik 2026-10-15), dan dilewati untuk reduced motion.
- Hero tetap berupa slider tanpa tombol jeda (diminta pemilik 2026-10-15), berisi proyek nyata sebagai mockup laptop 3D yang seragam, dengan caption singkat. Hook "masalah dulu" pindah ke seksi Solusi. Teks hero dibuat pendek dan slider jadi fokus (2026-10-16).
- Tampilan mengikuti referensi template Cargon (unifato.com/cargon) dengan warna logo KaryaLo; pemilik kembali memilihnya setelah mencoba dunia "Gambar Kerja" (2026-10-15). Kode/foto Cargon tidak disalin.
- Foto yang ada di `public/images` tetap jadi bahan visual utama.
- Suara: jelas, praktis, operasional, manusiawi, profesional; tanpa hype dan tanpa jargon di depan. Bahasa pelanggan dulu, istilah teknis sesudahnya.
- Tombol solid hanya untuk memulai percakapan (WhatsApp / form).
- Email resmi support@karyalo.com; WhatsApp +62 899-7475-888.

## Evidence on Hand

- Lima proyek di `data/portfolio.ts` dengan gambar di `public/images/portofolio` dan `public/images/prototype`: dua klien (Alina — toko online & sistem pesanan, HIJ — website korporat) dan tiga purwarupa internal KaryaLo.
- Dampak Alina "waktu pemrosesan pesanan turun sekitar 40%" dikonfirmasi benar oleh pemilik (2026-10-15).
- Legalitas: NIB 3005260047228, SK AHU-A092678.AH.01.30.Tahun 2026, KBLI 62019, pendirian 30 Mei 2026.
- Foto studio, perangkat, dan layanan di `public/images`.
- Tidak ada dan tidak boleh dibuat-buat: testimoni yang disetujui klien, proyek IoT, metrik/angka hasil, logo klien, rating, "24/7", blog.

## Product Principles

1. Bahasa pelanggan dulu: tanda-tanda masalah → jenis pekerjaan → wujud serah terima & waktu → bukti nyata.
2. Jujur soal batas: yang belum ada (proyek IoT, testimoni) ditulis apa adanya, bukan ditutupi.
3. Bukti mengalahkan klaim: proyek nyata, purwarupa, dan dokumen legal yang bisa dicek.
4. Satu tim untuk tiga bidang, dari rancangan sampai dirawat.

## Accessibility & Inclusion

WCAG 2.2 AA: kontras teks ≥4.5:1, navigasi keyboard dan fokus terlihat, semua animasi dimatikan saat `prefers-reduced-motion`, gerakan otomatis bisa dihentikan pengguna.
