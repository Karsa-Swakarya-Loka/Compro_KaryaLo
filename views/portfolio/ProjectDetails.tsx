"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLenis } from "lenis/react";
import type { ProjectItem } from "@/data/portfolio";
import { getWhatsAppUrl } from "@/config/site";
import { portfolioCopy } from "@/content/portfolio-page";
import type { Locale } from "@/lib/i18n";
import styles from "./portfolio.module.css";

export default function ProjectDetails({ lang, project, onClose }: { lang: Locale; project: ProjectItem; onClose: () => void }) {
  const copy = portfolioCopy[lang];
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
          <span className="badge-pill">{project.type === "client" ? copy.dialog.headerClient : copy.types[project.type]} · {project.year}</span>
          <button type="button" onClick={onClose} aria-label={copy.closeDetails} className={styles.iconButton}><X aria-hidden="true" size={22} /></button>
        </div>
        <div data-lenis-prevent className={styles.dialogScroll}>
          <div className={styles.detailHeading}>
            <h2 ref={titleRef} tabIndex={-1} id="portfolio-detail-title" className="type-subhead text-ink max-w-[40ch]">{project.title}</h2>
            <p className="type-intro text-body max-w-[60ch] mt-3">{project.summary}</p>
            <dl className={styles.facts}>
              <div><dt className="type-meta">{copy.dialog.factClient}</dt><dd className="type-small font-semibold">{project.client}</dd></div>
              <div><dt className="type-meta">{copy.dialog.factServices}</dt><dd className="type-small font-semibold">{project.serviceTags.join(" · ")}</dd></div>
            </dl>
          </div>

          <div className={styles.gallery}>
            <div id="portfolio-preview" className={styles.detailPreview}>
              {failedImages.includes(currentImage) ? (
                <p className={`${styles.imageError} type-body-card`} role="status">{copy.dialog.imageError}</p>
              ) : (
                <Image key={currentImage} src={currentImage} alt={copy.imageAlt(project.title, activeImage + 1, images.length)} fill sizes="(min-width: 1200px) 1024px, 92vw" className={styles.cover} onError={() => setFailedImages((previous) => [...previous, currentImage])} />
              )}
            </div>
            <div className={styles.galleryToolbar}>
              <div className={`${styles.galleryNavigation} type-meta`}>
                {images.length > 1 && <button type="button" aria-label={copy.dialog.previousImage} aria-controls="portfolio-preview" disabled={activeImage === 0} onClick={() => setActiveImage((value) => value - 1)} className={styles.iconButton}><ChevronLeft aria-hidden="true" size={20} /></button>}
                <span role="status" aria-live="polite" aria-atomic="true">{copy.dialog.viewCounter(activeImage + 1, images.length)}</span>
                {images.length > 1 && <button type="button" aria-label={copy.dialog.nextImage} aria-controls="portfolio-preview" disabled={activeImage === images.length - 1} onClick={() => setActiveImage((value) => value + 1)} className={styles.iconButton}><ChevronRight aria-hidden="true" size={20} /></button>}
              </div>
              <a href={currentImage} target="_blank" rel="noopener noreferrer" className="text-link text-brand">{copy.dialog.openFull} <ArrowUpRight aria-hidden="true" size={16} /><span className="sr-only">{copy.dialog.newTab}</span></a>
            </div>
            {images.length > 1 && (
              <div role="group" aria-label={copy.dialog.chooseView} className={styles.thumbnails}>
                {images.map((src, index) => (
                  <button key={src} type="button" aria-pressed={activeImage === index} aria-controls="portfolio-preview" aria-label={copy.dialog.showImage(index + 1)} onClick={() => setActiveImage(index)} className={styles.thumbnail}>
                    <Image src={src} alt="" fill sizes="112px" className={styles.cover} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.caseStudy}>
            <section><h3 className="type-card-title text-ink">{copy.challenge}</h3><p className="type-body-card">{project.challenge}</p></section>
            <section><h3 className="type-card-title text-ink">{copy.solution}</h3><p className="type-body-card">{project.solution}</p></section>
          </div>
          {project.impact && (
            <section className={styles.outcome}>
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <div><h3 className="type-card-title text-ink">{copy.impact}</h3><p className="type-body-card font-medium">{project.impact}</p></div>
            </section>
          )}
          <section className={styles.technologies}>
            <h3 className="type-label text-ink">{copy.technologies}</h3>
            <ul>{project.tags.map((tag) => <li key={tag} className="type-meta">{tag}</li>)}</ul>
          </section>
          <div className={styles.detailAction}>
            <a href={getWhatsAppUrl(copy.whatsappSimilar(project.title))} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{copy.discussSimilar} <ArrowUpRight aria-hidden="true" className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </dialog>
  );
}

