import { Link } from "react-router-dom";
import { Download, ShieldCheck, FileText, Zap, Globe, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { useTranslation, type Translations } from "@/i18n";

const FEATURE_ICONS: LucideIcon[] = [ShieldCheck, FileText, Zap, Globe];

interface FeaturesStrings {
  eyebrow: string;
  title: string;
  subtitle: string;
  features: { title: string; description: string }[];
  downloadCta: string;
}

const translations: Translations<FeaturesStrings> = {
  en: {
    eyebrow: "Why LandDocs",
    title: "Built for Trust, Speed & Transparency",
    subtitle:
      "Everything you need to handle land registration documentation without complexity or hidden costs.",
    features: [
      {
        title: "100% Legal Compliance",
        description:
          "Every template is drafted by legal experts and kept up-to-date with current state registration laws across India.",
      },
      {
        title: "Ready-to-Use Templates",
        description:
          "Download professionally formatted sale deeds, gift deeds, lease deeds and more — ready to fill and submit.",
      },
      {
        title: "Instant Access",
        description:
          "No waiting, no appointments. Access your templates immediately and complete your documentation at your own pace.",
      },
      {
        title: "6 Regional Languages",
        description:
          "Documents and guidance available in English, Hindi, Kannada, Marathi, Tamil, and Telugu to serve every Indian property owner.",
      },
    ],
    downloadCta: "Download Documents",
  },
  hi: {
    eyebrow: "LandDocs क्यों",
    title: "विश्वास, गति और पारदर्शिता के लिए निर्मित",
    subtitle: "जटिलता या छुपी फीस के बिना भूमि पंजीकरण दस्तावेज़ीकरण के लिए सब कुछ।",
    features: [
      { title: "100% कानूनी अनुपालन", description: "हर टेम्प्लेट कानूनी विशेषज्ञों द्वारा तैयार किया गया है।" },
      { title: "उपयोग के लिए तैयार टेम्प्लेट", description: "पेशेवर रूप से फॉर्मेट किए गए विलेख डाउनलोड करें।" },
      { title: "तत्काल पहुंच", description: "कोई प्रतीक्षा नहीं, कोई अपॉइंटमेंट नहीं।" },
      { title: "6 क्षेत्रीय भाषाएं", description: "हिंदी, कन्नड़, मराठी, तमिल और तेलुगु में उपलब्ध।" },
    ],
    downloadCta: "दस्तावेज़ डाउनलोड करें",
  },
  kn: {
    eyebrow: "LandDocs ಏಕೆ",
    title: "ವಿಶ್ವಾಸ, ವೇಗ ಮತ್ತು ಪಾರದರ್ಶಕತೆಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ",
    subtitle: "ಸಂಕೀರ್ಣತೆ ಅಥವಾ ಗುಪ್ತ ಶುಲ್ಕಗಳಿಲ್ಲದೆ ಭೂಮಿ ನೋಂದಣಿ ದಾಖಲಾತಿಗೆ ಎಲ್ಲವೂ.",
    features: [
      { title: "100% ಕಾನೂನು ಅನುಪಾಲನೆ", description: "ಕಾನೂನು ತಜ್ಞರಿಂದ ರೂಪಿಸಲಾದ ಟೆಂಪ್ಲೇಟ್‌ಗಳು." },
      { title: "ಬಳಸಲು ಸಿದ್ಧ ಟೆಂಪ್ಲೇಟ್‌ಗಳು", description: "ವೃತ್ತಿಪರ ಸ್ವರೂಪದ ದಾಖಲೆಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ." },
      { title: "ತಕ್ಷಣ ಪ್ರವೇಶ", description: "ನಿರೀಕ್ಷೆ ಇಲ್ಲ, ನೇಮಕ ಇಲ್ಲ." },
      { title: "6 ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳು", description: "ಕನ್ನಡ, ಹಿಂದಿ, ಮರಾಠಿ, ತಮಿಳು ಮತ್ತು ತೆಲುಗಿನಲ್ಲಿ ಲಭ್ಯ." },
    ],
    downloadCta: "ದಾಖಲೆಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
  },
  mr: {
    eyebrow: "LandDocs का",
    title: "विश्वास, वेग आणि पारदर्शकतेसाठी बनवलेले",
    subtitle: "जटिलता किंवा छुपे शुल्क नसताना जमीन नोंदणी दस्तऐवजीकरणासाठी सर्व काही.",
    features: [
      { title: "100% कायदेशीर अनुपालन", description: "कायदेशीर तज्ञांनी तयार केलेले टेम्प्लेट्स." },
      { title: "वापरण्यास तयार टेम्प्लेट्स", description: "व्यावसायिकपणे स्वरूपित दस्तऐवज डाउनलोड करा." },
      { title: "त्वरित प्रवेश", description: "प्रतीक्षा नाही, भेट नाही." },
      { title: "6 प्रादेशिक भाषा", description: "मराठी, हिंदी, कन्नड, तमिळ आणि तेलुगुमध्ये उपलब्ध." },
    ],
    downloadCta: "दस्तऐवज डाउनलोड करा",
  },
  ta: {
    eyebrow: "ஏன் LandDocs",
    title: "நம்பிக்கை, வேகம் மற்றும் வெளிப்படைத்தன்மைக்காக உருவாக்கப்பட்டது",
    subtitle: "சிக்கல் அல்லது மறைமுகக் கட்டணங்கள் இல்லாமல் நிலப் பதிவு ஆவணமாக்கலுக்குத் தேவையான அனைத்தும்.",
    features: [
      { title: "100% சட்ட இணக்கம்", description: "சட்ட நிபுணர்களால் தயாரிக்கப்பட்ட வார்ப்புருக்கள்." },
      { title: "பயன்படுத்தத் தயார் வார்ப்புருக்கள்", description: "தொழில்முறை வடிவமைப்பிலான ஆவணங்களைப் பதிவிறக்கவும்." },
      { title: "உடனடி அணுகல்", description: "காத்திருப்பு இல்லை, முன்பதிவு இல்லை." },
      { title: "6 பிராந்திய மொழிகள்", description: "தமிழ், இந்தி, கன்னடம், மராத்தி மற்றும் தெலுங்கில் கிடைக்கிறது." },
    ],
    downloadCta: "ஆவணங்களைப் பதிவிறக்கவும்",
  },
  te: {
    eyebrow: "LandDocs ఎందుకు",
    title: "నమ్మకం, వేగం మరియు పారదర్శకత కోసం నిర్మించబడింది",
    subtitle: "సంక్లిష్టత లేదా దాచిన ఛార్జీలు లేకుండా భూమి నమోదు డాక్యుమెంటేషన్ కోసం అన్నీ.",
    features: [
      { title: "100% చట్టపరమైన అనుపాలన", description: "చట్ట నిపుణులచే రూపొందించబడిన టెంప్లేట్లు." },
      { title: "వెంటనే వాడటానికి సిద్ధంగా", description: "వృత్తిపరంగా ఫార్మాట్ చేసిన పత్రాలు డౌన్లోడ్ చేయండి." },
      { title: "తక్షణ యాక్సెస్", description: "వేచి ఉండటం లేదు, అపాయింట్‌మెంట్ లేదు." },
      { title: "6 ప్రాంతీయ భాషలు", description: "తెలుగు, హిందీ, కన్నడ, మరాఠీ మరియు తమిళంలో అందుబాటులో." },
    ],
    downloadCta: "పత్రాలను డౌన్లోడ్ చేయండి",
  },
};

export const FeaturesSection = () => {
  const t = useTranslation(translations);

  return (
    <section id="features" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="font-sans text-accent font-semibold text-xs uppercase tracking-widest mb-4">
            {t.eyebrow}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-5">
            {t.title}
          </h2>
          <p className="font-sans text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </Reveal>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {t.features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i] ?? FileText;
            return (
              <Reveal key={i} delay={i * 100}>
                <div className="group bg-card border border-border p-7 h-full hover-lift hover:border-primary/30">
                  <div className="w-11 h-11 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/[0.14] transition-colors">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Prominent link to the document downloads page */}
        <Reveal className="text-center mt-10 md:mt-12">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold h-12 px-8 rounded-sm text-sm tracking-wide"
          >
            <Link to="/services">
              <Download className="h-4 w-4 mr-2" aria-hidden="true" />
              {t.downloadCta}
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
};
