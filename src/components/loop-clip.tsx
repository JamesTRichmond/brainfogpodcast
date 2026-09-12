import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function LoopClip({
  src,
  poster,
  caption,
  reduce,
}: {
  src: string;
  poster: string;
  caption: string;
  reduce: boolean;
}) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const front = useRef<"a" | "b">("a");
  const swapping = useRef(false);
  const primed = useRef(false);
  const lastSwap = useRef(0);
  const [which, setWhich] = useState<"a" | "b">("a");
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b || reduce) return;

    const play = (v: HTMLVideoElement) => {
      v.muted = true;
      void v.play().catch(() => {});
    };

    play(a);

    const el = (k: "a" | "b") => (k === "a" ? a : b);
    const other = (k: "a" | "b") => (k === "a" ? b : a);

    const swap = () => {
      if (swapping.current) return;
      const now = performance.now();
      if (now - lastSwap.current < 400) return;
      swapping.current = true;
      lastSwap.current = now;
      const k = front.current;
      const from = el(k);
      const to = other(k);
      to.muted = true;
      if (to.currentTime > 0.04) to.currentTime = 0;
      play(to);
      const next = k === "a" ? "b" : "a";
      front.current = next;
      setWhich(next);
      setCycles((n) => n + 1);
      from.pause();
      primed.current = false;
      swapping.current = false;
    };

    let id = 0;
    const tick = () => {
      const v = el(front.current);
      if (v.duration && Number.isFinite(v.duration)) {
        const remain = v.duration - v.currentTime;
        if (!primed.current && remain <= 0.35 && remain > 1 / 12) {
          primed.current = true;
          const nxt = other(front.current);
          nxt.muted = true;
          nxt.currentTime = 0;
          play(nxt);
        }
        if (v.ended || remain <= 1 / 12) swap();
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);

    a.addEventListener("ended", swap);
    b.addEventListener("ended", swap);
    return () => {
      cancelAnimationFrame(id);
      a.removeEventListener("ended", swap);
      b.removeEventListener("ended", swap);
    };
  }, [src, reduce]);

  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-night shadow-[var(--shadow-hairline)]">
        <video
          ref={aRef}
          className={cn(
            "absolute inset-0 size-full object-cover",
            which === "a" ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={bRef}
          className={cn(
            "absolute inset-0 size-full object-cover",
            which === "b" ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
        />
      </div>
      <figcaption className="flex items-baseline justify-between gap-3 px-1">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink">{caption}</span>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-haze tabular-nums">
          {cycles} cycle{cycles === 1 ? "" : "s"}
        </span>
      </figcaption>
    </figure>
  );
}
