interface HowItWorksSectionProps {
  currentLanguage: string;
}

const translations = {
  en: {
    eyebrow: "The Process",
    title: "Three Steps to Registered",
    subtitle: "From choosing a template to walking out of the registration office — we make the journey straightforward.",
    steps: [
      {
        number: "01",
        title: "Choose Your Template",
        description:
          "Browse our library of legally-compliant templates. Pick the document type that matches your transaction — sale, lease, gift, mortgage, or more.",
      },
      {
        number: "02",
        title: "Fill in the Details",
        description:
          "Complete the template with your property details, party information, and relevant clauses. Download the finished document instantly.",
      },
      {
        number: "03",
        title: "Register with Confidence",
        description:
          "Present your completed document at the Sub-Registrar's office. Our templates meet all statutory requirements — no rejections.",
      },
    ],
  },
  hi: {
    eyebrow: "प्रक्रिया",
    title: "पंजीकरण के तीन चरण",
    subtitle: "टेम्प्लेट चुनने से लेकर पंजीकरण कार्यालय तक — हम यात्रा को सीधा बनाते हैं।",
    steps: [
      { number: "01", title: "टेम्प्लेट चुनें", description: "हमारी लाइब्रेरी से कानूनी-अनुपालन टेम्प्लेट ब्राउज़ करें।" },
      { number: "02", title: "विवरण भरें", description: "अपनी संपत्ति की जानकारी और प्रासंगिक खंडों के साथ टेम्प्लेट पूरा करें।" },
      { number: "03", title: "विश्वास के साथ पंजीकरण करें", description: "उप-रजिस्ट्रार के कार्यालय में अपना पूरा दस्तावेज़ प्रस्तुत करें।" },
    ],
  },
  kn: {
    eyebrow: "ಪ್ರಕ್ರಿಯೆ",
    title: "ನೋಂದಣಿಗೆ ಮೂರು ಹಂತಗಳು",
    subtitle: "ಟೆಂಪ್ಲೇಟ್ ಆಯ್ಕೆಯಿಂದ ನೋಂದಣಿ ಕಚೇರಿ ತನಕ — ನಾವು ಪ್ರಯಾಣವನ್ನು ಸರಳಗೊಳಿಸುತ್ತೇವೆ.",
    steps: [
      { number: "01", title: "ಟೆಂಪ್ಲೇಟ್ ಆಯ್ಕೆ ಮಾಡಿ", description: "ಕಾನೂನು-ಅನುಪಾಲನೆ ಟೆಂಪ್ಲೇಟ್‌ಗಳ ಗ್ರಂಥಾಲಯ ಬ್ರೌಸ್ ಮಾಡಿ." },
      { number: "02", title: "ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ", description: "ನಿಮ್ಮ ಆಸ್ತಿ ವಿವರಗಳೊಂದಿಗೆ ಟೆಂಪ್ಲೇಟ್ ಪೂರ್ಣಗೊಳಿಸಿ." },
      { number: "03", title: "ವಿಶ್ವಾಸದಿಂದ ನೋಂದಣಿ ಮಾಡಿ", description: "ಉಪ-ನೋಂದಾವಣೆ ಕಚೇರಿಯಲ್ಲಿ ನಿಮ್ಮ ದಾಖಲೆ ಸಲ್ಲಿಸಿ." },
    ],
  },
  mr: {
    eyebrow: "प्रक्रिया",
    title: "नोंदणीसाठी तीन टप्पे",
    subtitle: "टेम्प्लेट निवडण्यापासून नोंदणी कार्यालयापर्यंत — आम्ही प्रवास सोपा करतो.",
    steps: [
      { number: "01", title: "टेम्प्लेट निवडा", description: "कायदेशीर-अनुपालन टेम्प्लेट्सचे आमचे लायब्ररी ब्राउझ करा." },
      { number: "02", title: "तपशील भरा", description: "तुमच्या मालमत्तेच्या तपशीलांसह टेम्प्लेट पूर्ण करा." },
      { number: "03", title: "विश्वासाने नोंदणी करा", description: "उप-निबंधकाच्या कार्यालयात तुमचे पूर्ण केलेले दस्तऐवज सादर करा." },
    ],
  },
  te: {
    eyebrow: "ప్రక్రియ",
    title: "నమోదుకు మూడు దశలు",
    subtitle: "టెంప్లేట్ ఎంపిక నుండి నమోదు కార్యాలయం వరకు — మేము ప్రయాణాన్ని సులభతరం చేస్తాం.",
    steps: [
      { number: "01", title: "మీ టెంప్లేట్ ఎంచుకోండి", description: "చట్టపరమైన-అనుపాలన టెంప్లేట్ల లైబ్రరీని బ్రౌజ్ చేయండి." },
      { number: "02", title: "వివరాలు పూరించండి", description: "మీ ఆస్తి వివరాలతో టెంప్లేట్‌ను పూర్తి చేయండి." },
      { number: "03", title: "నమ్మకంగా నమోదు చేయండి", description: "సబ్-రిజిస్ట్రార్ కార్యాలయంలో మీ పత్రాన్ని సమర్పించండి." },
    ],
  },
};

export const HowItWorksSection = ({ currentLanguage }: HowItWorksSectionProps) => {
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <section id="how-it-works" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-sans text-accent font-semibold text-xs uppercase tracking-widest mb-4">
            {t.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-5">
            {t.title}
          </h2>
          <p className="font-sans text-primary-foreground/65 text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {/* Connector lines (desktop) */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-white/15 pointer-events-none" />

          {t.steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center px-8 py-10 md:py-0">
              {/* Number circle */}
              <div className="relative mb-8">
                <div className="w-16 h-16 border border-white/20 bg-white/5 flex items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-accent">{step.number}</span>
                </div>
                {/* Connector line (mobile, vertical) */}
                {i < t.steps.length - 1 && (
                  <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-px h-10 bg-white/15 mt-2" />
                )}
              </div>

              <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-4">
                {step.title}
              </h3>
              <p className="font-sans text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
