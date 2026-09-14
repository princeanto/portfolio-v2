'use client';
import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * `useReducedMotion` reads a media query, so it is false during SSR and can
 * flip to true on the client — branching on it directly changes the rendered
 * tree and breaks hydration. Reporting false until after mount keeps the
 * server and first client render identical.
 */
export function useSafeReducedMotion() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? Boolean(reduced) : false;
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useSafeReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** "Selected projects ─────────────────" — the rule draws in on view */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  const reduced = useSafeReducedMotion();

  if (reduced) {
    return (
      <div className="section-label">
        <span>{children}</span>
        <span />
      </div>
    );
  }

  return (
    <div className="section-label">
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}

export function Section({
  id,
  label,
  children,
  className = '',
}: {
  id?: string;
  label?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 pt-28 sm:pt-40 ${className}`}>
      <div className="shell">
        {label && <div className="mb-14">{<SectionLabel>{label}</SectionLabel>}</div>}
        {children}
      </div>
    </section>
  );
}

/**
 * Renders a sentence where selected fragments are pulled to full contrast
 * and the rest recedes — the emphasis device used throughout the reference.
 */
export function EmphasisText({
  parts,
  className = '',
}: {
  parts: { text: string; em: boolean }[];
  className?: string;
}) {
  return (
    <p className={className} style={{ color: 'var(--body)' }}>
      {parts.map((part, i) =>
        part.em ? (
          <span key={i} style={{ color: 'var(--fg)' }}>
            {part.text}
          </span>
        ) : (
          <React.Fragment key={i}>{part.text}</React.Fragment>
        )
      )}
    </p>
  );
}
