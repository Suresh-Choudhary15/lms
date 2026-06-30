import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth/current-user";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = { title: "Create account" };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const user = await getCurrentUser();
  const { callbackUrl } = await searchParams;
  if (user) redirect(callbackUrl ?? "/dashboard");

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>
          Start learning in minutes. No credit card required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm callbackUrl={callbackUrl} />
      </CardContent>
    </Card>
  );
}
