# Fist Gear - Product Requirements Document

## Project Overview

**Project Name:** Fist Gear
**Description:** A full-featured e-commerce platform for professional boxing gloves. Customers browse products with variant selection (size, color), manage a persistent shopping cart, and purchase gloves. Admins manage the entire product catalog through a UI dashboard — adding, editing, deactivating, and organizing products and their variants. Features role-based authentication, a DB-backed shopping cart with optimistic UI, and a dark-themed design with red accents.
**Industry:** Sports / Boxing Equipment
**Target Audience:** Professional and amateur boxers, combat sports enthusiasts, gym owners
**Platform:** Desktop-first (responsive)

---

## Core Features

### 1. Role-Based Authentication

- Two user roles: **customer** and **admin**
- Role stored as a `role` column on the `user` table (default: `"customer"`)
- Auth page (`/`) has three tabs: **Sign In**, **Sign Up**, and **Admin Sign In**
- Sign Up always creates a `customer` account — admins cannot self-register
- After login, middleware reads the user's role and redirects:
  - `customer` → `/shop`
  - `admin` → `/admin`
- Admins cannot access customer routes; customers cannot access admin routes
- Session-based auth via better-auth (cookie token)

### 2. Admin Creation

- **First admin:** Sign up as a normal customer, then run a seed script that sets `role = "admin"` in the DB. One-time bootstrap.
- **Subsequent admins:** Invite system from the admin dashboard:
  - Admin enters an email in the "Invite Admin" section
  - System creates a row in the `verification` table with a unique invite token (expires 48h)
  - Sends an invite email via Resend: "You've been invited as an admin on Fist Gear"
  - Recipient clicks the link → lands on a special signup form → account is created with `role = "admin"`
  - No one can self-register as admin

### 3. Product Catalog (Customer — `/shop`)

- Displays all active products (`is_active = true`) from the `product` table
- **Product card** shows: main image, name, price range (min–max across variants), category badge
- Filtering by category: Pro Series, Sparring, Bag Work
- Clicking a product card opens product detail with:
  - Full description, brand
  - Variant selector: size and color dropdowns (populated from `product_variant` rows)
  - Selected variant's price, stock status, and variant-specific image (if any)
  - "Add to Cart" button (disabled if out of stock)
- Search: basic text search on product name/description via `ILIKE`

### 4. Product Variant Model

- Each product (e.g., "V3 Apex Pro Gloves") has one or more **variants**
- A variant is a specific purchasable combination: size + color (e.g., "12oz / Black")
- Each variant has its own: price (in cents), stock count, optional image
- Admin creates the base product once, then adds variants underneath it
- Cart references `variant_id`, not `product_id`
- This prevents catalog bloat (no separate product for every size/color combo)

### 5. Shopping Cart (Customer — `/shop/cart`)

- **DB-backed** — persists across sessions and devices
- Cart icon in header shows live item count badge

#### Cart Behavior

- **Add to Cart:** `POST /api/cart { variantId }` → server checks:
  1. Does a `cart_item` with this `user_id + variant_id` already exist?
  2. YES → increment quantity (if stock allows)
  3. NO → insert new row with quantity 1 (if stock > 0)
  4. Stock insufficient → return error, do not add
- **Change Quantity:** `PUT /api/cart/[id] { quantity }` → validate against stock, update or delete if 0
- **Remove Item:** `DELETE /api/cart/[id]` → delete the row
- **Load Cart:** `GET /api/cart` → JOIN cart_item with product_variant and product, return items + totals

#### Stock Validation

- **On add-to-cart:** Check `variant.stock >= (current cart quantity + 1)`. Reject if insufficient.
- **On quantity change:** Check `variant.stock >= new quantity`. Reject if insufficient.
- **On cart page load:** Re-validate stock for every item. If stock dropped below cart quantity, show warning: "Only X left in stock" and auto-adjust quantity.
- **Stock is NOT decremented on add-to-cart.** Stock only decreases at checkout (future feature). Cart represents intent, not commitment.

