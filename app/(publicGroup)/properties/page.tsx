import { Suspense } from "react";
import { PropertiesSkeleton } from "../_components/properties/propertiesSkeleton";
import { PublicPropertiesList } from "../_components/properties/propertiesList"; 
import { PropertySearchBar } from "../_components/properties/propertiesSearchBar"; 

type PropertiesPageProps = {
  searchParams: Promise<{ search?: string; category?: string; city?: string }>;
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8 bg-white">
      <div className="flex flex-col gap-6 items-center border-b border-neutral-150 pb-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Find Your Next Perfect Stay
          </h1>
          <p className="text-sm text-muted-foreground">
            Explore premium rental houses, flats, and bachelor rooms listed across the platform.
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
