# ENGINEERING_RULES.md

> "Good software is not measured by how much code exists.
> It is measured by how little unnecessary code remains."

---

# Purpose

This document defines the engineering standards for the project.

Every generated file must follow these rules.

These rules have higher priority than implementation convenience.

When two possible implementations exist, choose the one that better follows these engineering principles.

---

# Engineering Philosophy

Write software that another senior engineer would enjoy maintaining.

Every line should have a reason to exist.

The codebase should become simpler over time—not more complicated.

Optimize for:

- Readability
- Maintainability
- Consistency
- Predictability
- Simplicity

Never optimize for writing fewer prompts.

---

# AI Development Workflow

For every implementation task, always follow this order:

## Step 1

Understand the requirement.

Do not immediately generate code.

---

## Step 2

Identify affected files.

List them.

Explain why each file changes.

---

## Step 3

Explain the implementation plan.

Maximum 10 bullet points.

---

## Step 4

Consider edge cases.

Include:

- Empty states
- Loading states
- Error states
- Mobile behavior
- Accessibility

---

## Step 5

Only then begin implementation.

---

# Code Generation Rules

Never generate code before understanding the entire feature.

Avoid partial implementations.

Never leave TODO comments.

Never leave unfinished functions.

Never generate placeholder logic.

Every generated feature should compile successfully.

---

# TypeScript Standards

Always enable strict typing.

Never use:

any

Avoid:

unknown

unless absolutely necessary.

Infer types whenever possible.

Prefer:

```ts
type Course = ...
```

instead of duplicated interfaces.

Use Zod inference whenever applicable.

---

# React Standards

Prefer Server Components.

Only use Client Components when interaction requires it.

Never convert an entire page into a Client Component because one button needs interactivity.

Keep client boundaries as small as possible.

---

# Component Design

Every component should have one responsibility.

If a component exceeds roughly 200 lines, evaluate whether it should be split.

Prefer composition over inheritance.

Prefer reusable components over duplicated JSX.

---

# Props

Keep props minimal.

Never pass unnecessary data.

Avoid prop drilling.

If more than three nested levels require the same data, evaluate Context.

---

# State Management

Prefer:

Server State

↓

Props

↓

Local State

Avoid global state libraries.

No Redux.

No MobX.

No unnecessary Context.

---

# Server Actions

All mutations should use Server Actions.

Never create internal REST endpoints unless external integrations require them.

Server Actions should:

Validate input.

Execute business logic.

Update the database.

Revalidate affected pages.

Return typed responses.

Nothing more.

---

# Database Rules

Use Prisma.

Keep schema simple.

Relationships should be explicit.

Never duplicate data.

Prefer normalization.

Avoid premature optimization.

---

# Validation

Validation is mandatory.

Every form must use shared Zod schemas.

Never duplicate validation logic.

Never trust client-side validation alone.

Validate again on the server.

---

# Error Handling

Never swallow errors.

Return meaningful messages.

Log unexpected failures.

Every page should gracefully recover.

No white screens.

No crashes.

---

# Loading States

Every asynchronous operation should provide feedback.

Prefer skeletons.

Avoid indefinite spinners.

Never block the entire page unnecessarily.

---

# Empty States

Every collection must define an empty state.

Examples:

No enrolled courses.

No completed lessons.

No search results.

Empty states should guide users toward the next action.

---

# Accessibility

Every interactive element must support:

Keyboard navigation.

Visible focus indicators.

Proper labels.

Semantic HTML.

Screen readers where appropriate.

Accessibility is never optional.

---

# Responsive Design

Every feature must work on:

Desktop.

Tablet.

Mobile.

Do not postpone responsiveness.

Build responsively from the beginning.

---

# Performance

Avoid unnecessary client JavaScript.

Prefer Server Components.

Lazy load heavy components.

Optimize images.

Avoid unnecessary re-renders.

Do not optimize prematurely.

---

# Styling

Use Tailwind CSS.

Never use inline styles.

Never duplicate utility combinations repeatedly.

Extract reusable UI components when patterns repeat.

---

# File Organization

Each file should have one clear responsibility.

Avoid utility dumping grounds.

Avoid giant helper files.

Keep related code together.

---

# Naming Conventions

Components:

PascalCase

Server Actions:

camelCase

Hooks:

useSomething

Files:

kebab-case

Constants:

UPPER_CASE

Never mix naming styles.

---

# Imports

Order imports consistently:

1.

Framework

2.

Libraries

3.

Internal modules

4.

Relative imports

Remove unused imports immediately.

---

# Comments

Explain WHY.

Never explain WHAT.

Bad:

Increment counter

Good:

Prevent duplicate submissions while request is pending.

Good code should require very few comments.

---

# Git Discipline

Every commit should represent one logical change.

Good examples:

feat: add course listing page

feat: implement lesson progress tracking

fix: correct lesson navigation

style: improve responsive dashboard layout

Avoid:

misc changes

updates

final

---

# Definition of Done

A task is complete only if:

✓ Builds successfully

✓ No TypeScript errors

✓ No ESLint errors

✓ Responsive

✓ Accessible

✓ Loading state exists

✓ Error state exists

✓ Empty state exists

✓ Reusable components

✓ No duplicated logic

✓ Matches design system

✓ Navigation works

✓ Code reviewed mentally

---

# Code Review Checklist

Before considering any implementation complete:

□ Is this the simplest solution?

□ Can another developer understand it quickly?

□ Is any logic duplicated?

□ Can anything be extracted?

□ Is the naming clear?

□ Are edge cases handled?

□ Is validation complete?

□ Is accessibility covered?

□ Is responsiveness verified?

□ Does this follow the architecture?

If any answer is "No",

improve the implementation before continuing.

---

# AI Guardrails

Never invent APIs.

Never invent database fields.

Never assume missing requirements.

Ask when uncertain.

Never introduce unnecessary libraries.

Never rewrite unrelated code.

Never refactor working code without a reason.

Never change architecture during implementation.

Respect previous engineering decisions.

Read DECISIONS.md before proposing alternatives.

---

# Senior Engineering Mindset

Think before coding.

Design before implementing.

Finish before expanding.

Polish before adding features.

Consistency beats cleverness.

Simple beats smart.

Reliable beats impressive.

Every implementation should feel inevitable—as though there was no simpler, cleaner way to build it.

When in doubt:

Choose the solution that reduces future maintenance while preserving clarity.
