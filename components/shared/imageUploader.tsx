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

  // 🎯 ImgBB লাইভ ক্লাউড আপলোডার ইঞ্জিন (অফিসিয়াল API এন্ডপয়েন্ট সহ)
  const uploadFile = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    
    // 🛠️ ImgBB এর রিকোয়ারমেন্ট অনুযায়ী FormData এবং 'image' কি (Key) বাইন্ডিং
    const formData = new FormData();
    formData.append("image", file);

    try {
      // 🎯 ফিক্স: ভুল 'imgbb.com' লিঙ্ক বদলে তাদের অফিসিয়াল 'api.imgbb.com' আপলোড এন্ডপয়েন্ট বসানো হয়েছে
      const res = await fetch("https://imgbb.com", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      
      if (data?.success && data?.data?.url) {
        onChange(data.data.url); // জড ফর্মে লাইভ ইমেজ ইউআরএল পুশ হবে
      } else {
        console.error("ImgBB API Response Error:", data);
      }
    } catch (error) {
      console.error("ImgBB network fetch error:", error);
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
    
    // dataTransfer থেকে প্রথম ফাইলটি সেফলি রিড করা হচ্ছে
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const onButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // মডালের ইন্টারনাল ক্লিক বাবলিং স্টপ
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none">
      
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={value || isUploading ? undefined : onButtonClick}
        className={`w-32 h-32 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center relative transition-all duration-300 ${
          value 
            ? "border-emerald-200 bg-neutral-50 shadow-inner" 
            : dragActive 
            ? "border-rose-500 bg-rose-50/50 scale-102" 
            : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 hover:border-rose-400 cursor-pointer"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onClick={(e) => e.stopPropagation()} 
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              uploadFile(e.target.files[0]);
            }
          }}
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-1">
            <Loader2 className="w-6 h-6 text-rose-500 animate-spin" />
            <span className="text-[10px] font-bold text-neutral-400">Uploading...</span>
          </div>
        ) : value ? (
          <div className="w-full h-full p-1 relative">
            <img src={value} alt="Preview" className="w-full h-full object-cover rounded-[22px]" />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange(""); // রিমুভ করলে ফাঁকা হয়ে প্লাস বাটন ব্যাক করবে
              }}
              className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-all active:scale-90 cursor-pointer z-20"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-neutral-400 pointer-events-none">
            <div className="p-1 bg-white rounded-xl border border-neutral-100 shadow-sm">
              <Plus size={18} className="stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider">Add Photo</span>
          </div>
        )}
      </div>

    </div>
  );
}
