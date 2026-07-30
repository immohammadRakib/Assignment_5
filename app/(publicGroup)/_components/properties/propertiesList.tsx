/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProperties } from "../../_actions/propertiesAction";
import { PropertyCard, IProperty } from "./propertiesCard";

type PublicPropertiesListProps = {
  searchParams?: {
    search?: string;
    category?: string;
    city?: string;
  };
};

export async function PublicPropertiesList({ searchParams }: PublicPropertiesListProps) {
  const result = await getAllProperties(searchParams);
  const propertiesData = result?.data;
  
  // ১. এপিআই রেসপন্স থেকে র ডাটা অ্যারে এক্সট্র্যাক্ট করা
  const rawData: IProperty[] = Array.isArray(propertiesData) 
    ? propertiesData 
    : (Array.isArray(propertiesData?.data) ? propertiesData.data : []);

  // 🎯 ২. তোমার রিকোয়েস্টেড ফিল্টারিং ম্যাজিক লজিক:
  // মেইন পাবলিক পেজের লিস্টে শুধু সেই প্রপার্টিগুলোই থাকবে যেগুলো ল্যান্ডলর্ড "Available" রেখেছে।
  // ল্যান্ডলর্ড ওটাকে ড্যাশবোর্ড থেকে "Booked" করা মাত্রই এটি কাস্টমার ভিউ থেকে ফিল্টার আউট (লুকিয়ে) হয়ে যাবে।
  const finalProperties = rawData.filter((item: any) => item.isAvailable !== false);

  // ৩. প্রপার্টি না থাকলে ফাঁকা স্টেট রেন্ডার হবে
  if (!finalProperties || finalProperties.length === 0) {
    return (
      <div className="py-16 text-center bg-neutral-50 rounded-xl w-full border border-dashed border-neutral-200">
        <p className="text-muted-foreground font-medium">
          No available properties found at the moment.
        </p>
        <p className="text-xs text-neutral-400 mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* ৪. এখানে তোমার সেই অরিজিনাল ম্যাপ ফাংশন একদম অক্ষুণ্ণ রইলো */}
        {finalProperties.map((property: any) => (
          <PropertyCard key={property.id || property._id} property={property} />
        ))}
      </div>
    </div>
  );
}
