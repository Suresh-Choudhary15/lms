import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="px-4 py-5 sm:px-8">
        <Logo />
      </div>
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Compass className="size-7" />
        </div>
        <p className="mt-6 text-sm font-medium text-primary">404</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-7 flex gap-3">
          <Button asChild>
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/courses">Browse courses</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
