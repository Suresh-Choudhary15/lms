import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { getCurrentUser } from "@/lib/auth/current-user";

// const FOOTER_LINKS = [
//   { label: "Courses", href: "/courses" },
//   { label: "Dashboard", href: "/dashboard" },
//   { label: "Sign in", href: "/login" },
// ];

export async function Footer() {
  const user = await getCurrentUser();

  const footerLinks = user
    ? [
        { label: "Courses", href: "/courses" },
        { label: "My Learning", href: "/dashboard" },
      ]
    : [
        { label: "Courses", href: "/courses" },
        // { label: "Sign in", href: "/login" },
        // { label: "Get started", href: "/register" },
      ];

  return (
    <footer className="mt-auto border-t bg-card">
      <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            A calmer place to learn. Self-paced courses with clear progress and
            no distractions.
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-x-6 gap-y-2"
          aria-label="Footer navigation"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
      <div className="border-t">
        <Container className="py-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lumen. Built as a focused LMS MVP.
          </p>
        </Container>
      </div>
    </footer>
  );
}
