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
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, Features, CTA
│   └── seo/                # JsonLd
├── lib/
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
├── config/
│   ├── site.ts             # Site metadata, social links
│   └── navigation.ts       # Nav structure
├── hooks/                  # Custom React hooks
├── types/                  # Shared TypeScript types
└── styles/
    ├── globals.css         # Tailwind entry + base body styles
    └── tokens.css          # Design tokens (colors, fonts, text styles) — SINGLE SOURCE OF TRUTH
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

### Design tokens (mandatory)

Visual design is centralized in CSS — not in components.

| File | Role |
|------|------|
| `src/styles/tokens.css` | Token **values** (`--color-*`, `--font-*`) + optional `@utility` overrides |
| `src/styles/globals.css` | Maps tokens onto **semantic HTML** (`h1`–`h6`, `p`, `nav a`, `header`, `footer`, `button`, `.card`) |
| `src/config/site.ts` | Site name, URL, SEO copy only |
| `layout.tsx` | Loads fonts via `next/font` (CSS variables only) |

**How components get styles:** write normal HTML (`<h1>`, `<p>`, `<nav>`). Base styles in `globals.css` apply fonts, sizes, and colors automatically. Components only add **layout** classes (`flex`, `gap`, `mt-4`, `sticky`, etc.).

**Do not:**

- Put `text-display-1`, `text-muted`, `text-heading-h2`, hex colors, or font families on Hero / Navbar / Features / etc. for default look
- Redefine type scales outside `tokens.css` / `globals.css`
- Put design tokens in TypeScript files (except site metadata in `site.ts`)

**Overrides:** use token utilities from `tokens.css` only when you intentionally break the default (e.g. Display 2 instead of default `h1`).

**When design changes:** edit `tokens.css` and/or the element rules in `globals.css`. Components should not need updates.

### Components

- All components go in `src/components/`
- UI primitives go in `src/components/ui/`
- Layout components (Navbar, Footer) go in `src/components/layout/`
- Page sections (Hero, Features, CTA) go in `src/components/sections/`
- SEO components go in `src/components/seo/`
- Each component folder has an `index.ts` barrel export
- Components should be composable and accept `className` for styling overrides
- Use `cn()` from `@/lib/utils` for conditional class merging
- Prefer semantic HTML so `globals.css` styles apply; layout utilities only in components

### Styling

- Defaults come from `globals.css` element rules (fed by `tokens.css`)
- Components: layout/spacing utilities only (`flex`, `gap`, `py-8`, …)
- Optional overrides: token utilities from `tokens.css`
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
