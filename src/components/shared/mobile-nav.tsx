"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { NavLinks, type NavItem } from "@/components/shared/nav-links";

export function MobileNav({
  items,
  authed,
}: {
  items: NavItem[];
  authed: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent title="Menu" className="p-6">
        <div onClick={close}>
          <Logo />
        </div>
        <NavLinks
          items={items}
          onNavigate={close}
          className="mt-8 flex flex-col gap-1"
          itemClassName="rounded-md px-3 py-2 text-base hover:bg-accent"
        />
        <div className="mt-auto flex flex-col gap-2 pt-6">
          {authed ? (
            <Button asChild onClick={close}>
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="outline" onClick={close}>
                {/* <Link href="/login">Sign in</Link> */}
              </Button>
              <Button asChild onClick={close}>
                {/* <Link href="/register">Get started</Link> */}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
