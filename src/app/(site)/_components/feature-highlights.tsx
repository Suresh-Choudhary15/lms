import { Container } from "@/components/shared/container";
import { Compass, BarChart3, MonitorPlay } from "lucide-react";

const FEATURES = [
  {
    icon: Compass,
    title: "A clear path",
    description:
      "Courses are organized into chapters and lessons so you always know what comes next.",
  },
  {
    icon: MonitorPlay,
    title: "Focused lessons",
    description:
      "Distraction-free video lessons with simple navigation. Just you and the content.",
  },
  {
    icon: BarChart3,
    title: "Visible progress",
    description:
      "Mark lessons complete and watch your progress build. Momentum keeps you going.",
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Built for how you actually learn
          </h2>
          <p className="mt-3 text-muted-foreground">
            No clutter, no noise. Everything here exists to help you make
            progress.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
