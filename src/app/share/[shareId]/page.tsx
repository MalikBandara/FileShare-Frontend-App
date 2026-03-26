"use client";

import { use, useEffect, useState } from "react";
import { getFileDetails, getPreviewUrl } from "@/lib/api";
import type { FileDetailsDTO } from "@/types";
import {
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineDatabase
} from "react-icons/hi";

export default function SharePage({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const { shareId } = use(params);
  const [details, setDetails] = useState<FileDetailsDTO | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFileDetails(shareId)
      .then(setDetails)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [shareId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]" />
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6 text-center">
        <div className="w-24 h-24 rounded-[2rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)]">
          <HiOutlineDocumentText className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-300 mb-3">File not found</h1>
        <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
          The link you followed may be invalid, expired, or the file has been permanently removed by its owner.
        </p>
      </div>
    );
  }

  const isImage = details.fileType?.startsWith("image/");
  const isPdf = details.fileType === "application/pdf";
  const isVideo = details.fileType?.startsWith("video/");
  const previewUrl = getPreviewUrl(shareId);
  const downloadUrl = getPreviewUrl(shareId, true);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
      {/* Background decoration */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left column: Preview Area */}
        <div className="flex-grow md:w-2/3 backdrop-blur-2xl bg-slate-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl group flex flex-col relative h-[500px]">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] -z-10 rounded-full group-hover:bg-emerald-500/30 transition-colors pointer-events-none" />

          {isImage && (
            <div className="flex-1 flex items-center justify-center p-6 w-full h-full bg-slate-950/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={details.title}
                className="max-h-full max-w-full object-contain rounded-xl shadow-lg ring-1 ring-white/10"
              />
            </div>
          )}
          {isPdf && (
            <div className="flex-1 w-full h-full bg-slate-950/50">
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title={details.title}
              />
            </div>
          )}
          {isVideo && (
            <div className="flex-1 flex items-center justify-center p-6 w-full h-full bg-slate-950/50">
              <video
                src={previewUrl}
                controls
                className="max-h-full max-w-full rounded-xl shadow-lg ring-1 ring-white/10"
              />
            </div>
          )}
          {!isImage && !isPdf && !isVideo && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 w-full h-full bg-slate-950/50 text-center">
                <div className="w-20 h-20 rounded-3xl bg-slate-800/80 border border-white/5 flex items-center justify-center shadow-sm mb-6">
                    <HiOutlineDocumentText className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-200 mb-2">No Preview Available</h3>
                <p className="text-slate-500 text-sm max-w-xs">
                    This file type ({details.fileType.split("/")[1] || 'unknown'}) cannot be previewed in the browser. Please download it to view.
                </p>
            </div>
          )}
        </div>

        {/* Right column: Info & Actions */}
        <div className="md:w-1/3 flex flex-col gap-6">
            <div className="backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col flex-1">
                
                <div className="mb-6 flex-1">
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400 mb-3">{details.title}</h1>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {details.description || "No description provided."}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mb-8 p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <HiOutlineUser className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Shared By</span>
                      <span className="text-sm font-medium text-slate-200">{details.owner}</span>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-white/5" />

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <HiOutlineDatabase className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">File Size</span>
                      <span className="text-sm font-medium text-slate-200">{(details.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={downloadUrl}
                    download={details.title}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-sm font-bold uppercase tracking-wide transition-all shadow-[0_4px_20px_-5px_rgba(16,185,129,0.4)] hover:scale-[1.02]"
                  >
                    <HiOutlineDownload className="w-5 h-5" />
                    Secure Download
                  </a>
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5 hover:border-slate-500/50 text-sm font-bold uppercase tracking-wide transition-all"
                  >
                    <HiOutlineEye className="w-5 h-5" />
                    Open in New Tab
                  </a>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
