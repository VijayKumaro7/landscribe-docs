import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { LANGUAGE_STORAGE_KEY, isLanguageCode, type LanguageCode } from "./config";
import { LanguageContext } from "./context";

function readStoredLanguage(): LanguageCode {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguageCode(stored)) return stored;
  } catch {
    // localStorage unavailable (private mode, embedded webview) — fall through.
  }
  return "en";
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>(readStoredLanguage);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    } catch {
      // Persistence is best-effort.
    }
  }, []);

  // Keep the document language in sync for screen readers and font selection.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
