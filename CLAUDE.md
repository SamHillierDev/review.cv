# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

ReviewCV is an AI-powered CV/resume analysis landing page built with React, TypeScript, Vite, and shadcn/ui. Currently a static front-end with simulated analysis functionality (no backend yet).

## Commands

- `npm run dev` — Start dev server on port 8080
- `npm run build` — Production build
- `npm run build:dev` — Development build
- `npm run lint` — ESLint
- `npm run test` — Run tests once (vitest)
- `npm run test:watch` — Run tests in watch mode

## Architecture

- **Vite + React 18 + TypeScript** with SWC for fast compilation
- **Routing**: react-router-dom with routes defined in `src/App.tsx`. Add new routes above the catch-all `*` route.
- **UI Components**: shadcn/ui (Radix primitives) in `src/components/ui/`. Configured via `components.json` with the `default` style, CSS variables, and `@/` path aliases.
- **Styling**: Tailwind CSS with CSS custom properties for theming (light/dark mode defined in `src/index.css`). Custom gradients (`gradient-primary`, `gradient-hero`, `text-gradient`) and animations (`animate-float`, `animate-slide-up`, `animate-fade-in`) are defined as utility classes in `src/index.css`.
- **Fonts**: Inter (body) and Playfair Display (headings), loaded via Google Fonts.
- **State management**: @tanstack/react-query (client initialized in `src/App.tsx`)
- **Path alias**: `@/` maps to `./src/` (configured in vite, tsconfig, and vitest)

## Key Directories

- `src/pages/` — Page components (Index, NotFound)
- `src/components/sections/` — Landing page sections (Hero, Services, Testimonials, CTA)
- `src/components/layout/` — Header, Footer
- `src/components/upload/` — CVUploadArea (drag-and-drop file upload, currently simulated)
- `src/components/ui/` — shadcn/ui primitives (do not manually edit; use `npx shadcn-ui` to add/update)
- `src/hooks/` — Custom hooks
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/test/` — Test files and setup (vitest + jsdom + @testing-library)

## Deployment

Automatically deployed to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`.

## TypeScript

Strict null checks and unused variable checks are disabled in `tsconfig.json`. ESLint also has `@typescript-eslint/no-unused-vars` turned off.
