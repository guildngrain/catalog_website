# Guild & Grain — Custom Medusa Modules

Three custom modules extend Medusa for Guild & Grain.

## Modules

| Module key (`resolve`) | Purpose |
|------------------------|---------|
| `blog` | Blog CMS (posts + categories) |
| `customDesign` | Customer design uploads (always stored as WebP) |
| `orderMessage` | Categorized cart/order messages & quote requests |

## WebP pipeline

Every upload (designs + blog covers) goes through `src/utils/webp.ts` → `sharp` → WebP, then Medusa File Module (`uploadFilesWorkflow`).

## Store APIs

| Method | Path | Notes |
|--------|------|-------|
| GET | `/store/blog/posts` | Published only; `limit`, `offset`, `category_id`, `q`, `featured`, `tag` |
| GET | `/store/blog/posts/:handle` | Published post by handle (includes layout, style_preset, custom_css, tags) |
| GET | `/store/blog/categories` | Blog categories |
| POST | `/store/custom-designs/upload` | multipart `files` + `cart_id` (required), optional `line_item_id` |
| GET | `/store/custom-designs` | `cart_id` or `order_id` |
| GET | `/store/order-messages/categories` | Quote/message categories |
| GET | `/store/order-messages` | `cart_id` or `order_id` |
| POST | `/store/order-messages` | `{ body, category_id, cart_id\|order_id, email? }` |

## Admin APIs

| Method | Path |
|--------|------|
| GET/POST | `/admin/blog/posts` |
| GET/POST/DELETE | `/admin/blog/posts/:id` |
| POST | `/admin/blog/posts/:id/cover` (multipart `file` → WebP cover) |
| POST | `/admin/blog/uploads` (multipart `files` → WebP; editor / general images) |
| GET/POST | `/admin/blog/categories` |
| GET | `/admin/custom-designs` |
| POST | `/admin/custom-designs/upload` |
| GET | `/admin/order-messages` (filter `category_id`, `status`, `order_id`) |
| GET/POST | `/admin/order-messages/:id` (update status / staff_note / quote_amount) |
| GET/POST | `/admin/order-messages/categories` |

## Order attach flow

Subscriber `order.placed` → looks up cart linked to the order → sets `order_id` on matching `custom_design` and `order_message` rows.

## Seed defaults

```bash
npx medusa exec ./src/scripts/seed-custom-modules.ts
```

Seeds message categories: `custom_design`, `bulk`, `engraving`, `gift_note`, `general`  
and blog categories: `leather-care`, `buying-guides`, `brand-stories`.

## Blog post styling fields

Each post stores presentation metadata for the storefront:

| Field | Values / notes |
|-------|----------------|
| `subtitle` | Optional deck under the title |
| `layout` | Template shortcut: `default` \| `editorial` \| `minimal` \| `magazine` |
| `style_preset` | Mood shortcut: `classic` \| `dark` \| `warm` \| `contrast` |
| `design_config` | Full JSON design studio config (colors, typography, hero, page, media) |
| `custom_css` | Optional CSS; scope with `.gg-blog-post-{handle}` |
| `is_featured` | Highlight on blog index |
| `tags` | Comma-separated |
| `cover_alt` | Accessibility text for cover |
| `content` | HTML from TipTap rich editor |

### `design_config` (Design studio)

Saved as JSONB. Admin UI tabs map to:

- **Template** — layout + style preset (seeds the rest)
- **Hero & image** — `image-top` / `full-bleed` / `split-left` / `split-right` / `portrait-aside` / `text-only`, height, fit, focal point, overlay, title-on-image
- **Colors** — background, text, muted, accent, border
- **Typography** — display/body fonts, title size/align, body size, line-height, letter-spacing, drop cap
- **Page** — content width, padding, meta toggles, dividers, inline image layout
- **Advanced** — custom CSS + raw JSON editor

Storefront should render using `design_config` (fall back to `layout` + `style_preset` when null).

## Admin UI (Blog)

Added under Medusa Admin sidebar **Blog**:

| Path | Page |
|------|------|
| `/app/blog` | List posts (layout / preset / featured) |
| `/app/blog/create` | Create with TipTap + Design studio + live preview |
| `/app/blog/posts/:id` | Edit / delete / cover upload (WebP) / Design studio |
| `/app/blog/categories` | Create & list categories |

Login at http://localhost:9000/app then open **Blog** in the sidebar.
