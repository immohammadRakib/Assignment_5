import { getPropertyDetails } from "@/app/(publicGroup)/_actions/propertiesAction"; 
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, CalendarIcon, ShieldCheckIcon, StarIcon, HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RentalRequestModal } from "../../_components/properties/rentalRequest"; 
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button"; 

type PropertyByIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyByIdPage({ params }: PropertyByIdPageProps) {
  const { id } = await params;
  const result = await getPropertyDetails(id);
  
  // 🎯 ফিক্স: ডামী ডাটা সম্পূর্ণ রিমুভড। সফল ডাটা না আসলে সরাসরি ৪0৪ পেজে পাঠাবে
  if (!result || !result.success || !result.data) {
    return notFound();
  }

  const property = result.data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-screen select-none">
      
      <div className="mb-6">
        <Link href="/properties" className="text-sm font-bold text-rose-500 hover:underline">
          ← Back to all properties
        </Link>
      </div>

      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 md:text-3xl">
          {property.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <StarIcon className="size-4 text-amber-500 fill-amber-500" />
            <span className="font-bold text-gray-800">4.8 (12 reviews)</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <MapPinIcon className="size-4 text-rose-500" />
            <span>{property.location}, {property.city}</span>
          </div>
          {property.isAvailable ? (
            <Badge className="bg-emerald-500 text-white font-semibold rounded-lg border-none px-2.5 py-1">
              Available for Rent
            </Badge>
          ) : (
            <Badge variant="destructive" className="font-semibold rounded-lg border-none px-2.5 py-1">
              Currently Rented
            </Badge>
          )}
        </div>
      </div>

      <div className="relative w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-md mb-8 bg-neutral-50">
        <Image 
  // 🎯 ফাইনাল ফিক্স: এখানে চেক করা হবে images ফিল্ডটি ট্রুথফুল কিনা, অ্যারেতে ডাটা আছে কিনা এবং প্রথম ভ্যালুটি ফাঁকা স্ট্রিং ("") কিনা।
  src={
    property.images && 
    property.images.length > 0 && 
    property.images[0] !== "" 
      ? property.images[0] 
      : "https://unsplash.com"
  } 
  unoptimized 
  alt={property.title} 
  fill 
  className="object-cover" 
  priority 
/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <HomeIcon className="size-5 text-gray-600" /> Entire rental unit hosted by Landlord
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              Listed on {new Date(property.createdAt).toLocaleDateString()} · 1 Bedroom · 1 Bath · Smart Home
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">About this space</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base font-medium">
              {property.description}
            </p>
          </div>

          <div className="border-t pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-3 items-start bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
              <ShieldCheckIcon className="size-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-gray-800">Verified Property</h4>
                <p className="text-xs text-muted-foreground font-medium">Background checked by RentNest admin panel.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
              <CalendarIcon className="size-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-gray-800">Flexible Rental Duration</h4>
                <p className="text-xs text-muted-foreground font-medium">Rent on a daily basis with automated check-out.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-neutral-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-neutral-100/40 bg-white sticky top-24 space-y-6 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full blur-2xl opacity-40" />
          
          <div className="flex items-baseline justify-between border-b border-neutral-100/80 pb-4 relative z-10">
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Rental Rate</p>
              <div className="text-2xl font-black text-gray-900 flex items-baseline gap-0.5">
                <span>৳{property.pricePerDay}</span>
                <span className="text-xs font-semibold text-neutral-400">/ day</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-neutral-50 border border-neutral-150 px-2 py-1 rounded-lg text-xs font-bold text-gray-700">
              <StarIcon className="size-3.5 text-amber-500 fill-amber-500" /> 4.8
            </div>
          </div>

          <div className="space-y-2 text-xs text-neutral-500 font-medium bg-neutral-50/60 p-3 rounded-2xl border border-neutral-100/40">
            <div className="flex justify-between">
              <span>Base Stay Charge</span>
              <span className="text-neutral-800">৳{property.pricePerDay} × 1 night</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>Booking Processing Fee</span>
              <span>৳0 (Free)</span>
            </div>
          </div>

          {/* রেন্টাল বুকিং মডাল কন্ডিশনাল রেন্ডারিং */}
          <div className="relative z-10 w-full">
            {property.isAvailable ? (
              <RentalRequestModal propertyId={id} price={property.pricePerDay} />
            ) : (
              <Button 
                disabled 
                className="w-full h-12 bg-neutral-150 text-neutral-400 font-bold text-sm rounded-xl border border-neutral-200 cursor-not-allowed shadow-none"
              >
                Already Booked / Rented
              </Button>
            )}
          </div>
          
          {/* <p className="text-center text-[10px] text-muted-foreground font-medium">
            You won&apos;t be charged yet until the host reviews and approves your request.
          </p> */}
        </div>

      </div>
    </div>
  );
}
