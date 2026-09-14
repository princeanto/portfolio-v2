'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { Section, Reveal } from './section';
import { TESTIMONIALS } from '../_lib/data';

const INTERVAL = 6500;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((i: number) => {
    setIndex((i + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => go(index + 1), INTERVAL);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, go]);

  const active = TESTIMONIALS[index];

  return (
    <Section id="testimonials" label="Kind words">

      <Reveal>
        <div className="rounded-[20px] p-8 sm:p-12" style={{ background: 'var(--panel)' }}>
          <div className="min-h-[190px] sm:min-h-[150px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[clamp(1.05rem,2vw,1.6rem)] font-medium leading-[1.45] tracking-[-0.015em]">
                  “{active.quote}”
                </p>
                <footer className="mt-6 text-[15px]" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--fg)' }}>{active.name}</span>
                  <span> · {active.role}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={i === index}
                className="relative h-12 w-12 overflow-hidden rounded-[10px] border transition-all duration-300"
                style={{
                  borderColor: i === index ? 'var(--fg)' : 'var(--line)',
                  opacity: i === index ? 1 : 0.45,
                }}
              >
                <Image src={t.avatar} alt="" aria-hidden="true" width={96} height={96} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
