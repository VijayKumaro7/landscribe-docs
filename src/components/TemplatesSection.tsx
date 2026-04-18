import { Download, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TemplatesSectionProps {
  currentLanguage: string;
}

const translations = {
  en: {
    eyebrow: "Document Library",
    title: "Legal Templates for Every Need",
    subtitle:
      "Professionally drafted, legally compliant templates for all major land registration transactions.",
    downloadNow: "Download",
    preview: "Preview",
    free: "Free",
    premium: "Premium",
    popular: "Popular",
    templates: [
      {
        title: "Sale Deed",
        description: "Complete template for property sale transactions with all required legal clauses and schedules.",
        type: "free",
        downloads: "2,847",
        rating: "4.9",
      },
      {
        title: "Gift Deed",
        description: "Legally valid template for transferring property as a gift between family members.",
        type: "free",
        downloads: "1,923",
        rating: "4.8",
      },
      {
        title: "Partition Deed",
        description: "Comprehensive template for partitioning jointly-owned property among co-owners.",
        type: "premium",
        downloads: "1,245",
        rating: "4.9",
      },
      {
        title: "Mortgage Deed",
        description: "Detailed mortgage documentation template covering all statutory requirements.",
        type: "premium",
        downloads: "987",
        rating: "4.7",
      },
      {
        title: "Lease Deed",
        description: "Professional long-term lease agreement template with renewal and termination clauses.",
        type: "free",
        downloads: "3,156",
        rating: "4.8",
      },
      {
        title: "Power of Attorney",
        description: "Legally binding POA template for property-related transactions and registrations.",
        type: "premium",
        downloads: "756",
        rating: "4.9",
      },
    ],
  },
  hi: {
    eyebrow: "दस्तावेज़ लाइब्रेरी",
    title: "हर जरूरत के लिए कानूनी टेम्प्लेट",
    subtitle: "सभी प्रमुख भूमि पंजीकरण लेनदेन के लिए व्यावसायिक रूप से तैयार टेम्प्लेट।",
    downloadNow: "डाउनलोड",
    preview: "पूर्वावलोकन",
    free: "मुफ़्त",
    premium: "प्रीमियम",
    popular: "लोकप्रिय",
    templates: [
      { title: "बिक्री विलेख", description: "संपत्ति बिक्री लेनदेन के लिए पूर्ण टेम्प्लेट।", type: "free", downloads: "2,847", rating: "4.9" },
      { title: "उपहार विलेख", description: "परिवार के सदस्यों के बीच संपत्ति उपहार स्थानांतरण।", type: "free", downloads: "1,923", rating: "4.8" },
      { title: "विभाजन विलेख", description: "सह-मालिकों के बीच संपत्ति विभाजन।", type: "premium", downloads: "1,245", rating: "4.9" },
      { title: "बंधक विलेख", description: "संपत्ति बंधक दस्तावेज़ीकरण।", type: "premium", downloads: "987", rating: "4.7" },
      { title: "पट्टा विलेख", description: "दीर्घकालिक संपत्ति पट्टा समझौते।", type: "free", downloads: "3,156", rating: "4.8" },
      { title: "मुख्तारनामा", description: "संपत्ति संबंधी मुख्तारनामा दस्तावेज़ीकरण।", type: "premium", downloads: "756", rating: "4.9" },
    ],
  },
  kn: {
    eyebrow: "ದಾಖಲೆ ಗ್ರಂಥಾಲಯ",
    title: "ಪ್ರತಿ ಅಗತ್ಯಕ್ಕೆ ಕಾನೂನು ಟೆಂಪ್ಲೇಟ್‌ಗಳು",
    subtitle: "ಎಲ್ಲಾ ಪ್ರಮುಖ ಭೂಮಿ ನೋಂದಣಿ ವ್ಯವಹಾರಗಳಿಗಾಗಿ ವೃತ್ತಿಪರ ಟೆಂಪ್ಲೇಟ್‌ಗಳು.",
    downloadNow: "ಡೌನ್‌ಲೋಡ್",
    preview: "ಪೂರ್ವವೀಕ್ಷಣೆ",
    free: "ಉಚಿತ",
    premium: "ಪ್ರೀಮಿಯಂ",
    popular: "ಜನಪ್ರಿಯ",
    templates: [
      { title: "ಮಾರಾಟ ಪತ್ರ", description: "ಆಸ್ತಿ ಮಾರಾಟ ವ್ಯವಹಾರಗಳಿಗೆ ಸಂಪೂರ್ಣ ಟೆಂಪ್ಲೇಟ್.", type: "free", downloads: "2,847", rating: "4.9" },
      { title: "ಉಡುಗೊರೆ ಪತ್ರ", description: "ಕುಟುಂಬ ಸದಸ್ಯರ ನಡುವೆ ಆಸ್ತಿ ವರ್ಗಾವಣೆ.", type: "free", downloads: "1,923", rating: "4.8" },
      { title: "ವಿಭಾಗ ಪತ್ರ", description: "ಸಹ-ಮಾಲೀಕರ ನಡುವೆ ಆಸ್ತಿ ವಿಭಾಗ.", type: "premium", downloads: "1,245", rating: "4.9" },
      { title: "ಅಡಮಾನ ಪತ್ರ", description: "ಆಸ್ತಿ ಅಡಮಾನ ದಾಖಲಾತಿ.", type: "premium", downloads: "987", rating: "4.7" },
      { title: "ಬಾಡಿಗೆ ಪತ್ರ", description: "ದೀರ್ಘಾವಧಿ ಆಸ್ತಿ ಬಾಡಿಗೆ ಒಪ್ಪಂದ.", type: "free", downloads: "3,156", rating: "4.8" },
      { title: "ಅಧಿಕಾರ ಪತ್ರ", description: "ಆಸ್ತಿ-ಸಂಬಂಧಿತ ಅಧಿಕಾರ ಪತ್ರ.", type: "premium", downloads: "756", rating: "4.9" },
    ],
  },
  mr: {
    eyebrow: "दस्तऐवज लायब्ररी",
    title: "प्रत्येक गरजेसाठी कायदेशीर टेम्प्लेट्स",
    subtitle: "सर्व प्रमुख जमीन नोंदणी व्यवहारांसाठी व्यावसायिकपणे तयार केलेले टेम्प्लेट्स.",
    downloadNow: "डाउनलोड",
    preview: "पूर्वावलोकन",
    free: "विनामूल्य",
    premium: "प्रीमियम",
    popular: "लोकप्रिय",
    templates: [
      { title: "विक्री पत्र", description: "मालमत्ता विक्री व्यवहारांसाठी संपूर्ण टेम्प्लेट.", type: "free", downloads: "2,847", rating: "4.9" },
      { title: "भेट पत्र", description: "कुटुंबातील सदस्यांमधील मालमत्ता हस्तांतरण.", type: "free", downloads: "1,923", rating: "4.8" },
      { title: "फाळणी पत्र", description: "सहमालकांमधील मालमत्ता फाळणी.", type: "premium", downloads: "1,245", rating: "4.9" },
      { title: "गहाण पत्र", description: "मालमत्ता गहाण दस्तऐवजीकरण.", type: "premium", downloads: "987", rating: "4.7" },
      { title: "भाडे पत्र", description: "दीर्घकालीन मालमत्ता भाडे करार.", type: "free", downloads: "3,156", rating: "4.8" },
      { title: "मुख्तारनामा", description: "मालमत्ता-संबंधित मुख्तारनामा.", type: "premium", downloads: "756", rating: "4.9" },
    ],
  },
  te: {
    eyebrow: "డాక్యుమెంట్ లైబ్రరీ",
    title: "ప్రతి అవసరానికి చట్టపరమైన టెంప్లేట్లు",
    subtitle: "అన్ని ప్రధాన భూమి నమోదు లావాదేవీలకు వృత్తిపరంగా రూపొందించిన టెంప్లేట్లు.",
    downloadNow: "డౌన్లోడ్",
    preview: "మునుపటి వీక్షణ",
    free: "ఉచితం",
    premium: "ప్రీమియం",
    popular: "ప్రజాదరణ",
    templates: [
      { title: "అమ్మకం పత్రం", description: "ఆస్తి అమ్మకం లావాదేవీలకు పూర్తి టెంప్లేట్.", type: "free", downloads: "2,847", rating: "4.9" },
      { title: "బహుమతి పత్రం", description: "కుటుంబ సభ్యుల మధ్య ఆస్తి బదిలీ.", type: "free", downloads: "1,923", rating: "4.8" },
      { title: "విభజన పత్రం", description: "సహ-యజమానుల మధ్య ఆస్తి విభజన.", type: "premium", downloads: "1,245", rating: "4.9" },
      { title: "తనఖా పత్రం", description: "ఆస్తి తనఖా డాక్యుమెంటేషన్.", type: "premium", downloads: "987", rating: "4.7" },
      { title: "లీజు పత్రం", description: "దీర్ఘకాలిక ఆస్తి లీజు ఒప్పందం.", type: "free", downloads: "3,156", rating: "4.8" },
      { title: "పవర్ ఆఫ్ అటార్నీ", description: "ఆస్తి-సంబంధిత పవర్ ఆఫ్ అటార్నీ.", type: "premium", downloads: "756", rating: "4.9" },
    ],
  },
};

export const TemplatesSection = ({ currentLanguage }: TemplatesSectionProps) => {
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;
  const { toast } = useToast();

  const handleDownload = (title: string, type: string) => {
    if (type === "premium") {
      toast({ title: "Premium Template", description: `Upgrade to download "${title}". Contact us for pricing.` });
    } else {
      toast({ title: "Downloading…", description: `"${title}" will be ready shortly.` });
    }
  };

  const handlePreview = (title: string) => {
    toast({ title: "Preview", description: `Opening preview for "${title}"…` });
  };

  return (
    <section id="templates" className="py-24 bg-muted/40">
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.templates.map((template, index) => (
            <div
              key={index}
              className="group bg-card border border-border flex flex-col hover-lift hover:border-primary/25 transition-colors"
            >
              {/* Top bar accent */}
              <div
                className={`h-1 w-full ${
                  template.type === "free" ? "bg-success" : "bg-accent"
                }`}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Badges row */}
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className={`inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 ${
                      template.type === "free"
                        ? "bg-success/10 text-success"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {template.type === "free" ? t.free : t.premium}
                  </span>
                  {index < 2 && (
                    <span className="inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-primary/8 text-primary">
                      {t.popular}
                    </span>
                  )}
                </div>

                {/* Title & desc */}
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2.5">
                  {template.title}
                </h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                  {template.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-muted-foreground font-sans mb-5 pb-5 border-b border-border">
                  <span className="flex items-center gap-1.5">
                    <Download className="h-3.5 w-3.5" />
                    {template.downloads} downloads
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    {template.rating}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownload(template.title, template.type)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium text-sm h-9 rounded-sm"
                  >
                    <Download className="h-3.5 w-3.5 mr-2" />
                    {t.downloadNow}
                  </Button>
                  <Button
                    onClick={() => handlePreview(template.title)}
                    variant="outline"
                    className="h-9 px-3 rounded-sm border-border hover:bg-muted/60 font-sans text-sm"
                    aria-label={t.preview}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
