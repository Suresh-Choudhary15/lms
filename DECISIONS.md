# Engineering Decisions

A record of the meaningful trade-offs made while building Lumen. The guiding
principle throughout: **the simplest solution that delivers a polished,
maintainable, professional MVP** within the assignment's scope.

---

## Authentication: hand-rolled over NextAuth

**Decision.** Implement credentials auth directly — `scrypt` password hashing
(Node `crypto`) and stateless, HMAC-signed httpOnly session cookies.

**Why.** The brief calls for *simple* credentials auth with no OAuth, no email
verification, no MFA. NextAuth would add a dependency, configuration, and concepts
far beyond what's needed. A signed cookie carrying a verified `userId` is enough,
is fully type-safe, and keeps the surface area tiny.

**Trade-off.** No password reset, no refresh-token rotation. Acceptable and
explicitly out of scope. The cookie is httpOnly + `secure` in production + `sameSite=lax`.

---

## No middleware for route protection

**Decision.** Protect routes inside Server Components via `requireUser()` rather
than Next.js middleware.

**Why.** The architecture brief explicitly excludes middleware. Page-level guards
keep the auth check colocated with the data it protects and avoid a global
interception layer. `getCurrentUser()` is wrapped in React `cache()` so repeated
calls within one request hit the database once.

**Trade-off.** Each protected page must call the guard. With only two protected
areas (dashboard, lesson) this is trivial and explicit.

---

## SQLite + Prisma

**Decision.** SQLite as the database, Prisma as the ORM.

**Why.** Zero-config, fast local setup, perfect for the assignment scope, and the
brief mandates it. Prisma gives type-safe queries and a one-line path to Postgres
if the product ever outgrows SQLite.

**Trade-off.** SQLite's serverless story needs a hosted option (Turso) or a
provider swap for a persistent production deploy — noted in the README.

---

## Server Actions for all mutations

**Decision.** Enrollment and progress updates are Server Actions; there are no
internal REST/Route Handlers.

**Why.** Type safety end-to-end, no fetch boilerplate, and a natural fit with the
App Router. Each action validates input, performs the mutation, and calls
`revalidatePath` for the affected routes.

**Trade-off.** Server Actions are POST-only and Next-specific. That's fine — there
is no external API consumer.

---

## Instructor as denormalized fields, not a model

**Decision.** Store instructor name/title/bio/avatar directly on `Course` instead
of a separate `Instructor` model.

**Why.** The brief fixes the data model at six entities and warns against
speculative tables. Instructors are display-only in the MVP; a join would add
complexity with no behavioural benefit.

**Trade-off.** An instructor's details are duplicated if they teach multiple
courses. Negligible at this scale and trivially refactorable later.

---

## Tailwind v4 + hand-built shadcn/ui components

**Decision.** Use Tailwind v4 (CSS-first config) and author the shadcn/ui-style
primitives directly in `components/ui` on top of Radix, rather than running the
shadcn CLI.

**Why.** Authoring the components keeps full control over styling and avoids an
interactive generator step, while still delivering accessible Radix-backed
primitives (dialog, dropdown, tabs, accordion, progress, avatar, label). Tokens
are defined once as CSS variables and consumed via Tailwind's `@theme`.

**Trade-off.** Components are maintained in-repo rather than pulled from a
registry — which is exactly how shadcn/ui is meant to be used anyway.

---

## Progress model: presence = completion

**Decision.** `LessonProgress` rows exist only for completed lessons. Marking
incomplete deletes the row; a unique `(userId, lessonId)` constraint keeps it
idempotent.

**Why.** The only progress state the MVP needs is complete/not-complete. A boolean
row keyed by the pair is the minimal, normalized representation. Course progress is
derived (`completed / total`) rather than stored, so it can never drift.

**Trade-off.** No partial "watched 40%" tracking. Out of scope by design.

---

## "Continue learning" heuristic

**Decision.** The dashboard surfaces the most recently active, still-incomplete
course (by latest lesson completion), falling back to the newest enrollment.

**Why.** It answers the learner's first question — "where was I?" — without extra
tables or a dedicated "last viewed" timestamp.

**Trade-off.** Activity is inferred from completion timestamps, not view events.
Good enough and avoids tracking infrastructure that's out of scope.

---

## State management: none

**Decision.** No Redux/Zustand/MobX/Context-for-everything. State flows
server → props → local component state. Client components exist only where
interaction requires them (forms, theme toggle, menus, mark-complete).

**Why.** The brief forbids global state libraries, and the app genuinely doesn't
need one. Smaller bundles, simpler mental model.

---

## What was deliberately *not* built

Payments, certificates, quizzes, reviews/ratings, search, notifications, OAuth,
instructor/admin dashboards, analytics, discussion forums. Each was a conscious
prioritization call in favour of polishing the core learning loop. They are listed
in the README as future work.
