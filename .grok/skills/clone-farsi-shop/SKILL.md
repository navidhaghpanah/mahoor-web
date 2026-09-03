---
name: clone-farsi-shop
description: >
  Clone an e-commerce site from a wget mirror (source in Farsi, English, or any
  language) into a rebranded Next.js shop whose storefront language defaults to
  Farsi but is configurable. Vercel + Neon Postgres, admin CRM, OTP/SMS, PWA,
  cart, optional Iranian payment gateway (Zarinpal), Telegram admin order
  notifications. Handles RTL/LTR, chrome+catalog translation, Windows-1252/UTF-8
  mojibake URLs, extensionless HTML, hamburger hash links, and source-brand wipe.
  Use when the user wants to clone a shop, copy a source store, rebrand a wget
  mirror, clone English to Farsi, add dargah pardakht, build a mestertavalod-style
  site, or runs /clone-farsi-shop.
---

# Clone Farsi shop

Turn a wget-mirrored store into a live rebranded shop. Keep the source UI. Do not use a VPS unless the user explicitly asks.

Source language and storefront language are independent. Default **target = Farsi (`fa`)**. Source may be `fa`, `en`, or any other language.

## Collect before coding

Need all of: source URL, store name, logo file, address, landline, mobile, Instagram URL, domain. Optional: `sourceLang` (detect from `<html lang>` / homepage text if omitted), `targetLang` (default `fa`), Telegram bot token + admin chat IDs (comma-separated), SMS provider keys, color shift vs identical palette, payment gateway (name + merchant/API key; sandbox vs production). If source prices are not toman, get a toman price list or a conversion rule before seeding.

Never print bot tokens, SMS keys, or payment merchant keys in user-facing text. Store them in Neon settings / Vercel env only. Default checkout is order-without-pay (`status: new` + Telegram). Wire a gateway only when the user asks and supplies credentials.

## Architecture

```
<app>/
  public/          wget HTML/CSS/JS/images (rebranded)
  app/             Next.js: admin CRM, APIs, Category/Product/cart pages
  lib/store.ts     Neon JSON blob `store_blob` id `main` (@neondatabase/serverless)
  lib/sync.ts      scrape source DiscontProducts → products
  lib/telegram.ts  bot send + notifyAdmins on order
  lib/sms.ts       OTP: inbox | kavenegar | melipayamak
  lib/pay.ts       optional gateway: request + verify (rial)
  lib/i18n.ts      sourceLang/targetLang, dir, chrome string map
  data/store.json  seed
```

Static wget pages stay in `public/`. Dynamic catalog/product/cart must be Next.js routes — wget `/Category/*` and `/Product/*` are often empty because wget requested garbled URLs or the source empty-state string (`نتیجه ای یافت نشد`, `No results`, `Not found`, …).

## Pipeline

### 1. Mirror

```
wget --mirror --convert-links --adjust-extension=off --page-requisites --no-parent https://SOURCE
```

Keep extensionless HTML. Copy assets into `public/`.

### 2. Next app + rewrites

Next 16 app. Point homepage `app/page.tsx` to `/index.html`.

Rewrite source ASP.NET endpoints:

- `/Home/DiscountProduct` → `/api/home/discount`
- `/Home/NewProduct` → `/api/home/new`
- `/Home/GetSlider` → empty 204; **do not** let client JS replace `#carouselExampleFade` with empty HTML
- `/Order/AddProductToBasket` → `/api/cart/add`
- `/Order/RemoveProductToBasket` → `/api/cart/remove`
- `/Cart/GetCountCartProducts` → `/api/cart/count`
- `/QuickSearch` → `/api/search`
- `/Account/SendSms` → `/api/otp/send`
- `/Account/Login` → `/api/otp/verify` (Login.js expects `{ sucsses: true }`)
- `/Blog` → `/blog/2` if Windows cannot host both a `Blog` file and a `blog/` directory
- `/Cart` → `/cart`

Headers on every extensionless HTML path: `Content-Type: text/html; charset=utf-8`, `Content-Disposition: inline`. Also set these in middleware for paths without a `.` (except `/api/`).

### 3. Rebrand (full wipe)

Replace source name, phones, address, Instagram, logos, footer, watermarks, Clarity leftovers. Product-image corner watermarks too. Keep layout/CSS/JS. Optional slight palette shift so the clone is not pixel-identical; do not delete source UI blocks.

### 4. Locale (source → target)

`settings.sourceLang` / `settings.targetLang` (default `fa`). Detect source from `<html lang>` and a homepage text sample if the user did not set it.

- **Same language:** do not machine-translate; only rebrand strings.
- **Different language:** keep layout; translate visible chrome (nav, buttons, cart, OTP, empty states, footer labels) via a chrome map in `lib/i18n.ts`. Translate product/category **titles** on seed and on sync; keep `titleSource` on the product for debugging. Do not silently invent legal copy — About/Rules/FAQ get a translated draft and a note that a human should review.
- **Direction:** `dir="rtl"` and a Farsi-capable font stack (Tahoma, Vazirmatn, or the source’s Farsi font) when target is `fa` / `ar` / `he` / `ur` / `ckb`; otherwise `ltr`. Set `<html lang="{targetLang}">`.
- **Sync:** scrape still uses source-page selectors; store the target-language title. If the source stack is not the ASP.NET rewrite list in step 2, discover actual XHR/form URLs from the mirror instead of forcing those paths.

