import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { SectionNav } from "@/components/SectionNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Footer } from "@/components/Footer";
import { usePageMetadata } from "@/hooks/use-page-metadata";
import { useTranslation, type Translations } from "@/i18n";

interface IndexMeta {
  title: string;
  description: string;
}

const indexMeta: Translations<IndexMeta> = {
  en: {
    title: "Land Registration Made Simple",
    description:
      "Professional land registration templates in six languages. Secure, transparent legal documentation with no intermediaries.",
  },
  hi: {
    title: "भूमि पंजीकरण, अब आसान",
    description:
      "छह भाषाओं में पेशेवर भूमि पंजीकरण टेम्प्लेट। सुरक्षित, पारदर्शी कानूनी दस्तावेज़ीकरण, बिना किसी बिचौलिए के।",
  },
  kn: {
    title: "ಭೂ ನೋಂದಣಿ ಈಗ ಸರಳ",
    description:
      "ಆರು ಭಾಷೆಗಳಲ್ಲಿ ವೃತ್ತಿಪರ ಭೂ ನೋಂದಣಿ ಟೆಂಪ್ಲೇಟ್‌ಗಳು. ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದ ಸುರಕ್ಷಿತ, ಪಾರದರ್ಶಕ ಕಾನೂನು ದಾಖಲಾತಿ.",
  },
  mr: {
    title: "जमीन नोंदणी आता सोपी",
    description:
      "सहा भाषांमध्ये व्यावसायिक जमीन नोंदणी टेम्प्लेट्स. मध्यस्थांशिवाय सुरक्षित, पारदर्शक कायदेशीर दस्तऐवजीकरण.",
  },
  ta: {
    title: "நில பதிவு இனி எளிது",
    description:
      "ஆறு மொழிகளில் தொழில்முறை நில பதிவு படிவங்கள். இடைத்தரகர்கள் இல்லாத, பாதுகாப்பான, வெளிப்படையான சட்ட ஆவணங்கள்.",
  },
  te: {
    title: "భూమి నమోదు ఇప్పుడు సులభం",
    description:
      "ఆరు భాషల్లో వృత్తిపరమైన భూమి నమోదు టెంప్లేట్లు. మధ్యవర్తులు లేని సురక్షితమైన, పారదర్శక చట్టపరమైన పత్రాలు.",
  },
};

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const meta = useTranslation(indexMeta);

  usePageMetadata({ title: meta.title, description: meta.description, path: "/" });

  // Support deep links like /#templates (used by the navbar on inner pages).
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    // Wait a frame so the sections have rendered before scrolling.
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* Global UI chrome */}
      <ScrollProgress />
      <SectionNav />

      <Navbar />

      <main id="main-content">
        <HeroSection
          onGetStarted={() => navigate("/services")}
          onLearnMore={() => scrollTo("how-it-works")}
        />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
