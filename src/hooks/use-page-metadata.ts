import { useEffect } from "react";

/** Origin the canonical and og:url tags point at. */
const SITE_URL = "https://landdocs.com";
const SITE_NAME = "LandDocs";

interface PageMetadata {
  /** Page-specific part of the title; the site name is appended. */
  title: string;
  description: string;
  /** Path this page canonicalises to, e.g. "/services". */
  path: string;
  /** Keeps the page out of search results and drops its canonical URL. */
  noindex?: boolean;
}

function setAttribute(selector: string, attribute: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attribute, value);
}

/**
 * Keeps the document title and the sharing/canonical tags in step with the
 * route. Client-side routing leaves the tags from index.html in place, so
 * without this every page reports itself as the landing page to bookmarks,
 * link previews and crawlers.
 */
export function usePageMetadata({ title, description, path, noindex = false }: PageMetadata) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setAttribute('meta[name="description"]', "content", description);
    setAttribute('meta[property="og:title"]', "content", fullTitle);
    setAttribute('meta[property="og:description"]', "content", description);
    setAttribute('meta[property="og:url"]', "content", url);
    setAttribute('meta[name="twitter:title"]', "content", fullTitle);
    setAttribute('meta[name="twitter:description"]', "content", description);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    // A page we don't want indexed shouldn't nominate a canonical URL either.
    if (noindex) canonical?.removeAttribute("href");
    else canonical?.setAttribute("href", url);

    let robots = document.head.querySelector('meta[name="robots"]');
    if (noindex && !robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    if (noindex) robots?.setAttribute("content", "noindex");
    else robots?.remove();
  }, [title, description, path, noindex]);
}
