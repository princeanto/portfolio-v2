'use client';
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * The scrollable popup shell shared by every full-screen overlay: a scrim over
 * the dimmed page and a raised panel that grows with its content and scrolls
 * vertically, so long-form artwork stays readable at full width.
 *
 * The scrim itself must not be the scrolling element. It carries a
 * backdrop-filter, which makes it a containing block for fixed-position
 * descendants — a `fixed` close button inside a scrolling scrim anchors to the
 * scrim and scrolls out of view. Scrolling therefore happens in an inner
 * layer, leaving the button anchored to the (fixed) scrim.
 */
export default function Overlay({
  label,
  onClose,
  children,
  maxWidthClass = 'max-w-[80rem]',
  padClass = 'p-2',
}: {
  label: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass?: string;
  padClass?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const cached = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = cached;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="scrim fixed inset-0 z-[90]"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      {/* Scroll layer — clicking the surrounding space closes */}
      <div className="absolute inset-0 overflow-auto p-4 sm:p-8 sm:pt-14" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.99 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`media raised mx-auto w-full ${maxWidthClass} ${padClass}`}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </div>

      {/* Anchored to the scrim, so it stays put however far the content scrolls */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="raised absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
        style={{ color: 'var(--fg)' }}
      >
        <X size={18} />
      </button>
    </motion.div>
  );
}
