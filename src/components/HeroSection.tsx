import { ArrowRight, ChevronDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  currentLanguage: string;
  onGetStarted: () => void;
  onLearnMore: () => void;
}

const translations = {
  en: {
    badge: "Trusted Land Documentation Platform",
    line1: "Secure Land",
    line2: "Registration",
    accent: "Made Simple.",
    description:
      "Professional land registration templates and transparent legal services with zero intermediaries. Trusted by thousands of property owners across India.",
    cta: "Browse Templates",
    secondary: "How It Works",
    stats: [
      { value: "10K+", label: "Documents Processed" },
      { value: "5", label: "Languages" },
      { value: "100%", label: "Legal Compliance" },
      { value: "24/7", label: "Expert Support" },
    ],
  },
  hi: {
    badge: "विश्वसनीय भूमि दस्तावेज़ीकरण प्लेटफ़ॉर्म",
    line1: "सुरक्षित भूमि",
    line2: "पंजीकरण",
    accent: "सरल बनाया गया।",
    description:
      "शून्य मध्यस्थों के साथ व्यावसायिक भूमि पंजीकरण टेम्प्लेट और पारदर्शी कानूनी सेवाएं। भारत भर में हजारों लोगों द्वारा भरोसा किया गया।",
    cta: "टेम्प्लेट देखें",
    secondary: "कैसे काम करता है",
    stats: [
      { value: "10K+", label: "दस्तावेज़" },
      { value: "5", label: "भाषाएं" },
      { value: "100%", label: "कानूनी" },
      { value: "24/7", label: "सहायता" },
    ],
  },
  kn: {
    badge: "ವಿಶ್ವಾಸಾರ್ಹ ಭೂಮಿ ದಾಖಲಾತಿ ವೇದಿಕೆ",
    line1: "ಸುರಕ್ಷಿತ ಭೂಮಿ",
    line2: "ನೋಂದಣಿ",
    accent: "ಸರಳಗೊಳಿಸಲಾಗಿದೆ.",
    description:
      "ಶೂನ್ಯ ಮಧ್ಯವರ್ತಿಗಳೊಂದಿಗೆ ವೃತ್ತಿಪರ ಭೂಮಿ ನೋಂದಣಿ ಟೆಂಪ್ಲೇಟ್‌ಗಳು ಮತ್ತು ಪಾರದರ್ಶಕ ಕಾನೂನು ಸೇವೆಗಳು.",
    cta: "ಟೆಂಪ್ಲೇಟ್ ನೋಡಿ",
    secondary: "ಹೇಗೆ ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತದೆ",
    stats: [
      { value: "10K+", label: "ದಾಖಲೆಗಳು" },
      { value: "5", label: "ಭಾಷೆಗಳು" },
      { value: "100%", label: "ಕಾನೂನು" },
      { value: "24/7", label: "ಬೆಂಬಲ" },
    ],
  },
  mr: {
    badge: "विश्वासार्ह जमीन दस्तऐवजीकरण व्यासपीठ",
    line1: "सुरक्षित जमीन",
    line2: "नोंदणी",
    accent: "सोपे केले.",
    description:
      "शून्य मध्यस्थांसह व्यावसायिक जमीन नोंदणी टेम्प्लेट्स आणि पारदर्शक कायदेशीर सेवा.",
    cta: "टेम्प्लेट्स पहा",
    secondary: "कसे काम करते",
    stats: [
      { value: "10K+", label: "दस्तऐवज" },
      { value: "5", label: "भाषा" },
      { value: "100%", label: "कायदेशीर" },
      { value: "24/7", label: "मदत" },
    ],
  },
  te: {
    badge: "విశ్వసనీయ భూమి డాక్యుమెంటేషన్ వేదిక",
    line1: "సురక్షిత భూమి",
    line2: "నమోదు",
    accent: "సులభం చేయబడింది.",
    description:
      "జీరో ఇంటర్మీడియరీలతో ప్రొఫెషనల్ ల్యాండ్ రిజిస్ట్రేషన్ టెంప్లేట్స్ మరియు పారదర్శక న్యాయ సేవలు.",
    cta: "టెంప్లేట్లు చూడండి",
    secondary: "ఎలా పని చేస్తుంది",
    stats: [
      { value: "10K+", label: "పత్రాలు" },
      { value: "5", label: "భాషలు" },
      { value: "100%", label: "చట్టపరమైన" },
      { value: "24/7", label: "మద్దతు" },
    ],
  },
};

export const HeroSection = ({ currentLanguage, onGetStarted, onLearnMore }: HeroSectionProps) => {
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Land registration"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay — deep forest green tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f0c]/96 via-[#0d2410]/92 to-[#162b0e]/88" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0zm40 0h-1v40h1zM0 0v1h40V0zm0 40v-1h40v1z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-sans font-medium tracking-widest uppercase px-5 py-2.5 rounded-full">
            <Shield className="h-3.5 w-3.5 text-accent shrink-0" />
            {t.badge}
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold text-white leading-[1.08] tracking-tight mb-6 animate-fade-in-up">
          {t.line1}
          <br />
          {t.line2}
          <br />
          <em className="not-italic text-accent">{t.accent}</em>
        </h1>

        {/* Description */}
        <p className="font-sans text-white/65 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 animate-fade-in-up delay-200">
          {t.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-20 animate-fade-in-up delay-300">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-semibold px-8 h-12 text-sm tracking-wide rounded-sm"
          >
            {t.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={onLearnMore}
            size="lg"
            variant="outline"
            className="bg-transparent border-white/25 text-white hover:bg-white/10 hover:text-white hover:border-white/40 font-sans font-medium px-8 h-12 text-sm rounded-sm"
          >
            {t.secondary}
          </Button>
        </div>

        {/* Stats bar */}
        <div className="w-full max-w-2xl grid grid-cols-2 md:grid-cols-4 animate-fade-in-up delay-400">
          {t.stats.map((stat, i) => (
            <div
              key={i}
              className="px-6 py-5 text-center border-r border-b border-white/10 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-child(n+3)]:border-b-0"
            >
              <div className="font-serif text-3xl font-bold text-accent mb-1">{stat.value}</div>
              <div className="font-sans text-white/50 text-[11px] font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
};
