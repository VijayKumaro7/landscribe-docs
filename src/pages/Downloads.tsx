import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, Eye, FileText, FilterX, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DocumentPreviewDialog } from "@/components/DocumentPreviewDialog";
import { Reveal } from "@/components/Reveal";
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
  type DeedTypeInfo,
  type ManifestEntry,
} from "@/data/documents";
import { downloadFile } from "@/lib/download";

interface DownloadsStrings {
  eyebrow: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  languageFilter: string;
  typeFilter: string;
  allLanguages: string;
  allTypes: string;
  results: (n: number) => string;
  documentsInCategory: (n: number) => string;
  emptyTitle: string;
  emptyBody: string;
  clearFilters: string;
  preview: string;
  download: string;
  pages: (n: number) => string;
  free: string;
  premium: string;
  downloadStarted: string;
}

const downloadsT: Translations<DownloadsStrings> = {
  en: {
    eyebrow: "Document Downloads",
    title: "Download Legal Documents",
    subtitle:
      "All demo documents in one place, organized by category. Preview and download professionally formatted sample deeds in six languages — every file is watermarked and contains fictional data.",
    searchPlaceholder: "Search documents… (press / to focus)",
    languageFilter: "Language",
    typeFilter: "Category",
    allLanguages: "All languages",
    allTypes: "All categories",
    results: (n) => `${n} document${n === 1 ? "" : "s"}`,
    documentsInCategory: (n) => `${n} file${n === 1 ? "" : "s"}`,
    emptyTitle: "No documents match",
    emptyBody: "Try adjusting your search or clearing the filters.",
    clearFilters: "Clear filters",
    preview: "Preview",
    download: "Download",
    pages: (n) => `${n} page${n === 1 ? "" : "s"}`,
    free: "Free",
    premium: "Premium",
    downloadStarted: "Download started",
  },
  hi: {
    eyebrow: "दस्तावेज़ डाउनलोड",
    title: "कानूनी दस्तावेज़ डाउनलोड करें",
    subtitle:
      "सभी डेमो दस्तावेज़ एक ही स्थान पर, श्रेणी के अनुसार व्यवस्थित। छह भाषाओं में नमूना विलेख देखें और डाउनलोड करें — हर फ़ाइल वॉटरमार्क युक्त है और काल्पनिक डेटा रखती है।",
    searchPlaceholder: "दस्तावेज़ खोजें…",
    languageFilter: "भाषा",
    typeFilter: "श्रेणी",
    allLanguages: "सभी भाषाएं",
    allTypes: "सभी श्रेणियां",
    results: (n) => `${n} दस्तावेज़`,
    documentsInCategory: (n) => `${n} फ़ाइलें`,
    emptyTitle: "कोई दस्तावेज़ नहीं मिला",
    emptyBody: "अपनी खोज बदलें या फ़िल्टर साफ़ करें।",
    clearFilters: "फ़िल्टर साफ़ करें",
    preview: "पूर्वावलोकन",
    download: "डाउनलोड",
    pages: (n) => `${n} पृष्ठ`,
    free: "मुफ़्त",
    premium: "प्रीमियम",
    downloadStarted: "डाउनलोड शुरू हुआ",
  },
  kn: {
    eyebrow: "ದಾಖಲೆ ಡೌನ್‌ಲೋಡ್‌ಗಳು",
    title: "ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    subtitle:
      "ಎಲ್ಲಾ ಡೆಮೊ ದಾಖಲೆಗಳು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ, ವರ್ಗದ ಪ್ರಕಾರ ಜೋಡಿಸಲಾಗಿದೆ. ಆರು ಭಾಷೆಗಳಲ್ಲಿ ಮಾದರಿ ಪತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ ಮತ್ತು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ — ಪ್ರತಿ ಫೈಲ್ ವಾಟರ್‌ಮಾರ್ಕ್ ಹೊಂದಿದ್ದು ಕಾಲ್ಪನಿಕ ಡೇಟಾ ಒಳಗೊಂಡಿದೆ.",
    searchPlaceholder: "ದಾಖಲೆಗಳನ್ನು ಹುಡುಕಿ…",
    languageFilter: "ಭಾಷೆ",
    typeFilter: "ವರ್ಗ",
    allLanguages: "ಎಲ್ಲಾ ಭಾಷೆಗಳು",
    allTypes: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
    results: (n) => `${n} ದಾಖಲೆಗಳು`,
    documentsInCategory: (n) => `${n} ಫೈಲ್‌ಗಳು`,
    emptyTitle: "ಯಾವುದೇ ದಾಖಲೆ ಹೊಂದಿಕೆಯಾಗಲಿಲ್ಲ",
    emptyBody: "ನಿಮ್ಮ ಹುಡುಕಾಟ ಬದಲಿಸಿ ಅಥವಾ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ.",
    clearFilters: "ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ",
    preview: "ಪೂರ್ವವೀಕ್ಷಣೆ",
    download: "ಡೌನ್‌ಲೋಡ್",
    pages: (n) => `${n} ಪುಟಗಳು`,
    free: "ಉಚಿತ",
    premium: "ಪ್ರೀಮಿಯಂ",
    downloadStarted: "ಡೌನ್‌ಲೋಡ್ ಪ್ರಾರಂಭವಾಗಿದೆ",
  },
  mr: {
    eyebrow: "दस्तऐवज डाउनलोड",
    title: "कायदेशीर दस्तऐवज डाउनलोड करा",
    subtitle:
      "सर्व डेमो दस्तऐवज एकाच ठिकाणी, श्रेणीनुसार व्यवस्थित. सहा भाषांमध्ये नमुना दस्तऐवज पहा आणि डाउनलोड करा — प्रत्येक फाइल वॉटरमार्क केलेली असून काल्पनिक डेटा आहे.",
    searchPlaceholder: "दस्तऐवज शोधा…",
    languageFilter: "भाषा",
    typeFilter: "श्रेणी",
    allLanguages: "सर्व भाषा",
    allTypes: "सर्व श्रेण्या",
    results: (n) => `${n} दस्तऐवज`,
    documentsInCategory: (n) => `${n} फाइल्स`,
    emptyTitle: "कोणतेही दस्तऐवज जुळले नाहीत",
    emptyBody: "तुमचा शोध बदला किंवा फिल्टर साफ करा.",
    clearFilters: "फिल्टर साफ करा",
    preview: "पूर्वावलोकन",
    download: "डाउनलोड",
    pages: (n) => `${n} पाने`,
    free: "विनामूल्य",
    premium: "प्रीमियम",
    downloadStarted: "डाउनलोड सुरू झाले",
  },
  ta: {
    eyebrow: "ஆவணப் பதிவிறக்கங்கள்",
    title: "சட்ட ஆவணங்களைப் பதிவிறக்கவும்",
    subtitle:
      "அனைத்து டெமோ ஆவணங்களும் ஒரே இடத்தில், வகை வாரியாக ஒழுங்கமைக்கப்பட்டுள்ளன. ஆறு மொழிகளில் மாதிரி பத்திரங்களை முன்னோட்டமிட்டு பதிவிறக்கவும் — ஒவ்வொரு கோப்பும் நீர்முத்திரையுடன் கற்பனை தரவுகளைக் கொண்டுள்ளது.",
    searchPlaceholder: "ஆவணங்களைத் தேடுங்கள்…",
    languageFilter: "மொழி",
    typeFilter: "வகை",
    allLanguages: "அனைத்து மொழிகள்",
    allTypes: "அனைத்து வகைகள்",
    results: (n) => `${n} ஆவணங்கள்`,
    documentsInCategory: (n) => `${n} கோப்புகள்`,
    emptyTitle: "பொருந்தும் ஆவணங்கள் இல்லை",
    emptyBody: "உங்கள் தேடலை மாற்றவும் அல்லது வடிப்பான்களை அழிக்கவும்.",
    clearFilters: "வடிப்பான்களை அழி",
    preview: "முன்னோட்டம்",
    download: "பதிவிறக்கு",
    pages: (n) => `${n} பக்கங்கள்`,
    free: "இலவசம்",
    premium: "பிரீமியம்",
    downloadStarted: "பதிவிறக்கம் தொடங்கியது",
  },
  te: {
    eyebrow: "డాక్యుమెంట్ డౌన్లోడ్లు",
    title: "చట్టపరమైన పత్రాలను డౌన్లోడ్ చేయండి",
    subtitle:
      "అన్ని డెమో పత్రాలు ఒకే చోట, వర్గం వారీగా అమర్చబడ్డాయి. ఆరు భాషల్లో నమూనా పత్రాలను ప్రివ్యూ చేసి డౌన్లోడ్ చేయండి — ప్రతి ఫైల్ వాటర్‌మార్క్‌తో కల్పిత డేటాను కలిగి ఉంది.",
    searchPlaceholder: "పత్రాలను వెతకండి…",
    languageFilter: "భాష",
    typeFilter: "వర్గం",
    allLanguages: "అన్ని భాషలు",
    allTypes: "అన్ని వర్గాలు",
    results: (n) => `${n} పత్రాలు`,
    documentsInCategory: (n) => `${n} ఫైళ్లు`,
    emptyTitle: "సరిపోలే పత్రాలు లేవు",
    emptyBody: "మీ శోధనను మార్చండి లేదా ఫిల్టర్లను క్లియర్ చేయండి.",
    clearFilters: "ఫిల్టర్లను క్లియర్ చేయండి",
    preview: "ప్రివ్యూ",
    download: "డౌన్లోడ్",
    pages: (n) => `${n} పేజీలు`,
    free: "ఉచితం",
    premium: "ప్రీమియం",
    downloadStarted: "డౌన్లోడ్ ప్రారంభమైంది",
  },
};

