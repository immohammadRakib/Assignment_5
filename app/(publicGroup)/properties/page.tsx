// import { Suspense } from "react";
// import { PropertiesSkeleton } from "../_components/properties/propertiesSkeleton";
// import { PublicPropertiesList } from "../_components/properties/propertiesList"; 
// import { PropertySearchBar } from "../_components/properties/propertiesSearchBar"; 

// type PropertiesPageProps = {
//   searchParams: Promise<{ search?: string; category?: string; city?: string }>;
// };

// export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
//   const resolvedSearchParams = await searchParams;

//   return (
//     <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8 bg-white">
//       <div className="flex flex-col gap-6 items-center border-b border-neutral-150 pb-6">
//         <div className="text-center space-y-1">
//           <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
//             Find Your Next Perfect Stay
//           </h1>
//           <p className="text-sm text-muted-foreground">
//             Explore premium rental houses, flats, and bachelor rooms listed across the platform.
//           </p>
//         </div>
        
//         <PropertySearchBar />
//       </div>

//       <Suspense key={JSON.stringify(resolvedSearchParams)} fallback={<PropertiesSkeleton />}>
//         <PublicPropertiesList searchParams={resolvedSearchParams} />
//       </Suspense>
//     </div>
//   );
// }



import { Suspense } from "react";
import { PropertiesSkeleton } from "../_components/properties/propertiesSkeleton";
import { PublicPropertiesList } from "../_components/properties/propertiesList"; 
import { PropertySearchBar } from "../_components/properties/propertiesSearchBar"; 

type PropertiesPageProps = {
  searchParams: Promise<{ search?: string; category?: string; city?: string; page?: string }>;
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const resolvedSearchParams = await searchParams;
  
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8 bg-white min-h-screen">
      {/* হেডার ও সার্চ এরিয়া */}
      <div className="flex flex-col gap-6 items-center border-b border-neutral-100 pb-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            Find Your Next <span className="text-[#FF385C]">Perfect Stay</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-xl mx-auto">
            Explore premium rental houses, flats, convention centers, and bachelor rooms listed across the platform.
          </p>
        </div>
        
        {/* উন্নত ও এক্সপ্যান্ডেড সার্চ বার */}
        <PropertySearchBar />
      </div>

      {/* প্রপার্টি লিস্ট ও স্কেলিটন */}
      <Suspense key={JSON.stringify(resolvedSearchParams)} fallback={<PropertiesSkeleton />}>
        <PublicPropertiesList searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}

// export function PropertiesSkeleton() {
//   return (
//     <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//       {Array.from({ length: 6 }).map((_, i) => (
//         <div key={i} className="flex flex-col space-y-4 animate-pulse">
//           <div className="aspect-[4/3] w-full rounded-2xl bg-slate-100" />
//           <div className="h-6 w-3/4 rounded-lg bg-slate-100" />
//           <div className="h-4 w-1/2 rounded-lg bg-slate-100" />
//           <div className="h-5 w-1/3 rounded-lg bg-slate-100" />
//         </div>
//       ))}
//     </div>
//   );
// }
