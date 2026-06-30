import { db } from "@/lib/db";
import { getFeaturedCourses } from "@/lib/queries/courses";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { CourseCard } from "@/components/shared/course-card";
import { LandingHero } from "./_components/landing-hero";
import { FeatureHighlights } from "./_components/feature-highlights";
import { CtaSection } from "./_components/cta-section";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const [featured, courseCount, lessonCount] = await Promise.all([
    getFeaturedCourses(),
    db.course.count(),
    db.lesson.count(),
  ]);

  return (
    <>
      <LandingHero courseCount={courseCount} lessonCount={lessonCount} />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            title="Featured courses"
            description="Hand-picked courses to get you started."
            action={{ label: "View all courses", href: "/courses" }}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course, index) => (
              <CourseCard key={course.id} {...course} priority={index < 3} />
            ))}
          </div>
        </Container>
      </section>

      <div className="border-t bg-muted/30">
        <FeatureHighlights />
      </div>

      <CtaSection />
    </>
  );
}
