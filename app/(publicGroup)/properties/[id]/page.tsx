import { getPropertyDetails } from "@/app/(publicGroup)/_actions/propertiesAction"; // তোমার প্রপার্টি অ্যাকশন পাথ মিলিয়ে নিও
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPinIcon, CalendarIcon, ShieldCheckIcon, StarIcon, HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PropertyByIdPageProps = {
  params: Promise<{ id: string }>;
};

const fallbackDetail = {
  title: "Smart Bachelor Studio Apartment",
  description: "Efficiently designed studio with smart home features. Located right in the city center with easy access to shopping malls, restaurants, and public transport. Perfect for students and young professionals. Features high-speed Wi-Fi, modern fittings, 24/7 water supply, and an attached balcony with a city view.",
  location: "Zindabazar",
  city: "Sylhet",
  pricePerDay: 1500,
  images: ["https://unsplash.com"],
  isAvailable: true,
  createdAt: new Date().toISOString(),
};

export default async function PropertyByIdPage({ params }: PropertyByIdPageProps) {

  const { id } = await params;

  const result = await getPropertyDetails(id);
  
  const property = result?.success && result?.data ? result.data : fallbackDetail;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-screen">
      
      <div className="mb-6">
        <Link href="/properties" className="text-sm font-medium text-rose-500 hover:underline">
          ← Back to all properties
        </Link>
      </div>

      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          {property.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <StarIcon className="size-4 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-gray-800">4.8 (12 reviews)</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <MapPinIcon className="size-4 text-rose-500" />
            <span>{property.location}, {property.city}</span>
          </div>
          {property.isAvailable ? (
            <Badge className="bg-emerald-500 text-white font-medium">Available for Rent</Badge>
          ) : (
            <Badge variant="destructive">Currently Rented</Badge>
          )}
        </div>
      </div>

      <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-sm mb-8 bg-neutral-100">
        <Image
          src={property.images?.[0] || fallbackDetail.images[0]}
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
            <h2 className="text-xl font-bold text-gray-850 mb-2 flex items-center gap-2">
              <HomeIcon className="size-5 text-gray-600" /> Entire rental unit hosted by Landlord
            </h2>
            <p className="text-sm text-muted-foreground">
              Listed on {new Date(property.createdAt).toLocaleDateString()} · 1 Bedroom · 1 Bath · Smart Home
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-850">About this space</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {property.description}
            </p>
          </div>

          <div className="border-t pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-3 items-start">
              <ShieldCheckIcon className="size-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-gray-800">Verified Property</h4>
                <p className="text-xs text-muted-foreground">Background checked by RentNest admin panel.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <CalendarIcon className="size-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-gray-800">Flexible Rental Duration</h4>
                <p className="text-xs text-muted-foreground">Rent on a daily basis with automated check-out.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-neutral-200 rounded-2xl p-6 shadow-xl bg-white sticky top-24 space-y-4">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-black text-gray-900">
              ৳{property.pricePerDay}
              <span className="text-sm font-normal text-gray-500"> / day</span>
            </div>
          </div>

          <div className="border rounded-xl divide-y text-xs text-gray-700">
            <div className="grid grid-cols-2 divide-x">
              <div className="p-3 cursor-pointer hover:bg-neutral-50">
                <label className="font-bold block text-[10px] uppercase text-gray-500">Check-In</label>
                <span className="text-gray-700">Select Date</span>
              </div>
              <div className="p-3 cursor-pointer hover:bg-neutral-50">
                <label className="font-bold block text-[10px] uppercase text-gray-500">Check-Out</label>
                <span className="text-gray-700">Select Date</span>
              </div>
            </div>
            <div className="p-3 cursor-pointer hover:bg-neutral-50">
              <label className="font-bold block text-[10px] uppercase text-gray-500">Guests</label>
              <span className="text-gray-700">1 Guest</span>
            </div>
          </div>

          <Button 
            disabled={!property.isAvailable}
            className="w-full h-12 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm rounded-xl shadow-md transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {property.isAvailable ? "Reserve This Stay" : "Already Booked"}
          </Button>
          
          <p className="text-center text-[11px] text-muted-foreground">
            You won&apos;t be charged yet until approval.
          </p>
        </div>

      </div>
    </div>
  );
}
