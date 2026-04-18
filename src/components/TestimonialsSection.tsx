import { Quote } from "lucide-react";

interface TestimonialsSectionProps {
  currentLanguage: string;
}

const translations = {
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

export const TestimonialsSection = ({ currentLanguage }: TestimonialsSectionProps) => {
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <section id="testimonials" className="py-24 bg-background">
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

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-card border border-border p-8 flex flex-col hover-lift"
            >
              <Quote className="h-7 w-7 text-accent/40 mb-5 shrink-0" />
              <p className="font-sans text-foreground/80 text-sm leading-relaxed flex-1 mb-8 italic">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <div className="w-10 h-10 bg-primary flex items-center justify-center shrink-0">
                  <span className="font-sans text-primary-foreground text-xs font-bold">
                    {item.initials}
                  </span>
                </div>
                <div>
                  <p className="font-sans font-semibold text-foreground text-sm">{item.name}</p>
                  <p className="font-sans text-muted-foreground text-xs">{item.role} · {item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
