import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LoopClip } from "@/components/loop-clip";
import { RoomBed } from "@/components/room-bed";
import { ShowShell } from "@/components/show-shell";
import { brand, guestLine } from "@/lib/brand";
import { episodeBySlug, pitch, premiere } from "@/lib/show";

export const Route = createFileRoute("/episodes/$slug")({
  component: EpisodePage,
  head: ({ params }) => {
    const ep = episodeBySlug(params.slug);
    return {
      meta: [
        { title: ep ? `${ep.title} · ${brand.name}` : brand.name },
        { name: "description", content: ep?.logline ?? pitch },
      ],
    };
  },
});

function EpisodePage() {
  const { slug } = Route.useParams();
  const ep = episodeBySlug(slug);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!ep || !ep.guest) {
    return (
      <ShowShell>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-16">
          <h1 className="font-display text-3xl font-semibold text-ink">Not a night of this show</h1>
          <p className="text-sm text-muted">Always someone sitting. That page isn't on the list.</p>
          <Link to="/episodes" className="inline-flex h-11 items-center text-sm text-muted hover:text-ink">
            The nights
          </Link>
        </div>
      </ShowShell>
    );
  }

  const freeze = ep.premiere === true;

  return (
    <ShowShell>
      <article className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          {freeze && !reduce ? (
            <LoopClip
              src="/kit/c5-picture.mp4"
              poster="/kit/c5-static.png"
              caption="First hour · title still · not tape"
              reduce={reduce}
            />
          ) : (
            <img
              src={freeze ? "/kit/c5-static.png" : ep.plate}
              alt={`EP ${ep.number} ${ep.title}`}
              className="aspect-square w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-ink/10"
            />
          )}
        </div>
        <div className="flex flex-col gap-5 lg:pt-4">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">
            {ep.premiere ? "First hour · " : null}EP {ep.number}
          </p>
          <h1 className="font-display text-3xl font-semibold text-balance text-ink md:text-4xl">{ep.title}</h1>
          <p className="text-sm text-haze">{guestLine(ep.guest)}</p>
          <p className="max-w-md text-pretty text-base leading-relaxed text-muted">{ep.logline}</p>
          {ep.premiere ? (
            <>
              <p className="text-sm leading-relaxed text-muted">{premiere.soon}</p>
              <p className="text-sm leading-relaxed text-muted">{premiere.length}</p>
              <p className="text-sm leading-relaxed text-muted">{premiere.mix}</p>
              <p className="text-sm leading-relaxed text-muted">{premiere.listen}</p>
            </>
          ) : (
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-haze">Not tape yet</p>
          )}
          {freeze ? <RoomBed note="Between thoughts. Not under the talking." /> : null}
          <p className="text-sm leading-relaxed text-muted">
            {freeze
              ? "This picture is quiet on purpose. When the hour is cut, you can play it here."
              : "No audio yet. When this night is cut, you can play it here."}
          </p>
          <div className="flex flex-wrap gap-4">
            {ep.premiere ? (
              <Link
                to="/guest"
                className="inline-flex h-11 w-fit items-center text-sm font-medium text-ink hover:text-glow-sodium"
              >
                If you're sitting
              </Link>
            ) : null}
            <Link
              to="/episodes"
              className="inline-flex h-11 w-fit items-center text-sm font-medium text-muted hover:text-ink"
            >
              The nights
            </Link>
          </div>
        </div>
      </article>
    </ShowShell>
  );
}
