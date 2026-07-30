"use client";

import { useEffect, useState } from "react";
import { getIncomingRequests, updateRequestStatus } from "../../_actions/landlordAction";
import { toast } from "sonner";
import { Check, X, Clock, User, Home, Calendar } from "lucide-react";

export default function LandlordRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // এপিআই থেকে ডাইনামিক ডাটা ফেচ করার ফাংশন
  async function loadRequests() {
    setLoading(true);
    try {
      const res = await getIncomingRequests();
      console.log("Incoming Requests Page Raw Output:", res);
      
      // ব্যাকএন্ড যেভাবে বা যে অবজেক্টের ভেতরেই অ্যারে পাঠাক, এটি পারফেক্টলি ফিল্টার করবে
    //   if (Array.isArray(res)) {
    //     setProperties(res); // directly array or empty
    //   } else if (res && Array.isArray(res.data)) {
    //     setRequests(res.data);
    //   } else if (res && res.data && Array.isArray(res.data.data)) {
    //     setRequests(res.data.data);
    //   } else {
    //     setRequests([]);
    //   }

    if (Array.isArray(res)) {
  setRequests(res); // এখানে আগে ভুল নাম ছিল
} else if (res && Array.isArray(res.data)) {
  setRequests(res.data);
} else if (res && res.data && Array.isArray(res.data.data)) {
  setRequests(res.data.data);
} else {
  setRequests([]);
}
    } catch (err) {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    if (!id) {
      toast.error("Error: Application ID is missing or invalid.");
      return;
    }
    const originalRequests = [...requests];

    // অপটিমিস্টিক UI আপডেট (ইউজার আইডি বা আন্ডারস্কোর আইডি দুইটাই নিখুঁতভাবে সিঙ্ক করবে)
    setRequests((prev) =>
      prev.map((req) => (req._id === id || req.id === id ? { ...req, status: newStatus } : req))
    );

    const result = await updateRequestStatus(id, newStatus);

    if (result && result.success !== false) {
      toast.success(`Application status updated to ${newStatus}!`);
      loadRequests(); // ফাইনাল রিয়াল ডাটা রিলোডিং চেইন
    } else {
      toast.error(result?.message || "Failed to update status on backend.");
      setRequests(originalRequests); // এরর হলে ওল্ড স্টেটে ব্যাক করবে
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
        <p className="text-xs text-neutral-500">Manage tenant lease requests and lock booking confirmations with live database sync.</p>
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
                {requests.map((req, index) => (
                  // 🚀 ইউনিক কি-এরর এর ফাইনাল ফিক্স
                  <tr key={req.id || req._id || index} className="hover:bg-neutral-50/50 transition-colors">
                    
                    {/* ১. এপিআই থেকে আসল প্রপার্টি টাইটেল ও ইমেজ */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100">
                          <img 
  src={(req.property?.images && req.property.images.length > 0) ? req.property.images : "https://unsplash.com"} 
  alt="property" 
  className="w-full h-full object-cover" 
/>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">
                            {req.property?.title || "Real Estate Asset"}
                          </p>
                          <p className="text-[px] text-neutral-400 flex items-center gap-0.5">
                            <Home className="w-3 h-3" /> ৳{req.property?.pricePerDay || 0}/day
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* ২. এপিআই থেকে আসল টেন্যান্টের নাম ও ইমেইল */}
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-gray-900 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-neutral-400" /> 
                          {req.tenant?.name || "Verified Tenant"}
                        </p>
                        <p className="text-xs text-neutral-400">{req.tenant?.email || "tenant@email.com"}</p>
                      </div>
                    </td>

                    {/* ৩. এপিআই থেকে রিয়াল বুকিং ডিউরেশন ও আসল টাকা */}
                    <td className="p-4">
                      <div className="space-y-0.5 text-xs">
                        <p className="text-neutral-600 flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500" /> 
                          {req.startDate ? new Date(req.startDate).toLocaleDateString() : "N/A"} - {req.endDate ? new Date(req.endDate).toLocaleDateString() : "N/A"}
                        </p>
                        <p className="font-black text-gray-900">Total: ৳{req.totalPrice || 0}</p>
                      </div>
                    </td>

                    {/* ৪. ডাইনামিক স্ট্যাটাস ব্যাজ */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[px] font-bold rounded-lg border uppercase tracking-wider ${ 
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

                    {/* ৫. একশন বাটন কন্ট্রোলার (Approve / Reject) */}
                    <td className="p-4 text-right">
                      {req.status === "PENDING" ? (
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => handleStatusUpdate(req.id || req._id, "CONFIRMED")} 
                            className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-all shadow-xs border border-emerald-100/50" 
                            title="Approve Lease" 
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(req.id || req._id, "REJECTED")} 
                            className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-all shadow-xs border border-rose-100/50" 
                            title="Decline Lease" 
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-neutral-400 italic font-medium bg-neutral-50 px-2 py-1 rounded-md">Processed</span>
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
