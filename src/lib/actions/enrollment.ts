"use server";

import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { db } from "@/lib/db";
// import { getCurrentUser } from "@/lib/auth/current-user";
import { getFirstLessonId } from "@/lib/queries/courses";

export type EnrollResult =
  | { ok: true; firstLessonId: string | null }
  | { ok: false; error: string };

/**
 * Enroll the current user in a course. Idempotent: enrolling again is a no-op
 * that still resolves to the course's first lesson so the CTA always works.
 */
export async function enrollAction(courseId: string): Promise<EnrollResult> {
  // const user = await getCurrentUser();
  // if (!user) {
  //   const course = await db.course.findUnique({
  //     where: { id: courseId },
  //     select: { slug: true },
  //   });
  //   redirect(
  //     `/login?callbackUrl=${encodeURIComponent(
  //       course ? `/courses/${course.slug}` : "/courses",
  //     )}`,
  //   );
  // }

  const user = {
    id: "cmr1m2wxv0000qm5eq079v8gc",
    name: "Alex Rivera",
  };

  const course = await db.course.findUnique({
    where: { id: courseId },
    select: { id: true, slug: true },
  });
  if (!course) {
    return { ok: false, error: "This course no longer exists." };
  }

  await db.enrollment.upsert({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    create: { userId: user.id, courseId: course.id },
    update: {},
  });

  revalidatePath(`/courses/${course.slug}`);
  revalidatePath("/dashboard");

  const firstLessonId = await getFirstLessonId(course.id);
  return { ok: true, firstLessonId };
}
