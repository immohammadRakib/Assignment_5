"use client";

import { useState, useRef } from "react";
import { Plus, Loader2, X } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🎯 ImgBB লাইভ ক্লাউড আপলোডার ইঞ্জিন
  const uploadFile = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("https://imgbb.com", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data?.data?.url) {
        onChange(data.data.url); // জড ফর্মে লাইভ ইমেজ ইউআরএল পুশ হবে
      }
    } catch (error) {
      console.error("ImgBB upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // 🛠️ ফিক্স ১: dataTransfer থেকে প্রথম ফাইলটি (index 0) রিড করা নিশ্চিত করা হলো
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none">
      
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => !value && !isUploading && fileInputRef.current?.click()}
        className={`w-32 h-32 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center relative transition-all duration-300 ${
          value 
            ? "border-emerald-200 bg-neutral-50 shadow-inner cursor-default" 
            : dragActive 
            ? "border-rose-500 bg-rose-50/50 scale-102" 
            : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 hover:border-rose-400 hover:scale-[1.01] cursor-pointer"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          // 🛠️ ফিক্স ২: ইনপুট থেকেও প্রথম ফাইলটি সেফলি রিড করা হচ্ছে
          onChange={(e) => e.target.files && e.target.files[0] && uploadFile(e.target.files[0])}
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-1">
            <Loader2 className="w-6 h-6 text-rose-500 animate-spin" />
            <span className="text-[10px] font-bold text-neutral-400">Uploading...</span>
          </div>
        ) : value ? (
          <div className="w-full h-full p-1 relative group">
            <img src={value} alt="Preview" className="w-full h-full object-cover rounded-[22px]" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(""); // রিমুভ করলে ব্ল্যাঙ্ক স্ট্রিং হয়ে প্লাস বাটন ব্যাক করবে
              }}
              className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-all active:scale-90 cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-neutral-400 hover:text-rose-500 transition-colors">
            <div className="p-1 bg-white rounded-xl border border-neutral-100 shadow-sm">
              <Plus size={18} className="stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Add Photo</span>
          </div>
        )}
      </div>

    </div>
  );
}
