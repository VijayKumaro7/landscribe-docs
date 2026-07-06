import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Last-resort error boundary so an unexpected render error shows a friendly
 * recovery screen instead of a blank page.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled application error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
          <div className="text-center max-w-md">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-3">Something went wrong</h1>
            <p className="font-sans text-muted-foreground mb-6">
              An unexpected error occurred. Reloading the page usually fixes it.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center h-11 px-6 rounded-sm bg-primary text-primary-foreground font-sans font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
