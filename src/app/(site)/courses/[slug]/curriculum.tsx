import Link from "next/link";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDuration } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Lesson = {
  id: string;
  title: string;
  durationSeconds: number;
};
type Chapter = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export function Curriculum({
  chapters,
  isEnrolled,
  completedLessonIds,
}: {
  chapters: Chapter[];
  isEnrolled: boolean;
  completedLessonIds: Set<string>;
}) {
  const totalLessons = chapters.reduce((s, c) => s + c.lessons.length, 0);

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h3 className="font-semibold">Course content</h3>
        <p className="text-sm text-muted-foreground">
          {chapters.length} chapters · {totalLessons} lessons
        </p>
      </div>
      <Accordion
        type="multiple"
        defaultValue={chapters.map((c) => c.id)}
        className="px-5"
      >
        {chapters.map((chapter, index) => (
          <AccordionItem key={chapter.id} value={chapter.id}>
            <AccordionTrigger>
              <span className="flex items-center gap-3">
                <span className="text-xs font-normal text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {chapter.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1">
                {chapter.lessons.map((lesson) => {
                  const completed = completedLessonIds.has(lesson.id);
                  const content = (
                    <>
                      <span className="flex min-w-0 items-center gap-3">
                        {completed ? (
                          <CheckCircle2 className="size-4 shrink-0 text-success" />
                        ) : isEnrolled ? (
                          <PlayCircle className="size-4 shrink-0 text-muted-foreground" />
                        ) : (
                          <Lock className="size-4 shrink-0 text-muted-foreground" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatDuration(lesson.durationSeconds)}
                      </span>
                    </>
                  );

                  const base =
                    "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm";

                  return (
                    <li key={lesson.id}>
                      {isEnrolled ? (
                        <Link
                          href={`/lesson/${lesson.id}`}
                          className={cn(
                            base,
                            "transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          )}
                        >
                          {content}
                        </Link>
                      ) : (
                        <div className={cn(base, "text-muted-foreground")}>
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
