import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { useTranslation, type Translations } from "@/i18n";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  initials: string;
}

interface TestimonialsStrings {
  eyebrow: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

const translations: Translations<TestimonialsStrings> = {
  en: {
    eyebrow: "Client Stories",
    title: "Trusted Across India",
    subtitle: "Property owners and legal professionals rely on LandDocs for accurate, hassle-free documentation.",
    testimonials: [
      {
        quote:
          "I used the Sale Deed template for my property in Bangalore. The document was accepted at the Sub-Registrar's office without a single revision. Saved me ₹8,000 in lawyer fees.",
        name: "Rajesh Kumar",
        role: "Property Owner",
        location: "Bangalore, Karnataka",
        initials: "RK",
      },
      {
        quote:
          "As a legal consultant, I recommend LandDocs to all my clients. The templates are thorough, up-to-date with current law, and available in Marathi which matters a lot in Maharashtra.",
        name: "Priya Sharma",
        role: "Legal Consultant",
        location: "Pune, Maharashtra",
        initials: "PS",
      },
      {
        quote:
          "Downloaded the Lease Deed for my commercial property. The Telugu version was clear and well-formatted. The entire registration process was smooth. Highly recommended.",
        name: "Venkat Reddy",
        role: "Business Owner",
        location: "Hyderabad, Telangana",
        initials: "VR",
      },
    ],
  },
  hi: {
    eyebrow: "ग्राहक कहानियां",
    title: "पूरे भारत में भरोसेमंद",
    subtitle: "संपत्ति मालिक और कानूनी पेशेवर सटीक, परेशानी मुक्त दस्तावेज़ीकरण के लिए LandDocs पर भरोसा करते हैं।",
    testimonials: [
      {
        quote: "बैंगलोर में मेरी संपत्ति के लिए बिक्री विलेख टेम्प्लेट का उपयोग किया। दस्तावेज़ बिना किसी संशोधन के स्वीकार किया गया।",
        name: "राजेश कुमार", role: "संपत्ति मालिक", location: "बेंगलुरु, कर्नाटक", initials: "RK",
      },
      {
        quote: "एक कानूनी सलाहकार के रूप में, मैं अपने सभी ग्राहकों को LandDocs की सिफारिश करता हूं। टेम्प्लेट संपूर्ण और अद्यतित हैं।",
        name: "प्रिया शर्मा", role: "कानूनी सलाहकार", location: "पुणे, महाराष्ट्र", initials: "PS",
      },
      {
        quote: "अपनी व्यावसायिक संपत्ति के लिए पट्टा विलेख डाउनलोड किया। पंजीकरण प्रक्रिया बहुत सुचारू रही।",
        name: "वेंकट रेड्डी", role: "व्यवसाय मालिक", location: "हैदराबाद, तेलंगाना", initials: "VR",
      },
    ],
  },
  kn: {
    eyebrow: "ಗ್ರಾಹಕ ಕಥೆಗಳು",
    title: "ಭಾರತದಾದ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ",
    subtitle: "ಆಸ್ತಿ ಮಾಲೀಕರು ಮತ್ತು ಕಾನೂನು ವೃತ್ತಿಪರರು ದಾಖಲಾತಿಗಾಗಿ LandDocs ಅನ್ನು ನಂಬುತ್ತಾರೆ.",
    testimonials: [
      {
        quote: "ಬೆಂಗಳೂರಿನ ನನ್ನ ಆಸ್ತಿಗೆ ಮಾರಾಟ ಪತ್ರ ಟೆಂಪ್ಲೇಟ್ ಬಳಸಿದೆ. ಯಾವುದೇ ತಿದ್ದುಪಡಿ ಇಲ್ಲದೆ ಸ್ವೀಕರಿಸಲಾಯಿತು.",
        name: "ರಾಜೇಶ್ ಕುಮಾರ್", role: "ಆಸ್ತಿ ಮಾಲೀಕ", location: "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ", initials: "RK",
      },
      {
        quote: "ಕಾನೂನು ಸಲಹೆಗಾರರಾಗಿ, ನಾನು ನನ್ನ ಎಲ್ಲಾ ಗ್ರಾಹಕರಿಗೆ LandDocs ಅನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ.",
        name: "ಪ್ರಿಯಾ ಶರ್ಮಾ", role: "ಕಾನೂನು ಸಲಹೆಗಾರ", location: "ಪುಣೆ, ಮಹಾರಾಷ್ಟ್ರ", initials: "PS",
      },
      {
        quote: "ವಾಣಿಜ್ಯ ಆಸ್ತಿಗಾಗಿ ಬಾಡಿಗೆ ಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿದೆ. ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ ಸುಗಮವಾಗಿತ್ತು.",
        name: "ವೆಂಕಟ್ ರೆಡ್ಡಿ", role: "ವ್ಯವಹಾರ ಮಾಲೀಕ", location: "ಹೈದರಾಬಾದ್, ತೆಲಂಗಾಣ", initials: "VR",
      },
    ],
  },
  mr: {
    eyebrow: "ग्राहक कथा",
    title: "संपूर्ण भारतात विश्वासार्ह",
    subtitle: "मालमत्ता मालक आणि कायदेशीर व्यावसायिक दस्तऐवजीकरणासाठी LandDocs वर विश्वास ठेवतात.",
    testimonials: [
      {
        quote: "बेंगळुरूमधील माझ्या मालमत्तेसाठी विक्री पत्र टेम्प्लेट वापरले. कोणत्याही सुधारणेशिवाय स्वीकारले गेले.",
        name: "राजेश कुमार", role: "मालमत्ता मालक", location: "बेंगळुरू, कर्नाटक", initials: "RK",
      },
      {
        quote: "कायदेशीर सल्लागार म्हणून, मी माझ्या सर्व ग्राहकांना LandDocs ची शिफारस करतो.",
        name: "प्रिया शर्मा", role: "कायदेशीर सल्लागार", location: "पुणे, महाराष्ट्र", initials: "PS",
      },
      {
        quote: "व्यावसायिक मालमत्तेसाठी भाडे पत्र डाउनलोड केले. नोंदणी प्रक्रिया सुरळीत झाली.",
        name: "वेंकट रेड्डी", role: "व्यवसाय मालक", location: "हैदराबाद, तेलंगाणा", initials: "VR",
      },
    ],
  },
  ta: {
    eyebrow: "வாடிக்கையாளர் கதைகள்",
    title: "இந்தியா முழுவதும் நம்பப்படுகிறது",
    subtitle: "சொத்து உரிமையாளர்களும் சட்ட நிபுணர்களும் துல்லியமான ஆவணமாக்கலுக்கு LandDocs-ஐ நம்புகிறார்கள்.",
    testimonials: [
      {
        quote: "பெங்களூருவில் உள்ள என் சொத்துக்கு விற்பனைப் பத்திர வார்ப்புருவைப் பயன்படுத்தினேன். எந்தத் திருத்தமும் இல்லாமல் ஏற்றுக்கொள்ளப்பட்டது.",
        name: "ராஜேஷ் குமார்", role: "சொத்து உரிமையாளர்", location: "பெங்களூரு, கர்நாடகா", initials: "RK",
      },
      {
        quote: "சட்ட ஆலோசகராக, என் அனைத்து வாடிக்கையாளர்களுக்கும் LandDocs-ஐ பரிந்துரைக்கிறேன்.",
        name: "பிரியா சர்மா", role: "சட்ட ஆலோசகர்", location: "புனே, மகாராஷ்டிரா", initials: "PS",
      },
      {
        quote: "வணிகச் சொத்துக்கான குத்தகைப் பத்திரத்தைப் பதிவிறக்கினேன். பதிவு செயல்முறை மிகவும் சுமூகமாக இருந்தது.",
        name: "வெங்கட் ரெட்டி", role: "வணிக உரிமையாளர்", location: "ஹைதராபாத், தெலங்கானா", initials: "VR",
      },
    ],
  },
  te: {
    eyebrow: "క్లయింట్ కథలు",
    title: "భారతదేశం అంతటా విశ్వసించబడింది",
    subtitle: "ఆస్తి యజమానులు మరియు న్యాయ నిపుణులు డాక్యుమెంటేషన్ కోసం LandDocs ని నమ్ముతారు.",
    testimonials: [
      {
        quote: "బెంగళూరులో నా ఆస్తికి అమ్మకం పత్రం టెంప్లేట్ ఉపయోగించాను. ఎటువంటి సవరణ లేకుండా ఆమోదించబడింది.",
        name: "రాజేష్ కుమార్", role: "ఆస్తి యజమాని", location: "బెంగళూరు, కర్ణాటక", initials: "RK",
      },
      {
        quote: "న్యాయ సలహాదారుగా, నా అన్ని క్లయింట్లకు LandDocs ని సిఫారసు చేస్తున్నాను.",
        name: "ప్రియా శర్మ", role: "న్యాయ సలహాదారు", location: "పూణే, మహారాష్ట్ర", initials: "PS",
      },
      {
        quote: "వాణిజ్య ఆస్తికి లీజు పత్రం డౌన్లోడ్ చేశాను. నమోదు ప్రక్రియ చాలా సజావుగా జరిగింది.",
        name: "వెంకట్ రెడ్డి", role: "వ్యాపార యజమాని", location: "హైదరాబాద్, తెలంగాణ", initials: "VR",
      },
    ],
  },
};

export const TestimonialsSection = () => {
  const t = useTranslation(translations);

  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-24 bg-background">
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

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {t.testimonials.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 110}
              className="bg-card border border-border p-6 sm:p-8 flex flex-col h-full hover-lift sm:last:col-span-2 lg:last:col-span-1"
            >
              <Quote className="h-7 w-7 text-accent/40 mb-5 shrink-0" aria-hidden="true" />
              <blockquote className="font-sans text-foreground/80 text-sm leading-relaxed flex-1 mb-8 italic">
                "{item.quote}"
              </blockquote>
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <div className="w-10 h-10 bg-primary flex items-center justify-center shrink-0" aria-hidden="true">
                  <span className="font-sans text-primary-foreground text-xs font-bold">
                    {item.initials}
                  </span>
                </div>
                <div>
                  <p className="font-sans font-semibold text-foreground text-sm">{item.name}</p>
                  <p className="font-sans text-muted-foreground text-xs">{item.role} · {item.location}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
