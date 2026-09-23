'use client';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Section, Reveal } from './section';
import { PROFILE } from '../_lib/data';

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <Section id="contact" className="pb-24">
      <Reveal>
        <div className="section-label">
          <span>Contact</span>
          <span />
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-14 max-w-[16ch] text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[1.05] tracking-[-0.035em]">
          Every conversation starts with a{' '}
          hello.
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn-solid gap-2"
          >
            Let&apos;s chat
            <ArrowUpRight size={16} />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="btn-ghost"
          >
            {PROFILE.email}
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div
          className="mt-20 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: 'var(--line)' }}
        >
          <p className="text-[15px]" style={{ color: 'var(--muted)' }}>
            © {year} {PROFILE.name} — {PROFILE.location}
          </p>
          <div className="flex gap-6">
            {PROFILE.socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="link text-[15px]" style={{ color: 'var(--muted)' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
