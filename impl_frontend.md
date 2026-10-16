# MehrByEM Storefront — Full Implementation Reference (Ground Truth)

This document is an inventory of **what the MehrByEM Frontend code actually does today**, derived by reading the source under `MehrByEM_Frontend/src/`. It is intended as a porting blueprint for Guild & Grain (or any Medusa V2 storefront).

**Source of truth:** the TypeScript/TSX files cited below, not this markdown. If code and this doc disagree, trust the code and update this file.

**Primary code roots**

| Path | Role |
|------|------|
| `src/lib/config.ts` | Medusa JS SDK singleton + locale header patch |
| `src/lib/data/*` | All Server Actions / Store API access |
| `src/lib/data/cookies.ts` | JWT, cart, cache cookies |
| `src/middleware.ts` | Region map + country-code redirects |
| `src/app/[countryCode]/*` | Routes |
| `src/modules/*` | UI + client-side checkout/PDP behavior |
| `src/config/promotions.json` | Promo banner + auto-apply config |
| `check-env-variables.js` | Build-time required env gate |
| `next.config.js` | Image hosts, eslint/ts ignore during build |

---

## Table of contents

1. [Architecture overview](#1-architecture-overview)
2. [Tech stack & packages](#2-tech-stack--packages)
3. [Environment variables](#3-environment-variables)
4. [SDK & HTTP client](#4-sdk--http-client)
5. [Cookies & session (detailed)](#5-cookies--session-detailed)
6. [Middleware (regions & country codes)](#6-middleware-regions--country-codes)
7. [Caching strategy](#7-caching-strategy)
8. [App routes](#8-app-routes)
9. [Folder structure](#9-folder-structure)
10. [Data layer — all API calls](#10-data-layer--all-api-calls)
11. [Auth & customer flows (detailed)](#11-auth--customer-flows-detailed)
12. [Cart lifecycle (detailed)](#12-cart-lifecycle-detailed)
13. [Checkout & payments (detailed)](#13-checkout--payments-detailed)
14. [Orders](#14-orders)
15. [Catalog, PDP, pricing quirks](#15-catalog-pdp-pricing-quirks)
16. [Inventory (detailed)](#16-inventory-detailed)
17. [Shipping & free-shipping rules](#17-shipping--free-shipping-rules)
18. [Promotions (BUY2GET10)](#18-promotions-buy2get10)
19. [Locales](#19-locales)
20. [Custom backend endpoints](#20-custom-backend-endpoints)
21. [Meta Pixel & marketing events](#21-meta-pixel--marketing-events)
22. [WhatsApp, SEO, navigation UX](#22-whatsapp-seo-navigation-ux)
23. [Headers on requests](#23-headers-on-requests)
24. [UI modules map](#24-ui-modules-map)
25. [Known quirks / gotchas](#25-known-quirks--gotchas)
26. [Porting checklist](#26-porting-checklist)
27. [Quick reference](#27-quick-reference)

---

## 1. Architecture overview

```
Browser
  │
  ├─ middleware.ts
  │     GET {MEDUSA_BACKEND_URL}/store/regions
  │     Header: x-publishable-api-key
  │     → 308 redirect to /{countryCode}/...
  │     → set _medusa_cache_id
  │
  ▼
Next.js App Router (RSC + Server Actions)
  │  lib/config.ts  →  @medusajs/js-sdk
  │  lib/data/*     →  Store API
  │  modules/*      →  UI
  │
  ▼
Medusa V2 Store API (default http://localhost:9000)
```

**Ground-truth principles (as implemented)**

1. JWT never goes to `localStorage`; only `_medusa_jwt` httpOnly cookie (`cookies.ts`).
2. Mutations are almost always `"use server"` functions in `lib/data/*`.
3. Pages under `app/` stay thin; they call data helpers and render modules.
4. Every shoppable URL is country-prefixed. `LocalizedClientLink` (`modules/common/components/localized-client-link`) prepends `useParams().countryCode`.
5. Checkout is **not** a pure Stripe-first flow in this fork: the separate Payment step UI is commented out; shipping submit auto-starts the **first** payment provider session; Review shows **hardcoded Faysal Bank transfer instructions** and still uses `PaymentButton` (Stripe-like or manual).

---

## 2. Tech stack & packages

From `package.json` (ground truth):

| Item | Value |
|------|-------|
| Package name | `medusa-next` (upstream Medusa starter name) |
| Version | `1.0.3` |
| Description | “Next.js Starter to be used with Medusa V2” |
| Next | `15.3.9` |
| React / React DOM | `19.0.4` |
| Medusa | `@medusajs/js-sdk`, `@medusajs/ui`, `@medusajs/icons` (`latest`) |
| Stripe | `@stripe/react-stripe-js` `^5.3.0`, `@stripe/stripe-js` `^8.2.0` |
| Other | `lodash`, `qs`, `pg`, `server-only`, Headless UI, Radix accordion |
| Package manager | `npm@10.8.2` |

**Scripts**

```bash
npm run dev       # next dev --turbopack -p 3000
npm run build     # next build
npm run start     # next start -p 3000
npm run lint      # next lint
npm run analyze   # ANALYZE=true next build
```

**Build notes (`next.config.js`)**

- `eslint.ignoreDuringBuilds: true`
- `typescript.ignoreBuildErrors: true`
- Images: `formats: ["image/webp"]`, `minimumCacheTTL: 30 days`
- Remote image hosts: `localhost`, `api.quantumgrove.tech:9123`, Medusa S3 buckets, optional Medusa Cloud S3 via env
- Dev logging: full fetch URLs when `NODE_ENV === "development"`

**Path aliases** (`tsconfig.json`)

| Alias | Maps to |
|-------|---------|
| `@lib/*` | `src/lib/*` |
| `@modules/*` | `src/modules/*` |
| `@pages/*` | `src/pages/*` |
| `@config/*` | `src/config/*` |
| `baseUrl` | `./src` (so `types/global` works) |

---

## 3. Environment variables

### Required at build

`check-env-variables.js` **exits the process** if missing:

| Variable | Notes |
|----------|-------|
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Only hard-required key at build |

### Used at runtime (ground truth from code)

| Variable | Where read | Behavior if missing |
|----------|------------|---------------------|
| `MEDUSA_BACKEND_URL` | `lib/config.ts`, `middleware.ts` | SDK defaults to `http://localhost:9000`. Middleware **throws** if unset when fetching regions. |
| `NEXT_PUBLIC_DEFAULT_REGION` | `middleware.ts` | Default `"us"`. Sitemap fallback uses `"pk"` if regions empty. |
| `NEXT_PUBLIC_STRIPE_KEY` | `payment-wrapper` | Used for `loadStripe` |
| `NEXT_PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY` | `payment-wrapper` | Fallback Stripe-like key |
| `NEXT_PUBLIC_MEDUSA_PAYMENTS_ACCOUNT_ID` | `payment-wrapper` | Passed as `stripeAccount` to `loadStripe` |
| `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_STOREFRONT_URL` / `NEXT_PUBLIC_BASE_URL` | `lib/config/site.ts` | Canonical URL; falls back to `https://mehrbyem.com` |
| `NEXT_PUBLIC_SITE_EMAIL` | `site.ts` | Default `support@mehrbyem.com` |
| `NEXT_PUBLIC_SITE_PHONE` / `NEXT_PUBLIC_WHATSAPP_DISPLAY` | `site.ts` | Phone display |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `lib/util/whatsapp.ts` | Default `905014950010` |
| `NEXT_PUBLIC_META_PIXEL_ID` | `app/layout.tsx`, `lib/util/meta.ts` | Fallback hardcoded `"1685253469348483"` |
| `MEDUSA_CLOUD_S3_HOSTNAME` / `MEDUSA_CLOUD_S3_PATHNAME` | `next.config.js` | Optional image remotePattern |
| `NODE_ENV` | many | Controls `secure` cookies, SDK debug, fetch logging |

> Note: README mentions `cp .env.template .env.local`, but **no `.env.template` file exists in the tree** at documentation time. Env keys above are inferred from source.

---

## 4. SDK & HTTP client

**File:** `src/lib/config.ts`

```ts
export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL, // env or http://localhost:9000
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})
```

### Locale header patch (ground truth)

`sdk.client.fetch` is rebound:

1. Read locale via `getLocaleHeader()` → `getLocale()` → cookie `_medusa_locale`
2. Set `headers["x-medusa-locale"] ??= locale` (does not overwrite if already set)
3. Merge `localeHeader` + caller headers
4. Call original fetch

If `getLocaleHeader()` throws (e.g. outside request context), the error is **swallowed** and the request continues without the locale header.

### Two call styles

| Style | Example | Used for |
|-------|---------|----------|
| SDK resource helpers | `sdk.store.cart.create`, `sdk.auth.login`, `sdk.store.customer.createAddress` | Mutations / typed helpers |
| Raw path fetch | `sdk.client.fetch('/store/products', { query, headers, next, cache })` | Lists with custom `fields`, cache tags |
| Native `fetch` | Only in `middleware.ts` for `/store/regions` | Edge runtime (SDK needs Node) |

---

## 5. Cookies & session (detailed)

**Files:** `src/lib/data/cookies.ts`, `locale-actions.ts`, `middleware.ts`, `onboarding.ts`, Meta identify

### Cookie table (exact attributes from code)

| Name | Setter | Reader | httpOnly | sameSite | secure | maxAge | Purpose |
|------|--------|--------|----------|----------|--------|--------|---------|
| `_medusa_jwt` | `setAuthToken` | `getAuthHeaders` | `true` | `strict` | prod only | `604800` (7d) | Bearer token |
| `_medusa_cart_id` | `setCartId` | `getCartId` | `true` | `strict` | prod only | `604800` (7d) | Active cart |
| `_medusa_cache_id` | middleware `response.cookies.set` | `getCacheTag` | not set (defaults) | not set | not set | `86400` (24h) | Cache tag namespace |
| `_medusa_locale` | `setLocaleCookie` | `getLocale` | **`false`** | `strict` | prod only | `31536000` (1y) | Content locale |
| `_medusa_onboarding` | external / cleared by `resetOnboardingState` | order UI, product CTA | — | — | — | cleared with `maxAge: -1` | Medusa admin onboarding |
| `_meta_complete_reg` | `setPendingRegistrationEvent` | client `meta-identify` | **`false`** | `strict` | prod only | `300` (5m) | Fire CompleteRegistration once |

### Helper behaviors

| Function | Exact behavior |
|----------|----------------|
| `getAuthHeaders()` | If cookie missing/unreadable → `{}`. If present → `{ authorization: "Bearer ${token}" }`. Never throws. |
| `getCacheTag(tag)` | Requires `_medusa_cache_id`; else `""`. Result: `` `${tag}-${cacheId}` `` |
| `getCacheOptions(tag)` | Returns `{}` if `typeof window !== "undefined"` OR empty tag; else `{ tags: [cacheTag] }` |
| `removeAuthToken` / `removeCartId` | Sets value `""` with `maxAge: -1` |
| `setPendingRegistrationEvent(customerId)` | Stores **customer id** as cookie value (not a boolean) |

### Onboarding cookie side-effect

`resetOnboardingState(orderId)` (`onboarding.ts`):

1. Clears `_medusa_onboarding`
2. **Redirects browser to** `http://localhost:7001/a/orders/${orderId}` (hardcoded Medusa Admin URL)

Product onboarding CTA links to `http://localhost:7001/a/orders?onboarding_step=create_order_nextjs`.

---

## 6. Middleware (regions & country codes)

**File:** `src/middleware.ts`

### Matcher (exact)

```js
"/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image|twitter-image|images|assets).*)"
```

### Bypass paths (no country logic)

`/robots.txt`, `/sitemap.xml`, paths starting with `/opengraph-image` or `/twitter-image`, `/favicon.ico`, any path **containing `.`**

### Region map cache (in-module memory)

```ts
regionMapCache = {
  regionMap: Map<string, StoreRegion>,
  regionMapUpdated: number
}
```

Refresh when map empty **or** older than **3600_000 ms**. Fetch:

```http
GET {MEDUSA_BACKEND_URL}/store/regions
x-publishable-api-key: {NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY}
```

Next fetch options on that call: `revalidate: 3600`, tags `regions-${cacheId}`, `cache: "force-cache"`.

If `regions` empty → throw `"No regions found..."`.  
If `BACKEND_URL` missing → throw instructing to set `MEDUSA_BACKEND_URL` (explicitly notes it is **not** `NEXT_PUBLIC_MEDUSA_BACKEND_URL`).

### Country resolution order (exact)

1. URL first segment if `regionMap.has(urlCountryCode)`
2. Else `x-vercel-ip-country` (lowercased) if in map
3. Else `NEXT_PUBLIC_DEFAULT_REGION` (default `"us"`) if in map
4. Else first key in map

### Redirect / cookie outcomes

| Condition | Response |
|-----------|----------|
| URL already has valid country **and** cache cookie exists | `NextResponse.next()` |
| URL has country, no cache cookie | `next()` + set `_medusa_cache_id` |
| URL missing country, country resolved | **308** to `/{country}{path}{query}` + set cache cookie |
| No country resolvable | **500** text body about regions |

### Legacy redirect

Any pathname containing `/store/faq` → **301** replace with `/faq` (keeps query string).

---

## 7. Caching strategy

### Tag namespace

Always `${resource}-${_medusa_cache_id}` when cookie present. Observed tags:

`carts`, `products`, `customers`, `orders`, `regions`, `fulfillment`, `categories`, `collections`, `locales`, `product-types`, `variants`, `payment_providers`, `shippingOptions`

### Per-call patterns (ground truth)

| Pattern | Where |
|---------|--------|
| `cache: "force-cache"` + tags | Most GETs in `lib/data/*` |
| `revalidate: 120` | `listProducts` only |
| `cache: "no-store"` | Inventory fetches; `listCartShippingMethods`; `fetchCartUncached` |
| `revalidateTag` after mutation | Cart, customer, orders, locale, region update |
| `after(() => revalidateTag(...))` | `syncCartShippingMethod`, `purgeOutOfStockCartItems` |

**Implication:** cart retrieve uses `force-cache` with tags; pages that need freshness often call their own uncached `fetchCart` (`cart/page.tsx`, `checkout/page.tsx`) or `fetchCartUncached` after shipping sync.

---

## 8. App routes

### Route groups

| Group | Layout file | Ground-truth UI |
|-------|-------------|-----------------|
| `(main)` | `(main)/layout.tsx` | `Nav`, `CartAwareBanners`, `Footer`, `main` with `pt-16 md:pt-24` |
| `(checkout)` | `(checkout)/layout.tsx` | Minimal top bar: Back to cart + logo “MehrByEM”; Footer; **no main Nav** |

### Account parallel routes (ground truth)

`account/layout.tsx`:

```ts
const customer = await retrieveCustomer().catch(() => null)
return (
  <AccountLayout customer={customer}>
    {customer ? dashboard : login}
    <Toaster />
  </AccountLayout>
)
```

Slots: `@dashboard` and `@login`. Authenticated users never see login slot content.

### Full route list

| Path | Notes |
|------|-------|
| `/{cc}` | Home: Hero, Lookbook, curated collections + featured products (Suspense) |
| `/{cc}/store` | Query: `sortBy`, `page`, `q`, `type`, `type_id`, `collection_id` |
| `/{cc}/products/[handle]` | Query: `v_id` (selected variant id) |
| `/{cc}/collections/[handle]` | Collection PLP |
| `/{cc}/categories/[...category]` | Nested category handle joined with `/` |
| `/{cc}/cart` | `dynamic = "force-dynamic"`, `NOINDEX` |
| `/{cc}/checkout` | `dynamic = "force-dynamic"`, `NOINDEX`; steps via `?step=` |
| `/{cc}/account/**` | `NOINDEX` |
| `/{cc}/order/[id]/confirmed` | Post-purchase |
| `/{cc}/order/[id]/transfer/[token]` (+ accept/decline) | Order transfer |
| `/{cc}/about`, `/lookbook`, `/faq`, `/contact-us`, `/privacy-policy`, `/shipping-and-returns` | Brand/content |

Nav links (desktop) ground truth (`nav-links/index.tsx`):

`Home`, `Shop` (`/store`), `About`, `Lookbook`, `FAQs`, `Contact` — **not** Account/Cart (those are icons elsewhere).

---

## 9. Folder structure

```
MehrByEM_Frontend/
├── check-env-variables.js
├── next.config.js
├── package.json
├── DESIGN.md
├── IMPLEMENTATION.md          ← this file
├── README.md
├── public/
└── src/
    ├── middleware.ts
    ├── app/
    ├── config/promotions.json
    ├── lib/
    │   ├── config.ts
    │   ├── config/site.ts
    │   ├── constants.tsx      # paymentInfoMap, isStripeLike, noDivisionCurrencies
    │   ├── data/              # Server Actions
    │   ├── util/
    │   ├── fonts.ts
    │   ├── hooks/
    │   └── context/
    ├── modules/
    ├── styles/
    └── types/global.ts
```

---

## 10. Data layer — all API calls

Unless noted, auth headers from `getAuthHeaders()` are attached when the helper passes `headers`.

### 10.1 Regions — `regions.ts` + middleware

| Function | Method | Path | Notes |
|----------|--------|------|-------|
| middleware | GET | `/store/regions` | Native fetch + publishable key |
| `listRegions` | GET | `/store/regions` | Cached |
| `retrieveRegion(id)` | GET | `/store/regions/:id` | Cached |
| `getRegion(countryCode)` | — | uses `listRegions` | Module-level `Map`; fallback key `"us"` if `countryCode` falsy |

### 10.2 Products — `products.ts`

| Function | Method | Path | Query / fields |
|----------|--------|------|----------------|
| `listProducts` | GET | `/store/products` | `limit` (default 12), `offset`, `region_id`, fields: `*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags,` + caller `queryParams` |
| `listProductsWithSort` | — | wraps above | See [§15](#15-catalog-pdp-pricing-quirks) |
| `getProductSizeGraph(id)` | GET | `/store/products/:id/size-graph` | Expects `{ size_graph }`; returns `null` on error |

**PDP load path (ground truth):** `products/[handle]/page.tsx` calls `listProducts({ countryCode, queryParams: { handle } })` and takes `products[0]`. Does **not** use a dedicated retrieve-by-handle helper.

### 10.3 Variants / inventory HTTP — `variants.ts`, `inventory.ts`

| Call | Path | Fields / cache |
|------|------|----------------|
| `retrieveVariant` | GET `/store/product-variants/:id` | `*images`, force-cache |
| Inventory batch | GET `/store/products` | `id: productIds`, `*variants,+variants.inventory_quantity`, **no-store** |
| Inventory fallback | GET `/store/products/:productId` | same fields, no-store |
| Inventory last resort | GET `/store/product-variants` | `id: variantId`, `+inventory_quantity`, no-store |

### 10.4 Collections — `collections.ts`

| Function | Path |
|----------|------|
| `retrieveCollection` | GET `/store/collections/:id` |
| `listCollections` | GET `/store/collections` (default limit/offset 100/0) |
| `getCollectionByHandle` | GET `/store/collections?handle=&fields=*products` → `[0]` |

### 10.5 Categories — `categories.ts`

| Function | Path |
|----------|------|
| `listCategories` | GET `/store/product-categories` fields include children/products/parents, limit default 100 |
| `getCategoryByHandle` | GET with `handle` = `parts.join("/")` → first result |

### 10.6 Product types — `product-types.ts`

`GET /store/product-types?limit=100`

### 10.7 Cart — `cart.ts` (+ page-level fetches)

| Function | API | Notes |
|----------|-----|-------|
| `retrieveCart` | GET `/store/carts/:id` | Default fields = `CART_FIELDS`; force-cache; catch → `null` |
| `getOrSetCart` | `sdk.store.cart.create` / `update` | Create: `{ region_id, currency_code, locale? }`; update region if mismatch |
| `updateCart` | `sdk.store.cart.update` | Revalidates carts + fulfillment |
| `addToCart` | `createLineItem` | Inventory pre-check; metadata optional; then `syncCartShippingMethod` |
| `buyNow` | `removeCartId` then new cart + line | Same inventory rules |
| `updateLineItem` / `deleteLineItem` | SDK | Then sync shipping |
| `setShippingMethod` | `addShippingMethod` `{ option_id }` | |
| `syncCartShippingMethod` | list options + maybe `addShippingMethod` | Filters out pickup; uses `pickCartShippingOption` |
| `purgeOutOfStockCartItems` | `deleteLineItem` loop | Continues on individual failures |
| `initiatePaymentSession` | `sdk.store.payment.initiatePaymentSession` | |
| `applyPromotions` | `update` `{ promo_codes }` | |
| `setAddresses` | `updateCart` + `redirect` | See checkout §13 |
| `placeOrder` | `sdk.store.cart.complete` | OOS check first; on order → `removeCartId` + redirect confirmed |
| `updateRegion` | `updateCart({ region_id })` + redirect | Revalidates regions + products |
| `listCartOptions` | GET `/store/shipping-options` | |

**`CART_FIELDS` (exact string in `util/free-shipping.ts`):**

```
*items, *region, *items.product, *items.product.type, *items.variant,
+items.variant.inventory_quantity, *items.thumbnail, *items.metadata,
+items.total, *promotions, *shipping_methods,+shipping_methods.name
```

**Gift card APIs** in `cart.ts` (`applyGiftCard`, `removeDiscount`, `removeGiftCard`) are **stubbed / commented out** — not wired.

### 10.8 Fulfillment — `fulfillment.ts`

| Function | Call |
|----------|------|
| `listCartShippingMethods` | GET `/store/shipping-options?cart_id=` **no-store**; catch → `null` |
| `calculatePriceForShippingOption` | POST `/store/shipping-options/:id/calculate` body `{ cart_id, data? }` |

### 10.9 Payment providers — `payment.ts`

`GET /store/payment-providers?region_id=` → sort by `id` ascending; catch → `null`.

### 10.10 Customer / auth — `customer.ts`

| Function | API |
|----------|-----|
| `retrieveCustomer` | GET `/store/customers/me?fields=*orders` — returns `null` if no Authorization header |
| `updateCustomer` | `sdk.store.customer.update` |
| `signup` | `auth.register` → set token → `customer.create` → `auth.login` → set token → `transferCart` → Meta cookie |
| `login` | `auth.login` → set token → `transferCart` |
| `signout` | `auth.logout` → remove JWT + cart id → redirect `/{cc}/account` |
| `transferCart` | `sdk.store.cart.transferCart(cartId)` if cart cookie exists |
| Address CRUD | `createAddress` / `deleteAddress` / `updateAddress` |

Auth actor/provider strings are **exactly** `"customer"` and `"emailpass"`.

### 10.11 Orders — `orders.ts`

| Function | API | Fields of note |
|----------|-----|----------------|
| `retrieveOrder` | GET `/store/orders/:id` | `*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product` |
| `listOrders` | GET `/store/orders` | `order=-created_at`, items+metadata+variant+product |
| Transfer | `requestTransfer` / `acceptTransfer` / `declineTransfer` via SDK |

### 10.12 Locales

| Function | API |
|----------|-----|
| `listLocales` | GET `/store/locales` → `{ locales: [{ code, name }] }`; catch → `null` |
| `updateLocale` | Cookie + optional `cart.update({ locale })` + revalidate products/categories/collections |

### 10.13 Custom content APIs

| Function / page | Call | Body / response |
|-----------------|------|-----------------|
| `submitInquiry` | POST `/store/contact-us` | `{ full_name, email, message }` |
| FAQ page | GET `/store/faq` | `{ faqs: any[] }` |

---

## 11. Auth & customer flows (detailed)

### Signup (`customer.ts` → `signup`)

1. Read FormData: `password`, `email`, `first_name`, `last_name`, `phone`
2. `sdk.auth.register("customer", "emailpass", { email, password })`
3. `setAuthToken(registerToken)`
4. `sdk.store.customer.create(customerForm)` with auth headers
5. `sdk.auth.login(...)` again → `setAuthToken(loginToken)`
6. Revalidate customers tag
7. `transferCart()`
8. `setPendingRegistrationEvent(createdCustomer.id)`
9. On error: `return error.toString()` (string, not throw)

### Login

1. `sdk.auth.login` → set token + revalidate  
2. `transferCart()` — errors returned as string  
3. Success returns `undefined` (form actions rely on that)

### Signout

Clears **both** JWT and cart cookie (guest cart is discarded on logout — ground truth).

### Account UI gating

Layout chooses `dashboard` vs `login` solely from `retrieveCustomer()` success.

---

## 12. Cart lifecycle (detailed)

### Create / region sync — `getOrSetCart`

1. `getRegion(countryCode)` — throw if missing  
2. `retrieveCart(undefined, "id,region_id")`  
3. If none → create with region + currency + locale; `setCartId`; revalidate  
4. If `cart.region_id !== region.id` → update region + currency; revalidate  
5. Return cart  

### Add to cart — inventory math (exact)

`getVariantAvailability(variantId, requestedQuantity, cart?)`:

1. `getVariantStock(variantId)` — if no variant data → **allow** (`success: true`)  
2. If not `isVariantInStock` → fail with stock 0 message  
3. If `!manage_inventory` OR `allow_backorder` → allow  
4. Else `remaining = stock - alreadyInCart` (sum qty of same variant in cart)  
5. If `requestedQuantity > remaining` → fail with `inventoryLimitMessage`  

Then `createLineItem` with optional `metadata`. On Medusa inventory error message → map to friendly limit message via `isInventoryErrorMessage`.

### Buy now (exact)

1. Availability check **without** considering existing cart qty (`getVariantAvailability(variantId, quantity)` — no cart arg)  
2. `removeCartId()`  
3. `getOrSetCart` → new cart  
4. `createLineItem`  
5. Sync shipping  

UI then navigates to `/{countryCode}/checkout?step=address` (`product-actions`, `buy-now-button`).

### Cart page load sequence (`cart/page.tsx`)

1. `force-dynamic`  
2. Fetch cart with `CART_FIELDS` (uncached path)  
3. If cookie but fetch fail → `removeCartId()`  
4. Auto apply/remove `BUY2GET10` by **sum of line quantities** (≥ 2)  
5. `retrieveCustomer`  
6. `syncCartShippingMethod`  
7. `purgeOutOfStockCartItems` → pass `removedItems` to template  
8. If removals → sync shipping again  

### Checkout entry from cart summary

`getCheckoutStep(cart)` (`cart/templates/summary.tsx`):

- Missing `shipping_address.address_1` **or** missing `email` → `address`  
- Else → `delivery`  

Link: `/checkout?step=${step}` via `LocalizedClientLink`.

---

## 13. Checkout & payments (detailed)

### Step machine (ground truth)

Query param: `step`

| Step | UI open | How you get there |
|------|---------|-------------------|
| `address` | Addresses panel | Default from cart; buy-now; edit |
| `delivery` | Shipping panel | After `setAddresses` redirect; cart if address+email exist |
| `payment` | **Blocked** | `checkout/page.tsx` redirects `payment` → `delivery` |
| `review` | Review + Place order | Shipping `handleSubmit` pushes `?step=review` |

`CheckoutForm` renders: **Addresses → Shipping → Review**.  
`<Payment />` is **commented out** in `checkout-form/index.tsx`.

### Addresses — `setAddresses`

Builds:

```ts
shipping_address: {
  first_name, last_name, address_1,
  address_2: "",          // always empty string
  company, postal_code, city, country_code, province, phone
}
email
billing_address: copy of shipping if same_as_billing === "on", else separate fields (also address_2: "")
```

Then `updateCart(data)` and:

```ts
redirect(`/${shipping_address.country_code}/checkout?step=delivery`)
```

**Note:** redirect country comes from the form’s shipping country, not necessarily the current URL country.

### Shipping panel behaviors (`modules/checkout/components/shipping`)

1. Splits options into delivery vs pickup (`fulfillment_set.type === "pickup"`).  
2. For `price_type === "calculated"`, calls `calculatePriceForShippingOption` and stores amounts in local map.  
3. Free-shipping eligibility drives auto-select of free option; otherwise `pickDefaultPaidShippingOption`.  
4. On **Continue** (`handleSubmit`):
   - If any payment providers: `initiatePaymentSession(cart, { provider_id: availablePaymentMethods[0].id })` — **always first provider**
   - Fires Meta `AddPaymentInfo` (once per cart id)
   - Navigates to `?step=review`

### PaymentWrapper

If pending session is Stripe-like **and** Stripe key exists → wrap children in Stripe Elements (`StripeWrapper` with session `client_secret`). Else plain `<div>`.

### Review panel (ground truth — important)

When `step=review` and previous steps done (`shipping_address`, shipping methods, payment_collection or gift-card-paid):

1. Shows **hardcoded bank transfer instructions**:
   - Account Title: `MAHWISH KHAN AND MAHNOOR KHAN`
   - Bank: `Faysal Bank`
   - IBAN: `PK37FAYS3077301000007795`
2. Copy tells customer to transfer after placing order and WhatsApp screenshot + order number  
3. Legal acknowledgement text  
4. Renders `PaymentButton`

So production UX is “manual bank transfer messaging” while the button may still be Stripe or `pp_system_default` depending on what `initiatePaymentSession` created (first provider id).

### PaymentButton readiness

`notReady` if missing: cart, shipping_address, billing_address, email, or shipping_methods length &lt; 1.

| Provider | Behavior |
|----------|----------|
| Stripe-like (`pp_stripe_*` or `pp_medusa-*`) | `stripe.confirmCardPayment(client_secret, { payment_method: { card, billing_details from cart } })`; on `succeeded` / `requires_capture` → `placeOrder()` |
| Manual (`pp_system_default`) | `placeOrder()` immediately |
| Other / none | Disabled “Select a payment method” |

### placeOrder (exact)

1. Resolve cart id from arg or cookie; throw if missing  
2. `retrieveCart` + `findOutOfStockCartItems` — throw if any OOS  
3. `sdk.store.cart.complete`  
4. If `cartRes.type === "order"`:
   - country from `order.shipping_address.country_code`
   - revalidate orders tag
   - `removeCartId()`
   - `redirect(/{country}/order/{id}/confirmed)`
5. Else return `cartRes.cart` (incomplete)

### Checkout page guards

- No cart cookie → redirect cart  
- Cart fetch fail → clear cookie → redirect cart  
- Same BUY2GET10 auto logic as cart page  
- Sync shipping + purge OOS  
- Renders `OutOfStockGuard`, `MetaInitiateCheckout`, `PaymentWrapper`+form, `CheckoutSummary`

---

## 14. Orders

### Confirmation

Route: `/{cc}/order/[id]/confirmed`  
Uses `retrieveOrder`; Meta Purchase component fires once; onboarding CTA may appear if `_medusa_onboarding === "true"`.

### Account orders

`listOrders` / detail page via `retrieveOrder`. Transfer request form uses `createTransferRequest` with FormData `order_id`.

### Line item metadata on orders

Because PDP writes metadata onto line items, order retrieve fields include `*items.metadata` — personal requests and selected sizes survive onto the order if Medusa persists line item metadata through completion (expected Medusa behavior).

---

## 15. Catalog, PDP, pricing quirks

### Store query params (ground truth)

| Param | Meaning |
|-------|---------|
| `sortBy` | `created_at` \| `price_asc` \| `price_desc` (default UI: Latest Arrivals) |
| `page` | 1-based page |
| `q` | Search string (Medusa `q`); client debounce 500ms; only syncs if empty or length ≥ 2 |
| `type` / `type_id` | Product type filter (filters UI normalizes both) |
| `collection_id` | Collection filter |

`PaginatedProducts` always `limit: 12`. Passes `collection_id`, `category_id`, `type_id`, `id`, `q` into Medusa query as arrays where applicable.

### Sort implementation

- Non-price sorts: Medusa `order=-created_at` via `listProducts`  
- Price sorts: fetch **up to 100** products page 1, then `sortProducts` by min variant `calculated_amount`, then slice for page  
- Comment in code: price sort is storefront-side until API supports it  

### PDP (`products/[handle]/page.tsx`)

1. Resolve region; 404 if missing  
2. `listProducts` by `handle`  
3. Variant images: if `?v_id=` set, filter `product.images` to those whose ids appear on `variant.images`  
4. Prepend thumbnail as synthetic image if not already in list  
5. `getProductSizeGraph(product.id)`  
6. JSON-LD Product + Breadcrumb (Home → Shop → optional Collection → Product)  
7. Availability schema: any variant with unmanaged inventory, backorder, or qty &gt; 0 → InStock  

### Variant selection UX

- Single variant → auto-select options  
- Multi → option buttons; URL kept in sync with `v_id` via `router.replace`  
- Quantity capped by `inventory_quantity` when managed and no backorder  

### Line item metadata written at add/buy-now (`buildMetadata`)

```ts
{
  personal_request: string,  // free-text from textarea
  // for each size-graph table with a selected row:
  [`selected_size_${normalizedTableTitle}`]: string  // from row.Size | size | SIZE
}
```

Table title normalized: lowercase, non-alnum → `_`, trim `_`.

Size graph UI requires every `sizeGraph.parameters` table to have a selection before add/buy enabled (`isMeasurementsValid`). Custom event `view-size-chart` dispatched for chart UI.

**Type:** `ProductSizeGraph` in `types/global.ts`: `{ id, name, image, description, parameters? }`.

### Price display quirk (important)

`getPricesForVariant` (`lib/util/get-product-price.ts`):

- If `original_amount !== calculated_amount` → real sale; `%` from `getPercentageDiff`  
- **Else fabricates a “sale”:** `displayOriginal = round(calculated * 1.1)`, `price_type: "sale"`, `percentage_diff: "10"`  

So the UI often shows a **10% off** appearance even when Medusa has no sale price list.

### Money formatting

`convertToLocale` uses `Intl.NumberFormat` with `style: "currency"`.  
`noDivisionCurrencies` list exists in `constants.tsx` (JPY, KRW, …) for callers that need zero-decimal handling — verify call sites when porting.

---

## 16. Inventory (detailed)

### `isVariantInStock`

1. No variant → `false`  
2. `!manage_inventory` → `true`  
3. `allow_backorder` → `true`  
4. Else `inventory_quantity > 0`  

### `isCartLineInStock` (slightly different)

If variant missing → **`true`** (optimistic).  
If `inventory_quantity` not a number → **`true`**.  
Otherwise same manage/backorder/qty rules.

### OOS purge vs find

- `findOutOfStockCartItems` uses **live** inventory map (HTTP no-store)  
- `getOutOfStockCartItems` uses only data already on cart line variants  

Checkout/cart pages use the live finder via `purgeOutOfStockCartItems`.

### User-facing inventory copy (`inventoryLimitMessage`)

Examples from code:

- `"This piece is no longer available."`
- `"Just one of this piece remains."` / `"Only N of this piece remain."`
- Messages when already in cart consumes all stock  
- Fallback: `"This piece is offered in a limited number."`

---

## 17. Shipping & free-shipping rules

**File:** `lib/util/free-shipping.ts`

| Rule | Exact |
|------|-------|
| Threshold | `FREE_SHIPPING_THRESHOLD = 2999` compared to `cart.item_total` with **`>`** (not `>=`) |
| Summer sale block | Product type value slugified (`trim`, lower, spaces→`_`) equals `summer_sale` → free shipping **not** applicable |
| Auto option when free eligible | Prefer option with `amount === 0` |
| Else | Keep current paid option if still valid; else `pickDefaultPaidShippingOption` |
| Default paid pick | Name slug `shipping_option` or `standard_shipping`; else **highest** amount among paid |

**Display name mapping** (`formatShippingOptionName`):

| Backend name (normalized) | UI |
|---------------------------|-----|
| `free_shipping` | Free Shipping |
| `shipping_option` / `shipping` | Standard shipping |
| `rawalpindi_islamabad` | Rawalpindi / Islamabad |
| other | underscores → spaces |

Pickup options excluded from `syncCartShippingMethod` auto-pick but still shown in shipping UI when present.

---

## 18. Promotions (BUY2GET10)

### Config — `src/config/promotions.json`

```json
[
  {
    "text": "Buy 2 Get 10% OFF",
    "code": "BUY2GET10",
    "color": "red",
    "auto_apply": { "min_items": 2 }
  }
]
```

Used by `promotional-offer` UI on PDP.

### Auto-apply / remove (duplicated in four places)

Logic (identical idea everywhere):

```
totalQuantity = sum(item.quantity || 1)
if totalQuantity >= 2 and code missing → add BUY2GET10
if totalQuantity < 2 and code present → remove BUY2GET10
then cart.update({ promo_codes: newCodes })
```

Locations:

1. `app/.../cart/page.tsx` (server)  
2. `app/.../checkout/page.tsx` (server)  
3. `modules/cart/templates/summary.tsx` (client `useEffect` → `applyPromotions` + `router.refresh`)  
4. `modules/checkout/templates/checkout-summary/index.tsx` (client same)

Manual codes still available via `DiscountCode` → `submitPromotionForm` / `applyPromotions`.

---

## 19. Locales

1. Optional `GET /store/locales`  
2. UI language select → `updateLocale(code)`  
3. Cookie `_medusa_locale` (client-readable)  
4. SDK injects `x-medusa-locale` on all `client.fetch`  
5. Cart updated with `{ locale }` when cart exists  
6. Revalidates products, categories, collections tags  

---

## 20. Custom backend endpoints

Must exist on the Mehr Medusa backend (not stock Medusa):

| Method | Path | Consumer | Contract (as coded) |
|--------|------|----------|---------------------|
| GET | `/store/products/:id/size-graph` | PDP | `{ size_graph: ProductSizeGraph }` |
| GET | `/store/faq` | FAQ page | `{ faqs: any[] }` |
| POST | `/store/contact-us` | Contact form | body `{ full_name, email, message }` |
| GET | `/store/locales` | Language select | `{ locales: { code, name }[] }` or 404 → null |

---

## 21. Meta Pixel & marketing events

**Files:** `app/layout.tsx` (script), `lib/util/meta.ts`, various components

### Infrastructure

- Pixel id: env or fallback `1685253469348483`  
- Script strategy: `lazyOnload`  
- `fbq` wait/retry: up to 25 attempts × 200ms  
- Dedup keys: `sessionStorage`/`localStorage` prefix `mehr_meta_`  
- Event IDs: `${event}_${unique}` for deduping with CAPI-style ids  

### Standard events fired

| Event | Where |
|-------|-------|
| `PageView` | `meta-pixel-events` on route changes |
| `ViewContent` | PDP (`product-actions`), catalog (`meta-catalog-view`), buy-now/add previews |
| `Search` | Product filters (search_string, content_category product) |
| `AddToCart` | PDP add/buy-now; preview buttons |
| `InitiateCheckout` | `meta-initiate-checkout` on checkout mount |
| `AddPaymentInfo` | Shipping submit + Review open (onceKey per cart id) |
| `Purchase` | `meta-purchase` on order confirmed |
| `CompleteRegistration` | After signup cookie / register form / meta-identify |

### Custom events

| Event | Where |
|-------|-------|
| `ShopClicked` | Nav + side menu Shop links |
| (generic) | `meta-tracked-link` |

### Identify / advanced matching

`identifyMetaUser({ em, ph, fn, ln, external_id })` → `fbq('init', PIXEL_ID, advancedMatching)` with normalized email/phone.

Registration cookie `_meta_complete_reg` read client-side then cleared after event.

Commerce payload helper uses `content_type: "product"`, `contents[{id, quantity}]`, `content_ids`, `num_items`, `value`, `currency` (uppercased). Line ids prefer `variant_id` then `product_id` then `id`.

---

## 22. WhatsApp, SEO, navigation UX

### WhatsApp

`lib/util/whatsapp.ts` + floating button component. Number from `NEXT_PUBLIC_WHATSAPP_NUMBER`.

### SEO

- `buildPageMetadata` / `absoluteUrl` / `localizedPath` in `site.ts` + `seo.ts`  
- JSON-LD: Organization, WebSite, Product, Breadcrumb  
- `sitemap.ts`: `revalidate = 3600`; static paths + products (paginated up to 50×100) + collections + categories per country  
- `robots.ts` present  
- `NOINDEX` constant used on cart, checkout, account  

### Navigation lock (`navigation-lock`)

- On internal left-click navigation, sets a pending lock  
- Blocks additional internal clicks while pending  
- Unlocks on route change or after **8000 ms** timeout  
- Prevents double-navigation storms during slow transitions  

---

## 23. Headers on requests

| Header | Set by | When |
|--------|--------|------|
| `x-publishable-api-key` | SDK + middleware | Always for Store API |
| `Authorization: Bearer …` | `getAuthHeaders` | When `_medusa_jwt` present |
| `x-medusa-locale` | SDK fetch wrapper | When locale cookie readable |

---

## 24. UI modules map

| Module | Responsibility |
|--------|----------------|
| `home` | Hero, lookbook, curated collections, featured rails |
| `products` | PDP template, gallery, actions (metadata), price, inventory notice, promotional offer, preview cards |
| `store` | Filters, pagination, paginated grid |
| `collections` / `categories` | PLP templates |
| `cart` | Items, summary, empty state, sign-in prompt |
| `checkout` | Addresses, shipping (incl. payment init), review (bank copy), payment button/wrapper, discount, OOS guard, Meta initiate |
| `order` | Confirmed template, items, payment details, help, Meta purchase, transfer |
| `account` | Login/register, nav, profile fields, addresses, orders |
| `layout` | Nav, footer, country/language, cart dropdown/button, banners, Meta helpers, navigation lock |
| `shipping` | Free-shipping price nudge |
| `contact-us` / `faq` / `about` / `lookbook` | Content |
| `common` | Localized link, inputs, modal, totals, WhatsApp, icons |
| `skeletons` | Loading UI |
| `seo` | JsonLd + schemas |

---

## 25. Known quirks / gotchas

These are intentional or accidental behaviors visible in code — preserve or consciously change when porting:

1. **Fake 10% sale display** when Medusa original == calculated (`get-product-price.ts`).  
2. **Checkout `step=payment` always redirected** to `delivery`; Payment component unused in form.  
3. **First payment provider auto-selected** on shipping continue — no user picker in the active path.  
4. **Bank transfer copy hardcoded** in Review (Faysal Bank / IBAN) regardless of provider.  
5. **BUY2GET10 logic duplicated** in 4 files — keep in sync or centralize when porting.  
6. **Logout clears cart cookie** — logged-out users lose cart id.  
7. **`setAddresses` redirects using form country_code**, which can change the URL country.  
8. **Onboarding reset redirects to `localhost:7001`** — break in production if triggered.  
9. **Meta Pixel ID hardcoded fallback** in source.  
10. **Sitemap default country `pk`** vs middleware default region `us` — inconsistent defaults.  
11. **Price sort only considers first 100 products**.  
12. **Gift card helpers are stubs**.  
13. **`retrieveCart` is force-cached**; cart/checkout pages bypass with direct fetch.  
14. **Inventory allow-if-unknown**: missing variant stock data → add-to-cart allowed.  
15. **Free shipping uses `item_total > 2999`** (strictly greater).  
16. **Summer sale type** disables free shipping via product type slug `summer_sale`.  
17. **Line item `address_2` always forced to `""`** on address submit.  
18. **Build ignores ESLint and TS errors** (`next.config.js`).  
19. **README references `.env.template`** which is not present in the repo snapshot.  
20. Package still named `medusa-next` upstream-style.

---

## 26. Porting checklist

### Must port (Medusa storefront core)

- [ ] Env: publishable key + `MEDUSA_BACKEND_URL`  
- [ ] SDK singleton (`lib/config.ts`)  
- [ ] Cookies: JWT, cart id, cache id (+ locale if needed)  
- [ ] Middleware country/region redirect  
- [ ] `regions`, `products`, `cart`, `customer`, `orders`, `payment`, `fulfillment` data layer  
- [ ] `/{countryCode}` app structure + localized links  
- [ ] Checkout: addresses → shipping method → payment session → `cart.complete`  
- [ ] Cache tags + revalidate after mutations  
- [ ] Inventory policy (decide: strict like Mehr vs simpler)  

### Mehr-specific — decide keep / redesign

- [ ] Size-graph API + measurement metadata on line items  
- [ ] `personal_request` metadata  
- [ ] BUY2GET10 auto apply  
- [ ] Free shipping threshold 2999 + summer_sale exclusion  
- [ ] Fabricated 10% sale UI  
- [ ] Bank transfer instructions in Review  
- [ ] FAQ / contact-us custom endpoints  
- [ ] Meta Pixel event map  
- [ ] Navigation lock  
- [ ] WhatsApp CTA  

### Guild & Grain additions (planned — not in Mehr)

- [ ] Design upload + WebP pipeline (backend authoritative)  
- [ ] Order messages / quotes with categories  
- [ ] Blog CMS module + Store delivery APIs  

---

## 27. Quick reference

### Cookies

```
_medusa_jwt           Authorization Bearer
_medusa_cart_id       Active cart
_medusa_cache_id      Cache tag suffix (24h)
_medusa_locale        → x-medusa-locale
_medusa_onboarding    Admin onboarding UI
_meta_complete_reg    Meta CompleteRegistration (5m)
```

### Checkout steps

```
address → delivery → review
(payment step redirected away)
```

### Line item metadata from PDP

```
personal_request: string
selected_size_<table_slug>: string
```

### Core Store paths

```
GET  /store/regions
GET  /store/regions/:id
GET  /store/products
GET  /store/products/:id
GET  /store/products/:id/size-graph          # custom
GET  /store/product-variants
GET  /store/product-variants/:id
GET  /store/product-categories
GET  /store/collections
GET  /store/collections/:id
GET  /store/product-types
GET  /store/carts/:id
     sdk.store.cart.create | update | createLineItem | updateLineItem
     deleteLineItem | addShippingMethod | complete | transferCart
GET  /store/shipping-options
POST /store/shipping-options/:id/calculate
GET  /store/payment-providers
     sdk.store.payment.initiatePaymentSession
GET  /store/customers/me
     sdk.store.customer.create | update | createAddress | updateAddress | deleteAddress
GET  /store/orders
GET  /store/orders/:id
     sdk.store.order.requestTransfer | acceptTransfer | declineTransfer
GET  /store/locales                          # custom/optional
GET  /store/faq                              # custom
POST /store/contact-us                       # custom
     sdk.auth.register | login | logout  ("customer", "emailpass")
```

### Promo

```
BUY2GET10  auto when sum(quantities) >= 2
```

### Free shipping

```
item_total > 2999 AND no product type slug summer_sale
```

---

*Ground-truth pass generated from `MehrByEM_Frontend` source. Re-verify cited files after major refactors.*
