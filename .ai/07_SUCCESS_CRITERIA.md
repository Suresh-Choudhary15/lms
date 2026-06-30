# SUCCESS_CRITERIA.md

> "Build software as though the reviewer is sitting beside you, evaluating every decision."

---

# Purpose

This document defines the quality bar for the entire project.

Every feature, every component, every page, and every engineering decision should be measured against these criteria before it is considered complete.

This is not a checklist.

This is the definition of excellence.

---

# The Goal

The reviewer should finish using the LMS and think:

> "This candidate understands how to build real software."

Not:

> "This candidate knows how to generate a lot of code."

---

# Success Philosophy

Success is measured by:

Engineering Judgment

↓

User Experience

↓

Consistency

↓

Architecture

↓

Implementation Quality

↓

Feature Count

More features do not equal a better submission.

A polished MVP always wins.

---

# Evaluation Categories

The project should optimize for the following priorities.

## Product Thinking

The product feels intentional.

Every page has a clear purpose.

Navigation is obvious.

The learning experience is intuitive.

Features feel connected rather than random.

Questions to ask:

Does this improve the learner experience?

Would removing this feature make the product worse?

Does every screen solve a real problem?

---

## User Experience

Interactions should feel effortless.

Requirements:

Fast navigation

Clear layouts

Logical information hierarchy

Obvious actions

Responsive feedback

No confusing workflows

The interface should require almost no explanation.

---

## Visual Quality

Every screen should appear professionally designed.

Consistency is more important than visual complexity.

Requirements:

Consistent spacing

Consistent typography

Consistent colors

Consistent buttons

Consistent cards

Consistent icons

Consistent animations

The product should feel like one application.

---

## Engineering Quality

Architecture should remain simple.

Code should remain maintainable.

Requirements:

Reusable components

Feature-based structure

Shared validation

Type safety

Small components

Minimal duplication

Clear naming

---

## Responsiveness

Every page must work on:

Desktop

Tablet

Mobile

Responsiveness is not optional.

It is a core requirement.

---

## Accessibility

Support:

Keyboard navigation

Visible focus

Proper labels

Semantic HTML

Readable contrast

Accessibility should never be treated as a future enhancement.

---

## Performance

Prioritize:

Server rendering

Minimal JavaScript

Fast loading

Optimized assets

Avoid unnecessary client-side rendering.

---

## AI Quality

The project should not feel AI-generated.

Avoid:

Repeated layouts

Generic cards

Placeholder text

Lorem ipsum

Random colors

Inconsistent spacing

Unfinished sections

Every generated page should be reviewed and refined.

---

# Product Quality Checklist

Landing Page

✓ Professional hero

✓ Strong call-to-action

✓ Featured courses

✓ Responsive

✓ Clear navigation

---

Dashboard

✓ Continue Learning

✓ Progress overview

✓ Course cards

✓ Logical hierarchy

✓ Responsive

---

Course Detail

✓ Clear overview

✓ Learning outcomes

✓ Curriculum

✓ Progress

✓ Enrollment action

---

Lesson Player

✓ Embedded video

✓ Sidebar navigation

✓ Previous / Next

✓ Progress

✓ Completion

---

# UI Polish Checklist

Before any page is complete verify:

□ Consistent spacing

□ Consistent typography

□ Responsive layout

□ Hover states

□ Focus states

□ Loading state

□ Empty state

□ Error state

□ Dark mode

□ No visual clutter

---

# Code Quality Checklist

Before any feature is complete verify:

□ Builds successfully

□ No TypeScript errors

□ No ESLint errors

□ No duplicated logic

□ Reusable components

□ Proper validation

□ Accessible

□ Responsive

□ Clean architecture

□ Follows ENGINEERING_RULES.md

---

# Review Questions

Before finishing any implementation ask:

Would another engineer understand this immediately?

Would this survive production refactoring?

Would I confidently demo this?

Would I approve this pull request?

If the answer is "No",

improve the implementation.

---

# Things That Reduce Score

❌ Too many unfinished features

❌ Inconsistent UI

❌ Duplicate components

❌ Broken responsiveness

❌ Placeholder pages

❌ Console errors

❌ Dead code

❌ TODO comments

❌ Overengineering

❌ Random libraries

❌ Unnecessary complexity

---

# Things That Increase Score

✓ Excellent UX

✓ Thoughtful architecture

✓ Beautiful polish

✓ Consistent design

✓ Strong engineering judgment

✓ Small reusable components

✓ Responsive layouts

✓ Accessible interactions

✓ Fast performance

✓ Professional documentation

---

# Definition of Excellent

The reviewer should feel:

"This looks like the first release of a real startup product."

Not:

"This looks like a coding assignment."

---

# Final Principle

Do not chase feature count.

Do not chase cleverness.

Do not chase complexity.

Build the simplest possible LMS that feels complete, polished, reliable, and ready to evolve.

That is success.