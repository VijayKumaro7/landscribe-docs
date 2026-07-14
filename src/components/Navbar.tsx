import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslation, type Translations } from "@/i18n";

interface NavbarStrings {
  home: string;
  howItWorks: string;
  services: string;
  contact: string;
  cta: string;
}

const navT: Translations<NavbarStrings> = {
  en: { home: "Home", howItWorks: "How It Works", services: "Services", contact: "Contact", cta: "Get Started" },
  hi: { home: "होम", howItWorks: "कैसे काम करता है", services: "सेवाएं", contact: "संपर्क", cta: "शुरू करें" },
  kn: { home: "ಮುಖ್ಯ", howItWorks: "ಹೇಗೆ ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತದೆ", services: "ಸೇವೆಗಳು", contact: "ಸಂಪರ್ಕ", cta: "ಪ್ರಾರಂಭಿಸಿ" },
  mr: { home: "होम", howItWorks: "कसे काम करते", services: "सेवा", contact: "संपर्क", cta: "सुरुवात करा" },
  ta: { home: "முகப்பு", howItWorks: "எப்படி செயல்படுகிறது", services: "சேவைகள்", contact: "தொடர்பு", cta: "தொடங்குங்கள்" },
  te: { home: "హోమ్", howItWorks: "ఎలా పని చేస్తుంది", services: "సేవలు", contact: "సంప్రదించండి", cta: "మొదలుపెట్టండి" },
};

type NavLink =
  | { key: keyof NavbarStrings; kind: "section"; id: string }
  | { key: keyof NavbarStrings; kind: "route"; to: string };

const NAV_LINKS: NavLink[] = [
  { key: "home",       kind: "section", id: "hero" },
  { key: "howItWorks", kind: "section", id: "how-it-works" },
  { key: "services",   kind: "route",   to: "/services" },
  { key: "contact",    kind: "section", id: "contact" },
];

// Which section id maps to each nav key (scroll-spy on the home page)
const SECTION_TO_KEY: Record<string, keyof NavbarStrings> = {
  hero:           "home",
  features:       "home",
  "how-it-works": "howItWorks",
  testimonials:   "contact",
  contact:        "contact",
};

const ALL_SECTION_IDS = Object.keys(SECTION_TO_KEY);

export const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeKey, setActiveKey]   = useState<keyof NavbarStrings>("home");
  const t = useTranslation(navT);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Track the active section via IntersectionObserver (home page only).
  useEffect(() => {
    if (!isHome) return;
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
  }, [isHome]);

  const goToSection = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
    setMobileOpen(false);
  };

  const handleLink = (link: NavLink) => {
    if (link.kind === "section") {
      goToSection(link.id);
    } else {
      navigate(link.to);
      setMobileOpen(false);
    }
  };

  const isLinkActive = (link: NavLink) => {
    if (link.kind === "route") return location.pathname.startsWith(link.to);
    return isHome && activeKey === link.key;
  };

  // Over the dark hero the navbar is transparent with light text; everywhere
  // else (scrolled, inner pages, open drawer) it sits on the page background.
  const solid = scrolled || !isHome || mobileOpen;
  const navBase = solid
    ? "bg-background/95 backdrop-blur-sm shadow-sm border-b border-border"
    : "bg-transparent";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBase}`}>
      <div className="container mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          className="flex items-center gap-2.5"
          onClick={() => (isHome ? goToSection("hero") : navigate("/"))}
          aria-label="LandDocs — go to homepage"
        >
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
            <FileText className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className={`text-lg font-bold font-serif tracking-wide transition-colors ${solid ? "text-foreground" : "text-white"}`}>
            LandDocs
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link);
            return (
              <button
                key={link.key}
                onClick={() => handleLink(link)}
                aria-current={isActive ? "page" : undefined}
                className={`
                  relative text-sm font-medium transition-colors pb-0.5
                  ${solid
                    ? isActive ? "text-primary" : "text-foreground/60 hover:text-primary"
                    : isActive ? "text-white" : "text-white/70 hover:text-white"}
                `}
              >
                {t[link.key]}
                {/* Active underline */}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${isActive ? "w-full" : "w-0"}`}
                />
              </button>
            );
          })}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle solid={solid} />
          <LanguageSelector />
          <Button
            onClick={() => navigate("/services")}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm px-5 h-9 rounded-sm ml-1"
          >
            {t.cta}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 -mr-2 transition-colors ${solid ? "text-foreground" : "text-white"}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-5 sm:px-6 py-5 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(link);
            return (
              <button
                key={link.key}
                onClick={() => handleLink(link)}
                aria-current={isActive ? "page" : undefined}
                className={`block w-full text-left text-sm font-medium py-2.5 border-b border-border/50 last:border-0 transition-colors ${
                  isActive ? "text-primary font-semibold" : "text-foreground/65 hover:text-primary"
                }`}
              >
                {t[link.key]}
              </button>
            );
          })}
          <div className="flex items-center gap-2 pt-3">
            <ThemeToggle solid />
            <LanguageSelector />
            <Button
              onClick={() => {
                navigate("/services");
                setMobileOpen(false);
              }}
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
