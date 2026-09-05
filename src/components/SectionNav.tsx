import { useState, useEffect } from "react";
import { useTranslation, type Translations } from "@/i18n";

const SECTION_IDS = ["hero", "features", "how-it-works", "testimonials", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

interface SectionNavStrings {
  labels: Record<SectionId, string>;
  goTo: (label: string) => string;
}

const sectionNavT: Translations<SectionNavStrings> = {
  en: {
    labels: { hero: "Home", features: "Features", "how-it-works": "How It Works", testimonials: "Testimonials", contact: "Contact" },
    goTo: (l) => `Go to ${l}`,
  },
  hi: {
    labels: { hero: "होम", features: "विशेषताएं", "how-it-works": "कैसे काम करता है", testimonials: "प्रशंसापत्र", contact: "संपर्क" },
    goTo: (l) => `${l} पर जाएं`,
  },
  kn: {
    labels: { hero: "ಮುಖ್ಯ", features: "ವೈಶಿಷ್ಟ್ಯಗಳು", "how-it-works": "ಹೇಗೆ ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತದೆ", testimonials: "ಅಭಿಪ್ರಾಯಗಳು", contact: "ಸಂಪರ್ಕ" },
    goTo: (l) => `${l} ಗೆ ಹೋಗಿ`,
  },
  mr: {
    labels: { hero: "होम", features: "वैशिष्ट्ये", "how-it-works": "कसे काम करते", testimonials: "प्रशंसापत्रे", contact: "संपर्क" },
    goTo: (l) => `${l} वर जा`,
  },
  ta: {
    labels: { hero: "முகப்பு", features: "அம்சங்கள்", "how-it-works": "எப்படி செயல்படுகிறது", testimonials: "கருத்துக்கள்", contact: "தொடர்பு" },
    goTo: (l) => `${l} க்குச் செல்`,
  },
  te: {
    labels: { hero: "హోమ్", features: "లక్షణాలు", "how-it-works": "ఎలా పని చేస్తుంది", testimonials: "అభిప్రాయాలు", contact: "సంప్రదించండి" },
    goTo: (l) => `${l} కు వెళ్లండి`,
  },
};

export const SectionNav = () => {
  const [active, setActive] = useState<string>("hero");
  const t = useTranslation(sectionNavT);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
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
      {SECTION_IDS.map((id) => {
        const isActive = active === id;
        const label = t.labels[id];
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={t.goTo(label)}
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
