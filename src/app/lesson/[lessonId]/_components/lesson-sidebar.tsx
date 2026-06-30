import Link from "next/link";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatDuration, cn } from "@/lib/utils";
import type { SidebarChapter } from "@/lib/queries/lesson";

export function LessonSidebar({
  chapters,
  progress,
  onNavigate,
}: {
  chapters: SidebarChapter[];
  progress: { completed: number; total: number; percent: number };
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-5">
        <h2 className="font-semibold">Course content</h2>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{progress.percent}% complete</span>
            <span className="text-muted-foreground">
              {progress.completed}/{progress.total}
            </span>
          </div>
          <Progress value={progress.percent} />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3" aria-label="Lessons">
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className="mb-4 last:mb-0">
            <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {String(index + 1).padStart(2, "0")} · {chapter.title}
            </p>
            <ul className="space-y-0.5">
              {chapter.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    href={`/lesson/${lesson.id}`}
                    onClick={onNavigate}
                    aria-current={lesson.isCurrent ? "true" : undefined}
                    className={cn(
                      "flex items-start gap-3 rounded-md px-2 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      lesson.isCurrent
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {lesson.completed ? (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                    ) : lesson.isCurrent ? (
                      <PlayCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                    ) : (
                      <Circle className="mt-0.5 size-4 shrink-0" />
                    )}
                    <span className="flex-1">
                      <span
                        className={cn(
                          "line-clamp-2",
                          lesson.isCurrent && "font-medium",
                        )}
                      >
                        {lesson.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {formatDuration(lesson.durationSeconds)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
