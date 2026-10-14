# AGENTS.md

This file provides guidance to AI agents working in this repository.

## Project Overview

This is a Next.js 16 website template built with TypeScript, Tailwind CSS v4, and the App Router. It follows clean architecture principles with a modular component structure.

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
    └── globals.css         # Tailwind + CSS custom properties
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

### Components

- All components go in `src/components/`
- UI primitives go in `src/components/ui/`
- Layout components (Navbar, Footer) go in `src/components/layout/`
- Page sections (Hero, Features, CTA) go in `src/components/sections/`
- SEO components go in `src/components/seo/`
- Each component folder has an `index.ts` barrel export
- Components should be composable and accept `className` for styling overrides
- Use `cn()` from `@/lib/utils` for conditional class merging

### Styling

- Use Tailwind CSS utility classes
- Use CSS custom properties for theme values (defined in `globals.css`)
- Do not use inline styles unless absolutely necessary
- Use `cn()` for conditional classes

### SEO

- Every page must export `metadata` or use `generateMetadata()`
- Use semantic HTML elements (`<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<section>`)
- Use `next/image` for images with proper `alt` text
- Use `next/font` for fonts
- Update `src/config/site.ts` with correct site metadata

### Configuration

- Site-wide config (name, URL, socials) goes in `src/config/site.ts`
- Navigation structure goes in `src/config/navigation.ts`
- Shared types go in `src/types/`
- Utility functions go in `src/lib/`

### Git

- You arenot allowed to run any write git commands at all.
- Do not commit `.next/`, `node_modules/`, or `.env*` files

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```
