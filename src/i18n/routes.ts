import { LANGUAGE_CODES, isLanguageCode, type LanguageCode } from "./config";

/**
 * English is served from the unprefixed paths ("/", "/services") so existing
 * links and bookmarks keep working; every other language sits under its code
 * ("/kn", "/kn/services"). The unprefixed URLs are the canonical English ones,
 * which also makes them the natural x-default for hreflang.
 */
export const DEFAULT_LANGUAGE: LanguageCode = "en";

/** Language-independent paths the app routes to. */
export const APP_PATHS = ["/", "/services"] as const;
export type AppPath = (typeof APP_PATHS)[number];

/** Languages that appear as a URL prefix (everything except the default). */
export const PREFIXED_LANGUAGES = LANGUAGE_CODES.filter((c) => c !== DEFAULT_LANGUAGE);

function stripTrailingSlash(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

/** Build the URL for a canonical path in a given language. */
export function localizePath(path: string, language: LanguageCode): string {
  const clean = stripTrailingSlash(path.startsWith("/") ? path : `/${path}`);
  if (language === DEFAULT_LANGUAGE) return clean;
  return clean === "/" ? `/${language}` : `/${language}${clean}`;
}

/**
 * Split a pathname into the language it selects and the canonical path
 * underneath it. An unprefixed pathname resolves to the default language.
 */
export function parsePath(pathname: string): { language: LanguageCode; path: string } {
  const [, first = "", ...rest] = stripTrailingSlash(pathname).split("/");
  // "en" is never a prefix — /en/services is not a canonical URL.
  if (first !== DEFAULT_LANGUAGE && isLanguageCode(first)) {
    return { language: first, path: stripTrailingSlash(`/${rest.join("/")}`) || "/" };
  }
  return { language: DEFAULT_LANGUAGE, path: stripTrailingSlash(pathname) || "/" };
}

/** Every language's URL for one canonical path, for hreflang and sitemaps. */
export function alternatePaths(path: string): { language: LanguageCode; path: string }[] {
  return LANGUAGE_CODES.map((language) => ({ language, path: localizePath(path, language) }));
}
