import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "hero",          label: "Home" },
  { id: "features",     label: "Features" },
  { id: "templates",    label: "Templates" },
  { id: "how-it-works", label: "How It Works" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact",      label: "Contact" },
];

export const SectionNav = () => {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35, rootMargin: "-10% 0px -10% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
      aria-label="Section navigation"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${label}`}
            className="group flex items-center gap-2.5 outline-none"
          >
            {/* Label — slides in from right on hover / active */}
            <span
              className={`
                font-sans text-[11px] font-semibold uppercase tracking-widest
                bg-card/90 backdrop-blur-sm border border-border
                px-2.5 py-1 shadow-sm whitespace-nowrap
                transition-all duration-200
                ${isActive
                  ? "opacity-100 translate-x-0 text-accent"
                  : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-foreground/70"}
              `}
            >
              {label}
            </span>

            {/* Dot */}
            <span
              className={`
                shrink-0 rounded-full border-2 transition-all duration-300
                ${isActive
                  ? "w-3 h-3 bg-accent border-accent"
                  : "w-2 h-2 bg-transparent border-muted-foreground/35 group-hover:border-accent/70"}
              `}
            />
          </button>
        );
      })}
    </nav>
  );
};
