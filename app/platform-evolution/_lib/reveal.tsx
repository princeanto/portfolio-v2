"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  delay = 0,
  className,
  children,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay: prefersReducedMotion ? 0 : delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
