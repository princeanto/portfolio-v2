'use client';
import React from 'react';
import Image from 'next/image';
import { Section, Reveal, EmphasisText } from './section';
import { ABOUT, PROFILE, SERVICES } from '../_lib/data';

export default function About() {
  return (
    <Section id="about" label="About me">
      <div className="flex flex-col items-start gap-10 sm:flex-row sm:gap-14">
        <Reveal className="flex-shrink-0">
          {/* Arch / squircle portrait, as used in the reference */}
          <div
            className="relative h-[200px] w-[200px] overflow-hidden sm:h-[230px] sm:w-[230px]"
            style={{ borderRadius: '110px 110px 28px 28px', background: 'var(--panel)' }}
          >
            <Image
              src={ABOUT.portrait}
              alt={PROFILE.name}
              width={460}
              height={460}
              className="h-full w-full object-cover object-[center_18%]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08} className="flex-1">
          <EmphasisText
            parts={[...ABOUT.statement]}
            className="text-[clamp(1.6rem,3.4vw,2.75rem)] font-medium leading-[1.18] tracking-[-0.03em]"
          />
        </Reveal>
      </div>

      <div className="mt-16 max-w-[62ch] space-y-6">
        {ABOUT.paragraphs.map((para, i) => (
          <Reveal key={i} delay={0.05 * i}>
            <p className="text-[17px] leading-[1.6]" style={{ color: 'var(--body)' }}>
              {para}
            </p>
          </Reveal>
        ))}
      </div>

      {/* Disciplines, as a quiet list rather than cards */}
      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
        {SERVICES.map((service, i) => (
          <Reveal key={service.title} delay={0.04 * i}>
            <div className="border-t pt-5" style={{ borderColor: 'var(--line)' }}>
              <h3 className="text-[17px] font-semibold">{service.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: 'var(--body)' }}>
                {service.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14 flex justify-center">
          <a href={PROFILE.resume} download="Prince_Ladislas_Resume.pdf" className="btn-solid">
            Here&apos;s my CV
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
