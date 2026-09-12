import { createFileRoute, Link } from "@tanstack/react-router";
import { RoomBed } from "@/components/room-bed";
import { ShowShell } from "@/components/show-shell";
import { WaitlistForm } from "@/components/waitlist-form";
import { HeroLockup } from "@/components/wordmark-desk";
import { brand } from "@/lib/brand";
import { purpose } from "@/lib/craft";
import { aboutShow, directories, pitch } from "@/lib/show";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: brand.name },
      { name: "description", content: pitch },
    ],
  }),
});

function Home() {
  return (
    <ShowShell>
      <section className="relative overflow-hidden px-4 pt-10 pb-16 sm:px-8 sm:pt-16">
        <div className="pointer-events-none absolute top-8 -left-16 size-72 rounded-full bg-tv/20 blur-3xl" />
        <div className="pointer-events-none absolute top-0 right-0 size-80 rounded-full bg-sodium/25 blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8">
          <HeroLockup />
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">{purpose.one}</p>
          <p className="text-sm font-medium text-ink">{brand.host}</p>
          <p className="font-medium text-haze tabular-nums">{brand.tell}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/trailer"
              className="inline-flex h-11 items-center whitespace-nowrap rounded-md bg-sodium px-4 text-sm font-medium tracking-wide text-night transition-[transform,background] duration-150 ease-out hover:bg-glow-sodium active:scale-[0.96]"
            >
              The trailer
            </Link>
            <Link
              to="/episodes"
              className="inline-flex h-11 items-center whitespace-nowrap rounded-md px-4 text-sm font-medium tracking-wide text-ink shadow-[var(--shadow-hairline)] transition-[transform,box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-hairline-hover)] active:scale-[0.96]"
            >
              The nights
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-4 py-8 pb-20 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">The show</p>
            <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
              No episodes yet. Two people talking.
            </h2>
            {aboutShow.slice(0, 2).map((p) => (
              <p key={p.slice(0, 24)} className="max-w-md text-pretty text-sm leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <RoomBed note="The apartment. Not an episode." />
          </div>
          <img
            src="/kit/cover.png"
            alt={`${brand.name} cover`}
            className="aspect-square w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
        </section>

        <section className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">Nights</p>
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">Not tape yet</h2>
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            Titles live on the nights page. This page is the show.
          </p>
          <Link
            to="/episodes"
            className="inline-flex h-11 w-fit items-center text-sm font-medium text-ink hover:text-glow-sodium"
          >
            The nights
          </Link>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-lg bg-raised p-6 shadow-[var(--shadow-hairline)]">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">Where you listen</p>
            <h2 className="font-display text-2xl font-semibold text-ink">Where you'll listen</h2>
            <p className="text-sm leading-relaxed text-muted">
              When an hour is actually up, you'll find it here:
            </p>
            <ul className="divide-y divide-ink/10">
              {directories.map((d) => (
                <li key={d.name} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="text-sm font-medium text-ink sm:w-36">{d.name}</span>
                  <span className="text-sm text-muted">{d.role}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs leading-relaxed text-haze">
              Subscribe buttons stay off until an hour is up. No fake links.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-lg bg-raised p-6 shadow-[var(--shadow-hairline)]">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">Host</p>
            <div className="flex items-center gap-4">
              <img
                src="/kit/avatar.png"
                alt=""
                width={72}
                height={72}
                className="size-[72px] rounded-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
              />
              <div>
                <p className="font-medium text-ink">{brand.host}</p>
                <p className="text-sm text-haze">Host</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Always someone sitting. They bring the theme.
            </p>
            <Link to="/about" className="inline-flex h-11 items-center text-sm font-medium text-ink hover:text-glow-sodium">
              About
            </Link>
          </div>
        </section>

        <section className="rounded-lg bg-raised p-6 shadow-[var(--shadow-hairline)]">
          <WaitlistForm />
        </section>
      </div>
    </ShowShell>
  );
}
