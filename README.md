# Market Lab — Train Smart. Trade Confident.

A modern trading academy website built with React, TypeScript, and Tailwind CSS. Features real-time forex data and animated UI with a fixed, production-ready color palette.

## Tech Stack

- **React 19** + **TypeScript** — component-driven UI with strict typing
- **Vite 7** — lightning-fast dev server and build tool
- **Tailwind CSS v4** — utility-first styling via the `@tailwindcss/vite` plugin
- **Framer Motion** — smooth scroll-triggered and interaction animations
- **Lucide React** — clean, consistent SVG icon set

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# (Optional) Add real-time forex data
cp .env.example .env
# Then paste your free Twelve Data API key into .env

# Start the dev server
npm run dev
```

The site runs at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
├── assets/
│   └── logo.png              # Brand logo
├── components/
│   ├── Navbar.tsx             # Floating glass pill navbar
│   ├── ForexTicker.tsx        # Scrolling real-time forex ribbon
│   ├── Hero.tsx               # Data Wall hero with terminal UI
│   ├── MarketOverview.tsx     # Live forex market strip
│   ├── Features.tsx           # Feature cards with icon orbits
│   ├── Stats.tsx              # Animated gradient counter stats
│   ├── Courses.tsx            # Course catalog cards
│   ├── Testimonials.tsx       # Student testimonials carousel
│   ├── Pricing.tsx            # Pricing tier cards
│   ├── CTA.tsx                # Call-to-action with terminal contact form
│   ├── Footer.tsx             # Site footer with links
│   └── BackToTop.tsx          # Floating scroll-to-top button
├── services/
│   └── forex.ts               # Twelve Data API service + demo fallback
├── index.css                  # Tailwind directives, CSS variables, animations
├── main.tsx                   # App entry point
└── App.tsx                    # Root layout and section composition
```

## Real-Time Forex Data

The site displays live forex prices via the [Twelve Data API](https://twelvedata.com/) (free tier).

### Setup

1. Sign up at [twelvedata.com](https://twelvedata.com/) (free, no credit card)
2. Copy your API key from the dashboard
3. Create a `.env` file from the example: `cp .env.example .env`
4. Paste your key: `VITE_TWELVEDATA_API_KEY=your_key_here`

If no API key is provided, the site gracefully falls back to realistic demo data — no errors, no broken UI.

## Scripts

| Script            | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR      |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Serve the production build locally  |
| `npm run lint`    | Run ESLint across the project       |

## License

Private project. All rights reserved.
