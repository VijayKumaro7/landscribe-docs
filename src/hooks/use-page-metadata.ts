import { useEffect } from "react";
import { alternatePaths, DEFAULT_LANGUAGE, localizePath, useLanguage } from "@/i18n";

/** Origin the canonical, og:url and hreflang tags point at. */
const SITE_URL = "https://landdocs.com";
const SITE_NAME = "LandDocs";

/** Marks the hreflang tags this hook owns, so it can replace its own. */
const ALTERNATE_FLAG = "data-page-alternate";

interface PageMetadata {
  /** Page-specific part of the title; the site name is appended. */
  title: string;
  description: string;
  /** Canonical, language-independent path, e.g. "/services". */
  path: string;
  /** Keeps the page out of search results and drops its canonical URL. */
  noindex?: boolean;
}

function setAttribute(selector: string, attribute: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attribute, value);
}

function setAlternates(path: string) {
  document.head.querySelectorAll(`link[${ALTERNATE_FLAG}]`).forEach((el) => el.remove());
  const entries = [
    ...alternatePaths(path).map((a) => [a.language as string, a.path] as const),
    // x-default points at the unprefixed English page.
    ["x-default", localizePath(path, DEFAULT_LANGUAGE)] as const,
  ];
  for (const [hreflang, localized] of entries) {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hreflang);
    link.setAttribute("href", `${SITE_URL}${localized}`);
    link.setAttribute(ALTERNATE_FLAG, "");
    document.head.appendChild(link);
  }
}

/**
 * Keeps the document title and the sharing, canonical and hreflang tags in
 * step with the route and the current language. Client-side routing leaves
 * the tags from index.html in place, so without this every page reports
 * itself as the English landing page to bookmarks, link previews and crawlers.
 */
export function usePageMetadata({ title, description, path, noindex = false }: PageMetadata) {
  const { language } = useLanguage();

  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${localizePath(path, language)}`;

    document.title = fullTitle;
    setAttribute('meta[name="description"]', "content", description);
    setAttribute('meta[property="og:title"]', "content", fullTitle);
    setAttribute('meta[property="og:description"]', "content", description);
    setAttribute('meta[property="og:url"]', "content", url);
    setAttribute('meta[property="og:locale"]', "content", language);
    setAttribute('meta[name="twitter:title"]', "content", fullTitle);
    setAttribute('meta[name="twitter:description"]', "content", description);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    // A page we don't want indexed shouldn't nominate a canonical URL, and
    // shouldn't advertise translations of itself either.
    if (noindex) {
      canonical?.removeAttribute("href");
      document.head.querySelectorAll(`link[${ALTERNATE_FLAG}]`).forEach((el) => el.remove());
    } else {
      canonical?.setAttribute("href", url);
      setAlternates(path);
    }

    let robots = document.head.querySelector('meta[name="robots"]');
    if (noindex && !robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    if (noindex) robots?.setAttribute("content", "noindex");
    else robots?.remove();
  }, [title, description, path, noindex, language]);
}
