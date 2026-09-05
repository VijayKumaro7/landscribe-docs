import { useState } from "react";
import { Link } from "react-router-dom";
import { Download, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "./Reveal";
import { useToast } from "@/hooks/use-toast";
import { useLocalizedPath, useTranslation, type Translations } from "@/i18n";

interface ContactStrings {
  eyebrow: string;
  title: string;
  subtitle: string;
  form: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    submit: string;
    submitting: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
  };
  services: string[];
  selectService: string;
  contact: { email: string; phone: string; address: string };
  errors: { nameRequired: string; emailRequired: string; emailInvalid: string; messageRequired: string };
  successTitle: string;
  success: string;
  errorTitle: string;
  errorBody: string;
  promiseTitle: string;
  promises: string[];
  downloadCta: string;
}

const translations: Translations<ContactStrings> = {
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
      submitting: "Sending…",
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
    errors: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      messageRequired: "Please enter a message.",
    },
    successTitle: "Message sent!",
    success: "We received your message! Our team will contact you within 24 hours.",
    errorTitle: "Message not sent",
    errorBody: "Something went wrong sending your message. Please try again, or email us at support@landdocs.com.",
    promiseTitle: "Our Promise",
    promises: ["Free initial consultation", "Response within 24 hours", "No hidden charges"],
    downloadCta: "Download Documents",
  },
  hi: {
    eyebrow: "संपर्क करें",
    title: "व्यावसायिक सहायता चाहिए?",
    subtitle: "हमारे कानूनी विशेषज्ञ जटिल पंजीकरण और कस्टम दस्तावेज़ीकरण में मदद के लिए उपलब्ध हैं।",
    form: { name: "पूरा नाम", email: "ईमेल पता", phone: "फोन नंबर", service: "सेवा का प्रकार", message: "आपका संदेश", submit: "संदेश भेजें", submitting: "भेजा जा रहा है…", namePlaceholder: "अपना पूरा नाम दर्ज करें", emailPlaceholder: "आपका.ईमेल@example.com", phonePlaceholder: "+91 XXXXX XXXXX", messagePlaceholder: "अपनी भूमि पंजीकरण आवश्यकताओं का वर्णन करें..." },
    services: ["दस्तावेज़ सत्यापन", "कानूनी परामर्श", "पंजीकरण प्रक्रिया", "शीर्षक खोज", "कस्टम टेम्प्लेट"],
    selectService: "सेवा चुनें",
    contact: { email: "support@landdocs.com", phone: "+91 80 1234 5678", address: "बेंगलुरु, कर्नाटक, भारत" },
    errors: { nameRequired: "कृपया अपना नाम दर्ज करें।", emailRequired: "कृपया ईमेल पता दर्ज करें।", emailInvalid: "कृपया मान्य ईमेल पता दर्ज करें।", messageRequired: "कृपया संदेश दर्ज करें।" },
    successTitle: "संदेश भेजा गया!",
    success: "आपका संदेश प्राप्त हुआ! हमारी टीम 24 घंटे में संपर्क करेगी।",
    errorTitle: "संदेश नहीं भेजा गया",
    errorBody: "आपका संदेश भेजने में समस्या हुई। कृपया पुनः प्रयास करें, या support@landdocs.com पर ईमेल करें।",
    promiseTitle: "हमारा वादा",
    promises: ["नि:शुल्क प्रारंभिक परामर्श", "24 घंटे में जवाब", "कोई छुपा शुल्क नहीं"],
    downloadCta: "दस्तावेज़ डाउनलोड करें",
  },
  kn: {
    eyebrow: "ಸಂಪರ್ಕಿಸಿ",
    title: "ವೃತ್ತಿಪರ ಸಹಾಯ ಬೇಕೇ?",
    subtitle: "ನಮ್ಮ ಕಾನೂನು ತಜ್ಞರು ಸಂಕೀರ್ಣ ನೋಂದಣಿ ಮತ್ತು ಕಸ್ಟಮ್ ದಾಖಲಾತಿಗೆ ಸಹಾಯ ಮಾಡಲು ಲಭ್ಯ.",
    form: { name: "ಪೂರ್ಣ ಹೆಸರು", email: "ಇಮೇಲ್ ವಿಳಾಸ", phone: "ದೂರವಾಣಿ", service: "ಸೇವೆಯ ಪ್ರಕಾರ", message: "ನಿಮ್ಮ ಸಂದೇಶ", submit: "ಸಂದೇಶ ಕಳುಹಿಸಿ", submitting: "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ…", namePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು", emailPlaceholder: "ನೀವು@ಉದಾಹರಣೆ.com", phonePlaceholder: "+91 XXXXX XXXXX", messagePlaceholder: "ನಿಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ವಿವರಿಸಿ..." },
    services: ["ದಾಖಲೆ ಪರಿಶೀಲನೆ", "ಕಾನೂನು ಸಲಹೆ", "ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ", "ಶೀರ್ಷಿಕೆ ಹುಡುಕಾಟ", "ಕಸ್ಟಮ್ ಟೆಂಪ್ಲೇಟ್"],
    selectService: "ಸೇವೆ ಆಯ್ಕೆ ಮಾಡಿ",
    contact: { email: "support@landdocs.com", phone: "+91 80 1234 5678", address: "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ, ಭಾರತ" },
    errors: { nameRequired: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ನಮೂದಿಸಿ.", emailRequired: "ದಯವಿಟ್ಟು ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ.", emailInvalid: "ದಯವಿಟ್ಟು ಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ.", messageRequired: "ದಯವಿಟ್ಟು ಸಂದೇಶ ನಮೂದಿಸಿ." },
    successTitle: "ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ!",
    success: "ನಿಮ್ಮ ಸಂದೇಶ ಸ್ವೀಕರಿಸಲಾಗಿದೆ! ನಮ್ಮ ತಂಡ 24 ಗಂಟೆಗಳೊಳಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
    errorTitle: "ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿಲ್ಲ",
    errorBody: "ನಿಮ್ಮ ಸಂದೇಶ ಕಳುಹಿಸುವಲ್ಲಿ ಸಮಸ್ಯೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ support@landdocs.com ಗೆ ಇಮೇಲ್ ಮಾಡಿ.",
    promiseTitle: "ನಮ್ಮ ಭರವಸೆ",
    promises: ["ಉಚಿತ ಆರಂಭಿಕ ಸಮಾಲೋಚನೆ", "24 ಗಂಟೆಗಳೊಳಗೆ ಪ್ರತಿಕ್ರಿಯೆ", "ಗುಪ್ತ ಶುಲ್ಕಗಳಿಲ್ಲ"],
    downloadCta: "ದಾಖಲೆಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
  },
  mr: {
    eyebrow: "संपर्क करा",
    title: "व्यावसायिक मदत हवी आहे?",
    subtitle: "आमचे कायदेशीर तज्ञ जटिल नोंदणी आणि कस्टम दस्तऐवजीकरणासाठी मदत करण्यासाठी उपलब्ध आहेत.",
    form: { name: "पूर्ण नाव", email: "ईमेल पत्ता", phone: "फोन नंबर", service: "सेवेचा प्रकार", message: "तुमचा संदेश", submit: "संदेश पाठवा", submitting: "पाठवत आहे…", namePlaceholder: "तुमचे पूर्ण नाव", emailPlaceholder: "तुम्ही@उदाहरण.com", phonePlaceholder: "+91 XXXXX XXXXX", messagePlaceholder: "तुमच्या जमीन नोंदणी गरजांचे वर्णन करा..." },
    services: ["दस्तऐवज पडताळणी", "कायदेशीर सल्ला", "नोंदणी प्रक्रिया", "शीर्षक शोध", "कस्टम टेम्प्लेट्स"],
    selectService: "सेवा निवडा",
    contact: { email: "support@landdocs.com", phone: "+91 80 1234 5678", address: "बेंगळूरू, कर्नाटक, भारत" },
    errors: { nameRequired: "कृपया तुमचे नाव प्रविष्ट करा.", emailRequired: "कृपया ईमेल पत्ता प्रविष्ट करा.", emailInvalid: "कृपया वैध ईमेल पत्ता प्रविष्ट करा.", messageRequired: "कृपया संदेश प्रविष्ट करा." },
    successTitle: "संदेश पाठवला!",
    success: "तुमचा संदेश मिळाला! आमची टीम 24 तासांत संपर्क करेल.",
    errorTitle: "संदेश पाठवला गेला नाही",
    errorBody: "तुमचा संदेश पाठवताना अडचण आली. कृपया पुन्हा प्रयत्न करा, किंवा support@landdocs.com वर ईमेल करा.",
    promiseTitle: "आमचे वचन",
    promises: ["विनामूल्य प्रारंभिक सल्ला", "24 तासांत प्रतिसाद", "कोणतेही छुपे शुल्क नाही"],
    downloadCta: "दस्तऐवज डाउनलोड करा",
  },
  ta: {
    eyebrow: "தொடர்பு கொள்ளுங்கள்",
    title: "தொழில்முறை உதவி தேவையா?",
    subtitle: "சிக்கலான பதிவுகள் மற்றும் தனிப்பயன் ஆவணமாக்கலுக்கு எங்கள் சட்ட நிபுணர்கள் உதவ தயாராக உள்ளனர்.",
    form: { name: "முழுப் பெயர்", email: "மின்னஞ்சல் முகவரி", phone: "தொலைபேசி எண்", service: "தேவையான சேவை", message: "உங்கள் செய்தி", submit: "செய்தி அனுப்பு", submitting: "அனுப்பப்படுகிறது…", namePlaceholder: "உங்கள் முழுப் பெயர்", emailPlaceholder: "you@example.com", phonePlaceholder: "+91 XXXXX XXXXX", messagePlaceholder: "உங்கள் நிலப் பதிவுத் தேவைகளை விவரியுங்கள்..." },
    services: ["ஆவணச் சரிபார்ப்பு", "சட்ட ஆலோசனை", "பதிவு செயல்முறை", "உரிமைத் தேடல்", "தனிப்பயன் வார்ப்புருக்கள்"],
    selectService: "சேவையைத் தேர்ந்தெடுக்கவும்",
    contact: { email: "support@landdocs.com", phone: "+91 80 1234 5678", address: "பெங்களூரு, கர்நாடகா, இந்தியா" },
    errors: { nameRequired: "உங்கள் பெயரை உள்ளிடவும்.", emailRequired: "மின்னஞ்சல் முகவரியை உள்ளிடவும்.", emailInvalid: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.", messageRequired: "செய்தியை உள்ளிடவும்." },
    successTitle: "செய்தி அனுப்பப்பட்டது!",
    success: "உங்கள் செய்தி கிடைத்தது! எங்கள் குழு 24 மணி நேரத்தில் தொடர்பு கொள்ளும்.",
    errorTitle: "செய்தி அனுப்பப்படவில்லை",
    errorBody: "உங்கள் செய்தியை அனுப்புவதில் சிக்கல் ஏற்பட்டது. மீண்டும் முயற்சிக்கவும், அல்லது support@landdocs.com க்கு மின்னஞ்சல் அனுப்பவும்.",
    promiseTitle: "எங்கள் வாக்குறுதி",
    promises: ["இலவச ஆரம்ப ஆலோசனை", "24 மணி நேரத்தில் பதில்", "மறைமுகக் கட்டணங்கள் இல்லை"],
    downloadCta: "ஆவணங்களைப் பதிவிறக்கவும்",
  },
  te: {
    eyebrow: "సంప్రదించండి",
    title: "వృత్తిపరమైన సహాయం అవసరమా?",
    subtitle: "మా చట్ట నిపుణులు సంక్లిష్ట నమోదులు మరియు కస్టమ్ డాక్యుమెంటేషన్ కోసం సహాయం చేయడానికి అందుబాటులో ఉన్నారు.",
    form: { name: "పూర్తి పేరు", email: "ఇమెయిల్", phone: "ఫోన్ నంబర్", service: "సేవ రకం", message: "మీ సందేశం", submit: "సందేశం పంపండి", submitting: "పంపబడుతోంది…", namePlaceholder: "మీ పూర్తి పేరు", emailPlaceholder: "మీరు@ఉదాహరణ.com", phonePlaceholder: "+91 XXXXX XXXXX", messagePlaceholder: "మీ భూమి నమోదు అవసరాలను వివరించండి..." },
    services: ["పత్రాల ధృవీకరణ", "చట్టపరమైన సలహా", "నమోదు ప్రక్రియ", "టైటిల్ సెర్చ్", "కస్టమ్ టెంప్లేట్లు"],
    selectService: "సేవను ఎంచుకోండి",
    contact: { email: "support@landdocs.com", phone: "+91 80 1234 5678", address: "బెంగళూరు, కర్ణాటక, భారతదేశం" },
    errors: { nameRequired: "దయచేసి మీ పేరు నమోదు చేయండి.", emailRequired: "దయచేసి ఇమెయిల్ చిరునామా నమోదు చేయండి.", emailInvalid: "దయచేసి చెల్లుబాటు అయ్యే ఇమెయిల్ నమోదు చేయండి.", messageRequired: "దయచేసి సందేశం నమోదు చేయండి." },
    successTitle: "సందేశం పంపబడింది!",
    success: "మీ సందేశం అందింది! మా బృందం 24 గంటల్లో సంప్రదిస్తుంది.",
    errorTitle: "సందేశం పంపబడలేదు",
    errorBody: "మీ సందేశాన్ని పంపడంలో సమస్య ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి, లేదా support@landdocs.com కు ఇమెయిల్ చేయండి.",
    promiseTitle: "మా వాగ్దానం",
    promises: ["ఉచిత ప్రారంభ సంప్రదింపు", "24 గంటల్లో స్పందన", "దాచిన ఛార్జీలు లేవు"],
    downloadCta: "పత్రాలను డౌన్లోడ్ చేయండి",
  },
};

const contactInfo = [
  { Icon: Mail, label: "Email", key: "email" },
  { Icon: Phone, label: "Phone", key: "phone" },
  { Icon: MapPin, label: "Location", key: "address" },
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormData = { name: string; email: string; phone: string; service: string; message: string };
type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMPTY_FORM: FormData = { name: "", email: "", phone: "", service: "", message: "" };

/** Must match the static detection form in index.html. */
const CONTACT_FORM_NAME = "contact";

export const ContactSection = () => {
  const t = useTranslation(translations);
  const localized = useLocalizedPath();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  // Honeypot: real people never see this field, so anything in it is a bot.
  const [botField, setBotField] = useState("");

  const validate = (data: FormData): FormErrors => {
    const next: FormErrors = {};
    if (!data.name.trim()) next.name = t.errors.nameRequired;
    if (!data.email.trim()) next.email = t.errors.emailRequired;
    else if (!EMAIL_PATTERN.test(data.email.trim())) next.email = t.errors.emailInvalid;
    if (!data.message.trim()) next.message = t.errors.messageRequired;
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field for keyboard/screen-reader users.
      const firstInvalid = ["name", "email", "message"].find((f) => f in nextErrors);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    // Posts to the static form declared in index.html, which is what Netlify
    // detects at build time. Only report success if the POST actually landed —
    // otherwise the visitor is told a message was sent that never was.
    setSubmitting(true);
    try {
      const body = new URLSearchParams({
        "form-name": CONTACT_FORM_NAME,
        "bot-field": botField,
        ...formData,
      });
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`Form POST failed with ${response.status}`);

      toast({ title: t.successTitle, description: t.success });
      setFormData(EMPTY_FORM);
    } catch (err) {
      console.error("Contact form submission failed", err);
      toast({ variant: "destructive", title: t.errorTitle, description: t.errorBody });
    } finally {
      setSubmitting(false);
    }
  };

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear the field's error as soon as the user starts correcting it.
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const fieldError = (field: keyof FormErrors) =>
    errors[field] ? (
      <p id={`${field}-error`} className="font-sans text-xs text-destructive" role="alert">
        {errors[field]}
      </p>
    ) : null;

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-muted/30">
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

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <Reveal className="lg:col-span-3 bg-card border border-border p-6 sm:p-8">
            <form
              name={CONTACT_FORM_NAME}
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >
              <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />
              <p hidden>
                <label>
                  Don't fill this out if you're human
                  <input name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} />
                </label>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.form.name} <span aria-hidden="true">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={set("name")}
                    placeholder={t.form.namePlaceholder}
                    className="font-sans rounded-sm h-10 border-border bg-background"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {fieldError("name")}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.form.email} <span aria-hidden="true">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={set("email")}
                    placeholder={t.form.emailPlaceholder}
                    className="font-sans rounded-sm h-10 border-border bg-background"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {fieldError("email")}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.form.phone}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={set("phone")}
                    placeholder={t.form.phonePlaceholder}
                    className="font-sans rounded-sm h-10 border-border bg-background"
                    autoComplete="tel"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="service" className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.form.service}
                  </Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={set("service")}
                    className="w-full h-10 px-3 rounded-sm border border-border bg-background font-sans text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">{t.selectService}</option>
                    {t.services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t.form.message} <span aria-hidden="true">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={set("message")}
                  placeholder={t.form.messagePlaceholder}
                  rows={5}
                  className="font-sans rounded-sm border-border bg-background resize-none"
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {fieldError("message")}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold h-11 rounded-sm text-sm tracking-wide"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4 mr-2" aria-hidden="true" />
                )}
                {submitting ? t.form.submitting : t.form.submit}
              </Button>
            </form>
          </Reveal>

          {/* Contact info */}
          <Reveal delay={120} className="lg:col-span-2 space-y-4 flex flex-col justify-center">
            {contactInfo.map(({ Icon, label, key }) => (
              <div key={key} className="bg-card border border-border p-6 flex items-start gap-4">
                <div className="w-9 h-9 bg-primary/8 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                    {label}
                  </p>
                  {key === "email" ? (
                    <a href={`mailto:${t.contact.email}`} className="font-sans text-foreground text-sm hover:text-primary transition-colors">
                      {t.contact.email}
                    </a>
                  ) : key === "phone" ? (
                    <a href={`tel:${t.contact.phone.replace(/\s/g, "")}`} className="font-sans text-foreground text-sm hover:text-primary transition-colors">
                      {t.contact.phone}
                    </a>
                  ) : (
                    <p className="font-sans text-foreground text-sm">{t.contact.address}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Trust note */}
            <div className="bg-primary p-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground/60 mb-3">
                {t.promiseTitle}
              </p>
              <ul className="space-y-2">
                {t.promises.map((item) => (
                  <li key={item} className="font-sans text-primary-foreground/80 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick access to the downloads page */}
            <Button
              asChild
              variant="outline"
              className="w-full h-11 rounded-sm font-sans font-semibold text-sm border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
            >
              <Link to={localized("/services")}>
                <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                {t.downloadCta}
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
