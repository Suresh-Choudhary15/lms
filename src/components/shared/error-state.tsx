"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Friendly, recoverable error UI. Never exposes raw technical details. */
export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again — it usually works on a second attempt.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {onRetry ? (
        <Button onClick={onRetry} className="mt-5">
          <RotateCcw />
          Try again
        </Button>
      ) : null}
    </div>
  );
}
