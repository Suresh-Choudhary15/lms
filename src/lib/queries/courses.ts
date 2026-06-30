import { db } from "@/lib/db";
import { toPercent } from "@/lib/utils";

/** Course shape used by listing/landing cards. */
export type CourseCardData = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  thumbnailUrl: string;
  instructorName: string;
  lessonCount: number;
  durationSeconds: number;
};

function summarize(course: {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  thumbnailUrl: string;
  instructorName: string;
  chapters: { lessons: { durationSeconds: number }[] }[];
}): CourseCardData {
  const lessons = course.chapters.flatMap((c) => c.lessons);
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    category: course.category,
    level: course.level,
    thumbnailUrl: course.thumbnailUrl,
    instructorName: course.instructorName,
    lessonCount: lessons.length,
    durationSeconds: lessons.reduce((sum, l) => sum + l.durationSeconds, 0),
  };
}

const cardSelect = {
  id: true,
  slug: true,
  title: true,
  subtitle: true,
  category: true,
  level: true,
  thumbnailUrl: true,
  instructorName: true,
  chapters: { select: { lessons: { select: { durationSeconds: true } } } },
} as const;

export async function getFeaturedCourses(): Promise<CourseCardData[]> {
  const courses = await db.course.findMany({
    where: { featured: true },
    orderBy: { createdAt: "asc" },
    select: cardSelect,
  });
  return courses.map(summarize);
}

export async function getAllCourses(): Promise<CourseCardData[]> {
  const courses = await db.course.findMany({
    orderBy: { createdAt: "asc" },
    select: cardSelect,
  });
  return courses.map(summarize);
}

/** Distinct category labels across all courses, for filter chips. */
export async function getCategories(): Promise<string[]> {
  const rows = await db.course.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });
  return rows.map((r) => r.category);
}

export type FullCourse = NonNullable<
  Awaited<ReturnType<typeof getCourseBySlug>>
>;

export async function getCourseBySlug(slug: string) {
  const course = await db.course.findUnique({
    where: { slug },
    include: {
      chapters: {
        orderBy: { position: "asc" },
        include: { lessons: { orderBy: { position: "asc" } } },
      },
    },
  });
  return course;
}

/** Ordered, flattened list of lesson ids for a course. */
export async function getOrderedLessonIds(courseId: string): Promise<string[]> {
  const chapters = await db.chapter.findMany({
    where: { courseId },
    orderBy: { position: "asc" },
    select: { lessons: { orderBy: { position: "asc" }, select: { id: true } } },
  });
  return chapters.flatMap((c) => c.lessons.map((l) => l.id));
}

export async function getFirstLessonId(
  courseId: string,
): Promise<string | null> {
  const ids = await getOrderedLessonIds(courseId);
  return ids[0] ?? null;
}

export async function isEnrolled(
  userId: string | null | undefined,
  courseId: string,
): Promise<boolean> {
  if (!userId) return false;
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    select: { id: true },
  });
  return Boolean(enrollment);
}

/** Number of completed lessons / total lessons + percentage for a user in a course. */
export async function getCourseProgress(
  userId: string,
  courseId: string,
): Promise<{ completed: number; total: number; percent: number }> {
  const lessonIds = await getOrderedLessonIds(courseId);
  const total = lessonIds.length;
  if (total === 0) return { completed: 0, total: 0, percent: 0 };

  const completed = await db.lessonProgress.count({
    where: { userId, lessonId: { in: lessonIds } },
  });
  return { completed, total, percent: toPercent(completed, total) };
}
