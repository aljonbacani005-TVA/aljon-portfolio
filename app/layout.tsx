import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MouseEffects } from "@/components/MouseEffects";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aljon Bacani | AI Automation Specialist",
  description:
    "AI Automation Specialist based in Pampanga, Philippines. Helping businesses automate workflows, build AI chatbots, and integrate tools.",
  keywords: [
    "AI Automation",
    "Zapier",
    "Make.com",
    "AI Chatbots",
    "CRM Automation",
    "Aljon Bacani",
  ],
  openGraph: {
    title: "Aljon Bacani | AI Automation Specialist",
    description:
      "Helping businesses automate workflows, build AI chatbots, and integrate tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={inter.variable}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body
        className="bg-bg-deep text-text-primary antialiased"
        suppressHydrationWarning
      >
        <MouseEffects />
        <div className="spotlight" />
        <div className="aurora" />
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
