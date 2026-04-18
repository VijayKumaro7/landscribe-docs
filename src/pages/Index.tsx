import { useState } from "react";
import { FileText } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TemplatesSection } from "@/components/TemplatesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { SectionNav } from "@/components/SectionNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { useToast } from "@/hooks/use-toast";

const footerT = {
  en: {
    tagline: "Secure, transparent land registration documentation for every Indian property owner.",
    links: { quick: "Quick Links", services: "Services", legal: "Legal" },
    quickLinks: [
      { label: "Templates",    target: "templates" },
      { label: "How It Works", target: "how-it-works" },
      { label: "Contact Us",   target: "contact" },
      { label: "Pricing",      target: "contact" },
    ],
    serviceLinks: [
      { label: "Sale Deed",          target: "templates" },
      { label: "Gift Deed",          target: "templates" },
      { label: "Lease Deed",         target: "templates" },
      { label: "Mortgage Deed",      target: "templates" },
      { label: "Power of Attorney",  target: "templates" },
    ],
    legalLinks: ["Privacy Policy", "Terms of Service", "Disclaimer"],
    copyright: "LandDocs. All rights reserved. Made in India.",
  },
  hi: {
    tagline: "हर भारतीय संपत्ति मालिक के लिए सुरक्षित, पारदर्शी भूमि पंजीकरण दस्तावेज़ीकरण।",
    links: { quick: "त्वरित लिंक", services: "सेवाएं", legal: "कानूनी" },
    quickLinks: [
      { label: "टेम्प्लेट", target: "templates" },
      { label: "कैसे काम करता है", target: "how-it-works" },
      { label: "हमसे संपर्क करें", target: "contact" },
      { label: "मूल्य निर्धारण", target: "contact" },
    ],
    serviceLinks: [
      { label: "बिक्री विलेख", target: "templates" },
      { label: "उपहार विलेख", target: "templates" },
      { label: "पट्टा विलेख", target: "templates" },
      { label: "बंधक विलेख", target: "templates" },
      { label: "मुख्तारनामा", target: "templates" },
    ],
    legalLinks: ["गोपनीयता नीति", "सेवा की शर्तें", "अस्वीकरण"],
    copyright: "LandDocs. सभी अधिकार सुरक्षित। भारत में निर्मित।",
  },
  kn: {
    tagline: "ಪ್ರತಿ ಭಾರತೀಯ ಆಸ್ತಿ ಮಾಲೀಕರಿಗೆ ಸುರಕ್ಷಿತ, ಪಾರದರ್ಶಕ ಭೂಮಿ ನೋಂದಣಿ ದಾಖಲಾತಿ.",
    links: { quick: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು", services: "ಸೇವೆಗಳು", legal: "ಕಾನೂನು" },
    quickLinks: [
      { label: "ಟೆಂಪ್ಲೇಟ್‌ಗಳು", target: "templates" },
      { label: "ಹೇಗೆ ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತದೆ", target: "how-it-works" },
      { label: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ", target: "contact" },
      { label: "ಬೆಲೆ", target: "contact" },
    ],
    serviceLinks: [
      { label: "ಮಾರಾಟ ಪತ್ರ", target: "templates" },
      { label: "ಉಡುಗೊರೆ ಪತ್ರ", target: "templates" },
      { label: "ಬಾಡಿಗೆ ಪತ್ರ", target: "templates" },
      { label: "ಅಡಮಾನ ಪತ್ರ", target: "templates" },
      { label: "ಅಧಿಕಾರ ಪತ್ರ", target: "templates" },
    ],
    legalLinks: ["ಗೋಪ್ಯತಾ ನೀತಿ", "ಸೇವೆಯ ನಿಯಮಗಳು", "ಹಕ್ಕುತ್ಯಾಗ"],
    copyright: "LandDocs. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ಭಾರತದಲ್ಲಿ ತಯಾರಿಸಲಾಗಿದೆ.",
  },
  mr: {
    tagline: "प्रत्येक भारतीय मालमत्ता मालकासाठी सुरक्षित, पारदर्शक जमीन नोंदणी दस्तऐवजीकरण.",
    links: { quick: "त्वरित दुवे", services: "सेवा", legal: "कायदेशीर" },
    quickLinks: [
      { label: "टेम्प्लेट्स", target: "templates" },
      { label: "कसे काम करते", target: "how-it-works" },
      { label: "आमच्याशी संपर्क करा", target: "contact" },
      { label: "किंमत", target: "contact" },
    ],
    serviceLinks: [
      { label: "विक्री पत्र", target: "templates" },
      { label: "भेट पत्र", target: "templates" },
      { label: "भाडे पत्र", target: "templates" },
      { label: "गहाण पत्र", target: "templates" },
      { label: "मुख्तारनामा", target: "templates" },
    ],
    legalLinks: ["गोपनीयता धोरण", "सेवेच्या अटी", "अस्वीकरण"],
    copyright: "LandDocs. सर्व हक्क राखीव. भारतात निर्मित.",
  },
  te: {
    tagline: "ప్రతి భారతీయ ఆస్తి యజమానికి సురక్షిత, పారదర్శక భూమి నమోదు డాక్యుమెంటేషన్.",
    links: { quick: "త్వరిత లింక్‌లు", services: "సేవలు", legal: "చట్టపరమైన" },
    quickLinks: [
      { label: "టెంప్లేట్లు", target: "templates" },
      { label: "ఎలా పని చేస్తుంది", target: "how-it-works" },
      { label: "మమ్మల్ని సంప్రదించండి", target: "contact" },
      { label: "ధర", target: "contact" },
    ],
    serviceLinks: [
      { label: "అమ్మకం పత్రం", target: "templates" },
      { label: "బహుమతి పత్రం", target: "templates" },
      { label: "లీజు పత్రం", target: "templates" },
      { label: "తనఖా పత్రం", target: "templates" },
      { label: "పవర్ ఆఫ్ అటార్నీ", target: "templates" },
    ],
    legalLinks: ["గోప్యతా విధానం", "సేవా నిబంధనలు", "నిరాకరణ"],
    copyright: "LandDocs. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి. భారతదేశంలో తయారు చేయబడింది.",
  },
};

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { toast } = useToast();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleLegalLink = (label: string) => {
    toast({ title: label, description: "This page is coming soon." });
  };

  const ft = footerT[currentLanguage as keyof typeof footerT] || footerT.en;

  return (
    <div className="min-h-screen">
      {/* Global UI chrome */}
      <ScrollProgress />
      <SectionNav />

      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onGetStarted={() => scrollTo("templates")}
      />

      <HeroSection
        currentLanguage={currentLanguage}
        onGetStarted={() => scrollTo("templates")}
        onLearnMore={() => scrollTo("how-it-works")}
      />

      <FeaturesSection currentLanguage={currentLanguage} />

      <TemplatesSection currentLanguage={currentLanguage} />

      <HowItWorksSection currentLanguage={currentLanguage} />

      <TestimonialsSection currentLanguage={currentLanguage} />

      <ContactSection currentLanguage={currentLanguage} />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14 border-b border-white/10">

            {/* Brand */}
            <div className="md:col-span-1">
              <button
                onClick={() => scrollTo("hero")}
                className="flex items-center gap-2.5 mb-4 group"
              >
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                  <FileText className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-serif text-lg font-bold text-primary-foreground">LandDocs</span>
              </button>
              <p className="font-sans text-primary-foreground/55 text-sm leading-relaxed">
                {ft.tagline}
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/50 mb-5">
                {ft.links.quick}
              </h4>
              <ul className="space-y-2.5">
                {ft.quickLinks.map(({ label, target }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollTo(target)}
                      className="font-sans text-sm text-primary-foreground/65 hover:text-primary-foreground transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/50 mb-5">
                {ft.links.services}
              </h4>
              <ul className="space-y-2.5">
                {ft.serviceLinks.map(({ label, target }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollTo(target)}
                      className="font-sans text-sm text-primary-foreground/65 hover:text-primary-foreground transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/50 mb-5">
                {ft.links.legal}
              </h4>
              <ul className="space-y-2.5">
                {ft.legalLinks.map((label) => (
                  <li key={label}>
                    <button
                      onClick={() => handleLegalLink(label)}
                      className="font-sans text-sm text-primary-foreground/65 hover:text-primary-foreground transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright row */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-sans text-primary-foreground/40 text-xs">
              © {new Date().getFullYear()} {ft.copyright}
            </p>
            <p className="font-sans text-primary-foreground/30 text-xs">
              Made with care for Indian property owners 🇮🇳
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
