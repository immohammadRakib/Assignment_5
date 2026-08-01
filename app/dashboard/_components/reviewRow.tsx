"use client";

import { useState } from "react";
import {
  Star,
  Trash2,
  Eye,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { deleteReviewAction } from "../../(publicGroup)/_actions/tenantAction";

export default function ReviewRow({
  review,
  index,
}: {
  review: any;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this review?"))
      return;

    setIsDeleting(true);
    const result = await deleteReviewAction(review.id || review._id);

    if (result?.success) {
      toast.success("Review deleted successfully.");
      window.location.reload();
    } else {
      toast.error(result?.message || "Failed to delete review.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <tr className="hover:bg-neutral-50/40 transition-colors border-b border-neutral-100">
        <td className="p-4">
          <div className="flex items-center gap-1">
            {[...Array()].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-neutral-200"}`}
              />
            ))}
          </div>
        </td>
        <td className="p-4">
          <p className="text-gray-900 font-bold line-clamp-1 text-sm">
            {review.property?.title || "Property Stay"}
          </p>
        </td>
        <td className="p-4">
          <p className="text-neutral-500 text-xs truncate max-w-[px]">
            {review.comment}
          </p>
        </td>
        <td className="p-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-xl border border-neutral-200/50 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl border border-rose-100 cursor-pointer disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </td>
      </tr>

      {isOpen && (
        <tr>
          <td
            colSpan={4}
            className="p-6 bg-neutral-50/50 border-b border-neutral-100 animate-fadeIn"
          >
            <div className="bg-white border border-neutral-200/60 p-5 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-500" /> Full
                  Testimonial
                </h4>
                <span className="text-[px] font-bold text-neutral-400 font-mono">
                  ID: {review.id || review._id}
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed italic font-medium italic">
                "{review.comment}"
              </p>
              <div className="pt-2 flex items-center gap-4 text-[px] font-bold text-neutral-400 uppercase">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1 text-emerald-600">
                  <ShieldCheck className="w-3 h-3" /> Verified Resident
                </span>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
