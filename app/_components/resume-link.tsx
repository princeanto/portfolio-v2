'use client';
import React from 'react';
import { PROFILE } from '../_lib/data';

const FILENAME = 'Prince_Ladislas_Resume.pdf';

/**
 * Saves the résumé and opens it in the next tab, from one click.
 *
 * The anchor keeps a real href and target, so a middle-click, a modified
 * click, or a browser with the popup blocked still opens the PDF — the click
 * handler is the enhancement, not the mechanism.
 */
export default function ResumeLink({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Leave cmd/ctrl/shift-clicks to the browser
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();

    // Save a copy…
    try {
      const a = document.createElement('a');
      a.href = PROFILE.resume;
      a.download = FILENAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      // Download refused (older browser, blocked write) — the tab below still
      // gives them the résumé, so there is nothing worth interrupting them for.
    }

    // …and show it in the next tab.
    window.open(PROFILE.resume, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href={PROFILE.resume}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  );
}
