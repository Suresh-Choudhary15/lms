"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
// import { getCurrentUser } from "@/lib/auth/current-user";

export type ProgressResult =
  | {
      ok: true;
      completed: boolean;
      /** True if this toggle just brought the course to 100% completion. */
      courseCompleted: boolean;
      courseSlug: string;
    }
  | { ok: false; error: string };

/**
 * Toggle completion for a lesson for the current user. Requires the user to be
 * enrolled in the lesson's course so progress cannot be written for courses the
 * user never joined.
 */
export async function toggleLessonComplete(
  lessonId: string,
): Promise<ProgressResult> {
  // const user = await getCurrentUser();
  // if (!user) {
  //   return { ok: false, error: "You must be signed in." };
  // }
  const user = {
    id: "cmr1m2wxv0000qm5eq079v8gc",
    name: "Alex Rivera",
  };

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    select: {
      id: true,
      chapter: {
        select: { courseId: true, course: { select: { slug: true } } },
      },
    },
  });
  if (!lesson) {
    return { ok: false, error: "Lesson not found." };
  }
  const courseId = lesson.chapter.courseId;
  const courseSlug = lesson.chapter.course.slug;

  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: { userId: user.id, courseId },
    },
    select: { id: true },
  });
  if (!enrollment) {
    return { ok: false, error: "Enroll in this course to track progress." };
  }

  const existing = await db.lessonProgress.findUnique({
    where: { userId_lessonId: { userId: user.id, lessonId } },
    select: { id: true },
  });

  let completed: boolean;
  if (existing) {
    await db.lessonProgress.delete({ where: { id: existing.id } });
    completed = false;
  } else {
    await db.lessonProgress.create({ data: { userId: user.id, lessonId } });
    completed = true;
  }

  let courseCompleted = false;
  if (completed) {
    const [totalLessons, completedLessons] = await Promise.all([
      db.lesson.count({ where: { chapter: { courseId } } }),
      db.lessonProgress.count({
        where: { userId: user.id, lesson: { chapter: { courseId } } },
      }),
    ]);
    courseCompleted = totalLessons > 0 && totalLessons === completedLessons;
  }

  revalidatePath(`/lesson/${lessonId}`);
  revalidatePath(`/courses/${courseSlug}`);
  revalidatePath("/dashboard");
  return { ok: true, completed, courseCompleted, courseSlug };
}
