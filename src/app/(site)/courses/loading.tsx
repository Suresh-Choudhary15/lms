import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseGridSkeleton } from "@/components/shared/course-card-skeleton";

export default function CoursesLoading() {
  return (
    <Container className="py-12 sm:py-16">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-3 h-5 w-full max-w-xl" />
      <div className="mt-8 flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>
      <div className="mt-10">
        <CourseGridSkeleton />
      </div>
    </Container>
  );
}
