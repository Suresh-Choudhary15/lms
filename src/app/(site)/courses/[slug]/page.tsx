import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, CheckCircle2, Clock, Layers } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { levelLabel } from "@/components/shared/level-badge";
import { formatDuration } from "@/lib/utils";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/current-user";
import {
  getCourseBySlug,
  getCourseProgress,
  isEnrolled,
} from "@/lib/queries/courses";
import { EnrollButton } from "./enroll-button";
import { Curriculum } from "./curriculum";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course not found" };
  return { title: course.title, description: course.subtitle };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const user = await getCurrentUser();
  const enrolled = await isEnrolled(user?.id, course.id);

  const lessons = course.chapters.flatMap((c) => c.lessons);
  const totalDuration = lessons.reduce((s, l) => s + l.durationSeconds, 0);

  // Completion state only matters when the learner is enrolled.
  let completedIds = new Set<string>();
  let progress: { completed: number; total: number; percent: number } | null =
    null;
  if (user && enrolled) {
    const rows = await db.lessonProgress.findMany({
      where: { userId: user.id, lessonId: { in: lessons.map((l) => l.id) } },
      select: { lessonId: true },
    });
    completedIds = new Set(rows.map((r) => r.lessonId));
    progress = await getCourseProgress(user.id, course.id);
  }

  const resumeLessonId =
    lessons.find((l) => !completedIds.has(l.id))?.id ?? lessons[0]?.id ?? null;

  const outcomes = course.learningOutcomes
    .split("\n")
    .map((o) => o.trim())
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-muted/30">
        <Container className="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:py-16">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{course.category}</Badge>
              <Badge variant="secondary">{levelLabel(course.level)}</Badge>
            </div>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              {course.subtitle}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Layers className="size-4" />
                {course.chapters.length} chapters
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="size-4" />
                {lessons.length} lessons
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {formatDuration(totalDuration)} total
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Avatar className="size-11 border">
                <AvatarImage
                  src={course.instructorAvatar}
                  alt={course.instructorName}
                />
                <AvatarFallback>
                  {course.instructorName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{course.instructorName}</p>
                <p className="text-muted-foreground">
                  {course.instructorTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Enrollment card */}
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="relative aspect-video bg-muted">
                <Image
                  src={course.thumbnailUrl}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-4 p-5">
                {enrolled && progress ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Your progress</span>
                      <span className="text-muted-foreground">
                        {progress.completed}/{progress.total} lessons
                      </span>
                    </div>
                    <Progress value={progress.percent} />
                    {progress.percent === 100 ? (
                      <Link
                        href={`/courses/${course.slug}/certificate`}
                        className="block text-center text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        🎓 View your certificate
                      </Link>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Free · Lifetime access · Learn at your own pace
                  </p>
                )}

                <EnrollButton
                  courseId={course.id}
                  isEnrolled={enrolled}
                  resumeLessonId={resumeLessonId}
                  className="w-full"
                />

                {!enrolled ? (
                  <p className="text-center text-xs text-muted-foreground">
                    No payment required for this demo.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <Container className="py-12">
        <div className="max-w-3xl">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-10">
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">About this course</h2>
                <p className="leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
              </div>

              {outcomes.length > 0 ? (
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">
                    What you&apos;ll learn
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-2.5">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
                        <span className="text-sm">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </TabsContent>

            <TabsContent value="curriculum">
              <Curriculum
                chapters={course.chapters}
                isEnrolled={enrolled}
                completedLessonIds={completedIds}
              />
            </TabsContent>

            <TabsContent value="instructor">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <Avatar className="size-16 border">
                  <AvatarImage
                    src={course.instructorAvatar}
                    alt={course.instructorName}
                  />
                  <AvatarFallback>
                    {course.instructorName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">
                    {course.instructorName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {course.instructorTitle}
                  </p>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {course.instructorBio}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </>
  );
}
