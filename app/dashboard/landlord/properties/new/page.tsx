"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "../../../_actions/landlordAction";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, Loader2, X } from "lucide-react";

export default function CreateListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // ইমেজ মোড এবং ফাইনাল ইমেজ URL স্টেট
  const [imageMode, setImageMode] = useState<"upload" | "link">("upload");
  const [imageUrl, setImageUrl] = useState("");

  // ☁️ ImgBB-তে ইমেজ আপলোড করার হ্যান্ডলার
  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    // শুধু ইমেজ ফাইল ভ্যালিডেশন
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // ⚠️ এখানে তোমার নিজের ImgBB API Key বসাবে (ফ্রি অ্যাকাউন্ট খুলে ২ মিনিটে পাওয়া যায়)
      // যদি কী না থাকে, তবে এই ফ্রি ডেমো কী-টি সাময়িক কাজ করবে
      const IMGBB_API_KEY = "6bab8bd4ef72d73189d2d09f7a77d13c"; 
      
      const response = await fetch(`https://imgbb.com{IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded to cloud successfully!");
      } else {
        toast.error("Cloud upload failed. Try manually entering a link.");
      }
    } catch (error) {
      toast.error("Error connecting to upload server.");
    } finally {
      setUploadingImage(false);
    }
  };

  // 🖱️ Drag & Drop হ্যান্ডলারস
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  // 🚀 ফর্ম সাবমিশন হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error("Please upload an image or provide a valid link first!");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      location: formData.get("location"),
      city: formData.get("city"),
      pricePerDay: Number(formData.get("pricePerDay")),
      images: [imageUrl], // আমাদের জেনারেট হওয়া বা ইনপুট দেওয়া লাইভ URL
      categoryId: "cf5d2544-ef0b-446f-b2f4-3553c21c9600",
    };

    const res = await createProperty(payload);
    setLoading(false);

    if (res?.success || res?._id || res?.id) {
      toast.success("Property listed successfully!");
      router.push("/dashboard/landlord/my-properties");
    } else {
      toast.error(res?.message || "Failed to create listing.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <Card className="rounded-2xl border-neutral-100 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-black text-gray-900">Create Smart Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* ১. প্রপার্টি টাইটেল */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Property Title</label>
              <input name="title" required className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-rose-500" placeholder="e.g. Smart Bachelor Studio Apartment" />
            </div>

            {/* ২. ডেসক্রিপশন */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Description</label>
              <textarea name="description" required rows={3} className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-rose-500" placeholder="Describe smart home features, accessibility..." />
            </div>

            {/* ৩. লোকেশন ও সিটি */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Area / Location</label>
                <input name="location" required className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-rose-500" placeholder="e.g. Zindabazar" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">City</label>
                <input name="city" required className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-rose-500" placeholder="e.g. Sylhet" />
              </div>
            </div>

            {/* ৪. প্রাইস */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Price Per Day (৳)</label>
              <input name="pricePerDay" type="number" required className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-rose-500" placeholder="1500" />
            </div>

            {/* 🖼️ ৫. স্মার্ট মিডিয়া আপলোডার জোন (টগল ক্যাটাগরি) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700">Property Showcase Media</label>
                {/* সুইচ বাটন */}
                <div className="flex bg-neutral-100 p-0.5 rounded-lg text-xs font-bold">
                  <button type="button" onClick={() => setImageMode("upload")} className={`px-3 py-1 rounded-md transition-all ${imageMode === "upload" ? "bg-white text-rose-500 shadow-sm" : "text-gray-500"}`}>
                    Drag & Drop
                  </button>
                  <button type="button" onClick={() => setImageMode("link")} className={`px-3 py-1 rounded-md transition-all ${imageMode === "link" ? "bg-white text-rose-500 shadow-sm" : "text-gray-500"}`}>
                    Direct Link
                  </button>
                </div>
              </div>

              {imageMode === "upload" ? (
                <div>
                  {imageUrl ? (
                    /* আপলোড সাকসেস হলে প্রিভিউ দেখাবে */
                    <div className="relative border border-neutral-200 rounded-2xl overflow-hidden group h-40">
                      <img src={imageUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setImageUrl("")} className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    /* ড্রপজোন বক্স */
                    <label onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed border-neutral-200 hover:border-rose-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-neutral-50/50 min-h-40">
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e.target.files?.[0]!)} />
                      {uploadingImage ? (
                        <div className="flex flex-col items-center gap-2 text-rose-500">
                          <Loader2 className="w-8 h-8 animate-spin" />
                          <p className="text-xs font-bold">Uploading to ImgBB Server...</p>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="w-8 h-8 text-neutral-400 group-hover:text-rose-500" />
                          <p className="text-xs font-bold text-gray-700">Drag & drop your property photo here</p>
                          <p className="text-[10px] text-gray-400">or click to browse local files</p>
                        </>
                      )}
                    </label>
                  )}
                </div>
              ) : (
                /* নরমাল ডিরেক্ট লিংক ইনপুট */
                <div className="relative flex items-center">
                  <LinkIcon className="w-4 h-4 text-gray-400 absolute left-4" />
                  <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border border-neutral-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-rose-500" placeholder="https://unsplash.com" />
                </div>
              )}
            </div>

            {/* 🚀 সাবমিট বাটন */}
            <button type="submit" disabled={loading || uploadingImage} className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Publishing Core Code..." : "Launch Listing"}
            </button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
