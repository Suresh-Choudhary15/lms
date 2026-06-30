"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/current-user";

export type ProgressResult =
  | { ok: true; completed: boolean }
  | { ok: false; error: string };

/**
 * Toggle completion for a lesson for the current user. Requires the user to be
 * enrolled in the lesson's course so progress cannot be written for courses the
 * user never joined.
 */
export async function toggleLessonComplete(
  lessonId: string,
): Promise<ProgressResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, error: "You must be signed in." };
  }

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    select: { id: true, chapter: { select: { courseId: true } } },
  });
  if (!lesson) {
    return { ok: false, error: "Lesson not found." };
  }

  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: { userId: user.id, courseId: lesson.chapter.courseId },
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

  revalidatePath(`/lesson/${lessonId}`);
  revalidatePath("/dashboard");
  return { ok: true, completed };
}
