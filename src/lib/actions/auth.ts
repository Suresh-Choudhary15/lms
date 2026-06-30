"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, destroySession } from "@/lib/auth/session";
import { loginSchema, registerSchema } from "@/lib/validators/auth";

export type AuthResult = { error: string } | undefined;

function safeCallback(raw: FormDataEntryValue | null): string {
  const value = typeof raw === "string" ? raw : "";
  // Only allow same-site relative paths to prevent open redirects.
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  return "/dashboard";
}

export async function loginAction(formData: FormData): Promise<AuthResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Please check your email and password." };
  }

  const callbackUrl = safeCallback(formData.get("callbackUrl"));
  const email = parsed.data.email.toLowerCase().trim();

  const user = await db.user.findUnique({ where: { email } });
  // Verify even when the user is missing to avoid leaking which emails exist.
  const valid = user
    ? await verifyPassword(parsed.data.password, user.passwordHash)
    : false;

  if (!user || !valid) {
    return { error: "Invalid email or password." };
  }

  await createSession(user.id);
  redirect(callbackUrl);
}

export async function registerAction(formData: FormData): Promise<AuthResult> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please check your details.",
    };
  }

  const callbackUrl = safeCallback(formData.get("callbackUrl"));
  const email = parsed.data.email.toLowerCase().trim();

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await db.user.create({
    data: { name: parsed.data.name.trim(), email, passwordHash },
  });

  await createSession(user.id);
  redirect(callbackUrl);
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}
