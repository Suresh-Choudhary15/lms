import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="pb-20">
      <Container>
        <div className="overflow-hidden rounded-2xl border bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <h2 className="mx-auto max-w-xl text-balance text-3xl font-bold tracking-tight">
            Ready to start learning?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            Create a free account and pick up your first lesson today. Your
            progress is saved automatically.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-7">
            {/* <Link href="/,register"> */}
            <Link href="/courses">
              Create your free account
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
