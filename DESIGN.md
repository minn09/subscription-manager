---
version: alpha
name: Subscription Manager
description: Subscription dashboard with a dense sidebar and neutral shadcn/ui surfaces.
colors:
  primary: "oklch(0.205 0 0)"
  on-primary: "oklch(0.985 0 0)"
  secondary: "oklch(0.97 0 0)"
  on-secondary: "oklch(0.205 0 0)"
  tertiary: "oklch(0.577 0.245 27.325)"
  on-tertiary: "oklch(1 0 0)"
  neutral: "oklch(0.985 0 0)"
  on-neutral: "oklch(0.145 0 0)"
  muted: "oklch(0.97 0 0)"
  muted-foreground: "oklch(0.556 0 0)"
  border: "oklch(0.922 0 0)"
  primary-dark: "oklch(0.922 0 0)"
  on-primary-dark: "oklch(0.205 0 0)"
  neutral-dark: "oklch(0.205 0 0)"
  on-neutral-dark: "oklch(0.985 0 0)"
  tertiary-dark: "oklch(0.704 0.191 22.216)"
  border-dark: "oklch(1 0 0 / 10%)"
typography:
  h1:
    fontFamily: system-ui
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 1.2
  body-md:
    fontFamily: system-ui
    fontSize: 1rem
    lineHeight: 1.5
  label-caps:
    fontFamily: system-ui
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: 0.05em
rounded:
  sm: 6px
  md: 8px
  lg: 10px
  xl: 14px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
components:
  sidebar-alert:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.on-neutral}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px
  sidebar-alert-dark:
    backgroundColor: "{colors.neutral-dark}"
    textColor: "{colors.on-neutral-dark}"
    rounded: "{rounded.md}"
    padding: 12px
  category-item:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-neutral}"
    rounded: "{rounded.sm}"
    padding: 8px
---

## Overview

Dense, quiet dashboard for tracking subscriptions. Neutral surfaces and tight spacing keep the category sidebar scannable; color is reserved for category identity and error states.

## Colors

Near-black `primary` on white `neutral` surfaces defines light mode; `secondary`/`muted` carry inactive and supporting surfaces. `tertiary` is the only accent and is reserved for destructive or attention states such as the database-unavailable alert. Dark mode mirrors every role with a `-dark` suffix: light and dark surfaces invert, while `tertiary-dark` stays the single accent.

## Typography

System UI only; no custom webfont is loaded. `h1` for page titles, `body-md` for content and alert copy, `label-caps` for sidebar section labels. Letter spacing is used only on small caps labels.

## Layout

Four-point spacing scale (`sm` 8px, `md` 16px, `lg` 24px). The sidebar is a fixed-width column; category rows are compact single-line items. Alerts occupy the same block as the category list so the layout does not jump between states.

## Elevation & Depth

No shadows. Separation comes from `border` and surface tone changes only; dark mode uses an alpha border (`border-dark`) for the same effect.

## Shapes

Concentric radii derived from a 10px base: `sm` 6px for compact rows, `md` 8px for cards and alerts, `lg` 10px for the base surface, `xl` 14px for outer containers.

## Components

shadcn/ui (new-york) primitives under `apps/client/src/components/ui`; lucide icons. Reuse these before creating new ones. `sidebar-alert` is the new inline state for a failed categories fetch, built from existing tokens; it is not a modal or a toast.

## Do's and Don'ts

- Do: use `{colors.*}` / `{rounded.*}` references for every new surface.
- Do: keep the alert in the sidebar flow so `role="alert"` is announced in context.
- Don't: introduce hardcoded hex/px values when a token exists.
- Don't: add a dependency or a global overlay for this state.

## Motion

No new animation. Respect `prefers-reduced-motion`; existing `tw-animate-css` transitions remain unchanged.

## Accessibility

The alert uses `role="alert"` and `aria-live="assertive"`, with text that names the problem and the next action. Color is never the only signal. Focus order is unchanged.

## Implementation

React 19 + Vite 7 + Tailwind v4 (`@tailwindcss/vite`). Tokens live in `apps/client/src/index.css` (`:root`, `.dark`, `@theme inline`); this file mirrors them for design intent. Validate with `npx -p @google/design.md designmd lint DESIGN.md`.
