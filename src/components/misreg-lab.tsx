import { useMemo, useState } from "react";
import { MisregText } from "@/components/misreg-text";
import { TwoDiscMark } from "@/components/two-disc-mark";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ladderVerdict, misreg } from "@/lib/brand";

const SIZES = [120, 72, 44, 24, 16] as const;

export function MisregLab() {
  const [px, setPx] = useState<number>(misreg.px);
  const [size, setSize] = useState<(typeof SIZES)[number]>(120);
  const [fogOnly, setFogOnly] = useState(false);

  const belowFloor = size < misreg.floorPt;
  const appliedPx = belowFloor ? 0 : px;
  const em = appliedPx / size;
  const verdict = belowFloor
    ? "off — body and sub-36 stay registered. Mark still slips."
    : ladderVerdict(px);

  const ticks = useMemo(() => [0, 2, 4, 6, 8, 12, 20], []);

  return (
    <section id="misreg" className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col gap-5">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">MISREG · technique</p>
        <h2 className="font-display text-3xl font-semibold text-balance text-ink md:text-4xl">
          Six pixels. Horizontal only.
        </h2>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-muted">
          Two plates of the same drawing, slipped by a fixed vector, ink sitting registered on top.
          You read the word first and notice the fringe second. A third plate becomes a rainbow and
          leaves the apartment.
        </p>

        <div className="flex flex-col gap-5 rounded-lg bg-raised p-4 shadow-[var(--shadow-hairline)]">
          <div className="flex items-end justify-between gap-4">
            <Label htmlFor="offset">Offset</Label>
            <p className="font-medium text-ink tabular-nums">
              {appliedPx} px · {em.toFixed(3)} em
            </p>
          </div>
          <Slider
            id="offset"
            min={0}
            max={20}
            step={1}
            value={[px]}
            disabled={belowFloor}
            onValueChange={(v) => setPx(v[0] ?? 6)}
          />
          <div className="flex justify-between text-[0.65rem] text-haze tabular-nums">
            {ticks.map((n) => (
              <button
                key={n}
                type="button"
                className="min-h-8 px-1 hover:text-ink"
                onClick={() => {
                  setSize(120);
                  setPx(n);
                }}
              >
                {n}
                {n === 6 ? " lock" : ""}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {SIZES.map((s) => (
              <Button
                key={s}
                type="button"
                size="sm"
                variant={size === s ? "primary" : "outline"}
                onClick={() => setSize(s)}
              >
                {s}px
              </Button>
            ))}
          </div>

          <label className="flex min-h-11 items-center justify-between gap-4">
            <Label>FOG only — drawer variant</Label>
            <Switch checked={fogOnly} onCheckedChange={setFogOnly} disabled={belowFloor} />
          </label>
        </div>

        <p className="text-sm text-haze">{verdict}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex min-h-56 items-center overflow-x-auto rounded-lg bg-night px-6 py-10 shadow-[var(--shadow-hairline)]">
          <div
            className="font-display shrink-0 leading-none font-semibold"
            style={{ fontSize: `${size}px` }}
          >
            <MisregText fogOnly={fogOnly && !belowFloor} em={em} as="span">
              Brain Fog
            </MisregText>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-lg bg-raised p-4 shadow-[var(--shadow-hairline)]">
          <TwoDiscMark size={60} />
          <p className="text-sm text-muted">
            60px death test. Type collapses. Two discs still parse as two lights — slip is 0.13 ×
            radius, opacity 0.86.
          </p>
        </div>
      </div>
    </section>
  );
}
