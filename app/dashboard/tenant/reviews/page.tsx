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
    const res = await fetch(`${baseUrl}/api/reviews`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 },
    });
    const result = await res.json();
    return result?.data || result || [];
  } catch (err) {
    return;
  }
}

export default async function TenantReviewsListPage() {
  const reviews = await getMyReviews();
  const reviewsData = Array.isArray(reviews)
    ? reviews
    : reviews?.data || reviews?.result || [];

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto font-sans">
      {reviewsData.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-2xl text-neutral-400 text-sm">
          You haven't published any reviews yet. Verified stays will appear
          here.
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
              {reviewsData.map((rev: any, i: number) => (
                <ReviewRow
                  key={rev.id || rev._id || i}
                  review={rev}
                  index={i}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
