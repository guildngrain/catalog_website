# AGENTS.md

This file provides guidance to AI agents working in this repository.

## Project Overview

This is **Guild & Grain** — a Next.js 16 website built with TypeScript, Tailwind CSS v4, and the App Router. It follows clean architecture principles with a modular component structure.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Package Manager:** npm

## Architecture

### Folder Structure

```
src/
├── app/                    # Routes (App Router)
│   ├── layout.tsx          # Root layout (html, body, fonts, metadata)
│   ├── page.tsx            # Home page
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # robots.txt
│   └── [routes]/...        # Other pages
├── components/
│   ├── ui/                 # Primitives (Button, Card, Container, Section)
│   ├── layout/             # Navbar, Footer (+ co-located *.css)
│   ├── sections/           # Hero, Features, CTA (+ co-located *.css)
│   └── seo/                # JsonLd
├── lib/
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
├── config/
│   ├── site.ts             # Site metadata, social links
│   ├── navigation.ts       # Nav structure
│   ├── catalog.ts          # Static catalog categories
│   └── hero.ts             # Hero copy / asset paths
├── hooks/                  # Custom React hooks
├── types/                  # Shared TypeScript types
└── styles/
    ├── globals.css         # Tailwind entry + shared base (body, headings, primitives)
    └── tokens.css          # Shared palette, fonts, type utilities — SINGLE SOURCE OF TRUTH
```

### Component Hierarchy

```
RootLayout (app/layout.tsx)
├── Navbar (components/layout)
├── main
│   └── Page (app/page.tsx)
│       ├── Hero (components/sections)
│       ├── Features (components/sections)
│       └── CTA (components/sections)
└── Footer (components/layout)
```

## Rules

### General

- Use TypeScript strict mode — no `any` types
- Use Server Components by default; only add `"use client"` when interactivity is required
- Follow the existing file and folder naming conventions (PascalCase for components, camelCase for utilities)
- Use the `@/` import alias for all imports within `src/`

### Design tokens & styling (mandatory)

Shared visual values live in CSS tokens. **Component-specific layout/look lives with the component.**

| File | Role |
|------|------|
| `src/styles/tokens.css` | Figma tokens: colors (`--color-primary`, `--color-text-primary`, …) + text styles (`--text-display-1-*`, `text-display-1` utilities) |
| `src/styles/globals.css` | Tailwind entry + shared base only (`body`, `h1`–`h6`, `header`/`footer` bg, `button`, `.card`, `--design-w`) |
| `ComponentName.css` | Co-located next to the component — all styles unique to that component |
| Tailwind in JSX | Allowed for layout/spacing and component-local utilities |
| `src/config/site.ts` | Site name, URL, SEO copy only |
| `layout.tsx` | Loads fonts via `next/font` (CSS variables only) |

**How components get styles:**

1. Use shared tokens (`var(--color-*)`, Tailwind token colors like `bg-primary`) — never hardcode hex in components
2. Put **component-specific** rules in a co-located `ComponentName.css` imported by that component (e.g. `Hero.css`, `Navbar.css`)
3. Use Tailwind in the component for layout (`flex`, `gap`, `sticky`, …) when convenient
4. Do **not** dump component styles into `globals.css` or `tokens.css`

**Do not:**

- Put Hero/Navbar/Footer-specific rules in `globals.css`
- Redefine the shared type scale or palette outside `tokens.css`
- Put design token **values** in TypeScript (except site metadata in `site.ts`)

**When shared brand colors/fonts change:** edit `tokens.css`.  
**When a section’s layout/look changes:** edit that component’s CSS and/or Tailwind.

### Components

- All components go in `src/components/`
- UI primitives go in `src/components/ui/`
- Layout components (Navbar, Footer) go in `src/components/layout/`
- Page sections (Hero, Features, CTA) go in `src/components/sections/`
- SEO components go in `src/components/seo/`
- Each component folder has an `index.ts` barrel export
- Co-locate `ComponentName.css` for component-specific styles; import it from the component
- Components should be composable and accept `className` for styling overrides
- Use `cn()` from `@/lib/utils` for conditional class merging
- Prefer semantic HTML; shared base styles come from `globals.css`

### Styling

- Shared: `tokens.css` (palette/type) + `globals.css` (base elements only)
- Per-component: co-located `*.css` and/or Tailwind in the component file
- Do not use inline styles unless absolutely necessary
- Use `cn()` for conditional classes

### SEO

- Every page must export `metadata` or use `generateMetadata()`
- Use semantic HTML elements (`<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<section>`)
- Use `next/image` for images with proper `alt` text
- Use `next/font` for fonts (variables wired in `layout.tsx`; usage via tokens)
- Update `src/config/site.ts` with correct site metadata

### Configuration

- Site-wide config (name, URL, socials) goes in `src/config/site.ts`
- Navigation structure goes in `src/config/navigation.ts`
- Design tokens (colors, fonts, type) go in `src/styles/tokens.css`
- Shared types go in `src/types/`
- Utility functions go in `src/lib/`

### Git

- You are not allowed to run any write git commands at all.
- Do not commit `.next/`, `node_modules/`, or `.env*` files

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```
