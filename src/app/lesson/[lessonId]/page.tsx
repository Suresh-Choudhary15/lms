import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser, requireUser } from "@/lib/auth/current-user";
import { getLessonContext } from "@/lib/queries/lesson";
import { formatDuration } from "@/lib/utils";
import { LessonPlayer } from "./_components/lesson-player";
import { LessonSidebar } from "./_components/lesson-sidebar";
import { MobileSidebar } from "./_components/mobile-sidebar";
import { LessonActions } from "./_components/lesson-actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const user = await getCurrentUser();
  if (!user) return { title: "Lesson" };
  const ctx = await getLessonContext(user.id, lessonId);
  if (!ctx) return { title: "Lesson" };
  return { title: `${ctx.lesson.title} · ${ctx.course.title}` };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const user = await requireUser(`/lesson/${lessonId}`);
  const ctx = await getLessonContext(user.id, lessonId);
  if (!ctx) notFound();

  // Progress can only be tracked for enrolled courses — send others to enroll.
  if (!ctx.isEnrolled) redirect(`/courses/${ctx.course.slug}`);

  const { lesson, course, chapters, prevLessonId, nextLessonId, progress } =
    ctx;

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Focused top bar */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Logo className="hidden sm:flex" />
            <span className="hidden h-6 w-px bg-border sm:block" />
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex min-w-0 items-center gap-1.5 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="size-4 shrink-0" />
              <span className="truncate">{course.title}</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <MobileSidebar chapters={chapters} progress={progress} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
        <main className="min-w-0 px-4 py-6 sm:px-6 lg:py-8">
          <LessonPlayer youtubeId={lesson.youtubeId} title={lesson.title} />

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="muted">
                  Lesson {ctx.position.index + 1} of {ctx.position.total}
                </Badge>
                <span>{formatDuration(lesson.durationSeconds)}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                {lesson.title}
              </h1>
            </div>

            <LessonActions
              lessonId={lesson.id}
              completed={lesson.completed}
              prevLessonId={prevLessonId}
              nextLessonId={nextLessonId}
            />

            {lesson.description ? (
              <div className="border-t pt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  About this lesson
                </h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {lesson.description}
                </p>
              </div>
            ) : null}
          </div>
        </main>

        {/* Desktop sidebar */}
        <aside className="hidden border-l lg:block">
          <div className="sticky top-16 h-[calc(100dvh-4rem)]">
            <LessonSidebar chapters={chapters} progress={progress} />
          </div>
        </aside>
      </div>
    </div>
  );
}
