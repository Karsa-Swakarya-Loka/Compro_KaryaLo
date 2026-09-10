"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLenis } from "lenis/react";
import type { ProjectItem } from "@/data/portfolio";
import { getWhatsAppUrl } from "@/config/site";
import styles from "./works.module.css";

export default function ProjectDetails({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lenis = useLenis();
  const images = project.galleryImages.length ? project.galleryImages : [project.coverImage];
  const [activeImage, setActiveImage] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const currentImage = images[activeImage];

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const wasStopped = lenis?.isStopped;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    dialog?.showModal();
    titleRef.current?.focus({ preventScroll: true });
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (!wasStopped) lenis?.start();
      trigger?.focus({ preventScroll: true });
    };
  }, [lenis]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="portfolio-detail-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}
    >
      <div className={styles.dialogPanel}>
        <div className={styles.dialogHeader}>
          <span>{project.type === "client" ? "Studi kasus klien" : "Purwarupa internal"} · {project.year}</span>
          <button type="button" onClick={onClose} aria-label="Tutup detail proyek" className={styles.iconButton}><X aria-hidden="true" size={22} /></button>
        </div>
        <div data-lenis-prevent className={styles.dialogScroll}>
          <div className={styles.detailHeading}>
            <h2 ref={titleRef} tabIndex={-1} id="portfolio-detail-title">{project.title}</h2>
            <p>{project.summary}</p>
            <dl className={styles.facts}>
              <div><dt>Klien / pengembang</dt><dd>{project.client}</dd></div>
              <div><dt>Layanan</dt><dd>{project.serviceTags.join(" · ")}</dd></div>
            </dl>
          </div>

          <div className={styles.gallery}>
            <div id="portfolio-preview" className={styles.detailPreview}>
              {failedImages.includes(currentImage) ? (
                <p className={styles.imageError} role="status">Gambar belum dapat dimuat. Coba tampilan lain atau buka berkas gambar.</p>
              ) : (
                <Image key={currentImage} src={currentImage} alt={`${project.title}, tampilan ${activeImage + 1} dari ${images.length}`} fill sizes="(min-width: 1200px) 1024px, 92vw" className={styles.cover} onError={() => setFailedImages((previous) => [...previous, currentImage])} />
              )}
            </div>
            <div className={styles.galleryToolbar}>
              <div className={styles.galleryNavigation}>
                {images.length > 1 && <button type="button" aria-label="Gambar sebelumnya" aria-controls="portfolio-preview" disabled={activeImage === 0} onClick={() => setActiveImage((value) => value - 1)} className={styles.iconButton}><ChevronLeft aria-hidden="true" size={20} /></button>}
                <span role="status" aria-live="polite" aria-atomic="true">Tampilan {activeImage + 1} / {images.length}</span>
                {images.length > 1 && <button type="button" aria-label="Gambar berikutnya" aria-controls="portfolio-preview" disabled={activeImage === images.length - 1} onClick={() => setActiveImage((value) => value + 1)} className={styles.iconButton}><ChevronRight aria-hidden="true" size={20} /></button>}
              </div>
              <a href={currentImage} target="_blank" rel="noopener noreferrer" className={styles.imageLink}>Buka gambar penuh <ArrowUpRight aria-hidden="true" size={16} /><span className="sr-only"> di tab baru</span></a>
            </div>
            {images.length > 1 && (
              <div role="group" aria-label="Pilih tampilan proyek" className={styles.thumbnails}>
                {images.map((src, index) => (
                  <button key={src} type="button" aria-pressed={activeImage === index} aria-controls="portfolio-preview" aria-label={`Tampilkan gambar ${index + 1}`} onClick={() => setActiveImage(index)} className={styles.thumbnail}>
                    <Image src={src} alt="" fill sizes="112px" className={styles.cover} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.caseStudy}>
            <section><h3>Masalah yang dihadapi</h3><p>{project.challenge}</p></section>
            <section><h3>Cara kami menyelesaikannya</h3><p>{project.solution}</p></section>
          </div>
          {project.impact && <section className={styles.outcome}><h3>Hasilnya</h3><p>{project.impact}</p></section>}
          <section className={styles.technologies}>
            <h3>Teknologi yang dipakai</h3>
            <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          </section>
          <div className={styles.detailAction}>
            <a href={getWhatsAppUrl(`Halo KaryaLo, saya tertarik membangun sistem seperti ${project.title}.`)} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}>Diskusikan proyek serupa <ArrowUpRight aria-hidden="true" size={18} /></a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
