// import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { NavLinks } from "@/components/shared/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
// import { UserMenu } from "@/components/shared/user-menu";
import { MobileNav } from "@/components/shared/mobile-nav";
// import { Button } from "@/components/ui/button";
// import { getCurrentUser } from "@/lib/auth/current-user";

// const NAV_ITEMS: NavItem[] = [
//   { label: "Home", href: "/" },
//   { label: "Courses", href: "/courses" },
//   { label: "Dashboard", href: "/dashboard" },
// ];

export async function Navbar() {
  // const user = await getCurrentUser();
  const user = {
    id: "cmr1m2wxv0000qm5eq079v8gc",
    name: "Alex Rivera",
  };
  const navItems = user
    ? [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: "Dashboard", href: "/dashboard" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
      ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <NavLinks
            items={navItems}
            className="hidden items-center gap-6 md:flex"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          {/* {user ? (
            <UserMenu user={user} />
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button asChild variant="ghost">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          )} */}
          ...
          <MobileNav items={navItems} authed={Boolean(user)} />
        </div>
      </Container>
    </header>
  );
}
