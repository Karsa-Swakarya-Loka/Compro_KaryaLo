"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectItem } from "@/data/portfolio";
import { X, CheckCircle2 } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { portfolioCopy } from "@/content/portfolio-page";
import type { Locale } from "@/lib/i18n";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { EASE_EXPO, SPRING_INTERACTIVE, SPRING_MODAL } from "@/components/motion/tokens";
import ArrowSwap from "@/components/motion/ArrowSwap";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

interface ProjectModalProps {
  lang: Locale;
  project: ProjectItem | null;
  onClose: () => void;
}

/**
 * Native <dialog> for focus trapping and Escape handling; motion handles the
 * zoom in/out of the panel while CSS animates ::backdrop (0 → 12px blur).
 * The dialog stays mounted so the exit animation can finish before `close()`.
 */
export default function ProjectModal({ lang, project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef("");
  const locked = useRef(false);
  const lenis = useLenis();
  // Latest Lenis instance for the unmount cleanup, without re-running it when the instance arrives late.
  const lenisRef = useRef(lenis);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project) {
      if (dialog.open) return;
      triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      locked.current = true;
      dialog.dataset.state = "open";
      dialog.showModal();
    } else if (dialog.open) {
      dialog.dataset.state = "closing";
    }
  }, [project]);

  // Freeze Lenis while a project is open. Separate from the effect above so it
  // still applies when Lenis mounts after the dialog opened (the old code
  // skipped stop() in that case and the page scrolled behind the modal).
  useEffect(() => {
    if (!project) return;
    lenis?.stop();
  }, [project, lenis]);

  // Safety net: restore page scroll only if the modal unmounts while open (route change).
  useEffect(() => {
    return () => {
      if (locked.current) {
        locked.current = false;
        document.body.style.overflow = previousOverflow.current;
        lenisRef.current?.start();
      }
    };
  }, []);

  const finishClose = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    delete dialog?.dataset.state;
    locked.current = false;
    document.body.style.overflow = previousOverflow.current;
    lenis?.start();
    triggerRef.current?.focus({ preventScroll: true });
    triggerRef.current = null;
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-title"
      className="project-dialog"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
    >
      <AnimatePresence onExitComplete={finishClose}>
        {project && (
          <motion.div
            key={project.id}
            className="flex min-h-0 max-h-[inherit] flex-col"
            initial={{ opacity: 0, scale: 0.92, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.22, ease: EASE_EXPO } }}
            transition={SPRING_MODAL}
          >
            <ModalBody lang={lang} project={project} onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}

function ModalBody({ lang, project, onClose }: { lang: Locale; project: ProjectItem; onClose: () => void }) {
  const copy = portfolioCopy[lang];
  const images = project.galleryImages.length > 0 ? project.galleryImages : [project.coverImage];
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = images[activeImage] ?? images[0];

  return (
    <>
      {/* Modal Header: metadata only, sentence case */}
      <div className="flex shrink-0 items-center justify-between gap-3 px-5 md:px-8 py-3 border-b border-line bg-white">
        <p className="min-w-0 type-meta text-body">
          {project.serviceTags.join(" · ")} <span aria-hidden="true" className="text-line">•</span> {project.client} ({project.year})
        </p>
        <motion.button
          onClick={onClose}
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          transition={SPRING_INTERACTIVE}
          className="w-11 h-11 shrink-0 rounded-full bg-(--agx-tint) hover:bg-(--agx-ink) flex items-center justify-center text-ink hover:text-white transition-colors cursor-pointer"
          aria-label={copy.closeDetails}
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Modal Scrollable Body — data-lenis-prevent keeps wheel events local while the page is frozen */}
      <div data-lenis-prevent className="min-h-0 overflow-y-auto overscroll-contain p-5 md:p-8 space-y-8">

        {/* Title leads; the client/prototype badge follows it rather than sitting above it. */}
        <div className="space-y-3">
          <h2 id="project-title" tabIndex={-1} className="type-subhead text-ink max-w-[40ch]">
            {project.title}
          </h2>
          <p className="badge-pill">
            {project.type === "client" ? copy.modal.badgeClient : project.type === "product" ? copy.caseStudy.badgeProduct : copy.caseStudy.badgePrototype}
          </p>
          <p className="type-intro text-body max-w-[60ch]">
            {project.summary}
          </p>
        </div>

        {/* The screenshot on the blush-blue panel, the site's 1.75rem card radius. */}
        <div className="rounded-[1.75rem] bg-(--agx-tint) p-2.5 md:p-3">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] bg-white">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentImage}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_EXPO }}
              >
                <Image
                  src={currentImage}
                  alt={copy.imageAlt(project.title, activeImage + 1, images.length)}
                  fill
                  sizes="(max-width: 900px) 100vw, 900px"
                  className="object-contain p-3 md:p-4"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Challenge & solution: two plain columns under a rule, not two boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="border-t border-line pt-4 space-y-2">
            <h3 className="type-card-title text-ink">{copy.challenge}</h3>
            <p className="type-body-card text-body max-w-[60ch]">{project.challenge}</p>
          </section>
          <section className="border-t border-line pt-4 space-y-2">
            <h3 className="type-card-title text-ink">{copy.solution}</h3>
            <p className="type-body-card text-body max-w-[60ch]">{project.solution}</p>
          </section>
        </div>

        {/* Impact / Key Outcome: the one tinted callout in the dialog */}
        {project.impact && (
          <section className="p-5 rounded-[1.25rem] bg-(--agx-tint) flex items-start gap-3">
            <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-brand shrink-0 mt-1" />
            <div className="space-y-1">
              <h3 className="type-card-title text-ink">{copy.impact}</h3>
              <p className="type-body-card font-medium text-ink max-w-[60ch]">{project.impact}</p>
            </div>
          </section>
        )}

        {/* Tech Stack Tags */}
        <div className="space-y-3">
          <h3 className="type-label text-ink">{copy.technologies}</h3>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="type-meta px-3.5 py-1.5 rounded-full border border-line bg-white text-ink">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery thumbnails — select to swap the main preview */}
        {images.length > 1 && (
          <div className="space-y-3 pt-4 border-t border-line">
            <h3 className="type-label text-ink">{copy.modal.otherViews}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img, i) => {
                const isActive = i === activeImage;
                return (
                  <motion.button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-pressed={isActive}
                    aria-label={copy.modal.showPreview(i + 1, images.length)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97, y: -2 }}
                    transition={SPRING_INTERACTIVE}
                    className={`relative rounded-xl border overflow-hidden bg-surface aspect-[16/10] cursor-pointer transition-[border-color,box-shadow] duration-300 ${
                      isActive
                        ? "border-brand/60 shadow-card"
                        : "border-line hover:border-brand/40"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-contain p-2"
                    />
                    {isActive && (
                      <motion.span
                        layoutId="gallery-active-ring"
                        aria-hidden="true"
                        transition={SPRING_INTERACTIVE}
                        className="absolute inset-0 rounded-xl ring-2 ring-inset ring-brand pointer-events-none"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Modal Footer CTA: the dialog's one solid button, on the content's left edge */}
      <div className="px-5 md:px-8 py-4 shrink-0 border-t border-line bg-white flex flex-wrap items-center gap-4">
        <a
          href={getWhatsAppUrl(copy.whatsappSimilar(project.title), lang, { service: (lang === "id" ? "Sistem seperti " : "A system like ") + project.title })}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary group"
        >
          <WhatsAppIcon size={18} />
          <span>{copy.discussSimilar}</span>
          <ArrowSwap className="w-4 h-4" />
        </a>
      </div>
    </>
  );
}

