# Fist Gear - Product Requirements Document

## Project Overview

**Project Name:** Fist Gear
**Description:** An e-commerce website for professional boxing equipment, featuring dark-themed design with red accents (#f20d0d), built for desktop.
**Industry:** Sports / Boxing Equipment
**Target Audience:** Professional and amateur boxers, combat sports enthusiasts, gym owners

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

---

## Screens

### Screen 0: Login & Sign Up Page (Landing)

| Key             | Value                                              |
|-----------------|----------------------------------------------------|
| **Screen ID**   | `7f4fb96cb6784d87a8b555850f15478d`                 |
| **Screen Name** | `projects/8081122220376108598/screens/7f4fb96cb6784d87a8b555850f15478d` |
| **Title**       | Fist Gear Login and Sign Up Page                   |
| **Dimensions**  | 2560 x 2048                                        |
| **Route**       | `/` (root — landing page)                          |

#### Description

This is the **landing page** of the application. Users must sign in or create an account before accessing the store. It features a two-panel split layout.

#### Sections

1. **Minimal Header**
   - Logo: "FIST GEAR" with martial arts icon
   - Tagline: "Professional Boxing Equipment"

2. **Left Panel — Branding Hero** (desktop only)
   - "Members Only" badge
   - Headline: "Step Into The Ring"
   - Description: "Join the Fist Gear community. Get access to pro-series drops, exclusive deals, and training content from elite fighters."
   - Community stats: 10K+ Fighters, 500+ Gyms, 50+ Countries
   - Background: Boxing imagery with dark gradient overlay

3. **Right Panel — Auth Form**
   - **Tab Toggle:** Sign In / Sign Up (toggle between modes)
   - **Sign In Mode:**
     - Email Address (with mail icon)
     - Password (with lock icon, show/hide toggle)
     - "Remember me" checkbox
     - "Forgot password?" link
     - "Sign In" submit button (navigates to `/home`)
   - **Sign Up Mode:**
     - First Name + Last Name (side-by-side)
     - Email Address (with mail icon)
     - Password (with lock icon, show/hide toggle)
     - Confirm Password
     - Terms of Service & Privacy Policy agreement checkbox
     - "Create Account" submit button (navigates to `/home`)
   - **Social Login:**
     - Continue with Google
     - Continue with Apple
   - Toggle link between Sign In / Sign Up at the bottom

4. **Minimal Footer**
   - Copyright: "© 2024 Fist Gear Corp."
   - Links: Privacy Policy, Terms of Service

---

### Screen 1: Home Page

| Key             | Value                                              |
|-----------------|----------------------------------------------------|
| **Screen ID**   | `8a1ee9e734ee43cfbd45c77c475fd51f`                 |
| **Screen Name** | `projects/8081122220376108598/screens/8a1ee9e734ee43cfbd45c77c475fd51f` |
| **Title**       | Fist Gear Home Page                                |
| **Dimensions**  | 2560 x 5480                                        |

#### Sections

1. **Header / Navigation**
   - Logo: "Fist Gear" branding with tagline "Professional Boxing Equipment"
   - Nav links: Pro Series, Sparring, Bag Work, Apparel
   - Icons: Search, Wishlist, Shopping Cart

2. **Hero Banner**
   - Announcement: "New Arrival: V3 Apex"
   - Headline: "Engineered for Impact"
   - Description: "Professional-grade equipment designed for those who demand ultimate hand protection."
   - CTAs: "Shop Now" button, "View Catalog" button

3. **Combat Categories**
   - Three featured collections displayed as cards:
     - **Pro Series** — "Competition ready precision"
     - **Sparring Essentials** — "Maximum protection for partners"
     - **Bag Work Gold** — "High-density impact absorption"

4. **Features Section — "Built for the Grind"**
   - Three feature highlights with icons:
     - **Superior Hand Protection** — Quad-layer foam padding reduces shock
     - **Industrial-Grade Leather** — Full-grain cowhide construction
     - **Vapor-Flow Cooling** — Integrated mesh and moisture-wicking technology
   - Accompanying product image showcasing detailed stitching

5. **Newsletter Signup — "Inner Circle"**
   - Membership invitation with benefits:
     - Early access to pro-series drops
     - Exclusive 10% off
   - Email input field + subscribe button

6. **Footer**
   - Shop links (product categories)
   - Support resources
   - Location: 1240 Industrial Way, Detroit, MI 48201
   - Legal: Privacy Policy, Terms of Service

---

### Screen 2: Contact Us Page

| Key             | Value                                              |
|-----------------|----------------------------------------------------|
| **Screen ID**   | `e8e79136a1c9464e8b9d744d7c64af21`                 |
| **Screen Name** | `projects/8081122220376108598/screens/e8e79136a1c9464e8b9d744d7c64af21` |
| **Title**       | Fist Gear Contact Us Page                          |
| **Dimensions**  | 2560 x 3164                                        |

#### Sections

1. **Header / Navigation**
   - Logo: "Fist Gear" with martial arts icon
   - Nav links: Shop, About, Community, Contact
   - Icons: Search, Shopping Cart

2. **Hero Section**
   - Headline: "Step into the Ring"
   - Subheading: "Have questions about our pro-grade boxing gear or sizing? Our team of fighters and experts is here to assist you in finding your perfect strike."
   - CTAs: "Browse FAQ" button, "Support Center" button

3. **Contact Form — "Send a Message"**
   - Form fields:
     - First Name (text input)
     - Last Name (text input)
     - Email Address (text input)
     - Subject (dropdown): Order Support, Sizing Assistance, Wholesale Inquiries, Sponsorships, Other
     - Message (textarea)
   - Submit button: "Send"
   - **On Submit Behavior:**
     - Send a notification email to `talha.asjad.at@gmail.com` containing the customer's name, email, subject, and message.
     - Send a confirmation email to the customer's email address acknowledging receipt (e.g., "Thank you for reaching out! Our team will get back to you shortly.").

4. **Contact Information — "HQ Details"**
   - Email: support@fistgear.com
   - Phone: +1 (800) FIST-GEAR
   - Address: 123 Knockout Blvd, Industrial District, Las Vegas, NV 89101
   - Store Hours: Mon–Sat: 9AM – 8PM

5. **Footer**
   - Copyright: "© 2024 Fist Gear Performance Ltd. All rights reserved."
   - Links: Brand Awareness, Podcasts, Video Library

---

## Quick Reference — Screen IDs

For fast access when working with Stitch:

```
AUTH PAGE:      7f4fb96cb6784d87a8b555850f15478d  (landing — /)
HOME PAGE:      8a1ee9e734ee43cfbd45c77c475fd51f  (/home)
CONTACT PAGE:   e8e79136a1c9464e8b9d744d7c64af21  (/contact)
PROJECT ID:     8081122220376108598
```

---

## Tech Stack

| Layer            | Technology        | Rationale                                                                 |
|------------------|-------------------|---------------------------------------------------------------------------|
| **Framework**    | Next.js (App Router) | Server-side API routes for secure email handling, built-in routing, SSR/SSG for SEO |
| **Language**     | TypeScript        | Type safety across form data, API routes, and email payloads              |
| **Styling**      | Tailwind CSS      | Utility-first approach, easy dark theme + design token configuration      |
| **Email Service**| Resend            | Simple API, free tier (100 emails/day), works natively with Next.js API routes |
| **Auth**         | better-auth       | Full-featured auth library with email/password, social login, session management |
| **Database**     | Neon (PostgreSQL) | Serverless Postgres — stores users, sessions, accounts, and verification data |
| **ORM**          | Drizzle ORM       | Type-safe SQL queries, schema management, and migrations                  |

### Authentication Architecture

```
User clicks "Sign Up" or "Sign In"
        ↓
auth-client.ts    →  Client-side helper (calls /api/auth/*)
        ↓
route.ts          →  API catch-all route (/api/auth/[...all])
        ↓
auth.ts           →  better-auth config (Drizzle adapter → Neon DB)
        ↓
schema.ts         →  Defines user, session, account, verification tables
```

**Key files:**

| File | Purpose |
|------|---------|
| `src/lib/auth.ts` | Server-side better-auth config — connects to Neon via Drizzle, enables email/password auth |
| `src/lib/auth-client.ts` | Client-side auth helper — provides `signUp.email()`, `signIn.email()`, `signOut()`, `useSession()` |
| `src/app/api/auth/[...all]/route.ts` | Catch-all API route — forwards all `/api/auth/*` requests to better-auth |
| `src/db/index.ts` | Drizzle database connection using `DATABASE_URL` from env |
| `src/db/schema.ts` | Database schema — `user`, `session`, `account`, `verification` tables |

### Project Structure

```
fistgear/
├── app/
│   ├── page.tsx                        # Login & Sign Up page (landing)
│   ├── home/page.tsx                   # Home page (post-auth)
│   ├── contact/page.tsx                # Contact Us page
│   ├── api/
│   │   ├── contact/route.ts            # Email sending endpoint
│   │   └── auth/[...all]/route.ts      # Auth API catch-all route
├── lib/
│   ├── auth.ts                         # better-auth server config
│   └── auth-client.ts                  # better-auth client helper
├── db/
│   ├── index.ts                        # Drizzle DB connection
│   └── schema.ts                       # Database schema (user, session, etc.)
├── components/                         # Shared UI (Header, Footer, etc.)
├── drizzle.config.ts                   # Drizzle Kit config (migrations)
├── tailwind.config.ts                  # Design tokens from PRD
└── package.json
```

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
