"use client";

import { motion } from "motion/react";

export function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--grid-line) / var(--grid-opacity)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--grid-line) / var(--grid-opacity)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, black 40%, transparent 90%)",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[-12rem] h-[34rem] w-[42rem] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-a) 32%, transparent) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 20, -10, 0],
          opacity: [0.55, 0.8, 0.6, 0.55],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute right-[8%] top-[6rem] h-[26rem] w-[30rem] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-b) 26%, transparent) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -30, 15, 0],
          y: [0, 25, -15, 0],
          opacity: [0.4, 0.6, 0.45, 0.4],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--background) 96%)",
        }}
      />
    </div>
  );
}
