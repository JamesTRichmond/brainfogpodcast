import { useEffect } from "react";
import { MisregText } from "@/components/misreg-text";
import { TwoDiscMark } from "@/components/two-disc-mark";
import { brand, misreg } from "@/lib/brand";
import { cn } from "@/lib/cn";

type Dir = "A" | "B" | "C";

const KEY = "brainfog-wordmark";

const copy: Record<Dir, { name: string; note: string }> = {
  A: {
    name: "Misregistration",
    note: "Locked. Sodium left, TV right, ink on top. The look-twice lock.",
  },
  B: {
    name: "Baseline stagger",
    note: "Looked at. Two voices, two seats — too stable once A was the lock.",
  },
  C: {
    name: "Dual width",
    note: "Looked at. BRAIN tight / FOG wide. Optical CA without a third hue — not this.",
  },
};

export function WordmarkDesk() {
  useEffect(() => {
    localStorage.setItem(KEY, "A");
  }, []);

  return (
    <section id="wordmark" className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">C1 · locked</p>
        <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">A + F. That is the mark.</h2>
        <p className="max-w-xl text-sm leading-relaxed text-muted">
          You picked A. Misregistered Fraunces with the two-disc mark. B and C stay on the table so
          the trail is visible — they are not the lock. D and E already died (too stable, or 60px).
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {(["A", "B", "C"] as const).map((d) => (
          <div
            key={d}
            className={cn(
              "flex flex-col gap-5 rounded-lg bg-raised p-5 shadow-[var(--shadow-hairline)]",
              d === "A" && "shadow-[var(--shadow-hairline-hover)]",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.28em] text-haze">{d}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-sodium">
                {d === "A" ? "locked" : "not this"}
              </span>
            </div>
            <WordmarkFace dir={d} />
            <p className="text-sm leading-relaxed text-muted">{copy[d].note}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-6 rounded-lg bg-raised p-5 shadow-[var(--shadow-hairline)]">
        <TwoDiscMark size={96} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">F · two-disc mark</p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
            Not a vote. The mark is the 60px survivor and the circular-crop avatar. It rides with A.
          </p>
        </div>
      </div>
    </section>
  );
}

function WordmarkFace({ dir }: { dir: Dir }) {
  return (
    <div className="flex min-h-28 flex-col justify-end">
      <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-muted">
        {brand.kicker}
      </p>
      {dir === "A" ? (
        <MisregText as="p" className="font-display text-[clamp(1.8rem,5vw,2.4rem)] leading-none font-semibold">
          {brand.display}
        </MisregText>
      ) : null}
      {dir === "B" ? (
        <p className="font-display text-[clamp(1.8rem,5vw,2.4rem)] leading-none font-semibold text-ink">
          <span className="inline-block -translate-y-[0.16em]">Brain</span>{" "}
          <span className="inline-block translate-y-[0.14em]">Fog</span>
        </p>
      ) : null}
      {dir === "C" ? (
        <p className="font-display text-[clamp(1.8rem,5vw,2.4rem)] leading-none font-semibold text-ink">
          <span className="tracking-[-0.08em]">Brain</span>{" "}
          <span className="tracking-[0.22em]">Fog</span>
        </p>
      ) : null}
    </div>
  );
}

export function HeroLockup() {
  return (
    <div className="flex max-w-full flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6">
      <TwoDiscMark size={120} className="size-16 sm:size-[7.5rem]" />
      <div className="max-w-full min-w-0">
        <MisregText
          as="p"
          em={misreg.kickerEm}
          className="text-xs font-medium uppercase tracking-[0.28em] sm:text-sm sm:tracking-[0.34em]"
        >
          {brand.kicker}
        </MisregText>
        <MisregText
          as="h1"
          className="mt-2 font-display text-5xl leading-[0.9] font-semibold sm:text-7xl md:text-8xl lg:text-[7.5rem]"
        >
          Brain Fog
        </MisregText>
      </div>
    </div>
  );
}
