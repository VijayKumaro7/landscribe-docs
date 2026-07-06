import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, Eye, FileText, FilterX, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DocumentPreviewDialog } from "@/components/DocumentPreviewDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  SUPPORTED_LANGUAGES,
  isLanguageCode,
  useLanguage,
  useTranslation,
  type LanguageCode,
  type Translations,
} from "@/i18n";
import {
  DEED_TYPES,
  documentUrl,
  type DeedTypeId,
  type ManifestEntry,
} from "@/data/documents";
import { downloadFile } from "@/lib/download";

interface LibraryStrings {
  eyebrow: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  languageFilter: string;
  typeFilter: string;
  allLanguages: string;
  allTypes: string;
  results: (n: number) => string;
  emptyTitle: string;
  emptyBody: string;
  clearFilters: string;
  preview: string;
  download: string;
  pages: (n: number) => string;
  free: string;
  premium: string;
  demoBadge: string;
  downloadStarted: string;
}

const libraryT: Translations<LibraryStrings> = {
  en: {
    eyebrow: "Demo Document Library",
    title: "Browse Sample Deed Documents",
    subtitle:
      "Preview and download professionally formatted demo deeds in six languages. All documents contain fictional data and are watermarked for demonstration.",
    searchPlaceholder: "Search documents… (press / to focus)",
    languageFilter: "Language",
    typeFilter: "Document type",
    allLanguages: "All languages",
    allTypes: "All types",
    results: (n) => `${n} document${n === 1 ? "" : "s"}`,
    emptyTitle: "No documents match",
    emptyBody: "Try adjusting your search or clearing the filters.",
    clearFilters: "Clear filters",
    preview: "Preview",
    download: "Download",
    pages: (n) => `${n} page${n === 1 ? "" : "s"}`,
    free: "Free",
    premium: "Premium",
    demoBadge: "Demo",
    downloadStarted: "Download started",
  },
  hi: {
    eyebrow: "डेमो दस्तावेज़ लाइब्रेरी",
    title: "नमूना विलेख दस्तावेज़ ब्राउज़ करें",
    subtitle: "छह भाषाओं में पेशेवर रूप से स्वरूपित डेमो विलेख देखें और डाउनलोड करें। सभी दस्तावेज़ों में काल्पनिक डेटा है।",
    searchPlaceholder: "दस्तावेज़ खोजें…",
    languageFilter: "भाषा",
    typeFilter: "दस्तावेज़ प्रकार",
    allLanguages: "सभी भाषाएं",
    allTypes: "सभी प्रकार",
    results: (n) => `${n} दस्तावेज़`,
    emptyTitle: "कोई दस्तावेज़ नहीं मिला",
    emptyBody: "अपनी खोज बदलें या फ़िल्टर साफ़ करें।",
    clearFilters: "फ़िल्टर साफ़ करें",
    preview: "पूर्वावलोकन",
    download: "डाउनलोड",
    pages: (n) => `${n} पृष्ठ`,
    free: "मुफ़्त",
    premium: "प्रीमियम",
    demoBadge: "डेमो",
    downloadStarted: "डाउनलोड शुरू हुआ",
  },
  kn: {
    eyebrow: "ಡೆಮೊ ದಾಖಲೆ ಗ್ರಂಥಾಲಯ",
    title: "ಮಾದರಿ ಪತ್ರ ದಾಖಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    subtitle: "ಆರು ಭಾಷೆಗಳಲ್ಲಿ ವೃತ್ತಿಪರ ಡೆಮೊ ಪತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ ಮತ್ತು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ. ಎಲ್ಲಾ ದಾಖಲೆಗಳಲ್ಲಿ ಕಾಲ್ಪನಿಕ ಡೇಟಾ ಇದೆ.",
    searchPlaceholder: "ದಾಖಲೆಗಳನ್ನು ಹುಡುಕಿ…",
    languageFilter: "ಭಾಷೆ",
    typeFilter: "ದಾಖಲೆ ಪ್ರಕಾರ",
    allLanguages: "ಎಲ್ಲಾ ಭಾಷೆಗಳು",
    allTypes: "ಎಲ್ಲಾ ಪ್ರಕಾರಗಳು",
    results: (n) => `${n} ದಾಖಲೆಗಳು`,
    emptyTitle: "ಯಾವುದೇ ದಾಖಲೆ ಹೊಂದಿಕೆಯಾಗಲಿಲ್ಲ",
    emptyBody: "ನಿಮ್ಮ ಹುಡುಕಾಟ ಬದಲಿಸಿ ಅಥವಾ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ.",
    clearFilters: "ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ",
    preview: "ಪೂರ್ವವೀಕ್ಷಣೆ",
    download: "ಡೌನ್‌ಲೋಡ್",
    pages: (n) => `${n} ಪುಟಗಳು`,
    free: "ಉಚಿತ",
    premium: "ಪ್ರೀಮಿಯಂ",
    demoBadge: "ಡೆಮೊ",
    downloadStarted: "ಡೌನ್‌ಲೋಡ್ ಪ್ರಾರಂಭವಾಗಿದೆ",
  },
  mr: {
    eyebrow: "डेमो दस्तऐवज लायब्ररी",
    title: "नमुना दस्तऐवज ब्राउझ करा",
    subtitle: "सहा भाषांमध्ये व्यावसायिक डेमो दस्तऐवज पहा आणि डाउनलोड करा. सर्व दस्तऐवजांमध्ये काल्पनिक डेटा आहे.",
    searchPlaceholder: "दस्तऐवज शोधा…",
    languageFilter: "भाषा",
    typeFilter: "दस्तऐवज प्रकार",
    allLanguages: "सर्व भाषा",
    allTypes: "सर्व प्रकार",
    results: (n) => `${n} दस्तऐवज`,
    emptyTitle: "कोणतेही दस्तऐवज जुळले नाहीत",
    emptyBody: "तुमचा शोध बदला किंवा फिल्टर साफ करा.",
    clearFilters: "फिल्टर साफ करा",
    preview: "पूर्वावलोकन",
    download: "डाउनलोड",
    pages: (n) => `${n} पाने`,
    free: "विनामूल्य",
    premium: "प्रीमियम",
    demoBadge: "डेमो",
    downloadStarted: "डाउनलोड सुरू झाले",
  },
  ta: {
    eyebrow: "டெமோ ஆவண நூலகம்",
    title: "மாதிரி பத்திர ஆவணங்களை உலாவுங்கள்",
    subtitle: "ஆறு மொழிகளில் தொழில்முறை டெமோ பத்திரங்களை முன்னோட்டமிட்டு பதிவிறக்கவும். அனைத்து ஆவணங்களிலும் கற்பனை தரவுகள் உள்ளன.",
    searchPlaceholder: "ஆவணங்களைத் தேடுங்கள்…",
    languageFilter: "மொழி",
    typeFilter: "ஆவண வகை",
    allLanguages: "அனைத்து மொழிகள்",
    allTypes: "அனைத்து வகைகள்",
    results: (n) => `${n} ஆவணங்கள்`,
    emptyTitle: "பொருந்தும் ஆவணங்கள் இல்லை",
    emptyBody: "உங்கள் தேடலை மாற்றவும் அல்லது வடிப்பான்களை அழிக்கவும்.",
    clearFilters: "வடிப்பான்களை அழி",
    preview: "முன்னோட்டம்",
    download: "பதிவிறக்கு",
    pages: (n) => `${n} பக்கங்கள்`,
    free: "இலவசம்",
    premium: "பிரீமியம்",
    demoBadge: "டெமோ",
    downloadStarted: "பதிவிறக்கம் தொடங்கியது",
  },
  te: {
    eyebrow: "డెమో డాక్యుమెంట్ లైబ్రరీ",
    title: "నమూనా పత్రాలను బ్రౌజ్ చేయండి",
    subtitle: "ఆరు భాషల్లో వృత్తిపరమైన డెమో పత్రాలను ప్రివ్యూ చేసి డౌన్లోడ్ చేయండి. అన్ని పత్రాల్లో కల్పిత డేటా ఉంది.",
    searchPlaceholder: "పత్రాలను వెతకండి…",
    languageFilter: "భాష",
    typeFilter: "పత్రం రకం",
    allLanguages: "అన్ని భాషలు",
    allTypes: "అన్ని రకాలు",
    results: (n) => `${n} పత్రాలు`,
    emptyTitle: "సరిపోలే పత్రాలు లేవు",
    emptyBody: "మీ శోధనను మార్చండి లేదా ఫిల్టర్లను క్లియర్ చేయండి.",
    clearFilters: "ఫిల్టర్లను క్లియర్ చేయండి",
    preview: "ప్రివ్యూ",
    download: "డౌన్లోడ్",
    pages: (n) => `${n} పేజీలు`,
    free: "ఉచితం",
    premium: "ప్రీమియం",
    demoBadge: "డెమో",
    downloadStarted: "డౌన్లోడ్ ప్రారంభమైంది",
  },
};

