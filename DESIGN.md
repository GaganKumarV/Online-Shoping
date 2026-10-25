---
name: "Mati Living Design System"
description: "Warm, minimal, and tactile e-commerce design system for handcrafted Indian home decor"
colors:
  primary: "#1e293b"
  primary-hover: "#4338ca"
  accent: "#4f46e5"
  accent-soft: "#eef2ff"
  neutral-bg: "#f8fafc"
  neutral-surface: "#ffffff"
  neutral-text: "#0f172a"
  neutral-muted: "#64748b"
  border-subtle: "#e2e8f0"
  success: "#10b981"
  warning: "#f59e0b"
  danger: "#e11d48"
typography:
  display:
    fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  card-product:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System

## Overview

Mati Living's visual design balances minimal modern e-commerce ergonomics with warm, tactile elegance. The system prioritizes mobile velocity, authentic imagery, clear hierarchical typography, and frictionless transactional confidence.

## Colors

- **Primary Canvas**: Clean ivory / soft slate `#f8fafc` paired with pure white `#ffffff` elevated cards.
- **Text & Hierarchy**:
  - Headings: Deep charcoal `#0f172a` for crisp legibility.
  - Body & Descriptions: Slate `#64748b` for comfortable sustained reading.
  - Subdued / Captions: `#94a3b8`.
- **Accents**:
  - Focus & Active States: Indigo `#4f46e5` and soft tint `#eef2ff`.
  - Trust & Verification: Emerald `#10b981`.
  - Scarcity & Attention: Amber `#f59e0b`.
- **Rules**: Never use saturated neon tones, chaotic rainbow gradients, or low-contrast gray text on tinted backgrounds.

## Typography

- **Typeface**: Inter (`var(--font-inter)`), configured with `tabular-nums` for numeric consistency across catalog pricing and checkout tables.
- **Hierarchy**:
  - `Hero Display`: 3rem to 3.75rem (`text-4xl` to `text-6xl`), `font-extrabold`, `text-balance`.
  - `Section Headings`: 1.875rem (`text-2xl` to `text-3xl`), `font-bold`.
  - `Card Titles`: 0.875rem (`text-sm`), `font-semibold`, line-clamp-2.
  - `Prices`: `text-base` to `text-3xl`, `font-bold`, `tabular-nums`.

## Layout

- **Grid Systems**:
  - Mobile: Single column with edge padding `px-4`.
  - Tablet: 2 columns `gap-6`.
  - Desktop: 4 columns `gap-6` inside maximum width `max-w-7xl mx-auto`.
- **Rhythm**: Standard 8pt base grid (8px, 16px, 24px, 32px, 48px).

## Elevation & Depth

- **Cards**: Border `border-slate-200/90` with subtle layered drop shadows (`hover:shadow-xl hover:shadow-slate-200/50`).
- **Overlays**: Slide-out cart drawer uses `bg-slate-900/50` backdrop blur `backdrop-blur-sm` and high-z-index surface shadow `shadow-2xl`.
- **Sticky Bars**: Header uses subtle glassmorphic backdrop `bg-white/95 backdrop-blur-md` with `border-b border-slate-200/80`.

## Shapes

- **Corner Radii**:
  - Micro badges / pills: `rounded-full`
  - Inputs & controls: `rounded-xl` (12px)
  - Cards & panels: `rounded-2xl` (16px)
  - Hero banners: `rounded-3xl` (24px)

## Components

- **Header**: Persistent brand anchor, global search input, category chips, and live cart counter badge.
- **Product Card**: Aspect-ratio 1:1 image, category pill, low-stock warning, star rating, tabular price, and quick-add button.
- **Cart Drawer**: Slide-out tray with keyboard Escape trap, quantity incrementor/decrementor, line item totals, and checkout CTA.
- **Checkout Summary**: Order cost matrix, shipping threshold alert, and multi-rail payment options.

## Do's and Don'ts

### Do
- Always use `tabular-nums` for currency prices.
- Ensure all clickable icon buttons have explicit `aria-label`.
- Provide visible `:focus-visible` rings on all interactive elements.
- Keep touch targets at or above 44x44px on mobile viewports.

### Don't
- Don't use neon lime or cyan buttons.
- Don't block copy/paste in input fields.
- Don't render generic layout skeletons when actual fallbacks are available.
- Don't hide cart totals or shipping thresholds until the last step.
