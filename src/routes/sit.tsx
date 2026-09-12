import { createFileRoute, Link } from "@tanstack/react-router";
import { ShowShell } from "@/components/show-shell";
import { brand } from "@/lib/brand";
import {
  already,
  bag,
  buy,
  essential,
  essentialTotal,
  ideal,
  idealTotal,
  later,
  notThis,
  sitWhy,
} from "@/lib/hardware";
import { after, next, night, soon, titleDrafts } from "@/lib/craft";
import { domainCutover } from "@/lib/domain";
import { waitlistCount } from "@/lib/waitlist";
import { audioHost, description, feedProfile, premiere } from "@/lib/show";

export const Route = createFileRoute("/sit")({
  component: Sit,
  loader: () => waitlistCount(),
  head: () => ({
    meta: [
      { title: `The sit · ${brand.name}` },
      {
        name: "description",
        content: "From scratch. The bag for the first recorded hour. Essential only.",
      },
    ],
  }),
});

function Sit() {
  const listN = Route.useLoaderData();
  return (
    <ShowShell>
      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-12 sm:px-6 lg:px-8">
        <header className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">The sit</p>
            <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
              The bag
            </h1>
            <p className="text-sm text-haze">{soon.status}</p>
            <p className="text-sm text-muted">{buy.from}</p>
            <p className="text-sm text-muted">{buy.ceiling}</p>
            <p className="text-sm text-haze">
              Email list: {listN} {listN === 1 ? "address" : "addresses"} saved. Not printed here.
            </p>
            <p className="text-sm leading-relaxed text-muted">{domainCutover.now}</p>
            <Link
              to="/guest"
              className="inline-flex h-11 w-fit items-center text-sm font-medium text-ink hover:text-glow-sodium"
            >
              A page a guest can read
            </Link>
          </div>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted">{sitWhy}</p>
        </header>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">
              {brand.domain}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">The name is parked</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{domainCutover.cannot}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{domainCutover.ready}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{domainCutover.warn}</p>
          </div>
          <ol className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {domainCutover.steps.map((row) => (
              <li
                key={row.n}
                className="grid gap-1 px-4 py-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:px-5"
              >
                <p className="font-medium tabular-nums text-sodium">{row.n}</p>
                <div>
                  <p className="font-medium text-ink">{row.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{row.beat}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-haze">One screen at a time</p>
          <ol className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {domainCutover.screens.map((row) => (
              <li
                key={`screen-${row.n}`}
                className="grid gap-1 px-4 py-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:px-5"
              >
                <p className="font-medium tabular-nums text-tv">{row.n}</p>
                <div>
                  <p className="font-medium text-ink">{row.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{row.beat}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">Next</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">You buy. The night is ready.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{soon.date}</p>
          </div>
          <ol className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {next.map((row) => (
              <li
                key={row.n}
                className="grid gap-1 px-4 py-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:px-5"
              >
                <p className="font-medium tabular-nums text-sodium">{row.n}</p>
                <div>
                  <p className="font-medium text-ink">{row.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{row.beat}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="night" className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">The night</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">When the box arrives</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              James is buying the gear. This is what you do the night you sit down to record. Plain
              list. No poetry.
            </p>
          </div>
          <ol className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {night.map((row, i) => (
              <li
                key={row.item}
                className="grid gap-1 px-4 py-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:px-5"
              >
                <p className="font-medium tabular-nums text-sodium">{i + 1}</p>
                <div>
                  <p className="font-medium text-ink">{row.item}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{row.beat}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">Titles</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">I draft. You pick.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Steal, rewrite, or toss. Not on the public cards until you pick. The first night still
              says The Thing We Keep Almost Saying until then.
            </p>
          </div>
          <ol className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {titleDrafts.map((row) => (
              <li
                key={row.n}
                className="grid gap-1 px-4 py-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:px-5"
              >
                <p className="font-medium tabular-nums text-sodium">{row.n}</p>
                <div>
                  <p className="font-medium text-ink">{row.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{row.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="buy" className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">Buy this</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Five things</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{essentialTotal}</p>
          </div>
          <ol className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {bag.map((row) => (
              <li
                key={row.n}
                className="grid gap-1 px-4 py-4 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6 sm:px-5"
              >
                <p className="font-medium tabular-nums text-sodium">{row.n}</p>
                <div>
                  <p className="font-medium text-ink">{row.name}</p>
                  <p className="text-sm text-muted">{row.qty}</p>
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-haze">{row.around}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="after" className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">After</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Where the file goes</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              After you sit. Don't invent empty episodes. Trailer first, then the hour.
            </p>
          </div>
          <ol className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {after.map((row) => (
              <li
                key={row.n}
                className="grid gap-1 px-4 py-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:px-5"
              >
                <p className="font-medium tabular-nums text-sodium">{row.n}</p>
                <div>
                  <p className="font-medium text-ink">{row.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{row.beat}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">Already here</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Do not buy these</h2>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {already.map((row) => (
              <li key={row.item} className="rounded-lg bg-raised p-4 shadow-[var(--shadow-hairline)]">
                <p className="font-medium text-ink">{row.item}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{row.why}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">Why this bag</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Two mouths. Dry.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{essentialTotal}</p>
          </div>
          <ul className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {essential.map((row) => (
              <li key={row.item} className="flex flex-col gap-2 px-4 py-4 sm:px-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-ink">{row.item}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-haze">{row.around}</p>
                </div>
                <p className="text-sm text-ink/90">{row.pick}</p>
                <p className="text-sm leading-relaxed text-muted">{row.why}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-haze">Ideal</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Not this trip</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{idealTotal}</p>
          </div>
          <ul className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {ideal.map((row) => (
              <li key={row.item} className="flex flex-col gap-2 px-4 py-4 sm:px-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-ink">{row.item}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-haze">{row.around}</p>
                </div>
                <p className="text-sm text-ink/90">{row.pick}</p>
                <p className="text-sm leading-relaxed text-muted">{row.why}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-haze">Not this</p>
            <h2 className="font-display text-2xl font-semibold text-ink">Leave it on the shelf</h2>
            <ul className="flex flex-col gap-2">
              {notThis.map((line) => (
                <li key={line} className="text-sm leading-relaxed text-muted">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 rounded-lg bg-raised p-6 shadow-[var(--shadow-hairline)]">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">{later.title}</p>
            <p className="text-sm leading-relaxed text-muted">{later.body}</p>
            <Link
              to="/episodes/$slug"
              params={{ slug: premiere.slug }}
              className="inline-flex h-11 w-fit items-center text-sm font-medium text-ink hover:text-glow-sodium"
            >
              First hour
            </Link>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">
              Paste into {audioHost.name}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Show fields</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              When you open the trial. Cover is the square picture. Trailer first, then the hour.
            </p>
          </div>
          <dl className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {feedProfile.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6"
              >
                <dt className="text-sm font-medium text-ink">{row.label}</dt>
                <dd className="text-sm text-muted">{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-lg bg-raised p-5 shadow-[var(--shadow-hairline)]">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-haze">Description</p>
            <pre className="mt-3 font-sans text-sm leading-relaxed whitespace-pre-wrap text-muted">
              {description}
            </pre>
          </div>
        </section>
      </div>
    </ShowShell>
  );
}
