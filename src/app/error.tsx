"use client";

import { ErrorState } from "@/components/shared/error-state";

export default function AppError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <ErrorState onRetry={reset} />
    </div>
  );
}
