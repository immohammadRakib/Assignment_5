"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Building2,
  DollarSign,
  FileText,
  Send,
  MapPin,
  Link2,
  Image as ImageIcon,
  X,
  UploadCloud,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function EditFormWrapper({ property }: { property: any }) {
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState(property.title || "");
  const [description, setDescription] = useState(property.description || "");
  const [pricePerDay, setPricePerDay] = useState(property.pricePerDay || "");
  const [location, setLocation] = useState(property.location || "");

  const [images, setImages] = useState<string[]>(
    Array.isArray(property.images) ? property.images : [],
  );
  const [imageTab, setImageTab] = useState<"link" | "upload">("link");
  const [linkInput, setLinkInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleAddLink = () => {
    if (linkInput.trim() !== "") {
      setImages((prev) => [...prev, linkInput.trim()]);
      setLinkInput("");
      toast.success("Image URL added to gallery preview.");
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    toast.success("Local assets ingested successfully.");
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("rentnest_token")
        : null;
    const actualPropertyId = params?.id || property.id || property._id;

    if (!actualPropertyId) {
      setError("Error: Runtime parameter [id] scope mapping failed.");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      pricePerDay: Number(pricePerDay),
      isAvailable: property.isAvailable !== false,
      location: location.trim(),
      images: images.length > 0 ? images : ["https://unsplash.com"],
    };

    startTransition(async () => {
      try {
        const res = await fetch(
          `https://assignment-4-vnjw.onrender.com/api/landlord/properties/${actualPropertyId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...(token
                ? {
                    Authorization: token.startsWith("Bearer ")
                      ? token
                      : `Bearer ${token}`,
                  }
                : {}),
            },
            credentials: "include",
            body: JSON.stringify(payload),
          },
        );

        if (res.ok) {
          toast.success("Listing updated successfully on the cloud inventory!");
          router.push("/dashboard/landlord/my-properties");
          router.refresh();
        } else {
          const errRes = await res.json().catch(() => ({}));
          setError(
            errRes?.message ||
              `Server responded with status code ${res.status}`,
          );
        }
      } catch (err) {
        console.error(err);
        setError("Network connection failure or database sync error.");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-150/80 shadow-xl shadow-rose-950/5 space-y-6 max-w-3xl mx-auto animate-pulse text-left">
        <div className="h-4 bg-slate-100 rounded-lg w-1/4" />
        <div className="h-12 bg-slate-150/50 rounded-xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 rounded-lg w-1/3" />
            <div className="h-12 bg-slate-150/50 rounded-xl w-full" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 rounded-lg w-1/3" />
            <div className="h-12 bg-slate-150/50 rounded-xl w-full" />
          </div>
        </div>
        <div className="h-4 bg-slate-100 rounded-lg w-1/5" />
        <div className="h-28 bg-slate-150/50 rounded-xl w-full" />
        <div className="h-12 bg-slate-900/10 rounded-xl w-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-rose-950/5 text-left"
    >
      <form onSubmit={handleUpdateSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-700">
            Property Title
          </label>
          <div className="relative">
            <Building2 className="absolute top-3.5 left-4 size-4 text-slate-400" />
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Luxury 3BHK Apartment with Lake View"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 h-12 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20 focus:border-[#FF385C] transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              Price Per Night (৳)
            </label>
            <div className="relative">
              <DollarSign className="absolute top-3.5 left-4 size-4 text-slate-400" />
              <input
                type="number"
                required
                value={pricePerDay}
                onChange={(e) => setPricePerDay(e.target.value)}
                placeholder="Rate value"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 h-12 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20 focus:border-[#FF385C] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              Detailed Address Location
            </label>
            <div className="relative">
              <MapPin className="absolute top-3.5 left-4 size-4 text-slate-400" />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Block, Road, Area, City"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 h-12 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20 focus:border-[#FF385C] transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-700">
            Space Description
          </label>
          <div className="relative">
            <FileText className="absolute top-3.5 left-4 size-4 text-slate-400" />
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe amenities, facilities, rules, and restrictions..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20 focus:border-[#FF385C] transition-all resize-none"
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                Asset Media Gallery
              </label>
              <p className="text-[11px] font-medium text-slate-400">
                Toggle upload preference for listing thumbnails.
              </p>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/40 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setImageTab("link")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  imageTab === "link"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Link2 className="w-3.5 h-3.5" /> Direct Link
              </button>
              <button
                type="button"
                onClick={() => setImageTab("upload")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  imageTab === "upload"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" /> Drag & Drop
              </button>
            </div>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] bg-white border border-slate-200 rounded-xl overflow-hidden group"
                >
                  <img
                    src={img}
                    alt={`Asset preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all cursor-pointer active:scale-90"
                    >
                      <X className="w-4 h-4 stroke-[2.5px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <AnimatePresence mode="wait">
            {imageTab === "link" ? (
              <motion.div
                key="link-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-2"
              >
                <input
                  type="url"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="Paste direct CDN image URL here (e.g., https://unsplash.com...)"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 h-12 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20 focus:border-[#FF385C] transition-all placeholder:text-slate-400 font-medium"
                />
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="h-12 px-5 bg-slate-900 hover:bg-black text-white text-xs font-black rounded-xl cursor-pointer active:scale-95 transition-all shadow-sm flex items-center justify-center shrink-0"
                >
                  Add Link
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="upload-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFileUpload(e.dataTransfer.files);
                }}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors flex flex-col items-center justify-center gap-2 relative ${
                  isDragging
                    ? "border-[#FF385C] bg-rose-50/20"
                    : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-100 text-[#FF385C]">
                  <UploadCloud className="w-6 h-6 stroke-[2px]" />
                </div>
                <p className="text-sm font-bold text-slate-700">
                  Drag & drop asset pictures here
                </p>
                <p className="text-xs font-medium text-slate-400">
                  or click to browse local storage filesystem (Supports JPG,
                  PNG, WEBP)
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-bold">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-slate-950 hover:bg-black text-white font-black text-sm rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4 stroke-[2.5px]" />
              <span>Update Listing Configuration</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
