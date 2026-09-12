import { createFileRoute } from "@tanstack/react-router";
import { Audiogram } from "@/components/audiogram";
import { EpisodeDesk } from "@/components/episode-desk";
import { KitGallery } from "@/components/kit-gallery";
import { Law } from "@/components/law";
import { MisregLab } from "@/components/misreg-lab";
import { ShowShell } from "@/components/show-shell";
import { WordmarkDesk } from "@/components/wordmark-desk";
import { brand, color } from "@/lib/brand";

export const Route = createFileRoute("/studio")({
  component: Studio,
  head: () => ({
    meta: [
      { title: `Kit · ${brand.name}` },
      {
        name: "description",
        content: "Identity studio — cards, mark, audiogram, law.",
      },
    ],
  }),
});

const chips = [
  ["night", color.base],
  ["raised", color.raised],
  ["sodium", color.sodium],
  ["tv", color.tv],
  ["haze", color.haze],
  ["ink", color.ink],
] as const;

function Studio() {
  return (
    <ShowShell>
      <section className="px-4 pt-10 pb-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">Studio · {brand.rev}</p>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">The kit</h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted">
            Cards, the mark, slip, the audiogram, the files. Still is locked. Inhale is not-this. The
            public face is the trailer and the slate.
          </p>
          <nav className="-mx-1 flex flex-wrap">
            {[
              ["#desk", "Card"],
              ["#wordmark", "Mark"],
              ["#misreg", "Slip"],
              ["#audiogram", "C5"],
              ["#lockups", "Files"],
              ["#law", "Law"],
              ["/thesis", "Thesis"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="inline-flex h-11 items-center px-3 text-xs font-medium uppercase tracking-[0.18em] text-muted hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>
      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-10 sm:px-6 lg:px-8">
        <EpisodeDesk />
        <WordmarkDesk />
        <MisregLab />
        <Audiogram />
        <KitGallery />
        <Tokens />
        <Law />
      </div>
    </ShowShell>
  );
}

function Tokens() {
  return (
    <section id="tokens" className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">01 · tokens</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
          Six hues. No seventh.
        </h2>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {chips.map(([name, hex]) => (
          <li key={name} className="overflow-hidden rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            <div className="h-16" style={{ background: hex }} />
            <div className="px-3 py-2">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink">{name}</p>
              <p className="mt-1 font-medium text-haze tabular-nums">{hex}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
