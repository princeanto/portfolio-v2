import { Reveal } from "../_lib/reveal";

export function NumberedEyebrow({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="mb-5 inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-border text-[10px] normal-case tracking-normal text-muted-foreground">
        {number}
      </span>
      {children}
    </Reveal>
  );
}
