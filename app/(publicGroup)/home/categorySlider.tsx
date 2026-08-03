// "use client";

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { motion, Variants } from "framer-motion";
// import {
//   Building2,
//   Hotel,
//   Home,
//   Store,
//   Warehouse,
//   Tent,
//   Compass,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// const getCategoryIcon = (name: string) => {
//   const n = name?.toLowerCase();
//   if (n?.includes("studio") || n?.includes("apartment") || n?.includes("flat"))
//     return Hotel;
//   if (n?.includes("house") || n?.includes("villa") || n?.includes("luxury"))
//     return Home;
//   if (
//     n?.includes("playground") ||
//     n?.includes("field") ||
//     n?.includes("garden")
//   )
//     return Compass;
//   if (n?.includes("hall") || n?.includes("convention")) return Store;
//   if (n?.includes("office-space") || n?.includes("commercial"))
//     return Building2;
//   if (n?.includes("warehouse")) return Warehouse;
//   return Tent;
// };

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 60, scale: 0.8 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       type: "spring" as const,
//       stiffness: 180,
//       damping: 12,
//     },
//   },
// };

// export default function CategorySlider() {
//   const router = useRouter();
//   const API_BASE = "https://assignment-4-vnjw.onrender.com";

//   const { data: apiResponse, isLoading } = useQuery({
//     queryKey: ["homeCategories"],
//     queryFn: async () => {
//       const res = await fetch(`${API_BASE}/api/categories`);
//       if (!res.ok) throw new Error("Failed to fetch categories");
//       return res.json();
//     },
//   });

//   const categories = apiResponse?.data || apiResponse || [];
//   return (
//     <section className="py-16 bg-slate-50/60 border-t border-b border-slate-100 overflow-hidden">
//       <div className="container mx-auto px-6 max-w-7xl">
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: false }}
//           transition={{ duration: 0.6, type: "spring" }}
//           className="mb-10 space-y-1"
//         >
//           <span className="text-[#FF385C] font-black text-xs uppercase tracking-widest flex items-center gap-1.5">
//             <Compass
//               className="w-3.5 h-3.5 animate-spin"
//               style={{ animationDuration: "6s" }}
//             />
//             Explore Rentals
//           </span>
//           <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
//             Browse by Property Type
//           </h2>
//           <p className="text-slate-500 text-xs font-semibold">
//             Find tailored accommodations matching your exact structural
//             requirements.
//           </p>
//         </motion.div>

//         {isLoading ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {[...Array(5)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-32 rounded-2xl bg-white border border-slate-100 animate-pulse shadow-sm"
//               />
//             ))}
//           </div>
//         ) : (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: false, amount: 0.15 }}
//             className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
//           >
//             {categories.slice(0, 5).map((cat: any, index: number) => {
//               const Icon = getCategoryIcon(cat.name);
//               const count =
//                 cat.properties?.length || cat._count?.properties || 0;

//               return (
//                 <motion.div
//                   key={cat.id || index}
//                   variants={cardVariants}
//                   whileHover={{
//                     y: -10,
//                     scale: 1.03,
//                     boxShadow:
//                       "0 20px 25px -5px rgb(255 56 92 / 0.1), 0 8px 10px -6px rgb(255 56 92 / 0.1)",
//                   }}
//                   whileTap={{ scale: 0.97 }}
//                   onClick={() => router.push(`/properties?search=${cat.name}`)}
//                   className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col items-center justify-center text-center gap-4 cursor-pointer group transition-colors duration-300 hover:border-rose-300 relative overflow-hidden"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-b from-rose-50/0 to-rose-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                   <motion.div
//                     whileHover={{ rotate: 15, scale: 1.1 }}
//                     className="p-3 bg-rose-50/60 text-[#FF385C] rounded-2xl group-hover:bg-[#FF385C] group-hover:text-white transition-all duration-300 shadow-xs relative z-10"
//                   >
//                     <Icon className="w-5 h-5 stroke-[2.5px]" />
//                   </motion.div>

//                   <div className="space-y-1 relative z-10">
//                     <h4 className="text-xs font-black text-slate-800 tracking-tight group-hover:text-[#FF385C] transition-colors truncate max-w-[120px]">
//                       {cat.name}
//                     </h4>
//                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight bg-slate-50 px-2 py-0.5 rounded-md group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
//                       {count} Units
//                     </p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// }




