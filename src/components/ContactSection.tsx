import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ContactSectionProps {
  currentLanguage: string;
}

const translations = {
  en: {
    title: "Need Professional Help?",
    subtitle: "Get expert assistance for your land registration needs. No hidden fees, transparent pricing.",
    form: {
      name: "Full Name",
      email: "Email Address", 
      phone: "Phone Number",
      service: "Service Type",
      message: "Describe your requirements",
      submit: "Send Request",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "your.email@example.com",
      phonePlaceholder: "+91 XXXXX XXXXX", 
      messagePlaceholder: "Tell us about your land registration needs..."
    },
    services: [
      "Document Verification",
      "Legal Consultation", 
      "Registration Process",
      "Title Search",
      "Custom Templates"
    ],
    contact: {
      email: "support@landdocs.com",
      phone: "+91 80 1234 5678",
      address: "Bangalore, Karnataka, India"
    },
    success: "Request sent successfully! We'll contact you within 24 hours.",
    contactForm: "Send us a message",
    whyChoose: "Why Choose Us?"
  },
  hi: {
    title: "व्यावसायिक सहायता चाहिए?",
    subtitle: "अपनी भूमि पंजीकरण आवश्यकताओं के लिए विशेषज्ञ सहायता प्राप्त करें। कोई छुपी फीस नहीं, पारदर्शी मूल्य निर्धारण।",
    form: {
      name: "पूरा नाम",
      email: "ईमेल पता",
      phone: "फोन नंबर", 
      service: "सेवा का प्रकार",
      message: "अपनी आवश्यकताओं का वर्णन करें",
      submit: "अनुरोध भेजें",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      emailPlaceholder: "आपका.ईमेल@उदाहरण.com",
      phonePlaceholder: "+91 XXXXX XXXXX",
      messagePlaceholder: "हमें अपनी भूमि पंजीकरण आवश्यकताओं के बारे में बताएं..."
    },
    services: [
      "दस्तावेज़ सत्यापन",
      "कानूनी परामर्श",
      "पंजीकरण प्रक्रिया", 
      "शीर्षक खोज",
      "कस्टम टेम्प्लेट"
    ],
    contact: {
      email: "support@landdocs.com", 
      phone: "+91 80 1234 5678",
      address: "बेंगलुरु, कर्नाटक, भारत"
    },
    success: "अनुरोध सफलतापूर्वक भेजा गया! हम 24 घंटे के भीतर आपसे संपर्क करेंगे।",
    contactForm: "हमें संदेश भेजें",
    whyChoose: "हमें क्यों चुनें?"
  },
  kn: {
    title: "ವೃತ್ತಿಪರ ಸಹಾಯ ಬೇಕೇ?",
    subtitle: "ನಿಮ್ಮ ಭೂಮಿ ನೋಂದಣಿ ಅಗತ್ಯಗಳಿಗಾಗಿ ತಜ್ಞರ ಸಹಾಯವನ್ನು ಪಡೆಯಿರಿ. ಯಾವುದೇ ಗುಪ್ತ ಶುಲ್ಕಗಳಿಲ್ಲ, ಪಾರದರ್ಶಕ ಬೆಲೆ.",
    form: {
      name: "ಪೂರ್ಣ ಹೆಸರು",
      email: "ಇಮೇಲ್ ವಿಳಾಸ",
      phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
      service: "ಸೇವೆಯ ಪ್ರಕಾರ",
      message: "ನಿಮ್ಮ ಅವಶ್ಯಕತೆಗಳನ್ನು ವಿವರಿಸಿ",
      submit: "ವಿನಂತಿ ಕಳುಹಿಸಿ",
      namePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
      emailPlaceholder: "ನಿಮ್ಮ.ಇಮೇಲ್@ಉದಾಹರಣೆ.com",
      phonePlaceholder: "+91 XXXXX XXXXX",
      messagePlaceholder: "ನಿಮ್ಮ ಭೂಮಿ ನೋಂದಣಿ ಅಗತ್ಯಗಳ ಬಗ್ಗೆ ನಮಗೆ ತಿಳಿಸಿ..."
    },
    services: [
      "ದಾಖಲೆ ಪರಿಶೀಲನೆ",
      "ಕಾನೂನು ಸಲಹೆ",
      "ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ",
      "ಶೀರ್ಷಿಕೆ ಹುಡುಕಾಟ",
      "ಕಸ್ಟಮ್ ಟೆಂಪ್ಲೇಟ್‌ಗಳು"
    ],
    contact: {
      email: "support@landdocs.com",
      phone: "+91 80 1234 5678",
      address: "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ, ಭಾರತ"
    },
    success: "ವಿನಂತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ! ನಾವು 24 ಗಂಟೆಗಳೊಳಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.",
    contactForm: "ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ",
    whyChoose: "ನಮ್ಮನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?"
  },
  mr: {
    title: "व्यावसायिक मदत हवी आहे?",
    subtitle: "तुमच्या जमीन नोंदणी गरजांसाठी तज्ञांची मदत घ्या. कोणतेही लपलेले शुल्क नाही, पारदर्शक किंमत.",
    form: {
      name: "पूर्ण नाव",
      email: "ईमेल पत्ता",
      phone: "फोन नंबर",
      service: "सेवेचा प्रकार",
      message: "तुमच्या आवश्यकतांचे वर्णन करा",
      submit: "विनंती पाठवा",
      namePlaceholder: "तुमचे पूर्ण नाव टाका",
      emailPlaceholder: "तुमचा.ईमेल@उदाहरण.com",
      phonePlaceholder: "+91 XXXXX XXXXX",
      messagePlaceholder: "तुमच्या जमीन नोंदणी गरजांबद्दल आम्हाला सांगा..."
    },
    services: [
      "दस्तऐवज पडताळणी",
      "कायदेशीर सल्ला",
      "नोंदणी प्रक्रिया",
      "शीर्षक शोध",
      "कस्टम टेम्प्लेट्स"
    ],
    contact: {
      email: "support@landdocs.com",
      phone: "+91 80 1234 5678",
      address: "बेंगळूरू, कर्नाटक, भारत"
    },
    success: "विनंती यशस्वीरित्या पाठवली! आम्ही 24 तासांत तुमच्याशी संपर्क साधू.",
    contactForm: "आम्हाला संदेश पाठवा",
    whyChoose: "आम्हाला का निवडावे?"
  },
  te: {
    title: "వృత్తిపరమైన సహాయం అవసరమా?",
    subtitle: "మీ భూమి నమోదు అవసరాలకు నిపుణుల సహాయం పొందండి. దాచిన రుసుములు లేవు, పారదర్శక ధర.",
    form: {
      name: "పూర్తి పేరు",
      email: "ఇమెయిల్ చిరునామా",
      phone: "ఫోన్ నంబర్",
      service: "సేవ రకం",
      message: "మీ అవసరాలను వివరించండి",
      submit: "అభ్యర్థన పంపండి",
      namePlaceholder: "మీ పూర్తి పేరు నమోదు చేయండి",
      emailPlaceholder: "మీ.ఇమెయిల్@ఉదాహరణ.com",
      phonePlaceholder: "+91 XXXXX XXXXX",
      messagePlaceholder: "మీ భూమి నమోదు అవసరాల గురించి మాకు చెప్పండి..."
    },
    services: [
      "పత్రాల ధృవీకరణ",
      "చట్టపరమైన సలహా",
      "నమోదు ప్రక్రియ",
      "టైటిల్ సెర్చ్",
      "కస్టమ్ టెంప్లేట్లు"
    ],
    contact: {
      email: "support@landdocs.com",
      phone: "+91 80 1234 5678",
      address: "బెంగళూరు, కర్ణాటక, భారతదేశం"
    },
    success: "అభ్యర్థన విజయవంతంగా పంపబడింది! మేము 24 గంటల్లో మిమ్మల్ని సంప్రదిస్తాము.",
    contactForm: "మాకు సందేశం పంపండి",
    whyChoose: "మమ్మల్ని ఎందుకు ఎంచుకోవాలి?"
  }
};

