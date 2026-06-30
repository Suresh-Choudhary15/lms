import { db } from "@/lib/db";
import { toPercent } from "@/lib/utils";

export type SidebarLesson = {
  id: string;
  title: string;
  durationSeconds: number;
  position: number;
  completed: boolean;
  isCurrent: boolean;
};

export type SidebarChapter = {
  id: string;
  title: string;
  position: number;
  lessons: SidebarLesson[];
};

export type LessonContext = {
  lesson: {
    id: string;
    title: string;
    description: string;
    youtubeId: string;
    durationSeconds: number;
    completed: boolean;
  };
  course: { id: string; slug: string; title: string };
  chapters: SidebarChapter[];
  prevLessonId: string | null;
  nextLessonId: string | null;
  progress: { completed: number; total: number; percent: number };
  isEnrolled: boolean;
  position: { index: number; total: number };
};

/**
 * Gather everything the lesson player needs in one place: the active lesson,
 * the full sidebar tree with completion flags, neighbour lessons, and progress.
 * Returns null when the lesson does not exist.
 */
export async function getLessonContext(
  userId: string,
  lessonId: string,
): Promise<LessonContext | null> {
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: { chapter: { select: { courseId: true } } },
  });
  if (!lesson) return null;

  const courseId = lesson.chapter.courseId;

  const [course, chaptersRaw, enrollment, progressRows] = await Promise.all([
    db.course.findUnique({
      where: { id: courseId },
      select: { id: true, slug: true, title: true },
    }),
    db.chapter.findMany({
      where: { courseId },
      orderBy: { position: "asc" },
      include: { lessons: { orderBy: { position: "asc" } } },
    }),
    db.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
      select: { id: true },
    }),
    db.lessonProgress.findMany({
      where: { userId, lesson: { chapter: { courseId } } },
      select: { lessonId: true },
    }),
  ]);

  if (!course) return null;

  const completedIds = new Set(progressRows.map((p) => p.lessonId));
  const flatIds = chaptersRaw.flatMap((c) => c.lessons.map((l) => l.id));
  const currentIndex = flatIds.indexOf(lessonId);

  const chapters: SidebarChapter[] = chaptersRaw.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    position: chapter.position,
    lessons: chapter.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      durationSeconds: l.durationSeconds,
      position: l.position,
      completed: completedIds.has(l.id),
      isCurrent: l.id === lessonId,
    })),
  }));

  return {
    lesson: {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      youtubeId: lesson.youtubeId,
      durationSeconds: lesson.durationSeconds,
      completed: completedIds.has(lesson.id),
    },
    course,
    chapters,
    prevLessonId: currentIndex > 0 ? flatIds[currentIndex - 1] : null,
    nextLessonId:
      currentIndex >= 0 && currentIndex < flatIds.length - 1
        ? flatIds[currentIndex + 1]
        : null,
    progress: {
      completed: completedIds.size,
      total: flatIds.length,
      percent: toPercent(completedIds.size, flatIds.length),
    },
    isEnrolled: Boolean(enrollment),
    position: { index: currentIndex, total: flatIds.length },
  };
}
