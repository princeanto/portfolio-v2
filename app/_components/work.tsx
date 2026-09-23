'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { Section, Reveal, useSafeReducedMotion } from './section';
import Overlay from './overlay';
import { PROJECTS, type Project } from '../_lib/data';

function Viewer({ project, onClose }: { project: Project; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Overlay label={project.name} onClose={onClose}>
      {project.route ? (
        <iframe
          src={project.route}
          title={project.name}
          className="block h-[84vh] w-full rounded-[13px] border-0"
          loading="lazy"
        />
      ) : (
        <>
          {!loaded && (
            <div className="flex h-72 items-center justify-center text-sm" style={{ color: 'var(--muted)' }}>
              Loading…
            </div>
          )}
          <Image
            src={project.full ?? project.art}
            alt={project.name}
            width={1600}
            height={3200}
            className={`h-auto w-full rounded-[13px] transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
          />
        </>
      )}
    </Overlay>
  );
}

/**
 * Media panel that tilts toward the pointer, with the artwork drifting
 * slightly the other way for depth. Cursor styling is deliberately
 * untouched. Falls back to a static panel when reduced motion is set.
 */
function TiltMedia({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSafeReducedMotion();

  // -0.5 .. 0.5 across each axis of the panel
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 200, damping: 22, mass: 0.4 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [-0.5, 0.5], [7, -7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-5, 5]);
  // artwork drifts opposite the tilt, which reads as depth
  const artX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const artY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const glowX = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);
  const glow = useTransform(
    [glowX, glowY],
    ([x, y]: string[]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.09), transparent 60%)`
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className="block w-full flex-shrink-0 sm:w-[58%]"
      style={{ perspective: 1100 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      ref={ref}
    >
      <motion.div
        className="media relative overflow-hidden p-3 sm:p-4"
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, transformStyle: 'preserve-3d', willChange: 'transform' }
        }
      >
        {/* highlight tracking the pointer */}
        {!reduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glow }}
          />
        )}

        <motion.div style={reduced ? undefined : { x: artX, y: artY }}>
          <Image
            src={project.art}
            alt={project.name}
            width={838}
            height={592}
            sizes="(max-width: 640px) 100vw, 58vw"
            className="w-full rounded-[10px] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const flipped = index % 2 === 1;

  return (
    <>
      <Reveal delay={index === 0 ? 0 : 0.04} className={index === 0 ? '' : 'pt-24 sm:pt-32'}>
        <article>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Open ${project.name}`}
            className={`group flex w-full flex-col items-center gap-8 text-left sm:gap-12 ${
              flipped ? 'sm:flex-row-reverse' : 'sm:flex-row'
            }`}
          >
            <TiltMedia project={project} />

            {/* Meta — fills the column that used to sit empty */}
            <span className="block w-full flex-1">
              <span className="flex items-start justify-between gap-4">
                <span className="text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-tight tracking-[-0.02em]">
                  {project.name}
                </span>
                <span className="chip flex-shrink-0" style={{ color: 'var(--body)' }}>
                  {project.period}
                </span>
              </span>

              <span
                className="mt-3 block text-[clamp(1rem,1.3vw,1.15rem)] leading-snug"
                style={{ color: 'var(--body)' }}
              >
                {project.subtitle}
              </span>

              <span className="mt-6 flex flex-wrap gap-2">
                {project.chips.map(chip => (
                  <span key={chip} className="chip">
                    {chip}
                  </span>
                ))}
              </span>

              <span
                className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium"
                style={{ color: 'var(--fg)' }}
              >
                View case study
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </span>
          </button>
        </article>
      </Reveal>

      <AnimatePresence>
        {open && <Viewer project={project} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function Work() {
  // The heading for this section is the scroll cue at the foot of the hero,
  // directly above it — a second one here would only repeat it.
  return (
    <Section id="work" className="!pt-10">
      {PROJECTS.map((project, i) => (
        <ProjectEntry key={project.id} project={project} index={i} />
      ))}
    </Section>
  );
}
