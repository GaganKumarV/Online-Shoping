# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience: Young urban professionals and modern homeowners in India who value intentional living and authentic artisan craftsmanship. They shop primarily on smartphones during quick breaks, evenings, or weekends, expecting fluid mobile navigation, instant feedback, and trustworthy checkout experiences.

## Product Purpose

Mati Living exists to connect discerning urban homemakers with authentic, handcrafted Indian decor. Success means visitors can browse artisanal ceramics, handwoven textiles, and sustainable lighting, feel the physical warmth of each piece through clean visuals and truthful descriptions, and complete frictionless mobile purchases with clear INR pricing.

## Positioning

Unlike mass-manufactured, generic plastic home goods from drop-shipping marketplaces, Mati Living curates small-batch handmade home decor crafted by regional artisans using earthy, sustainable materials—terracotta, brass, organic cotton, and reclaimed teak.

## Operating Context

- **Environment**: Mobile web (smartphones) first, desktop secondary.
- **Transaction Context**: Express delivery across urban India, domestic payment rails (UPI, Indian debit/credit cards, NetBanking, COD), and immediate order receipt generation.
- **Browsing Behavior**: Quick visual scanning, detail inspection of materials and craft origins, and instant drawer-based cart interactions.

## Capabilities and Constraints

- **Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS.
- **Data Layer**: Live MySQL database (`products` table) via connection pooling, with reliable zero-config static fallback.
- **State Management**: React Context cart persisted to `localStorage`.
- **E-Commerce Flows**:
  - Home showcase with featured collections.
  - Filterable catalog with search, category filtering, and sorting.
  - Rich product details with stock counters and inventory boundaries.
  - Slide-out cart drawer + dedicated full cart page.
  - Validated checkout flow with mock payment authorization.
  - Order confirmation with receipt printing and tracking estimates.
- **Constraints**: Simple store architecture; zero unnecessary bloat or complex external dependencies.

## Brand Commitments

- **Name**: Mati Living (replacing legacy placeholder "GDG.com").
- **Voice**: Warm, grounded, minimal, premium, and welcoming. Direct and confident, without artificial sales jargon or buzzwords.
- **Aesthetic Direction**: Earthy tones (terracotta, warm oat, sand, soft clay, charcoal), high textural contrast, spacious typography, zero neon, zero harsh rainbow gradients.

## Evidence on Hand

- Fully operational Next.js + Tailwind codebase.
- Live MySQL database seeded with 25 product records.
- Working cart logic backed by 10 automated unit tests.

## Product Principles

1. **Warmth Over Gloss**: Prioritize organic, tactile, and grounded aesthetics that celebrate handmade textures and honest materials.
2. **Mobile Velocity**: Every tap target must feel deliberate, instant, and thumb-friendly. Zero layout shifts or clunky delays.
3. **Restraint and Clarity**: Strip away clutter, promotional popups, and aggressive badges; let the artisanal pieces speak for themselves.
4. **Frictionless Trust**: Transparent INR (₹) pricing, realistic inventory limits, and accessible, predictable checkout steps.

## Accessibility & Inclusion

- Adherence to WCAG 2.1 AA contrast standards.
- High color contrast for earthy palettes against neutral backdrops.
- Explicit touch targets (minimum 44x44px for primary mobile actions).
- Full keyboard operability and descriptive ARIA semantics for non-visual assistive technology.
