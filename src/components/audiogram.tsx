import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LoopClip } from "@/components/loop-clip";
import { MisregText } from "@/components/misreg-text";
import { RoomBed } from "@/components/room-bed";
import { TwoDiscMark } from "@/components/two-disc-mark";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  brand,
  c5,
  c5Cqw,
  c5Pct,
  dxAt,
  frameTime,
  ghostLeft,
  guestLine,
  insetOrigin,
  misreg,
  titleDx0,
  tooMuchEm,
  voiceScale,
} from "@/lib/brand";
import { cn } from "@/lib/cn";

const BAR_UP = [
  11, 19, 26, 32, 36, 38, 37, 34, 29, 24, 18, 12, 15, 19, 21, 21, 20, 18, 16, 13, 12, 12, 11, 12, 15,
  18, 22, 25, 27, 28, 27, 24, 20, 14, 16, 23, 30, 35, 38, 40,
] as const;

const BAR_DOWN = [
  11, 32, 37, 24, 15, 21, 16, 12, 15, 25, 27, 14, 30, 40, 26, 38, 29, 12, 21, 18, 12, 12, 22, 28, 20,
  23, 38, 19, 36, 34, 18, 19, 20, 13, 11, 18, 27, 24, 16, 35,
] as const;

const TITLE = "The Thing We Keep Almost Saying";
const GUEST = "Zack Mellette";

type Mode = "pick" | "geometry" | "loop";

const SEAM_FRAMES = [
  { i: 0, label: "frame 0" },
  { i: 1, label: "frame 1" },
  { i: c5.frames - 1, label: "frame last" },
] as const;

