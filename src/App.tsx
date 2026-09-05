import { lazy, Suspense, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import { DEFAULT_LANGUAGE, isLanguageCode, LanguageProvider, localizePath } from "@/i18n";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageLoader } from "@/components/PageLoader";
import Index from "./pages/Index";

// Secondary pages are code-split so the landing page loads as little JS as possible.
const Services = lazy(() => import("./pages/Services"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Guards the "/:lang/..." routes: an unknown prefix is a 404, and the default
 * language redirects to its canonical unprefixed URL so "/en/services" never
 * becomes a duplicate of "/services".
 */
const LocalizedRoute = ({ children }: { children: ReactNode }) => {
  const { lang = "" } = useParams();
  const { pathname } = useLocation();
  if (lang === DEFAULT_LANGUAGE) {
    return <Navigate to={pathname.slice(DEFAULT_LANGUAGE.length + 1) || "/"} replace />;
  }
  if (!isLanguageCode(lang)) return <NotFound />;
  return <>{children}</>;
};

/** Legacy path under a language prefix, e.g. /kn/downloads -> /kn/services. */
const LocalizedRedirect = ({ to }: { to: string }) => {
  const { lang = "" } = useParams();
  if (!isLanguageCode(lang)) return <NotFound />;
  return <Navigate to={localizePath(to, lang)} replace />;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {/* LanguageProvider reads the language out of the URL, so it has to
            sit inside the router. */}
        <BrowserRouter>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* English is unprefixed and canonical. */}
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<Services />} />
                  {/* Old URLs kept for bookmarks/links shared before the renames */}
                  <Route path="/downloads" element={<Navigate to="/services" replace />} />
                  <Route path="/library" element={<Navigate to="/services" replace />} />

                  {/* Every other language lives under its code. Static
                      segments outrank ":lang", so the routes above still win. */}
                  <Route path="/:lang" element={<LocalizedRoute><Index /></LocalizedRoute>} />
                  <Route path="/:lang/services" element={<LocalizedRoute><Services /></LocalizedRoute>} />
                  <Route path="/:lang/downloads" element={<LocalizedRedirect to="/services" />} />
                  <Route path="/:lang/library" element={<LocalizedRedirect to="/services" />} />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </TooltipProvider>
          </LanguageProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
