# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional landing page for Lic. Giuliana Covello, a psychologist specializing in neurodevelopment and Argentine Sign Language (LSA). The site is in Spanish (locale: es_AR).

## Commands

- `bun dev` — start dev server (Next.js with Turbopack) at localhost:3000
- `bun run build` — production build
- `bun start` — serve production build
- `bun run lint` — run ESLint

Package manager is **Bun** (uses `bun.lock`, not `package-lock.json`).

## Tech Stack

- **Next.js 16** with App Router (single-page app, no additional routes)
- **Tailwind CSS v4** via PostCSS plugin (`@tailwindcss/postcss`)
- **Framer Motion** for animations
- **Lenis** for smooth scrolling
- **TypeScript**, React 19

## Architecture

Single-page landing with all sections composed in `app/page.tsx`. No API routes or dynamic routing.

### Theming

Dark mode uses a `data-theme="dark"` attribute on `<html>`, toggled via `ThemeToggle` component with `localStorage` persistence. CSS custom properties in `globals.css` define two complete palettes (`:root` for light, `[data-theme="dark"]` for dark). Do not use Tailwind's `dark:` variant — use the CSS custom property system instead.

### Layout & Providers

`app/layout.tsx` sets up:
- Google Fonts: **Inter** (body, `--font-sans`) and **Outfit** (headings, `--font-display`)
- `SmoothScrollProvider` wraps children with Lenis smooth scroll (client component)

### Styling Conventions

- Utility classes from `globals.css`: `glass-card`, `glass-card-hover`, `gradient-text`, `gradient-text-gold`, `btn-glow`, `section-padding`, `mesh-gradient`, `dot-pattern`
- Colors are referenced via CSS variables (e.g., `var(--primary)`, `var(--surface)`) mapped to Tailwind theme tokens in the `@theme inline` block
- Components use inline Tailwind + CSS variable references like `bg-[var(--surface)]`

### Components

All in `app/components/`. Every component that uses hooks, event handlers, or Framer Motion must have `"use client"` directive. The section order in page.tsx is: Navbar → Hero → Timeline → Specialties → Foundation → Awards → Contact.
