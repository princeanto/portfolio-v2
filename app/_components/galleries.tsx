'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Section, Reveal } from './section';
import Overlay from './overlay';
import { UI_WORKS, COMMUNITY_IMAGES, COMMUNITY_WORKS, PLAY } from '../_lib/data';

function GalleryTile({
  img,
  onOpen,
  className = '',
}: {
  img: { src: string; alt: string; w: number; h: number };
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${img.alt}`}
      className={`tile group relative block overflow-hidden rounded-[12px] ${className}`}
      style={{ background: 'var(--panel)' }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    </button>
  );
}

/* Shared lightbox with prev/next --------------------------------------- */

function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const total = images.length;
  const prev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate],
  );
  const next = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    const cached = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = cached;
    };
  }, [onClose, prev, next]);

  const current = images[index];
  if (!current) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="scrim fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {[
        {
          key: 'close',
          node: <X size={17} />,
          cls: 'right-5 top-5',
          fn: onClose,
          label: 'Close',
        },
        {
          key: 'prev',
          node: <ChevronLeft size={20} />,
          cls: 'left-4 top-1/2 -translate-y-1/2',
          fn: prev,
          label: 'Previous',
        },
        {
          key: 'next',
          node: <ChevronRight size={20} />,
          cls: 'right-4 top-1/2 -translate-y-1/2',
          fn: next,
          label: 'Next',
        },
      ].map(b => (
        <button
          key={b.key}
          type="button"
          aria-label={b.label}
          onClick={e => {
            e.stopPropagation();
            b.fn();
          }}
          className={`raised absolute z-20 flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 ${b.cls}`}
          style={{ color: 'var(--fg)' }}
        >
          {b.node}
        </button>
      ))}

      <motion.div
        key={current.src}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative max-h-[86vh] w-full max-w-[80rem]"
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={1600}
          height={1000}
          className="raised mx-auto h-auto max-h-[86vh] w-auto rounded-[12px] object-contain"
        />
        <p className="mt-4 text-center text-[13px]" style={{ color: 'var(--muted)' }}>
          {index + 1} / {total}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* UI works -------------------------------------------------------------- */

export function UiWorks() {
  const [open, setOpen] = useState<number | null>(null);
  const images = UI_WORKS.map(u => ({ src: u.full, alt: u.alt }));

  return (
    <Section id="ui" label="UI works">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {UI_WORKS.map((item, i) => (
          <Reveal key={item.thumb} delay={i * 0.06}>
            {/*
              No surface is painted behind the shot. The thumbnails are
              transparent around a rounded panel of their own, so a panel
              background here would show through those corners as dark
              notches — visible until a hover scaled the image over them.
            */}
            <article
              className="flex h-full flex-col overflow-hidden rounded-[16px] border transition-colors duration-300 hover:border-[var(--fg)]"
              style={{ borderColor: 'var(--line)' }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open ${item.title}`}
                className="group relative block w-full overflow-hidden"
              >
                {/* 3/4 matches the 850×1146 files, so nothing is cropped */}
                <span className="block aspect-[3/4] w-full">
                  <Image
                    src={item.thumb}
                    alt={item.alt}
                    width={850}
                    height={1146}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </span>
                <span
                  className="absolute left-3 top-3 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-white"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>

              {/* Says what the screen is, so the grid reads as work rather
                  than decoration */}
              <div className="border-t p-5" style={{ borderColor: 'var(--line)' }}>
                <p className="text-[15px] font-semibold leading-tight">{item.title}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: 'var(--body)' }}>
                  {item.note}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <GalleryLightbox
            images={images}
            index={open}
            onClose={() => setOpen(null)}
            onNavigate={setOpen}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

/* Creative breaks ------------------------------------------------------- */

