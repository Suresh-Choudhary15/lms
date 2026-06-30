"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, Play } from "lucide-react";
import { toast } from "sonner";
import { enrollAction } from "@/lib/actions/enrollment";
import { Button } from "@/components/ui/button";

type Props = {
  courseId: string;
  isEnrolled: boolean;
  resumeLessonId: string | null;
  size?: "default" | "lg";
  className?: string;
};

export function EnrollButton({
  courseId,
  isEnrolled,
  resumeLessonId,
  size = "lg",
  className,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  // Already enrolled → straight to the resume lesson.
  if (isEnrolled && resumeLessonId) {
    return (
      <Button asChild size={size} className={className}>
        <Link href={`/lesson/${resumeLessonId}`}>
          <Play />
          Continue learning
        </Link>
      </Button>
    );
  }

  function handleEnroll() {
    startTransition(async () => {
      const result = await enrollAction(courseId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("You're enrolled! Starting your first lesson.");
      if (result.firstLessonId) {
        router.push(`/lesson/${result.firstLessonId}`);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <Button
      size={size}
      className={className}
      onClick={handleEnroll}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : null}
      {isPending ? "Enrolling…" : "Enroll for free"}
      {!isPending ? <ArrowRight /> : null}
    </Button>
  );
}
