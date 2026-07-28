"use client";

export function MyPropertiesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border border-neutral-100 rounded-xl overflow-hidden bg-white space-y-4 pb-5 shadow-sm">
          
          <div className="w-full h-48 bg-neutral-200 animate-pulse" />
          
          <div className="px-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-neutral-200 animate-pulse rounded w-1/3" />
              <div className="h-7 bg-neutral-200 animate-pulse rounded-md w-12" />
            </div>
            
            <div className="h-5 bg-neutral-200 animate-pulse rounded w-3/4" />
            
            <div className="space-y-1.5 pt-1">
              <div className="h-3 bg-neutral-200 animate-pulse rounded w-full" />
              <div className="h-3 bg-neutral-200 animate-pulse rounded w-5/6" />
            </div>

            <div className="border-t pt-3 flex justify-between items-center">
              <div className="h-5 bg-neutral-200 animate-pulse rounded w-20" />
              <div className="h-4 bg-neutral-200 animate-pulse rounded w-24" />
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
