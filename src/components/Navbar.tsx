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

const links = [
  { key: "home", id: "#hero" },
  { key: "templates", id: "#templates" },
  { key: "howItWorks", id: "#how-it-works" },
  { key: "contact", id: "#contact" },
] as const;

export const Navbar = ({ currentLanguage, onLanguageChange, onGetStarted }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = navT[currentLanguage as keyof typeof navT] || navT.en;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navBase = scrolled
    ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-border"
    : "bg-transparent";

  const linkColor = scrolled ? "text-foreground/70 hover:text-primary" : "text-white/80 hover:text-white";
  const logoColor = scrolled ? "text-foreground" : "text-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBase}`}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollTo("#hero")}>
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className={`text-lg font-bold font-serif tracking-wide transition-colors ${logoColor}`}>
            LandDocs
          </span>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(({ key, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-sm font-medium transition-colors ${linkColor}`}
            >
              {t[key]}
            </button>
          ))}
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
          {links.map(({ key, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="block w-full text-left text-sm font-medium text-foreground/70 hover:text-primary py-2 border-b border-border/50 last:border-0"
            >
              {t[key]}
            </button>
          ))}
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