### 5. Encoding

wget on Windows mojibakes **any non-ASCII** path (Farsi `تم-تولد` → `ØªÙ…-ØªÙˆÙ„Ø¯`, same for Arabic/Cyrillic/etc.). ASCII English paths usually need no recovery.

Implement recover both ways (UTF-8 bytes ↔ CP1252 extras including U+2026, U+02C6, U+0152, U+0081). Lookup by slug variants: raw, decodeURI loop, mojibake, recovered Unicode, hyphen/space.

If wget Category/Product files are an empty-state page, delete them and use `app/Category/[slug]` and `app/Product/[slug]` (and `/p/[slug]`) backed by Neon. Filter category products by recovered tokens; skip target-language stopwords (for `fa`: تم/تولد/های/و/لوازم).

### 6. Data

Neon table `store_blob (id text PK, data jsonb, updated_at timestamptz)`. Seed products from source discount scrape. Persist settings, orders, customers, OTP, telegram carts/sessions.

Cron `0 6 * * *` → `/api/cron/sync` against `settings.sourceUrl`.

Admin cookie `mt_admin=1`. Do not invent a new password if the user already set one.

### 7. Cart + checkout

Cookie `mt_cart`. Linux is case-sensitive: homepage often has both `href="Cart"` and `href="cart"`. Serve `app/cart/page.tsx` and rewrite `/Cart` → `/cart`. Delete stub `public/Cart`. Checkout POST `/api/cart/checkout` creates an order then **Telegram-notifies every admin chat id**. Without a gateway, that is the whole flow; do not add payment UI.

### 8. Payment gateway (only if asked)

Shop prices are **toman**. Iranian gateways take **rial** (`toman * 10`). Verify on the server; never trust a callback alone.

Default provider **Zarinpal** unless the user names Zibal / IDPay / NextPay / Pay.ir / a bank terminal. Store `payProvider`, `payMerchantId`, `paySandbox` in settings. Admin settings UI for these fields. Sandbox first if they have a test merchant.

Flow:

1. Checkout creates order `status: new` (or `pending`). **Do not** clear the cart yet.
2. `POST /api/pay/request` sends amount (rial), `callback_url` (`{SITE}/api/pay/callback`), order id. Redirect the browser to the gateway URL.
3. `GET|POST /api/pay/callback` reads authority/track id, calls gateway verify. Success → `paid`, clear `mt_cart`, Telegram «پرداخت شد» with the same order fields + amount. Failure/cancel → leave `new` or set `canceled`, keep cart, show Farsi error on `/cart`.
4. Bot checkout can offer «پرداخت آنلاین» (same request URL) or stay COD.

Do not implement this step on a shop whose operator said they do not need it.

### 9. Menus

wget converts `#mobileSidebar` to `index.html#mobileSidebar`. Bootstrap `querySelector("index.html#mobileSidebar")` is invalid — hamburger does nothing.

Fix every offcanvas/collapse href to `#id` + `data-bs-target="#id"`. Mega-menu: click toggle must not be immediately closed by a document click listener; desktop hover CSS as backup. Bump PWA cache name after JS/CSS fixes.

### 10. Telegram

Webhook `POST /api/telegram/webhook` with `X-Telegram-Bot-Api-Secret-Token` = sha256(token).slice(0,32). Shop + bot orders both call `notifyAdmins` with name, phone, address, lines, total. Admins must `/start` the bot once.

### 11. PWA

`/manifest.webmanifest`, `/sw.js` (network-first, bump cache id on HTML/JS changes), icons 32/180/192/512 + maskable, `apple-touch-icon`, `theme-color` via `export const viewport` (not deprecated metadata.themeColor).

### 12. Deploy

Vercel only unless asked. `npx.cmd vercel --prod --yes --scope <team>`. Custom domain via Vercel + Cloudflare DNS. `curl.exe` for live checks (PowerShell `Invoke-WebRequest` TLS often fails).

Windows/PowerShell: no `&&` (use `;`); `npx.cmd` not `npx`; do not put `@` raw in curl JSON (write a temp file). Vercel Linux: `Images` ≠ `images`.

## Verify live

Hard-refresh. Then curl (200 `text/html`, not octet-stream, not Next 404):

- `/` ` /index.html`
- `/AboutUs` `/Pages/CallUs` `/Home/StoreRules` `/Blog` `/DiscontProducts`
- `/Category/` + target-language slug and (if non-ASCII) mojibake-encoded slug
- `/Product/` + target-language slug
- `/cart` and `/Cart`
- hamburger HTML contains `href="#mobileSidebar"` not `index.html#mobileSidebar`
- checkout creates an order and admins get Telegram (if token + chat ids + `/start`)
- if gateway was requested: request → redirect → verify sets `paid`; failed pay does not mark paid; Telegram fires on successful pay
- `<html lang>` and `dir` match `targetLang`; nav/cart/checkout chrome is in the target language (not leftover source copy)

## Language

Match the **operator's** chat language (this operator often wants Fingilish). That is separate from `sourceLang` / `targetLang` on the shop.