#### Deactivated / Unavailable Products in Cart

- Products are **never hard-deleted**. Admin uses `is_active = false` to hide them from the shop.
- On cart page load, each item is checked:
  - If `product.is_active = false` → show item greyed out with label "This item is no longer available" and a "Remove" button
  - If variant stock = 0 → show "Out of stock" label, disable quantity controls
- These items are excluded from the cart total calculation

#### Unique Constraint

- `UNIQUE(user_id, variant_id)` on the `cart_item` table
- Enforced at the DB level — prevents duplicate rows from double-clicks, race conditions, or bugs
- Application logic uses upsert (INSERT ON CONFLICT UPDATE quantity)

#### Optimistic UI

- When customer clicks "Add to Cart":
  1. Immediately increment the cart badge count in the header
  2. Show a brief "Added to cart" toast/confirmation
  3. Fire the `POST /api/cart` request in the background
  4. If API succeeds → no further action (UI already reflects the change)
  5. If API fails (out of stock, server error) → roll back the badge count, show error
- When customer changes quantity (+/-):
  1. Immediately update the displayed quantity and line total
  2. Fire the `PUT /api/cart/[id]` request in the background
  3. On failure → roll back to previous quantity, show error
- When customer removes an item:
  1. Immediately hide the item row (with a brief fade-out)
  2. Fire the `DELETE /api/cart/[id]` request
  3. On failure → restore the row, show error

### 6. Admin Dashboard & Product Management

This is the core management system. Everything the customer sees on `/shop` is created and controlled from here.

#### Dashboard (`/admin`)

- Welcome message: "Welcome, [Admin Name]"
- Quick stats: Total Products, Active Products, Low Stock Items (stock < 5)
- Quick action: "Add New Product" button
- Invite Admin section: email input, send invite, pending invites list

#### Product List (`/admin/products`)

- Table showing ALL products (active + inactive)
- Each row: thumbnail, name, category, number of variants, price range, active/inactive badge
- Action buttons per row:
  - **Edit** → opens product edit form with variant management
  - **Activate / Deactivate** → toggles `is_active` (hides/shows on customer shop instantly)
  - **Delete** → soft delete (sets `is_active = false`, never hard-deletes)
- **"Add New Product"** button at top

#### Add Product Form

| Field        | Required | Type                   | Notes                                        |
|--------------|----------|------------------------|----------------------------------------------|
| Product Name | Yes      | text                   | e.g., "V3 Apex Pro Gloves"                  |
| Description  | No       | textarea               | Full description shown to customer            |
| Category     | Yes      | dropdown               | Pro Series, Sparring, Bag Work               |
| Brand        | No       | text                   | e.g., "Fist Gear", "Rival", "Winning"       |
| Main Image   | No       | URL paste OR file upload| Primary image shown on product card           |
| Active       | Yes      | toggle                 | Default ON. If OFF, hidden from shop          |

After saving → admin is taken to variant management for that product.

#### Variant Management (within product edit)

Each variant = one purchasable item (specific size + color combo).

| Field         | Required | Type                   | Notes                                        |
|---------------|----------|------------------------|----------------------------------------------|
| Size          | No       | text                   | e.g., "10oz", "12oz", "14oz", "16oz"        |
| Color         | No       | text                   | e.g., "Black", "Red", "White"               |
| Price         | Yes      | number (dollars)       | Admin enters $79.99 → stored as 7999 cents   |
| Stock         | Yes      | number                 | 0 = "Out of Stock" on shop                   |
| Weight        | No       | number (grams)         | e.g., 350 → displayed as "350g"             |
| Variant Image | No       | URL paste OR file upload| Overrides main product image for this variant |

- **"Add Variant"** button to add a new row
- Each existing variant has **Edit** and **Delete** buttons
- A product with zero variants has nothing for the customer to buy (shown as warning to admin)

#### Example: Admin Creates → Customer Sees

