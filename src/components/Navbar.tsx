import { useState, useEffect } from "react";
import { FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";

interface NavbarProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onGetStarted: () => void;
}

const navT = {
  en: { home: "Home", templates: "Templates", howItWorks: "How It Works", contact: "Contact", cta: "Get Started" },
  hi: { home: "होम", templates: "टेम्प्लेट", howItWorks: "कैसे काम करता है", contact: "संपर्क", cta: "शुरू करें" },
  kn: { home: "ಮುಖ್ಯ", templates: "ಟೆಂಪ್ಲೇಟ್", howItWorks: "ಹೇಗೆ ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತದೆ", contact: "ಸಂಪರ್ಕ", cta: "ಪ್ರಾರಂಭಿಸಿ" },
  mr: { home: "होम", templates: "टेम्प्लेट्स", howItWorks: "कसे काम करते", contact: "संपर्क", cta: "सुरुवात करा" },
  te: { home: "హోమ్", templates: "టెంప్లేట్లు", howItWorks: "ఎలా పని చేస్తుంది", contact: "సంప్రదించండి", cta: "మొదలుపెట్టండి" },
};

const NAV_LINKS = [
  { key: "home",       id: "hero" },
  { key: "templates",  id: "templates" },
  { key: "howItWorks", id: "how-it-works" },
  { key: "contact",    id: "contact" },
] as const;

// Which section id maps to each nav key
const SECTION_TO_KEY: Record<string, string> = {
  hero:          "home",
  features:      "home",
  templates:     "templates",
  "how-it-works": "howItWorks",
  testimonials:  "contact",
  contact:       "contact",
};

const ALL_SECTION_IDS = ["hero", "features", "templates", "how-it-works", "testimonials", "contact"];

export const Navbar = ({ currentLanguage, onLanguageChange, onGetStarted }: NavbarProps) => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeKey, setActiveKey]   = useState("home");
  const t = navT[currentLanguage as keyof typeof navT] || navT.en;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ALL_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveKey(SECTION_TO_KEY[id] ?? "home"); },
        { threshold: 0.4, rootMargin: "-5% 0px -5% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navBase = scrolled
    ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-border"
    : "bg-transparent";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBase}`}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollTo("hero")}>
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className={`text-lg font-bold font-serif tracking-wide transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
            LandDocs
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ key, id }) => {
            const isActive = activeKey === key;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`
                  relative text-sm font-medium transition-colors pb-0.5
                  ${scrolled
                    ? isActive ? "text-primary" : "text-foreground/60 hover:text-primary"
                    : isActive ? "text-white" : "text-white/70 hover:text-white"}
                `}
              >
                {t[key]}
                {/* Active underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${isActive ? "w-full" : "w-0"}`}
                />
              </button>
            );
          })}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
          <Button
            onClick={onGetStarted}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm px-5 h-9 rounded-sm"
          >
            {t.cta}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-border px-6 py-5 space-y-1">
          {NAV_LINKS.map(({ key, id }) => {
            const isActive = activeKey === key;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`block w-full text-left text-sm font-medium py-2.5 border-b border-border/50 last:border-0 transition-colors ${
                  isActive ? "text-primary font-semibold" : "text-foreground/65 hover:text-primary"
                }`}
              >
                {t[key]}
              </button>
            );
          })}
          <div className="flex items-center gap-3 pt-3">
            <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
            <Button
              onClick={onGetStarted}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-sm"
            >
              {t.cta}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
