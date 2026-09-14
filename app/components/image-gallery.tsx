"use client";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";

export interface GalleryImage { src: string; alt?: string }
interface ImageGalleryProps { images: GalleryImage[]; index: number; onClose: () => void; onNavigate: (i: number) => void }

export function ImageGallery({ images, index, onClose, onNavigate }: ImageGalleryProps) {
  const total = images.length;
  const goPrev = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate]);
  const goNext = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = prev; };
  }, [goPrev, goNext, onClose]);

  const current = images[index];
  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        role="dialog" aria-modal="true"
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
          <FiX className="w-5 h-5" />
        </button>
        <button onClick={goPrev} aria-label="Previous" className="absolute left-3 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={goNext} aria-label="Next" className="absolute right-3 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
          <FiChevronRight className="w-6 h-6" />
        </button>
        <div className="w-full max-w-5xl relative">
          <motion.div
            key={current.src + index}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/40"
          >
            <Image src={current.src} alt={current.alt || 'Gallery image'} fill sizes="100vw" priority className="object-contain select-none" />
          </motion.div>
          <div className="mt-4 text-center text-sm text-white/70">{index + 1} / {total}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
