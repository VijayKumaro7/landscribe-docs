import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, FileQuestion, LibraryBig } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn(`404: no route matches "${location.pathname}"`);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 w-16 h-16 bg-primary/10 flex items-center justify-center rounded-sm">
          <FileQuestion className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <p className="font-sans text-accent font-semibold text-xs uppercase tracking-widest mb-3">Error 404</p>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-3">Page not found</h1>
        <p className="font-sans text-muted-foreground mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm font-sans font-semibold h-11 px-6">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Return to Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-sm font-sans font-medium h-11 px-6">
            <Link to="/services">
              <LibraryBig className="h-4 w-4 mr-2" aria-hidden="true" />
              Download Documents
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
