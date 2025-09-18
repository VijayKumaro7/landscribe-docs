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