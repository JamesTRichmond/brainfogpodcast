import { createFileRoute, Link } from "@tanstack/react-router";
import { ShowShell } from "@/components/show-shell";
import { brand } from "@/lib/brand";
import { guestPage } from "@/lib/guest";

export const Route = createFileRoute("/guest")({
  component: Guest,
  head: () => ({
    meta: [
      { title: `If you're sitting · ${brand.name}` },
      { name: "description", content: guestPage.what },
    ],
  }),
});

function Guest() {
  return (
    <ShowShell>
      <div className="mx-auto flex max-w-2xl flex-col gap-10 px-4 py-12 sm:px-6">
        <header className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">{guestPage.kicker}</p>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">{guestPage.title}</h1>
          <p className="text-pretty text-base leading-relaxed text-muted">{guestPage.what}</p>
        </header>
        <div className="flex flex-col gap-5">
          {guestPage.body.map((p) => (
            <p key={p.slice(0, 32)} className="text-pretty text-base leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
        <Link to="/" className="inline-flex h-11 w-fit items-center text-sm font-medium text-ink hover:text-glow-sodium">
          The show
        </Link>
      </div>
    </ShowShell>
  );
}