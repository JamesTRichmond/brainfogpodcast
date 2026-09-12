import { Link } from "@tanstack/react-router";
import { guestLine } from "@/lib/brand";
import type { ShowEpisode } from "@/lib/show";

export function EpisodeTile({ episode }: { episode: ShowEpisode }) {
  return (
    <Link
      to="/episodes/$slug"
      params={{ slug: episode.slug }}
      className="group flex flex-col gap-3 rounded-lg p-1 transition-[transform] duration-150 ease-out hover:translate-y-px"
    >
      <img
        src={episode.plate}
        alt={`EP ${episode.number} ${episode.title}`}
        className="aspect-square w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-ink/10"
      />
      <div className="flex flex-col gap-1 px-1">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-sodium">
          {episode.premiere ? "First hour · " : null}EP {episode.number}
        </p>
        <h3 className="font-medium text-balance text-ink group-hover:text-glow-sodium">{episode.title}</h3>
        <p className="text-sm text-haze">{guestLine(episode.guest)}</p>
      </div>
    </Link>
  );
}
