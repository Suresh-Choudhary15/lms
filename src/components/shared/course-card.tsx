import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { levelLabel } from "@/components/shared/level-badge";
import { formatDuration } from "@/lib/utils";

export type CourseCardProps = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  thumbnailUrl: string;
  instructorName: string;
  lessonCount: number;
  durationSeconds: number;
  /** When provided, renders a progress bar instead of the subtitle (enrolled view). */
  progressPercent?: number;
  href?: string;
  priority?: boolean;
};

export function CourseCard({
  slug,
  title,
  subtitle,
  category,
  level,
  thumbnailUrl,
  instructorName,
  lessonCount,
  durationSeconds,
  progressPercent,
  href,
  priority = false,
}: CourseCardProps) {
  const showProgress = typeof progressPercent === "number";

  return (
    <Link
      href={href ?? `/courses/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={thumbnailUrl}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />
        <Badge
          variant="secondary"
          className="absolute left-3 top-3 bg-background/90 backdrop-blur"
        >
          {category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{levelLabel(level)}</span>
          <span aria-hidden>•</span>
          <span className="inline-flex items-center gap-1">
            <BookOpen className="size-3.5" />
            {lessonCount} lessons
          </span>
          <span aria-hidden>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {formatDuration(durationSeconds)}
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug group-hover:text-primary">
          {title}
        </h3>

        {showProgress ? (
          <div className="mt-auto pt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium">{progressPercent}% complete</span>
            </div>
            <Progress value={progressPercent} />
          </div>
        ) : (
          <>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {subtitle}
            </p>
            <p className="mt-auto pt-4 text-sm font-medium">{instructorName}</p>
          </>
        )}
      </div>
    </Link>
  );
}
