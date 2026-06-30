"use client";

import * as React from "react";
import { ListVideo } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LessonSidebar } from "./lesson-sidebar";
import type { SidebarChapter } from "@/lib/queries/lesson";

export function MobileSidebar({
  chapters,
  progress,
}: {
  chapters: SidebarChapter[];
  progress: { completed: number; total: number; percent: number };
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <ListVideo />
          Lessons
        </Button>
      </DialogTrigger>
      <DialogContent title="Course content" className="w-[88%] max-w-md p-0">
        <LessonSidebar
          chapters={chapters}
          progress={progress}
          onNavigate={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
