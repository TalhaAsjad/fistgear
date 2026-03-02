# Fist Gear — Project Flow

This document explains the complete flow of the application from a new user's perspective. It covers every path through the system: sign up, customer shopping, admin product management, and how the two roles interact through shared data.

---

## 1. Entry Point — The Auth Page (`/`)

Every user — customer or admin — starts here. No other page is accessible without a session.

```
Browser hits any route
        ↓
middleware.ts checks for a valid session cookie
        ↓
  No session found → redirect to /
  Session found   → check role → redirect to /shop or /admin
```

The auth page has three tabs:

| Tab | Who uses it | Redirects to |
|-----|-------------|-------------|
| Sign In | Returning customers | `/shop` |
| Sign Up | New customers | `/shop` |
| Admin Sign In | Admins only | `/admin` |

---

## 2. Customer Flow

### 2a. Sign Up (new customer)

```
Customer fills Sign Up form
  → First Name, Last Name, Email, Password, Confirm Password, ToS checkbox
        ↓
authClient.signUp.email() fires
        ↓
better-auth creates:
  - user row (role = "customer" by default)
  - account row (provider_id = "credential", hashed password)
  - session row (token sent as cookie)
        ↓
middleware reads role = "customer"
        ↓
Redirect to /shop
```

### 2b. Sign In (returning customer)

```
Customer fills Sign In form
  → Email, Password
        ↓
authClient.signIn.email() fires
        ↓
better-auth validates password hash in account table
Creates new session row
        ↓
middleware reads role = "customer"
        ↓
Redirect to /shop
```

### 2c. Browsing the Shop (`/shop`)

```
Customer lands on /shop
        ↓
GET /api/products
  → SELECT * FROM product WHERE is_active = true
  → JOIN product_variant to get price range per product
        ↓
Product grid renders:
  - Product cards (image, name, category, price range)
  - Category filter pills: All | Pro Series | Sparring | Bag Work
  - Search bar (filters by name/description via ILIKE)
        ↓
Customer clicks a product card
        ↓
Product detail expands/opens:
  - Full description, brand
  - Size dropdown (from variant.size values)
  - Color dropdown (from variant.color values)
  - On variant selection: show price, stock, variant image
  - "Add to Cart" button (disabled if stock = 0)
```

### 2d. Adding to Cart (Optimistic UI)

```
Customer selects variant and clicks "Add to Cart"
        ↓
[OPTIMISTIC — instant]
  - Cart badge in header increments immediately
  - "Added to cart!" toast appears
        ↓
[BACKGROUND — async]
POST /api/cart { variantId }
  → Check: does cart_item (user_id + variant_id) already exist?
        ↓
  EXISTS:
    Check: current_quantity + 1 <= variant.stock?
      YES → UPDATE cart_item SET quantity = quantity + 1
      NO  → return 400 "Only X left in stock"
        ↓
  NOT EXISTS:
    Check: variant.stock >= 1?
      YES → INSERT cart_item (user_id, variant_id, quantity: 1)
      NO  → return 400 "Out of stock"
        ↓
  API SUCCESS → UI stays as-is (already updated optimistically)
  API FAILURE → roll back badge count, show error toast
```

### 2e. Viewing the Cart (`/shop/cart`)

```
Customer clicks cart icon
        ↓
Navigate to /shop/cart
        ↓
GET /api/cart
  → SELECT cart_item.*, product_variant.*, product.name, product.image_url, product.is_active
    FROM cart_item
    JOIN product_variant ON cart_item.variant_id = product_variant.id
    JOIN product ON product_variant.product_id = product.id
    WHERE cart_item.user_id = [current user]
        ↓
Cart page renders:

  For each item:
    product.is_active = false  → greyed out, "No longer available", Remove button only
    variant.stock = 0          → "Out of stock", quantity controls disabled
    cart_item.quantity > variant.stock → warning "Only X left", auto-adjusted
    Normal item               → image, name, size/color, unit price, +/- controls, line total

  Cart summary:
    Subtotal (sum of active items only)
    "Proceed to Checkout" button (placeholder — future feature)
    "Continue Shopping" link → /shop
```

### 2f. Modifying Cart Quantities (Optimistic UI)

```
Customer clicks + or - on a cart item
        ↓
[OPTIMISTIC — instant]
  - Quantity updates immediately
  - Line total recalculates immediately
  - Cart total recalculates immediately
        ↓
[BACKGROUND — async]
PUT /api/cart/[id] { quantity: newQuantity }
  → Check: newQuantity <= variant.stock?
    YES → UPDATE cart_item SET quantity = newQuantity
    NO  → return 400

  If newQuantity = 0 → DELETE cart_item row instead
        ↓
  API SUCCESS → no further action
  API FAILURE → roll back quantity to previous value, show error
```

### 2g. Removing a Cart Item (Optimistic UI)

