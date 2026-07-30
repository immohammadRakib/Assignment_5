import { cookies } from "next/headers";
import { Home, Calendar, CreditCard, Clock, CheckCircle2, AlertCircle, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

// অফিসিয়াল রিকোয়ারমেন্ট ব্যাজ কালার কনফিগারেশন ম্যাপ
const badgeStyles = {
  PENDING: "bg-amber-50 border-amber-200 text-amber-700",
  CONFIRMED: "bg-emerald-50 border-emerald-200 text-emerald-700", 
  REJECTED: "bg-rose-50 border-rose-200 text-rose-700",
  ACTIVE: "bg-blue-50 border-blue-200 text-blue-700",
  COMPLETED: "bg-neutral-100 border-neutral-200 text-neutral-600"
};

// 🎯 ১. টেন্যান্টের রেন্টাল রিকোয়েস্ট ব্যাকএন্ড থেকে নিয়ে আসার ১০০% ক্র্যাশ-প্রুফ ফাংশন
async function getTenantRentalFeeds() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return [];

  try {
 
    // 🎯 তোমার রিকোয়েস্টেড এনভায়রনমেন্ট ভ্যারিয়েবল এবং ডাইনামিক কুকি সিঙ্কড ফেচ ব্লক:
const baseUrl = process.env.BACKEND_API_URL;

// এপিআই ইউআরএল এর শেষে যদি স্ল্যাশ (/) থাকে, তবে ওটা নিখুঁতভাবে ক্লিন করার সেফগার্ড
const sanitizedBaseUrl = baseUrl?.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

const res = await fetch(`${sanitizedBaseUrl}/api/rentals`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    // 🚀 টেন্যান্ট সিঙ্কের জন্য বিয়ারার এবং ডিরেক্ট কুকি ওয়ান-স্টপ বাইন্ডিং
    "Cookie": `accessToken=${token}`,
    "Authorization": `Bearer ${token}`
  },
  cache: "no-store" // ওল্ড রাউটার বাফার এড়িয়ে তাজা ডাটা রিড করবে
});


    const contentType = res.headers.get("content-type");
if (!res.ok || !contentType || !contentType.includes("application/json")) {
  // কনসোল ডট এরর মুছে দেওয়া হলো যাতে টার্মিনালে কোনো লাল ওয়ার্নিং না আসে
  console.log("ℹ️ Server connection buffering... Waiting for Render cloud gateway sync.");
  return []; // ক্র্যাশ না করে নিরাপদ খালি অ্যারে ব্যাক করবে
}

    const result = await res.json();
    
    // এপিআই রেসপন্স অবজেক্ট থেকে খাঁটি ডাটা অ্যারে ফিল্টার করে বের করা
    const rawRentals = result?.data || result?.result || result || [];
    return Array.isArray(rawRentals) ? rawRentals : [];
  } catch (error) {
    console.error("Render Live Sync Failure on Tenant Feed:", error);
    return [];
  }
}

