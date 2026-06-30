# Lumen — A Self-Paced Learning Platform

> A calm, focused LMS MVP. Browse courses, enroll, watch lessons, and track your
> progress — built as a polished Version 1.0, not a hackathon prototype.

Lumen is a modern self-paced Learning Management System inspired by Udemy,
Coursera, and Skillshare. It was built as a time-boxed engineering assignment
with a single goal: **maximum product quality, minimum complexity.**

---

![landing Page](<docs/Landing Page.png>) ![Sign In Page](<docs/Sign-In Page.png>) ![Dashboard page](<docs/dashboard page.png>) ![Courses Page](<docs/course page.png>) ![Certificate Page](<docs/Certificate Page.png>)

---

## ✨ Features

- **Landing page** — clear hero, featured courses, and a focused value proposition.
- **Course catalog** — responsive grid with server-side category filtering.
- **Course detail** — overview, learning outcomes, full curriculum, instructor bio, and one-click enrollment.
- **Authentication** — simple, secure credentials auth with signed session cookies (no third-party services).
- **Student dashboard** — continue learning, my courses with progress, stats, and recommendations.
- **Lesson player** — embedded YouTube video, chapter/lesson sidebar, previous/next navigation, and mark-complete with live progress tracking.
- **Course completion certificates** — automatically unlock a printable certificate when every lesson in a course is completed.
- **Polish everywhere** — light/dark mode, loading skeletons, empty states, friendly error states, keyboard accessibility, and full responsiveness (mobile → desktop).

---

## 🧱 Tech Stack

| Concern       | Choice                                  |
| ------------- | --------------------------------------- |
| Framework     | **Next.js 15** (App Router)             |
| Language      | **TypeScript** (strict)                 |
| Styling       | **Tailwind CSS v4**                     |
| UI primitives | **shadcn/ui**-style components on Radix |
| Icons         | **lucide-react**                        |
| Theme         | **next-themes**                         |
| Database      | **SQLite**                              |
| ORM           | **Prisma**                              |
| Mutations     | **Server Actions**                      |
| Validation    | **Zod** (shared client + server)        |
| Forms         | **React Hook Form**                     |
| Toasts        | **sonner**                              |

No global state library, no REST boilerplate, no payment/OAuth/cloud
dependencies. Everything runs locally with zero external configuration.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (tested on Node 24)
- npm (or pnpm)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

A `.env` is included for local development. For your own setup, copy the example:

```bash
cp .env.example .env
```

| Variable       | Description                                |
| -------------- | ------------------------------------------ |
| `DATABASE_URL` | SQLite connection string (`file:./dev.db`) |
| `AUTH_SECRET`  | Secret used to sign session cookies        |

### 3. Create the database and seed it

```bash
npm run db:push    # create the SQLite schema
npm run db:seed    # seed 6 courses, 26 lessons, and a demo user
```

> Shortcut: `npm run db:reset` re-creates and re-seeds the database from scratch.

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 🔑 Demo account

```
Email:    demo@lumen.dev
Password: password123
```

The demo account is already enrolled in two courses with partial progress, so the
dashboard and lesson player are populated on first sign-in. Complete all lessons
in a course to unlock its printable completion certificate. (The login screen has
a **"Use demo account"** button that fills these in for you.)

---

## 📜 Scripts

| Script              | Description                               |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start the dev server                      |
| `npm run build`     | Production build (runs `prisma generate`) |
| `npm run start`     | Start the production server               |
| `npm run lint`      | ESLint                                    |
| `npm run typecheck` | TypeScript type-check (no emit)           |
| `npm run db:push`   | Apply the Prisma schema to SQLite         |
| `npm run db:seed`   | Seed sample data                          |
| `npm run db:reset`  | Reset + reseed the database               |
| `npm run db:studio` | Open Prisma Studio                        |

---

## 🗺️ Project Structure

```
src/
  app/
    (auth)/            # login, register — minimal centered layout
    (site)/            # landing, courses, course detail, dashboard — navbar + footer
    lesson/[lessonId]/ # focused lesson player (own chrome)
    layout.tsx         # root: fonts, theme provider, toaster
  components/
    ui/                # reusable primitives (button, card, dialog, …)
    shared/            # LMS components (navbar, course-card, empty-state, …)
    theme-provider.tsx
    theme-toggle.tsx
  lib/
    actions/           # server actions (auth, enrollment, progress)
    auth/              # session, password hashing, current-user helpers
    queries/           # server-side read helpers (courses, dashboard, lesson, certificates)
    validators/        # shared Zod schemas
    db.ts              # Prisma client singleton
    utils.ts           # cn, formatDuration, …
  generated/prisma/    # generated Prisma client
prisma/
  schema.prisma        # 6-model data model
  seed.ts              # sample data
.ai/                   # the engineering brief this project was built against
```

### Data model

```
User ──< Enrollment >── Course ──< Chapter ──< Lesson
User ──< LessonProgress >── Lesson
```

Six entities, nothing speculative. The hierarchy is fixed:
`Course → Chapter → Lesson`, ordered by integer positions.

---

## 🏛️ Architecture Notes

- **Server-first.** Reads happen in Server Components; mutations go through Server
  Actions. There are no internal REST endpoints.
- **One source of validation truth.** Zod schemas in `lib/validators` are shared by
  React Hook Form (client) and Server Actions (server).
- **Auth without dependencies.** Passwords are hashed with Node's `scrypt`; sessions
  are stateless, signed (HMAC) httpOnly cookies. No NextAuth, no JWT library.
- **Feature colocation.** Each route owns its `loading.tsx`, feature components
  (`_components/`), and forms.
- **Completion-based achievements.** Lesson progress is tracked per user and automatically unlocks printable course completion certificates once every lesson in a course has been completed.
- **Accessibility & responsiveness are built in**, not bolted on: semantic HTML,
  visible focus rings, keyboard-navigable menus, and reduced-motion support.

See [`DECISIONS.md`](./DECISIONS.md) for the trade-offs behind these choices.

---

## ☁️ Deployment

The app deploys cleanly to **Vercel**.

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Set environment variables (`DATABASE_URL`, `AUTH_SECRET`).
4. Deploy.

> **Note on SQLite:** Vercel's serverless filesystem is ephemeral. For a persistent
> production deployment, point `DATABASE_URL` at a hosted SQLite (e.g. Turso) or
> switch the Prisma `provider` to Postgres — Prisma makes this a one-line change.
> For the assignment demo, the bundled SQLite database is sufficient.

---

## 🔮 Out of Scope (intentionally — these belong in v2)

Payments · Quizzes · Reviews & ratings · AI tutor · Search engine ·
Notifications · OAuth / social login · Instructor & admin dashboards · Discussion
forums · Analytics.

These were **conscious prioritization decisions**, not omissions — the goal was a
small number of features that each feel production-ready.

---

Built with care as a focused LMS MVP.
