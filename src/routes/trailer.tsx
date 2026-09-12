import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LoopClip } from "@/components/loop-clip";
import { RoomBed } from "@/components/room-bed";
import { ShowShell } from "@/components/show-shell";
import { brand } from "@/lib/brand";
import { trailer } from "@/lib/craft";

export const Route = createFileRoute("/trailer")({
  component: Trailer,
  head: () => ({
    meta: [
      { title: `Trailer · ${brand.name}` },
      { name: "description", content: trailer.promise },
    ],
  }),
});

function Trailer() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <ShowShell>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] sm:px-6 lg:px-8">
        <LoopClip
          src="/kit/c5-picture.mp4"
          poster="/kit/c5-static.png"
          caption="Trailer · the night card · nobody talking"
          reduce={reduce}
        />
        <div className="flex flex-col gap-5 lg:pt-4">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">Trailer</p>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">{trailer.title}</h1>
          <p className="max-w-md text-pretty text-base leading-relaxed text-muted">{trailer.promise}</p>
          <p className="text-sm text-haze">{trailer.duration}</p>
          <RoomBed note="Nobody talking. Ever. This is the apartment, not a voice." />
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 sm:px-6 lg:px-8">
        <Link to="/episodes" className="inline-flex h-11 w-fit items-center text-sm font-medium text-muted hover:text-ink">
          The nights
        </Link>
      </div>
    </ShowShell>
  );
}
