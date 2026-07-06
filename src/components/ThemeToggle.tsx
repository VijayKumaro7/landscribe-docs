import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  /** Whether the navbar is in its solid (on-background) state. */
  solid?: boolean;
}

export const ThemeToggle = ({ solid = true }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  // Avoid a hydration-style mismatch: only render the icon after mount,
  // when the resolved theme is known.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-sm border transition-colors ${
        solid
          ? "border-border text-foreground/70 hover:text-foreground hover:bg-muted/60"
          : "border-white/25 text-white/80 hover:text-white hover:bg-white/10"
      }`}
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 opacity-0" aria-hidden="true" />
      )}
    </button>
  );
};