```
Customer clicks trash/remove icon
        ↓
[OPTIMISTIC — instant]
  - Row fades out and disappears
  - Cart total updates
        ↓
[BACKGROUND — async]
DELETE /api/cart/[id]
  → DELETE FROM cart_item WHERE id = [id] AND user_id = [current user]
        ↓
  API SUCCESS → no further action
  API FAILURE → row reappears, show error
```

### 2h. Sign Out

```
Customer clicks Sign Out
        ↓
authClient.signOut()
  → DELETE session row from DB
  → Clear session cookie
        ↓
Redirect to /
```

---

## 3. Admin Flow

### 3a. First Admin Setup (one-time, manual)

```
Admin signs up as a normal customer via Sign Up tab
        ↓
In the database (Neon console or seed script):
  UPDATE "user" SET role = 'admin' WHERE email = 'admin@fistgear.com';
        ↓
Admin signs out, then uses "Admin Sign In" tab
        ↓
middleware reads role = "admin" → redirect to /admin
```

### 3b. Admin Sign In

```
Admin fills Admin Sign In tab
  → Email, Password
        ↓
authClient.signIn.email() fires (same auth system as customer)
        ↓
better-auth validates credentials
        ↓
middleware reads role:
  role = "admin"    → redirect to /admin
  role = "customer" → show error: "This account does not have admin access"
```

### 3c. Admin Dashboard (`/admin`)

```
Admin lands on /admin
        ↓
Dashboard fetches:
  - Total products (COUNT from product)
  - Active products (COUNT WHERE is_active = true)
  - Low stock items (COUNT WHERE stock < 5 from product_variant)
        ↓
Renders:
  - Stat cards
  - "Add New Product" quick action button
  - Pending admin invites list
```

### 3d. Adding a New Product (`/admin/products`)

```
Admin clicks "Add New Product"
        ↓
Add Product form opens:
  - Product Name (required)
  - Description
  - Category: dropdown (Pro Series / Sparring / Bag Work)
  - Brand
  - Main Image: tab choice:
      "Paste URL" → text input
      "Upload"    → file picker → POST to Vercel Blob → returns URL
  - Active toggle (default: ON)
        ↓
Admin clicks "Save Product"
        ↓
POST /api/products { name, description, category, brand, image_url, is_active }
  → INSERT INTO product (...) RETURNING id
        ↓
Admin is taken to variant management for that product
        ↓
[If no variants added — product exists but nothing is purchasable. Admin sees a warning.]
```

### 3e. Adding Variants to a Product

```
Admin is on product edit page, variant section
        ↓
Admin clicks "Add Variant"
        ↓
Variant form row appears:
  - Size (optional): "10oz", "12oz", "14oz", "16oz"
  - Color (optional): "Black", "Red", "White"
  - Price (required): dollar amount input (e.g., 79.99)
  - Stock (required): number input (e.g., 15)
  - Weight (optional): number in grams (e.g., 340)
  - Variant Image (optional): URL or upload
        ↓
Admin clicks "Save Variant"
        ↓
POST /api/products/[id]/variants { size, color, price (→ cents), stock, weight, image_url }
  → INSERT INTO product_variant (...)
        ↓
Variant appears in the list below the product form
Admin repeats for each size/color combination
        ↓
Once at least one variant exists → product is live on /shop (if is_active = true)
```

### 3f. Editing a Product or Variant

```
Admin clicks "Edit" on a product row in the table
        ↓
Edit form opens pre-filled with existing product data
Variant list shows all existing variants with Edit/Delete per row
        ↓
Admin changes any field → clicks "Save"
        ↓
PUT /api/products/[id] { updated fields }
  → UPDATE product SET ... WHERE id = [id]
        ↓
Changes are live on /shop immediately
```

```
Admin clicks "Edit" on a variant row
        ↓
Variant fields become editable inline
Admin changes price, stock, etc. → clicks "Save"
        ↓
PUT /api/products/[id]/variants/[variantId] { updated fields }
  → UPDATE product_variant SET ... WHERE id = [variantId]
        ↓
Price/stock changes visible to customers on next page load
```

### 3g. Deactivating / Reactivating a Product

```
Admin clicks "Deactivate" on a product row
        ↓
PUT /api/products/[id] { is_active: false }
  → UPDATE product SET is_active = false WHERE id = [id]
        ↓
Product immediately disappears from /shop (GET /api/products filters WHERE is_active = true)
        ↓
Customers who have this product in their cart:
  → On next cart load: item appears greyed out, "This item is no longer available"
  → Excluded from cart total
        ↓
Admin can click "Activate" to reverse — product reappears on /shop
```

### 3h. Deleting a Product

