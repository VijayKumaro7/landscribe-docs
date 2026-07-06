/** Languages the entire product (UI + document library) supports. */
export const LANGUAGE_CODES = ["en", "hi", "kn", "mr", "ta", "te"] as const;

export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
];

/** A per-language table of translated values. */
export type Translations<T> = Record<LanguageCode, T>;

export const LANGUAGE_STORAGE_KEY = "landdocs.language";

export function isLanguageCode(value: string | null): value is LanguageCode {
  return !!value && (LANGUAGE_CODES as readonly string[]).includes(value);
}
