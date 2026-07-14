interface LogoProps {
  className?: string;
}

/**
 * LandDocs brand mark — a registered deed: sheet with folded corner, text
 * lines, a surveyed land-plot outline, and a gold registration seal.
 * Keep in sync with public/favicon.svg.
 */
export const Logo = ({ className = "w-8 h-8" }: LogoProps) => (
  <svg viewBox="0 0 64 64" className={className} role="img" aria-hidden="true" focusable="false">
    <rect width="64" height="64" rx="14" fill="#1C3B1E" />
    <path d="M17 11h21l9 9v33H17z" fill="#F6F1E4" />
    <path d="M38 11l9 9h-9z" fill="#D8CDAF" />
    <rect x="22" y="24" width="19" height="3" rx="1.5" fill="#A9812D" />
    <rect x="22" y="30.5" width="14" height="3" rx="1.5" fill="#A9812D" opacity="0.65" />
    <path d="M23.5 46.5 25.8 38.8 37.5 37.6 35.6 46.5z" fill="none" stroke="#31572F" strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="25.8" cy="38.8" r="1.7" fill="#31572F" />
    <circle cx="37.5" cy="37.6" r="1.7" fill="#31572F" />
    <circle cx="45" cy="47" r="8.6" fill="#C89B3C" />
    <circle cx="45" cy="47" r="5.2" fill="none" stroke="#1C3B1E" strokeWidth="1.8" />
    <path d="M42.4 47l1.9 1.9 3.4-3.7" fill="none" stroke="#1C3B1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
