import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useToast } from "@/hooks/use-toast";
import { useTranslation, type Translations } from "@/i18n";

interface FooterStrings {
  tagline: string;
  links: { quick: string; services: string; legal: string };
  quickLinks: { label: string; target: string }[];
  serviceLinks: { label: string; target: string }[];
  libraryLabel: string;
  legalLinks: string[];
  comingSoon: string;
  copyright: string;
  madeWith: string;
}

const footerT: Translations<FooterStrings> = {
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
    libraryLabel: "Download Documents",
    legalLinks: ["Privacy Policy", "Terms of Service", "Disclaimer"],
    comingSoon: "This page is coming soon.",
    copyright: "LandDocs. All rights reserved. Made in India.",
    madeWith: "Made with care for Indian property owners 🇮🇳",
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
    libraryLabel: "दस्तावेज़ डाउनलोड करें",
    legalLinks: ["गोपनीयता नीति", "सेवा की शर्तें", "अस्वीकरण"],
    comingSoon: "यह पेज जल्द आ रहा है।",
    copyright: "LandDocs. सभी अधिकार सुरक्षित। भारत में निर्मित।",
    madeWith: "भारतीय संपत्ति मालिकों के लिए प्यार से बनाया गया 🇮🇳",
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
    libraryLabel: "ದಾಖಲೆಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    legalLinks: ["ಗೋಪ್ಯತಾ ನೀತಿ", "ಸೇವೆಯ ನಿಯಮಗಳು", "ಹಕ್ಕುತ್ಯಾಗ"],
    comingSoon: "ಈ ಪುಟ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ.",
    copyright: "LandDocs. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ಭಾರತದಲ್ಲಿ ತಯಾರಿಸಲಾಗಿದೆ.",
    madeWith: "ಭಾರತೀಯ ಆಸ್ತಿ ಮಾಲೀಕರಿಗಾಗಿ ಕಾಳಜಿಯಿಂದ ಮಾಡಲಾಗಿದೆ 🇮🇳",
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
    libraryLabel: "दस्तऐवज डाउनलोड करा",
    legalLinks: ["गोपनीयता धोरण", "सेवेच्या अटी", "अस्वीकरण"],
    comingSoon: "हे पान लवकरच येत आहे.",
    copyright: "LandDocs. सर्व हक्क राखीव. भारतात निर्मित.",
    madeWith: "भारतीय मालमत्ता मालकांसाठी काळजीपूर्वक बनवले 🇮🇳",
  },
  ta: {
    tagline: "ஒவ்வொரு இந்திய சொத்து உரிமையாளருக்கும் பாதுகாப்பான, வெளிப்படையான நிலப் பதிவு ஆவணமாக்கல்.",
    links: { quick: "விரைவு இணைப்புகள்", services: "சேவைகள்", legal: "சட்டப்பூர்வ" },
    quickLinks: [
      { label: "வார்ப்புருக்கள்", target: "templates" },
      { label: "எப்படி செயல்படுகிறது", target: "how-it-works" },
      { label: "தொடர்பு கொள்ளுங்கள்", target: "contact" },
      { label: "விலை", target: "contact" },
    ],
    serviceLinks: [
      { label: "விற்பனைப் பத்திரம்", target: "templates" },
      { label: "தானப் பத்திரம்", target: "templates" },
      { label: "குத்தகைப் பத்திரம்", target: "templates" },
      { label: "அடமானப் பத்திரம்", target: "templates" },
      { label: "அதிகாரப் பத்திரம்", target: "templates" },
    ],
    libraryLabel: "ஆவணங்களைப் பதிவிறக்கவும்",
    legalLinks: ["தனியுரிமைக் கொள்கை", "சேவை விதிமுறைகள்", "பொறுப்புத் துறப்பு"],
    comingSoon: "இந்தப் பக்கம் விரைவில் வருகிறது.",
    copyright: "LandDocs. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. இந்தியாவில் உருவாக்கப்பட்டது.",
    madeWith: "இந்திய சொத்து உரிமையாளர்களுக்காக அக்கறையுடன் உருவாக்கப்பட்டது 🇮🇳",
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
    libraryLabel: "పత్రాలను డౌన్లోడ్ చేయండి",
    legalLinks: ["గోప్యతా విధానం", "సేవా నిబంధనలు", "నిరాకరణ"],
    comingSoon: "ఈ పేజీ త్వరలో వస్తుంది.",
    copyright: "LandDocs. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి. భారతదేశంలో తయారు చేయబడింది.",
    madeWith: "భారతీయ ఆస్తి యజమానుల కోసం శ్రద్ధగా తయారు చేయబడింది 🇮🇳",
  },
};

export const Footer = () => {
  const t = useTranslation(footerT);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (id: string) => {
    // The templates grid moved to the dedicated downloads page.
    if (id === "templates") {
      navigate("/services");
      return;
    }
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  const handleLegalLink = (label: string) => {
    toast({ title: label, description: t.comingSoon });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-12 sm:py-14 border-b border-white/10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => goToSection("hero")}
              className="flex items-center gap-2.5 mb-4 group"
              aria-label="LandDocs — back to top"
            >
              {/* Ring separates the mark from the footer's matching green */}
              <span className="rounded-[9px] ring-1 ring-white/20 group-hover:ring-white/35 transition-shadow inline-flex">
                <Logo className="w-8 h-8 shrink-0" />
              </span>
              <span className="font-serif text-lg font-bold text-primary-foreground">LandDocs</span>
            </button>
            <p className="font-sans text-primary-foreground/55 text-sm leading-relaxed">
              {t.tagline}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label={t.links.quick}>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/50 mb-5">
              {t.links.quick}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/services"
                  className="font-sans text-sm text-primary-foreground/65 hover:text-primary-foreground transition-colors"
                >
                  {t.libraryLabel}
                </Link>
              </li>
              {t.quickLinks.map(({ label, target }) => (
                <li key={label}>
                  <button
                    onClick={() => goToSection(target)}
                    className="font-sans text-sm text-primary-foreground/65 hover:text-primary-foreground transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={t.links.services}>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/50 mb-5">
              {t.links.services}
            </h4>
            <ul className="space-y-2.5">
              {t.serviceLinks.map(({ label, target }) => (
                <li key={label}>
                  <button
                    onClick={() => goToSection(target)}
                    className="font-sans text-sm text-primary-foreground/65 hover:text-primary-foreground transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label={t.links.legal}>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/50 mb-5">
              {t.links.legal}
            </h4>
            <ul className="space-y-2.5">
              {t.legalLinks.map((label) => (
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
          </nav>
        </div>

        {/* Copyright row */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-primary-foreground/55 text-xs">
            © {new Date().getFullYear()} {t.copyright}
          </p>
          <p className="font-sans text-primary-foreground/45 text-xs">{t.madeWith}</p>
        </div>
      </div>
    </footer>
  );
};