```
Admin clicks "Delete" on a product row
        ↓
Confirmation prompt: "Are you sure? This cannot be undone from the UI."
        ↓
DELETE /api/products/[id]
  → UPDATE product SET is_active = false WHERE id = [id]
  [Soft delete — never hard-deletes to preserve cart_item integrity]
        ↓
Product moves to "Inactive" status in admin table
Same effect as Deactivate from customer perspective
```

### 3i. Inviting a New Admin

```
Admin goes to /admin → Invite Admin section
        ↓
Enters email address → clicks "Send Invite"
        ↓
POST /api/admin/invite { email }
  → Generate unique token (crypto.randomUUID())
  → INSERT INTO verification (identifier: email, value: token, expires_at: now + 48h)
  → Send email via Resend:
      To: [invited email]
      Subject: "You've been invited to manage Fist Gear"
      Body: invite link → /auth/accept-invite?token=[token]
        ↓
Pending invite appears in the invite list
        ↓
Invitee clicks email link
  → GET /auth/accept-invite?token=[token]
  → Server validates token (exists + not expired)
  → Shows admin signup form (name, password, confirm password)
  → On submit: create user (role = "admin"), invalidate token
  → Redirect to /admin
```

---

## 4. How Customer and Admin Data Connect

The key insight: **admin creates, customer consumes**. They share the same database tables.

```
Admin actions                        Customer sees
─────────────────────────────────────────────────────
INSERT INTO product              →   Product appears on /shop
UPDATE product SET is_active=true →  Product becomes visible
UPDATE product SET is_active=false → Product disappears from /shop
INSERT INTO product_variant      →   Variant appears in dropdown
UPDATE product_variant SET stock →   Stock shows "X in stock" or "Out of stock"
UPDATE product_variant SET price →   New price shows on next customer page load
```

```
Customer actions                     Stored in DB
─────────────────────────────────────────────────────
Add to cart                      →   INSERT/UPDATE cart_item
Change quantity                  →   UPDATE cart_item
Remove item                      →   DELETE cart_item
Sign out                         →   DELETE session (cart_item rows persist)
Sign in again (any device)       →   Same cart_item rows loaded → cart restored
```

---

## 5. Route Protection Summary

The middleware (`src/middleware.ts`) enforces all access control:

```
Request comes in
        ↓
Check session cookie via better-auth
        ↓
No session:
  → redirect to /

Session exists — check role:
  ↓
  role = "customer":
    Allow:  /shop, /shop/cart, /home, /contact
    Block:  /admin/* → redirect to /shop

  role = "admin":
    Allow:  /admin, /admin/products
    Block:  /shop/* → redirect to /admin

Both:
  On / with valid session:
    customer → redirect to /shop
    admin    → redirect to /admin
```

---

## 6. Data Flow Diagram

```
                    ┌─────────────┐
                    │  Auth Page  │  /
                    │     /       │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
       role=customer               role=admin
              │                         │
    ┌─────────▼──────────┐   ┌─────────▼──────────┐
    │   /shop             │   │   /admin            │
    │   Product Catalog   │   │   Dashboard         │
    └─────────┬──────────┘   └─────────┬──────────┘
              │                         │
    ┌─────────▼──────────┐   ┌─────────▼──────────┐
    │   /shop/cart        │   │   /admin/products   │
    │   Shopping Cart     │   │   Product CRUD      │
    └─────────────────────┘   └─────────────────────┘
              │                         │
              └──────────┬──────────────┘
                         │
                  ┌──────▼──────┐
                  │  PostgreSQL  │
                  │  (Neon DB)   │
                  │             │
                  │  product    │
                  │  product_   │
                  │  variant    │
                  │  cart_item  │
                  │  user       │
                  └─────────────┘
```

---

## 7. Key Files Reference

| File | Role in flow |
|------|-------------|
| [src/middleware.ts](src/middleware.ts) | Checks session + role on every request, enforces route access |
| [src/lib/auth.ts](src/lib/auth.ts) | better-auth server config — DB connection, email/password enabled |
| [src/lib/auth-client.ts](src/lib/auth-client.ts) | Client-side: signIn, signUp, signOut, useSession |
| [src/db/schema.ts](src/db/schema.ts) | All table definitions: user, session, account, verification, product, product_variant, cart_item |
| [src/app/page.tsx](src/app/page.tsx) | Auth page UI — Sign In / Sign Up / Admin Sign In tabs |
| [src/app/shop/page.tsx](src/app/shop/page.tsx) | Customer product catalog |
| [src/app/shop/cart/page.tsx](src/app/shop/cart/page.tsx) | Customer shopping cart |
| [src/app/admin/page.tsx](src/app/admin/page.tsx) | Admin dashboard |
| [src/app/admin/products/page.tsx](src/app/admin/products/page.tsx) | Admin product + variant management |
| [src/app/api/products/route.ts](src/app/api/products/route.ts) | Products API (list, create) |
| [src/app/api/cart/route.ts](src/app/api/cart/route.ts) | Cart API (list, add with stock check) |
