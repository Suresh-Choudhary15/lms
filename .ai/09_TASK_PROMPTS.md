# TASK_PROMPTS.md

> "Do not ask me what to build next.
> Tell me what the highest-impact task is."

---

# Purpose

This document is the execution guide for the entire 24-hour assessment.

Claude must execute one sprint at a time.

Never skip a sprint.

Never start a new sprint until the current sprint satisfies its Definition of Done.

Every sprint must finish with:

✓ Review

✓ QA

✓ Suggested Commit

✓ Next Sprint Recommendation

---

# Universal Prompt

Use this before EVERY sprint.

---

You are now acting as the Engineering Team described in SYSTEM_PROMPTS.md.

Read:

- PROJECT.md
- ARCHITECTURE.md
- ENGINEERING_RULES.md
- UI_SYSTEM.md
- TECH_STACK.md
- SUCCESS_CRITERIA.md
- ROADMAP.md
- IMPLEMENTATION_PROTOCOL.md

Determine which sprint we are currently executing.

Before generating code:

1. Explain your understanding.

2. List affected files.

3. Explain the architecture.

4. Explain the implementation plan.

5. Identify risks.

6. Wait for confirmation only if architecture changes are required.

Otherwise begin implementation.

After implementation perform:

- Code Review
- QA Review
- Accessibility Review
- Responsive Review

Then recommend:

- Git Commit

- Next Sprint

---

# Sprint 0

## Project Bootstrap

Goal

Create the production-ready project foundation.

Deliverables

- Next.js

- Tailwind

- shadcn/ui

- Prisma

- SQLite

- ESLint

- Prettier

- Folder structure

Definition of Done

Project builds successfully.

Suggested Commit

chore: initialize project foundation

Next Sprint

Sprint 1

---

# Sprint 1

## Database

Goal

Implement the complete data model.

Deliverables

User

Course

Chapter

Lesson

Enrollment

LessonProgress

Seed database.

Generate Prisma Client.

Verify relationships.

Definition of Done

Database fully operational.

Suggested Commit

feat: implement database schema

---

# Sprint 2

## Authentication

Goal

Implement credentials authentication.

Deliverables

Login

Session

Protected Dashboard

Logout

Definition of Done

Authentication works end-to-end.

Suggested Commit

feat: add authentication

---

# Sprint 3

## Public Experience

Goal

Build the marketing pages.

Deliverables

Landing

Navigation

Featured Courses

Course Listing

Footer

Responsive Layout

Definition of Done

Landing page feels production ready.

Suggested Commit

feat: build public pages

---

# Sprint 4

## Course Details

Goal

Allow users to explore courses.

Deliverables

Course Hero

Overview

Curriculum

Instructor

Enroll

Progress

Definition of Done

Course detail complete.

Suggested Commit

feat: add course details

---

# Sprint 5

## Student Dashboard

Goal

Create the learner home.

Deliverables

Continue Learning

My Courses

Progress

Recommendations

Profile Summary

Definition of Done

Dashboard polished.

Suggested Commit

feat: implement learner dashboard

---

# Sprint 6

## Lesson Experience

Goal

Build the learning interface.

Deliverables

Video

Sidebar

Lesson Navigation

Mark Complete

Progress Tracking

Definition of Done

Students can complete lessons.

Suggested Commit

feat: implement lesson player

---

# Sprint 7

## Design Polish

Goal

Raise the perceived product quality.

Deliverables

Dark Mode

Animations

Hover States

Loading

Skeletons

Empty States

Spacing Review

Typography Review

Definition of Done

Application feels cohesive.

Suggested Commit

style: polish user experience

---

# Sprint 8

## QA Sprint

Goal

Eliminate defects.

Review

TypeScript

ESLint

Accessibility

Responsive

Performance

Console

Broken Links

Definition of Done

Zero known defects.

Suggested Commit

fix: final quality improvements

---

# Sprint 9

## Deployment

Goal

Ship the application.

Deliverables

Production Build

Environment Variables

Deployment

README

Screenshots

Submission Checklist

Definition of Done

Live URL works.

README complete.

Suggested Commit

docs: prepare submission

---

# Emergency Prompt

If time remaining is under three hours:

Stop implementing new features.

Perform:

Bug Fixes

UI Polish

Responsive Review

Accessibility Review

Performance Review

Deployment

README

Never begin a major feature during the final hours.

---

# AI Self Review Prompt

After every sprint answer:

1.

What improved?

2.

What technical debt exists?

3.

What should be refactored later?

4.

What assumptions were made?

5.

Does the project still follow the architecture?

6.

Would a senior engineer approve this implementation?

If not,

improve it before continuing.

---

# Final Interview Prompt

After deployment:

Pretend you are the hiring manager.

Review the repository.

Review the architecture.

Review the code quality.

Review the UI.

Review maintainability.

Review scalability.

Review engineering judgement.

Score every category from 1–10.

Then answer:

Would you hire this candidate?

Explain every deduction.

Suggest only high-impact improvements.

Be brutally honest.

---

# Golden Rule

Never ask:

"What should we build next?"

Instead ask:

"What is the highest-value task remaining that moves this LMS closer to a polished production-ready MVP?"

Always optimize for reviewer impact, not feature count.