"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, Variants } from "framer-motion";
import { Building2, Hotel, Home, Store, Warehouse, Tent, Compass } from "lucide-react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


const getCategoryIcon = (name: string) => {
  const n = name?.toLowerCase();
  if (n?.includes("studio") || n?.includes("apartment") || n?.includes("flat")) return Hotel;
  if (n?.includes("house") || n?.includes("villa") || n?.includes("luxury")) return Home;
  if (n?.includes("playground") || n?.includes("field") || n?.includes("garden")) return Compass;
  if (n?.includes("hall") || n?.includes("convention")) return Store;
  if (n?.includes("office-space") || n?.includes("commercial")) return Building2;
  if (n?.includes("warehouse")) return Warehouse;
  return Tent;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 12,
    },
  },
};

export default function CategorySlider() {
  const router = useRouter();
  const API_BASE = "https://assignment-4-vnjw.onrender.com";

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["homeCategories"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  const categories = apiResponse?.data || apiResponse || [];

  return (
    // 🎯 মেইন সেকশন - ডার্ক মোডে বর্ডার ও হালকা পিচ ব্ল্যাক শেড নিবে
    <section className="py-16 bg-slate-50/60 border-t border-b border-slate-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800/60 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* সেকশন হেডার - ডার্ক মোডে টেক্সট ব্যালেন্স করা হয়েছে */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-10 space-y-1"
        >
          <span className="text-[#FF385C] font-black text-xs uppercase tracking-widest flex items-center gap-1.5 dark:text-rose-400">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} /> 
            Explore Rentals
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight dark:text-slate-100">
            Browse by Property Type
          </h2>
          <p className="text-slate-500 text-xs font-semibold dark:text-slate-400">
            Find tailored accommodations matching your exact structural requirements.
          </p>
        </motion.div>

        {/* 📋 ডাইনামিক ক্যাটাগরি গ্রিড (৫টি কার্ডের লেআউট সহ) */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-white border border-slate-100 animate-pulse shadow-sm dark:bg-slate-800 dark:border-slate-700/50" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {categories.slice(0, 5).map((cat: any, index: number) => {
              const Icon = getCategoryIcon(cat.name);
              const count = cat.properties?.length || cat._count?.properties || 0;
              
              return (
                <motion.div
                  key={cat.id || index}
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    boxShadow: "0 20px 25px -5px rgb(255 56 92 / 0.1), 0 8px 10px -6px rgb(255 56 92 / 0.1)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push(`/properties?search=${cat.name}`)}
                  // 🎯 কাস্টম কার্ড টিউনিং - ডার্ক মোডে শ্যাড-সিএন এর থিম কালার (`dark:bg-card`, `dark:border-border`) অটোমেটিক নিয়ে নিবে
                  className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col items-center justify-center text-center gap-4 cursor-pointer group transition-colors duration-300 hover:border-rose-300 relative overflow-hidden dark:bg-card dark:border-border dark:hover:border-rose-900/40"
                >
                  {/* হোভার ব্যাকগ্রাউন্ড গ্লো */}
                  <div className="absolute inset-0 bg-gradient-to-b from-rose-50/0 to-rose-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-rose-950/0 dark:to-rose-950/20" />
                  
                  {/* আইকন হোল্ডার ব্যাজ - ডার্ক মোড কালার অপ্টিমাইজড */}
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="p-3 bg-rose-50/60 text-[#FF385C] rounded-2xl group-hover:bg-[#FF385C] group-hover:text-white transition-all duration-300 shadow-xs relative z-10 dark:bg-rose-950/40 dark:text-rose-400 dark:group-hover:bg-rose-600 dark:group-hover:text-white"
                  >
                    <Icon className="w-5 h-5 stroke-[2.5px]" />
                  </motion.div>

                  {/* টেক্সট ও লাইভ কাউন্ট ব্যাজ */}
                  <div className="space-y-1 relative z-10">
                    <h4 className="text-xs font-black text-slate-800 tracking-tight group-hover:text-[#FF385C] transition-colors truncate max-w-[120px] dark:text-slate-200 dark:group-hover:text-rose-400">
                      {cat.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight bg-slate-50 px-2 py-0.5 rounded-md group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors dark:bg-slate-800 dark:text-slate-500 dark:group-hover:bg-rose-950/40 dark:group-hover:text-rose-400">
                      {count} Units
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
