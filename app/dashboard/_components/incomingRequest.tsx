"use client";

import { useOptimistic, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateRequestStatus } from "../_actions/landlordAction";
import { Home, User, Calendar, DollarSign, Clock } from "lucide-react";

const badgeStyles = {
  PENDING: "bg-amber-50 border-amber-200 text-amber-700",
  CONFIRMED: "bg-emerald-50 border-emerald-200 text-emerald-700",
  REJECTED: "bg-rose-50 border-rose-200 text-rose-700",
  ACTIVE: "bg-blue-50 border-blue-200 text-blue-700",
  COMPLETED: "bg-neutral-100 border-neutral-200 text-neutral-600",
};

export function IncomingRequestsList({
  initialRequests,
}: {
  initialRequests: any[];
}) {
  const [optimisticRequests, setOptimisticRequests] = useOptimistic(
    initialRequests,
    (state, update: { id: string; newStatus: "CONFIRMED" | "REJECTED" }) =>
      state.map((req) =>
        req.id === update.id || req._id === update.id
          ? { ...req, status: update.newStatus }
          : req,
      ),
  );

  const handleAction = async (id: string, action: "CONFIRMED" | "REJECTED") => {
    if (!id) {
      toast.error(
        "Error: Action execution failed due to missing request identifier.",
      );
      return;
    }

    startTransition(() => {
      setOptimisticRequests({ id, newStatus: action });
    });

    try {
      const data = await updateRequestStatus(id, action);

      if (data && data.success !== false) {
        toast.success(
          `Lease request successfully ${action === "CONFIRMED" ? "Confirmed and Secured" : "Rejected"}!`,
        );
      } else {
        toast.error(
          data?.message || "Render gateway rejected status alteration.",
        );
        window.location.reload();
      }
    } catch (error) {
      console.error("Action gateway sync error:", error);
      toast.error(
        "Network synchronization failed. Rolling back optimistic view.",
      );
      window.location.reload();
    }
  };

  if (!optimisticRequests || optimisticRequests.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed rounded-xl text-neutral-400 text-sm bg-neutral-50/30">
        No incoming tenant applications found. Active listings are broadcasting
        live.
      </div>
    );
  }

  return (
    <div className="border border-neutral-100 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-100 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
              <th className="p-4">Property / Asset</th>
              <th className="p-4">Tenant Name</th>
              <th className="p-4">Duration & Rent</th>
              <th className="p-4">Lease Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50 font-medium">
            {optimisticRequests.map((request, index) => (
              <tr
                key={request.id || request._id || index}
                className="hover:bg-neutral-50/40 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-neutral-50 border border-neutral-100 text-neutral-400">
                      <Home className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 line-clamp-1">
                        {request.property?.title || "Live Rental Unit"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-700">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <div>
                      <p className="text-gray-900 font-bold">
                        {request.tenant?.name || "Verified Tenant"}
                      </p>
                      <p className="text-[11px] text-neutral-400 font-normal">
                        {request.tenant?.email || "tenant@email.com"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="space-y-0.5 text-xs text-neutral-600">
                    <p className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      {request.startDate
                        ? new Date(request.startDate).toLocaleDateString()
                        : "N/A"}{" "}
                      -{" "}
                      {request.endDate
                        ? new Date(request.endDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p className="font-black text-gray-900 flex items-center text-sm">
                      ৳{request.totalPrice || 0}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black border uppercase tracking-wider inline-flex items-center gap-1 ${badgeStyles[request.status as keyof typeof badgeStyles] || badgeStyles.PENDING}`}
                  >
                    {request.status === "PENDING" && (
                      <Clock className="w-3 h-3 animate-spin text-amber-500" />
                    )}
                    {request.status}
                  </span>
                </td>

                <td className="p-4 text-right">
                  {request.status === "PENDING" ? (
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={() =>
                          handleAction(request.id || request._id, "CONFIRMED")
                        }
                        size="sm"
                        className="bg-neutral-900 hover:bg-black text-white text-xs h-8 rounded-lg cursor-pointer font-bold px-3 shadow-xs"
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={() =>
                          handleAction(request.id || request._id, "REJECTED")
                        }
                        size="sm"
                        variant="outline"
                        className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs h-8 rounded-lg cursor-pointer font-bold px-3 shadow-xs"
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-neutral-400 italic font-medium bg-neutral-50 px-2.5 py-1 rounded-md">
                      Processed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
