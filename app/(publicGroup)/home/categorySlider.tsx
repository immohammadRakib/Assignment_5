"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Building2, Hotel, Home, Store, Warehouse, Tent, Compass } from "lucide-react";
import { useRouter } from "next/navigation";

// ক্যাটাগরি অনুযায়ী ডাইনামিক আইকন ম্যাপার
const getCategoryIcon = (slug: string) => {
  const s = slug?.toLowerCase();
  if (s?.includes("apartment") || s?.includes("flat")) return Hotel;
  if (s?.includes("villa") || s?.includes("luxury")) return Home;
  if (s?.includes("hall") || s?.includes("convention")) return Store;
  if (s?.includes("office") || s?.includes("commercial")) return Building2;
  if (s?.includes("warehouse") || s?.includes("garage")) return Warehouse;
  return Tent; // ডিফল্ট আইকন
};

export default function CategorySlider() {
  const router = useRouter();
  const API_BASE = "https://onrender.com";

  // 🔄 TanStack Query দিয়ে ডাইনামিক ক্যাটাগরি ফেচিং
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
    <section className="py-16 bg-slate-50/60 border-t border-b border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* সেকশন হেডার */}
        <div className="mb-10 space-y-1">
          <span className="text-[#FF385C] font-black text-xs uppercase tracking-widest flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 animate-spin duration-3000" /> Explore Rentals
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Browse by Property Type
          </h2>
          <p className="text-slate-500 text-xs font-semibold">
            Find tailored accommodations matching your exact structural requirements.
          </p>
        </div>

        {/* 📋 ডাইনামিক গ্লসি ক্যাটাগরি গ্রিড উইথ হোভার অ্যানিমেশন */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-white border border-slate-100 animate-pulse shadow-sm" />
            ))
          ) : (
            categories.slice(0, 6).map((cat: any, index: number) => {
              const Icon = getCategoryIcon(cat.slug);
              const count = cat.properties?.length || cat._count?.properties || 0;

              return (
                <motion.div
                  key={cat.id || index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  onClick={() => router.push(`/properties?category=${cat.slug}`)} // 🚀 ক্লিক করলে সার্চ প্যারামিটার সহ রিডাইরেক্ট
                  className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center gap-3 cursor-pointer group transition-all duration-300 hover:border-rose-200 hover:shadow-md"
                >
                  {/* আইকন হোল্ডার */}
                  <div className="p-3 bg-rose-50/50 text-[#FF385C] rounded-xl group-hover:bg-[#FF385C] group-hover:text-white transition-all duration-300 shadow-inner">
                    <Icon className="w-5 h-5 stroke-[2.5px]" />
                  </div>
                  
                  {/* টেক্সট ও লাইভ কাউন্ট ব্যাজ */}
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black text-slate-800 tracking-tight group-hover:text-[#FF385C] transition-colors truncate max-w-[120px]">
                      {cat.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                      {count} Units Available
                    </p>
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
