import { db } from "@/lib/db";
import { toPercent } from "@/lib/utils";
import { getFirstLessonId } from "@/lib/queries/courses";

export type EnrolledCourse = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  thumbnailUrl: string;
  instructorName: string;
  totalLessons: number;
  completedLessons: number;
  percent: number;
  // Lesson to resume on (first incomplete, else first lesson). Null if no lessons.
  resumeLessonId: string | null;
  lastActivityAt: Date | null;
  isComplete: boolean;
};

export type DashboardData = {
  enrolled: EnrolledCourse[];
  continueLearning: EnrolledCourse | null;
  stats: {
    enrolledCount: number;
    completedCourses: number;
    completedLessons: number;
    inProgress: number;
  };
};

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const enrollments = await db.enrollment.findMany({
    where: { userId },
    orderBy: { enrolledAt: "desc" },
    include: {
      course: {
        include: {
          chapters: {
            orderBy: { position: "asc" },
            include: { lessons: { orderBy: { position: "asc" } } },
          },
        },
      },
    },
  });

  // Completed lesson ids + most recent completion timestamps for this user.
  const progress = await db.lessonProgress.findMany({
    where: { userId },
    select: { lessonId: true, completedAt: true },
  });
  const completedIds = new Set(progress.map((p) => p.lessonId));
  const completedAtByLesson = new Map(
    progress.map((p) => [p.lessonId, p.completedAt] as const),
  );

  const enrolled: EnrolledCourse[] = enrollments.map(({ course }) => {
    const lessons = course.chapters.flatMap((c) => c.lessons);
    const total = lessons.length;
    const completedLessons = lessons.filter((l) =>
      completedIds.has(l.id),
    ).length;

    const resumeLesson =
      lessons.find((l) => !completedIds.has(l.id)) ?? lessons[0] ?? null;

    const lastActivityAt = lessons.reduce<Date | null>((latest, l) => {
      const at = completedAtByLesson.get(l.id);
      if (at && (!latest || at > latest)) return at;
      return latest;
    }, null);

    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
      category: course.category,
      thumbnailUrl: course.thumbnailUrl,
      instructorName: course.instructorName,
      totalLessons: total,
      completedLessons,
      percent: toPercent(completedLessons, total),
      resumeLessonId: resumeLesson?.id ?? null,
      lastActivityAt,
      isComplete: total > 0 && completedLessons === total,
    };
  });

  // "Continue learning" = most recently active, still-incomplete course;
  // fall back to the newest enrollment.
  const activeIncomplete = [...enrolled]
    .filter((c) => !c.isComplete && c.lastActivityAt)
    .sort(
      (a, b) =>
        (b.lastActivityAt?.getTime() ?? 0) - (a.lastActivityAt?.getTime() ?? 0),
    );
  const continueLearning =
    activeIncomplete[0] ?? enrolled.find((c) => !c.isComplete) ?? null;

  const orderedCourses = [...enrolled].sort((a, b) => {
    // Completed courses always come last.
    if (a.isComplete !== b.isComplete) {
      return a.isComplete ? 1 : -1;
    }

    // More recently active courses first.
    const aTime = a.lastActivityAt?.getTime() ?? 0;
    const bTime = b.lastActivityAt?.getTime() ?? 0;

    return bTime - aTime;
  });

  return {
    enrolled: orderedCourses,
    continueLearning,
    stats: {
      enrolledCount: enrolled.length,
      completedCourses: enrolled.filter((c) => c.isComplete).length,
      completedLessons: progress.length,
      inProgress: enrolled.filter(
        (c) => !c.isComplete && c.completedLessons > 0,
      ).length,
    },
  };
}

/** Courses the user is NOT enrolled in, for recommendations. */
export async function getRecommendedCourses(userId: string, take = 3) {
  const enrolledIds = (
    await db.enrollment.findMany({
      where: { userId },
      select: { courseId: true },
    })
  ).map((e) => e.courseId);

  const courses = await db.course.findMany({
    where: { id: { notIn: enrolledIds } },
    orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
    take,
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      category: true,
      level: true,
      thumbnailUrl: true,
      instructorName: true,
      chapters: { select: { lessons: { select: { durationSeconds: true } } } },
    },
  });

  return courses.map((course) => {
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
      durationSeconds: lessons.reduce((s, l) => s + l.durationSeconds, 0),
    };
  });
}

export { getFirstLessonId };
