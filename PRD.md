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
HOME PAGE:      8a1ee9e734ee43cfbd45c77c475fd51f
CONTACT PAGE:   e8e79136a1c9464e8b9d744d7c64af21
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

### Project Structure

```
fistgear/
├── app/
│   ├── page.tsx              # Home page
│   ├── contact/page.tsx      # Contact Us page
│   └── api/contact/route.ts  # Email sending endpoint
├── components/               # Shared UI (Header, Footer, etc.)
├── tailwind.config.ts        # Design tokens from PRD
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
