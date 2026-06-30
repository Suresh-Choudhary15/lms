import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Lumen — Learn at your own pace",
    template: "%s · Lumen",
  },
  description:
    "Lumen is a calm, self-paced learning platform. Browse courses, enroll, watch lessons, and track your progress.",
  openGraph: {
    title: "Lumen — Learn at your own pace",
    description:
      "A calm, self-paced learning platform with clear progress tracking.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-dvh font-sans antialiased`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
