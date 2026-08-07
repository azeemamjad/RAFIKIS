import { createFileRoute } from "@tanstack/react-router";
import smokeImg from "../assets/smoke.webp";
import elephantImg from "../assets/elephant.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 bg-[#111111]">
        <div className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-center px-6 md:h-20 md:px-10">
          <a
            href="https://instagram.com/rafikisdubai"
            target="_blank"
            rel="noreferrer"
            className="absolute left-6 hidden text-[10px] tracking-[0.35em] text-cream/60 uppercase transition-colors hover:text-ember sm:block md:left-10"
          >
            @rafikisdubai
          </a>
          <a
            href="#top"
            className="font-brand pt-1 text-2xl leading-none text-cream md:text-3xl"
          >
            RAFIKIS
          </a>
          <span className="absolute right-6 hidden text-[10px] tracking-[0.35em] text-cream/60 uppercase sm:block md:right-10">
            Dubai · September 2026
          </span>
        </div>
      </header>

      <main className="pt-16 md:pt-20">
        <section
          id="top"
          className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-[#111111]"
        >
          <div className="pointer-events-none absolute inset-0">
            <img
              src={smokeImg}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-[42%_center] opacity-[0.35]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111]/40 via-transparent to-[#111]" />
          </div>

          <div className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-8 py-24 text-center sm:px-10">
            <p className="mb-5 animate-fade-up text-[11px] tracking-[0.5em] text-cream/70 uppercase [animation-delay:80ms]">
              East African Grill
            </p>
            <h1 className="font-brand animate-fade-up text-[18vw] leading-[0.85] text-cream sm:text-[14vw] md:text-[10rem] lg:text-[12rem] [animation-delay:160ms]">
              RAFIKIS
            </h1>
            <p className="font-serif-italic mt-10 max-w-[19.5rem] animate-fade-up text-lg leading-relaxed text-cream/90 sm:max-w-xl sm:text-xl md:max-w-2xl md:text-2xl [animation-delay:320ms]">
              Born from family recipes carried across continents. Hand-marinated.
              Charcoal-grilled. The food that brought our community together.
            </p>
            <div className="mt-24 flex animate-fade-up flex-col items-center gap-6 [animation-delay:520ms]">
              <span className="text-sm font-medium tracking-[0.6em] text-ember uppercase md:text-base">
                Opening
              </span>
              <p className="text-2xl font-light tracking-[0.22em] text-cream uppercase sm:text-3xl sm:tracking-[0.26em] md:text-5xl md:tracking-[0.28em] lg:text-6xl">
                September 2026
              </p>
              <p className="text-sm font-normal tracking-[0.55em] text-cream/80 uppercase md:text-base">
                Dubai
              </p>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-2">
            <div className="order-2 flex flex-col justify-center px-10 py-20 text-center sm:px-12 md:px-16 lg:order-1 lg:px-24 lg:py-32 lg:text-left">
              <p className="mb-8 text-xs font-medium tracking-[0.5em] text-ember uppercase">
                Our Story
              </p>
              <h2 className="text-4xl leading-[1] font-light tracking-[0.02em] text-cream uppercase md:text-5xl lg:text-6xl">
                Friends,
                <br />
                by the fire.
              </h2>
              <div className="mx-auto mt-14 max-w-xl space-y-7 text-[15px] leading-[1.8] text-cream/75 lg:mx-0">
                <p className="font-serif-italic text-2xl text-cream">
                  Rafikis: Swahili for &ldquo;friends.&rdquo;
                </p>
                <p>
                  For generations, a community made its home along the East African
                  coast, Tanzania, Kenya, Uganda, building a culinary tradition where
                  Indian spice met Arab grilling, Portuguese influence met African
                  soul.
                </p>
                <p>
                  In the 1970s, that community was uprooted. Families resettled across
                  the world. The recipes came with them.
                </p>
                <p>
                  Growing up in the diaspora, the weekly ritual was the tiny community
                  restaurant. Mishkaki off the skewer. Chooza chicken with pili pili.
                  Jungle ribs. Samosas hot from the fryer. That food is the connective
                  tissue of the community.
                </p>
                <p className="font-serif-italic pt-3 text-lg text-cream">
                  Rafikis brings it home, to the greatest city that welcomed us, and a
                  region where this food has always belonged.
                </p>
              </div>
            </div>
            <div className="relative order-1 min-h-[55vh] lg:order-2 lg:min-h-[100vh]">
              <img
                src={elephantImg}
                alt="Elephant grazing in East African savanna at midday"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#111]/25" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#111]/40" />
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5">
          <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10">
            <div className="flex flex-col items-center gap-8 text-center">
              <div className="font-brand pt-1 text-4xl leading-none text-cream">
                RAFIKIS
              </div>
              <div className="space-y-3">
                <p className="text-[11px] tracking-[0.5em] text-cream/70 uppercase">
                  Opening September 2026
                </p>
                <p className="text-[11px] tracking-[0.5em] text-cream/50 uppercase">
                  Dubai
                </p>
              </div>
              <div className="mt-6 flex gap-8 text-[10px] tracking-[0.4em] text-cream/60 uppercase">
                <a href="#" className="transition-colors hover:text-ember">
                  @rafikisdubai
                </a>
              </div>
              <p className="mt-10 text-[9px] tracking-[0.3em] text-cream/30 uppercase">
                © 2026 RAFIKIS
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
