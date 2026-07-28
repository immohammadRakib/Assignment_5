"use client";

import { useOptimistic, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// রিকোয়ারমেন্ট অনুযায়ী ব্যাজ কালার কনফিগারেশন
const badgeStyles = {
  PENDING: "bg-amber-50 border-amber-200 text-amber-700",
  APPROVED: "bg-blue-50 border-blue-200 text-blue-700",
  REJECTED: "bg-rose-50 border-rose-200 text-rose-700",
  ACTIVE: "bg-emerald-50 border-emerald-200 text-emerald-700",
  COMPLETED: "bg-neutral-100 border-neutral-200 text-neutral-600"
};

export function IncomingRequestsList({ initialRequests }: { initialRequests: any[] }) {
  
  // 🎯 Next.js 15+ এর useOptimistic হুক—যা পেজ রিফ্রেশ ছাড়া ইনস্ট্যান্ট UI চেঞ্জ করবে
  const [optimisticRequests, setOptimisticRequests] = useOptimistic(
    initialRequests,
    (state, update: { id: string; newStatus: "APPROVED" | "REJECTED" }) =>
      state.map((req) =>
        req._id === update.id ? { ...req, status: update.newStatus } : req
      )
  );

  const handleAction = async (id: string, action: "APPROVED" | "REJECTED") => {
    // ১. ব্যাকএন্ড এপিআই রেসপন্স আসার আগেই UI ইনস্ট্যান্ট আপডেট করে দেওয়া হবে
    startTransition(() => {
      setOptimisticRequests({ id, newStatus: action });
    });

    try {
      // ২. ব্যাকএন্ড সার্ভার অ্যাকশন বা এপিআই কল (তোমার রিয়েল এপিআই পাথ দিয়ে আপডেট করতে পারো)
      const res = await fetch(`/api/landlord/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(`Request successfully ${action.toLowerCase()}!`);
      } else {
        toast.error(data.message || "Failed to update status on server.");
      }
    } catch (error) {
      console.error("Action error:", error);
      toast.error("Network error. Optimistic state reverted.");
    }
  };

  if (!optimisticRequests || optimisticRequests.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-muted-foreground border border-dashed rounded-xl bg-neutral-50/50">
        No incoming rental requests found.
      </div>
    );
  }

  return (
    <div className="border border-neutral-100 rounded-xl overflow-hidden bg-white shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-neutral-50 border-b border-neutral-100 text-gray-500 font-semibold">
            <th className="p-4">Property</th>
            <th className="p-4">Tenant Name</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-50">
          {optimisticRequests.map((request) => (
            <tr key={request._id} className="hover:bg-neutral-50/40 transition-colors">
              <td className="p-4 font-semibold text-gray-900">{request.propertyName || "Villa"}</td>
              <td className="p-4 text-gray-500">{request.tenantName || "User"}</td>
              <td className="p-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyles[request.status as keyof typeof badgeStyles] || badgeStyles.PENDING}`}>
                  {request.status}
                </span>
              </td>
              <td className="p-4 text-right">
                {request.status === "PENDING" ? (
                  <div className="flex items-center justify-end gap-2">
                    <Button onClick={() => handleAction(request._id, "APPROVED")} size="sm" className="bg-gray-900 hover:bg-black text-white text-xs h-8 rounded-lg cursor-pointer">
                      Approve
                    </Button>
                    <Button onClick={() => handleAction(request._id, "REJECTED")} size="sm" variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs h-8 rounded-lg cursor-pointer">
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs text-neutral-400 italic">No actions available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
