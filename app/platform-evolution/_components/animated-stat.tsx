"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate, useReducedMotion } from "motion/react";

export function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";

  /* null means "the count-up hasn't started". The server renders in that
     state, so the HTML carries the real number instead of a zero. It only
     drops to 0 once the animation actually begins, on the client. */
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    if (!isInView || target === null || prefersReducedMotion) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target, prefersReducedMotion]);

  if (target === null) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {display ?? target}
      {suffix}
    </span>
  );
}
