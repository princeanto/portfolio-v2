import { Reveal } from "./reveal";

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="mb-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-a)]" />
      {children}
    </Reveal>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <Reveal delay={0.05}>
        <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
