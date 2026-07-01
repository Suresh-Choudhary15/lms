import type { Metadata } from "next";
import {
  BookMarked,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { CourseCard } from "@/components/shared/course-card";
import { EmptyState } from "@/components/shared/empty-state";
// import { requireUser } from "@/lib/auth/current-user";
import {
  getDashboardData,
  getRecommendedCourses,
} from "@/lib/queries/dashboard";
import { StatCard } from "./_components/stat-card";
import { ContinueLearningCard } from "./_components/continue-learning-card";
import { EnrolledCourseCard } from "./_components/enrolled-course-card";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  // const user = await requireUser("/dashboard");
  const user = {
    id: "cmr1m2wxv0000qm5eq079v8gc",
    name: "Alex Rivera",
  };
  const [data, recommended] = await Promise.all([
    getDashboardData(user.id),
    getRecommendedCourses(user.id),
  ]);

  const firstName = user.name.split(" ")[0];
  const hasCourses = data.enrolled.length > 0;

  const hour = new Date().getHours();

  let greeting: string;
  let subtitle: string;

  if (hour >= 5 && hour < 12) {
    greeting = `Good morning, ${firstName} 👋`;
    subtitle = hasCourses
      ? "Ready to continue where you left off?"
      : "Today is a great day to start learning.";
  } else if (hour >= 12 && hour < 17) {
    greeting = `Good afternoon, ${firstName} 👋`;
    subtitle = hasCourses
      ? "Keep your learning momentum going."
      : "Explore a course and build a new skill today.";
  } else if (hour >= 17 && hour < 22) {
    greeting = `Good evening, ${firstName} 👋`;
    subtitle = hasCourses
      ? "A perfect time to finish another lesson."
      : "Wind down by learning something new.";
  } else {
    greeting = `Good night, ${firstName} 🌙`;
    subtitle = hasCourses
      ? "Every lesson completed today counts."
      : "Plan tomorrow's learning journey.";
  }

  return (
    <Container className="py-10 sm:py-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {greeting}
        </h1>

        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={BookMarked}
          label="Enrolled courses"
          value={data.stats.enrolledCount}
          description="Currently enrolled"
        />
        <StatCard
          icon={TrendingUp}
          label="In progress"
          value={data.stats.inProgress}
          description="Actively learning"
        />
        <StatCard
          icon={CheckCircle2}
          label="Lessons completed"
          value={data.stats.completedLessons}
          description="Across all courses"
        />
        <StatCard
          icon={GraduationCap}
          label="Courses completed"
          value={data.stats.completedCourses}
          description="Ready to showcase"
        />
      </div>

      {!hasCourses ? (
        <EmptyState
          className="mt-10"
          icon={BookMarked}
          title="You haven't enrolled in any courses yet"
          description="Browse the catalog and enroll in your first course. Your progress will show up here."
          action={{ label: "Browse courses", href: "/courses" }}
        />
      ) : (
        <>
          {/* Continue learning */}
          {data.continueLearning ? (
            <section className="mt-12">
              <SectionHeader
                title="Continue learning"
                description="Jump back into your most recent course."
              />
              <div className="mt-6">
                <ContinueLearningCard course={data.continueLearning} />
              </div>
            </section>
          ) : null}

          {/* My courses */}
          <section className="mt-12">
            <SectionHeader
              title="My courses"
              description="Everything you're enrolled in."
            />
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.enrolled.map((course) => (
                <EnrolledCourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Recommendations */}
      {recommended.length > 0 ? (
        <section className="mt-12">
          <SectionHeader
            title="Recommended for you"
            description="Courses to explore next."
            action={{ label: "View all courses", href: "/courses" }}
          />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </section>
      ) : hasCourses ? (
        <section className="mt-12">
          <EmptyState
            icon={Sparkles}
            title="You're enrolled in everything!"
            description="You've enrolled in all available courses. New courses are on the way."
          />
        </section>
      ) : null}
    </Container>
  );
}
