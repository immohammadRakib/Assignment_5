// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Star } from "lucide-react";

// interface ReviewActionButtonProps {
//   pID: string; // Property ID
//   bID: string; // Booking ID
//   status: string; // Booking Status
// }

// export function ReviewActionButton({ pID, bID, status }: ReviewActionButtonProps) {
//   const [isAlreadyReviewed, setIsAlreadyReviewed] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 📡 বুকিং আইডি দিয়ে ডাটাবেসে রিভিউ চেক করার লজিক
//     async function checkReviewStatus() {
//       try {
//         const API_BASE = 'https://assignment-4-vnjw.onrender.com';
//         // আপনার ব্যাকএন্ডের রিভিউ এপিআই-তে হিট করে এই প্রপার্টির সব রিভিউ আনা হচ্ছে
//         const res = await fetch(`${API_BASE}/api/reviews/property/${pID}`, { cache: "no-store" });
        
//         if (res.ok) {
//           const result = await res.json();
//           const reviewsList = result?.data || [];
          
//           // 🔍 [ম্যাজিক লজিক] সংগৃহীত সব রিভিউর মধ্যে এই নির্দিষ্ট bookingId ম্যাচ করে কি না তা চেক করা
//           const hasMatch = reviewsList.some((review: any) => review.bookingId === bID || review.booking === bID);
//           setIsAlreadyReviewed(hasMatch);
//         }
//       } catch (error) {
//         console.error("Error checking review mapping:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (bID && pID) {
//       checkReviewStatus();
//     }
//   }, [bID, pID]);

//   // যদি স্ট্যাটাস ম্যাচ না করে, তবে কোনো বাটন দেখাবে না
//   if (!["success", "valid", "paid", "active", "completed"].includes(status?.toLowerCase())) {
//     return null;
//   }

//   // ডেটা চেক করার সময় ছোট একটি লোডিং প্লেসহোল্ডার
//   if (loading) {
//     return <div className="w-28 h-8 bg-slate-100 animate-pulse rounded-xl ml-auto" />;
//   }

//   // ✅ যদি অলরেডি এই বুকিং স্লটের রিভিউ দেওয়া হয়ে থাকে: "Completed" দেখাবে
//   if (isAlreadyReviewed) {
//     return (
//       <div className="bg-slate-100 text-slate-500 font-bold text-xs px-4 py-2 rounded-xl ml-auto flex items-center gap-1 border border-slate-200 cursor-not-allowed select-none">
//         <span>Completed</span>
//       </div>
//     );
//   }

//   // 📝 যদি রিভিউ না দেওয়া থাকে: মেইন "Leave Review" বাটন দেখাবে
//   return (
//     <Link href={`/dashboard/tenant/reviews/write?propertyId=${pID}&bookingId=${bID}`}>
//       <button className="bg-gray-950 hover:bg-black text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer transition active:scale-95 shadow-sm ml-auto flex items-center gap-1">
//         Leave Review{" "}
//         <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
//       </button>
//     </Link>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

interface ReviewActionButtonProps {
  pID: string;
  bID: string;
  status: string;
}

export function ReviewActionButton({ pID, bID, status }: ReviewActionButtonProps) {
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkReviewStatus() {
      try {
        const API_BASE = 'https://assignment-4-vnjw.onrender.com';
        // 📡 তোর ব্যাকএন্ডের এপিআই কুয়েরি মেরে এই প্রপার্টির সব রিভিউ আনা হচ্ছে
        const res = await fetch(`${API_BASE}/api/reviews/property/${pID}`, { cache: "no-store" });
        
        if (res.ok) {
          const result = await res.json();
          const reviewsList = result?.data || [];
          
          // 🔍 [তোর রিকোয়ারমেন্ট লজিক] সব রিভিউর মধ্যে এই নির্দিষ্ট bookingId (bID) ম্যাচ করে কি না
          const hasMatch = reviewsList.some((review: any) => {
            if (!review) return false;
            const reviewBookingId = review.bookingId || review.booking || review.booking?._id || review.booking?.id;
            return reviewBookingId === bID;
          });

          setIsAlreadyReviewed(hasMatch);
        }
      } catch (error) {
        console.error("Error checking review mapping:", error);
      } finally {
        setLoading(false);
      }
    }

    if (bID && pID) {
      checkReviewStatus();
    }
  }, [bID, pID]);

  // পেমেন্ট সফল বা কমপ্লিট হলে এই কন্ডিশনে ঢুকবে
  if (!["success", "valid", "paid", "active", "completed"].includes(status.toLowerCase())) {
    return null;
  }

  if (loading) {
    return <div className="w-24 h-8 bg-slate-100 animate-pulse rounded-xl ml-auto" />;
  }

  // ✅ যদি এই বুকিং স্লটের রিভিউ অলরেডি ডাটাবেসে থাকে: "Completed" দেখাবে
  if (isAlreadyReviewed) {
    return (
      <div className="bg-slate-50 text-slate-400 font-bold text-xs px-4 py-2 rounded-xl ml-auto flex items-center gap-1 border border-slate-200/60 cursor-not-allowed select-none inline-flex">
        <span>Completed</span>
      </div>
    );
  }

  // 📝 যদি রিভিউ না দেওয়া থাকে: মেইন বাটন দেখাবে
  return (
    <Link href={`/dashboard/tenant/reviews/write?propertyId=${pID}&bookingId=${bID}`}>
      <button className="bg-gray-950 hover:bg-black text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer transition active:scale-95 shadow-sm ml-auto flex items-center gap-1">
        Leave Review <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
      </button>
    </Link>
  );
}
