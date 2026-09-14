"use client";

import Image from "next/image";
import { Reveal } from "../_lib/reveal";
import { useGalleryOpen } from "../_lib/gallery-lightbox";

function ImageIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted-foreground/60"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

export function ImagePlaceholder({
  aspect = "16/9",
  label,
  note,
  delay = 0,
  src,
}: {
  aspect?: "16/9" | "4/3" | "3/4" | "21/9" | (string & {});
  label: string;
  note?: string;
  delay?: number;
  src?: string;
}) {
  const openImage = useGalleryOpen(src);

  if (src) {
    return (
      <Reveal delay={delay}>
        <figure>
          <button
            type="button"
            onClick={openImage ?? undefined}
            disabled={!openImage}
            aria-label={`View ${label} full size`}
            style={{ aspectRatio: aspect.replace("/", " / ") }}
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-surface text-left transition-colors duration-300 hover:border-[var(--accent-a)] disabled:cursor-default disabled:hover:border-border"
          >
            <Image
              src={src}
              alt={label}
              fill
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
          <figcaption className="mt-2.5 flex flex-col gap-1">
            <span className="text-[13px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
              {label}
            </span>
            {note ? (
              <span className="max-w-[42ch] text-[12px] leading-relaxed text-muted-foreground/70">
                {note}
              </span>
            ) : null}
          </figcaption>
        </figure>
      </Reveal>
    );
  }

  return (
    <Reveal delay={delay}>
      <div
        style={{ aspectRatio: aspect.replace("/", " / ") }}
        className="flex w-full flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-border-strong bg-surface/60 px-6 py-8 text-center"
      >
        <ImageIcon />
        <span className="text-[13px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
          {label}
        </span>
        {note ? (
          <span className="max-w-[42ch] text-[12px] leading-relaxed text-muted-foreground/70">
            {note}
          </span>
        ) : null}
      </div>
    </Reveal>
  );
}
