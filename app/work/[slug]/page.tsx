import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import '../../v2.css';
import { PROJECTS } from '../../_lib/data';
import { PROFILE } from '../../_lib/data';
import { SITE_URL } from '../../_lib/site';

/*
  A page per project, so a case study can be sent as a link rather than only
  opened on the home page.

  The artwork is one very tall exported board per project — up to 32,768px and
  10MB as shipped. Each is pre-sliced into ~1500px pieces under
  /assets/images/case/<slug>/ (see the note in README) so the page streams in
  as it is scrolled instead of downloading megabytes before anything appears.
*/

const CASE_DIR = path.join(process.cwd(), 'public', 'assets', 'images', 'case');

/** The slice filenames for a project, in order. Empty if it has no board. */
function slicesFor(slug: string): string[] {
  try {
    return fs
      .readdirSync(path.join(CASE_DIR, slug))
      .filter(f => f.endsWith('.webp'))
      .sort();
  } catch {
    return [];
  }
}

const bySlug = (slug: string) => PROJECTS.find(p => p.id === slug);

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) return {};

  const title = `${project.name} — ${project.subtitle} | Prince Ladislas`;
  const description = project.metric
    ? `${project.subtitle}. ${project.metric}. A case study by Prince Ladislas, senior product designer.`
    : `${project.subtitle}. A case study by Prince Ladislas, senior product designer.`;
  const url = `${SITE_URL}/work/${project.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      // The real size of the card artwork; declaring 1200x630 it isn't makes
      // some preview crawlers skip the image.
      images: [{ url: project.art, width: 838, height: 592, alt: project.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.art],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) notFound();

  // Connect has a written case study of its own; one URL per project.
  if (project.route) redirect(project.route);

  const slices = slicesFor(project.id);

  return (
    <div className="v2 relative min-h-screen">
      <div className="relative z-10">
        <header className="shell flex items-center justify-between gap-6 py-6">
          <Link href="/#work" className="inline-flex items-center gap-2 text-[15px]">
            <ArrowLeft size={16} />
            All work
          </Link>
          <Link
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-[10px] border px-4 py-2 text-[15px]"
            style={{ borderColor: 'var(--line)', color: 'var(--fg)' }}
          >
            <span
              className="h-[7px] w-[7px] flex-shrink-0 rounded-full"
              style={{ background: 'var(--live)' }}
            />
            Let&apos;s talk
          </Link>
        </header>

        <article className="shell pb-28 pt-10 sm:pt-16">
          <p
            className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.18em]"
            style={{ color: 'var(--muted)' }}
          >
            {project.period}
          </p>

          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            {project.name}
          </h1>

          <p
            className="mt-5 max-w-[48ch] text-[clamp(1.0625rem,1.6vw,1.35rem)] leading-[1.45]"
            style={{ color: 'var(--body)' }}
          >
            {project.subtitle}
          </p>

          {project.metric && (
            <p
              className="font-[family-name:var(--font-geist-mono)] mt-6 flex items-center gap-2.5 text-[12px] uppercase tracking-[0.1em]"
              style={{ color: 'var(--fg)' }}
            >
              <span
                aria-hidden="true"
                className="inline-block h-[5px] w-[5px] flex-shrink-0 rounded-full"
                style={{ background: 'var(--live)' }}
              />
              {project.metric}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            {project.chips.map(chip => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>

          {/* The board itself, in order, each piece loading as it is reached */}
          <div className="mt-16 overflow-hidden rounded-[16px]">
            {slices.map((file, i) => (
              <Image
                key={file}
                src={`/assets/images/case/${project.id}/${file}`}
                alt={i === 0 ? `${project.name} case study` : ''}
                width={1500}
                height={1500}
                sizes="(max-width: 1280px) 100vw, 1200px"
                priority={i === 0}
                loading={i === 0 ? undefined : 'lazy'}
                className="block h-auto w-full"
              />
            ))}
          </div>

          <div
            className="mt-20 flex flex-col gap-6 border-t pt-10 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: 'var(--line)' }}
          >
            <p className="text-[17px]" style={{ color: 'var(--body)' }}>
              Want the thinking behind this one?
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-solid gap-2"
              >
                Let&apos;s talk
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/#work" className="btn-ghost">
                See the other projects
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
