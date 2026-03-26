import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FileShare — Share files instantly",
  description:
    "Upload, manage, and share files with a simple link. Built with Next.js and Spring Boot.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-slate-950 text-slate-200 antialiased min-h-screen relative overflow-x-hidden`}
      >
        {/* Animated Background Orbs for Premium Look */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-[20%] right-[-10%] w-[35%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen" />
        </div>
        
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
