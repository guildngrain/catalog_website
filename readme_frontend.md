# MehrByEM

Luxury fashion e-commerce storefront for MehrByEM, built with Next.js 15 and Tailwind CSS on top of **Medusa V2**.

## Tech Stack

- **Next.js 15** — App Router, Server Components, Server Actions
- **Medusa V2** — `@medusajs/js-sdk` Store API client
- **Tailwind CSS** — Utility-first styling
- **TypeScript** — Type safety
- **Stripe** — Card payments via payment sessions

## Getting Started

```shell
cp .env.template .env.local
npm install
npm run dev
```

The site runs at **http://localhost:3000**.

Required env:

- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`
- `MEDUSA_BACKEND_URL` (e.g. `http://localhost:9000`)

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for the full env list.

## Key Features

- Product catalog with filtering and sort
- Product detail pages with galleries, variants, size graphs
- Shopping cart, buy-now, inventory checks
- Checkout (addresses → shipping → Stripe/manual → place order)
- Customer auth, address book, order history & transfer
- Country/region routing + locale header
- FAQ, contact-us, lookbook, about (brand pages)
- Meta Pixel + WhatsApp integrations

## Full technical reference

**[IMPLEMENTATION.md](./IMPLEMENTATION.md)** is a **ground-truth** technical reference read from this codebase:

- Architecture, env vars, SDK, cookies (exact attributes/TTLs)
- Middleware country/region behavior
- Caching / `revalidateTag` patterns
- Every Store API call and Server Action
- Auth, cart, checkout step machine, Stripe/manual payment, bank-transfer Review UI
- PDP line-item metadata (`personal_request`, size selections), pricing quirks
- Inventory, free-shipping (`> 2999`), `BUY2GET10` (4 call sites)
- Meta Pixel events, WhatsApp, SEO, navigation lock
- Custom backend endpoints + known gotchas + porting checklist

Also see [DESIGN.md](./DESIGN.md) for the brand design system.