Admin creates:
```
Product: "V3 Apex Pro Gloves"
  Category: Pro Series | Brand: Fist Gear
  Description: "Competition-grade 3-layer foam..."
  Image: v3-apex.jpg | Active: YES

  Variants:
    12oz / Black  — $79.99 — Stock: 15 — 340g
    12oz / Red    — $79.99 — Stock: 8  — 340g
    16oz / Black  — $89.99 — Stock: 12 — 400g
    16oz / Red    — $89.99 — Stock: 0  — 400g
```

Customer sees on `/shop`:
- Product card: "V3 Apex Pro Gloves" | Pro Series | $79.99–$89.99 | image
- Click → detail view: size dropdown (12oz, 16oz), color dropdown (Black, Red)
- Select 16oz / Red → "Out of Stock", Add to Cart disabled
- Select 12oz / Black → "$79.99 — 15 in stock", Add to Cart enabled

### 7. Image Handling

- Admin has two options when setting product/variant images:
  - **Paste URL** — for external images, stored directly as `image_url`
  - **Upload file** — uploaded to Vercel Blob (free tier, 250MB), returned URL stored as `image_url`
- Both paths result in a URL string in the database — frontend treats them identically
- Images are optional — a placeholder is shown when no image is set

### 8. Existing Pages (Unchanged)

- `/home` — Marketing home page (hero, collections, features, newsletter)
- `/contact` — Contact form with Resend email integration

---

## Screens

### Screen 0: Auth Page (`/`)

| Key       | Value  |
|-----------|--------|
| **Access**| Public |

1. **Minimal Header** — Logo + tagline
2. **Left Panel — Branding Hero** — "Step Into The Ring", community stats
3. **Right Panel — Auth Form**
   - **Tab Toggle:** Sign In / Sign Up / Admin Sign In
   - **Sign In (Customer):** Email, Password → redirects to `/shop`
   - **Sign Up (Customer):** First Name, Last Name, Email, Password, Confirm, ToS → redirects to `/shop`
   - **Admin Sign In:** Email, Password → redirects to `/admin`. Non-admin accounts get error.
   - Social Login: Google, Apple (UI only for now)
4. **Minimal Footer** — Copyright, Privacy Policy, Terms of Service

### Screen 1: Shop Page (`/shop`)

| Key       | Value          |
|-----------|----------------|
| **Access**| Customer only  |

1. **Header** — Logo, category filter links, Search, Cart (with badge), Sign Out
2. **Category Filter Bar** — Pills: All | Pro Series | Sparring | Bag Work
3. **Product Grid** — Cards: image, name, category badge, price range, "View" button
4. **Product Detail** (expanded/modal) — Description, variant selector (size/color), price, stock, "Add to Cart"
5. **Footer**

### Screen 2: Cart Page (`/shop/cart`)

| Key       | Value          |
|-----------|----------------|
| **Access**| Customer only  |

1. **Header** — Same as shop
2. **Cart Items** — Image, name, variant (size/color), unit price, quantity controls (+/-), line total, remove
3. **Unavailable Items** — Greyed out: "No longer available" or "Out of stock"
4. **Cart Summary** — Subtotal, "Proceed to Checkout" (placeholder), "Continue Shopping"
5. **Empty State** — "Your cart is empty" + link to `/shop`

### Screen 3: Admin Dashboard (`/admin`)

| Key       | Value       |
|-----------|-------------|
| **Access**| Admin only  |

1. **Admin Header** — Logo + "Admin Panel", nav (Dashboard, Products), Sign Out
2. **Stats Cards** — Total Products, Active Products, Low Stock
3. **Quick Action** — "Add New Product" button
4. **Invite Admin** — Email input, send invite, pending invites list

### Screen 4: Admin Product Management (`/admin/products`)

| Key       | Value       |
|-----------|-------------|
| **Access**| Admin only  |

