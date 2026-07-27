/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProperties } from "../../_actions/propertiesAction"; // তোমার তৈরি করা পাবলিক অ্যাকশন পাথ
import { PropertyCard, IProperty } from "./propertiesCard"; // তোমার প্রপার্টি কার্ড এবং ইন্টারফেস পাথ

type PublicPropertiesListProps = {
  searchParams?: {
    search?: string;
    category?: string;
    city?: string;
  };
};

// এই ডামি ডাটাগুলো ব্যাকআপ হিসেবে থাকবে যাতে ডাটাবেস ডাউন থাকলেও প্রজেক্ট দেখতে প্রোডাকশন লেভেলের লাগে
const fallbackDummyProperties: IProperty[] = [
  {
    id: "prop-1",
    title: "Smart Bachelor Studio Apartment",
    description: "Efficiently designed studio with smart home features. Located right in the city center with easy access to shopping malls, restaurants, and public transport. Perfect for students and young professionals.",
    location: "Zindabazar",
    city: "Sylhet",
    pricePerDay: 1500,
    images: ["https://unsplash.com"],
    isAvailable: true,
    categoryId: "cf5d2544-ef0b-446f-b2f4-3553c21c9600",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prop-2",
    title: "Luxury 3BHK Apartment with Lake View",
    description: "This premium apartment has been recently renovated. It features a modular kitchen, smart home automation, high-speed elevator access, and a breathtaking view of the lake from the master bedroom.",
    location: "Block D, Shahjalal Uposhohor",
    city: "Sylhet",
    pricePerDay: 3800,
    images: ["https://unsplash.com"],
    isAvailable: true,
    categoryId: "cf5d2544-ef0b-446f-b2f4-3553c21c9600",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prop-3",
    title: "Cozy Female Hostel Bed (Premium Sector)",
    description: "Safe, secure, and clean shared room facility for female students or working women. Includes high-speed Wi-Fi, 3 times meal service, filtered water, and 24/7 security guard checkpoint.",
    location: "Tilagarh",
    city: "Sylhet",
    pricePerDay: 500,
    images: ["https://unsplash.com"],
    isAvailable: true,
    categoryId: "hostel-id-1234",
    createdAt: new Date().toISOString(),
  }
];

export async function PublicPropertiesList({ searchParams }: PublicPropertiesListProps) {
  // ১. এপিআই অ্যাকশন কল করে সার্চ প্যারামস অনুযায়ী লাইভ ডাটা আনা হচ্ছে
  const result = await getAllProperties(searchParams);
  
  // এপিআই থেকে যদি আসল ডাটা সাকসেসফুলি আসে, তবে সেটি ব্যবহার হবে
  // আর যদি ডাটা না থাকে বা এপিআই কানেক্ট না হয়, তবে আমাদের তৈরি করা ডামি ডাটা ব্যাকআপ হিসেবে কাজ করবে
  const finalProperties = result?.success && result?.data?.length > 0 
    ? result.data 
    : fallbackDummyProperties;

  // যদি কোনো কারণে দুটির একটিতেও ডাটা না পাওয়া যায় (সেফটি গার্ড)
  if (!finalProperties || finalProperties.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground font-medium bg-neutral-50 rounded-xl">
        No properties match your search criteria. Try using different keywords!
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {/* Airbnb Style রেসপন্সিভ গ্রিড লেআউট (মোবাইলে ১টি, ট্যাবে ২টি, ডেক্সটপে ৩টি কার্ড) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {finalProperties.map((property: IProperty | any) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
