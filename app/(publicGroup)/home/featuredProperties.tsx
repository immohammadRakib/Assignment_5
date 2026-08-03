// "use client";

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import { Building2, ArrowRight, StarIcon, MapPin } from "lucide-react";
// import Link from "next/link";

// const SYSTEM_FALLBACK_IMAGE =
//   "https://img.magnific.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg";

// export default function FeaturedProperties() {
//   const API_BASE = "https://assignment-4-vnjw.onrender.com";

//   const { data: apiResponse, isLoading } = useQuery({
//     queryKey: ["homeProperties"],
//     queryFn: async () => {
//       const res = await fetch(`${API_BASE}/api/properties?limit=3`);
//       if (!res.ok) throw new Error("Failed to fetch");
//       return res.json();
//     },
//   });

//   const properties = apiResponse?.data?.data || apiResponse?.data || [];

//   return (
//     <section className="py-16 bg-slate-50/40">
//       <div className="container mx-auto px-6 max-w-7xl">
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
//           <div className="space-y-1">
//             <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
//               Featured Listings
//             </h2>
//             <p className="text-slate-500 font-medium text-xs md:text-sm">
//               Handpicked premium properties for your next dream stay.
//             </p>
//           </div>
//           <Link
//             href="/properties"
//             className="group inline-flex items-center gap-1.5 text-[#FF385C] font-semibold text-xs md:text-sm hover:text-[#E31C5F] transition-colors"
//           >
//             <span>View All</span>
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5px]" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
//           {isLoading
//             ? Array.from({ length: 3 }).map((_, i) => (
//                 <div key={i} className="flex flex-col space-y-3 animate-pulse">
//                   <div className="aspect-[4/3] w-full rounded-2xl bg-slate-200" />
//                   <div className="h-5 w-3/4 rounded-lg bg-slate-200" />
//                   <div className="h-4 w-1/2 rounded-lg bg-slate-200" />
//                   <div className="h-5 w-1/3 rounded-lg bg-slate-200" />
//                 </div>
//               ))
//             : properties.map((property: any, index: number) => {
//                 const activeId = property.id || (property as any)._id;
//                 const reviewCount =
//                   property._count?.reviews ?? property.reviews?.length ?? 0;

//                 const hasValidImage =
//                   property.images &&
//                   property.images.length > 0 &&
//                   property.images[0] &&
//                   property.images[0].trim() !== "" &&
//                   property.images[0] !== "https://unsplash.com" &&
//                   property.images[0] !== "https://google.com" &&
//                   (property.images[0].includes("http") ||
//                     property.images[0].includes("/"));

//                 const activeImage = hasValidImage
//                   ? property.images[0]
//                   : SYSTEM_FALLBACK_IMAGE;

//                 return (
//                   <motion.div
//                     key={activeId}
//                     initial={{ opacity: 0, y: 25 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true, margin: "-50px" }}
//                     transition={{
//                       delay: index * 0.08,
//                       duration: 0.5,
//                       ease: "easeOut",
//                     }}
//                     className="group flex flex-col bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all duration-300"
//                   >
//                     <Link
//                       href={`/properties/${activeId}`}
//                       className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 bg-slate-50 block"
//                     >
//                       <img
//                         src={activeImage}
//                         alt={property.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
//                         loading="lazy"
//                       />

//                       <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-900 flex items-center gap-0.5 shadow-sm border border-slate-100 z-10">
//                         <StarIcon className="w-3 h-3 text-amber-500 fill-amber-500" />
//                         <span>
//                           {reviewCount > 0 ? `${reviewCount} Reviews` : "New"}
//                         </span>
//                       </div>
//                     </Link>

//                     <div className="px-1 pb-1 flex-1 flex flex-col justify-between space-y-3">
//                       <div className="space-y-1">
//                         <Link href={`/properties/${activeId}`}>
//                           <h3 className="text-base font-bold text-slate-800 hover:text-[#FF385C] transition-colors line-clamp-1 leading-tight">
//                             {property.title}
//                           </h3>
//                         </Link>
//                         <p className="flex items-center gap-1 text-slate-400 text-xs font-medium">
//                           <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
//                           <span className="truncate">
//                             {property.location || "Sylhet, Bangladesh"}
//                           </span>
//                         </p>
//                       </div>

//                       <div className="pt-2.5 border-t border-slate-50 flex items-center justify-between">
//                         <div>
//                           <span className="text-base font-extrabold text-slate-900">
//                             ৳{" "}
//                             {Number(property.pricePerDay || 0).toLocaleString()}
//                           </span>
//                           <span className="text-slate-400 font-medium text-[10px]">
//                             {" "}
//                             / night
//                           </span>
//                         </div>
//                         <Link
//                           href={`/properties/${activeId}`}
//                           className="p-2 rounded-full bg-slate-50 text-slate-600 group-hover:bg-[#FF385C] group-hover:text-white transition-all duration-300"
//                         >
//                           <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
//                         </Link>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//         </div>
//       </div>
//     </section>
//   );
// }





