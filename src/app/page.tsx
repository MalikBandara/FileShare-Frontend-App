"use client";

import Link from "next/link";
import { HiOutlineShare, HiOutlineLockClosed, HiOutlineCloudUpload, HiArrowRight } from "react-icons/hi";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 pt-24 pb-16 min-h-[calc(100vh-4rem)]">
      {/* hero */}
      <div className="relative mb-10 group">
        <div className="absolute -inset-8 bg-emerald-500/20 blur-3xl rounded-full opacity-70 group-hover:opacity-100 transition duration-700" />
        <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40 border border-emerald-300/30 transform group-hover:scale-105 transition duration-500">
          <HiOutlineShare className="w-12 h-12 text-white" />
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Share your files{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 animate-pulse-slow">
            beautifully
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Experience the most elegant way to upload, manage, and distribute your content. Completely redefined for a flawless experience.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 mt-12 w-full sm:w-auto">
        <Link
          href="/register"
          className="group relative px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.6)] flex items-center justify-center gap-2 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Free Now <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
        <Link
          href="/login"
          className="px-8 py-4 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white font-semibold transition-all flex items-center justify-center"
        >
          Sign In
        </Link>
      </div>

      {/* feature cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-32 max-w-5xl w-full">
        {[
          {
            icon: HiOutlineCloudUpload,
            title: "Lightning Uploads",
            desc: "Drag & drop your files into our secure vault with blazing fast speeds up to 5 MB.",
          },
          {
            icon: HiOutlineShare,
            title: "Instant Links",
            desc: "Generate elegant, unique shareable URLs immediately. Zero friction involved.",
          },
          {
            icon: HiOutlineLockClosed,
            title: "Bank-grade Security",
            desc: "Protected by industry-standard JWT protocols. Your data remains yours alone.",
          },
        ].map((f, i) => (
          <div
            key={f.title}
            className="group relative p-8 rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/30 hover:bg-emerald-950/20 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform translate-x-4 -translate-y-4">
               <f.icon className="w-32 h-32 text-emerald-500" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-emerald-500/20">
              <f.icon className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-300 transition-colors">{f.title}</h3>
            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
