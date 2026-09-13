import { createFileRoute } from "@tanstack/react-router";
import { ShowShell } from "@/components/show-shell";
import { Clicklist } from "@/components/clicklist";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/you")({
  component: You,
  head: () => ({
    meta: [
      { title: `You · ${brand.name}` },
      { name: "robots", content: "noindex" },
      { name: "description", content: "James's steps. Not the public show." },
    ],
  }),
});

function You() {
  return (
    <ShowShell>
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12 sm:px-6">
        <header>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">You</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Your hands</h1>
          <p className="mt-3 text-sm text-muted">
            Only what you have to do. Checks stay on this browser. Not the public nav.
          </p>
        </header>
        <Clicklist />
      </div>
    </ShowShell>
  );
}
