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
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm md:grid md:grid-cols-[280px_1fr]">
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
      <div className="flex flex-col justify-center gap-4 p-6">
        <div className="space-y-1.5">
          <Badge variant="secondary" className="w-fit">
            {course.category}
          </Badge>
          <h3 className="text-xl font-semibold tracking-tight">
            {course.title}
          </h3>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {course.subtitle}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{course.percent}% complete</span>
            <span className="text-muted-foreground">
              {course.completedLessons} of {course.totalLessons} lessons
            </span>
          </div>
          <Progress value={course.percent} />
        </div>

        <Button asChild className="w-fit">
          <Link href={href}>
            <Play />
            {course.completedLessons > 0 ? "Resume course" : "Start course"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