interface DocEntry {
  key: string;
  deed: DeedTypeInfo;
  language: LanguageCode;
  languageName: string;
  nativeLanguageName: string;
  nativeTitle: string;
  url: string;
  meta?: ManifestEntry;
}

interface Category {
  deed: DeedTypeInfo;
  docs: DocEntry[];
}

async function fetchManifest(): Promise<ManifestEntry[]> {
  const res = await fetch(`${import.meta.env.BASE_URL}documents/manifest.json`);
  if (!res.ok) throw new Error(`Failed to load document manifest (${res.status})`);
  return res.json();
}

const Downloads = () => {
  const t = useTranslation(downloadsT);
  const { language } = useLanguage();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState<LanguageCode | "all">("all");
  const [typeFilter, setTypeFilter] = useState<DeedTypeId | "all">("all");
  const [preview, setPreview] = useState<DocEntry | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" focuses the search box.
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

  /** All documents grouped by deed-type category, with filters applied. */
  const categories = useMemo<Category[]>(() => {
    const manifestById = new Map((manifest ?? []).map((m) => [m.id, m]));
    const q = search.trim().toLowerCase();

    return DEED_TYPES
      .filter((deed) => typeFilter === "all" || deed.id === typeFilter)
      .map((deed) => {
        const docs = SUPPORTED_LANGUAGES
          .filter((lang) => langFilter === "all" || lang.code === langFilter)
          .map<DocEntry>((lang) => ({
            key: `${deed.id}-${lang.code}`,
            deed,
            language: lang.code,
            languageName: lang.name,
            nativeLanguageName: lang.nativeName,
            nativeTitle: deed.labels[lang.code].title,
            url: documentUrl(deed.id, lang.code),
            meta: manifestById.get(`${deed.id}-${lang.code}`),
          }))
          .filter((doc) => {
            if (!q) return true;
            return [
              doc.nativeTitle,
              doc.deed.labels[language].title,
              doc.deed.id,
              doc.languageName,
              doc.nativeLanguageName,
            ].some((field) => field.toLowerCase().includes(q));
          });
        return { deed, docs };
      })
      .filter((cat) => cat.docs.length > 0);
  }, [manifest, language, search, langFilter, typeFilter]);

  const totalDocs = categories.reduce((sum, cat) => sum + cat.docs.length, 0);
  const hasActiveFilters = search !== "" || langFilter !== "all" || typeFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setLangFilter("all");
    setTypeFilter("all");
  };

  const handleDownload = (doc: DocEntry) => {
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
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center mb-4">
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
          <p className="font-sans text-sm text-muted-foreground mb-8" role="status">
            {t.results(totalDocs)}
          </p>

          {/* Categories */}
          {isLoading && totalDocs === 0 ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-56" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-card border border-border p-5 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2 pt-1">
                      <Skeleton className="h-9 flex-1" />
                      <Skeleton className="h-9 flex-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : categories.length === 0 ? (
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
            <div className="space-y-12 sm:space-y-14">
              {categories.map(({ deed, docs }) => {
                const label = deed.labels[language];
                return (
                  <Reveal key={deed.id}>
                    <section aria-labelledby={`cat-${deed.id}`}>
                      {/* Category header */}
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                        <h2 id={`cat-${deed.id}`} className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                          {label.title}
                        </h2>
                        <span
                          className={`inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 ${
                            deed.tier === "free" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                          }`}
                        >
                          {deed.tier === "free" ? t.free : t.premium}
                        </span>
                        <span className="font-sans text-xs text-muted-foreground">
                          {t.documentsInCategory(docs.length)}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl mb-5">
                        {label.description}
                      </p>

                      {/* Language cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {docs.map((doc) => (
                          <article
                            key={doc.key}
                            className="group bg-card border border-border p-5 flex flex-col hover-lift hover:border-primary/25"
                          >
                            <div className="flex items-center justify-between mb-2.5">
                              <span className="inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-primary/8 text-primary">
                                {doc.nativeLanguageName}
                              </span>
                              {doc.languageName !== doc.nativeLanguageName && (
                                <span className="font-sans text-[11px] text-muted-foreground uppercase tracking-wide">
                                  {doc.languageName}
                                </span>
                              )}
                            </div>
                            <h3 className="font-serif text-base font-semibold text-foreground leading-snug mb-2">
                              {doc.nativeTitle}
                            </h3>
                            <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-sans mb-4">
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
                            <div className="flex gap-2 mt-auto">
                              <Button
                                onClick={() => setPreview(doc)}
                                variant="outline"
                                className="flex-1 h-9 rounded-sm border-border hover:bg-muted/60 font-sans text-sm"
                                aria-label={`${t.preview}: ${doc.nativeTitle} (${doc.languageName})`}
                              >
                                <Eye className="h-3.5 w-3.5 mr-2" aria-hidden="true" />
                                {t.preview}
                              </Button>
                              <Button
                                onClick={() => handleDownload(doc)}
                                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium text-sm h-9 rounded-sm"
                                aria-label={`${t.download}: ${doc.nativeTitle} (${doc.languageName})`}
                              >
                                <Download className="h-3.5 w-3.5 mr-2" aria-hidden="true" />
                                {t.download}
                              </Button>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                );
              })}
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

export default Downloads;
