"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useFileStore } from "@/store/file-store";
import { useToast } from "@/components/Toast";
import FileCard from "@/components/FileCard";
import UploadModal from "@/components/UploadModal";
import { HiOutlinePlus, HiOutlineCloudUpload } from "react-icons/hi";
import type { FileUploadRequest } from "@/types";


export default function DashboardPage() {
  const { isAuthenticated, isHydrated, username } = useAuthStore();

  const { files, upload, update, remove, fetchFiles } = useFileStore();
  const { toast } = useToast();
  const router = useRouter();

  const [uploadOpen, setUploadOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrated) return;
    if (isAuthenticated) {
      fetchFiles();
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router, fetchFiles, isHydrated]);

  if (!isAuthenticated) return null;

  const handleUpload = async (data: FileUploadRequest) => {
    try {
      const res = await upload(data);
      toast(`✨ Successfully uploaded "${res.title}"`, "success");
    } catch {
      toast("Upload failed. File might be too large.", "error");
    }
  };

  const handleUpdate = async (data: FileUploadRequest) => {
    if (!editId) return;
    try {
      const res = await update(editId, data);
      toast(`✨ Updated "${res.title}" successfully`, "success");
      setEditId(null);
    } catch {
      toast("Update failed. Please try again.", "error");
    }
  };

  const handleDelete = async (shareId: string) => {
    try {
      await remove(shareId);
      toast("File moved to trash.", "success");
    } catch {
      toast("Failed to delete file.", "error");
    }
  };

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
      {/* header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6 bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] -z-10 rounded-full group-hover:bg-emerald-500/20 transition-colors duration-700" />
        <div>
          <h1 className="text-3xl font-extrabold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">Vault Dashboard</h1>
          <p className="text-emerald-400 font-medium text-sm flex items-center gap-2">
            Welcome back, {username} <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Managing <span className="text-slate-300 font-semibold">{files.length}</span> secure file{files.length !== 1 && "s"} in your vault
          </p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold transition-all shadow-[0_4px_20px_-5px_rgba(16,185,129,0.4)] hover:scale-105 cursor-pointer uppercase tracking-wider text-xs"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Upload New File
        </button>
      </div>

      {/* empty state */}
      {files.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center mb-8 shadow-inner shadow-slate-950">
            <HiOutlineCloudUpload className="w-12 h-12 text-emerald-500/50" />
          </div>
          <h2 className="text-2xl font-bold text-slate-300 mb-3">
            Your vault is empty
          </h2>
          <p className="text-slate-500 max-w-sm mb-8">
            Upload your first file securely. We encrypt file metadata and handle your storage with care.
          </p>
          <button
            onClick={() => setUploadOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors border border-white/5 hover:border-emerald-500/30 cursor-pointer"
          >
            <HiOutlinePlus className="w-4 h-4 text-emerald-400" />
            Upload File
          </button>
        </div>
      )}

      {/* grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {files.map((f) => (
          <FileCard
            key={f.shareId}
            file={f}
            onDelete={handleDelete}
            onEdit={(id) => setEditId(id)}
          />
        ))}
      </div>

      {/* modals */}
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={handleUpload}
        mode="upload"
      />

      <UploadModal
        open={!!editId}
        onClose={() => setEditId(null)}
        onSubmit={handleUpdate}
        mode="edit"
      />
    </div>
  );
}
