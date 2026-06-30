import { Badge } from "@/components/ui/badge";

const LABELS: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export function levelLabel(level: string): string {
  return LABELS[level] ?? level;
}

export function LevelBadge({ level }: { level: string }) {
  return <Badge variant="secondary">{levelLabel(level)}</Badge>;
}
