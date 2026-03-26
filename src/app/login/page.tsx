"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "@/components/Toast";
import { HiOutlineLockClosed } from "react-icons/hi";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      toast("Welcome back!", "success");
      router.push("/dashboard");
    } catch {
      toast("Invalid username or password", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-6 relative z-10">
      <div className="w-full max-w-md p-8 sm:p-10 backdrop-blur-2xl bg-slate-900/40 border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden group">
        
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] -z-10 rounded-full" />
        
        {/* icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] border border-emerald-300/30">
            <HiOutlineLockClosed className="w-8 h-8 text-slate-950" />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-200 mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-sm">
            Enter your credentials to access your secure vault
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block relative">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block ml-1">Username</span>
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
              placeholder="e.g. johndoe"
            />
          </label>

          <label className="block relative">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block ml-1">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-sm font-bold tracking-wide uppercase transition-all shadow-[0_4px_20px_-5px_rgba(16,185,129,0.4)] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            {loading ? "Authenticating..." : "Sign In securely"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="font-medium text-emerald-400 hover:text-emerald-300 hover:underline transition-all">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
