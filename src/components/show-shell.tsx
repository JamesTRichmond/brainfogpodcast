import { Link } from "@tanstack/react-router";
import { TwoDiscMark } from "@/components/two-disc-mark";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const links = [
  { to: "/", label: "Show", exact: true },
  { to: "/trailer", label: "Trailer", exact: false },
  { to: "/episodes", label: "Nights", exact: false },
  { to: "/about", label: "About", exact: false },
] as const;

export function ShowShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-night">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-sodium focus:px-3 focus:py-2 focus:text-sm focus:text-night"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-night/80 px-4 py-3 backdrop-blur-md sm:px-8">
        <Link to="/" className="flex items-center gap-2 text-ink" activeOptions={{ exact: true }}>
          <TwoDiscMark size={28} />
          <span className="hidden text-xs font-medium uppercase tracking-[0.22em] sm:inline">
            {brand.kicker}
          </span>
        </Link>
        <nav className="-mr-4 flex justify-end overflow-x-auto pr-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={l.exact ? { exact: true } : undefined}
              className={cn(
                "inline-flex h-11 shrink-0 items-center px-3 text-xs font-medium uppercase tracking-[0.18em] text-muted hover:text-ink",
                "data-[status=active]:text-ink",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-ink/10 px-4 py-10 text-center text-xs text-haze">
        {brand.name} · {brand.host} · {brand.tell} · will live at {brand.domain}
      </footer>
    </div>
  );
}
