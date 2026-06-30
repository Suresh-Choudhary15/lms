# ARCHITECTURE.md

> "Architecture is not about adding layers.
> Architecture is about making change easy."

---

# Purpose

This document defines the architectural blueprint for the LMS.

It is inspired by the analyzed production-grade LMS repository but intentionally simplified for a 24-hour engineering challenge.

The goal is to preserve good engineering decisions while avoiding unnecessary complexity.

Every architectural decision should optimize for:

- Simplicity
- Readability
- Maintainability
- Reusability
- Scalability (to a reasonable extent)
- Fast development

This is a professional MVP—not an enterprise platform.

---

# Core Architecture Philosophy

The project follows a **Modular Feature-Based Architecture** using the Next.js App Router.

The architecture is intentionally shallow.

Avoid unnecessary layers.

Avoid "enterprise architecture" for its own sake.

Instead, prefer:

- Feature cohesion
- Colocation
- Reusable UI
- Shared validation
- Clear boundaries

---

# Architectural Principles

## 1. Features over Layers

Group code by business feature.

Avoid organizing by technical concerns only.

Preferred:

app/
courses/
dashboard/
lesson/
auth/

Avoid:

controllers/
repositories/
services/
models/
utils/

unless they genuinely improve clarity.

---

## 2. Colocation

Every feature owns its own implementation.

Example:

app/dashboard/

page.tsx

loading.tsx

error.tsx

actions.ts

\_components/

Hooks, actions, and UI should live close to where they are used.

---

## 3. Shared Foundation

Anything reused across multiple features belongs in:

components/

lib/

hooks/

types/

Never duplicate logic.

---

## 4. Server First

Prefer Server Components whenever possible.

Client Components exist only when interaction requires them.

Examples:

Forms

Dialogs

Dropdowns

Video controls

Theme switch

Everything else remains server-rendered.

---

# Project Structure

Recommended structure:

app/

(auth)/

(public)/

dashboard/

courses/

lesson/

api/

components/

ui/

shared/

layout/

course/

dashboard/

lesson/

hooks/

lib/

prisma/

validators/

utils/

types/

prisma/

public/

This structure should remain stable throughout development.

---

# Feature Boundaries

Each feature owns:

- UI
- Actions
- Local helpers
- Local types

Global code only exists if reused.

Example:

courses/

page.tsx

actions.ts

\_components/

types.ts

Do not scatter feature logic throughout the project.

---

# Data Flow

The application follows a simple flow.

User

↓

Server Component

↓

Server Action (mutation)

↓

Prisma

↓

Database

↓

Revalidate

↓

Updated UI

Avoid unnecessary abstraction.

---

# Read Strategy

Reads happen inside:

Server Components

or

Dedicated server helper functions.

Reads should never require API calls from the frontend.

---

# Write Strategy

Mutations happen through:

Server Actions

Never create internal REST APIs unless absolutely necessary.

Server Actions provide:

- Better type safety
- Simpler architecture
- Less boilerplate

---

# Validation Strategy

One source of truth.

Every schema lives inside:

lib/validators/

The same schema is reused by:

React Hook Form

Server Actions

Type inference

Never duplicate validation logic.

---

# Database Philosophy

Database must remain intentionally small.

Entities:

User

Course

Chapter

Lesson

Enrollment

LessonProgress

Nothing else.

Version 1 should not contain enterprise tables.

---

# Course Hierarchy

The hierarchy is fixed.

Course

↓

Chapter

↓

Lesson

Lessons belong to exactly one chapter.

Chapters belong to exactly one course.

Ordering uses integer positions.

No complex tree structures.

---

# State Management

Prefer:

Server State

↓

Props

↓

Local component state

Avoid global state libraries.

Only use React Context if multiple unrelated components truly need shared state.

Do not introduce Redux, Zustand, MobX, or similar.

---

# Authentication Philosophy

Authentication should remain intentionally simple.

Single user role.

No admin panel.

No permissions.

No RBAC.

No OAuth.

No JWT customization.

Authentication exists only to support the learning experience.

---

# Component Architecture

Every component should belong to one of three categories.

## 1. UI Components

Reusable primitives.

Buttons

Inputs

Cards

Dialogs

Badges

Tabs

Accordion

Never include business logic.

---

## 2. Shared Components

Reusable LMS components.

Navbar

Sidebar

Course Card

Progress Bar

Lesson Sidebar

Video Player

Footer

These may contain presentation logic.

---

## 3. Feature Components

Private to one feature.

Dashboard widgets.

Course detail sections.

Lesson navigation.

These remain inside feature folders.

---

# Naming Conventions

Components

PascalCase

CourseCard.tsx

Actions

camelCase

createCourse()

updateProgress()

Variables

camelCase

Constants

UPPER_CASE

Files

kebab-case

course-card.tsx

lesson-sidebar.tsx

Never mix conventions.

---

# Styling Philosophy

Tailwind only.

Do not create large CSS files.

Prefer utility classes.

Use reusable UI components.

No inline styles.

---

# Design Philosophy

Minimal.

Professional.

Modern.

Generous whitespace.

Excellent typography.

Readable layouts.

Avoid visual clutter.

Animations should support interaction—not distract from it.

---

# Error Handling

Every page should have:

loading.tsx

error.tsx

empty state

No blank screens.

No crashes.

---

# Loading Strategy

Skeletons over spinners.

Always preserve layout while loading.

Avoid layout shift.

---

# Performance Philosophy

Prefer:

Server rendering

Lazy loading

Dynamic imports

Optimized images

Minimal client JavaScript

Do not optimize prematurely.

But avoid obvious inefficiencies.

---

# Revalidation Strategy

After every successful mutation:

Revalidate affected routes.

Never force full-page refreshes.

---

# Accessibility

Every interactive element must include:

Keyboard support

Visible focus states

Proper labels

ARIA attributes where appropriate

Semantic HTML

Accessibility is a requirement—not an enhancement.

---

# Responsive Philosophy

Design desktop-first.

Then verify:

Tablet

Mobile

No horizontal scrolling.

No broken layouts.

---

# What We Reuse From The Production LMS

✓ Feature-based organization

✓ Server Actions

✓ Prisma

✓ Shared validation

✓ Course → Chapter → Lesson hierarchy

✓ Reusable components

✓ Progress tracking

✓ Clean navigation

✓ Professional layouts

✓ Component composition

✓ Simple business logic

---

# What We Intentionally Exclude

Do NOT build:

Stripe

Payments

OAuth

Role Management

Admin Dashboard

Instructor Dashboard

Rate Limiting

Middleware

Blob Uploads

Cloud Storage

Email Verification

Notifications

Analytics

Certificates

AI Tutor

Discussion Forums

Messaging

Search Engine

Recommendation Engine

Complex caching

These belong to future versions.

---

# Architectural Anti-Patterns

Avoid:

Massive components

Deep prop drilling

Duplicate validation

Duplicate UI

Business logic inside UI components

Large utility files

Over-abstraction

Generic "helper" dumping grounds

Premature optimization

Complex folder nesting

---

# Definition of Good Architecture

A new developer should understand the project structure within 15 minutes.

A new feature should fit naturally into the existing structure.

Every folder should have a clear purpose.

Every component should have one responsibility.

The architecture should guide development—not fight against it.

When in doubt, choose the simpler solution.
