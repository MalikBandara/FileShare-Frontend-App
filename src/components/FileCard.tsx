"use client";

import { HiOutlineTrash, HiOutlinePencil, HiOutlineClipboardCopy, HiOutlineExternalLink, HiOutlineDocumentText } from "react-icons/hi";
import type { FileDetailsDTO } from "@/types";

interface Props {
  file: FileDetailsDTO;
  onDelete: (shareId: string) => void;
  onEdit: (shareId: string) => void;
}

export default function FileCard({ file, onDelete, onEdit }: Props) {
  const { title, shareId, fileSize, fileType, description } = file;
  const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2) + " MB";
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/share/${shareId}`
      : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className="group relative flex flex-col bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-emerald-500/40 hover:bg-slate-800/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 overflow-hidden">
      
      {/* Background glow decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none" />

      {/* top row */}
      <div className="flex items-start justify-between mb-4 relative z-10 w-full">
        {/* file icon */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center flex-shrink-0 mr-4 shadow-sm group-hover:border-emerald-500/30 transition-colors">
            <HiOutlineDocumentText className="w-6 h-6 text-emerald-400 group-hover:text-teal-400 transition-colors" />
        </div>

        {/* title & format */}
        <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-slate-100 font-bold truncate text-base mb-1 group-hover:text-emerald-300 transition-colors">{title}</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono text-slate-400 border border-white/5 uppercase tracking-wider">{fileType.split('/')[1] || 'FILE'}</span>
        </div>

        {/* quick actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto flex-shrink-0">
          <button
            onClick={() => onEdit(shareId)}
            className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-all cursor-pointer"
            title="Edit"
          >
            <HiOutlinePencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(shareId)}
            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
            title="Delete"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* metadata layout */}
      <div className="mb-6 flex-1 space-y-2 relative z-10">
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {description || "No description provided."}
        </p>
        
        {/* badges inside grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
            <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase mb-0.5">Size</span>
                <span className="text-sm font-mono text-slate-300">{sizeInMB}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase mb-0.5">Share ID</span>
                <span className="text-sm font-mono text-slate-300 truncate">{shareId.substring(0, 8)}...</span>
            </div>
        </div>
      </div>

      {/* action buttons bottom row */}
      <div className="flex gap-3 relative z-10 mt-auto">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5 hover:border-slate-500/30 transition-all cursor-pointer"
        >
          <HiOutlineClipboardCopy className="w-4 h-4" />
          Copy
        </button>
        <a
          href={`/share/${shareId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
        >
          <HiOutlineExternalLink className="w-4 h-4" />
          Link
        </a>
      </div>
    </div>
  );
}
