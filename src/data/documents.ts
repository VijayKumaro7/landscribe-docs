import type { LanguageCode, Translations } from "@/i18n";

/** Deed types for which demo documents exist. */
export const DEED_TYPE_IDS = [
  "sale-deed",
  "gift-deed",
  "lease-deed",
  "partition-deed",
  "mortgage-deed",
  "power-of-attorney",
  "rental-agreement",
  "affidavit",
] as const;

export type DeedTypeId = (typeof DEED_TYPE_IDS)[number];

export interface DeedTypeInfo {
  id: DeedTypeId;
  tier: "free" | "premium";
  /** Localized display name + short description. */
  labels: Translations<{ title: string; description: string }>;
  /** Vanity stats shown on template cards. */
  downloads: string;
  rating: string;
}

export const DEED_TYPES: DeedTypeInfo[] = [
  {
    id: "sale-deed",
    tier: "free",
    downloads: "2,847",
    rating: "4.9",
    labels: {
      en: { title: "Sale Deed", description: "Complete template for property sale transactions with all required legal clauses and schedules." },
      hi: { title: "बिक्री विलेख", description: "संपत्ति बिक्री लेनदेन के लिए पूर्ण टेम्प्लेट।" },
      kn: { title: "ಮಾರಾಟ ಪತ್ರ", description: "ಆಸ್ತಿ ಮಾರಾಟ ವ್ಯವಹಾರಗಳಿಗೆ ಸಂಪೂರ್ಣ ಟೆಂಪ್ಲೇಟ್." },
      mr: { title: "विक्री पत्र", description: "मालमत्ता विक्री व्यवहारांसाठी संपूर्ण टेम्प्लेट." },
      ta: { title: "விற்பனைப் பத்திரம்", description: "சொத்து விற்பனை பரிவர்த்தனைகளுக்கான முழுமையான வார்ப்புரு." },
      te: { title: "అమ్మకం పత్రం", description: "ఆస్తి అమ్మకం లావాదేవీలకు పూర్తి టెంప్లేట్." },
    },
  },
  {
    id: "gift-deed",
    tier: "free",
    downloads: "1,923",
    rating: "4.8",
    labels: {
      en: { title: "Gift Deed", description: "Legally valid template for transferring property as a gift between family members." },
      hi: { title: "उपहार विलेख", description: "परिवार के सदस्यों के बीच संपत्ति उपहार स्थानांतरण।" },
      kn: { title: "ಉಡುಗೊರೆ ಪತ್ರ", description: "ಕುಟುಂಬ ಸದಸ್ಯರ ನಡುವೆ ಆಸ್ತಿ ವರ್ಗಾವಣೆ." },
      mr: { title: "भेट पत्र", description: "कुटुंबातील सदस्यांमधील मालमत्ता हस्तांतरण." },
      ta: { title: "தானப் பத்திரம்", description: "குடும்ப உறுப்பினர்களிடையே சொத்தை அன்பளிப்பாக மாற்றுவதற்கான வார்ப்புரு." },
      te: { title: "బహుమతి పత్రం", description: "కుటుంబ సభ్యుల మధ్య ఆస్తి బదిలీ." },
    },
  },
  {
    id: "lease-deed",
    tier: "free",
    downloads: "3,156",
    rating: "4.8",
    labels: {
      en: { title: "Lease Deed", description: "Professional long-term lease agreement template with renewal and termination clauses." },
      hi: { title: "पट्टा विलेख", description: "दीर्घकालिक संपत्ति पट्टा समझौते।" },
      kn: { title: "ಬಾಡಿಗೆ ಪತ್ರ", description: "ದೀರ್ಘಾವಧಿ ಆಸ್ತಿ ಬಾಡಿಗೆ ಒಪ್ಪಂದ." },
      mr: { title: "भाडे पत्र", description: "दीर्घकालीन मालमत्ता भाडे करार." },
      ta: { title: "குத்தகைப் பத்திரம்", description: "புதுப்பித்தல் மற்றும் முடிவுறுத்தல் விதிகளுடன் நீண்டகால குத்தகை ஒப்பந்தம்." },
      te: { title: "లీజు పత్రం", description: "దీర్ఘకాలిక ఆస్తి లీజు ఒప్పందం." },
    },
  },
  {
    id: "partition-deed",
    tier: "premium",
    downloads: "1,245",
    rating: "4.9",
    labels: {
      en: { title: "Partition Deed", description: "Comprehensive template for partitioning jointly-owned property among co-owners." },
      hi: { title: "विभाजन विलेख", description: "सह-मालिकों के बीच संपत्ति विभाजन।" },
      kn: { title: "ವಿಭಾಗ ಪತ್ರ", description: "ಸಹ-ಮಾಲೀಕರ ನಡುವೆ ಆಸ್ತಿ ವಿಭಾಗ." },
      mr: { title: "फाळणी पत्र", description: "सहमालकांमधील मालमत्ता फाळणी." },
      ta: { title: "பாகப்பிரிவினைப் பத்திரம்", description: "கூட்டு உரிமையாளர்களிடையே சொத்தைப் பிரிப்பதற்கான வார்ப்புரு." },
      te: { title: "విభజన పత్రం", description: "సహ-యజమానుల మధ్య ఆస్తి విభజన." },
    },
  },
  {
    id: "mortgage-deed",
    tier: "premium",
    downloads: "987",
    rating: "4.7",
    labels: {
      en: { title: "Mortgage Deed", description: "Detailed mortgage documentation template covering all statutory requirements." },
      hi: { title: "बंधक विलेख", description: "संपत्ति बंधक दस्तावेज़ीकरण।" },
      kn: { title: "ಅಡಮಾನ ಪತ್ರ", description: "ಆಸ್ತಿ ಅಡಮಾನ ದಾಖಲಾತಿ." },
      mr: { title: "गहाण पत्र", description: "मालमत्ता गहाण दस्तऐवजीकरण." },
      ta: { title: "அடமானப் பத்திரம்", description: "சட்டப்படியான அனைத்துத் தேவைகளையும் உள்ளடக்கிய அடமான ஆவண வார்ப்புரு." },
      te: { title: "తనఖా పత్రం", description: "ఆస్తి తనఖా డాక్యుమెంటేషన్." },
    },
  },
  {
    id: "power-of-attorney",
    tier: "premium",
    downloads: "756",
    rating: "4.9",
    labels: {
      en: { title: "Power of Attorney", description: "Legally binding POA template for property-related transactions and registrations." },
      hi: { title: "मुख्तारनामा", description: "संपत्ति संबंधी मुख्तारनामा दस्तावेज़ीकरण।" },
      kn: { title: "ಅಧಿಕಾರ ಪತ್ರ", description: "ಆಸ್ತಿ-ಸಂಬಂಧಿತ ಅಧಿಕಾರ ಪತ್ರ." },
      mr: { title: "मुख्तारनामा", description: "मालमत्ता-संबंधित मुख्तारनामा." },
      ta: { title: "அதிகாரப் பத்திரம்", description: "சொத்து தொடர்பான பரிவர்த்தனைகளுக்கான அதிகாரப் பத்திர வார்ப்புரு." },
      te: { title: "పవర్ ఆఫ్ అటార్నీ", description: "ఆస్తి-సంబంధిత పవర్ ఆఫ్ అటార్నీ." },
    },
  },
  {
    id: "rental-agreement",
    tier: "free",
    downloads: "4,012",
    rating: "4.8",
    labels: {
      en: { title: "Rental Agreement", description: "Standard 11-month residential rental agreement with deposit and notice terms." },
      hi: { title: "किराया अनुबंध", description: "जमा और नोटिस शर्तों के साथ 11 महीने का आवासीय किराया अनुबंध।" },
      kn: { title: "ಬಾಡಿಗೆ ಒಪ್ಪಂದ", description: "ಠೇವಣಿ ಮತ್ತು ನೋಟಿಸ್ ನಿಯಮಗಳೊಂದಿಗೆ 11 ತಿಂಗಳ ವಸತಿ ಬಾಡಿಗೆ ಒಪ್ಪಂದ." },
      mr: { title: "भाडेकरार", description: "ठेव आणि नोटीस अटींसह 11 महिन्यांचा निवासी भाडेकरार." },
      ta: { title: "வாடகை ஒப்பந்தம்", description: "வைப்புத்தொகை மற்றும் அறிவிப்பு விதிமுறைகளுடன் 11 மாத குடியிருப்பு வாடகை ஒப்பந்தம்." },
      te: { title: "అద్దె ఒప్పందం", description: "డిపాజిట్ మరియు నోటీసు షరతులతో 11 నెలల నివాస అద్దె ఒప్పందం." },
    },
  },
  {
    id: "affidavit",
    tier: "free",
    downloads: "2,203",
    rating: "4.7",
    labels: {
      en: { title: "Affidavit", description: "General-purpose sworn affidavit format for property and identity declarations." },
      hi: { title: "शपथ पत्र", description: "संपत्ति और पहचान घोषणाओं के लिए शपथ पत्र प्रारूप।" },
      kn: { title: "ಪ್ರಮಾಣ ಪತ್ರ", description: "ಆಸ್ತಿ ಮತ್ತು ಗುರುತಿನ ಘೋಷಣೆಗಳಿಗೆ ಪ್ರಮಾಣ ಪತ್ರ ನಮೂನೆ." },
      mr: { title: "प्रतिज्ञापत्र", description: "मालमत्ता आणि ओळख घोषणांसाठी प्रतिज्ञापत्र स्वरूप." },
      ta: { title: "பிரமாணப் பத்திரம்", description: "சொத்து மற்றும் அடையாள அறிவிப்புகளுக்கான உறுதிமொழி ஆவண வடிவம்." },
      te: { title: "ప్రమాణ పత్రం", description: "ఆస్తి మరియు గుర్తింపు ప్రకటనల కోసం ప్రమాణ పత్రం ఫార్మాట్." },
    },
  },
];

/** The six deed types shown on the landing page templates grid. */
export const FEATURED_DEED_IDS: DeedTypeId[] = [
  "sale-deed",
  "gift-deed",
  "partition-deed",
  "mortgage-deed",
  "lease-deed",
  "power-of-attorney",
];

export function getDeedType(id: DeedTypeId): DeedTypeInfo {
  // DEED_TYPES covers every DeedTypeId, so the lookup always succeeds.
  return DEED_TYPES.find((d) => d.id === id)!;
}

/** Public URL of a demo PDF for a deed type in a given language. */
export function documentUrl(type: DeedTypeId, language: LanguageCode): string {
  return `${import.meta.env.BASE_URL}documents/${type}-${language}.pdf`;
}

/** Runtime metadata produced by scripts/generate-demo-pdfs.mjs. */
export interface ManifestEntry {
  id: string;
  type: DeedTypeId;
  language: LanguageCode;
  title: string;
  file: string;
  pages: number;
  sizeKB: number;
  generatedAt: string;
}
