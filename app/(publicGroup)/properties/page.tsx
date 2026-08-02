
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
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8 bg-white min-h-screen dark:bg-background transition-colors duration-300">

      <div className="flex flex-col gap-6 items-center border-b border-neutral-100 dark:border-slate-700 pb-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Find Your Next <span className="text-[#FF385C]">Perfect Stay</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-xl mx-auto dark:text-slate-400">
            Explore premium rental houses, flats, convention centers, and bachelor rooms listed across the platform.
          </p>
        </div>
        
        <PropertySearchBar />
      </div>

      <Suspense key={JSON.stringify(resolvedSearchParams)} fallback={<PropertiesSkeleton />}>
        <PublicPropertiesList searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}

