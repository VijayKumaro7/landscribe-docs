import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ContactSectionProps {
  currentLanguage: string;
}

const translations = {
  en: {
    eyebrow: "Get in Touch",
    title: "Need Professional Help?",
    subtitle:
      "Our legal experts are available to assist with complex registrations, title searches, and custom documentation needs.",
    form: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      service: "Service Required",
      message: "Your Message",
      submit: "Send Message",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "you@example.com",
      phonePlaceholder: "+91 XXXXX XXXXX",
      messagePlaceholder: "Describe your land registration needs...",
    },
    services: ["Document Verification", "Legal Consultation", "Registration Process", "Title Search", "Custom Templates"],
    selectService: "Select a service",
    contact: {
      email: "support@landdocs.com",
      phone: "+91 80 1234 5678",
      address: "Bangalore, Karnataka, India",
    },
    validation: { title: "Missing Fields", message: "Please fill in all required fields." },
    success: "We received your message! Our team will contact you within 24 hours.",
  },
  hi: {
    eyebrow: "संपर्क करें",
    title: "व्यावसायिक सहायता चाहिए?",
    subtitle: "हमारे कानूनी विशेषज्ञ जटिल पंजीकरण और कस्टम दस्तावेज़ीकरण में मदद के लिए उपलब्ध हैं।",
    form: { name: "पूरा नाम", email: "ईमेल पता", phone: "फोन नंबर", service: "सेवा का प्रकार", message: "आपका संदेश", submit: "संदेश भेजें", namePlaceholder: "अपना पूरा नाम दर्ज करें", emailPlaceholder: "आपका.ईमेल@example.com", phonePlaceholder: "+91 XXXXX XXXXX", messagePlaceholder: "अपनी भूमि पंजीकरण आवश्यकताओं का वर्णन करें..." },
    services: ["दस्तावेज़ सत्यापन", "कानूनी परामर्श", "पंजीकरण प्रक्रिया", "शीर्षक खोज", "कस्टम टेम्प्लेट"],
    selectService: "सेवा चुनें",
    contact: { email: "support@landdocs.com", phone: "+91 80 1234 5678", address: "बेंगलुरु, कर्नाटक, भारत" },
    validation: { title: "जानकारी अधूरी है", message: "कृपया सभी आवश्यक फ़ील्ड भरें।" },
    success: "आपका संदेश प्राप्त हुआ! हमारी टीम 24 घंटे में संपर्क करेगी।",
  },
  kn: {
    eyebrow: "ಸಂಪರ್ಕಿಸಿ",
    title: "ವೃತ್ತಿಪರ ಸಹಾಯ ಬೇಕೇ?",
    subtitle: "ನಮ್ಮ ಕಾನೂನು ತಜ್ಞರು ಸಂಕೀರ್ಣ ನೋಂದಣಿ ಮತ್ತು ಕಸ್ಟಮ್ ದಾಖಲಾತಿಗೆ ಸಹಾಯ ಮಾಡಲು ಲಭ್ಯ.",
    form: { name: "ಪೂರ್ಣ ಹೆಸರು", email: "ಇಮೇಲ್ ವಿಳಾಸ", phone: "ದೂರವಾಣಿ", service: "ಸೇವೆಯ ಪ್ರಕಾರ", message: "ನಿಮ್ಮ ಸಂದೇಶ", submit: "ಸಂದೇಶ ಕಳುಹಿಸಿ", namePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು", emailPlaceholder: "ನೀವು@ಉದಾಹರಣೆ.com", phonePlaceholder: "+91 XXXXX XXXXX", messagePlaceholder: "ನಿಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ವಿವರಿಸಿ..." },
    services: ["ದಾಖಲೆ ಪರಿಶೀಲನೆ", "ಕಾನೂನು ಸಲಹೆ", "ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ", "ಶೀರ್ಷಿಕೆ ಹುಡುಕಾಟ", "ಕಸ್ಟಮ್ ಟೆಂಪ್ಲೇಟ್"],
    selectService: "ಸೇವೆ ಆಯ್ಕೆ ಮಾಡಿ",
    contact: { email: "support@landdocs.com", phone: "+91 80 1234 5678", address: "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ, ಭಾರತ" },
    validation: { title: "ಮಾಹಿತಿ ಕೊರತೆ", message: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ." },
    success: "ನಿಮ್ಮ ಸಂದೇಶ ಸ್ವೀಕರಿಸಲಾಗಿದೆ! ನಮ್ಮ ತಂಡ 24 ಗಂಟೆಗಳೊಳಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
  },
  mr: {
    eyebrow: "संपर्क करा",
    title: "व्यावसायिक मदत हवी आहे?",
    subtitle: "आमचे कायदेशीर तज्ञ जटिल नोंदणी आणि कस्टम दस्तऐवजीकरणासाठी मदत करण्यासाठी उपलब्ध आहेत.",
    form: { name: "पूर्ण नाव", email: "ईमेल पत्ता", phone: "फोन नंबर", service: "सेवेचा प्रकार", message: "तुमचा संदेश", submit: "संदेश पाठवा", namePlaceholder: "तुमचे पूर्ण नाव", emailPlaceholder: "तुम्ही@उदाहरण.com", phonePlaceholder: "+91 XXXXX XXXXX", messagePlaceholder: "तुमच्या जमीन नोंदणी गरजांचे वर्णन करा..." },
    services: ["दस्तऐवज पडताळणी", "कायदेशीर सल्ला", "नोंदणी प्रक्रिया", "शीर्षक शोध", "कस्टम टेम्प्लेट्स"],
    selectService: "सेवा निवडा",
    contact: { email: "support@landdocs.com", phone: "+91 80 1234 5678", address: "बेंगळूरू, कर्नाटक, भारत" },
    validation: { title: "माहिती अपूर्ण", message: "कृपया सर्व आवश्यक फील्ड भरा." },
    success: "तुमचा संदेश मिळाला! आमची टीम 24 तासांत संपर्क करेल.",
  },
  te: {
    eyebrow: "సంప్రదించండి",
    title: "వృత్తిపరమైన సహాయం అవసరమా?",
    subtitle: "మా చట్ట నిపుణులు సంక్లిష్ట నమోదులు మరియు కస్టమ్ డాక్యుమెంటేషన్ కోసం సహాయం చేయడానికి అందుబాటులో ఉన్నారు.",
    form: { name: "పూర్తి పేరు", email: "ఇమెయిల్", phone: "ఫోన్ నంబర్", service: "సేవ రకం", message: "మీ సందేశం", submit: "సందేశం పంపండి", namePlaceholder: "మీ పూర్తి పేరు", emailPlaceholder: "మీరు@ఉదాహరణ.com", phonePlaceholder: "+91 XXXXX XXXXX", messagePlaceholder: "మీ భూమి నమోదు అవసరాలను వివరించండి..." },
    services: ["పత్రాల ధృవీకరణ", "చట్టపరమైన సలహా", "నమోదు ప్రక్రియ", "టైటిల్ సెర్చ్", "కస్టమ్ టెంప్లేట్లు"],
    selectService: "సేవను ఎంచుకోండి",
    contact: { email: "support@landdocs.com", phone: "+91 80 1234 5678", address: "బెంగళూరు, కర్ణాటక, భారతదేశం" },
    validation: { title: "సమాచారం తప్పిపోయింది", message: "దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి." },
    success: "మీ సందేశం అందింది! మా బృందం 24 గంటల్లో సంప్రదిస్తుంది.",
  },
};

const contactInfo = [
  { Icon: Mail, label: "Email", key: "email" },
  { Icon: Phone, label: "Phone", key: "phone" },
  { Icon: MapPin, label: "Location", key: "address" },
] as const;

export const ContactSection = ({ currentLanguage }: ContactSectionProps) => {
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;
  const { toast } = useToast();

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: t.validation.title, description: t.validation.message, variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: t.success });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section id="contact" className="py-24 bg-muted/30">
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

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3 bg-card border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.form.name} *
                  </Label>
                  <Input id="name" value={formData.name} onChange={set("name")} placeholder={t.form.namePlaceholder} className="font-sans rounded-sm h-10 border-border bg-background" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.form.email} *
                  </Label>
                  <Input id="email" type="email" value={formData.email} onChange={set("email")} placeholder={t.form.emailPlaceholder} className="font-sans rounded-sm h-10 border-border bg-background" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.form.phone}
                  </Label>
                  <Input id="phone" value={formData.phone} onChange={set("phone")} placeholder={t.form.phonePlaceholder} className="font-sans rounded-sm h-10 border-border bg-background" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="service" className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.form.service}
                  </Label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={set("service")}
                    className="w-full h-10 px-3 rounded-sm border border-border bg-background font-sans text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">{t.selectService}</option>
                    {t.services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t.form.message} *
                </Label>
                <Textarea id="message" value={formData.message} onChange={set("message")} placeholder={t.form.messagePlaceholder} rows={5} className="font-sans rounded-sm border-border bg-background resize-none" required />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold h-11 rounded-sm text-sm tracking-wide">
                <Send className="h-4 w-4 mr-2" />
                {t.form.submit}
              </Button>
            </form>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4 flex flex-col justify-center">
            {contactInfo.map(({ Icon, label, key }) => (
              <div key={key} className="bg-card border border-border p-6 flex items-start gap-4">
                <div className="w-9 h-9 bg-primary/8 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                    {label}
                  </p>
                  <p className="font-sans text-foreground text-sm">{t.contact[key]}</p>
                </div>
              </div>
            ))}

            {/* Trust note */}
            <div className="bg-primary p-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground/60 mb-3">
                Our Promise
              </p>
              <ul className="space-y-2">
                {["Free initial consultation", "Response within 24 hours", "No hidden charges"].map((item) => (
                  <li key={item} className="font-sans text-primary-foreground/80 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
