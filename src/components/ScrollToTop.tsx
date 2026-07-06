import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores scroll position to the top on route changes (SPAs keep the old
 * scroll offset by default). Hash navigation is left to the page itself.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};
