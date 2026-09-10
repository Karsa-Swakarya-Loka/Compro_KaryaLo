"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/portfolio";
import { X, CheckCircle2, ShieldCheck } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { EASE_EXPO, SPRING_INTERACTIVE, SPRING_MODAL } from "@/components/motion/tokens";
import ArrowSwap from "@/components/motion/ArrowSwap";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

/**
 * Native <dialog> for focus trapping and Escape handling; motion handles the
 * zoom in/out of the panel while CSS animates ::backdrop (0 → 12px blur).
 * The dialog stays mounted so the exit animation can finish before `close()`.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef("");
  const lenis = useLenis();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project) {
      if (dialog.open) return;
      triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      lenis?.stop();
      dialog.dataset.state = "open";
      dialog.showModal();
    } else if (dialog.open) {
      dialog.dataset.state = "closing";
    }
  }, [project, lenis]);

  // Safety net: restore page scroll if the modal unmounts while open (route change).
  useEffect(() => {
    return () => {
      document.body.style.overflow = previousOverflow.current;
      lenis?.start();
    };
  }, [lenis]);

  const finishClose = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    delete dialog?.dataset.state;
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
            <ModalBody project={project} onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}

function ModalBody({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const images = project.galleryImages.length > 0 ? project.galleryImages : [project.coverImage];
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = images[activeImage] ?? images[0];

  return (
    <>
      {/* Modal Header */}
      <div className="flex shrink-0 items-center justify-between gap-3 px-5 py-4 border-b border-slate-200 bg-white">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-meta text-xs font-bold text-accent uppercase tracking-wider">
            {project.serviceTags.join(" · ")}
          </span>
          <span className="text-slate-300">•</span>
          <span className="font-meta text-xs font-semibold text-slate-600 uppercase">
            {project.client} ({project.year})
          </span>
        </div>
        <motion.button
          onClick={onClose}
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          transition={SPRING_INTERACTIVE}
          className="w-11 h-11 shrink-0 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm cursor-pointer"
          aria-label="Tutup Detail Proyek"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Modal Scrollable Body — data-lenis-prevent keeps wheel events local while the page is frozen */}
      <div data-lenis-prevent className="min-h-0 overflow-y-auto overscroll-contain p-5 md:p-8 space-y-8">

        {/* Title & Category */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist/25 border border-mist font-meta text-[11px] font-bold text-midnight uppercase tracking-wider">
            {project.type === "client" ? "Studi Kasus Klien" : "Purwarupa Internal"}
          </div>
          <h2 id="project-title" tabIndex={-1} className="font-story text-2xl md:text-3xl font-bold text-midnight leading-tight">
            {project.title}
          </h2>
          <p className="font-story text-slate-600 text-base md:text-lg leading-relaxed pt-1">
            {project.summary}
          </p>
        </div>

        {/* Anti-Bleed macOS Browser Frame with Matte Stage */}
        <div className="rounded-2xl border border-slate-300/80 overflow-hidden bg-midnight shadow-xl">
          <div className="h-8 bg-midnight px-4 flex items-center justify-between border-b border-midnight-light">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-mist" />
              <div className="w-2.5 h-2.5 rounded-full bg-mist" />
              <div className="w-2.5 h-2.5 rounded-full bg-midnight-muted" />
              <span className="font-meta text-[11px] text-midnight-muted truncate pl-3">
                {project.client}
              </span>
            </div>
            <span className="font-meta text-[11px] text-mist uppercase font-semibold tracking-wider">
              Pratinjau
            </span>
          </div>
          {/* Matte Contrast Stage: Soft mist-tinted matte prevents light screenshots from washing out */}
          <div className="relative aspect-[16/10] w-full bg-matte p-2.5 md:p-4">
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm border border-slate-300/80 bg-white ring-1 ring-black/5">
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
                    alt={activeImage === 0 ? project.title : `${project.title} — tampilan ${activeImage + 1}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 900px"
                    className="object-contain p-2 md:p-3"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2">
            <span className="font-meta text-xs font-bold text-amber-800 uppercase tracking-wider">
              Masalah yang Dihadapi
            </span>
            <p className="font-story text-slate-700 text-sm md:text-base leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-mist/20 border border-mist space-y-2">
            <span className="font-meta text-xs font-bold text-midnight uppercase tracking-wider">
              Cara Kami Menyelesaikannya
            </span>
            <p className="font-story text-slate-700 text-sm md:text-base leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Impact / Key Outcome */}
        {project.impact && (
          <div className="p-5 rounded-2xl bg-mist/80 border border-mist-border flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-midnight shrink-0 mt-0.5" />
            <div>
              <span className="font-meta text-xs font-bold text-midnight uppercase tracking-wider block">
                Hasilnya
              </span>
              <p className="font-story text-midnight text-sm md:text-base font-medium mt-1">
                {project.impact}
              </p>
            </div>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="space-y-3 pt-2">
          <span className="font-meta text-xs font-bold text-slate-600 uppercase tracking-wider">
            Teknologi yang Dipakai
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-meta px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Gallery thumbnails — select to swap the main preview */}
        {images.length > 1 && (
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <span className="font-meta text-xs font-bold text-slate-600 uppercase tracking-wider">
              Tampilan Lainnya
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img, i) => {
                const isActive = i === activeImage;
                return (
                  <motion.button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-pressed={isActive}
                    aria-label={`Tampilkan pratinjau ${i + 1} dari ${images.length}`}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97, y: -2 }}
                    transition={SPRING_INTERACTIVE}
                    className={`relative rounded-xl border overflow-hidden bg-matte p-2 aspect-[16/10] cursor-pointer transition-[border-color,box-shadow] duration-300 ${
                      isActive
                        ? "border-accent/70 shadow-md shadow-accent/10"
                        : "border-slate-300/80 hover:border-slate-400 shadow-sm"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-white border border-slate-200/90 shadow-xs">
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-contain p-1.5"
                      />
                    </div>
                    {isActive && (
                      <motion.span
                        layoutId="gallery-active-ring"
                        aria-hidden="true"
                        transition={SPRING_INTERACTIVE}
                        className="absolute inset-0 rounded-xl ring-2 ring-inset ring-accent pointer-events-none"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Modal Footer CTA */}
      <div className="px-5 py-4 shrink-0 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-meta text-xs text-slate-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span>Source code dan dokumentasinya jadi milik klien</span>
        </div>
        <a
          href={getWhatsAppUrl(`Halo KaryaLo, saya tertarik membangun sistem seperti ${project.title}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-meta px-6 py-2.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors flex items-center gap-1.5 shadow-md shadow-midnight/10"
        >
          <span>Diskusikan Proyek Serupa</span>
          <ArrowSwap className="w-3.5 h-3.5" />
        </a>
      </div>
    </>
  );
}
