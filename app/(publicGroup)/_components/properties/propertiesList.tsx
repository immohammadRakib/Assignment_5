// /* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { getAllProperties } from "../../_actions/propertiesAction";
import { PropertyCard, IProperty } from "./propertiesCard";

type PublicPropertiesListProps = {
  searchParams?: any;
};

export async function PublicPropertiesList({ searchParams }: PublicPropertiesListProps) {

  const paramsObj = await searchParams; 
  const currentPage = parseInt(paramsObj?.page || "1", 10);
  const itemsPerPage = 6; 

  const result = await getAllProperties(paramsObj);
  const propertiesData = result?.data;

  const rawData: IProperty[] = Array.isArray(propertiesData) 
    ? propertiesData 
    : (Array.isArray(propertiesData?.data) ? propertiesData.data : []);

  const finalProperties = rawData.filter((item: IProperty) => item.isAvailable !== false);

  const backendTotalCount = 
    result?.pagination?.total || 
    result?.meta?.total || 
    result?.total || 
    propertiesData?.total || 11;

  const totalItems = parseInt(backendTotalCount, 10);
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    Object.entries(paramsObj || {}).forEach(([key, value]) => {
      if (value) params.set(key, value as string);
    });
    params.set("page", pageNumber.toString());
    return `/properties?${params.toString()}`;
  };

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
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {finalProperties.map((property: IProperty) => (
          <PropertyCard key={property.id || (property as any)._id} property={property} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 pt-10 border-t border-slate-100">
        <div className="flex items-center gap-2">
          
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
