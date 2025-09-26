import { Download, FileText, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TemplatesSectionProps {
  currentLanguage: string;
}

const translations = {
  en: {
    title: "Land Registration Templates",
    subtitle: "Professional, legal-compliant templates for all your land registration needs",
    downloadNow: "Download Now",
    preview: "Preview",
    free: "Free",
    premium: "Premium",
    popular: "Popular",
    templates: [
      {
        title: "Sale Deed Template",
        description: "Complete template for property sale transactions with all legal clauses",
        type: "free",
        downloads: "2,847",
        rating: "4.9"
      },
      {
        title: "Gift Deed Template", 
        description: "Template for property gift transfers between family members",
        type: "free",
        downloads: "1,923",
        rating: "4.8"
      },
      {
        title: "Partition Deed Template",
        description: "Legal template for property partition among co-owners",
        type: "premium",
        downloads: "1,245",
        rating: "4.9"
      },
      {
        title: "Mortgage Deed Template",
        description: "Comprehensive template for property mortgage documentation",
        type: "premium", 
        downloads: "987",
        rating: "4.7"
      },
      {
        title: "Lease Deed Template",
        description: "Professional template for long-term property lease agreements", 
        type: "free",
        downloads: "3,156",
        rating: "4.8"
      },
      {
        title: "Power of Attorney Template",
        description: "Legal template for property-related power of attorney documentation",
        type: "premium",
        downloads: "756",
        rating: "4.9"
      }
    ]
  },
  hi: {
    title: "भूमि पंजीकरण टेम्प्लेट",
    subtitle: "आपकी सभी भूमि पंजीकरण आवश्यकताओं के लिए व्यावसायिक, कानूनी-अनुपालन टेम्प्लेट",
    downloadNow: "अभी डाउनलोड करें",
    preview: "पूर्वावलोकन",
    free: "मुफ़्त",
    premium: "प्रीमियम",
    popular: "लोकप्रिय",
    templates: [
      {
        title: "बिक्री विलेख टेम्प्लेट",
        description: "सभी कानूनी खंडों के साथ संपत्ति बिक्री लेनदेन के लिए पूर्ण टेम्प्लेट",
        type: "free",
        downloads: "2,847",
        rating: "4.9"
      },
      {
        title: "उपहार विलेख टेम्प्लेट",
        description: "परिवार के सदस्यों के बीच संपत्ति उपहार स्थानांतरण के लिए टेम्प्लेट",
        type: "free", 
        downloads: "1,923",
        rating: "4.8"
      },
      {
        title: "विभाजन विलेख टेम्प्लेट",
        description: "सह-मालिकों के बीच संपत्ति विभाजन के लिए कानूनी टेम्प्लेट",
        type: "premium",
        downloads: "1,245", 
        rating: "4.9"
      },
      {
        title: "बंधक विलेख टेम्प्लेट", 
        description: "संपत्ति बंधक दस्तावेज़ीकरण के लिए व्यापक टेम्प्लेट",
        type: "premium",
        downloads: "987",
        rating: "4.7"
      },
      {
        title: "पट्टा विलेख टेम्प्लेट",
        description: "दीर्घकालिक संपत्ति पट्टा समझौतों के लिए व्यावसायिक टेम्प्लेट",
        type: "free",
        downloads: "3,156", 
        rating: "4.8"
      },
      {
        title: "मुख्तारनामा टेम्प्लेट",
        description: "संपत्ति संबंधी मुख्तारनामा दस्तावेज़ीकरण के लिए कानूनी टेम्प्लेट",
        type: "premium",
        downloads: "756",
        rating: "4.9"
      }
    ]
  },
  kn: {
    title: "ಭೂಮಿ ನೋಂದಣಿ ಟೆಂಪ್ಲೇಟ್‌ಗಳು",
    subtitle: "ನಿಮ್ಮ ಎಲ್ಲಾ ಭೂಮಿ ನೋಂದಣಿ ಅಗತ್ಯಗಳಿಗಾಗಿ ವೃತ್ತಿಪರ, ಕಾನೂನು-ಅನುಪಾಲನೆ ಟೆಂಪ್ಲೇಟ್‌ಗಳು",
    downloadNow: "ಈಗ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    preview: "ಪೂರ್ವವೀಕ್ಷಣೆ",
    free: "ಉಚಿತ",
    premium: "ಪ್ರೀಮಿಯಂ",
    popular: "ಜನಪ್ರಿಯ",
    templates: [
      {
        title: "ಮಾರಾಟ ಪತ್ರ ಟೆಂಪ್ಲೇಟ್",
        description: "ಎಲ್ಲಾ ಕಾನೂನು ಷರತ್ತುಗಳೊಂದಿಗೆ ಆಸ್ತಿ ಮಾರಾಟ ವಹಿವಾಟುಗಳಿಗೆ ಸಂಪೂರ್ಣ ಟೆಂಪ್ಲೇಟ್",
        type: "free",
        downloads: "2,847",
        rating: "4.9"
      },
      {
        title: "ಉಡುಗೊರೆ ಪತ್ರ ಟೆಂಪ್ಲೇಟ್",
        description: "ಕುಟುಂಬ ಸದಸ್ಯರ ನಡುವೆ ಆಸ್ತಿ ಉಡುಗೊರೆ ವರ್ಗಾವಣೆಗಾಗಿ ಟೆಂಪ್ಲೇಟ್",
        type: "free",
        downloads: "1,923",
        rating: "4.8"
      },
      {
        title: "ವಿಭಾಗ ಪತ್ರ ಟೆಂಪ್ಲೇಟ್",
        description: "ಸಹ-ಮಾಲೀಕರ ನಡುವೆ ಆಸ್ತಿ ವಿಭಾಗಕ್ಕಾಗಿ ಕಾನೂನು ಟೆಂಪ್ಲೇಟ್",
        type: "premium",
        downloads: "1,245",
        rating: "4.9"
      },
      {
        title: "ಅಡಮಾನ ಪತ್ರ ಟೆಂಪ್ಲೇಟ್",
        description: "ಆಸ್ತಿ ಅಡಮಾನ ದಾಖಲಾತಿಗಾಗಿ ಸಂಪೂರ್ಣ ಟೆಂಪ್ಲೇಟ್",
        type: "premium",
        downloads: "987",
        rating: "4.7"
      },
      {
        title: "ಬಾಡಿಗೆ ಪತ್ರ ಟೆಂಪ್ಲೇಟ್",
        description: "ದೀರ್ಘಾವಧಿ ಆಸ್ತಿ ಬಾಡಿಗೆ ಒಪ್ಪಂದಗಳಿಗಾಗಿ ವೃತ್ತಿಪರ ಟೆಂಪ್ಲೇಟ್",
        type: "free",
        downloads: "3,156",
        rating: "4.8"
      },
      {
        title: "ಅಧಿಕಾರ ಪತ್ರ ಟೆಂಪ್ಲೇಟ್",
        description: "ಆಸ್ತಿ-ಸಂಬಂಧಿತ ಅಧಿಕಾರ ಪತ್ರ ದಾಖಲಾತಿಗಾಗಿ ಕಾನೂನು ಟೆಂಪ್ಲೇಟ್",
        type: "premium",
        downloads: "756",
        rating: "4.9"
      }
    ]
  },
  mr: {
    title: "जमीन नोंदणी टेम्प्लेट्स",
    subtitle: "तुमच्या सर्व जमीन नोंदणी गरजांसाठी व्यावसायिक, कायदेशीर-अनुपालन टेम्प्लेट्स",
    downloadNow: "आता डाउनलोड करा",
    preview: "पूर्वावलोकन",
    free: "विनामूल्य",
    premium: "प्रीमियम",
    popular: "लोकप्रिय",
    templates: [
      {
        title: "विक्री पत्र टेम्प्लेट",
        description: "सर्व कायदेशीर कलमांसह मालमत्ता विक्री व्यवहारांसाठी संपूर्ण टेम्प्लेट",
        type: "free",
        downloads: "2,847",
        rating: "4.9"
      },
      {
        title: "भेट पत्र टेम्प्लेट",
        description: "कुटुंबातील सदस्यांमधील मालमत्ता भेट हस्तांतरणासाठी टेम्प्लेट",
        type: "free",
        downloads: "1,923",
        rating: "4.8"
      },
      {
        title: "फाळणी पत्र टेम्प्लेट",
        description: "सहमालकांमधील मालमत्ता फाळणीसाठी कायदेशीर टेम्प्लेट",
        type: "premium",
        downloads: "1,245",
        rating: "4.9"
      },
      {
        title: "गहाण पत्र टेम्प्लेट",
        description: "मालमत्ता गहाण दस्तऐवजीकरणासाठी व्यापक टेम्प्लेट",
        type: "premium",
        downloads: "987",
        rating: "4.7"
      },
      {
        title: "भाडे पत्र टेम्प्लेट",
        description: "दीर्घकालीन मालमत्ता भाडे करारांसाठी व्यावसायिक टेम्प्लेट",
        type: "free",
        downloads: "3,156",
        rating: "4.8"
      },
      {
        title: "मुख्तारनामा टेम्प्लेट",
        description: "मालमत्ता-संबंधित मुख्तारनामा दस्तऐवजीकरणासाठी कायदेशीर टेम्प्लेट",
        type: "premium",
        downloads: "756",
        rating: "4.9"
      }
    ]
  },
  te: {
    title: "భూమి నమోదు టెంప్లేట్లు",
    subtitle: "మీ అన్ని భూమి నమోదు అవసరాలకు వృత్తిపరమైన, చట్టపరమైన-అనుపాలన టెంప్లేట్లు",
    downloadNow: "ఇప్పుడే డౌన్లోడ్ చేయండి",
    preview: "మునుపటి వీక్షణ",
    free: "ఉచితం",
    premium: "ప్రీమియం",
    popular: "ప్రజాదరణ",
    templates: [
      {
        title: "అమ్మకం పత్రం టెంప్లేట్",
        description: "అన్ని చట్టపరమైన నిబంధనలతో ఆస్తి అమ్మకం లావాదేవీలకు పూర్తి టెంప్లేట్",
        type: "free",
        downloads: "2,847",
        rating: "4.9"
      },
      {
        title: "బహుమతి పత్రం టెంప్లేట్",
        description: "కుటుంబ సభ్యుల మధ్య ఆస్తి బహుమతి బదిలీకి టెంప్లేట్",
        type: "free",
        downloads: "1,923",
        rating: "4.8"
      },
      {
        title: "విభజన పత్రం టెంప్లేట్",
        description: "సహ-యజమానుల మధ్య ఆస్తి విభజనకు చట్టపరమైన టెంప్లేట్",
        type: "premium",
        downloads: "1,245",
        rating: "4.9"
      },
      {
        title: "తనఖా పత్రం టెంప్లేట్",
        description: "ఆస్తి తనఖా డాక్యుమెంటేషన్‌కు సమగ్ర టెంప్లేట్",
        type: "premium",
        downloads: "987",
        rating: "4.7"
      },
      {
        title: "లీజు పత్రం టెంప్లేట్",
        description: "దీర్ఘకాలిక ఆస్తి లీజు ఒప్పందాలకు వృత్తిపరమైన టెంప్లేట్",
        type: "free",
        downloads: "3,156",
        rating: "4.8"
      },
      {
        title: "పవర్ ఆఫ్ అటార్నీ టెంప్లేట్",
        description: "ఆస్తి-సంబంధిత పవర్ ఆఫ్ అటార్నీ డాక్యుమెంటేషన్‌కు చట్టపరమైన టెంప్లేట్",
        type: "premium",
        downloads: "756",
        rating: "4.9"
      }
    ]
  }
};

export const TemplatesSection = ({ currentLanguage }: TemplatesSectionProps) => {
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.templates.map((template, index) => (
            <Card 
              key={index} 
              className="bg-card shadow-card hover-lift border-0 animate-fade-in-up" 
              style={{animationDelay: `${0.1 * index}s`}}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge 
                    variant={template.type === 'free' ? 'secondary' : 'default'}
                    className={template.type === 'free' ? 'bg-success text-success-foreground' : 'bg-gradient-primary text-primary-foreground'}
                  >
                    {template.type === 'free' ? t.free : t.premium}
                  </Badge>
                  {index < 2 && (
                    <Badge variant="outline" className="text-accent border-accent">
                      {t.popular}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {template.description}
                </p>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    {template.downloads}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {template.rating}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-gradient-primary hover:shadow-glow">
                    <Download className="h-4 w-4 mr-2" />
                    {t.downloadNow}
                  </Button>
                  <Button variant="outline" className="hover-lift">
                    {t.preview}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};