# ASSESSMENT_PLAYBOOK.md

> "A good plan executed today beats a perfect plan executed tomorrow."

---

# 1. Mission

Build a production-quality Learning Management System (LMS) within 24 hours.

The goal is NOT to build Udemy.

The goal is to demonstrate senior-level engineering judgment.

The reviewer should think:

> "This developer knows how to build software."

---

# 2. Product Vision

A modern learning platform where students can

• Discover courses

• Enroll

• Watch lessons

• Track progress

• Continue learning

Nothing more.

Everything else belongs in Version 2.

---

# 3. Success Criteria

If time runs out...

Never sacrifice:

✓ UX

✓ Architecture

✓ Responsiveness

✓ Code Quality

✓ Accessibility

✓ Maintainability

Sacrifice:

✗ Payments

✗ Reviews

✗ Search

✗ AI Chat

✗ Certificates

✗ Notifications

---

# 4. Product Scope

## Public

Landing Page

Course Listing

Course Detail

About

Navigation

Footer

---

## Student

Dashboard

My Courses

Continue Learning

Lesson Player

Progress Tracking

Profile

---

## Learning

Video

Lesson Sidebar

Chapter Navigation

Previous

Next

Mark Complete

Progress

---

# 5. Architecture Overview

Next.js App Router

↓

Server Components

↓

Server Actions

↓

Prisma

↓

SQLite

↓

Reusable Components

↓

Responsive UI

Keep the architecture shallow.

---

# 6. Folder Structure

app/

(auth)/

(public)/

dashboard/

courses/

lesson/

components/

ui/

shared/

course/

dashboard/

lesson/

lib/

actions/

validators/

utils/

hooks/

types/

prisma/

public/

.ai/

---

# 7. Database

Models

User

Course

Chapter

Lesson

Enrollment

LessonProgress

No additional models.

---

# 8. Route Map

/

Landing

/courses

Listing

/courses/[slug]

Details

/dashboard

Student Dashboard

/lesson/[lessonId]

Lesson Viewer

/login

Authentication

---

# 9. Component Inventory

Global

Navbar

Footer

Theme Toggle

Container

Section

Page Header

Buttons

Cards

Dialog

Badge

Spinner

Skeleton

Progress

---

Landing

Hero

Feature Grid

Course Carousel

CTA

Testimonials (optional)

---

Dashboard

Continue Learning

Course Grid

Progress Card

Stats Card

Sidebar

---

Course

Course Hero

Curriculum

Instructor

Enroll Button

Progress

---

Lesson

Video Player

Lesson Sidebar

Progress

Previous Button

Next Button

Complete Button

---

# 10. Data Flow

Landing

↓

Course

↓

Enroll

↓

Dashboard

↓

Lesson

↓

Complete

↓

Progress

↓

Dashboard Updates

Simple.

Predictable.

---

# 11. Development Order

Sprint 0

Project Setup

↓

Sprint 1

Database

↓

Sprint 2

Authentication

↓

Sprint 3

Landing

↓

Sprint 4

Course Pages

↓

Sprint 5

Dashboard

↓

Sprint 6

Lesson Player

↓

Sprint 7

Polish

↓

Sprint 8

QA

↓

Sprint 9

Deployment

---

# 12. Estimated Time

Project Setup

45 min

Database

60 min

Authentication

90 min

Landing

2 hr

Course

2 hr

Dashboard

2 hr

Lesson

3 hr

Polish

2 hr

Deployment

1 hr

Buffer

2 hr

Total

≈18–20 Hours

Leaves buffer.

---

# 13. Git Strategy

One feature

↓

One commit

Examples

feat: add authentication

feat: implement dashboard

feat: add lesson navigation

fix: improve responsive layout

docs: update README

---

# 14. Risk Register

Risk

Too many features

Mitigation

Reduce scope

Never reduce quality

---

Risk

AI overengineering

Mitigation

Follow ENGINEERING_RULES.md

---

Risk

UI inconsistency

Mitigation

Reuse components

---

Risk

Architecture drift

Mitigation

Review ARCHITECTURE.md before major changes

---

# 15. Review Checklist

Every completed page must have

✓ Loading State

✓ Empty State

✓ Error State

✓ Mobile

✓ Tablet

✓ Desktop

✓ Keyboard Navigation

✓ Responsive Images

✓ Consistent Typography

✓ Consistent Spacing

✓ No Console Errors

---

# 16. Submission Checklist

Project Builds

Deployment Works

README Complete

Installation Steps

Environment Variables

Screenshots

Architecture Explanation

Trade-offs

Future Improvements

Live Demo

Repository Clean

No Dead Code

No TODOs

---

# 17. Demo Flow

Landing

↓

Browse Courses

↓

Open Course

↓

Enroll

↓

Dashboard

↓

Continue Learning

↓

Lesson

↓

Mark Complete

↓

Dashboard Updates

Reviewer sees complete user journey.

---

# 18. Future Enhancements

Payments

Certificates

Assignments

Reviews

AI Tutor

Discussion

Admin

Instructor

Analytics

Search

Notifications

Email

Cloud Uploads

Do NOT build these.

Mention them in README.

---

# 19. Final Engineering Principles

Prefer:

Readable

↓

Maintainable

↓

Simple

↓

Reusable

↓

Fast

Never choose clever over clear.

---

# 20. Golden Rule

This assessment is not testing how many features you can build.

It is testing whether you understand

how experienced engineers build software.

Every decision should reinforce that.