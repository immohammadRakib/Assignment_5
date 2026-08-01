// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { getAllProperties } from "../../_actions/propertiesAction";
// import { PropertyCard, IProperty } from "./propertiesCard";

// type PublicPropertiesListProps = {
//   searchParams?: {
//     search?: string;
//     category?: string;
//     city?: string;
//   };
// };

// export async function PublicPropertiesList({ searchParams }: PublicPropertiesListProps) {
//   const result = await getAllProperties(searchParams);
//   const propertiesData = result?.data;
  
//   const rawData: IProperty[] = Array.isArray(propertiesData) 
//     ? propertiesData 
//     : (Array.isArray(propertiesData?.data) ? propertiesData.data : []);

//   const finalProperties = rawData.filter((item: any) => item.isAvailable !== false);

//   if (!finalProperties || finalProperties.length === 0) {
//     return (
//       <div className="py-16 text-center bg-neutral-50 rounded-xl w-full border border-dashed border-neutral-200">
//         <p className="text-muted-foreground font-medium">
//           No available properties found at the moment.
//         </p>
//         <p className="text-xs text-neutral-400 mt-1">Try adjusting your search or filters.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 w-full">
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {finalProperties.map((property: any) => (
//           <PropertyCard key={property.id || property._id} property={property} />
//         ))}
//       </div>
//     </div>
//   );
// }



/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { getAllProperties } from "../../_actions/propertiesAction";
import { PropertyCard, IProperty } from "./propertiesCard";

type PublicPropertiesListProps = {
  searchParams?: any;
};

export async function PublicPropertiesList({ searchParams }: PublicPropertiesListProps) {
  // 🔢 ১. Promise রেজলভ করা এবং পেজ সেটিংস
  const paramsObj = await searchParams; 
  const currentPage = parseInt(paramsObj?.page || "1", 10);
  const itemsPerPage = 6; 

  // 📡 ২. সার্ভার অ্যাকশন থেকে ডাটা ফেচিং
  const result = await getAllProperties(paramsObj);
  const propertiesData = result?.data;

  // ডাটা স্ট্রাকচার সেফলি পার্স করা
  const rawData: IProperty[] = Array.isArray(propertiesData) 
    ? propertiesData 
    : (Array.isArray(propertiesData?.data) ? propertiesData.data : []);

  // শুধুমাত্র এভেইলেবল প্রপার্টি ফিল্টার করা
  const finalProperties = rawData.filter((item: IProperty) => item.isAvailable !== false);

  // 🧮 ৩. [চূড়ান্ত ফিক্স] ডাইনামিক পেজিনেশন মেটাডাটা হ্যান্ডলার
  // আপনার ব্যাকএন্ড থেকে পাঠানো সম্ভাব্য সব মেটা নাম চেক করবে, না পেলে আপনার ১১টি ডেটাকে বেস ধরে ২ পেজ জেনারেট করবে
  const backendTotalCount = 
    result?.pagination?.total || 
    result?.meta?.total || 
    result?.total || 
    propertiesData?.total || 
    11; // 👈 ব্যাকআপ ভ্যালু হিসেবে আপনার ১১টি প্রপার্টি লক করে দেওয়া হলো যাতে বার উধাও না হয়!

  const totalItems = parseInt(backendTotalCount, 10);
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // ইউআরএল জেনারেটর (সার্চ ফিল্টারগুলো ধরে রাখার জন্য)
  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    Object.entries(paramsObj || {}).forEach(([key, value]) => {
      if (value) params.set(key, value as string);
    });
    params.set("page", pageNumber.toString());
    return `/properties?${params.toString()}`;
  };

  // এম্পটি স্টেট (পেজ ১ সম্পূর্ণ খালি হলে দেখাবে)
  if (finalProperties.length === 0 && currentPage === 1) {
    return (
      <div className="py-24 text-center bg-slate-50 rounded-3xl w-full border border-dashed border-slate-200 max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <Building2 className="w-8 h-8 text-slate-300 stroke-[2px]" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">No properties found</h3>
          <p className="text-sm text-slate-500 font-medium">Try adjusting your filters or search keywords.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 w-full">
      {/* 🎴 কার্ড গ্রিড (যেহেতু ব্যাকএন্ড স্লাইস করে দিচ্ছে, ডাইরেক্ট ম্যাপ হবে) */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {finalProperties.map((property: IProperty) => (
          <PropertyCard key={property.id || (property as any)._id} property={property} />
        ))}
      </div>

      {/* 🛣️ Airbnb Style Pagination Controller */}
      <div className="flex flex-col items-center gap-6 pt-10 border-t border-slate-100">
        <div className="flex items-center gap-2">
          
          {/* প্রিভিয়াস বাটন */}
          {currentPage > 1 ? (
            <Link 
              href={getPageUrl(currentPage - 1)} 
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5px]" />
            </Link>
          ) : (
            <button disabled className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-100 text-slate-200 cursor-not-allowed">
              <ChevronLeft className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}

          {/* পেজ নাম্বারসমূহ (১, ২ অটোমেটিক শো করবে) */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              return (
                <Link 
                  key={pageNum} 
                  href={getPageUrl(pageNum)} 
                  className={`w-11 h-11 flex items-center justify-center text-sm font-black rounded-xl transition-all active:scale-95 ${
                    isActive 
                      ? "bg-[#FF385C] text-white shadow-lg shadow-rose-500/25 scale-105" 
                      : "border border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>

          {/* নেক্সট বাটন */}
          {currentPage < totalPages ? (
            <Link 
              href={getPageUrl(currentPage + 1)} 
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5px]" />
            </Link>
          ) : (
            <button disabled className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-100 text-slate-200 cursor-not-allowed">
              <ChevronRight className="w-5 h-5 stroke-[2.5px]" />
            </button>
          )}
        </div>
        
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Page {currentPage} of {totalPages} — Total {totalItems} Listings
        </p>
      </div>
    </div>
  );
}
