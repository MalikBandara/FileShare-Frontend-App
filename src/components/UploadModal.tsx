"use client";

import { useState, useRef } from "react";
import { HiOutlineX, HiOutlineCloudUpload, HiOutlineDocumentAdd } from "react-icons/hi";
import type { FileUploadRequest } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FileUploadRequest) => Promise<void>;
  initial?: { title: string; description: string };
  mode?: "upload" | "edit";
}

export default function UploadModal({
  open,
  onClose,
  onSubmit,
  initial,
  mode = "upload",
}: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "upload" && !file) return;
    setSubmitting(true);
    try {
      await onSubmit({ title, description, file: file || undefined } as FileUploadRequest);
      if (mode === "upload") {
        setTitle("");
        setDescription("");
        setFile(null);
      }
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* content */}
      <div className="relative z-10 w-full max-w-lg bg-slate-900/90 border border-white/10 rounded-[2rem] p-8 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)] animate-scale-in overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 blur-[60px] -z-10 rounded-full" />

        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-inner">
               <HiOutlineDocumentAdd className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
              {mode === "edit" ? "Update Details" : "Upload File"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* title */}
          <div className="space-y-5">
            <label className="block relative">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block ml-1">Title</span>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
                placeholder="Product design assets..."
              />
            </label>

            {/* description */}
            <label className="block relative">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block ml-1">Description</span>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none shadow-inner leading-relaxed"
                placeholder="Contains screens and design system used for the Q3 release..."
              />
            </label>

            {/* file picker */}
            {mode === "upload" && (
              <div className="relative group/upload">
                 <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block ml-1">File Attachment</span>
                 <button
                   type="button"
                   onClick={() => inputRef.current?.click()}
                   className="w-full relative overflow-hidden flex flex-col items-center justify-center gap-3 bg-slate-950/30 border-2 border-dashed border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 rounded-2xl py-8 text-slate-500 hover:text-emerald-400 transition-all cursor-pointer group-hover/upload:shadow-[0_0_20px_-5px_clamp(rgba(16,185,129,0.2))]"
                 >
                   <div className="w-14 h-14 rounded-full bg-slate-800/80 border border-white/5 flex items-center justify-center shadow-sm group-hover/upload:scale-110 transition-transform">
                     <HiOutlineCloudUpload className="w-6 h-6 text-emerald-500/70 group-hover/upload:text-emerald-400 transition-colors" />
                   </div>
                   <div className="text-center">
                     <span className="block text-sm font-medium mb-1 text-slate-300">
                       {file ? file.name : "Click to browse or drag and drop"}
                     </span>
                     <span className="text-[10px] uppercase text-slate-500 tracking-wider">Up to 5MB</span>
                   </div>
                 </button>
                 <input
                   ref={inputRef}
                   type="file"
                   className="hidden"
                   onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                 />
              </div>
            )}
          </div>

          {/* submit */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={submitting || (mode === "upload" && !file)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-sm font-bold tracking-wide uppercase transition-all shadow-[0_4px_20px_-5px_rgba(16,185,129,0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed"
            >
              {submitting
                ? "Processing Request..."
                : mode === "edit"
                  ? "Save Changes"
                  : "Upload File Securely"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
