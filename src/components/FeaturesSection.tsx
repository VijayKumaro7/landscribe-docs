import { ShieldCheck, FileText, Zap, Globe } from "lucide-react";

interface FeaturesSectionProps {
  currentLanguage: string;
}

const translations = {
  en: {
    eyebrow: "Why LandDocs",
    title: "Built for Trust, Speed & Transparency",
    subtitle:
      "Everything you need to handle land registration documentation without complexity or hidden costs.",
    features: [
      {
        icon: ShieldCheck,
        title: "100% Legal Compliance",
        description:
          "Every template is drafted by legal experts and kept up-to-date with current state registration laws across India.",
      },
      {
        icon: FileText,
        title: "Ready-to-Use Templates",
        description:
          "Download professionally formatted sale deeds, gift deeds, lease deeds and more — ready to fill and submit.",
      },
      {
        icon: Zap,
        title: "Instant Access",
        description:
          "No waiting, no appointments. Access your templates immediately and complete your documentation at your own pace.",
      },
      {
        icon: Globe,
        title: "5 Regional Languages",
        description:
          "Documents and guidance available in English, Hindi, Kannada, Marathi, and Telugu to serve every Indian property owner.",
      },
    ],
  },
  hi: {
    eyebrow: "LandDocs क्यों",
    title: "विश्वास, गति और पारदर्शिता के लिए निर्मित",
    subtitle: "जटिलता या छुपी फीस के बिना भूमि पंजीकरण दस्तावेज़ीकरण के लिए सब कुछ।",
    features: [
      {
        icon: ShieldCheck,
        title: "100% कानूनी अनुपालन",
        description: "हर टेम्प्लेट कानूनी विशेषज्ञों द्वारा तैयार किया गया है।",
      },
      {
        icon: FileText,
        title: "उपयोग के लिए तैयार टेम्प्लेट",
        description: "पेशेवर रूप से फॉर्मेट किए गए विलेख डाउनलोड करें।",
      },
      {
        icon: Zap,
        title: "तत्काल पहुंच",
        description: "कोई प्रतीक्षा नहीं, कोई अपॉइंटमेंट नहीं।",
      },
      {
        icon: Globe,
        title: "5 क्षेत्रीय भाषाएं",
        description: "हिंदी, कन्नड़, मराठी और तेलुगु में उपलब्ध।",
      },
    ],
  },
  kn: {
    eyebrow: "LandDocs ಏಕೆ",
    title: "ವಿಶ್ವಾಸ, ವೇಗ ಮತ್ತು ಪಾರದರ್ಶಕತೆಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ",
    subtitle: "ಸಂಕೀರ್ಣತೆ ಅಥವಾ ಗುಪ್ತ ಶುಲ್ಕಗಳಿಲ್ಲದೆ ಭೂಮಿ ನೋಂದಣಿ ದಾಖಲಾತಿಗೆ ಎಲ್ಲವೂ.",
    features: [
      { icon: ShieldCheck, title: "100% ಕಾನೂನು ಅನುಪಾಲನೆ", description: "ಕಾನೂನು ತಜ್ಞರಿಂದ ರೂಪಿಸಲಾದ ಟೆಂಪ್ಲೇಟ್‌ಗಳು." },
      { icon: FileText, title: "ಬಳಸಲು ಸಿದ್ಧ ಟೆಂಪ್ಲೇಟ್‌ಗಳು", description: "ವೃತ್ತಿಪರ ಸ್ವರೂಪದ ದಾಖಲೆಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ." },
      { icon: Zap, title: "ತಕ್ಷಣ ಪ್ರವೇಶ", description: "ನಿರೀಕ್ಷೆ ಇಲ್ಲ, ನೇಮಕ ಇಲ್ಲ." },
      { icon: Globe, title: "5 ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳು", description: "ಕನ್ನಡ, ಹಿಂದಿ, ಮರಾಠಿ ಮತ್ತು ತೆಲುಗಿನಲ್ಲಿ ಲಭ್ಯ." },
    ],
  },
  mr: {
    eyebrow: "LandDocs का",
    title: "विश्वास, वेग आणि पारदर्शकतेसाठी बनवलेले",
    subtitle: "जटिलता किंवा छुपे शुल्क नसताना जमीन नोंदणी दस्तऐवजीकरणासाठी सर्व काही.",
    features: [
      { icon: ShieldCheck, title: "100% कायदेशीर अनुपालन", description: "कायदेशीर तज्ञांनी तयार केलेले टेम्प्लेट्स." },
      { icon: FileText, title: "वापरण्यास तयार टेम्प्लेट्स", description: "व्यावसायिकपणे स्वरूपित दस्तऐवज डाउनलोड करा." },
      { icon: Zap, title: "त्वरित प्रवेश", description: "प्रतीक्षा नाही, भेट नाही." },
      { icon: Globe, title: "5 प्रादेशिक भाषा", description: "मराठी, हिंदी, कन्नड आणि तेलुगुमध्ये उपलब्ध." },
    ],
  },
  te: {
    eyebrow: "LandDocs ఎందుకు",
    title: "నమ్మకం, వేగం మరియు పారదర్శకత కోసం నిర్మించబడింది",
    subtitle: "సంక్లిష్టత లేదా దాచిన ఛార్జీలు లేకుండా భూమి నమోదు డాక్యుమెంటేషన్ కోసం అన్నీ.",
    features: [
      { icon: ShieldCheck, title: "100% చట్టపరమైన అనుపాలన", description: "చట్ట నిపుణులచే రూపొందించబడిన టెంప్లేట్లు." },
      { icon: FileText, title: "వెంటనే వాడటానికి సిద్ధంగా", description: "వృత్తిపరంగా ఫార్మాట్ చేసిన పత్రాలు డౌన్లోడ్ చేయండి." },
      { icon: Zap, title: "తక్షణ యాక్సెస్", description: "వేచి ఉండటం లేదు, అపాయింట్‌మెంట్ లేదు." },
      { icon: Globe, title: "5 ప్రాంతీయ భాషలు", description: "తెలుగు, హిందీ, కన్నడ మరియు మరాఠీలో అందుబాటులో." },
    ],
  },
};

export const FeaturesSection = ({ currentLanguage }: FeaturesSectionProps) => {
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-sans text-accent font-semibold text-xs uppercase tracking-widest mb-4">
            {t.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-5">
            {t.title}
          </h2>
          <p className="font-sans text-muted-foreground text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group bg-card border border-border p-7 hover-lift hover:border-primary/30 transition-colors"
              >
                <div className="w-11 h-11 bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
