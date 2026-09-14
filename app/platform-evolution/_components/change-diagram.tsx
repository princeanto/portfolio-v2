"use client";

import { motion, useReducedMotion } from "motion/react";

const BEFORE_SERVICES = ["PAN check", "Aadhaar check", "OCR", "Face match", "Penny-drop"];

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-none text-muted-foreground"
    >
      <path d="M4 12h16m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

function FlowArrow() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="relative h-4 w-6 flex-none overflow-hidden">
      <svg
        width="24"
        height="16"
        viewBox="0 0 24 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 text-muted-foreground"
      >
        <path d="M0 8h20m0 0-5-5m5 5-5 5" />
      </svg>
      {!prefersReducedMotion ? (
        <motion.span
          aria-hidden
          className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[var(--accent-a)]"
          animate={{ left: ["0%", "70%"], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "easeInOut",
          }}
        />
      ) : null}
    </div>
  );
}

export function ChangeDiagram() {
  return (
    <div className="mt-10 rounded-lg border border-border bg-surface/50 p-6 sm:p-8">
      <div>
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Before
        </span>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-none rounded-xl border border-border bg-surface px-4 py-3 text-center text-sm font-medium text-foreground/85">
            Client
          </div>
          <div className="hidden sm:block">
            <ArrowRight />
          </div>
          <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
            {BEFORE_SERVICES.map((service) => (
              <div
                key={service}
                className="rounded-lg border border-border px-3 py-2 text-center text-xs text-muted-foreground"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          One integration per service — stitched together by a team, per
          client.
        </p>
      </div>

      <div className="my-8 border-t border-border" />

      <div>
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          After
        </span>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-none rounded-xl border border-border bg-surface px-4 py-3 text-center text-sm font-medium text-foreground/85">
            Client
          </div>
          <FlowArrow />
          <div className="flex-1 rounded-xl border border-[var(--accent-a)] px-4 py-3 text-center">
            <div className="text-sm font-medium text-foreground">
              Composed flow
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              100+ services available
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          One endpoint. The sequence lives in the flow, not in the
          client&apos;s integration.
        </p>
      </div>
    </div>
  );
}
