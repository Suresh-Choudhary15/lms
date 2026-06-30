import Link from "next/link";
import { cn } from "@/lib/utils";

/** Server-rendered filter chips driven by the `category` search param. */
export function CategoryFilter({
  categories,
  active,
}: {
  categories: string[];
  active?: string;
}) {
  const chips: { label: string; value: string | undefined }[] = [
    { label: "All", value: undefined },
    ...categories.map((c) => ({ label: c, value: c })),
  ];

  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label="Filter by category">
      {chips.map((chip) => {
        const isActive = (chip.value ?? undefined) === (active ?? undefined);
        const href = chip.value
          ? `/courses?category=${encodeURIComponent(chip.value)}`
          : "/courses";
        return (
          <Link
            key={chip.label}
            href={href}
            role="listitem"
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {chip.label}
          </Link>
        );
      })}
    </div>
  );
}
