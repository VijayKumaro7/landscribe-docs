import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LANGUAGE_STORAGE_KEY, isLanguageCode, type LanguageCode } from "./config";
import { DEFAULT_LANGUAGE, localizePath, parsePath } from "./routes";
import { LanguageContext } from "./context";

function readStoredLanguage(): LanguageCode | null {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguageCode(stored)) return stored;
  } catch {
    // localStorage unavailable (private mode, embedded webview) — fall through.
  }
  return null;
}

function storeLanguage(code: LanguageCode) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  } catch {
    // Persistence is best-effort.
  }
}

/**
 * The URL is the source of truth for the current language, so a page in any
 * language can be linked, shared and indexed. Changing language navigates
 * rather than only setting state.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, path } = parsePath(location.pathname);

  const setLanguage = useCallback(
    (code: LanguageCode) => {
      storeLanguage(code);
      navigate(
        { pathname: localizePath(path, code), search: location.search, hash: location.hash },
        { replace: false },
      );
    },
    [navigate, path, location.search, location.hash],
  );

  // Visitors who picked a language on a previous visit and then open an
  // unprefixed URL are sent to their language once, matching how the site
  // behaved before languages had their own URLs. Crawlers have no stored
  // preference, so they always see the canonical English page.
  const [redirectChecked, setRedirectChecked] = useState(false);
  const redirected = useRef(false);
  useEffect(() => {
    if (redirected.current) return;
    redirected.current = true;
    const stored = readStoredLanguage();
    const unprefixed = parsePath(location.pathname).language === DEFAULT_LANGUAGE
      && !location.pathname.startsWith(`/${DEFAULT_LANGUAGE}`);
    if (stored && stored !== DEFAULT_LANGUAGE && unprefixed) {
      navigate(
        { pathname: localizePath(path, stored), search: location.search, hash: location.hash },
        { replace: true },
      );
    }
    setRedirectChecked(true);
    // Runs once on mount; later navigations are explicit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the document language in sync for screen readers and font selection.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  // Avoid painting the default-language page for a frame before redirecting.
  if (!redirectChecked) return null;

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
