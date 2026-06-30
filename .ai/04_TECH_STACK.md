# TECH_STACK.md

> "Choose technology intentionally.
> Every dependency increases the long-term maintenance cost."

---

# Purpose

This document defines the official technology stack for the project.

These decisions are final unless explicitly changed.

Claude must never suggest alternative libraries without a compelling architectural reason.

The objective is to maximize development speed, maintainability, deployment simplicity, and code quality within the 24-hour assignment.

---

# Technology Philosophy

The technology stack follows four principles:

1. Mature and stable
2. Excellent developer experience
3. Minimal boilerplate
4. Production-ready foundations

Avoid introducing libraries that solve problems we do not have.

---

# Official Stack

## Framework

Next.js 15 (App Router)

Reason:

- Full-stack framework
- Server Components
- Server Actions
- Excellent routing
- Great deployment support
- Strong TypeScript integration

Do not use:

- Vite
- Remix
- React Router

---

## Language

TypeScript (Strict Mode)

Reason:

- End-to-end type safety
- Better AI-generated code
- Easier maintenance
- Fewer runtime bugs

Never disable strict mode.

Never use `any` unless absolutely unavoidable.

---

## Styling

Tailwind CSS

Reason:

- Rapid development
- Consistent design
- Utility-first workflow
- Easy responsiveness

Avoid custom CSS files unless necessary.

Prefer reusable UI components.

---

## Component Library

shadcn/ui

Reason:

- Accessible by default
- Customizable
- Modern design
- Tailwind-native
- Excellent developer experience

Do not introduce Material UI, Ant Design, Chakra UI, or Bootstrap.

---

## Icons

Lucide React

Reason:

- Lightweight
- Consistent
- Matches shadcn/ui

---

## Theme

next-themes

Reason:

- Simple light/dark mode support
- Works well with App Router

---

## Database

SQLite

Reason:

- Zero configuration
- Fast local setup
- Perfect for assignment scope
- Easy deployment

Do not use PostgreSQL or MySQL for this assignment.

If the application evolves beyond the assignment, Prisma makes migration straightforward.

---

## ORM

Prisma

Reason:

- Type-safe database client
- Excellent developer experience
- Easy schema evolution
- Familiar architecture from the analyzed LMS

Avoid introducing Drizzle or raw SQL.

---

## Validation

Zod

Reason:

- Single source of truth
- Shared client/server validation
- Type inference

Validation schemas belong in one shared location.

---

## Forms

React Hook Form

Reason:

- Minimal re-renders
- Excellent Zod integration
- Mature ecosystem

---

## Authentication

Simple credentials-based authentication.

Goal:

Support the learning experience.

Do not implement:

- OAuth
- Social login
- Magic links
- Email verification
- Multi-factor authentication

Authentication should remain intentionally lightweight.

---

## Data Fetching

Server Components

Reads should happen on the server whenever possible.

Avoid unnecessary client-side fetching.

---

## Mutations

Server Actions

Reason:

- Type-safe
- No REST boilerplate
- Matches App Router architecture
- Cleaner codebase

Only create Route Handlers when external integrations require them.

---

## State Management

Preferred order:

1. Server State
2. Props
3. Local Component State
4. React Context (only when justified)

Do not use:

- Redux
- Zustand
- MobX
- Recoil

unless there is a genuine architectural need.

---

## File Uploads

Not required.

Use static assets and embedded YouTube videos.

Cloud uploads are outside assignment scope.

---

## Video Playback

Embedded YouTube videos.

Reason:

Assignment explicitly allows sample YouTube content.

Do not implement custom video hosting.

---

## Animations

Framer Motion (optional, minimal use)

Use only where interaction quality improves.

Avoid excessive animations.

---

## Notifications

sonner

Reason:

Simple toast notifications.

Consistent with modern React applications.

---

## Tables

Only if needed.

Prefer simple responsive layouts over complex data tables.

---

## Charts

Not required.

Dashboard should prioritize clarity over analytics.

---

## Linting

ESLint

Must pass before considering a feature complete.

---

## Formatting

Prettier

Use consistent formatting across the project.

---

## Package Manager

pnpm (preferred)

Alternative:

npm

Do not mix package managers.

---

# Folder Philosophy

Use feature-based organization.

Example:

app/

components/

hooks/

lib/

prisma/

types/

public/

Avoid deep nesting.

Avoid folders with only one file unless required by Next.js conventions.

---

# Environment Variables

Only include variables that are actually required.

Avoid speculative configuration.

Examples:

DATABASE_URL

AUTH_SECRET

NEXTAUTH_URL (if applicable)

Do not create unused environment variables.

---

# Database Models

Keep schema intentionally small.

User

Course

Chapter

Lesson

Enrollment

LessonProgress

Avoid speculative tables.

---

# External Services

None required.

The project should run locally without third-party service configuration.

---

# Deployment Target

Primary:

Vercel

Alternative:

Netlify (if compatible)

Goal:

One-click deployment.

No complex infrastructure.

---

# Browser Support

Latest versions of:

Chrome

Edge

Firefox

Safari

Mobile browsers

---

# Performance Targets

Fast initial load.

Minimal client JavaScript.

Optimized images.

Server-rendered pages whenever possible.

Avoid premature optimization.

---

# Dependency Rules

Before adding any package, ask:

Does this solve a real problem?

Can the same result be achieved with the existing stack?

Does it reduce complexity?

If the answer is no, do not add it.

---

# Non-Negotiable Decisions

The following technologies are fixed:

✓ Next.js 15

✓ TypeScript

✓ Tailwind CSS

✓ shadcn/ui

✓ Prisma

✓ SQLite

✓ Server Actions

✓ React Hook Form

✓ Zod

✓ Lucide React

✓ next-themes

Claude must respect these decisions throughout the project.

Do not suggest alternatives unless explicitly requested.

---

# Final Principle

Technology exists to support the product.

Choose the simplest solution that delivers a polished, maintainable, and professional LMS within the assignment's time constraints.

Every dependency must earn its place.