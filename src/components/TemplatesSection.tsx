import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { DocumentPreviewDialog } from "./DocumentPreviewDialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, useTranslation, type Translations } from "@/i18n";
import { DEED_TYPES, FEATURED_DEED_IDS, documentUrl, type DeedTypeInfo } from "@/data/documents";
import { downloadFile } from "@/lib/download";

interface TemplatesStrings {
  eyebrow: string;
  title: string;
  subtitle: string;
  downloadNow: string;
  preview: string;
  free: string;
  premium: string;
  popular: string;
  downloadsSuffix: string;
  viewLibrary: string;
  downloadStarted: string;
  demoWatermarkNote: string;
}

const translations: Translations<TemplatesStrings> = {
  en: {
    eyebrow: "Document Library",
    title: "Legal Templates for Every Need",
    subtitle: "Professionally drafted, legally compliant templates for all major land registration transactions.",
    downloadNow: "Download",
    preview: "Preview",
    free: "Free",
    premium: "Premium",
    popular: "Popular",
    downloadsSuffix: "downloads",
    viewLibrary: "Browse the full document library",
    downloadStarted: "Download started",
    demoWatermarkNote: "This is a watermarked demo document with sample data.",
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
    downloadsSuffix: "डाउनलोड",
    viewLibrary: "पूरी दस्तावेज़ लाइब्रेरी देखें",
    downloadStarted: "डाउनलोड शुरू हुआ",
    demoWatermarkNote: "यह नमूना डेटा वाला वॉटरमार्क किया गया डेमो दस्तावेज़ है।",
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
    downloadsSuffix: "ಡೌನ್‌ಲೋಡ್‌ಗಳು",
    viewLibrary: "ಸಂಪೂರ್ಣ ದಾಖಲೆ ಗ್ರಂಥಾಲಯ ವೀಕ್ಷಿಸಿ",
    downloadStarted: "ಡೌನ್‌ಲೋಡ್ ಪ್ರಾರಂಭವಾಗಿದೆ",
    demoWatermarkNote: "ಇದು ಮಾದರಿ ಡೇಟಾದೊಂದಿಗೆ ವಾಟರ್‌ಮಾರ್ಕ್ ಮಾಡಿದ ಡೆಮೊ ದಾಖಲೆ.",
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
    downloadsSuffix: "डाउनलोड",
    viewLibrary: "संपूर्ण दस्तऐवज लायब्ररी पहा",
    downloadStarted: "डाउनलोड सुरू झाले",
    demoWatermarkNote: "हा नमुना डेटासह वॉटरमार्क केलेला डेमो दस्तऐवज आहे.",
  },
  ta: {
    eyebrow: "ஆவண நூலகம்",
    title: "ஒவ்வொரு தேவைக்கும் சட்ட வார்ப்புருக்கள்",
    subtitle: "அனைத்து முக்கிய நிலப் பதிவு பரிவர்த்தனைகளுக்கும் தொழில்முறையாக உருவாக்கப்பட்ட வார்ப்புருக்கள்.",
    downloadNow: "பதிவிறக்கு",
    preview: "முன்னோட்டம்",
    free: "இலவசம்",
    premium: "பிரீமியம்",
    popular: "பிரபலம்",
    downloadsSuffix: "பதிவிறக்கங்கள்",
    viewLibrary: "முழு ஆவண நூலகத்தைப் பார்க்க",
    downloadStarted: "பதிவிறக்கம் தொடங்கியது",
    demoWatermarkNote: "இது மாதிரி தரவுகளுடன் நீர்முத்திரையிடப்பட்ட டெமோ ஆவணம்.",
  },
  te: {
    eyebrow: "డాక్యుమెంట్ లైబ్రరీ",
    title: "ప్రతి అవసరానికి చట్టపరమైన టెంప్లేట్లు",
    subtitle: "అన్ని ప్రధాన భూమి నమోదు లావాదేవీలకు వృత్తిపరంగా రూపొందించిన టెంప్లేట్లు.",
    downloadNow: "డౌన్లోడ్",
    preview: "ప్రివ్యూ",
    free: "ఉచితం",
    premium: "ప్రీమియం",
    popular: "ప్రజాదరణ",
    downloadsSuffix: "డౌన్లోడ్లు",
    viewLibrary: "పూర్తి డాక్యుమెంట్ లైబ్రరీని చూడండి",
    downloadStarted: "డౌన్లోడ్ ప్రారంభమైంది",
    demoWatermarkNote: "ఇది నమూనా డేటాతో వాటర్‌మార్క్ చేసిన డెమో పత్రం.",
  },
};

export const TemplatesSection = () => {
  const t = useTranslation(translations);
  const { language } = useLanguage();
  const { toast } = useToast();
  const [preview, setPreview] = useState<DeedTypeInfo | null>(null);

  const featured = FEATURED_DEED_IDS.map((id) => DEED_TYPES.find((d) => d.id === id)!).filter(Boolean);

  const handleDownload = (deed: DeedTypeInfo) => {
    const title = deed.labels[language].title;
    downloadFile(documentUrl(deed.id, language), `${deed.id}-${language}-demo.pdf`);
    toast({ title: t.downloadStarted, description: `${title} — ${t.demoWatermarkNote}` });
  };

  return (
    <section id="templates" className="py-16 sm:py-20 md:py-24 bg-muted/40">
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((deed, index) => {
            const label = deed.labels[language] ?? deed.labels.en;
            return (
              <Reveal
                key={deed.id}
                delay={(index % 3) * 90}
                className="group bg-card border border-border flex flex-col h-full hover-lift hover:border-primary/25"
              >
                {/* Top bar accent */}
                <div className={`h-1 w-full ${deed.tier === "free" ? "bg-success" : "bg-accent"}`} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Badges row */}
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className={`inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 ${
                        deed.tier === "free" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                      }`}
                    >
                      {deed.tier === "free" ? t.free : t.premium}
                    </span>
                    {index < 2 && (
                      <span className="inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-primary/8 text-primary">
                        {t.popular}
                      </span>
                    )}
                  </div>

                  {/* Title & desc */}
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2.5">
                    {label.title}
                  </h3>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                    {label.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-sans mb-5 pb-5 border-b border-border">
                    <span className="flex items-center gap-1.5">
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      {deed.downloads} {t.downloadsSuffix}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden="true" />
                      {deed.rating}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(deed)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium text-sm h-9 rounded-sm"
                    >
                      <Download className="h-3.5 w-3.5 mr-2" aria-hidden="true" />
                      {t.downloadNow}
                    </Button>
                    <Button
                      onClick={() => setPreview(deed)}
                      variant="outline"
                      className="h-9 px-3 rounded-sm border-border hover:bg-muted/60 font-sans text-sm"
                      aria-label={`${t.preview}: ${label.title}`}
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Link to the full library */}
        <Reveal className="text-center mt-10 md:mt-12">
          <Button
            asChild
            variant="outline"
            className="rounded-sm font-sans font-medium border-primary/30 text-primary hover:bg-primary/5 hover:text-primary h-11 px-6"
          >
            <Link to="/library">
              {t.viewLibrary}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>

      <DocumentPreviewDialog
        open={preview !== null}
        onOpenChange={(open) => !open && setPreview(null)}
        title={preview ? (preview.labels[language] ?? preview.labels.en).title : ""}
        url={preview ? documentUrl(preview.id, language) : null}
        downloadName={preview ? `${preview.id}-${language}-demo.pdf` : undefined}
      />
    </section>
  );
};
