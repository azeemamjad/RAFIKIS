import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});



function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display tracking-[0.08em] ${className}`}>RAFIKIS</span>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-bone)] font-body">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[var(--color-ink)]/95 backdrop-blur-md border-b border-[var(--color-bone)]/10">
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-center">
          <a href="#top" className="text-center text-[var(--color-bone)]">
            <span className="font-display text-2xl md:text-3xl tracking-[0.12em] block leading-none">RAFIKIS</span>
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative mt-20 min-h-[calc(100dvh-5rem)] flex items-center justify-center md:mt-0 md:min-h-screen md:items-end md:justify-start overflow-hidden bg-[var(--color-ink)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/40 via-transparent to-[var(--color-ink)]" />
        <div className="relative z-10 w-full text-center px-6 md:pb-32">
          <h1 className="font-display text-[20vw] md:text-[14rem] leading-[0.85] tracking-[0.04em] text-[var(--color-bone)]">RAFIKIS</h1>
          <p className="font-heading text-[10px] md:text-xs tracking-[0.5em] uppercase mt-4 text-[var(--color-bone)]/80">Dubai's East African Grill House</p>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-28 md:py-40 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-heading text-[10px] tracking-[0.4em] uppercase text-[var(--color-bone)]/60 mb-6">Our Story</p>
          <h2 className="font-display text-5xl md:text-7xl leading-none tracking-[0.04em] text-[var(--color-bone)] mb-10">
            FRIENDS, BY THE FIRE.
          </h2>
          <div className="space-y-5 text-[var(--color-bone)]/75 leading-[1.8] text-[15px] mb-16">
            <p>
              Rafikis, Swahili for "friends," is born from a journey that begins in East Africa. For generations, a Muslim community made its home along the coast of Tanzania, Kenya, and Uganda, building a culinary tradition that fused Indian spice, Arab trade routes, Portuguese influence, and African soul.
            </p>
            <p>
              In the 1970s, that community was uprooted, with families resettling across the world, carrying their recipes with them.
            </p>
            <p>
              Our family was one of those. Growing up in the diaspora, our weekly ritual was a trip to the tiny community restaurant, mishkaki off the skewer, chooza chicken with pili pili, jungle ribs, samosas hot from the fryer.
            </p>
            <p className="text-[var(--color-bone)] italic">
              That food is the connective tissue of our community. Rafikis brings it home to the region where it was born.
            </p>
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section id="coming" className="relative pt-32 md:pt-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)] via-[var(--color-ember)]/30 via-[var(--color-ember)]/50 via-[var(--color-ember)]/70 to-black" />
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 md:px-10">
          <p className="font-heading text-[10px] tracking-[0.4em] uppercase text-[var(--color-bone)]/60 mb-8">Opening Soon</p>
          <h2 className="font-display text-6xl md:text-9xl lg:text-[10rem] leading-[0.9] tracking-[0.04em] text-[var(--color-bone)] mb-10">
            SEPTEMBER 2026
          </h2>
          <p className="font-heading text-sm md:text-base tracking-[0.25em] uppercase text-[var(--color-bone)]/80">
            Coming to Alserkal Avenue · Al Qouz, Dubai, UAE
          </p>
        </div>

        <footer className="relative z-10 border-t border-[var(--color-bone)]/10 mt-32 md:mt-48">
          <div className="max-w-7xl mx-auto py-10 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <Wordmark className="text-xl text-[var(--color-bone)]" />
            <p className="font-heading text-[10px] tracking-[0.3em] uppercase text-[var(--color-bone)]/50">
              © {new Date().getFullYear()} Rafikis Dubai
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
}
