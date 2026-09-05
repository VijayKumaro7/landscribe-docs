import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, FileQuestion, LibraryBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageMetadata } from "@/hooks/use-page-metadata";
import { parsePath, useLocalizedPath, useTranslation, type Translations } from "@/i18n";

interface NotFoundStrings {
  eyebrow: string;
  title: string;
  body: string;
  home: string;
  documents: string;
}

const notFoundT: Translations<NotFoundStrings> = {
  en: {
    eyebrow: "Error 404",
    title: "Page not found",
    body: "The page you're looking for doesn't exist or may have been moved.",
    home: "Return to Home",
    documents: "Download Documents",
  },
  hi: {
    eyebrow: "त्रुटि 404",
    title: "पृष्ठ नहीं मिला",
    body: "आप जिस पृष्ठ को खोज रहे हैं वह मौजूद नहीं है या हटा दिया गया है।",
    home: "होम पर लौटें",
    documents: "दस्तावेज़ डाउनलोड करें",
  },
  kn: {
    eyebrow: "ದೋಷ 404",
    title: "ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ",
    body: "ನೀವು ಹುಡುಕುತ್ತಿರುವ ಪುಟ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ ಅಥವಾ ಸ್ಥಳಾಂತರಗೊಂಡಿರಬಹುದು.",
    home: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    documents: "ದಾಖಲೆಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
  },
  mr: {
    eyebrow: "त्रुटी 404",
    title: "पृष्ठ सापडले नाही",
    body: "तुम्ही शोधत असलेले पृष्ठ अस्तित्वात नाही किंवा हलवले गेले असावे.",
    home: "मुख्यपृष्ठावर परत जा",
    documents: "दस्तऐवज डाउनलोड करा",
  },
  ta: {
    eyebrow: "பிழை 404",
    title: "பக்கம் கிடைக்கவில்லை",
    body: "நீங்கள் தேடும் பக்கம் இல்லை அல்லது நகர்த்தப்பட்டிருக்கலாம்.",
    home: "முகப்புக்குத் திரும்பு",
    documents: "ஆவணங்களைப் பதிவிறக்கு",
  },
  te: {
    eyebrow: "లోపం 404",
    title: "పేజీ కనుగొనబడలేదు",
    body: "మీరు వెతుకుతున్న పేజీ లేదు లేదా తరలించబడి ఉండవచ్చు.",
    home: "హోమ్‌కు తిరిగి వెళ్లు",
    documents: "పత్రాలను డౌన్‌లోడ్ చేయండి",
  },
};

const NotFound = () => {
  const location = useLocation();
  const t = useTranslation(notFoundT);
  const localized = useLocalizedPath();

  usePageMetadata({
    title: t.title,
    description: t.body,
    // Strip any language prefix so the hook does not add a second one.
    path: parsePath(location.pathname).path,
    noindex: true,
  });

  useEffect(() => {
    console.warn(`404: no route matches "${location.pathname}"`);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 w-16 h-16 bg-primary/10 flex items-center justify-center rounded-sm">
          <FileQuestion className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <p className="font-sans text-accent font-semibold text-xs uppercase tracking-widest mb-3">{t.eyebrow}</p>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-3">{t.title}</h1>
        <p className="font-sans text-muted-foreground mb-8">{t.body}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm font-sans font-semibold h-11 px-6">
            <Link to={localized("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              {t.home}
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-sm font-sans font-medium h-11 px-6">
            <Link to={localized("/services")}>
              <LibraryBig className="h-4 w-4 mr-2" aria-hidden="true" />
              {t.documents}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
