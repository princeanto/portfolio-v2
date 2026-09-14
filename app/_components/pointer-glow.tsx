'use client';
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useSafeReducedMotion } from './section';

/**
 * A soft light that trails the pointer across the page background.
 * Sits behind all content, ignores pointer events, and is intentionally
 * faint — it should read as depth, not as an effect.
 */
export default function PointerGlow() {
  const reduced = useSafeReducedMotion();

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);

  // Heavily damped so it drifts after the cursor rather than snapping to it
  const sx = useSpring(x, { stiffness: 45, damping: 22, mass: 1.1 });
  const sy = useSpring(y, { stiffness: 45, damping: 22, mass: 1.1 });

  const background = useTransform(
    [sx, sy],
    ([cx, cy]: number[]) =>
      `radial-gradient(560px circle at ${cx}px ${cy}px, var(--pointer-glow), transparent 70%)`
  );

  useEffect(() => {
    if (reduced) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background }}
    />
  );
}
