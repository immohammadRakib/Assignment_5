// "use client";

// import { useEffect, useState } from "react";
// import { getIncomingRequests, updateRequestStatus } from "../../_actions/landlordAction";
// import { toast } from "sonner";
// import { Check, X, Clock } from "lucide-react";

// export default function IncomingRequestsPage() {
//   const [requests, setRequests] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadData() {
//       const res = await getIncomingRequests();
//       setRequests(Array.isArray(res) ? res : res?.data || []);
//       setLoading(false);
//     }
//     loadData();
//   }, []);

//   const handleAction = async (id: string, status: "CONFIRMED" | "REJECTED") => {
//     const res = await updateRequestStatus(id, status);
//     if (res?.success || res?._id || res?.id) {
//       toast.success(`Request ${status.toLowerCase()} successfully!`);
//       setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
//     } else {
//       toast.error("Failed to update process.");
//     }
//   };

//   if (loading) return <div className="text-center py-20 text-sm text-neutral-500">Loading dynamic requests pipeline...</div>;

//   return (
//     <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
//       <div>
//         <h1 className="text-xl font-black text-gray-900">Incoming Tenant Applications</h1>
//         <p className="text-xs text-neutral-500">Review, lock-in bookings, or decline rent queries.</p>
//       </div>

//       {requests.length === 0 ? (
//         <div className="text-center py-16 border border-dashed rounded-2xl text-neutral-400 text-sm">
//           No external tenant requests linked to your dashboard.
//         </div>
//       ) : (
//         <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-neutral-50 border-b border-neutral-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
//                 <th className="p-4">Property</th>
//                 <th className="p-4">Tenant ID / Details</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-neutral-100 text-sm text-gray-700">
//               {requests.map((req) => (
//                 <tr key={req._id} className="hover:bg-neutral-50/50 transition-colors">
//                   <td className="p-4 font-semibold text-gray-900">{req.propertyTitle || req.propertyId || "Studio Asset"}</td>
//                   <td className="p-4 text-xs font-mono text-gray-500">{req.tenantId || "User Reference"}</td>
//                   <td className="p-4">
//                     <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
//                       req.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-600" :
//                       req.status === "REJECTED" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
//                     }`}>
//                       {req.status === "PENDING" && <Clock className="w-3 h-3" />}
//                       {req.status}
//                     </span>
//                   </td>
//                   <td className="p-4 text-right">
//                     {req.status === "PENDING" && (
//                       <div className="flex justify-end gap-2">
//                         <button onClick={() => handleAction(req._id, "CONFIRMED")} className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors">
//                           <Check className="w-4 h-4" />
//                         </button>
//                         <button onClick={() => handleAction(req._id, "REJECTED")} className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors">
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { getIncomingRequests, updateRequestStatus } from "../../_actions/landlordAction";
import { toast } from "sonner";
import { Check, X, Clock, User, Home, Calendar } from "lucide-react";

export default function LandlordRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // এপিআই থেকে ডেটা ফেচ করার ফাংশন
  async function loadRequests() {
    setLoading(true);
    const res = await getIncomingRequests();
    // নাল বা ক্র্যাশ প্রোটেকশন চেক
    setRequests(Array.isArray(res) ? res : res?.data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadRequests();
  }, []);

  // স্ট্যাটাস চেঞ্জ হ্যান্ডেলার (CONFIRMED / REJECTED)
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const originalRequests = [...requests];
    
    // অপটিমিস্টিক UI আপডেট (ইউজার এক্সপেরিয়েন্স ফাস্ট করার জন্য)
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
    );

    const result = await updateRequestStatus(id, newStatus);

    if (result && result.success !== false) {
      toast.success(`Application status updated to ${newStatus}!`);
      loadRequests(); // ফাইনাল স্টেট সিঙ্ক
    } else {
      toast.error(result?.message || "Failed to update status on backend.");
      setRequests(originalRequests); // এরর হলে আগের স্টেটে ব্যাক করবে
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-sm text-neutral-500 font-medium animate-pulse">
        Fetching incoming tenant applications from Render Engine...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">Incoming Rental Requests</h1>
        <p className="text-xs text-neutral-500">Manage tenant lease requests and lock booking confirmations.</p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-2xl text-neutral-400 text-sm">
          No rental requests received yet. Active listings are broadcasting live.
        </div>
      ) : (
        <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-50 text-neutral-500 text-xs font-bold uppercase tracking-wider border-b border-neutral-100">
                  <th className="p-4">Property / Asset</th>
                  <th className="p-4">Tenant Info</th>
                  <th className="p-4">Duration & Rent</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 text-neutral-700">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-neutral-50/50 transition-colors">
                    {/* Property info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100">
                          <img 
                            src={req.propertyId?.images?.[0] || "https://unsplash.com"} 
                            alt="property" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{req.propertyId?.title || "Unknown Asset"}</p>
                          <p className="text-[11px] text-neutral-400 flex items-center gap-0.5">
                            <Home className="w-3 h-3" /> ৳{req.propertyId?.pricePerDay || 0}/day
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Tenant Info */}
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-gray-900 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-neutral-400" />
                          {req.userId?.name || "Regular Tenant"}
                        </p>
                        <p className="text-xs text-neutral-400">{req.userId?.email || "tenant@email.com"}</p>
                      </div>
                    </td>

                    {/* Lease Range & Rental price */}
                    <td className="p-4">
                      <div className="space-y-0.5 text-xs">
                        <p className="text-neutral-600 flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                          {req.startDate ? new Date(req.startDate).toLocaleDateString() : "N/A"} - {req.endDate ? new Date(req.endDate).toLocaleDateString() : "N/A"}
                        </p>
                        <p className="font-black text-gray-900">Total: ৳{req.totalPrice || 0}</p>
                      </div>
                    </td>

                    {/* Dynamic Badges */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg border uppercase tracking-wider ${
                        req.status === "CONFIRMED" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : req.status === "REJECTED" 
                          ? "bg-rose-50 text-rose-700 border-rose-100" 
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        {req.status === "PENDING" && <Clock className="w-3 h-3 animate-spin text-amber-500" />}
                        {req.status || "PENDING"}
                      </span>
                    </td>

                    {/* Control Buttons */}
                    <td className="p-4 text-right">
                      {req.status === "PENDING" ? (
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => handleStatusUpdate(req._id, "CONFIRMED")}
                            className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-all shadow-xs"
                            title="Approve Lease"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(req._id, "REJECTED")}
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all shadow-xs"
                            title="Decline Lease"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-neutral-400 italic font-medium">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
