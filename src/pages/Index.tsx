import { useState } from "react";
import { FileText } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TemplatesSection } from "@/components/TemplatesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";

const footerT = {
  en: {
    tagline: "Secure, transparent land registration documentation for every Indian property owner.",
    links: { quick: "Quick Links", services: "Services", legal: "Legal" },
    quickLinks: ["Templates", "How It Works", "Contact Us", "Pricing"],
    serviceLinks: ["Sale Deed", "Gift Deed", "Lease Deed", "Mortgage Deed", "Power of Attorney"],
    legalLinks: ["Privacy Policy", "Terms of Service", "Disclaimer"],
    copyright: "LandDocs. All rights reserved. Made in India.",
  },
  hi: {
    tagline: "हर भारतीय संपत्ति मालिक के लिए सुरक्षित, पारदर्शी भूमि पंजीकरण दस्तावेज़ीकरण।",
    links: { quick: "त्वरित लिंक", services: "सेवाएं", legal: "कानूनी" },
    quickLinks: ["टेम्प्लेट", "कैसे काम करता है", "हमसे संपर्क करें", "मूल्य निर्धारण"],
    serviceLinks: ["बिक्री विलेख", "उपहार विलेख", "पट्टा विलेख", "बंधक विलेख", "मुख्तारनामा"],
    legalLinks: ["गोपनीयता नीति", "सेवा की शर्तें", "अस्वीकरण"],
    copyright: "LandDocs. सभी अधिकार सुरक्षित। भारत में निर्मित।",
  },
  kn: {
    tagline: "ಪ್ರತಿ ಭಾರತೀಯ ಆಸ್ತಿ ಮಾಲೀಕರಿಗೆ ಸುರಕ್ಷಿತ, ಪಾರದರ್ಶಕ ಭೂಮಿ ನೋಂದಣಿ ದಾಖಲಾತಿ.",
    links: { quick: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು", services: "ಸೇವೆಗಳು", legal: "ಕಾನೂನು" },
    quickLinks: ["ಟೆಂಪ್ಲೇಟ್‌ಗಳು", "ಹೇಗೆ ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತದೆ", "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ", "ಬೆಲೆ"],
    serviceLinks: ["ಮಾರಾಟ ಪತ್ರ", "ಉಡುಗೊರೆ ಪತ್ರ", "ಬಾಡಿಗೆ ಪತ್ರ", "ಅಡಮಾನ ಪತ್ರ", "ಅಧಿಕಾರ ಪತ್ರ"],
    legalLinks: ["ಗೋಪ್ಯತಾ ನೀತಿ", "ಸೇವೆಯ ನಿಯಮಗಳು", "ಹಕ್ಕುತ್ಯಾಗ"],
    copyright: "LandDocs. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ಭಾರತದಲ್ಲಿ ತಯಾರಿಸಲಾಗಿದೆ.",
  },
  mr: {
    tagline: "प्रत्येक भारतीय मालमत्ता मालकासाठी सुरक्षित, पारदर्शक जमीन नोंदणी दस्तऐवजीकरण.",
    links: { quick: "त्वरित दुवे", services: "सेवा", legal: "कायदेशीर" },
    quickLinks: ["टेम्प्लेट्स", "कसे काम करते", "आमच्याशी संपर्क करा", "किंमत"],
    serviceLinks: ["विक्री पत्र", "भेट पत्र", "भाडे पत्र", "गहाण पत्र", "मुख्तारनामा"],
    legalLinks: ["गोपनीयता धोरण", "सेवेच्या अटी", "अस्वीकरण"],
    copyright: "LandDocs. सर्व हक्क राखीव. भारतात निर्मित.",
  },
  te: {
    tagline: "ప్రతి భారతీయ ఆస్తి యజమానికి సురక్షిత, పారదర్శక భూమి నమోదు డాక్యుమెంటేషన్.",
    links: { quick: "త్వరిత లింక్‌లు", services: "సేవలు", legal: "చట్టపరమైన" },
    quickLinks: ["టెంప్లేట్లు", "ఎలా పని చేస్తుంది", "మమ్మల్ని సంప్రదించండి", "ధర"],
    serviceLinks: ["అమ్మకం పత్రం", "బహుమతి పత్రం", "లీజు పత్రం", "తనఖా పత్రం", "పవర్ ఆఫ్ అటార్నీ"],
    legalLinks: ["గోప్యతా విధానం", "సేవా నిబంధనలు", "నిరాకరణ"],
    copyright: "LandDocs. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి. భారతదేశంలో తయారు చేయబడింది.",
  },
};

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const ft = footerT[currentLanguage as keyof typeof footerT] || footerT.en;

  return (
    <div className="min-h-screen">
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onGetStarted={() => scrollTo("#templates")}
      />

      <HeroSection
        currentLanguage={currentLanguage}
        onGetStarted={() => scrollTo("#templates")}
        onLearnMore={() => scrollTo("#how-it-works")}
      />

      <FeaturesSection currentLanguage={currentLanguage} />

      <TemplatesSection currentLanguage={currentLanguage} />

      <HowItWorksSection currentLanguage={currentLanguage} />

      <TestimonialsSection currentLanguage={currentLanguage} />

      <ContactSection currentLanguage={currentLanguage} />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          {/* Main footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14 border-b border-white/10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-serif text-lg font-bold text-primary-foreground">LandDocs</span>
              </div>
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
                {ft.quickLinks.map((link) => (
                  <li key={link}>
                    <span className="font-sans text-sm text-primary-foreground/65 hover:text-primary-foreground cursor-pointer transition-colors">
                      {link}
                    </span>
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
                {ft.serviceLinks.map((link) => (
                  <li key={link}>
                    <span className="font-sans text-sm text-primary-foreground/65 hover:text-primary-foreground cursor-pointer transition-colors">
                      {link}
                    </span>
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
                {ft.legalLinks.map((link) => (
                  <li key={link}>
                    <span className="font-sans text-sm text-primary-foreground/65 hover:text-primary-foreground cursor-pointer transition-colors">
                      {link}
                    </span>
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
