# LandDocs — Land Registration Templates & Documentation Platform

> A multilingual, professional-grade web application for secure land registration documentation in India.

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
│   ├── HeroSection.tsx   # Landing hero with CTA and language switcher
│   ├── TemplatesSection.tsx  # Document template cards grid
│   ├── ContactSection.tsx    # Inquiry form + contact info
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

## Design System

The app uses a custom CSS token system defined in `index.css` built around a **professional legal theme**:

- **Primary** — Deep professional blue (`hsl(215, 85%, 25%)`)
- **Secondary** — Elegant teal (`hsl(185, 70%, 45%)`)
- **Accent** — Trust gold (`hsl(45, 95%, 55%)`)
- **Success** — Legal green (`hsl(145, 65%, 40%)`)

Custom utilities include `.bg-gradient-hero`, `.shadow-card`, `.hover-lift`, and keyframe animations (`fadeInUp`, `slideInRight`, `float`) for polished motion.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate into the project
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## Deployment

This project is hosted and deployed via [Lovable](https://lovable.dev/projects/b4edeb17-f281-4fa6-a7d6-fbf59c100469).

To publish: open the Lovable project → **Share** → **Publish**.

To connect a custom domain: **Project → Settings → Domains → Connect Domain**.

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
