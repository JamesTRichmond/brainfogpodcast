import { createFileRoute } from "@tanstack/react-router";
import { EpisodeTile } from "@/components/episode-tile";
import { ShowShell } from "@/components/show-shell";
import { brand } from "@/lib/brand";
import { nights } from "@/lib/show";

export const Route = createFileRoute("/episodes/")({
  component: EpisodesIndex,
  head: () => ({
    meta: [
      { title: `Nights · ${brand.name}` },
      { name: "description", content: "Nights. Nothing recorded yet." },
    ],
  }),
});

function EpisodesIndex() {
  return (
    <ShowShell>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <header className="flex max-w-xl flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">Nights</p>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">Not tape yet</h1>
          <p className="text-pretty text-sm leading-relaxed text-muted">
            Working titles. Nothing here is a recording. When an hour is cut, it goes in the feed.
            Empty numbers do not.
          </p>
        </header>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {nights.map((ep) => (
            <EpisodeTile key={ep.number} episode={ep} />
          ))}
        </div>
      </div>
    </ShowShell>
  );
}
