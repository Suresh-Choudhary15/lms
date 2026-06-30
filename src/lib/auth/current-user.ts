import { cache } from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth/session";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
};

/**
 * Resolve the authenticated user for the current request, or null when signed out.
 * Wrapped in React `cache` so multiple calls within one render hit the DB once.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const userId = await getSessionUserId();
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });

  return user;
});

/** Like getCurrentUser but redirects to login when there is no session. */
export async function requireUser(
  callbackUrl?: string,
): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    const target = callbackUrl
      ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
      : "/login";
    redirect(target);
  }
  return user;
}
