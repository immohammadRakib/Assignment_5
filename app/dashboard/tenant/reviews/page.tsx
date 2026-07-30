import { cookies } from "next/headers";
import { ArrowLeft, MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import ReviewRow from "../../_components/reviewRow";

async function getMyReviews() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return;

  try {
    const baseUrl = process.env.BACKEND_API_URL;
    // এখানে তোমার টেন্যান্টের সব রিভিউ পাওয়ার সঠিক এপিআই পাথটি দিবে
    const res = await fetch(`${baseUrl}/api/reviews`, { 
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 }
    });
    const result = await res.json();
    return result?.data || result || [];
  } catch (err) { return; }
}

// export default async function TenantReviewsListPage() {
//   const reviews = await getMyReviews();

//   return (
//     <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto font-sans">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 pb-5">
//         <div>
//           <h1 className="text-xl font-black text-gray-900 tracking-tight">Manage My Reviews</h1>
//           <p className="text-xs text-neutral-500">View, analyze or delete your submitted stay testimonials.</p>
//         </div>
//         <Link href="/dashboard/tenant/requests" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:bg-neutral-100 px-4 py-2.5 rounded-xl border border-neutral-200 transition-all">
//           <ArrowLeft className="w-3.5 h-3.5" /> Back to Feed
//         </Link>
//       </div>

//       {reviews.length === 0 ? (
//         <div className="text-center py-20 border border-dashed rounded-2xl text-neutral-400 text-sm">
//           You haven't published any reviews yet. Verified stays will appear here.
//         </div>
//       ) : (
//         <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs">
//           <table className="w-full text-left text-sm">
//             <thead className="bg-neutral-50 text-neutral-400 font-bold text-[px] uppercase tracking-wider">
//               <tr>
//                 <th className="p-4">Rating</th>
//                 <th className="p-4">Property</th>
//                 <th className="p-4">Short Preview</th>
//                 <th className="p-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>

// // 🎯 এপিআই রেসপন্স থেকে খাঁটি অ্যারে ফিল্টার করা
// const reviewsData = Array.isArray(reviews) 
//   ? reviews 
//   : (reviews?.data || reviews?.result ||);

// // এখন লুপ চালানোর সময় reviewsData ব্যবহার করো
// <tbody>
//   {reviewsData.map((rev: any, i: number) => (
//     <ReviewRow key={rev.id || rev._id || i} review={rev} index={i} />
//   ))}
// </tbody>


//               {reviews.map((rev: any, i: number) => (
//                 <ReviewRow key={rev.id || rev._id || i} review={rev} index={i} />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


export default async function TenantReviewsListPage() {
  const reviews = await getMyReviews();

  // 🎯 ১. রিভিউ ডাটা ফিল্টার করা (লাল দাগ ভ্যানিশ করার মেইন লজিক)
  const reviewsData = Array.isArray(reviews) 
    ? reviews 
    : (reviews?.data || reviews?.result || []);

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto font-sans">
      {/* হেডার আগের মতোই থাকবে... */}

      {/* ২. কন্ডিশনাল চেক: reviewsData.length ব্যবহার করো */}
      {reviewsData.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-2xl text-neutral-400 text-sm">
          You haven't published any reviews yet. Verified stays will appear here.
        </div>
      ) : (
        <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-400 font-bold text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-4">Rating</th>
                <th className="p-4">Property</th>
                <th className="p-4">Short Preview</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* 🎯 ৩. এখন আর লাল দাগ আসবে না, reviewsData মাখনের মতো কাজ করবে */}
              {reviewsData.map((rev: any, i: number) => (
                <ReviewRow key={rev.id || rev._id || i} review={rev} index={i} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

