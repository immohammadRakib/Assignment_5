
import { StarIcon, Users, Calendar } from "lucide-react";

async function getPropertyReviews(propertyId: string) {
  try {
    const baseUrl = process.env.BACKEND_API_URL || 'https://assignment-4-vnjw.onrender.com';
    const res = await fetch(`${baseUrl}/api/reviews/property/${propertyId}`, {
      method: "GET",
      next: { revalidate: 0 }
    });

    if (!res.ok) return [];
    const result = await res.json();
    return result?.data?.data || result?.data || result || [];
  } catch (err) {
    console.error("Fetch Property Reviews Failed:", err);
    return [];
  }
}

export default async function PropertyReviewsList({ propertyId }: { propertyId: string }) {
  const reviews = await getPropertyReviews(propertyId);

  return (
    <div className="border-t border-slate-100 pt-10 space-y-6 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 dark:text-white">
          <StarIcon className="w-5 h-5 text-[#FF385C] fill-[#FF385C] dark:text-[#FF385C] dark:fill-[#FF385C]" />
          Guest Reviews ({reviews.length})
        </h3>
        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-xl dark:bg-slate-600 dark:text-slate-300">
          Verified Testimonials
        </span>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-slate-50  rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm font-medium dark:bg-slate-600 dark:border-slate-500 dark:text-slate-300">
          No reviews published for this nest yet. Be the first to share your experience!
        </div>
      ) : (
        <div className="max-h-[520px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent dark:scrollbar-thumb-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:scrollbar-thumb-slate-700">
            {reviews.map((rev: any, i: number) => (
              <div 
                key={rev.id || rev._id || i} 
                className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 h-fit dark:bg-slate-800 dark:border-slate-700 dark:hover:shadow-slate-700/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-50 text-[#FF385C] rounded-full flex items-center justify-center border border-rose-100">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800 dark:text-white">
                        {rev.user?.name || "Verified Tenant"}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 dark:text-slate-300">
                        <Calendar className="w-3 h-3 dark:text-slate-300" /> {new Date(rev.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-rose-50/50 px-2.5 py-1 rounded-xl text-xs font-black text-[#FF385C] dark:bg-rose-500/10 dark:text-[#FF385C]">
                    <StarIcon className="w-3.5 h-3.5 fill-[#FF385C] dark:fill-slate-300" />
                    {rev.rating || 5}.0
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-line dark:text-slate-300">
                  "{rev.comment || rev.reviewText || "Excellent place! Highly recommended for premium stays."}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
