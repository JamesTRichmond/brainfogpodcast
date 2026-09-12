import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { ShowShell } from "@/components/show-shell";
import appCss from "../styles.css?url";

const APP_NAME = "Late Night Brain Fog";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Two people talking. About an hour. Late. James Richmond's show.",
      },
      { name: "theme-color", content: "#14110E" },
      { property: "og:title", content: APP_NAME },
      {
        property: "og:description",
        content:
          "Two people talking. About an hour. Late. James Richmond's show.",
      },
      { property: "og:image", content: "/kit/cover.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/kit/cover.png" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/kit/avatar.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Space+Grotesk:wght@400;500;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-night font-sans text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <ShowShell>
      <div className="mx-auto flex max-w-xl flex-col gap-4 px-4 py-20 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-sodium">404</p>
        <h1 className="font-display text-4xl font-semibold text-ink">Nothing here</h1>
        <p className="text-sm leading-relaxed text-muted">That page isn't part of the show.</p>
        <Link to="/" className="inline-flex h-11 w-fit items-center text-sm font-medium text-ink hover:text-glow-sodium">
          The show
        </Link>
      </div>
    </ShowShell>
  );
}
