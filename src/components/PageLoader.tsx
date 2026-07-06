import { Loader2 } from "lucide-react";

/** Full-screen loading state shown while a lazy route chunk loads. */
export const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background" role="status" aria-label="Loading page">
    <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
  </div>
);
