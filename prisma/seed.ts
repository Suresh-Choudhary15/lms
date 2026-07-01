import { PrismaClient, type Level } from "../src/generated/prisma/index.js";
import { randomBytes, scryptSync } from "node:crypto";

const db = new PrismaClient();

// Local copy of the password hashing format used by src/lib/auth/password.ts.
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function thumb(id: string): string {
  // Stable, license-friendly Unsplash photos keyed by a fixed id.
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
}

type SeedLesson = {
  title: string;
  description: string;
  youtubeId: string;
  durationSeconds: number;
};

type SeedChapter = { title: string; lessons: SeedLesson[] };

type SeedCourse = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: Level;
  thumbnailUrl: string;
  learningOutcomes: string[];
  instructorName: string;
  instructorTitle: string;
  instructorBio: string;
  instructorAvatar: string;
  featured: boolean;
  chapters: SeedChapter[];
};

const avatar = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=200&h=200&q=80`;

const COURSES: SeedCourse[] = [
  {
    slug: "modern-react-from-scratch",
    title: "Modern React From Scratch",
    subtitle:
      "Build fast, maintainable interfaces with components, hooks, and a clear mental model.",
    description:
      "A practical, project-driven introduction to modern React. You'll move from first principles to building real, interactive features — understanding not just how React works, but why it works that way. By the end you'll be comfortable structuring components, managing state, and shipping polished UI.",
    category: "Development",
    level: "INTERMEDIATE",
    thumbnailUrl: thumb("photo-1633356122544-f134324a6cee"),
    learningOutcomes: [
      "Think in components and compose UI from small, reusable pieces",
      "Manage state confidently with useState and useEffect",
      "Fetch and render data without unnecessary complexity",
      "Structure a React project that stays maintainable as it grows",
    ],
    instructorName: "Maya Chen",
    instructorTitle: "Staff Frontend Engineer",
    instructorBio:
      "Maya has spent a decade building design systems and front-end platforms at product companies. She loves teaching the mental models that make complex UI feel simple.",
    instructorAvatar: avatar("photo-1494790108377-be9c29b29330"),
    featured: true,
    chapters: [
      {
        title: "Getting Started",
        lessons: [
          {
            title: "Why React?",
            description:
              "Understand the problem React solves and the core idea of declarative UI.",
            youtubeId: "Tn6-PIqc4UM",
            durationSeconds: 132,
          },
          {
            title: "Your First Component",
            description:
              "Create a component, render it, and understand JSX from the ground up.",
            youtubeId: "bMknfKXIFA8",
            durationSeconds: 1860,
          },
        ],
      },
      {
        title: "State & Interactivity",
        lessons: [
          {
            title: "Thinking in State",
            description:
              "Model UI as a function of state and learn when to reach for useState.",
            youtubeId: "bMknfKXIFA8",
            durationSeconds: 1520,
          },
          {
            title: "Side Effects with useEffect",
            description:
              "Synchronize your components with the outside world safely.",
            youtubeId: "bMknfKXIFA8",
            durationSeconds: 1340,
          },
          {
            title: "Composing Reusable Components",
            description:
              "Lift state, pass props, and avoid duplication through composition.",
            youtubeId: "Tn6-PIqc4UM",
            durationSeconds: 980,
          },
        ],
      },
    ],
  },
  {
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    subtitle:
      "The language behind the web, explained clearly — from variables to async.",
    description:
      "Everything you need to read and write real JavaScript with confidence. We cover the fundamentals carefully — values, functions, scope, arrays, objects, and asynchronous code — so the rest of the ecosystem stops feeling like magic.",
    category: "Development",
    level: "BEGINNER",
    thumbnailUrl: thumb("photo-1579468118864-1b9ea3c0db4a"),
    learningOutcomes: [
      "Work fluently with variables, functions, and control flow",
      "Manipulate arrays and objects like a professional",
      "Understand scope, closures, and the 'this' keyword",
      "Write asynchronous code with promises and async/await",
    ],
    instructorName: "Daniel Okafor",
    instructorTitle: "Software Engineer & Educator",
    instructorBio:
      "Daniel has taught thousands of beginners how to code. He believes the fundamentals, taught well, are the highest-leverage thing a developer can learn.",
    instructorAvatar: avatar("photo-1507003211169-0a1dd7228f2d"),
    featured: true,
    chapters: [
      {
        title: "Language Basics",
        lessons: [
          {
            title: "Variables & Types",
            description:
              "Declare values, understand types, and avoid common pitfalls.",
            youtubeId: "PkZNo7MFNFg",
            durationSeconds: 1420,
          },
          {
            title: "Functions & Scope",
            description:
              "Write reusable logic and understand how scope really works.",
            youtubeId: "PkZNo7MFNFg",
            durationSeconds: 1680,
          },
        ],
      },
      {
        title: "Working with Data",
        lessons: [
          {
            title: "Arrays & Iteration",
            description: "Transform collections with map, filter, and reduce.",
            youtubeId: "PkZNo7MFNFg",
            durationSeconds: 1240,
          },
          {
            title: "Objects in Depth",
            description: "Model real-world data with objects and methods.",
            youtubeId: "PkZNo7MFNFg",
            durationSeconds: 1100,
          },
          {
            title: "Asynchronous JavaScript",
            description:
              "Handle time with promises and async/await without callbacks hell.",
            youtubeId: "PkZNo7MFNFg",
            durationSeconds: 1560,
          },
        ],
      },
    ],
  },
  {
    slug: "design-systems-foundations",
    title: "Design Systems & UI Foundations",
    subtitle:
      "Spacing, typography, color, and consistency — the craft behind interfaces that feel right.",
    description:
      "Great products feel effortless because of design decisions most people never notice. This course teaches the foundations of interface design — hierarchy, spacing, color, and systems thinking — so you can build UI that looks intentional and stays consistent.",
    category: "Design",
    level: "BEGINNER",
    thumbnailUrl: thumb("photo-1561070791-2526d30994b5"),
    learningOutcomes: [
      "Apply spacing and typographic scales for visual rhythm",
      "Choose and use color with intention, not decoration",
      "Build a consistent component system",
      "Critique and improve interfaces with a designer's eye",
    ],
    instructorName: "Sofia Marín",
    instructorTitle: "Product Designer",
    instructorBio:
      "Sofia designs calm, usable products and writes about the principles behind them. She has led design at two early-stage startups.",
    instructorAvatar: avatar("photo-1438761681033-6461ffad8d80"),
    featured: true,
    chapters: [
      {
        title: "Visual Foundations",
        lessons: [
          {
            title: "Spacing & Layout",
            description:
              "Use whitespace and a spacing scale to create clear structure.",
            youtubeId: "1Rs2ND1ryYc",
            durationSeconds: 1320,
          },
          {
            title: "Typography that Works",
            description: "Build hierarchy with size, weight, and rhythm.",
            youtubeId: "1Rs2ND1ryYc",
            durationSeconds: 1180,
          },
        ],
      },
      {
        title: "Systems Thinking",
        lessons: [
          {
            title: "Color with Purpose",
            description:
              "Design a neutral-first palette where color signals meaning.",
            youtubeId: "1Rs2ND1ryYc",
            durationSeconds: 1040,
          },
          {
            title: "Building a Component System",
            description:
              "Turn one-off designs into a consistent, reusable system.",
            youtubeId: "1Rs2ND1ryYc",
            durationSeconds: 1460,
          },
        ],
      },
    ],
  },
  {
    slug: "python-for-data-analysis",
    title: "Python for Data Analysis",
    subtitle:
      "Go from zero to analyzing real datasets with Python's data stack.",
    description:
      "Learn Python with a purpose: making sense of data. We start with the language essentials and move into loading, cleaning, and exploring datasets. You'll finish able to answer real questions with code.",
    category: "Data",
    level: "BEGINNER",
    thumbnailUrl: thumb("photo-1526379095098-d400fd0bf935"),
    learningOutcomes: [
      "Write clean, readable Python for data tasks",
      "Load and clean messy real-world datasets",
      "Explore and summarize data to find insights",
      "Communicate findings clearly",
    ],
    instructorName: "Aarav Patel",
    instructorTitle: "Data Scientist",
    instructorBio:
      "Aarav works on analytics for a fintech company and teaches practical data skills. He focuses on the 20% of tools that do 80% of the work.",
    instructorAvatar: avatar("photo-1500648767791-00dcc994a43e"),
    featured: false,
    chapters: [
      {
        title: "Python Essentials",
        lessons: [
          {
            title: "Getting Set Up",
            description:
              "Install Python and run your first script with confidence.",
            youtubeId: "rfscVS0vtbw",
            durationSeconds: 980,
          },
          {
            title: "Core Syntax",
            description:
              "Variables, loops, and functions — the building blocks you need.",
            youtubeId: "rfscVS0vtbw",
            durationSeconds: 1720,
          },
        ],
      },
      {
        title: "Analyzing Data",
        lessons: [
          {
            title: "Loading & Cleaning Data",
            description: "Read files and handle the messiness of real data.",
            youtubeId: "rfscVS0vtbw",
            durationSeconds: 1380,
          },
          {
            title: "Exploring & Summarizing",
            description:
              "Ask questions of your data and answer them with code.",
            youtubeId: "rfscVS0vtbw",
            durationSeconds: 1240,
          },
        ],
      },
    ],
  },
  {
    slug: "typescript-deep-dive",
    title: "TypeScript Deep Dive",
    subtitle:
      "Master the type system that makes large codebases safe and a joy to maintain.",
    description:
      "Move beyond 'JavaScript with types'. This course builds a deep, practical understanding of TypeScript's type system — generics, inference, narrowing, and utility types — so you can model complex domains with confidence.",
    category: "Development",
    level: "ADVANCED",
    thumbnailUrl: thumb("photo-1542831371-29b0f74f9713"),
    learningOutcomes: [
      "Model complex data with precise types",
      "Use generics and inference to write reusable, type-safe code",
      "Narrow types correctly to eliminate whole classes of bugs",
      "Leverage utility types for cleaner APIs",
    ],
    instructorName: "Elena Rossi",
    instructorTitle: "Principal Engineer",
    instructorBio:
      "Elena maintains large TypeScript codebases and contributes to open source. She enjoys turning intimidating type errors into teachable moments.",
    instructorAvatar: avatar("photo-1573497019940-1c28c88b4f3e"),
    featured: false,
    chapters: [
      {
        title: "Type System Foundations",
        lessons: [
          {
            title: "Types vs. Values",
            description:
              "Build the right mental model for how TypeScript thinks.",
            youtubeId: "BwuLxPH8IDs",
            durationSeconds: 1280,
          },
          {
            title: "Narrowing & Control Flow",
            description: "Let the compiler prove your code is safe.",
            youtubeId: "BwuLxPH8IDs",
            durationSeconds: 1140,
          },
        ],
      },
      {
        title: "Advanced Types",
        lessons: [
          {
            title: "Generics in Practice",
            description: "Write flexible, reusable, type-safe abstractions.",
            youtubeId: "BwuLxPH8IDs",
            durationSeconds: 1620,
          },
          {
            title: "Utility & Mapped Types",
            description:
              "Transform types to model real APIs without duplication.",
            youtubeId: "BwuLxPH8IDs",
            durationSeconds: 1380,
          },
        ],
      },
    ],
  },
  {
    slug: "product-thinking-for-engineers",
    title: "Product Thinking for Engineers",
    subtitle:
      "Build the right thing, not just the thing right — judgment that gets you promoted.",
    description:
      "Engineering judgment is more than clean code. This course teaches you to think about users, trade-offs, and impact — the skills that separate senior engineers from the rest. Learn to prioritize, scope, and communicate like someone who ships products that matter.",
    category: "Product",
    level: "INTERMEDIATE",
    thumbnailUrl: thumb("photo-1531403009284-440f080d1e12"),
    learningOutcomes: [
      "Frame engineering work around user and business impact",
      "Make and defend trade-offs under real constraints",
      "Scope an MVP without over- or under-building",
      "Communicate decisions that increase stakeholder trust",
    ],
    instructorName: "Jordan Blake",
    instructorTitle: "Engineering Manager",
    instructorBio:
      "Jordan has shipped products from zero to millions of users and coaches engineers on growing into senior roles.",
    instructorAvatar: avatar("photo-1519085360753-af0119f7cbe7"),
    featured: false,
    chapters: [
      {
        title: "The Mindset",
        lessons: [
          {
            title: "From Tickets to Outcomes",
            description:
              "Shift from 'what was asked' to 'what actually helps'.",
            youtubeId: "G3e-cpL7ofc",
            durationSeconds: 1020,
          },
          {
            title: "Understanding Users",
            description: "Build empathy and ask the questions that matter.",
            youtubeId: "G3e-cpL7ofc",
            durationSeconds: 960,
          },
        ],
      },
      {
        title: "Shipping with Judgment",
        lessons: [
          {
            title: "Scoping an MVP",
            description: "Cut scope to the essential without losing quality.",
            youtubeId: "G3e-cpL7ofc",
            durationSeconds: 1160,
          },
          {
            title: "Communicating Trade-offs",
            description: "Make decisions visible and earn trust.",
            youtubeId: "G3e-cpL7ofc",
            durationSeconds: 1080,
          },
        ],
      },
    ],
  },
];

async function main() {
  console.log("🌱 Resetting data...");
  // Clear in dependency order. Cascades cover children, but be explicit.
  await db.lessonProgress.deleteMany();
  await db.enrollment.deleteMany();
  await db.lesson.deleteMany();
  await db.chapter.deleteMany();
  await db.course.deleteMany();
  await db.user.deleteMany();

  console.log("👤 Creating demo user...");
  const demoUser = await db.user.create({
    data: {
      name: "Alex Rivera",
      email: "demo@lumen.dev",
      passwordHash: hashPassword("password123"),
    },
  });

  console.log("📚 Creating courses...");
  const createdCourses = [];
  for (const course of COURSES) {
    const created = await db.course.create({
      data: {
        slug: course.slug,
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        category: course.category,
        level: course.level,
        thumbnailUrl: course.thumbnailUrl,
        learningOutcomes: course.learningOutcomes.join("\n"),
        instructorName: course.instructorName,
        instructorTitle: course.instructorTitle,
        instructorBio: course.instructorBio,
        instructorAvatar: course.instructorAvatar,
        featured: course.featured,
        chapters: {
          create: course.chapters.map((chapter, chapterIndex) => ({
            title: chapter.title,
            position: chapterIndex,
            lessons: {
              create: chapter.lessons.map((lesson, lessonIndex) => ({
                title: lesson.title,
                description: lesson.description,
                youtubeId: lesson.youtubeId,
                durationSeconds: lesson.durationSeconds,
                position: lessonIndex,
              })),
            },
          })),
        },
      },
      include: {
        chapters: { include: { lessons: true }, orderBy: { position: "asc" } },
      },
    });
    createdCourses.push(created);
  }

  console.log("🎓 Enrolling demo user with sample progress...");
  // Enroll the demo user in two courses and complete part of one.
  const reactCourse = createdCourses.find(
    (c) => c.slug === "modern-react-from-scratch",
  )!;
  const jsCourse = createdCourses.find(
    (c) => c.slug === "javascript-fundamentals",
  )!;

  await db.enrollment.createMany({
    data: [
      { userId: demoUser.id, courseId: reactCourse.id },
      { userId: demoUser.id, courseId: jsCourse.id },
    ],
  });

  // Complete the first 3 lessons of the React course to create "in progress" state.
  const reactLessons = reactCourse.chapters
    .sort((a, b) => a.position - b.position)
    .flatMap((c) => c.lessons.sort((a, b) => a.position - b.position));

  await db.lessonProgress.createMany({
    data: reactLessons.slice(0, 3).map((lesson) => ({
      userId: demoUser.id,
      lessonId: lesson.id,
    })),
  });

  const lessonCount = COURSES.reduce(
    (sum, c) => sum + c.chapters.reduce((s, ch) => s + ch.lessons.length, 0),
    0,
  );
  console.log(
    `✅ Seed complete: ${COURSES.length} courses, ${lessonCount} lessons, 1 demo user.`,
  );
  console.log("   Demo login → email: demo@lumen.dev   password: password123");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
