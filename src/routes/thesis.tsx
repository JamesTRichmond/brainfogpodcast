import { createFileRoute, Link } from "@tanstack/react-router";
import { ShowShell } from "@/components/show-shell";
import { brand } from "@/lib/brand";
import { beforeAfter, notThoseSchools, study, thesisGrafs } from "@/lib/craft";

export const Route = createFileRoute("/thesis")({
  component: Thesis,
  head: () => ({
    meta: [
      { title: `Thesis · ${brand.name}` },
      {
        name: "description",
        content: "A production thesis. Not a conferred degree. The kit kept its heart. The claim changed.",
      },
    ],
  }),
});

function Thesis() {
  return (
    <ShowShell>
      <article className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-12 sm:px-6">
        <header className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-tv">Production thesis</p>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
            What we are allowed to say about the apartment
          </h1>
          <p className="text-sm text-haze">
            {brand.name} · {brand.host} · rev {brand.rev}. Not an NYU dissertation. Not an unofficial
            transcript.
          </p>
        </header>

        <div className="flex flex-col gap-5">
          {thesisGrafs.map((p) => (
            <p key={p.slice(0, 40)} className="text-pretty text-base leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Before / after</h2>
          <ul className="divide-y divide-ink/10 rounded-lg bg-raised shadow-[var(--shadow-hairline)]">
            {beforeAfter.map((row) => (
              <li key={row.was} className="grid gap-2 px-4 py-4 sm:grid-cols-2 sm:gap-8">
                <p className="text-sm text-haze">
                  <span className="block text-xs font-medium uppercase tracking-[0.18em] text-haze">Was</span>
                  {row.was}
                </p>
                <p className="text-sm text-ink">
                  <span className="block text-xs font-medium uppercase tracking-[0.18em] text-sodium">Now</span>
                  {row.now}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-display text-2xl font-semibold text-ink">Study record</h2>
          <p className="text-sm leading-relaxed text-muted">
            Published catalogs and program pages only. I did not sit in those rooms. I did not write to
            those professors. I will not put their seals on a PDF.
          </p>
          {study.map((row) => (
            <div key={row.school} className="flex flex-col gap-3 rounded-lg bg-raised p-5 shadow-[var(--shadow-hairline)]">
              <p className="text-sm font-medium text-ink">{row.school}</p>
              <p className="text-sm text-muted">{row.program}</p>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-sodium">{row.status}</p>
              <ul className="flex flex-col gap-1 text-sm text-haze">
                {row.courses.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed text-muted">{row.applied}</p>
            </div>
          ))}
          <p className="text-sm leading-relaxed text-haze">{notThoseSchools}</p>
        </section>

        <p className="text-sm text-muted">
          Heart kept: the hour, the two lights, James first, a guest after him, no green, no smoke, the
          title sitting. Next object: his voice on the trailer, then night one.
        </p>
        <Link to="/trailer" className="inline-flex h-11 w-fit items-center text-sm font-medium text-ink hover:text-glow-sodium">
          The trailer
        </Link>
      </article>
    </ShowShell>
  );
}