export function Play() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <Section id="play" label="Creative breaks">
      <Reveal>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open the Vadivelu UI exploration"
          className="group relative block w-full overflow-hidden rounded-[14px] border text-left"
          style={{ borderColor: 'var(--line)', background: '#0A0A0A' }}
        >
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={PLAY.backdrop}
              alt=""
              width={1920}
              height={600}
              className="absolute right-0 top-0 h-full max-w-[760px] object-cover opacity-90"
            />
          </div>

          <div className="relative flex flex-col items-center gap-8 p-10 sm:flex-row sm:p-14">
            <div className="w-full sm:max-w-[26rem]">
              {/* This panel is always dark, so its type stays white in both themes */}
              <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] font-bold leading-tight text-white">
                {PLAY.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/70">{PLAY.body}</p>
            </div>
            <div className="w-full flex-1">
              <Image
                src={PLAY.preview}
                alt=""
                aria-hidden="true"
                width={1200}
                height={700}
                className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          <span
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-[640px]:opacity-100"
            style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <ArrowUpRight size={18} className="text-white" />
          </span>
        </button>
      </Reveal>

      <AnimatePresence>
        {open && (
          <Overlay label={PLAY.title} onClose={() => setOpen(false)}>
            {!loaded && (
              <div
                className="flex h-72 items-center justify-center text-sm"
                style={{ color: 'var(--muted)' }}
              >
                Loading…
              </div>
            )}
            {/*
              A 3840×13472 long-scroll board — rendered at full panel width so
              it scrolls, rather than being shrunk to fit the viewport height.
            */}
            <Image
              src={PLAY.full}
              alt={PLAY.title}
              width={3840}
              height={13472}
              sizes="(max-width: 1280px) 100vw, 1264px"
              className={`h-auto w-full rounded-[13px] transition-opacity duration-500 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setLoaded(true)}
            />
          </Overlay>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* Community ------------------------------------------------------------- */

export function Community() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="community" label="Community">
      {/*
        Three columns of differing widths (4 / 3 / 5 of twelve). Photos are
        cropped to fill their cell so the columns stay level with each other
        instead of running ragged.
      */}
      <div className="grid grid-cols-12 gap-4">
        {/* Column one — two stacked */}
        <div className="col-span-12 flex flex-col gap-4 sm:col-span-4">
          {COMMUNITY_IMAGES.slice(0, 2).map((img, i) => (
            <GalleryTile key={img.src} img={img} onOpen={() => setOpen(i)} className="h-full" />
          ))}
        </div>

        {/* Column two — two stacked, narrower */}
        <div className="col-span-12 flex flex-col gap-4 sm:col-span-3">
          {COMMUNITY_IMAGES.slice(2, 4).map((img, i) => (
            <GalleryTile key={img.src} img={img} onOpen={() => setOpen(i + 2)} className="h-full" />
          ))}
        </div>

        {/* Column three — a pair side by side, then one full-width beneath */}
        <div className="col-span-12 flex flex-col gap-4 sm:col-span-5">
          <div className="flex gap-4">
            {COMMUNITY_IMAGES.slice(4, 6).map((img, i) => (
              <GalleryTile
                key={img.src}
                img={img}
                onOpen={() => setOpen(i + 4)}
                className="h-full flex-1"
              />
            ))}
          </div>
          <GalleryTile img={COMMUNITY_IMAGES[6]} onOpen={() => setOpen(6)} className="w-full" />
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <GalleryLightbox
            images={COMMUNITY_IMAGES}
            index={open}
            onClose={() => setOpen(null)}
            onNavigate={setOpen}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

/* Community works — behind a button, opened as a popup ------------------ */

export function CommunityWorks() {
  const [listOpen, setListOpen] = useState(false);
  const [shot, setShot] = useState<number | null>(null);
  const images = COMMUNITY_WORKS.map(w => ({ src: w.full, alt: w.title }));

  useEffect(() => {
    if (!listOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setListOpen(false);
    document.addEventListener('keydown', onKey);
    const cached = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = cached;
    };
  }, [listOpen]);

  return (
    <div className="shell pt-20">
      <Reveal>
        <div className="flex justify-center">
          <button type="button" onClick={() => setListOpen(true)} className="btn-ghost">
            Explore community works
          </button>
        </div>
      </Reveal>

      <AnimatePresence>
        {listOpen && (
          <Overlay
            label="Community works"
            onClose={() => setListOpen(false)}
            maxWidthClass="max-w-[70rem]"
            padClass="p-6 sm:p-10"
          >
            <p className="mb-8 text-[22px] font-semibold">Community works</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {COMMUNITY_WORKS.map((item, i) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={`Open ${item.title}`}
                  className="tile group relative block w-full overflow-hidden rounded-[12px] text-left"
                  style={{ background: 'var(--panel)' }}
                >
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    width={1406}
                    height={954}
                    className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    }}
                  >
                    <span className="text-[15px] font-semibold text-white">{item.title}</span>
                    <ArrowUpRight size={16} className="flex-shrink-0 text-white" />
                  </span>
                </button>
              ))}
            </div>
          </Overlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shot !== null && (
          <GalleryLightbox
            images={images}
            index={shot}
            onClose={() => setShot(null)}
            onNavigate={setShot}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