export function Audiogram() {
  const [mode, setMode] = useState<Mode>("pick");
  const [safe, setSafe] = useState(true);
  const [breathe, setBreathe] = useState(true);
  const [snap, setSnap] = useState<(typeof c5.extrema)[number]>(0);
  const [t, setT] = useState(0);
  const [reduce, setReduce] = useState(false);

  const dx0 = titleDx0();
  const originInset = insetOrigin(dx0);
  const clock = breathe && !reduce ? t : snap;
  const dx = dxAt(clock, dx0);
  const tooEm = tooMuchEm();

  const inset = useMemo(() => {
    const origin = originInset;
    const ghost = ghostLeft(origin, dx);
    return { origin, ghost, pass: ghost >= c5.safe.l };
  }, [dx, originInset]);

  const placed = useMemo(() => {
    const origin = c5.title.asPlaced;
    const ghost = ghostLeft(origin, dx);
    return { origin, ghost, pass: ghost >= c5.safe.l };
  }, [dx]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduce || !breathe || mode === "pick") return;
    const start = performance.now() - snap * 1000;
    let id = 0;
    const tick = (now: number) => {
      setT(((now - start) / 1000) % misreg.period);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [breathe, snap, reduce, mode]);

  function pickExtrema(v: (typeof c5.extrema)[number]) {
    setBreathe(false);
    setSnap(v);
    setT(v);
  }

  function pickMode(next: Mode) {
    setMode(next);
    if (next === "loop") {
      setBreathe(true);
      setSnap(0);
      setT(0);
    } else if (next === "geometry") {
      setBreathe(false);
      setSnap(2.5);
      setT(2.5);
    }
  }

  const loop = mode === "loop";
  const pick = mode === "pick";

  return (
    <section id="audiogram" className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col gap-5">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">
            C5 · {pick ? "still locked" : loop ? "title-safe test" : "title-safe test"}
          </p>
          <h2 className="font-display text-3xl font-semibold text-balance text-ink md:text-4xl">
            {pick
              ? "Still sits. Inhale is not-this."
              : loop
                ? "Ten seconds. No third clock."
                : "Inset the type. Do not grow the rect."}
          </h2>
          <p className="max-w-md text-pretty text-sm leading-relaxed text-muted">
            {pick
              ? "You picked still. Left is the kit file. Right is the inhale candidate, kept on the table so the trail is visible — do not ship it."
              : loop
                ? "Locked breathe on the inset origin. Right is the 12px un-word control — do not ship it. Title-band seam must stay in the same order as an adjacent frame."
                : "Same 44pt title, same t. Left origin is 69 — sidebearing plus ceil(dx max). Right is as-placed at 64. Sodium ghost on the right crosses the keep-out."}
          </p>

          <div className="flex flex-wrap gap-2">
            {(["pick", "loop", "geometry"] as const).map((m) => (
              <Button
                key={m}
                type="button"
                size="sm"
                className="min-h-11"
                variant={mode === m ? "primary" : "outline"}
                onClick={() => pickMode(m)}
              >
                {m === "pick" ? "Still locked" : m === "loop" ? "Seam" : "Geometry"}
              </Button>
            ))}
          </div>

          {pick ? null : (
            <div className="flex flex-col gap-4 rounded-lg bg-raised p-4 shadow-[var(--shadow-hairline)]">
              <div className="flex min-h-11 items-center justify-between gap-4">
                <Label htmlFor="c5-safe">Title-safe overlay</Label>
                <Switch id="c5-safe" checked={safe} onCheckedChange={setSafe} />
              </div>
              <div className="flex min-h-11 items-center justify-between gap-4">
                <Label htmlFor="c5-breathe">Title breathe (±15% / 10s)</Label>
                <Switch id="c5-breathe" checked={breathe} onCheckedChange={setBreathe} />
              </div>
              <div className="grid gap-2">
                <Label>Extrema</Label>
                <div className="flex flex-wrap gap-2">
                  {c5.extrema.map((v) => (
                    <Button
                      key={v}
                      type="button"
                      size="sm"
                      className="min-h-11"
                      variant={!breathe && snap === v ? "primary" : "outline"}
                      onClick={() => pickExtrema(v)}
                    >
                      t={v.toFixed(1)}s
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {pick ? null : (
            <p className="text-xs leading-relaxed text-haze">
              dx(t) = {dx0.toFixed(2)} · (0.85 + 0.15 · sin(2π t / 10)). {c5.fps}fps × {misreg.period}
              s = {c5.frames} frames. Keep-out ({c5.safe.l}, {c5.safe.t}) → ({c5.safe.r}, {c5.safe.b}).
            </p>
          )}
        </div>

        {pick ? (
          <PickCard reduce={reduce} />
        ) : loop ? (
          <SeamCard clock={clock} dx={dx} dx0={dx0} />
        ) : (
          <Verdict clock={clock} dx={dx} dx0={dx0} inset={inset} placed={placed} />
        )}
      </div>

      {pick ? (
        <PickStage reduce={reduce} />
      ) : loop ? (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <C5Plate
              origin={originInset}
              t={clock}
              safe={safe}
              em={misreg.titleEm}
              caption="locked · origin 69"
              verdict={`flicker · dx ${dx.toFixed(2)}`}
              ok
              motion={!reduce}
            />
            <C5Plate
              origin={originInset}
              t={clock}
              safe={safe}
              em={tooEm}
              caption="too-much · dx0 12px"
              verdict="un-word"
              motion={!reduce}
            />
          </div>
          <TitleBandRow dx0={dx0} em={misreg.titleEm} origin={originInset} />
        </>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <C5Plate
            origin={inset.origin}
            t={clock}
            safe={safe}
            em={misreg.titleEm}
            caption={`inset · origin ${inset.origin}`}
            verdict={
              inset.pass ? `pass · ghost ${inset.ghost.toFixed(2)}` : `leak · ghost ${inset.ghost.toFixed(2)}`
            }
            ok={inset.pass}
            motion={!reduce}
          />
          <C5Plate
            origin={placed.origin}
            t={clock}
            safe={safe}
            em={misreg.titleEm}
            caption={`as-placed · origin ${placed.origin}`}
            verdict={
              placed.pass
                ? `pass · ghost ${placed.ghost.toFixed(2)}`
                : `leak · ghost ${placed.ghost.toFixed(2)}`
            }
            ok={placed.pass}
            motion={!reduce}
          />
        </div>
      )}
    </section>
  );
}

function PickCard({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex flex-col justify-end gap-3 rounded-lg bg-raised p-4 shadow-[var(--shadow-hairline)]">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-haze">
        Template · not an episode
      </p>
      <p className="text-sm leading-relaxed text-muted">
        The soundtrack is the apartment: room, a lamp, air. Nobody is talking. When a real take
        exists, that audio will drive the bars. This picture is the stand-in.
      </p>
      <p className="text-sm leading-relaxed text-muted">
        Left is locked. Right inhales — about a pixel over ten seconds — and is not-this. Same join,
        same bed. The public trailer uses still.
      </p>
      <p className="text-xs leading-relaxed text-haze">
        {reduce
          ? "Reduced motion — stills below. You can still listen to the bed."
          : "Play three cycles on both. Listen if you want the room."}
      </p>
    </div>
  );
}

function PickStage({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <RoomBed />
      <div className="grid gap-4 md:grid-cols-2">
        <LoopClip
          src="/kit/c5-picture.mp4"
          poster="/kit/c5-static.png"
          caption="Title still · locked"
          reduce={reduce}
        />
        <LoopClip
          src="/kit/c5-breathe-picture.mp4"
          poster="/kit/c5-breathe-static.png"
          caption="Title inhale · not-this"
          reduce={reduce}
        />
      </div>
    </div>
  );
}

function SeamCard({ clock, dx, dx0 }: { clock: number; dx: number; dx0: number }) {
  const d0 = dxAt(frameTime(0), dx0);
  const d1 = dxAt(frameTime(1), dx0);
  const dn = dxAt(frameTime(c5.frames - 1), dx0);
  const { full01, full0n, title01, title0n } = c5.seam;
  const pass = title0n <= 0.05;

  return (
    <div className="flex flex-col justify-end gap-3 rounded-lg bg-raised p-4 shadow-[var(--shadow-hairline)]">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-haze">
        t={clock.toFixed(2)}s · dx={dx.toFixed(2)}px · dx0={dx0.toFixed(2)} · {c5.fps}fps ×{" "}
        {c5.frames}
      </p>
      <p className="text-sm text-muted">
        dx(0) = dx(10) = {dxAt(0, dx0).toFixed(3)}px. No third period on the title.
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs font-medium uppercase tracking-[0.16em] text-haze">
            <th className="py-1 font-medium">encode |Δ|</th>
            <th className="py-1 font-medium tabular-nums">0–1</th>
            <th className="py-1 font-medium tabular-nums">0–last</th>
          </tr>
        </thead>
        <tbody className="text-muted">
          <tr className="border-t border-ink/10">
            <td className="py-2 text-ink">full-frame</td>
            <td className="py-2 tabular-nums">{full01.toFixed(3)}</td>
            <td className="py-2 tabular-nums">{full0n.toFixed(3)}</td>
          </tr>
          <tr className="border-t border-ink/10">
            <td className="py-2 text-ink">title-band</td>
            <td className="py-2 tabular-nums">{title01.toFixed(3)}</td>
            <td className="py-2 tabular-nums">{title0n.toFixed(3)}</td>
          </tr>
        </tbody>
      </table>
      <p className="text-sm text-muted">
        Live title |Δ| dx · 0–1 {Math.abs(d0 - d1).toFixed(3)}px · 0–last {Math.abs(d0 - dn).toFixed(3)}
        px. Waveform Δ owns the full-frame number.
      </p>
      <p
        className={cn(
          "text-xs font-medium uppercase tracking-[0.18em]",
          pass ? "text-sodium" : "text-haze",
        )}
      >
        {pass ? "pass — title-band seam is an adjacent step" : "fail — title-band jumps the seam"}
      </p>
    </div>
  );
}

function Verdict({
  clock,
  dx,
  dx0,
  inset,
  placed,
}: {
  clock: number;
  dx: number;
  dx0: number;
  inset: { origin: number; ghost: number; pass: boolean };
  placed: { origin: number; ghost: number; pass: boolean };
}) {
  const rows = [
    ["inset", inset],
    ["as-placed", placed],
  ] as const;
  return (
    <div className="flex flex-col justify-end gap-3 rounded-lg bg-raised p-4 shadow-[var(--shadow-hairline)]">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-haze">
        t={clock.toFixed(2)}s · dx={dx.toFixed(2)}px · dx0={dx0.toFixed(2)} · sidebearing{" "}
        {c5.title.sidebearing}px
      </p>
      <ul className="divide-y divide-ink/10">
        {rows.map(([name, row]) => (
          <li
            key={name}
            className="grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-baseline gap-3 py-2 text-sm"
          >
            <span className="font-medium text-ink">{name}</span>
            <span className="text-muted tabular-nums">
              origin {row.origin} · ghost L {row.ghost.toFixed(2)}
            </span>
            <span
              className={cn(
                "text-xs font-medium uppercase tracking-[0.18em] tabular-nums",
                row.pass ? "text-sodium" : "text-haze",
              )}
            >
              {row.pass ? "pass" : `leak ${(c5.safe.l - row.ghost).toFixed(1)}`}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs leading-relaxed text-haze">
        Fraunces left sidebearing is −1 at 44pt. Inset must include it. Do not grow the safe rect.
      </p>
    </div>
  );
}

function TitleBandRow({ dx0, em, origin }: { dx0: number; em: number; origin: number }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-haze">
        Title band ×2 — if you cannot see it here, it will not read on a phone
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        {SEAM_FRAMES.map(({ i, label }) => {
          const ft = frameTime(i);
          return (
            <figure key={i} className="flex flex-col gap-2">
              <div
                className="overflow-hidden rounded-lg bg-night px-4 py-5 shadow-[var(--shadow-hairline)]"
                style={{ containerType: "inline-size" }}
              >
                <div
                  className="font-display leading-none font-semibold whitespace-nowrap"
                  style={{ fontSize: c5Cqw(c5.title.pt * 2), marginLeft: c5Pct(origin - 40) }}
                >
                  <MisregText em={em} at={ft}>
                    {TITLE}
                  </MisregText>
                </div>
              </div>
              <figcaption className="px-1 text-xs uppercase tracking-[0.16em] text-muted tabular-nums">
                {label} · t={ft.toFixed(3)}s · dx={dxAt(ft, dx0).toFixed(3)}px
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

function C5Plate({
  origin,
  t,
  safe,
  em,
  caption,
  verdict,
  ok = false,
  motion = true,
}: {
  origin: number;
  t: number;
  safe: boolean;
  em: number;
  caption: string;
  verdict: string;
  ok?: boolean;
  motion?: boolean;
}) {
  const { cx, cy, r } = c5.discs;
  return (
    <figure className="flex flex-col gap-2">
      <div
        className="relative aspect-square w-full overflow-hidden rounded-lg bg-night shadow-[var(--shadow-hairline)]"
        style={{ containerType: "inline-size" }}
      >
        <div className="pointer-events-none absolute top-[6%] left-[8%] size-28 rounded-full bg-tv/20 blur-3xl" />
        <div className="pointer-events-none absolute top-[10%] right-[6%] size-32 rounded-full bg-sodium/25 blur-3xl" />

        <Abs x={cx - r} y={cy - r} w={r * 2} h={r * 2}>
          <TwoDiscMark className="size-full" />
        </Abs>

        <Abs x={c5.kicker.x} y={c5.kicker.y}>
          <p
            className="font-medium tracking-[0.28em] text-muted uppercase"
            style={{ fontSize: c5Cqw(c5.kicker.pt) }}
          >
            {brand.kicker}
          </p>
        </Abs>
        <Abs x={c5.ep.x} y={c5.ep.y}>
          <p
            className="font-bold tracking-[0.28em] text-sodium uppercase"
            style={{ fontSize: c5Cqw(c5.ep.pt) }}
          >
            EP 003
          </p>
        </Abs>

        <Abs x={origin} y={c5.title.y} pt={c5.title.pt}>
          <MisregText
            as="h3"
            em={em}
            at={t}
            className="block font-display leading-none font-semibold whitespace-nowrap"
          >
            {TITLE}
          </MisregText>
        </Abs>

        <Abs x={c5.guest.x} y={c5.guest.y}>
          <p className="text-haze" style={{ fontSize: c5Cqw(c5.guest.pt) }}>
            {guestLine(GUEST)}
          </p>
        </Abs>

        <Wave t={t} motion={motion} />

        <div
          className="absolute bg-sodium"
          style={{
            left: c5Pct(64),
            right: c5Pct(64),
            top: c5Pct(c5.ruleY),
            height: c5Pct(2),
          }}
        />
        <Abs x={64} y={c5.footerY}>
          <p
            className="font-medium tracking-[0.22em] text-muted uppercase"
            style={{ fontSize: c5Cqw(16) }}
          >
            {brand.kicker} · {brand.display.toUpperCase()}
          </p>
        </Abs>
        <div className="absolute" style={{ right: c5Pct(64), top: c5Pct(c5.footerY) }}>
          <p className="font-medium text-muted tabular-nums" style={{ fontSize: c5Cqw(16) }}>
            {brand.tell}
          </p>
        </div>

        {safe ? <SafeOverlay /> : null}
      </div>
      <figcaption className="flex items-baseline justify-between gap-3 px-1">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink">{caption}</span>
        <span
          className={cn(
            "text-xs font-medium uppercase tracking-[0.18em] tabular-nums",
            ok ? "text-sodium" : "text-haze",
          )}
        >
          {verdict}
        </span>
      </figcaption>
    </figure>
  );
}

function SafeOverlay() {
  const sw = c5.safe.r - c5.safe.l;
  const sh = c5.safe.b - c5.safe.t;
  return (
    <>
      <Abs x={c5.safe.l} y={c5.safe.t} w={sw} h={sh} className="pointer-events-none border border-sodium/40">
        <span
          className="absolute bottom-1 left-1 font-medium tracking-[0.16em] text-sodium uppercase"
          style={{ fontSize: c5Cqw(12) }}
        >
          title-safe 952×440
        </span>
      </Abs>
      <Abs
        x={c5.safe.l}
        y={c5.safe.b}
        w={sw}
        h={c5.wave.y - c5.safe.b}
        className="pointer-events-none bg-tv/10"
      />
      <Abs
        x={c5.wave.x}
        y={c5.wave.y}
        w={c5.wave.w}
        h={c5.wave.h}
        className="pointer-events-none border border-tv/45"
      >
        <span
          className="absolute bottom-1 left-1 font-medium tracking-[0.16em] text-tv uppercase"
          style={{ fontSize: c5Cqw(12) }}
        >
          waveform exclusive
        </span>
      </Abs>
    </>
  );
}

function Wave({ t, motion = true }: { t: number; motion?: boolean }) {
  const ghost = c5Cqw(3);
  const upS = motion ? voiceScale(t, misreg.period) : 1;
  const downS = motion ? voiceScale(t, misreg.period / 2, 0.32) : 1;
  return (
    <div
      className="absolute flex items-stretch"
      style={{
        left: c5Pct(c5.wave.x),
        top: c5Pct(c5.wave.y),
        width: c5Pct(c5.wave.w),
        height: c5Pct(c5.wave.h),
        gap: c5Cqw(4),
      }}
      aria-hidden
    >
      {BAR_UP.map((up, i) => (
        <div key={i} className="relative flex-1">
          <span
            className="absolute right-0 bottom-1/2 left-0 origin-bottom bg-sodium/70"
            style={{
              height: `${up}%`,
              transform: `translateX(-${ghost}) scaleY(${upS})`,
            }}
          />
          <span
            className="absolute top-1/2 right-0 left-0 origin-top bg-tv/70"
            style={{
              height: `${BAR_DOWN[i]}%`,
              transform: `translateX(${ghost}) scaleY(${downS})`,
            }}
          />
          <span
            className="absolute right-0 bottom-1/2 left-0 origin-bottom bg-sodium"
            style={{ height: `${up}%`, transform: `scaleY(${upS})` }}
          />
          <span
            className="absolute top-1/2 right-0 left-0 origin-top bg-tv"
            style={{ height: `${BAR_DOWN[i]}%`, transform: `scaleY(${downS})` }}
          />
        </div>
      ))}
    </div>
  );
}

function Abs({
  x,
  y,
  w,
  h,
  pt,
  className,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  pt?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn("absolute", className)}
      style={{
        left: c5Pct(x),
        top: c5Pct(y),
        width: w != null ? c5Pct(w) : undefined,
        height: h != null ? c5Pct(h) : undefined,
        fontSize: pt != null ? c5Cqw(pt) : undefined,
      }}
    >
      {children}
    </div>
  );
}

