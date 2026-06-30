"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { toggleLessonComplete } from "@/lib/actions/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LessonActions({
  lessonId,
  completed,
  prevLessonId,
  nextLessonId,
}: {
  lessonId: string;
  completed: boolean;
  prevLessonId: string | null;
  nextLessonId: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleLessonComplete(lessonId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      if (result.completed) {
        toast.success(
          nextLessonId ? "Lesson complete! On to the next one." : "Lesson complete!",
        );
      }
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Button
        variant={completed ? "secondary" : "default"}
        onClick={handleToggle}
        disabled={isPending}
        aria-pressed={completed}
        className={cn(completed && "text-success")}
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : completed ? (
          <Check />
        ) : (
          <Circle />
        )}
        {completed ? "Completed" : "Mark as complete"}
      </Button>

      <div className="flex items-center gap-2">
        <Button
          asChild={Boolean(prevLessonId)}
          variant="outline"
          disabled={!prevLessonId}
          aria-label="Previous lesson"
        >
          {prevLessonId ? (
            <Link href={`/lesson/${prevLessonId}`}>
              <ChevronLeft />
              Previous
            </Link>
          ) : (
            <span>
              <ChevronLeft />
              Previous
            </span>
          )}
        </Button>
        <Button
          asChild={Boolean(nextLessonId)}
          variant="outline"
          disabled={!nextLessonId}
          aria-label="Next lesson"
        >
          {nextLessonId ? (
            <Link href={`/lesson/${nextLessonId}`}>
              Next
              <ChevronRight />
            </Link>
          ) : (
            <span>
              Next
              <ChevronRight />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
