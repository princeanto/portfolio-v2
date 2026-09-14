import { Reveal } from "../_lib/reveal";
import { DECISIONS } from "./data";

export function DecisionList() {
  return (
    <div className="mt-6">
      {DECISIONS.map((decision, i) => (
        <Reveal key={decision.index} delay={i * 0.06}>
          <div
            className={`group flex gap-5 rounded-xl px-3 py-8 -mx-3 transition-colors duration-300 hover:bg-surface ${i > 0 ? "border-t border-border" : ""}`}
          >
            <span className="flex-none pt-1 text-[13px] font-medium tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-[var(--accent-a)]">
              {decision.index}
            </span>
            <div>
              <h3 className="text-lg font-medium text-foreground">
                {decision.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {decision.body}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
