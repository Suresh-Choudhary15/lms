import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
// import { requireUser } from "@/lib/auth/current-user";
import { getCourseBySlug, isEnrolled } from "@/lib/queries/courses";
import { getCertificateData } from "@/lib/queries/certificate";
import { PrintCertificateButton } from "./print-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  return { title: course ? `Certificate · ${course.title}` : "Certificate" };
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // const user = await requireUser(`/courses/${slug}/certificate`);
  const user = {
    id: "cmr1m2wxv0000qm5eq079v8gc",
    name: "Alex Rivera",
  };

  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const enrolled = await isEnrolled(user.id, course.id);
  if (!enrolled) redirect(`/courses/${slug}`);

  const certificate = await getCertificateData(user.id, slug);
  // Not fully complete yet — send the learner back to keep going rather than
  // showing an empty/broken certificate.
  if (!certificate) redirect(`/courses/${slug}`);

  const completedDate = certificate.completedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-dvh bg-muted/30 print:min-h-0 print:bg-white">
      <header className="border-b bg-background print:hidden">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <Link
            href={`/courses/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" />
            Back to course
          </Link>
        </Container>
      </header>

      <Container className="flex flex-col items-center gap-6 py-12 sm:py-16 print:max-w-none print:py-0">
        {/* Certificate */}
        <div className="certificate-print w-full max-w-3xl rounded-2xl border-4 border-double border-primary/30 bg-card p-8 text-center shadow-sm sm:p-14 print:border-2 print:shadow-none">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <GraduationCap className="size-7" />
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Certificate of Completion
          </p>

          <h1 className="mt-5 text-balance text-5xl font-extrabold tracking-tight sm:text-6xl">
            {certificate.learnerName}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            has successfully completed all {certificate.lessonCount} lessons of
          </p>

          <h2 className="mt-3 text-balance text-2xl font-semibold italic text-primary sm:text-2xl">
            {certificate.course.title}
          </h2>

          <div className="mx-auto mt-8 h-px w-24 bg-border" />

          <div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
            <div className="text-left">
              ──────────────
              <p className="text-sm font-medium">
                {certificate.course.instructorName}
              </p>
              <p className="text-xs text-muted-foreground">
                {certificate.course.instructorTitle}
              </p>
            </div>

            <div className="sm:text-right">
              ──────────────
              <p className="text-sm font-medium">{completedDate}</p>
              <p className="text-xs text-muted-foreground">Date completed</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 print:hidden">
          <PrintCertificateButton />
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
