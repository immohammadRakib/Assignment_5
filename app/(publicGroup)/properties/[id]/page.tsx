
import { getPropertyDetails } from "@/app/(publicGroup)/_actions/propertiesAction";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, CalendarIcon, ShieldCheckIcon, StarIcon, HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RentalRequestModal } from "../../_components/properties/rentalRequest";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import PropertyReviewsList from "../../_components/properties/propertyReviewList";

export const dynamic = "force-dynamic";
export const dynamicParams = true; 
export const revalidate = 0;

type PropertyByIdPageProps = {
  params: Promise<{ id: string }>;
};

const SYSTEM_FALLBACK_IMAGE = "https://img.magnific.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg";

export default async function PropertyByIdPage({ params }: PropertyByIdPageProps) {
  const { id } = await params;
  
  let result;
  try {
    result = await getPropertyDetails(id);
  } catch (error) {
    console.error("Failed to fetch property details:", error);
    return notFound();
  }

  if (!result || !result.success || !result.data) {
    return notFound();
  }

  const property = result.data;

  const firstImage = property?.images?.[0];
  const hasValidImage = 
    firstImage && 
    typeof firstImage === "string" &&
    firstImage.trim() !== "" &&
    firstImage !== "https://unsplash.com" &&
    firstImage !== "https://google.com" &&
    (firstImage.includes("http") || firstImage.includes("/"));

  const activeImage = hasValidImage ? firstImage : SYSTEM_FALLBACK_IMAGE;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-screen select-none space-y-8">
      {/* ব্যাক লিঙ্ক */}
      <div>
        <Link href="/properties" className="text-xs font-black text-[#FF385C] uppercase tracking-widest hover:underline flex items-center gap-1">
          ← Back to all properties
        </Link>
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl font-black tracking-tighter text-slate-900 md:text-4xl leading-tight">
          {property.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-500">
          <div className="flex items-center gap-1 text-slate-600 font-black">
            <MapPinIcon className="w-4 h-4 text-[#FF385C]" />
            <span>{property.location}, {property.city}</span>
          </div>
          {property.isAvailable ? (
            <Badge className="bg-emerald-500 text-white font-black rounded-lg border-none px-3 py-1 text-[10px]">
              Available for Rent
            </Badge>
          ) : (
            <Badge variant="destructive" className="font-black rounded-lg border-none px-3 py-1 text-[10px]">
              Currently Rented
            </Badge>
          )}
        </div>
      </div>

      <div className="relative w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 bg-neutral-50 transform hover:scale-[1.002] transition-transform duration-500">
        <Image 
          src={activeImage} 
          unoptimized 
          alt={property.title || "Property Image"} 
          fill 
          className="object-cover" 
          priority 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
    
        <div className="lg:col-span-2 space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-2">
              <HomeIcon className="w-5 h-5 text-slate-500" /> Entire rental unit hosted by Landlord
            </h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              Listed on {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : "N/A"} · 1 Bedroom · 1 Bath · Premium Security
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-black uppercase tracking-wider text-slate-400">About this space</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm md:text-base font-medium">
              {property.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex gap-3 items-start bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
              <ShieldCheckIcon className="w-5 h-5 text-[#FF385C] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-sm text-slate-800 tracking-tight">Verified Property</h4>
                <p className="text-xs text-slate-500 font-medium">Background checked by RentNest admin panel structure.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
              <CalendarIcon className="w-5 h-5 text-[#FF385C] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-sm text-slate-800 tracking-tight">Flexible Rental Duration</h4>
                <p className="text-xs text-slate-500 font-medium">Rent safely on a daily/monthly lease framework with ease.</p>
              </div>
            </div>
          </div>

          <PropertyReviewsList propertyId={id} />
        </div>

        <div className="border border-slate-200/80 rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-slate-100/70 bg-white sticky top-24 space-y-6 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full blur-2xl opacity-40 pointer-events-none" />
          <div className="flex items-baseline justify-between border-b border-slate-100 pb-4 relative z-10">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Rental Rate</p>
              <div className="text-2xl font-black text-slate-800 tracking-tight flex items-baseline gap-0.5">
                <span>৳{property.pricePerDay}</span>
                <span className="text-xs font-bold text-slate-400 uppercase ml-0.5">/ day</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-rose-50/60 border border-rose-100/50 px-2.5 py-1 rounded-xl text-xs font-black text-[#FF385C]">
              <StarIcon className="w-3.5 h-3.5 fill-[#FF385C]" /> 4.8
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-500 font-semibold bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
            <div className="flex justify-between">
              <span>Base Stay Charge</span>
              <span className="text-slate-800">৳{property.pricePerDay} × 1 night</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-black uppercase text-[10px] tracking-wider">
              <span>Booking Processing Fee</span>
              <span>৳0 (Free Integration)</span>
            </div>
          </div>

          <div className="relative z-10 w-full">
            {property.isAvailable ? (
              <RentalRequestModal propertyId={id} price={property.pricePerDay} />
            ) : (
              <Button disabled className="w-full h-12 bg-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest rounded-xl border border-slate-200 cursor-not-allowed shadow-none" >
                Already Booked / Rented
              </Button>
            )}
          </div>
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
            You won't be charged yet until the host reviews and approves your submission request.
          </p>
        </div>
      </div>
    </div>
  );
}


