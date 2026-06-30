import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { Container } from "@/components/shared/container";
import { CourseCard } from "@/components/shared/course-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getAllCourses, getCategories } from "@/lib/queries/courses";
import { CategoryFilter } from "./category-filter";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse all self-paced courses on Lumen.",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, allCourses, categories] = await Promise.all([
    searchParams,
    getAllCourses(),
    getCategories(),
  ]);

  const activeCategory =
    category && categories.includes(category) ? category : undefined;
  const courses = activeCategory
    ? allCourses.filter((c) => c.category === activeCategory)
    : allCourses;

  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Explore courses
        </h1>
        <p className="mt-3 text-muted-foreground">
          {allCourses.length} self-paced courses across development, design,
          data, and product. Learn whenever it suits you.
        </p>
      </div>

      <div className="mt-8">
        <CategoryFilter categories={categories} active={activeCategory} />
      </div>

      {courses.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard key={course.id} {...course} priority={index < 3} />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-10"
          icon={SearchX}
          title="No courses in this category yet"
          description="We couldn't find courses here. Try another category or browse everything."
          action={{ label: "View all courses", href: "/courses" }}
        />
      )}
    </Container>
  );
}