export const ContactSection = ({ currentLanguage }: ContactSectionProps) => {
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Success!",
      description: t.success,
    });

    // Reset form
    setFormData({
      name: "",
      email: "", 
      phone: "",
      service: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card shadow-card border-0 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">{t.contactForm}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.form.name} *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder={t.form.namePlaceholder}
                      className="hover-lift transition-all duration-200 focus:shadow-soft"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.form.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder={t.form.emailPlaceholder}
                      className="hover-lift transition-all duration-200 focus:shadow-soft"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.form.phone}</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder={t.form.phonePlaceholder}
                      className="hover-lift transition-all duration-200 focus:shadow-soft"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">{t.form.service}</Label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => handleInputChange("service", e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm hover-lift transition-all duration-200 focus:shadow-soft"
                    >
                      <option value="">Select a service</option>
                      {t.services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t.form.message} *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder={t.form.messagePlaceholder}
                    rows={5}
                    className="hover-lift transition-all duration-200 focus:shadow-soft"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-glow text-lg py-6 hover-lift"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {t.form.submit}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-right" style={{animationDelay: '0.4s'}}>
            <Card className="bg-gradient-card shadow-card border-0 hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">{t.contact.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card border-0 hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">{t.contact.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card border-0 hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">{t.contact.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="bg-success/10 p-6 rounded-lg border border-success/20">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="h-6 w-6 text-success" />
                <h4 className="font-semibold text-success">{t.whyChoose}</h4>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 100% Legal Compliance</li>
                <li>• Zero Hidden Charges</li>
                <li>• 24/7 Expert Support</li>
                <li>• Instant Template Access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};