import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { EnrolledCourse } from "@/lib/queries/dashboard";

export function EnrolledCourseCard({ course }: { course: EnrolledCourse }) {
  const href = course.resumeLessonId
    ? `/lesson/${course.resumeLessonId}`
    : `/courses/${course.slug}`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={course.thumbnailUrl}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {course.isComplete ? (
          <Badge
            variant="success"
            className="absolute left-3 top-3 bg-background/90 backdrop-blur"
          >
            <CheckCircle2 className="mr-1 size-3.5" />
            Completed
          </Badge>
        ) : (
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 bg-background/90 backdrop-blur"
          >
            {course.category}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug group-hover:text-primary">
          {course.title}
        </h3>
        <div className="mt-auto pt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-medium">{course.percent}% complete</span>
            <span className="text-muted-foreground">
              {course.completedLessons}/{course.totalLessons}
            </span>
          </div>
          <Progress value={course.percent} />
        </div>
      </div>
    </Link>
  );
}