1. **Admin Header**
2. **"Add New Product" Button**
3. **Product Table** — Thumbnail, Name, Category, Variants count, Price range, Status badge, Actions (Edit, Toggle Active, Delete)
4. **Add/Edit Product Form** — Name, Description, Category, Brand, Image (URL or upload), Active toggle
5. **Variant Management** (below product form) — Table of variants: Size, Color, Price, Stock, Weight, Image. Add/Edit/Delete per variant. Warning if zero variants exist.

### Screen 5: Home Page (`/home`) — Unchanged

Marketing page: hero banner, featured collections, features section, newsletter signup.

### Screen 6: Contact Page (`/contact`) — Unchanged

Contact form with Resend email integration, HQ details.

---

## Route Map

| Route             | Page                  | Access        | Description                       |
|-------------------|-----------------------|---------------|-----------------------------------|
| `/`               | Auth Page             | Public        | Sign In / Sign Up / Admin Login   |
| `/shop`           | Product Catalog       | Customer only | Browse products, view variants    |
| `/shop/cart`      | Shopping Cart         | Customer only | View/edit cart, see totals        |
| `/admin`          | Admin Dashboard       | Admin only    | Stats, quick actions, invites     |
| `/admin/products` | Product Management    | Admin only    | Full CRUD: products + variants    |
| `/home`           | Marketing Home        | Authenticated | Hero, collections, features       |
| `/contact`        | Contact Us            | Authenticated | Contact form with email           |

## API Endpoints

### Products API

| Method | Path                                          | Access   | Description                  |
|--------|-----------------------------------------------|----------|------------------------------|
| GET    | `/api/products`                               | Customer | List active products         |
| GET    | `/api/products/all`                           | Admin    | List all products            |
| GET    | `/api/products/[id]`                          | Customer | Product detail + variants    |
| POST   | `/api/products`                               | Admin    | Create product               |
| PUT    | `/api/products/[id]`                          | Admin    | Update product               |
| DELETE | `/api/products/[id]`                          | Admin    | Soft-delete (is_active=false)|

### Variants API

| Method | Path                                          | Access | Description      |
|--------|-----------------------------------------------|--------|------------------|
| POST   | `/api/products/[id]/variants`                 | Admin  | Add variant      |
| PUT    | `/api/products/[id]/variants/[variantId]`     | Admin  | Update variant   |
| DELETE | `/api/products/[id]/variants/[variantId]`     | Admin  | Delete variant   |

### Cart API

| Method | Path             | Access   | Description                         |
|--------|------------------|----------|-------------------------------------|
| GET    | `/api/cart`      | Customer | Get cart items with product details |
| POST   | `/api/cart`      | Customer | Add item (upsert + stock check)    |
| PUT    | `/api/cart/[id]` | Customer | Update quantity (+ stock check)    |
| DELETE | `/api/cart/[id]` | Customer | Remove item from cart              |

### Admin Invite API

| Method | Path                | Access | Description             |
|--------|---------------------|--------|-------------------------|
| POST   | `/api/admin/invite` | Admin  | Send admin invite email |

---

## Tech Stack

| Layer            | Technology           | Rationale                                                         |
|------------------|----------------------|-------------------------------------------------------------------|
| **Framework**    | Next.js (App Router) | Server-side API routes, built-in routing, SSR/SSG                 |
| **Language**     | TypeScript           | Type safety across the full stack                                 |
| **Styling**      | Tailwind CSS         | Utility-first, dark theme + design tokens                         |
| **Email**        | Resend               | Contact form emails + admin invite emails                         |
| **Auth**         | better-auth          | Email/password auth, session management, role support             |
| **Database**     | Neon (PostgreSQL)    | Serverless Postgres — users, products, variants, cart, sessions   |
| **ORM**          | Drizzle ORM          | Type-safe schema, migrations, queries                             |
| **File Storage** | Vercel Blob          | Product image uploads (free tier, 250MB)                          |

### Architecture

```
Customer / Admin
        ↓
auth-client.ts    →  signIn / signUp (calls /api/auth/*)
        ↓
route.ts          →  /api/auth/[...all] catch-all
        ↓
auth.ts           →  better-auth (Drizzle adapter → Neon)
        ↓
schema.ts         →  user (role), product, product_variant, cart_item
        ↓
middleware.ts      →  session + role check → /shop or /admin
```

