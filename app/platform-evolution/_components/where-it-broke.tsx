import { Reveal } from "../_lib/reveal";
import { WALLS, FIX_ITEMS } from "./data";

export function WhereItBroke() {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {WALLS.map((wall, i) => (
          <Reveal key={wall.tag} delay={i * 0.08}>
            <div className="h-full rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {wall.tag}
              </span>
              <h4 className="mt-2 text-[17px] font-medium leading-snug text-foreground">
                {wall.title}
              </h4>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {wall.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.16}>
        <div className="mt-6 rounded-lg border border-border border-l-2 border-l-[var(--accent-a)] bg-surface p-6 sm:p-8">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            What came out of it
          </span>
          <h4 className="mt-2 text-[17px] font-medium text-foreground">
            A validation system, and a UI builder
          </h4>
          <ul className="mt-4 space-y-2.5">
            {FIX_ITEMS.map((item) => (
              <li
                key={item}
                className="group flex gap-3 text-[15px] leading-relaxed text-foreground/85"
              >
                <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-muted-foreground transition-colors duration-300 group-hover:bg-[var(--accent-a)]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Neither was in the original scope. Both existed because we
            watched people struggle.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
