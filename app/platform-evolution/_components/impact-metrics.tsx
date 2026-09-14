import { Reveal } from "../_lib/reveal";
import { AnimatedStat } from "./animated-stat";
import { IMPACT_METRICS } from "./data";

export function ImpactMetrics() {
  return (
    <div className="relative mt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -inset-y-16 -z-10"
        style={{
          background:
            "radial-gradient(50% 60% at 30% 40%, color-mix(in srgb, var(--accent-a) 8%, transparent) 0%, transparent 100%)",
        }}
      />
      <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
        {IMPACT_METRICS.map((metric, i) => (
          <Reveal key={metric.label} delay={i * 0.06}>
            <dt className="text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {metric.label}
            </dt>
            <dd className="mt-2 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              <AnimatedStat value={metric.value} />
            </dd>
            <dd className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {metric.caption}
            </dd>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}
