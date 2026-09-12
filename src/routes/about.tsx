import { createFileRoute } from "@tanstack/react-router";
import { ShowShell } from "@/components/show-shell";
import { WaitlistForm } from "@/components/waitlist-form";
import { clock, ethics, markWhy, purpose } from "@/lib/craft";
import { brand } from "@/lib/brand";
import {
  aboutHost,
  aboutShow,
  directories,
  pitch,
} from "@/lib/show";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: `About · ${brand.name}` },
      { name: "description", content: pitch },
    ],
  }),
});

function About() {
  return (
    <ShowShell>
      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-12 sm:px-6 lg:px-8">
        <header className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">Profile</p>
            <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">{brand.name}</h1>
            <p className="text-sm font-medium text-ink">{brand.host}</p>
            <p className="font-medium text-haze tabular-nums">{brand.tell}</p>
          </div>
          <div className="flex flex-col gap-4">
            {aboutShow.map((p) => (
              <p key={p.slice(0, 28)} className="max-w-xl text-pretty text-sm leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </header>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">The mark</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">The two circles</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{markWhy.loved}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{markWhy.meaning}</p>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {markWhy.versions.map((row) => (
              <li key={row.where} className="rounded-lg bg-raised p-4 shadow-[var(--shadow-hairline)]">
                <p className="font-medium text-ink">{row.where}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{row.why}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:items-start">
          <img
            src="/kit/avatar.png"
            alt=""
            width={96}
            height={96}
            className="size-24 rounded-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">Host</p>
            <h2 className="font-display text-3xl font-semibold text-ink">{brand.host}</h2>
            {aboutHost.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-xl text-pretty text-sm leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">People</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">A seat after James</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Always someone sitting. They bring the theme. Named on that night's card after him —
              not a list on this page.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">Purpose</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">What the show is for</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{purpose.for}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{purpose.one}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{purpose.audience}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{purpose.theme}</p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">The seat</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">What we will not claim</h2>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {ethics.map((row) => (
              <li key={row.title} className="rounded-lg bg-raised p-4 shadow-[var(--shadow-hairline)]">
                <p className="font-medium text-ink">{row.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{row.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg bg-raised p-6 shadow-[var(--shadow-hairline)]">
          <WaitlistForm />
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">Clock</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">A night, in order</h2>
          </div>
          <ul className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {clock.map((row) => (
              <li key={row.name} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <p className="text-sm font-medium text-ink">{row.name}</p>
                <p className="text-sm text-muted">{row.beat}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">Listen</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Where you'll find it</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              When an hour is actually up. Not before. Buttons stay off until then.
            </p>
          </div>
          <ul className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {directories.map((d) => (
              <li key={d.name} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <p className="text-sm font-medium text-ink">{d.name}</p>
                <p className="text-sm text-muted">{d.role}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">The listing</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">In a list</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              How the show looks tiny. The two circles do the work. The words don't have to.
            </p>
          </div>
          <div className="flex max-w-lg items-center gap-4 rounded-lg bg-raised p-4 shadow-[var(--shadow-hairline)]">
            <img
              src="/kit/cover-60.png"
              alt=""
              width={60}
              height={60}
              className="size-[60px] rounded-sm"
            />
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">{brand.name}</p>
              <p className="truncate text-sm text-haze">{brand.host}</p>
            </div>
          </div>
        </section>
      </div>
    </ShowShell>
  );
}