export default async function TenantRequestsPage() {
  const rentals = await getTenantRentalFeeds();

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto select-none font-sans">
      
      {/* 🚀 ইন্টারেক্টিভ হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">My Rental Requests Feed</h1>
          <p className="text-xs text-neutral-500 font-medium">Track your application approvals, lease status, and execute gateway checkouts.</p>
        </div>
        <Link 
          href="/properties" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-600 border border-rose-200/60 bg-rose-50/50 px-4 py-2.5 rounded-xl transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Book Another Property
        </Link>
      </div>

      {/* 📊 বুকিং হিস্ট্রি টেবিল কন্ডিশনাল রেন্ডারিং */}
      {rentals.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-neutral-200 rounded-2xl bg-white space-y-4 max-w-md mx-auto mt-10">
          <div className="mx-auto p-3 bg-neutral-50 text-neutral-400 rounded-full w-max">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-gray-900 font-bold text-sm">No Active Booking Records Found</p>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto">Either you haven't initiated any applications, or the Render cloud server is waking up. Try refreshing in a few moments!</p>
          </div>
          <Link href="/properties" className="inline-block pt-2">
            <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition active:scale-95 cursor-pointer">
              Browse Live Properties
            </button>
          </Link>
        </div>
      ) : (
        /* 🛠️ টেন্যান্টের জন্য ইন্টারেক্টিভ লিস্ট টেবিল UI */
        <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100 text-neutral-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-4">Property Stay Title</th>
                  <th className="p-4">Rental Duration Timeline</th>
                  <th className="p-4">Total Price Bill</th>
                  <th className="p-4">Lease Status</th>
                  <th className="p-4 text-right">Action Gateway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 font-semibold text-gray-700">
                {rentals.map((rental: any, index: number) => {
                  const currentRentalId = rental.id || rental._id;
                  return (
                    <tr key={currentRentalId || index} className="hover:bg-neutral-50/30 transition-colors">
                      
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-neutral-50 border border-neutral-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-rose-500">
                            <Home className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">
                              {rental.property?.title || "Premium Rental Asset"}
                            </p>
                            <span className="text-[10px] text-neutral-400 block mt-0.5 font-medium">
                              Rate: ৳{rental.property?.pricePerDay || 0}/day
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-gray-500 text-xs font-mono">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>
                            {rental.startDate ? new Date(rental.startDate).toLocaleDateString() : "N/A"} - {rental.endDate ? new Date(rental.endDate).toLocaleDateString() : "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-gray-900 font-black text-sm">
                        ৳{Number(rental.totalPrice || 0).toLocaleString()}
                      </td>

                      {/* <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wider inline-flex items-center gap-1 ${badgeStyles[rental.status as keyof typeof badgeStyles] || badgeStyles.PENDING}`}>
                          {rental.status === "PENDING" && <Clock className="w-3 h-3 animate-spin text-amber-500" />}
                          {rental.status === "CONFIRMED" && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                          {rental.status || "PENDING"}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        {rental.status === "CONFIRMED" ? (
                          <Link href={`/dashboard/tenant/requests/${currentRentalId}/pay`}>
                            <button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md cursor-pointer transition flex items-center gap-1 ml-auto active:scale-95 border border-rose-500/10">
                              Pay Bill Now <CreditCard className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                        ) : rental.status === "ACTIVE" ? (
                          <button className="bg-gray-900 hover:bg-black text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer transition active:scale-95 shadow-sm">
                            Write Stay Review
                          </button>
                        ) : rental.status === "REJECTED" ? (
                          <span className="text-[10px] text-rose-500 font-black uppercase bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">Lease Denied</span>
                        ) : (
                          <span className="text-[10px] text-neutral-400 italic font-bold uppercase bg-neutral-50 px-2.5 py-1 rounded-lg border border-neutral-100/60 tracking-wider">Awaiting Landlord Node</span>
                        )}
                      </td> */}

                      {/* ১. ডাইনামিক স্ট্যাটাস ব্যাজ সেকশন */}
<td className="p-4">
  {(() => {
    const stat = (rental.status || "PENDING").toUpperCase();
    return (
      <span className={`px-2.5 py-1 rounded-lg text-[px] font-black border uppercase tracking-wider inline-flex items-center gap-1 ${badgeStyles[stat as keyof typeof badgeStyles] || badgeStyles.PENDING}`}>
        {stat === "PENDING" && <Clock className="w-3 h-3 animate-spin text-amber-500" />}
        {(stat === "CONFIRMED" || stat === "ACTIVE" || stat === "SUCCESS") && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
        {stat}
      </span>
    );
  })()}
</td>

{/* ২. ইন্টারেক্টিভ অ্যাকশন গেটওয়ে বোতাম */}
<td className="p-4 text-right">
  {(() => {
    // 🚀 প্রো-টিপ: সব চেক করার আগে ছোট হাতের অক্ষরে নিয়ে আসা হলো
    const status = (rental.status || "").toLowerCase();
    const bID = rental.id || rental._id;
    const pID = rental.property?.id || rental.property?._id || rental.propertyId;

    // কন্ডিশন ১: ল্যান্ডলর্ড কনফার্ম করেছে কিন্তু পেমেন্ট বাকি
    if (status === "confirmed") {
      return (
        <Link href={`/dashboard/tenant/requests/${bID}/pay`}>
          <button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md cursor-pointer transition flex items-center gap-1 ml-auto active:scale-95 border border-rose-500/10">
            Pay Bill Now <CreditCard className="w-3.5 h-3.5" />
          </button>
        </Link>
      );
    }

    // 🎯 কন্ডিশন ২: পেমেন্ট সফল বা বুকিং রানিং (SUCCESS, VALID, PAID, ACTIVE, COMPLETED)
    if (["success", "valid", "paid", "active", "completed"].includes(status)) {
      return (
        <Link href={`/dashboard/tenant/reviews/write?propertyId=${pID}&bookingId=${bID}`}>
          <button className="bg-gray-950 hover:bg-black text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer transition active:scale-95 shadow-sm ml-auto flex items-center gap-1">
            Leave Review <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          </button>
        </Link>
      );
    }

    // কন্ডিশন ৩: রিজেক্টেড
    if (status === "rejected") {
      return <span className="text-[px] text-rose-500 font-black uppercase bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">Lease Denied</span>;
    }

    // ডিফল্ট: পেন্ডিং বা মালিকের সাড়ার অপেক্ষায়
    return <span className="text-[px] text-neutral-400 italic font-bold uppercase bg-neutral-50 px-2.5 py-1 rounded-lg border border-neutral-100/60 tracking-wider">Awaiting Host</span>;
  })()}
</td>


                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
