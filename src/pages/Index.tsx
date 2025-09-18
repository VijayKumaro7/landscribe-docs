import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { TemplatesSection } from "@/components/TemplatesSection"; 
import { ContactSection } from "@/components/ContactSection";

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
            Secure, Transparent, Professional Land Registration Services
          </p>
          <p className="text-sm opacity-60">
            © 2024 LandDocs. All rights reserved. | Made in India 🇮🇳
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
