import { Reveal } from "../_lib/reveal";
import { STAGE_CHAIN } from "./data";

export function HeroChain() {
  return (
    <Reveal delay={0.16}>
      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-border pt-8">
        {STAGE_CHAIN.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-3">
            <span
              className={`h-2 w-2 flex-none rounded-full ${
                i === STAGE_CHAIN.length - 1
                  ? "bg-[var(--accent-a)]"
                  : "bg-border-strong"
              }`}
            />
            <div>
              <div
                className={`text-[15px] font-medium ${
                  i === STAGE_CHAIN.length - 1
                    ? "text-[var(--accent-a)]"
                    : "text-foreground"
                }`}
              >
                {stage.name}
              </div>
              <div className="mt-0.5 max-w-[22ch] text-[13px] leading-snug text-muted-foreground">
                {stage.desc}
              </div>
            </div>
            {i < STAGE_CHAIN.length - 1 ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 hidden flex-none text-muted-foreground sm:block"
              >
                <path d="M4 12h16m0 0-6-6m6 6-6 6" />
              </svg>
            ) : null}
          </div>
        ))}
      </div>
    </Reveal>
  );
}
