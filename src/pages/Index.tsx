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

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
