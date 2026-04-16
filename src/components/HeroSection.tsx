import { ArrowRight, Shield, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onGetStarted: () => void;
  onLearnMore: () => void;
}

const translations = {
  en: {
    title: "Secure Land Registration",
    subtitle: "Documentation Made Simple",
    description: "Get professional land registration templates and transparent legal services with zero intermediaries. Trusted by thousands across India.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    trustBadge: "Trusted by 10,000+ Property Owners",
    features: {
      secure: "100% Secure & Legal",
      transparent: "Transparent Pricing",
      support: "Expert Support"
    }
  },
  hi: {
    title: "सुरक्षित भूमि पंजीकरण",
    subtitle: "दस्तावेज़ीकरण सरल बनाया गया",
    description: "शून्य मध्यस्थों के साथ व्यावसायिक भूमि पंजीकरण टेम्प्लेट और पारदर्शी कानूनी सेवाएं प्राप्त करें। भारत भर में हजारों लोगों द्वारा भरोसा किया गया।",
    getStarted: "शुरू करें",
    learnMore: "और जानें",
    trustBadge: "10,000+ संपत्ति मालिकों द्वारा भरोसा",
    features: {
      secure: "100% सुरक्षित और कानूनी",
      transparent: "पारदर्शी मूल्य निर्धारण",
      support: "विशेषज्ञ सहायता"
    }
  },
  kn: {
    title: "ಸುರಕ್ಷಿತ ಭೂಮಿ ನೋಂದಣಿ",
    subtitle: "ದಾಖಲಾತು ಸರಳೀಕೃತ",
    description: "ಶೂನ್ಯ ಮಧ್ಯವರ್ತಿಗಳೊಂದಿಗೆ ವೃತ್ತಿಪರ ಭೂಮಿ ನೋಂದಣಿ ಟೆಂಪ್ಲೇಟ್‌ಗಳು ಮತ್ತು ಪಾರದರ್ಶಕ ಕಾನೂನು ಸೇವೆಗಳನ್ನು ಪಡೆಯಿರಿ। ಭಾರತದಾದ್ಯಂತ ಸಾವಿರಾರು ಜನರಿಂದ ವಿಶ್ವಸನೀಯ।",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    trustBadge: "10,000+ ಆಸ್ತಿ ಮಾಲೀಕರು ವಿಶ್ವಾಸ",
    features: {
      secure: "100% ಸುರಕ್ಷಿತ ಮತ್ತು ಕಾನೂನುಬದ್ಧ",
      transparent: "ಪಾರದರ್ಶಕ ಬೆಲೆ",
      support: "ವಿಶೇಷಜ್ಞ ಬೆಂಬಲ"
    }
  },
  mr: {
    title: "सुरक्षित जमीन नोंदणी",
    subtitle: "कागदपत्रे सोपी केली",
    description: "शून्य मध्यस्थांसह व्यावसायिक जमीन नोंदणी टेम्प्लेट्स आणि पारदर्शक कायदेशीर सेवा मिळवा। संपूर्ण भारतातील हजारो लोकांचा विश्वास।",
    getStarted: "सुरुवात करा",
    learnMore: "अधिक जाणा",
    trustBadge: "10,000+ मालमत्ता मालकांचा विश्वास",
    features: {
      secure: "100% सुरक्षित आणि कायदेशीर",
      transparent: "पारदर्शक किंमत",
      support: "तज्ञ सहाय्य"
    }
  },
  te: {
    title: "సురక్షిత భూమి నమోదు",
    subtitle: "డాక్యుమెంటేషన్ సులభం చేయబడింది",
    description: "జీరో ఇంటర్మీడియరీలతో ప్రొఫెషనల్ ల్యాండ్ రిజిస్ట్రేషన్ టెంప్లేట్స్ మరియు పారదర్శక న్యాయ సేవలను పొందండి. భారతదేశం అంతటా వేలాది మంది విశ్వసించారు.",
    getStarted: "మొదలుపెట్టండి",
    learnMore: "మరింత తెలుసుకోండి",
    trustBadge: "10,000+ ఆస్తి యజమానుల నమ్మకం",
    features: {
      secure: "100% సురక్షితం మరియు చట్టపరమైనది",
      transparent: "పారదర్శక ధర",
      support: "నిపుణుల మద్దతు"
    }
  }
};

export const HeroSection = ({ currentLanguage, onLanguageChange, onGetStarted, onLearnMore }: HeroSectionProps) => {
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <div className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-secondary/30 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
        {/* Header with Language Selector */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-primary-foreground">LandDocs</span>
          </div>
          <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            {t.title}
            <br />
            <span className="text-accent">{t.subtitle}</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold hover-lift hover-glow"
            >
              {t.getStarted} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="hero"
              size="lg"
              className="px-8 py-4 text-lg hover-lift"
              onClick={onLearnMore}
            >
              {t.learnMore}
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="text-center mb-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <p className="text-primary-foreground/80 mb-4">{t.trustBadge}</p>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm">{t.features.secure}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                <span className="text-sm">{t.features.transparent}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                <span className="text-sm">{t.features.support}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};