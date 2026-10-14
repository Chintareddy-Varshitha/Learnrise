import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LearnRise — AI-Powered Adaptive Learning",
  description:
    "LearnRise helps students learn independently with AI-powered hints, personalized feedback, and progress tracking. Educators monitor learning outcomes and identify struggling students.",
  keywords: [
    "LearnRise",
    "AI learning",
    "adaptive learning",
    "student progress",
    "educator monitoring",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface">{children}</body>
    </html>
  );
}
