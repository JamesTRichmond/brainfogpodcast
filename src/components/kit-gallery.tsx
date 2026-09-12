import { useState } from "react";
import { TwoDiscMark } from "@/components/two-disc-mark";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { samples } from "@/lib/brand";
import { cn } from "@/lib/cn";

const lockups = [
  { src: "/kit/c1-horizontal.svg", label: "C1 horizontal", aspect: "aspect-[3/1]" },
  { src: "/kit/c1-stacked.svg", label: "C1 stacked", aspect: "aspect-square" },
  { src: "/kit/c1-mark.svg", label: "C1 mark", aspect: "aspect-square" },
  { src: "/kit/cover.png", label: "C2 cover", aspect: "aspect-square" },
  { src: "/kit/avatar.png", label: "C7 avatar", aspect: "aspect-square" },
  { src: "/kit/pinned.png", label: "C8 pinned", aspect: "aspect-[4/5]" },
] as const;

export function KitGallery() {
  const [crop, setCrop] = useState(true);

  return (
    <section id="lockups" className="flex flex-col gap-12">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">
          04-final · on air
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
          The kit, not the test plates
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Production rasters and the encoded C5 loop. The loop is a template: room and lamp, not a
          conversation. Title still is locked in these files. Inhale is not-this on the desk. Mark, not
          type, survives 60px.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {lockups.map((f) => (
          <figure
            key={f.src}
            className="overflow-hidden rounded-lg bg-raised shadow-[var(--shadow-hairline)]"
          >
            <img
              src={f.src}
              alt={f.label}
              className={`${f.aspect} w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10`}
            />
            <figcaption className="px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-haze">
              {f.label}
            </figcaption>
          </figure>
        ))}
      </div>

      <img
        src="/kit/banner.png"
        alt="C6 platform banner"
        className="w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-ink/10"
      />

      <div className="flex flex-wrap items-center gap-4">
        <img
          src="/kit/cover-60.png"
          alt="Cover at 60 pixels"
          width={60}
          height={60}
          className="size-[60px] rounded-sm"
        />
        <p className="text-sm text-muted">
          60px death test — type collapses, two discs still parse as two lights.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">C7 · circular crop</p>
          <div className="flex min-h-11 items-center justify-between gap-4 rounded-lg bg-raised px-4 shadow-[var(--shadow-hairline)]">
            <Label htmlFor="avatar-crop">Crop as a profile</Label>
            <Switch id="avatar-crop" checked={crop} onCheckedChange={setCrop} />
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Nothing important lives outside a 560px circle on the 800 plate. Toggle the mask.
          </p>
        </div>
        <div className="flex items-center justify-center rounded-lg bg-raised p-8 shadow-[var(--shadow-hairline)]">
          <img
            src="/kit/avatar.png"
            alt="Avatar under a circular crop"
            width={240}
            height={240}
            className={cn("size-56 object-cover sm:size-60", crop ? "rounded-full" : "rounded-lg")}
          />
        </div>
      </div>

      <CardsRow />
      <ContactAndSheet />
    </section>
  );
}

function CardsRow() {
  const plates = [
    { src: "/kit/episode-template.png", label: "C3 template" },
    ...samples.map((ep) => ({
      src: ep.plate,
      label: `C4 EP ${ep.number}`,
    })),
  ];

  return (
    <div id="cards" className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">C3 · C4</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-ink">Five samples. One template.</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          001 is short. 005 is the wrap test. Empty guest is James Richmond. A named guest sits
          after him. These are the on-air PNGs — the desk above restyles nothing.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {plates.map((p) => (
          <figure
            key={p.src}
            className="overflow-hidden rounded-lg bg-raised shadow-[var(--shadow-hairline)]"
          >
            <img
              src={p.src}
              alt={p.label}
              className="aspect-square w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
            />
            <figcaption className="px-2 py-2 text-[0.65rem] uppercase tracking-[0.16em] text-haze">
              {p.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function ContactAndSheet() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <figure className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">C10</p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Contact sheet</h3>
          </div>
          <Button asChild variant="outline" size="sm">
            <a href="/kit/contact-sheet.png" download>
              PNG
            </a>
          </Button>
        </div>
        <img
          src="/kit/contact-sheet.png"
          alt="Contact sheet of every artifact"
          className="w-full rounded-lg outline outline-1 -outline-offset-1 outline-ink/10"
        />
      </figure>
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">C9</p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Brand sheet</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Palette, type, misreg recipe, bans. Enough for a stranger to make a new asset without
            asking a question.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href="/kit/brand-sheet.pdf" download>
              Download letter PDF
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="/kit/brand-sheet.pdf" target="_blank" rel="noreferrer">
              Open
            </a>
          </Button>
        </div>
        <div className="flex items-center gap-4 rounded-lg bg-raised p-5 shadow-[var(--shadow-hairline)]">
          <TwoDiscMark size={72} />
          <p className="text-sm leading-relaxed text-muted">
            Tokens are the law. Hex lives in the sheet. No seventh hue. No phosphor.
          </p>
        </div>
      </div>
    </div>
  );
}
