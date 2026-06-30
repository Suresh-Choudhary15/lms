import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseGridSkeleton } from "@/components/shared/course-card-skeleton";

export default function DashboardLoading() {
  return (
    <Container className="py-10 sm:py-12">
      <Skeleton className="h-9 w-72" />
      <Skeleton className="mt-2 h-5 w-96 max-w-full" />

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[88px] rounded-xl" />
        ))}
      </div>

      <Skeleton className="mt-12 h-7 w-48" />
      <Skeleton className="mt-6 h-56 w-full rounded-xl" />

      <Skeleton className="mt-12 h-7 w-40" />
      <div className="mt-6">
        <CourseGridSkeleton count={3} />
      </div>
    </Container>
  );
}
