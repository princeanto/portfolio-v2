import { Reveal } from "../_lib/reveal";
import { SCOPING_ROOM } from "./data";

export function ScopingRoom() {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {SCOPING_ROOM.map((seat, i) => {
        const isMe = seat === "Design — me";
        return (
          <Reveal key={seat} delay={i * 0.04}>
            <span
              className={`inline-flex rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                isMe
                  ? "border-[var(--accent-a)] bg-[var(--accent-a)]/10 text-[var(--accent-a)]"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
              }`}
            >
              {seat}
            </span>
          </Reveal>
        );
      })}
    </div>
  );
}