interface LibraryDoc {
  key: string;
  type: DeedTypeId;
  tier: "free" | "premium";
  language: LanguageCode;
  languageName: string;
  nativeLanguageName: string;
  /** Title in the document's own language. */
  nativeTitle: string;
  /** Title in the current UI language (for search/discovery). */
  uiTitle: string;
  description: string;
  url: string;
  meta?: ManifestEntry;
}

async function fetchManifest(): Promise<ManifestEntry[]> {
  const res = await fetch(`${import.meta.env.BASE_URL}documents/manifest.json`);
  if (!res.ok) throw new Error(`Failed to load document manifest (${res.status})`);
  return res.json();
}

const Library = () => {
  const t = useTranslation(libraryT);
  const { language } = useLanguage();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState<LanguageCode | "all">(language);
  const [typeFilter, setTypeFilter] = useState<DeedTypeId | "all">("all");
  const [preview, setPreview] = useState<LibraryDoc | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Follow the site language when the user switches it.
  useEffect(() => {
    setLangFilter(language);
  }, [language]);

  // "/" focuses the search box, Escape clears it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { data: manifest, isLoading } = useQuery({
    queryKey: ["document-manifest"],
    queryFn: fetchManifest,
  });

  const allDocs = useMemo<LibraryDoc[]>(() => {
    const manifestById = new Map((manifest ?? []).map((m) => [m.id, m]));
    return DEED_TYPES.flatMap((deed) =>
      SUPPORTED_LANGUAGES.map((lang) => {
        const key = `${deed.id}-${lang.code}`;
        return {
          key,
          type: deed.id,
          tier: deed.tier,
          language: lang.code,
          languageName: lang.name,
          nativeLanguageName: lang.nativeName,
          nativeTitle: deed.labels[lang.code].title,
          uiTitle: deed.labels[language].title,
          description: deed.labels[language].description,
          url: documentUrl(deed.id, lang.code),
          meta: manifestById.get(key),
        };
      })
    );
  }, [manifest, language]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allDocs.filter((doc) => {
      if (langFilter !== "all" && doc.language !== langFilter) return false;
      if (typeFilter !== "all" && doc.type !== typeFilter) return false;
      if (!q) return true;
      return [doc.nativeTitle, doc.uiTitle, doc.type, doc.languageName, doc.nativeLanguageName]
        .some((field) => field.toLowerCase().includes(q));
    });
  }, [allDocs, search, langFilter, typeFilter]);

  const hasActiveFilters = search !== "" || langFilter !== "all" || typeFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setLangFilter("all");
    setTypeFilter("all");
  };

  const handleDownload = (doc: LibraryDoc) => {
    downloadFile(doc.url, `${doc.key}-demo.pdf`);
    toast({ title: t.downloadStarted, description: `${doc.nativeTitle} (${doc.languageName})` });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />

      <main id="main-content" className="flex-1 pt-24 sm:pt-28 pb-16 sm:pb-24">
        <div className="container mx-auto px-5 sm:px-6">
          {/* Header */}
          <div className="max-w-2xl mb-10 sm:mb-12">
            <p className="font-sans text-accent font-semibold text-xs uppercase tracking-widest mb-4">
              {t.eyebrow}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="font-sans text-muted-foreground text-base sm:text-lg leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
              <Input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="pl-9 h-10 rounded-sm font-sans bg-card"
                aria-label={t.searchPlaceholder}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                value={langFilter}
                onValueChange={(v) => setLangFilter(v === "all" ? "all" : isLanguageCode(v) ? v : "all")}
              >
                <SelectTrigger className="w-full sm:w-44 h-10 rounded-sm font-sans bg-card" aria-label={t.languageFilter}>
                  <SelectValue placeholder={t.languageFilter} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allLanguages}</SelectItem>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.nativeName} · {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={typeFilter}
                onValueChange={(v) => setTypeFilter(v as DeedTypeId | "all")}
              >
                <SelectTrigger className="w-full sm:w-52 h-10 rounded-sm font-sans bg-card" aria-label={t.typeFilter}>
                  <SelectValue placeholder={t.typeFilter} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allTypes}</SelectItem>
                  {DEED_TYPES.map((deed) => (
                    <SelectItem key={deed.id} value={deed.id}>
                      {deed.labels[language].title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Result count */}
          <p className="font-sans text-sm text-muted-foreground mb-6" role="status">
            {t.results(filtered.length)}
          </p>

          {/* Grid */}
          {isLoading && filtered.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-card border border-border p-6 space-y-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-9 w-12" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20 sm:py-28 border border-dashed border-border bg-card/50">
              <div className="mx-auto mb-5 w-14 h-14 bg-muted flex items-center justify-center rounded-sm">
                <FileText className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
              </div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-2">{t.emptyTitle}</h2>
              <p className="font-sans text-sm text-muted-foreground mb-6">{t.emptyBody}</p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="rounded-sm font-sans">
                  <FilterX className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t.clearFilters}
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((doc) => (
                <article
                  key={doc.key}
                  className="group bg-card border border-border flex flex-col hover-lift hover:border-primary/25"
                >
                  <div className={`h-1 w-full ${doc.tier === "free" ? "bg-success" : "bg-accent"}`} aria-hidden="true" />
                  <div className="p-6 flex flex-col flex-1">
                    {/* Badges */}
                    <div className="flex items-center flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-primary/8 text-primary">
                        {doc.nativeLanguageName}
                      </span>
                      <span
                        className={`inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 ${
                          doc.tier === "free" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                        }`}
                      >
                        {doc.tier === "free" ? t.free : t.premium}
                      </span>
                      <span className="inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-muted text-muted-foreground">
                        {t.demoBadge}
                      </span>
                    </div>

                    {/* Titles */}
                    <h3 className="font-serif text-lg font-semibold text-foreground leading-snug mb-1">
                      {doc.nativeTitle}
                    </h3>
                    {doc.nativeTitle !== doc.uiTitle && (
                      <p className="font-sans text-xs text-muted-foreground mb-2">{doc.uiTitle}</p>
                    )}
                    <p className="font-sans text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                      {doc.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-sans mb-4 pb-4 border-b border-border">
                      <span className="uppercase tracking-wide">PDF</span>
                      {doc.meta ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{t.pages(doc.meta.pages)}</span>
                          <span aria-hidden="true">·</span>
                          <span>{doc.meta.sizeKB} KB</span>
                        </>
                      ) : isLoading ? (
                        <Skeleton className="h-3 w-20" />
                      ) : null}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setPreview(doc)}
                        variant="outline"
                        className="flex-1 h-9 rounded-sm border-border hover:bg-muted/60 font-sans text-sm"
                      >
                        <Eye className="h-3.5 w-3.5 mr-2" aria-hidden="true" />
                        {t.preview}
                      </Button>
                      <Button
                        onClick={() => handleDownload(doc)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium text-sm h-9 rounded-sm"
                      >
                        <Download className="h-3.5 w-3.5 mr-2" aria-hidden="true" />
                        {t.download}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <DocumentPreviewDialog
        open={preview !== null}
        onOpenChange={(open) => !open && setPreview(null)}
        title={preview ? `${preview.nativeTitle} · ${preview.languageName}` : ""}
        url={preview?.url ?? null}
        downloadName={preview ? `${preview.key}-demo.pdf` : undefined}
      />
    </div>
  );
};

export default Library;
