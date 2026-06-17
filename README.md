# LandDocs — Land Registration Templates & Documentation Platform

> A multilingual, professional-grade web application for secure land registration documentation in India.

---

## Preview

**Desktop**

![LandDocs — desktop view](docs/preview-desktop.png)

**Mobile**

<img src="docs/preview-mobile.png" alt="LandDocs — mobile view" width="320" />

---

## What is LandDocs?

LandDocs is a React-based web platform that helps property owners, legal professionals, and individuals navigate land registration paperwork without intermediaries. It provides downloadable legal document templates (sale deeds, gift deeds, lease agreements, etc.) in five Indian languages, along with a professional services inquiry form.

The platform is built with transparency as its core value — no hidden fees, no middlemen, just clean documentation tools accessible to anyone.

---

## Features

### Multilingual Support
The entire UI is available in five languages, switchable at any time via the language selector in the top navigation:

| Code | Language |
|------|----------|
| `en` | English  |
| `hi` | Hindi (हिंदी) |
| `kn` | Kannada (ಕನ್ನಡ) |
| `mr` | Marathi (मराठी) |
| `te` | Telugu (తెలుగు) |

Every section — hero copy, template names, form labels, contact details, and the footer — switches dynamically with no page reload.

### Document Templates
Six pre-built legal templates are available:

| Template | Type |
|----------|------|
| Sale Deed | Free |
| Gift Deed | Free |
| Lease Deed | Free |
| Partition Deed | Premium |
| Mortgage Deed | Premium |
| Power of Attorney | Premium |

Each card shows download count, user rating, and a preview option.

### Professional Services Contact Form
Users can submit inquiries for:
- Document Verification
- Legal Consultation
- Registration Process assistance
- Title Search
- Custom Template requests

The form includes name, email, phone, service type, and message fields with basic validation.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 with TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS with a custom design token system |
| UI Components | shadcn/ui (Radix UI primitives) |
| Routing | React Router DOM |
| State / Data | TanStack Query (React Query) |
| Notifications | Radix Toast + Sonner |

---

## Project Structure

```
src/
├── assets/               # Static images (hero background)
├── components/
│   ├── Navbar.tsx            # Sticky top nav with scroll-spy + mobile drawer
│   ├── HeroSection.tsx       # Landing hero with CTA and stats
│   ├── FeaturesSection.tsx   # "Why LandDocs" feature cards
│   ├── TemplatesSection.tsx  # Document template cards grid
│   ├── HowItWorksSection.tsx # Three-step process
│   ├── TestimonialsSection.tsx # Client testimonial cards
│   ├── ContactSection.tsx    # Inquiry form + contact info
│   ├── SectionNav.tsx        # Right-rail section dot navigation
│   ├── ScrollProgress.tsx    # Top reading-progress bar
│   ├── Reveal.tsx            # Scroll-triggered reveal wrapper
│   ├── LanguageSelector.tsx  # Dropdown to switch UI language
│   └── ui/               # shadcn/ui base components
├── hooks/
│   ├── use-toast.ts      # Toast notification logic
│   └── use-mobile.tsx    # Responsive breakpoint hook
├── pages/
│   ├── Index.tsx         # Main page — composes all sections
│   └── NotFound.tsx      # 404 fallback page
├── lib/
│   └── utils.ts          # Tailwind class merge utility
├── index.css             # Design tokens, animations, custom utilities
└── App.tsx               # Root component with routing and providers
```

---


## Target Users

- Property buyers and sellers navigating registration paperwork independently
- Legal professionals looking for ready-to-use, compliant document templates
- Citizens in Karnataka, Maharashtra, Telangana, and other states who need vernacular-language documentation support

---

## Roadmap (Suggested)

- [ ] Backend integration for actual template downloads (PDF generation)
- [ ] User authentication and saved documents
- [ ] Payment gateway for premium templates
- [ ] More regional language support (Tamil, Bengali, Gujarati)
- [ ] Real form submission with email notification

---

## License

© 2024 LandDocs. All rights reserved. Made in India 🇮🇳
