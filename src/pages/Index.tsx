import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { TemplatesSection } from "@/components/TemplatesSection"; 
import { ContactSection } from "@/components/ContactSection";

const footerTranslations = {
  en: {
    tagline: "Secure, Transparent, Professional Land Registration Services",
    copyright: "© 2024 LandDocs. All rights reserved. | Made in India 🇮🇳"
  },
  hi: {
    tagline: "सुरक्षित, पारदर्शी, व्यावसायिक भूमि पंजीकरण सेवाएं",
    copyright: "© 2024 LandDocs. सभी अधिकार सुरक्षित। | भारत में निर्मित 🇮🇳"
  },
  kn: {
    tagline: "ಸುರಕ್ಷಿತ, ಪಾರದರ್ಶಕ, ವೃತ್ತಿಪರ ಭೂಮಿ ನೋಂದಣಿ ಸೇವೆಗಳು",
    copyright: "© 2024 LandDocs. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ। | ಭಾರತದಲ್ಲಿ ತಯಾರಿಸಲಾಗಿದೆ 🇮🇳"
  },
  mr: {
    tagline: "सुरक्षित, पारदर्शक, व्यावसायिक जमीन नोंदणी सेवा",
    copyright: "© 2024 LandDocs. सर्व हक्क राखीव। | भारतात निर्मित 🇮🇳"
  },
  te: {
    tagline: "సురక్షిత, పారదర్శక, వృత్తిపరమైన భూమి నమోదు సేవలు",
    copyright: "© 2024 LandDocs. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి। | భారతదేశంలో తయారు చేయబడింది 🇮🇳"
  }
};

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleGetStarted = () => {
    // Scroll to templates section
    const templatesSection = document.querySelector('#templates');
    templatesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onGetStarted={handleGetStarted}
      />

      {/* Templates Section */}
      <div id="templates">
        <TemplatesSection currentLanguage={currentLanguage} />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <ContactSection currentLanguage={currentLanguage} />
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl font-bold">LandDocs</span>
          </div>
          <p className="opacity-80 mb-4">
            {footerTranslations[currentLanguage as keyof typeof footerTranslations]?.tagline || footerTranslations.en.tagline}
          </p>
          <p className="text-sm opacity-60">
            {footerTranslations[currentLanguage as keyof typeof footerTranslations]?.copyright || footerTranslations.en.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
