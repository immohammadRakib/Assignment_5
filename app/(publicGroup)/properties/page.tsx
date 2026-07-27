import { Suspense } from "react";
import { PropertiesSkeleton } from "../_components/properties/propertiesSkeleton"; // তোমার তৈরি করা স্কেলেটন পাথ মিলিয়ে নিও
import { PublicPropertiesList } from "../_components/properties/propertiesList"; // এই লিস্ট কম্পোনেন্টটি আমরা এখন বানাবো
import { PropertySearchBar } from "../_components/properties/propertiesSearchBar"; // তোমার তৈরি করা সার্চবার পাথ

type PropertiesPageProps = {
  searchParams: Promise<{ search?: string; category?: string; city?: string }>;
};

// Next.js 15+ এর নিয়ম অনুযায়ী সার্চ প্যারামস প্রমিজ (Promise) হিসেবে আসে
export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8 bg-white">
      {/* হেডার ও সেন্ট্রাল কাস্টম ডিবান্সড সার্চবার সেকশন */}
      <div className="flex flex-col gap-6 items-center border-b border-neutral-150 pb-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Find Your Next Perfect Stay
          </h1>
          <p className="text-sm text-muted-foreground">
            Explore premium rental houses, flats, and bachelor rooms listed across the platform.
          </p>
        </div>
        
        {/* তোমার তৈরি করা গোল সুন্দর ডিবান্সড সার্চবার */}
        <PropertySearchBar />
      </div>

      {/* লাইভ প্রপার্টি রেন্ডারিং উইথ সাসপেন্স বাফার */}
      {/* ইউজার যখন সার্চবারে টাইপ করবে, তখন নিচের ডাটা লোড হওয়ার মাঝখানের সময়ে স্কেলেটন প্লেসহোল্ডারটি ভাসবে */}
      <Suspense key={JSON.stringify(resolvedSearchParams)} fallback={<PropertiesSkeleton />}>
        <PublicPropertiesList searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}
