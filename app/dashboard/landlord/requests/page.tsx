"use client";

import { useEffect, useState } from "react";
import { getIncomingRequests, updateRequestStatus } from "../../_actions/landlordAction";
import { toast } from "sonner";
import { Check, X, Clock } from "lucide-react";

export default function IncomingRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await getIncomingRequests();
      setRequests(Array.isArray(res) ? res : res?.data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleAction = async (id: string, status: "CONFIRMED" | "REJECTED") => {
    const res = await updateRequestStatus(id, status);
    if (res?.success || res?._id || res?.id) {
      toast.success(`Request ${status.toLowerCase()} successfully!`);
      setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    } else {
      toast.error("Failed to update process.");
    }
  };

  if (loading) return <div className="text-center py-20 text-sm text-neutral-500">Loading dynamic requests pipeline...</div>;

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">Incoming Tenant Applications</h1>
        <p className="text-xs text-neutral-500">Review, lock-in bookings, or decline rent queries.</p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-2xl text-neutral-400 text-sm">
          No external tenant requests linked to your dashboard.
        </div>
      ) : (
        <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Property</th>
                <th className="p-4">Tenant ID / Details</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm text-gray-700">
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900">{req.propertyTitle || req.propertyId || "Studio Asset"}</td>
                  <td className="p-4 text-xs font-mono text-gray-500">{req.tenantId || "User Reference"}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      req.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-600" :
                      req.status === "REJECTED" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      {req.status === "PENDING" && <Clock className="w-3 h-3" />}
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {req.status === "PENDING" && (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleAction(req._id, "CONFIRMED")} className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleAction(req._id, "REJECTED")} className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
