'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Section, Reveal, useSafeReducedMotion } from './section';
import { AI_PLAYGROUND, type AiWork } from '../_lib/data';

/** example.com/thing → example.com — the domain is the credibility signal */
function domainOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
}

/** Initials, used when a card has no screenshot */
function monogram(title: string) {
  const words = title.replace(/^Example\s*—\s*/i, '').split(/\s+/).filter(Boolean);
  return ((words[0]?.[0] ?? '') + (words[1]?.[0] ?? '')).toUpperCase() || '??';
}

function AiCard({ item, index }: { item: AiWork; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useSafeReducedMotion();

  // Pointer-tracked sheen, matching the project cards
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 26, mass: 0.4 };
  const gx = useTransform(useSpring(px, spring), v => `${v * 100}%`);
  const gy = useTransform(useSpring(py, spring), v => `${v * 100}%`);
  const sheen = useTransform(
    [gx, gy],
    ([x, y]: string[]) =>
      `radial-gradient(340px circle at ${x} ${y}, var(--pointer-glow), transparent 62%)`
  );

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  return (
    <Reveal delay={index * 0.06}>
      <a
        ref={ref}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        className="ai-card group relative flex h-full flex-col overflow-hidden rounded-[16px] p-6"
      >
        {!reduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: sheen }}
          />
        )}

        <span className="relative flex items-start justify-between gap-3">
          <span className="chip">{item.kind}</span>
          {item.year && (
            <span className="font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.14em]" style={{ color: 'var(--muted)' }}>
              {item.year}
            </span>
          )}
        </span>

        {/* Screenshot when there is one, otherwise a monogram plate */}
        <span className="media relative mt-5 block aspect-[16/10] w-full overflow-hidden">
          {item.art ? (
            <Image
              src={item.art}
              alt={item.title}
              width={1200}
              height={750}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center text-[2.6rem] font-bold tracking-[-0.03em] transition-transform duration-700 group-hover:scale-[1.06]"
              style={{ color: 'var(--muted)' }}
            >
              {monogram(item.title)}
            </span>
          )}
        </span>

        <span className="relative mt-5 block text-[1.15rem] font-bold leading-tight tracking-[-0.015em]">
          {item.title}
        </span>

        {item.stack && (
          <span className="font-[family-name:var(--font-geist-mono)] relative mt-1.5 block text-[11px] tracking-[0.1em]" style={{ color: 'var(--muted)' }}>
            {item.stack}
          </span>
        )}

        <span className="relative mt-3 block text-[15px] leading-snug" style={{ color: 'var(--body)' }}>
          {item.blurb}
        </span>

        {/* Pushed to the bottom so footers line up across uneven cards */}
        <span
          className="relative mt-auto flex items-center gap-2 pt-6 text-[13px] font-medium"
          style={{ color: 'var(--fg)' }}
        >
          {domainOf(item.href)}
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </a>
    </Reveal>
  );
}

export default function AiPlayground() {
  // Nothing to show yet — render nothing rather than an empty heading
  if (AI_PLAYGROUND.length === 0) return null;

  return (
    <Section id="ai" label="AI playground">
      <Reveal>
        <p className="mb-12 max-w-[46rem] text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed" style={{ color: 'var(--body)' }}>
          Things I built end to end with AI — games, apps and experiments. Each one is live, so
          click through and try it.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {AI_PLAYGROUND.map((item, i) => (
          <AiCard key={item.href + item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
