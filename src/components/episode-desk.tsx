import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brand, guestLine, guests, samples, titleClass, type SampleEpisode } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { downloadBlob, exportEpisodePng } from "@/lib/export-card";

function padEp(n: string) {
  const only = n.replace(/\D/g, "").slice(0, 3);
  if (!only) return "006";
  return only.padStart(3, "0");
}

export function EpisodeDesk() {
  const [number, setNumber] = useState("006");
  const [title, setTitle] = useState("The hour the sodium lights stayed on");
  const [guest, setGuest] = useState("");
  const [busy, setBusy] = useState(false);

  const seed = useMemo(
    () => [...number].reduce((a, c) => a + c.charCodeAt(0), 0) % 7,
    [number],
  );
  const dx = (seed - 3) * 1.2;
  const dy = ((seed * 3) % 5 - 2) * 1.0;
  const ep = padEp(number);
  const plate = samples.find((s) => s.number === ep)?.plate;

  function load(sample: SampleEpisode) {
    setNumber(sample.number);
    setTitle(sample.title);
    setGuest(sample.guest);
  }

  async function download() {
    setBusy(true);
    try {
      const blob = await exportEpisodePng({
        number: ep,
        title: title.trim() || "[title]",
        guest,
        dx,
        dy,
      });
      downloadBlob(blob, `BRAINFOG-KIT_episode-${ep}.png`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="desk" className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col gap-5">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">C3 · on air</p>
        <h2 className="font-display text-3xl font-semibold text-balance text-ink md:text-4xl">
          James Richmond. Then a guest, or not.
        </h2>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-muted">
          Three named properties only. Host is on every card. Empty guest is solo James. Title
          auto-fits the way the generator does — 132 down to 56 — so a long 005 still sits inside
          the panel.
        </p>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="ep-num">Episode</Label>
            <Input
              id="ep-num"
              value={number}
              onChange={(e) => setNumber(padEp(e.target.value))}
              inputMode="numeric"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ep-title">Title</Label>
            <Input
              id="ep-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ep-guest">Guest</Label>
            <Input
              id="ep-guest"
              value={guest}
              placeholder="solo is James Richmond"
              onChange={(e) => setGuest(e.target.value)}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-haze">Roster</p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              className="min-h-11"
              variant={guest === "" ? "primary" : "outline"}
              onClick={() => setGuest("")}
            >
              Solo
            </Button>
            {guests.map((name) => (
              <Button
                key={name}
                type="button"
                size="sm"
                className="min-h-11"
                variant={guest === name ? "primary" : "outline"}
                onClick={() => setGuest(name)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {samples.map((sample) => (
            <Button
              key={sample.number}
              type="button"
              variant={number === sample.number ? "primary" : "outline"}
              size="sm"
              onClick={() => load(sample)}
            >
              {sample.number}
            </Button>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={download} disabled={busy}>
            <Download className="size-3.5" aria-hidden />
            {busy ? "Rendering…" : "Download 1080 PNG"}
          </Button>
        </div>
        <p className="text-xs leading-relaxed text-haze">
          Desk export is 1080² from the live properties. Production 3000² is still the python
          function. {plate ? "04-final plate for this number sits on the kit strip." : null}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <EpisodeCardFace
          number={ep}
          title={title.trim() || "[title]"}
          guest={guest}
          dx={dx}
          dy={dy}
        />
        {plate ? (
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-haze">
            Live desk · 04-final PNG is on the kit strip
          </p>
        ) : null}
      </div>
    </section>
  );
}

function EpisodeCardFace({
  number,
  title,
  guest,
  dx,
  dy,
}: {
  number: string;
  title: string;
  guest: string;
  dx: number;
  dy: number;
}) {
  return (
    <article className="relative aspect-square overflow-hidden rounded-lg bg-night shadow-[var(--shadow-hairline)]">
      <div
        className="pointer-events-none absolute aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tv/30 blur-2xl"
        style={{ left: `${64 + dx}%`, top: `${16 + dy}%` }}
      />
      <div
        className="pointer-events-none absolute aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sodium/35 blur-2xl"
        style={{ left: `${78 + dx}%`, top: `${22 + dy}%` }}
      />
      <div
        className="absolute aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tv/80"
        style={{ left: `${64 + dx}%`, top: `${16 + dy}%` }}
      />
      <div
        className="absolute aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sodium/80"
        style={{ left: `${78 + dx}%`, top: `${22 + dy}%` }}
      />

      <div className="absolute inset-x-0 top-[40%] bottom-0 flex flex-col bg-raised/95">
        <div className="h-1.5 w-full bg-sodium/90" />
        <div className="flex min-h-0 flex-1 flex-col px-6 pt-5 pb-5 sm:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-sodium">EP {number}</p>
          <h3
            className={cn(
              "mt-3 font-sans font-bold text-balance text-ink",
              titleClass(title),
            )}
          >
            {title}
          </h3>
          <p className="mt-3 text-sm leading-snug text-pretty text-haze">{guestLine(guest)}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted">
              {brand.name}
            </p>
            <p className="font-medium text-haze tabular-nums">{brand.tell}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
