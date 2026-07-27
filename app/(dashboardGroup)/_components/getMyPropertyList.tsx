/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyProperties } from "../_actions/myPropertiesAction"; // তোমার তৈরি করা প্রপার্টি অ্যাকশন পাথ
import { MyPropertyCard, IProperty } from "./myPropertyCard"; // তোমার প্রপার্টি কার্ড এবং ইন্টারফেস পাথ

export async function MyPropertiesList() {
  // সার্ভার অ্যাকশন থেকে ল্যান্ডলর্ডের প্রপার্টি ডাটা আনা হচ্ছে
  const result = await getMyProperties();

  // যদি কোনো প্রপার্টি না থাকে বা এপিআই ফেইল করে
  if (!result.success || !result.data || result.data.length === 0) {
    return (
      <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-xl max-w-md mx-auto mt-6">
        <p className="text-gray-500 font-medium">
          You haven&apos;t listed any properties yet.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Click the &quot;Add New Property&quot; button to list your first home!
        </p>
      </div>
    );
  }

  return (
    // Airbnb Style রেসপন্সিভ গ্রিড লেআউট (মোবাইলে ১ কলাম, ট্যাবে ২ কলাম, ডেক্সটপে ৩ কলাম)
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
      {result.data.map((property: IProperty | any) => (
        <MyPropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
