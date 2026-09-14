"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type GalleryImageEntry = {
  src: string;
  alt: string;
  aspect: string;
};

function parseAspect(aspect: string): { width: number; height: number } {
  const [w, h] = aspect.split("/").map((v) => parseFloat(v.trim()));
  if (!w || !h) return { width: 1600, height: 900 };
  return { width: w, height: h };
}

const GalleryContext = createContext<((src: string) => void) | null>(null);

export function GalleryProvider({
  images,
  children,
}: {
  images: GalleryImageEntry[];
  children: React.ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = useCallback(
    (src: string) => {
      const idx = images.findIndex((img) => img.src === src);
      if (idx !== -1) setActiveIndex(idx);
    },
    [images],
  );
  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);
  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, next, prev]);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;
  const dims = activeImage ? parseAspect(activeImage.aspect) : null;

  return (
    <GalleryContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {activeImage && dims ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
            onClick={close}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-8 sm:top-8"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:left-6"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            ) : null}

            <motion.div
              key={activeImage.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                width={dims.width}
                height={dims.height}
                unoptimized
                className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-lg object-contain"
              />
            </motion.div>

            {images.length > 1 ? (
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[13px] text-white/60 sm:bottom-8">
                {(activeIndex ?? 0) + 1} / {images.length}
              </span>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </GalleryContext.Provider>
  );
}

export function useGalleryOpen(src: string | undefined) {
  const open = useContext(GalleryContext);
  if (!src || !open) return null;
  return () => open(src);
}
