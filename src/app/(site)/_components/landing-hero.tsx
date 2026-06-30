import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function LandingHero({
  courseCount,
  lessonCount,
}: {
  courseCount: number;
  lessonCount: number;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Soft background accent — subtle, not decorative noise. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent)]"
      />
      <Container className="flex flex-col items-center py-20 text-center sm:py-28">
        <Badge variant="default" className="mb-5">
          Self-paced learning, beautifully simple
        </Badge>
        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Learn new skills at{" "}
          <span className="text-primary">your own pace</span>
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground">
          Lumen is a calm place to learn. Browse expert-led courses, follow a
          clear path, and watch your progress add up — one lesson at a time.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/courses">
              Browse courses
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/register">
              <PlayCircle />
              Start learning free
            </Link>
          </Button>
        </div>

        <dl className="mt-14 grid w-full max-w-md grid-cols-3 gap-6">
          <Stat value={`${courseCount}`} label="Courses" />
          <Stat value={`${lessonCount}`} label="Lessons" />
          <Stat value="100%" label="Self-paced" />
        </dl>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <dt className="order-2 text-sm text-muted-foreground">{label}</dt>
      <dd className="order-1 text-3xl font-bold tracking-tight">{value}</dd>
    </div>
  );
}
