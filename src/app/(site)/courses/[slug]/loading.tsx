import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailLoading() {
  return (
    <>
      <section className="border-b bg-muted/30">
        <Container className="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr] lg:py-16">
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-full max-w-xl" />
            <Skeleton className="h-5 w-1/2" />
            <div className="flex items-center gap-3 pt-4">
              <Skeleton className="size-11 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
          <Skeleton className="aspect-[3/4] w-full rounded-xl" />
        </Container>
      </section>
      <Container className="py-12">
        <div className="max-w-3xl space-y-4">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </Container>
    </>
  );
}