### Project Structure

```
fistgear/
├── src/
│   ├── app/
│   │   ├── page.tsx                            # Auth page
│   │   ├── layout.tsx                          # Root layout
│   │   ├── globals.css                         # Tailwind + CSS variables
│   │   ├── home/page.tsx                       # Marketing home
│   │   ├── contact/page.tsx                    # Contact form
│   │   ├── shop/
│   │   │   ├── page.tsx                        # Product catalog
│   │   │   └── cart/page.tsx                   # Shopping cart
│   │   ├── admin/
│   │   │   ├── page.tsx                        # Admin dashboard
│   │   │   └── products/page.tsx               # Product + variant CRUD
│   │   └── api/
│   │       ├── auth/[...all]/route.ts          # Auth API
│   │       ├── contact/route.ts                # Contact email API
│   │       ├── products/
│   │       │   ├── route.ts                    # GET / POST products
│   │       │   └── [id]/
│   │       │       ├── route.ts                # GET / PUT / DELETE product
│   │       │       └── variants/
│   │       │           ├── route.ts            # POST variant
│   │       │           └── [variantId]/route.ts# PUT / DELETE variant
│   │       ├── cart/
│   │       │   ├── route.ts                    # GET / POST cart
│   │       │   └── [id]/route.ts               # PUT / DELETE cart item
│   │       └── admin/
│   │           └── invite/route.ts             # POST admin invite
│   ├── lib/
│   │   ├── auth.ts                             # better-auth server config
│   │   └── auth-client.ts                      # better-auth client helper
│   ├── db/
│   │   ├── index.ts                            # Drizzle DB connection
│   │   └── schema.ts                           # All table definitions
│   └── middleware.ts                           # Auth + role-based routing
├── drizzle/                                    # Migration files
├── drizzle.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Database Schema Summary

| Table             | Purpose                              | Key Columns                                              |
|-------------------|--------------------------------------|----------------------------------------------------------|
| `user`            | User accounts with role              | id, name, email, **role** ("customer"/"admin")           |
| `session`         | Active login sessions                | id, user_id, token, expires_at                           |
| `account`         | Login methods (credential, OAuth)    | id, user_id, provider_id, password                       |
| `verification`    | Email verification + admin invites   | id, identifier, value, expires_at                        |
| `product`         | Base product info (admin-managed)    | id, name, description, category, brand, image_url, is_active |
| `product_variant` | Purchasable size/color combos        | id, product_id, size, color, price, stock, weight, image_url |
| `cart_item`       | Customer cart items                  | id, user_id, variant_id, quantity — UNIQUE(user_id, variant_id) |

Full schema details in [SCHEMA.md](SCHEMA.md).

---

## Design Tokens

| Token           | Value              |
|-----------------|--------------------|
| Color Mode      | Dark               |
| Primary Color   | `#f20d0d`          |
| Font Family     | Lexend             |
| Border Radius   | 8px                |
| Saturation      | 3                  |
| Device Target   | Desktop (1280px)   |

---

## Stitch Project Reference

| Key              | Value                          |
|------------------|--------------------------------|
| **Project ID**   | `8081122220376108598`          |
| **Project Name** | `projects/8081122220376108598` |
| **Device Type**  | Desktop                        |
| **Color Mode**   | Dark                           |
| **Primary Color**| `#f20d0d` (Red)                |
| **Font**         | Lexend                         |
| **Roundness**    | 8px                            |

## Quick Reference — Screen IDs

```
AUTH PAGE:      7f4fb96cb6784d87a8b555850f15478d  (/)
HOME PAGE:      8a1ee9e734ee43cfbd45c77c475fd51f  (/home)
CONTACT PAGE:   e8e79136a1c9464e8b9d744d7c64af21  (/contact)
PROJECT ID:     8081122220376108598
```
