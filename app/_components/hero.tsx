'use client';
import React from 'react';
import { motion } from 'motion/react';
import ResumeLink from './resume-link';
import { PROFILE } from '../_lib/data';

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="shell relative z-10 flex min-h-[100svh] flex-col pb-12 pt-[24vh] max-[640px]:pt-[20vh]">
        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="text-[17px]"
          style={{ color: 'var(--body)' }}
        >
          Hi there,
        </motion.p>

        <motion.h1
          variants={rise}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mt-4 max-w-[24ch] text-[clamp(2.25rem,5.4vw,4.5rem)] font-medium leading-[1.16] tracking-[-0.035em]"
          style={{ color: 'var(--body)' }}
        >
          <span className="font-bold" style={{ color: 'var(--fg)' }}>
            I&apos;m Prince,
          </span>{' '}
          a {PROFILE.role} turning complex systems into{' '}
          <span style={{ color: 'var(--fg)' }}>elegant products</span>.
        </motion.h1>

        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-7 max-w-[52ch] text-[clamp(1.0625rem,1.6vw,1.5rem)] leading-[1.45] tracking-[-0.015em]"
          style={{ color: 'var(--body)' }}
        >
          With a <span style={{ color: 'var(--fg)' }}>detail-obsessed</span> approach and{' '}
          <span style={{ color: 'var(--fg)' }}>6+ years of fintech craft</span>, including recent
          work at <span style={{ color: 'var(--fg)' }}>M2P Fintech</span>, I obsess over converting
          intricate systems into{' '}
          <span style={{ color: 'var(--fg)' }}>refined, scalable products</span>.
        </motion.p>

        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn-solid">
            Let&apos;s work together
          </a>
          <ResumeLink className="btn-ghost">Download résumé</ResumeLink>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="section-label mt-auto pt-16 text-left"
          aria-label="Jump to selected works"
        >
          <span>Selected works</span>
          <span />
        </motion.button>
      </div>
    </section>
  );
}
