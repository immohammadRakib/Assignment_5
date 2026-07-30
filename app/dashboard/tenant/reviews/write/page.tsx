"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Star, MessageSquare, ShieldCheck, Loader2, ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createReviewAction } from "../../../../(publicGroup)/_actions/tenantAction";

export default function WritePropertyReviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 🎯 ১. ইউআরএল প্যারামিটার থেকে রিয়াল প্রপার্টি এবং বুকিং আইডি এক্সট্র্যাক্ট করা
  const propertyId = searchParams.get("propertyId");
  const bookingId = searchParams.get("bookingId");

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>( "");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmitReview = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!propertyId || !bookingId) {
//       toast.error("Validation Error: Missing property or lease reference.");
//       return;
//     }

//     if (!comment.trim()) {
//       toast.error("Please write a small comment sharing your stay experience.");
//       return;
//     }

//     setIsSubmitting(true);

//     // ক্লায়েন্ট সাইড কুকি থেকে সুরক্ষিত এক্সেস টোকেন তুলে আনা
//     const cookiesMap = Object.fromEntries(
//       document.cookie.split("; ").map((c) => {
//         const [key, ...v] = c.split("=");
//         return [key, v.join("=")];
//       })
//     );
//     const token = cookiesMap["accessToken"] || null;

//     if (!token) {
//       toast.error("Session expired. Please log in again.");
//       router.push("/auth/login");
//       return;
//     }

//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://onrender.com";
//       const sanitizedBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
      
//       // 🎯 ২. কার্ল ডকস অনুযায়ী নিখুঁত ক্রিয়েট রিভিউ এন্ডপয়েন্ট পাথ
//       const targetUrl = `${sanitizedBaseUrl}/api/reviews/create`;
//       console.log("🚀 Submitting Real Review to Gateway:", targetUrl);

//       const res = await fetch(targetUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         // কার্ল ডকস কম্যান্ডের হুবহু পেলোড বাইন্ডিং লজিক
//         body: JSON.stringify({
//           propertyId,
//           bookingId,
//           rating: Number(rating),
//           comment: comment.trim()
//         })
//       });

//       const result = await res.json();

//       if (result && result.success !== false) {
//         toast.success("Review submitted successfully! Thank you.");
//         router.push("/dashboard/tenant/requests"); 
//       } else {
//         toast.error(result?.message || "Server gateway rejected review serialization.");
//       }
//     } catch (error) {
//       console.error("Review creation endpoint error:", error);
//       toast.error("Network interface connection failure.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

const handleSubmitReview = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!comment.trim()) { toast.error("Please write a comment!"); return; }

  setIsSubmitting(true);
  try {
    // 🎯 ক্লায়েন্ট ফেচ বাদ দিয়ে সরাসরি সার্ভার অ্যাকশন কল
    const result = await createReviewAction({
      propertyId: propertyId as string,
      bookingId: bookingId as string,
      rating,
      comment: comment.trim()
    });

    if (result?.success) {
      toast.success("Review published successfully!");
      router.push("/dashboard/tenant/requests");
    } else {
      toast.error(result?.message || "Failed to submit review.");
    }
  } catch (error) {
    toast.error("Network error occurred.");
  } finally {
    setIsSubmitting(false);
  }
};


  if (!propertyId || !bookingId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 font-sans select-none">
        <p className="text-neutral-500 font-medium">Invalid review routing parameters context.</p>
        <button type="button" onClick={() => router.back()} className="text-xs font-bold text-rose-500 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Feeds
        </button>
      </div>
    );
  }
  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-neutral-50/50 min-h-[85vh] select-none font-sans">
      <div className="w-full max-w-2xl bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-xl shadow-neutral-200/50 grid grid-cols-1 md:grid-cols-12">
        
        {/* 🎨 বাম পাশ: ব্রান্ডিং ও গাইড প্যানেল */}
        <div className="md:col-span-5 bg-gradient-to-br from-neutral-900 via-neutral-800 to-gray-900 p-6 md:p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl" />
          
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-black text-rose-400 uppercase tracking-widest">
              <MessageSquare className="w-3.5 h-3.5" /> Guest Feedbacks
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight leading-tight">Share Your Stay Review</h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Your verified ratings help build platform trust node metrics. Share transparent insights directly with the host.
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-[11px] font-mono space-y-1.5 text-neutral-400 mt-6 md:mt-0">
            <p className="font-bold text-neutral-300 uppercase tracking-wider text-[9px] pb-1 border-b border-white/5">Metadata Registry</p>
            <p className="truncate">LEASE ID: <span className="text-white font-bold">{bookingId}</span></p>
            <p className="truncate">ASSET ID: <span className="text-rose-400 font-bold">{propertyId}</span></p>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-[10px] font-bold text-neutral-500 tracking-wider uppercase relative z-10 mt-6 md:mt-0">
            <Building2 className="w-3.5 h-3.5" /> RentNest Ecosystem
          </div>
        </div>

        {/* ⭐ ডান পাশ: ইন্টারেক্টিভ স্টার রেটিং ও কমেন্ট ফর্ম */}
        <form onSubmit={handleSubmitReview} className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center space-y-6 bg-white relative">
          
          <div className="space-y-1 border-b border-neutral-100 pb-4">
            <h3 className="text-lg font-black text-gray-900 tracking-tight">Rate Experience</h3>
            <p className="text-xs text-neutral-400">Select star thresholds and compose verified audit testimonials</p>
          </div>

          {/* 🎯 গেম-চেঞ্জার ইন্টারেক্টিভ স্টার রেটিং জোন উইথ হোভার অ্যানিমেশন */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500 block">Overall Score</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isSelected = star <= (hoverRating !== null ? hoverRating : rating);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 rounded-lg transition-all transform active:scale-90 cursor-pointer focus:outline-none"
                  >
                    <Star 
                      className={`w-8 h-8 transition-colors duration-200 ${
                        isSelected 
                          ? "text-amber-400 fill-amber-400 stroke-[1.5]" 
                          : "text-neutral-200 stroke-[1.5]"
                      }`} 
                    />
                  </button>
                );
              })}
              <span className="text-xs font-black bg-amber-50 text-amber-700 px-2.5 py-1 border border-amber-100 rounded-lg ml-2">
                {rating}.0 / 5.0
              </span>
            </div>
          </div>

          {/* টেক্সটআরিয়া কমেন্ট বক্স */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500 block">Review Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="The apartment was amazing! Very clean and excellent service..."
              rows={4}
              maxLength={500}
              className="w-full border border-neutral-200 rounded-2xl p-4 text-sm font-medium text-gray-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all bg-neutral-50/40 resize-none font-sans"
            />
            <div className="text-right text-[10px] text-neutral-400 font-bold font-mono">
              {comment.length} / 500 characters
            </div>
          </div>

          {/* সাবমিট বোতাম কন্ট্রোলার */}
          <div className="space-y-3 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-gray-900 to-neutral-800 hover:from-black hover:to-neutral-900 text-white font-black text-sm rounded-xl shadow-md transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border border-neutral-800"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                  <span className="tracking-wide">Broadcasting Testimonial Payload...</span>
                </>
              ) : (
                <span className="tracking-wide">Publish Verified Review</span>
              )}
            </Button>
            
            <button
              type="button"
              onClick={() => router.back()}
              className="text-xs font-bold text-neutral-400 hover:text-gray-900 transition-colors flex items-center gap-1 justify-center mx-auto cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
              Abort & Return
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] text-emerald-600 font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Cryptographic Review Integrity Crypt-Key Locked</span>
          </div>
        </form>

      </div>
    </div>
  );
}
