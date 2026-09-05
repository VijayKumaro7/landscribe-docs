import { createContext, useCallback, useContext } from "react";
import type { LanguageCode, Translations } from "./config";
import { localizePath } from "./routes";

export interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

/**
 * Convenience hook: pick the current language's entry from a translation
 * table, falling back to English.
 */
export function useTranslation<T>(table: Translations<T>): T {
  const { language } = useLanguage();
  return table[language] ?? table.en;
}

/**
 * Maps a canonical path ("/", "/services") onto the current language's URL.
 * Every internal link goes through this so navigating never drops the
 * visitor's language.
 */
export function useLocalizedPath(): (path: string) => string {
  const { language } = useLanguage();
  return useCallback((path: string) => localizePath(path, language), [language]);
}
