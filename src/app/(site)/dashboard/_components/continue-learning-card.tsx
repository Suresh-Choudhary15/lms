import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { EnrolledCourse } from "@/lib/queries/dashboard";

export function ContinueLearningCard({ course }: { course: EnrolledCourse }) {
  const href = course.resumeLessonId
    ? `/lesson/${course.resumeLessonId}`
    : `/courses/${course.slug}`;

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:grid md:grid-cols-[300px_1fr]">
      <div className="relative aspect-video md:aspect-auto md:h-full">
        <Image
          src={course.thumbnailUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-col justify-center gap-6 p-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{course.category}</Badge>

            <Badge variant="outline">Continue Learning</Badge>
          </div>
          <h3 className="text-xl font-semibold tracking-tight">
            {course.title}
          </h3>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {course.subtitle}
          </p>
          <p className="text-sm text-muted-foreground">
            By {course.instructorName}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-medium">{course.percent}% complete</span>
            <span className="text-muted-foreground">
              {course.completedLessons} of {course.totalLessons} lessons
            </span>
          </div>
          <Progress value={course.percent} />
          <p className="text-xs text-muted-foreground">
            Keep going! You&apos;re making great progress.
          </p>
        </div>

        <Button asChild className="w-full sm:w-fit">
          <Link href={href}>
            <Play />
            {course.completedLessons > 0 ? "Resume course" : "Start course"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
