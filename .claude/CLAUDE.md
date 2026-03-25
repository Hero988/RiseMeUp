# RiseMeUp Sustainability — Claude Code Guidelines

## Project Overview

**RiseMeUp Sustainability** is a non-profit charity website supporting the Nuba Mountain community in Sudan through sustainable horticulture, farming, and green energy. Built with React 19 + Convex + Vite + TypeScript. The site is a single-page application with 11 content sections, a donate modal, scroll-reveal animations, and full responsive design.

## Tech Stack

- **Framework:** React 19.2.3, TypeScript 5.8.3
- **Build:** Vite 6.4.1
- **Backend:** Convex 1.32.0 (DB, real-time queries, mutations)
- **Styling:** Plain CSS with CSS custom properties (no Tailwind)
- **Fonts:** Fraunces (headings), DM Sans (body) — loaded via Google Fonts
- **Package manager:** pnpm

## Key Files

- `mockup-6-cinematic-warmth/index.html` — The visual source of truth (complete HTML mockup)
- `src/App.tsx` — Root component, wires all sections, global scroll-reveal observer, seed trigger
- `src/index.css` — All CSS (2300+ lines, mirrors mockup exactly)
- `src/components/` — 15 React components (one per section/feature)
- `src/hooks/` — `useScrollReveal.ts`, `useCountUp.ts`
- `convex/schema.ts` — Database schema (8 tables)
- `convex/queries.ts` — All read queries
- `convex/mutations.ts` — Contact form + newsletter mutations
- `convex/seed.ts` — Seeds all content data on first load

## Design System — Cinematic Warmth Palette

- **Dark:** #131313, **Charcoal:** #1e1e2a
- **Terracotta:** #c2703a, **Terracotta Light:** #d4884f
- **Coral:** #e88d67, **Coral Light:** #f0a585
- **Olive:** #3d5a3e, **Olive Light:** #4e7350, **Olive Dark:** #2c422d
- **Cream:** #fefaf3, **Sand:** #f4e8d1, **Gold:** #ffb300
- Dark sections: dark/charcoal/olive backgrounds, light text
- Light sections: cream/sand/white backgrounds, dark text
- All CSS variables defined in `:root` in `src/index.css`

## Project Structure

```
RiseMeUp/
├── index.html              # Vite entry point
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config (src)
├── tsconfig.node.json      # TypeScript config (vite)
├── package.json            # Dependencies & scripts
├── public/                 # Static assets (images, logos)
├── src/
│   ├── main.tsx            # React entry, ConvexProvider setup
│   ├── App.tsx             # Root component + global scroll-reveal observer
│   ├── index.css           # Complete CSS (all styles)
│   ├── vite-env.d.ts       # Vite type declarations
│   ├── components/
│   │   ├── Navbar.tsx      # Fixed nav, scroll effect, mobile hamburger
│   │   ├── Hero.tsx        # Text scramble, parallax, floating cards
│   │   ├── About.tsx       # Two-column, value cards
│   │   ├── VisionMission.tsx # Vision/Mission gradient cards
│   │   ├── Projects.tsx    # Film strip (desktop) + accordion (mobile)
│   │   ├── Team.tsx        # 3D flip cards
│   │   ├── Impact.tsx      # Animated stat counters
│   │   ├── Objectives.tsx  # Objective cards with left-border grow
│   │   ├── SDGs.tsx        # Colored UN SDG cards
│   │   ├── Services.tsx    # Service cards with gradient border reveal
│   │   ├── Contact.tsx     # Contact form → Convex mutation
│   │   ├── Footer.tsx      # Newsletter form → Convex mutation
│   │   ├── DonateModal.tsx # Modal with amount selection
│   │   ├── BackToTop.tsx   # Scroll-to-top button
│   │   └── BokehBackground.tsx # Floating animated circles
│   └── hooks/
│       ├── useScrollReveal.ts  # IntersectionObserver for individual elements
│       └── useCountUp.ts      # Animated number counter
├── convex/
│   ├── schema.ts           # 8 tables: siteConfig, teamMembers, projects, etc.
│   ├── queries.ts          # getTeamMembers, getProjects, getObjectives, etc.
│   ├── mutations.ts        # submitContactMessage, subscribeNewsletter
│   ├── seed.ts             # seedAll mutation (idempotent)
│   └── tsconfig.json       # Convex TypeScript config
└── mockup-6-cinematic-warmth/  # Source mockup (visual reference)
```

## Architecture Notes

### Scroll-Reveal System
The mockup uses a global IntersectionObserver for all `.reveal` elements. In React this is implemented as a `useEffect` in `App.tsx` with a `MutationObserver` to catch dynamically-rendered elements (from Convex queries). Individual `useScrollReveal` refs are used for section headers; the global observer handles everything else. **Do not remove the global observer** — without it, all Convex-driven grid items stay invisible (opacity: 0).

### Convex Data Flow
- `App.tsx` calls `seedAll` mutation on mount (idempotent — checks for "seeded" flag)
- Components that display dynamic data use `useQuery` and return `null` while loading
- Contact form and newsletter use `useMutation` to write to Convex
- All query imports use path `../../convex/_generated/api` from components

### Responsive Breakpoints
- **1024px:** Single-column hero, 2-col stats/team, hide hero visual
- **768px:** Hide desktop nav (show hamburger), film strip → accordion, single-col services/contact/footer
- **480px:** Single-col everything, smaller headings

## TypeScript Standards

- **Strict mode** — `strict: true` in tsconfig.json
- **verbatimModuleSyntax** — Use `import type` for type-only imports
- **No `any` types** — Use `unknown` with type guards instead
- **Use `React.ReactNode`** not `JSX.Element` for component maps

## Commands Reference

```bash
# Dev server (need both terminals)
npx convex dev          # Terminal 1: Convex backend
pnpm run dev            # Terminal 2: Vite frontend

# Type check
npx tsc --noEmit

# Production build
pnpm build

# Deploy Convex functions
npx convex deploy
```

## Convex-Specific Guidelines

- Use `Id<"tableName">` for Convex document IDs
- Use `Doc<"tableName">` for document types
- Import types from `convex/_generated/dataModel`
- Seed data is idempotent — safe to call multiple times
- All tables are small (<100 docs) so `.collect()` is fine for this project

## Definition of Done

Before returning to user, verify:
- [ ] `pnpm tsc --noEmit` passes with zero errors
- [ ] `pnpm build` completes successfully
- [ ] New components match their corresponding mockup design
- [ ] Dark/light mode works on any new UI
- [ ] No secrets committed (`.env*` is gitignored)
- [ ] Any new Convex queries use `.withIndex()` (not `.filter()`) on tables with >100 docs
- [ ] No unbounded `.collect()` calls — all are on tight index ranges or small tables
- [ ] Large blobs (HTML, message arrays) stored in File Storage, not inline in documents
- [ ] No double-reads in mutations (don't `db.get()` after `db.patch()` unnecessarily)
