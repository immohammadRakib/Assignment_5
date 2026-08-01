"use client";

import React from "react";
import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import { Star, MapPin, Building2, ArrowRight } from "lucide-react";
import Link from 'next/link';



const SYSTEM_FALLBACK_IMAGE = "https://img.magnific.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg";

export default function FeaturedProperties() {
  const API_BASE = 'https://assignment-4-vnjw.onrender.com';

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ['homeProperties'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/properties?limit=3`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const properties = apiResponse?.data?.data || apiResponse?.data || [];

  const hasValidImage = 
    properties.images && 
    properties.images.length > 0 && 
    properties.images[0] &&
    properties.images[0].trim() !== "" &&
    properties.images[0] !== "https://unsplash.com" && 
    properties.images[0] !== "https://google.com" &&
    (properties.images[0].includes("http") || properties.images[0].includes("/"));

  const activeImage = hasValidImage
    ? properties.images[0]
    : SYSTEM_FALLBACK_IMAGE;

  return (
    <section className="py-16 bg-slate-50/40">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Featured Listings
            </h2>
            <p className="text-slate-500 font-medium text-xs md:text-sm">
              Handpicked premium properties for your next dream stay.
            </p>
          </div>
          <Link 
            href="/properties" 
            className="group inline-flex items-center gap-1.5 text-[#FF385C] font-semibold text-xs md:text-sm hover:text-[#E31C5F] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3 animate-pulse">
                <div className="aspect-[16/14] w-full rounded-2xl bg-slate-200" />
                <div className="h-5 w-3/4 rounded-lg bg-slate-200" />
                <div className="h-4 w-1/2 rounded-lg bg-slate-200" />
                <div className="h-5 w-1/3 rounded-lg bg-slate-200" />
              </div>
            ))
          ) : (
            properties.map((property: any, index: number) => (
              <motion.div
                key={property.id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                className="group flex flex-col bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all duration-300"
              >

                <Link href={`/properties/${property.id}`} className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 bg-slate-100 block">
                  {property.images && property.images ? (
                    <img
                      src={activeImage}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                      <Building2 className="w-10 h-10 opacity-30" />
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-900 flex items-center gap-0.5 shadow-sm border border-slate-100">
                    <Star className="w-3 h-3 text-[#FF385C] fill-[#FF385C]" />
                    <span>{property.rating || "4.9"}</span>
                  </div>
                </Link>

                <div className="px-1 pb-1 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <Link href={`/properties/${property.id}`}>
                      <h3 className="text-base font-bold text-slate-800 hover:text-[#FF385C] transition-colors line-clamp-1 leading-tight">
                        {property.title}
                      </h3>
                    </Link>
                    <p className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <span className="text-base font-extrabold text-slate-900">৳ {Number(property.pricePerDay).toLocaleString()}</span>
                      <span className="text-slate-400 font-medium text-[10px]"> / night</span>
                    </div>
                    
                    <Link href={`/properties/${property.id}`} className="p-2 rounded-full bg-slate-50 text-slate-600 group-hover:bg-[#FF385C] group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
