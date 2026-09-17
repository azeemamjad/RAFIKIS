import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import smokeImg from "../assets/smoke.webp";
import elephantImg from "../assets/elephant.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const INSTAGRAM_URL = "https://instagram.com/rafikisdubai";
const LOCATION = "Alserkal Avenue · Al Quoz · Dubai";

type MenuSection = {
  id: string;
  title: string;
  note?: string;
  /** When true the final dish spans both columns so the grid stays balanced. */
  centerLast?: boolean;
  items: { name: string; description: string }[];
};

const MENU: MenuSection[] = [
  {
    id: "grills",
    title: "Grills",
    note: "All grills served with pili pili fries, classic fries or pili pili rice.",
    items: [
      {
        name: "Chooza Chicken",
        description:
          "Boneless chicken in our East African twist on tikka, flame-grilled and smoky.",
      },
      {
        name: "Beef Jungle Ribs",
        description:
          "Beef ribs rubbed in our East African spice blend and charred over an open flame.",
      },
      {
        name: "Beef Mishkaki",
        description:
          "Swahili street-food skewers of marinated beef, grilled until juicy and tender.",
      },
      {
        name: "Lamb Chops",
        description:
          "Marinated in garlic, ginger and Kenyan spices, then seared for a caramelised crust.",
      },
    ],
  },
  {
    id: "snacks",
    title: "Snacks",
    items: [
      {
        name: "Kebabs",
        description: "East African-style spiced beef patties with fresh herbs, crisp and juicy.",
      },
      {
        name: "Samosas",
        description:
          "An East African favourite; hand-folded golden pastry filled with lightly spiced minced beef.",
      },
      {
        name: "Mogo",
        description:
          "Fried cassava, crispy on the outside and fluffy on the inside. Plain or with chilli and salt.",
      },
      {
        name: "Snack Trio",
        description: "Kebabs, samosas, and mogo. A bit of everything.",
      },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    centerLast: true,
    items: [
      {
        name: "Pili Pili Fries",
        description: "Golden fries tossed in our house-made pili pili seasoning.",
      },
      {
        name: "Regular Fries",
        description: "Crispy golden fries with a pinch of salt.",
      },
      {
        name: "Pili Pili Rice",
        description: "Spiced rice with seasonal vegetables and a gentle kick of heat.",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      {
        name: "Mandazi Ice Cream Sandwich",
        description: "Warm East African fried dough filled with vanilla ice cream.",
      },
      {
        name: "Chai Affogato",
        description: "Warm East African fried dough filled with vanilla ice cream.",
      },
    ],
  },
];

function Header() {
  return (
    <header className="bg-ink fixed inset-x-0 top-0 z-50">
      <div className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-10">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="text-cream/70 hover:text-cream font-sans text-[10px] font-medium tracking-[0.3em] uppercase transition-colors md:text-[11px]"
        >
          @rafikisdubai
        </a>

        <a
          href="#top"
          aria-label="Rafikis — back to top"
          className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        >
          <span className="font-brand text-cream pt-1 text-xl leading-none md:text-2xl">
            RAFIKIS
          </span>
          <span className="font-sans text-cream/60 mt-1.5 pl-1 text-[8px] font-medium tracking-[0.5em] uppercase">
            Dubai
          </span>
        </a>

        <span className="w-[110px] md:w-[130px]" aria-hidden="true" />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-ink">
      {/* Background: the Rafikis smoke plate over charcoal, lit from below. */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 85% at 50% 108%, #3a1c07 0%, #1d0f05 38%, #111111 76%)",
          }}
        />
        <img
          src={smokeImg}
          alt=""
          aria-hidden="true"
          className="animate-hero-zoom h-full w-full scale-105 object-cover object-[42%_center] opacity-[0.32]"
          style={{
            maskImage:
              "radial-gradient(88% 78% at 50% 54%, #000 0%, rgba(0,0,0,0.72) 46%, rgba(0,0,0,0.18) 100%)",
            WebkitMaskImage:
              "radial-gradient(88% 78% at 50% 54%, #000 0%, rgba(0,0,0,0.72) 46%, rgba(0,0,0,0.18) 100%)",
          }}
        />
        <div className="from-ink/60 to-ink absolute inset-0 bg-gradient-to-b via-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(96% 76% at 50% 54%, rgba(17,17,17,0) 16%, rgba(17,17,17,0.6) 58%, rgba(17,17,17,0.96) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-6 py-24 text-center">
        <p className="animate-fade-up font-sans text-[10px] font-medium tracking-[0.5em] text-cream/85 uppercase">
          East African Grill
        </p>
        <h1 className="animate-fade-up font-brand text-cream mt-10 text-[17vw] leading-[0.9] [animation-delay:120ms] sm:text-[13vw] md:text-[9rem] lg:text-[10rem]">
          RAFIKIS
        </h1>
        <div className="animate-line-grow brand-rule mt-10 h-px w-16 [animation-delay:300ms]" />
        <p className="animate-fade-up font-serif-italic text-cream/90 mt-10 max-w-2xl px-4 text-xl leading-relaxed [animation-delay:420ms] md:text-2xl">
          Born from family recipes carried across continents. Hand-marinated. Charcoal-grilled. The
          food that brought our community together.
        </p>
        <div className="animate-fade-up mt-20 flex flex-col items-center gap-6 [animation-delay:600ms]">
          <p className="font-sans text-cream text-3xl font-light tracking-[0.28em] uppercase md:text-5xl lg:text-6xl">
            Opening soon
          </p>
          <p className="font-sans text-cream text-sm leading-loose tracking-[0.32em] uppercase md:text-base">
            {LOCATION}
          </p>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="bg-ink scroll-mt-16 md:scroll-mt-20">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-6 py-24 sm:px-10 md:px-16 lg:order-1 lg:px-24 lg:py-36">
          <p className="font-sans text-ember text-[10px] font-medium tracking-[0.5em] uppercase">
            Our Story
          </p>
          <h2 className="font-serif-italic text-cream mt-8 text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
            Friends,
            <br />
            by the fire.
          </h2>
          <div className="font-sans text-cream/85 mt-12 max-w-xl space-y-5 text-[15px] leading-[1.8]">
            <p className="font-serif-italic text-cream text-2xl">
              Rafikis: Swahili for &ldquo;friends.&rdquo;
            </p>
            <p>
              For generations, a community made its home along the East African coast, Tanzania,
              Kenya, Uganda, building a culinary tradition where Indian spice met Arab charcoal, and
              Portuguese chilli met Swahili Coconut.
            </p>
            <p>
              In the 1970s, that community lost its home. Families resettled across the world. The
              recipes went with them.
            </p>
            <p>
              Growing up in the diaspora, the weekly ritual was the tiny community restaurant.
              Mishkaki off the skewer. Chooza chicken with pili pili. Jungle ribs. Kababs and
              samosas hot from the fryer. That food is how the community held.
            </p>
            <p>
              Rafikis is that food. East African street food, off the grill, out of the fryer, made
              for sharing.
            </p>
            <p>
              Rafikis brings it to the greatest city in the world. A city that welcomed us, and
              where this food belongs.
            </p>
          </div>
        </div>

        <div className="relative order-1 min-h-[55vh] lg:order-2 lg:min-h-[100vh]">
          <img
            src={elephantImg}
            alt="Elephant grazing in East African savanna at midday"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink/40" />
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const [activeId, setActiveId] = useState(MENU[0].id);
  const active = MENU.find((section) => section.id === activeId) ?? MENU[0];

  return (
    <section id="menu" className="border-cream/10 bg-ink scroll-mt-16 border-y md:scroll-mt-20">
      <div className="mx-auto max-w-[1100px] px-6 py-24 sm:px-10 md:px-16 lg:py-32">
        <div className="text-center">
          <h2 className="font-brand text-cream text-5xl leading-none md:text-7xl">MENU</h2>
        </div>

        <nav aria-label="Menu categories" className="border-cream/15 mt-10 border-b md:mt-12">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap justify-center gap-x-6 gap-y-0 px-1 sm:gap-x-10 md:gap-x-14 md:px-2"
          >
            {MENU.map((section) => {
              const isActive = section.id === activeId;
              return (
                <button
                  key={section.id}
                  id={`menu-tab-${section.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`menu-panel-${section.id}`}
                  onClick={() => setActiveId(section.id)}
                  className={`font-sans -mb-px border-b py-4 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors ${
                    isActive
                      ? "border-cream text-cream"
                      : "text-cream/60 hover:text-cream border-transparent"
                  }`}
                >
                  {section.title}
                </button>
              );
            })}
          </div>
        </nav>

        <div
          id={`menu-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`menu-tab-${active.id}`}
          className="pt-14 md:pt-16"
        >
          {active.note ? (
            <p className="font-sans text-cream/70 mb-12 text-center text-[11px] tracking-[0.15em]">
              {active.note}
            </p>
          ) : null}

          <div className="grid gap-x-20 gap-y-12 md:grid-cols-2 md:gap-y-14">
            {active.items.map((item, index) => (
              <article
                key={item.name}
                className={`text-center ${
                  active.centerLast && index === active.items.length - 1 ? "md:col-span-2" : ""
                }`}
              >
                <h3 className="font-sans text-cream text-sm font-semibold tracking-[0.2em] uppercase">
                  {item.name}
                </h3>
                <p className="font-sans text-cream/75 mx-auto mt-3 max-w-md text-sm leading-relaxed font-normal">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="font-brand text-cream pt-1 text-3xl leading-none">RAFIKIS</div>
          <div className="brand-rule h-px w-14" />
          <div className="font-sans space-y-3">
            <p className="text-cream/85 text-[11px] font-medium tracking-[0.5em] uppercase">
              Opening soon
            </p>
            <p className="text-cream/85 text-xs leading-loose tracking-[0.32em] uppercase md:text-[13px]">
              {LOCATION}
            </p>
          </div>
          <div className="font-sans text-cream/80 mt-4 flex gap-8 text-[10px] tracking-[0.4em] uppercase">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ember transition-colors"
            >
              @rafikisdubai
            </a>
          </div>
          <p className="font-sans text-cream/45 mt-8 text-[9px] tracking-[0.3em] uppercase">
            © 2026 RAFIKIS
          </p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        <Hero />
        <Story />
        <Menu />
        <Footer />
      </main>
    </div>
  );
}
