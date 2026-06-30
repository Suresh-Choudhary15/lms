import { db } from "@/lib/db";

export type CertificateData = {
  course: {
    title: string;
    category: string;
    instructorName: string;
    instructorTitle: string;
  };
  learnerName: string;
  completedAt: Date;
  lessonCount: number;
};

/**
 * Returns certificate data for a user + course, or null when the course
 * doesn't exist, the user isn't enrolled, or the course isn't 100% complete.
 * `completedAt` is the timestamp of the lesson that finished the course.
 */
export async function getCertificateData(
  userId: string,
  slug: string,
): Promise<CertificateData | null> {
  const course = await db.course.findUnique({
    where: { slug },
    select: {
      title: true,
      category: true,
      instructorName: true,
      instructorTitle: true,
      chapters: {
        select: { lessons: { select: { id: true } } },
      },
    },
  });
  if (!course) return null;

  const lessonIds = course.chapters.flatMap((c) => c.lessons.map((l) => l.id));
  if (lessonIds.length === 0) return null;

  const [user, progressRows] = await Promise.all([
    db.user.findUnique({ where: { id: userId }, select: { name: true } }),
    db.lessonProgress.findMany({
      where: { userId, lessonId: { in: lessonIds } },
      select: { completedAt: true },
      orderBy: { completedAt: "desc" },
    }),
  ]);
  if (!user) return null;

  // Not every lesson is done yet — no certificate.
  if (progressRows.length < lessonIds.length) return null;

  return {
    course: {
      title: course.title,
      category: course.category,
      instructorName: course.instructorName,
      instructorTitle: course.instructorTitle,
    },
    learnerName: user.name,
    completedAt: progressRows[0].completedAt,
    lessonCount: lessonIds.length,
  };
}
