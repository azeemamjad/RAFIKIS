import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

const SITE_URL = "https://www.rafikis.ae";
const OG_IMAGE = `${SITE_URL}/og.jpg`;
const PAGE_TITLE = "Rafikis — East African Grill at Alserkal Avenue";
const PAGE_DESCRIPTION =
  "Rafikis East African Grill is opening soon at Alserkal Avenue, Al Quoz, Dubai. Discover our grills, snacks, sides and desserts.";

function NotFoundComponent() {
  return (
    <div className="bg-ink flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-sans text-ember text-[10px] font-medium tracking-[0.5em] uppercase">
          Error 404
        </p>
        <h1 className="font-brand text-cream mt-6 text-5xl leading-none">RAFIKIS</h1>
        <p className="font-serif-italic text-cream mt-6 text-2xl">This table isn&rsquo;t set.</p>
        <p className="font-sans text-cream/75 mt-4 text-sm leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="font-sans border-cream/30 text-cream hover:border-cream hover:text-cream inline-flex items-center justify-center border px-6 py-3 text-[10px] font-semibold tracking-[0.3em] uppercase transition-colors"
          >
            Back to the fire
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="bg-ink flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-sans text-ember text-[10px] font-medium tracking-[0.5em] uppercase">
          Rafikis
        </p>
        <h1 className="font-brand text-cream mt-6 text-4xl leading-none">OFF THE GRILL</h1>
        <p className="font-serif-italic text-cream mt-6 text-2xl">This page didn&rsquo;t load.</p>
        <p className="font-sans text-cream/75 mt-4 text-sm leading-relaxed">
          Something went wrong on our end. Try again, or head back to the fire.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="font-sans bg-cream text-ink hover:bg-cream/90 inline-flex items-center justify-center px-6 py-3 text-[10px] font-semibold tracking-[0.3em] uppercase transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="font-sans border-cream/30 text-cream hover:border-cream hover:text-cream inline-flex items-center justify-center border px-6 py-3 text-[10px] font-semibold tracking-[0.3em] uppercase transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { name: "theme-color", content: "#111111" },
      { name: "author", content: "Rafikis" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Rafikis" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: "Opening soon at Alserkal Avenue, Al Quoz, Dubai." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_AE" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Rafikis — East African Grill, Dubai" },
      { property: "og:image:type", content: "image/jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "canonical", href: `${SITE_URL}/` },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
