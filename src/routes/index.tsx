import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import story from "@/assets/story.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});



type Item = { name: string; price: string; desc: string };
type Section = { title: string; note?: string; items: Item[] };

const MENU: Section[] = [
  {
    title: "Grills",
    note: "All served with choice of pili pili fries, plain fries or rice.",
    items: [
      { name: "Chooza Chicken", price: "45", desc: "Boneless chicken marinated in a vibrant, spicy tikka-style sauce and grilled to smoky perfection." },
      { name: "Beef Jungle Ribs", price: "45", desc: "Tender, slow-cooked beef ribs marinated in a signature blend of East African spices and charred over an open flame." },
      { name: "Beef Mishkaki", price: "45", desc: "Traditional East African skewers of marinated cubed beef, grilled for a tender and aromatic street-food experience." },
      { name: "Lamb Chops", price: "49", desc: "Infused with garlic, ginger, and Kenyan-inspired spices, finished with a hard sear." },
    ],
  },
  {
    title: "Sides",
    items: [
      { name: "Pili Pili Fries", price: "25", desc: "Crispy golden fries tossed in a house-made hot pepper seasoning for a signature spicy kick." },
      { name: "Regular Fries", price: "20", desc: "Crispy golden fries tossed in a pinch of salt." },
      { name: "Pili Pili Rice", price: "25", desc: "Fragrant spiced rice with seasonal vegetables and a hint of heat." },
    ],
  },
  {
    title: "Snacks",
    items: [
      { name: "Kababs", price: "30", desc: "Spiced ground beef/lamb patties mixed with fresh herbs and shallow-fried for a crispy exterior and juicy center." },
      { name: "Samosas", price: "30", desc: "Hand-folded golden pastry triangles stuffed with a savory, lightly spiced minced beef filling." },
      { name: "Mogo", price: "25", desc: "Fried cassava that is crispy on the outside and fluffy on the inside, served with or without a dusting of chili and salt." },
    ],
  },
  {
    title: "Sauces",
    items: [
      { name: "Chooza Sauce", price: "—", desc: "The house-special fiery chili sauce. Full bottle." },
      { name: "Ambli", price: "—", desc: "A tangy and sweet tamarind-based chutney." },
      { name: "Coconut Chutney", price: "—", desc: "A creamy, tropical sauce made with fresh grated coconut and subtle green chilies." },
      { name: "Raita", price: "—", desc: "A cooling yogurt-based dip blended with cucumber and light spices." },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Mandazi Ice Cream Sandwich", price: "15", desc: "Warm East African doughnut pillows pressed around vanilla bean ice cream." },
      { name: "Chai Affogato", price: "15", desc: "Spiced masala chai poured tableside over a scoop of cardamom ice cream." },
    ],
  },
];

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display tracking-[0.08em] ${className}`}>RAFIKIS</span>
  );
}

function MenuTab({
  title,
  isActive,
  onSelect,
}: {
  title: string;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`font-display text-xl md:text-2xl tracking-[0.18em] uppercase pb-5 -mb-px border-b-2 transition ${
        isActive
          ? "text-[var(--color-bone)] border-[var(--color-bone)]"
          : "text-[var(--color-bone)]/40 border-transparent hover:text-[var(--color-bone)]/70"
      }`}
    >
      {title}
    </button>
  );
}

function Index() {
  const [activeTab, setActiveTab] = useState(MENU[0].title);
  const active = MENU.find((s) => s.title === activeTab) ?? MENU[0];
  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-bone)] font-body">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[var(--color-ink)]/95 backdrop-blur-md border-b border-[var(--color-bone)]/10">
        <nav className="relative max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center md:grid md:grid-cols-3">
          <ul className="hidden md:flex items-center gap-10 font-heading text-[11px] tracking-[0.25em] uppercase text-[var(--color-bone)]/80">
            <li><a href="#story" className="hover:text-[var(--color-bone)] transition">Story</a></li>
            <li><a href="#menu" className="hover:text-[var(--color-bone)] transition">Menu</a></li>
            <li><a href="#visit" className="hover:text-[var(--color-bone)] transition">Visit</a></li>
          </ul>
          <a
            href="#top"
            className="text-left text-[var(--color-bone)] md:text-center md:justify-self-center"
          >
            <span className="font-display text-2xl md:text-3xl tracking-[0.12em] block leading-none">RAFIKIS</span>
            <span className="font-heading text-[9px] tracking-[0.4em] uppercase text-[var(--color-bone)]/60 mt-1 block">Dubai</span>
          </a>
          <div className="ml-auto flex shrink-0 justify-end md:ml-0 md:justify-self-end">
            <a href="https://instagram.com/rafikisdubai" target="_blank" rel="noopener noreferrer" className="font-heading text-[11px] tracking-[0.25em] uppercase text-[var(--color-bone)]/80 hover:text-[var(--color-bone)] transition">@Rafikisdubai</a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <img
          src={hero}
          alt="Mishkaki skewers grilling over open flame"
          width={1600}
          height={1800}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-[var(--color-ink)]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/70 via-[var(--color-ink)]/25 to-[var(--color-ink)]/90" />
        <div className="relative z-10 w-full text-center px-6 -mt-8 md:-mt-12">
          <h1 className="font-display text-[20vw] md:text-[14rem] leading-[0.85] tracking-[0.04em] text-[var(--color-bone)]">RAFIKIS</h1>
          <p className="font-heading text-[10px] md:text-xs tracking-[0.5em] uppercase mt-4 text-[var(--color-bone)]/80">Dubai's East African Grill House</p>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-28 md:py-40 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1">
            <p className="font-heading text-[10px] tracking-[0.4em] uppercase text-[var(--color-bone)]/60 mb-6">Our Story</p>
            <h2 className="font-display text-5xl md:text-7xl leading-none tracking-[0.04em] text-[var(--color-bone)] mb-10">
              FRIENDS,<br/>BY THE FIRE.
            </h2>
            <div className="space-y-5 text-[var(--color-bone)]/75 leading-[1.8] text-[15px] max-w-prose">
              <p>
                Rafikis, Swahili for "friends," is born from a journey that begins in East Africa. For generations, a Muslim community made its home along the coast of Tanzania, Kenya, and Uganda, building a culinary tradition that fused Indian spice, Arab trade routes, Portuguese influence, and African soul.
              </p>
              <p>
                In the 1970s, that community was uprooted, with families resettling across the world, carrying their recipes with them.
              </p>
              <p>
                My father was one of those children, leaving Dar es Salaam before the age of ten. Growing up in the diaspora, our weekly ritual was a trip to the tiny community restaurant — mishkaki off the skewer, chooza chicken with pili pili, jungle ribs, samosas hot from the fryer.
              </p>
              <p className="text-[var(--color-bone)] italic">
                That food is the connective tissue of our community. Rafikis brings it home to the region where it was born.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img src={story} alt="House-made pili pili sauce" width={1400} height={1600} loading="lazy" className="w-full h-[480px] md:h-[640px] object-cover" />
          </div>
        </div>
      </section>

      {/* MENU — Carbone-style */}
      <section id="menu" className="py-28 md:py-40 px-6 md:px-10 border-t border-[var(--color-bone)]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-6xl md:text-8xl tracking-[0.06em] text-[var(--color-bone)] text-center mb-16 md:mb-20">MENU</h2>

          {/* Tabs */}
          <div className="border-b border-[var(--color-bone)]/20 mb-16 md:mb-20">
            <div className="flex flex-col items-center gap-y-4 md:hidden">
              <div className="flex w-full justify-center gap-x-6 sm:gap-x-10">
                {MENU.slice(0, 3).map((section) => (
                  <MenuTab
                    key={section.title}
                    title={section.title}
                    isActive={section.title === activeTab}
                    onSelect={() => setActiveTab(section.title)}
                  />
                ))}
              </div>
              <div className="flex w-full justify-center gap-x-6 sm:gap-x-10">
                {MENU.slice(3).map((section) => (
                  <MenuTab
                    key={section.title}
                    title={section.title}
                    isActive={section.title === activeTab}
                    onSelect={() => setActiveTab(section.title)}
                  />
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-wrap justify-center gap-x-16 gap-y-4">
              {MENU.map((section) => (
                <MenuTab
                  key={section.title}
                  title={section.title}
                  isActive={section.title === activeTab}
                  onSelect={() => setActiveTab(section.title)}
                />
              ))}
            </div>
          </div>

          {/* Active section items */}
          {active.note && (
            <p className="text-center text-[12px] tracking-[0.15em] uppercase text-[var(--color-bone)]/50 mb-12">{active.note}</p>
          )}
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-14 max-w-5xl mx-auto">
            {active.items.map((item) => (
              <div key={item.name} className="text-center">
                <div className="flex items-baseline justify-center gap-3 mb-3">
                  <h3 className="font-display text-2xl tracking-[0.12em] uppercase text-[var(--color-bone)]">{item.name}</h3>
                  <span className="font-heading text-[11px] tracking-[0.15em] text-[var(--color-bone)]/60">
                    {item.price === "—" ? "" : item.price}
                  </span>
                </div>
                <p className="text-[14px] italic text-[var(--color-bone)]/65 leading-relaxed max-w-sm mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center font-heading text-[10px] tracking-[0.4em] uppercase text-[var(--color-bone)]/40 mt-20">
            Prices in AED
          </p>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="py-28 md:py-40 px-6 md:px-10 border-t border-[var(--color-bone)]/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-7xl tracking-[0.05em] text-[var(--color-bone)] mb-20">VISIT</h2>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div>
              <p className="font-heading text-[10px] tracking-[0.4em] uppercase text-[var(--color-bone)]/50 mb-4">Address</p>
              <p className="text-[var(--color-bone)]/85 leading-relaxed">Alserkal Avenue<br/>Al Qouz, Dubai, UAE</p>
            </div>
            <div>
              <p className="font-heading text-[10px] tracking-[0.4em] uppercase text-[var(--color-bone)]/50 mb-4">Hours</p>
              <p className="text-[var(--color-bone)]/85 leading-relaxed">Daily<br/>12:00 PM – 12:00 AM</p>
            </div>
            <div>
              <p className="font-heading text-[10px] tracking-[0.4em] uppercase text-[var(--color-bone)]/50 mb-4">Contact</p>
              <p className="text-[var(--color-bone)]/85 leading-relaxed">
                <a href="https://wa.me/97140000000" className="hover:text-[var(--color-bone)] transition">+971 4 000 0000</a>
                <br/>
                <span className="text-[var(--color-bone)]/60 text-[12px] tracking-[0.15em] uppercase">Phone · WhatsApp</span>
              </p>
            </div>
          </div>

          {/* Divider + Instagram */}
          <div className="mt-20 pt-12 border-t border-[var(--color-bone)]/15">
            <p className="font-heading text-[10px] tracking-[0.4em] uppercase text-[var(--color-bone)]/50 mb-4">Follow</p>
            <a
              href="https://instagram.com/rafikisdubai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-3xl md:text-4xl tracking-[0.12em] text-[var(--color-bone)] hover:text-[var(--color-bone)]/70 transition"
            >
              @rafikisdubai
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--color-bone)]/10 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Wordmark className="text-xl text-[var(--color-bone)]" />
          <p className="font-heading text-[10px] tracking-[0.3em] uppercase text-[var(--color-bone)]/50">
            © {new Date().getFullYear()} Rafikis Dubai
          </p>
        </div>
      </footer>
    </div>
  );
}
