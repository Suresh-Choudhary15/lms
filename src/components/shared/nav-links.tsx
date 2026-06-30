"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type NavItem = { label: string; href: string };

export function NavLinks({
  items,
  onNavigate,
  className,
  itemClassName,
}: {
  items: NavItem[];
  onNavigate?: () => void;
  className?: string;
  itemClassName?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={className} aria-label="Primary">
      {items.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active ? "text-foreground" : "text-muted-foreground",
              itemClassName,
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
