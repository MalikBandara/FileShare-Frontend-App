"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineInformationCircle } from "react-icons/hi";

/* ─── types ─────────────────────────────────────────────── */
type ToastKind = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  kind: ToastKind;
}

interface ToastContextValue {
  toast: (message: string, kind?: ToastKind) => void;
}

const Ctx = createContext<ToastContextValue>({ toast: () => {} });
export const useToast = () => useContext(Ctx);

let _id = 0;

/* ─── provider ──────────────────────────────────────────── */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, kind: ToastKind = "info") => {
    const id = ++_id;
    setToasts((prev) => [...prev, { id, message, kind }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const kindConfig: Record<ToastKind, { classes: string, icon: React.ComponentType<{ className?: string }> }> = {
    success: {
       classes: "bg-emerald-950/80 border-emerald-500/30 text-emerald-100 shadow-emerald-500/20",
       icon: HiOutlineCheckCircle
    },
    error: {
       classes: "bg-red-950/80 border-red-500/30 text-red-100 shadow-red-500/20",
       icon: HiOutlineExclamationCircle
    },
    info: {
       classes: "bg-slate-900/80 border-slate-500/30 text-slate-200 shadow-slate-950/50",
       icon: HiOutlineInformationCircle
    },
  };

  return (
    <Ctx.Provider value={{ toast }}>
      {children}

      {/* toast stack */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none items-end">
        {toasts.map((t) => {
          const config = kindConfig[t.kind];
          const Icon = config.icon;
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-xl text-sm font-medium animate-slide-up transform transition-all duration-300 ${config.classes}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0 opacity-80" />
              <span>{t.message}</span>
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
}
