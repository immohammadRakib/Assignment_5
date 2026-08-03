"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

interface ReviewActionButtonProps {
  pID: string;
  bID: string;
  status: string;
}

export function ReviewActionButton({
  pID,
  bID,
  status,
}: ReviewActionButtonProps) {
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkReviewStatus() {
      try {
        const API_BASE = "https://assignment-4-vnjw.onrender.com";
        const res = await fetch(`${API_BASE}/api/reviews/property/${pID}`, {
          cache: "no-store",
        });

        if (res.ok) {
          const result = await res.json();
          const reviewsList = result?.data || [];

          const hasMatch = reviewsList.some((review: any) => {
            if (!review) return false;
            const reviewBookingId =
              review.bookingId ||
              review.booking ||
              review.booking?._id ||
              review.booking?.id;
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

  if (
    !["success", "valid", "paid", "active", "completed"].includes(
      status.toLowerCase(),
    )
  ) {
    return null;
  }

  if (loading) {
    return (
      <div className="w-24 h-8 bg-slate-100 animate-pulse rounded-xl ml-auto" />
    );
  }

  if (isAlreadyReviewed) {
    return (
      <div className="bg-slate-50 text-slate-400 font-bold text-xs px-4 py-2 rounded-xl ml-auto flex items-center gap-1 border border-slate-200/60 cursor-not-allowed select-none inline-flex">
        <span>Completed</span>
      </div>
    );
  }

  return (
    <Link
      href={`/dashboard/tenant/reviews/write?propertyId=${pID}&bookingId=${bID}`}
    >
      <button className="bg-gray-950 hover:bg-black text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer transition active:scale-95 shadow-sm ml-auto flex items-center gap-1">
        Leave Review <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
      </button>
    </Link>
  );
}
