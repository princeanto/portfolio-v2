'use client';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import PointerGlow from './pointer-glow';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'v2-theme';

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored) setTheme(stored);
    } catch {
      /* storage blocked — fall back to the default */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* non-fatal */
      }
      return next;
    });
  }, []);

  // Keep the browser chrome (form controls, scrollbars) in step with the theme
  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <div className={`v2 ${theme === 'light' ? 'light' : ''} relative min-h-screen`}>
        <PointerGlow />
        <div className="vignette" aria-hidden="true" />
        {/* content sits above the background layers */}
        <div className="relative z-10">{children}</div>
      </div>
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-[10px] border transition-colors duration-300 hover:border-[var(--fg)]"
      style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted && theme === 'dark' ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inline-flex"
        >
          {mounted && theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
