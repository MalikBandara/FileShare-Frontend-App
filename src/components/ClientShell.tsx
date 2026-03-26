"use client";

import { useEffect, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/Toast";
import { useAuthStore } from "@/store/auth-store";

export default function ClientShell({ children }: { children: ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <ToastProvider>
      <Navbar />
      <main className="min-h-[calc(100vh-5rem)]">{children}</main>
    </ToastProvider>
  );
}
