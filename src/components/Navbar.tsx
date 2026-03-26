"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";

export default function Navbar() {
  const { isAuthenticated, username, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-slate-950/60 border-b border-white/5 supports-[backdrop-filter]:bg-slate-950/40 shadow-sm shadow-emerald-500/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 sm:px-8">
        {/* logo */}
        <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
            <span className="text-slate-950 font-black text-xl tracking-tighter">F</span>
          </div>
          <span className="text-xl text-slate-100 tracking-tight">
            <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">File</span>
            <span className="font-light">Share</span>
          </span>
        </Link>

        {/* right */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-emerald-400">{username?.[0]?.toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium text-slate-300">
                  {username}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full bg-slate-800/50 hover:bg-red-500/10 text-slate-300 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
              >
                <HiOutlineLogout className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 hover:text-emerald-400 py-2.5 px-5 rounded-full hover:bg-emerald-500/10 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm font-bold px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
