import { Skeleton } from "@/components/ui/skeleton";

export default function LessonLoading() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="size-9 rounded-md" />
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
        <main className="px-4 py-6 sm:px-6 lg:py-8">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="mt-6 space-y-4">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-10 w-full max-w-md" />
          </div>
        </main>
        <aside className="hidden border-l p-5 lg:block">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-4 h-2 w-full rounded-full" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
