import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Text, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const dmSerifText = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-dm-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "crediblitz — AI Resume & Portfolio Generator",
  description: "Create ATS-friendly resumes and professional portfolios in a single click.",
  icons: {
    icon: "/icon.png",
  },
};

import { ConvexClientProvider } from "@/components/ConvexClientProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(
      dmSans.variable,
      dmSerifText.variable,
      inter.variable,
      "antialiased"
    )}>
      <body className="bg-background selection:bg-primary/20 selection:text-primary">
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}