"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Building2, ArrowRight, StarIcon, MapPin } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


const SYSTEM_FALLBACK_IMAGE = "https://img.magnific.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg";

export default function FeaturedProperties() {
  const API_BASE = "https://assignment-4-vnjw.onrender.com";

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["homeProperties"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/properties?limit=3`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const properties = apiResponse?.data?.data || apiResponse?.data || [];

  return (
    // 🎯 মেইন সেকশন - ডার্ক মোডে হালকা পিচ ব্ল্যাক শেড নিবে
    <section className="py-16 bg-slate-50/40 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* সেকশন হেডার */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight dark:text-slate-100">
              Featured Listings
            </h2>
            <p className="text-slate-500 font-medium text-xs md:text-sm dark:text-slate-400">
              Handpicked premium properties for your next dream stay.
            </p>
          </div>
          <Link
            href="/properties"
            className="group inline-flex items-center gap-1.5 text-[#FF385C] font-semibold text-xs md:text-sm hover:text-[#E31C5F] transition-colors dark:text-rose-400 dark:hover:text-rose-500"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5px]" />
          </Link>
        </div>
        {/* 📋 ডাইনামিক গ্রিড কন্টেইনার */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3 animate-pulse">
                <div className="aspect-[4/3] w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-1/2 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-1/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
            ))
          ) : (
            properties.map((property: any, index: number) => {
              const activeId = property.id || (property as any)._id;
              const reviewCount = property._count?.reviews ?? property.reviews?.length ?? 0;
              
              const hasValidImage =
                property.images &&
                property.images.length > 0 &&
                property.images[0] &&
                property.images[0].trim() !== "" &&
                property.images[0] !== "https://unsplash.com" &&
                property.images[0] !== "https://google.com" &&
                (property.images[0].includes("http") || property.images[0].includes("/"));

              const activeImage = hasValidImage ? property.images[0] : SYSTEM_FALLBACK_IMAGE;

              return (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  // 🎯 কাস্টম কার্ড টিউনিং - ডার্ক মোডে শ্যাড-সিএন থিম কালার নিবে
                  className="group flex flex-col bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all duration-300 dark:bg-card dark:border-border dark:hover:border-rose-900/40"
                >
                  {/* ইমেজ হোল্ডার */}
                  <Link
                    href={`/properties/${activeId}`}
                    className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 bg-slate-50 block dark:bg-slate-800/40"
                  >
                    <img
                      src={activeImage}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    {/* রেটিং ব্যাজ */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-900 flex items-center gap-0.5 shadow-sm border border-slate-100 z-10 dark:bg-slate-900/90 dark:border-slate-800 dark:text-slate-100">
                      <StarIcon className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{reviewCount > 0 ? `${reviewCount} Reviews` : "New"}</span>
                    </div>
                  </Link>

                  {/* টেক্সট অ্যান্ড কন্টেন্ট বডি */}
                  <div className="px-1 pb-1 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <Link href={`/properties/${activeId}`}>
                        <h3 className="text-base font-bold text-slate-800 hover:text-[#FF385C] transition-colors line-clamp-1 leading-tight dark:text-slate-200 dark:hover:text-rose-400">
                          {property.title}
                        </h3>
                      </Link>
                      <p className="flex items-center gap-1 text-slate-400 text-xs font-medium dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 dark:text-slate-500" />
                        <span className="truncate">
                          {property.location || "Sylhet, Bangladesh"}
                        </span>
                      </p>
                    </div>

                    {/* প্রাইস এবং অ্যাকশন বাটন */}
                    <div className="pt-2.5 border-t border-slate-50 flex items-center justify-between dark:border-slate-800/60">
                      <div>
                        <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                          ৳ {Number(property.pricePerDay || 0).toLocaleString()}
                        </span>
                        <span className="text-slate-400 font-medium text-[10px] dark:text-slate-500">
                          {" "}
                          / night
                        </span>
                      </div>
                      
                      {/* রাউন্ড অ্যাকশন বাটন - হোভার করলে ব্র্যান্ড রোজ কালার পপ করবে */}
                      <Link
                        href={`/properties/${activeId}`}
                        className="p-2 rounded-full bg-slate-50 text-slate-600 group-hover:bg-[#FF385C] group-hover:text-white transition-all duration-300 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-rose-600 dark:group-hover:text-white"
                      >
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
