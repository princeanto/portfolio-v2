'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './theme';
import { PROFILE, NAV_PRIMARY, NAV_ALL } from '../_lib/data';

function useScrollState(anchors: string[]) {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(anchors[0] ?? '');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);

      // The section nearest above the upper third wins. Comparing positions
      // rather than taking the last match keeps this correct even if the nav
      // is ordered differently from the document.
      const probe = window.innerHeight * 0.35;
      let current = anchors[0] ?? '';
      let best = -Infinity;
      for (const href of anchors) {
        const el = document.getElementById(href.slice(1));
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= probe && top > best) {
          best = top;
          current = href;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [anchors]);

  return { progress, scrolled, active };
}

export default function Header() {
  const anchors = React.useMemo(() => NAV_PRIMARY.map(i => i.href), []);
  const { progress, scrolled, active } = useScrollState(anchors);
  const [open, setOpen] = useState(false);

  const go = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Scroll progress rail, standing in for the hidden scrollbar */}
      <div
        className="pointer-events-none fixed right-0 top-0 z-[60] hidden h-screen w-[2px] lg:block"
        style={{ background: 'var(--line)' }}
        aria-hidden="true"
      >
        <div
          className="w-full origin-top transition-[height] duration-150 ease-out"
          style={{ height: `${progress}%`, background: 'var(--fg)' }}
        />
      </div>

      <header
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
        style={
          scrolled
            ? {
                background: 'color-mix(in srgb, var(--bg) 82%, transparent)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--line)',
              }
            : { background: 'transparent', borderBottom: '1px solid transparent' }
        }
      >
        <div className="shell flex items-center justify-between gap-6 py-4">
          <Link
            href="#top"
            onClick={e => go(e, '#top')}
            aria-label={`${PROFILE.name} — back to top`}
            className="flex flex-shrink-0 items-center"
          >
            <Image
              src="/assets/images/logo.png"
              alt=""
              width={72}
              height={72}
              aria-hidden="true"
              className="h-[34px] w-auto"
              style={{ filter: 'var(--logo-filter)' }}
              priority
            />
          </Link>

          {/* Segmented pill nav */}
          <nav
            className="hidden items-center gap-1 rounded-[14px] border p-1.5 backdrop-blur-xl lg:flex"
            style={{ background: 'var(--nav)', borderColor: 'var(--line)' }}
            aria-label="Primary"
          >
            {NAV_PRIMARY.map(item => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={e => go(e, item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={item.icon ? item.label : undefined}
                  className="nav-link relative whitespace-nowrap rounded-[10px] px-3 py-2 text-[13px] xl:px-3.5 xl:text-[14px]"
                >
                  {isActive && (
                    <motion.span
                      layoutId="v2-nav-pill"
                      className="absolute inset-0 rounded-[10px]"
                      style={{ background: 'var(--nav-active)' }}
                      /* Tween, not spring: it lands on time with no wobble.
                         0.26s on a power3-out curve, the timing ReactBits'
                         PillNav uses for the same move. */
                      transition={{ type: 'tween', duration: 0.26, ease: [0.165, 0.84, 0.44, 1] }}
                    />
                  )}
                  <span className="relative z-10 flex items-center">
                    {/* Home leads the run as an icon; the rest are words */}
                    {item.icon === 'home' ? (
                      <Home size={16} strokeWidth={1.9} aria-hidden="true" />
                    ) : (
                      item.label
                    )}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="flex flex-shrink-0 items-center gap-3">
            <Link
              href={PROFILE.contactForm}
              target="_blank"
              className="hidden items-center gap-2 rounded-[10px] border px-4 py-2 text-[15px] transition-colors duration-300 lg:inline-flex"
              style={{ borderColor: 'var(--line)', color: 'var(--fg)' }}
            >
              {/* Green, the way a status light reads as "open" */}
              <span
                className="h-[7px] w-[7px] flex-shrink-0 rounded-full"
                style={{
                  background: 'var(--live)',
                  boxShadow: '0 0 0 3px color-mix(in srgb, var(--live) 20%, transparent)',
                }}
              />
              Let&apos;s talk
            </Link>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex items-center gap-2.5 text-[15px] lg:hidden"
              style={{ color: 'var(--fg)' }}
            >
              {open ? 'Close' : 'Menu'}
              <span className="relative flex h-4 w-5 flex-col items-center justify-center">
                <motion.span
                  className="absolute block h-[1.5px] w-5"
                  style={{ background: 'var(--fg)', top: '35%' }}
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.28 }}
                />
                <motion.span
                  className="absolute block h-[1.5px] w-5"
                  style={{ background: 'var(--fg)', top: '65%' }}
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.28 }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu for small screens */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center lg:hidden"
            style={{ background: 'var(--bg)' }}
          >
            <div className="shell">
              <nav className="flex flex-col gap-1">
                {NAV_ALL.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={e => go(e, item.href)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="link text-4xl font-medium tracking-[-0.02em] sm:text-5xl"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-14 flex flex-col gap-6"
              >
                <div>
                  <p className="mb-2 text-[15px]" style={{ color: 'var(--muted)' }}>Say hello</p>
                  <a href={`mailto:${PROFILE.email}`} className="link text-[15px]">
                    {PROFILE.email}
                  </a>
                </div>
                <div>
                  <p className="mb-2 text-[15px]" style={{ color: 'var(--muted)' }}>Connect</p>
                  <div className="flex gap-5">
                    {PROFILE.socials.map(s => (
                      <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-[15px]">
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
