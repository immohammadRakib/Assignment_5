
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface IProperty {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  pricePerDay: number;
  images: string[];
  isAvailable: boolean;
  categoryId: string;
  createdAt: string;
  reviews?: any[];
  _count?: {
    reviews?: number;
  };
}

type PropertyCardProps = {
  property: IProperty;
};

const SYSTEM_FALLBACK_IMAGE = "https://img.magnific.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg";

export function PropertyCard({ property }: PropertyCardProps) {
  const reviewCount = property._count?.reviews ?? property.reviews?.length ?? 0;


    const hasValidImage = 
    property.images && 
    property.images.length > 0 && 
    property.images[0] &&
    property.images[0].trim() !== "" &&
    property.images[0] !== "https://unsplash.com" && 
    property.images[0] !== "https://google.com" &&
    (property.images[0].includes("http") || property.images[0].includes("/"));

  const activeImage = hasValidImage
    ? property.images[0]
    : SYSTEM_FALLBACK_IMAGE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
      className="w-full"
    >
      <Card className="overflow-hidden dark:bg-card group hover:shadow-xl transition-all duration-300 bg-white border border-neutral-100 rounded-2xl">
        
        <Link href={`/properties/${property.id}`} className="block relative w-full h-56 bg-neutral-50 overflow-hidden">
          <Image
            src={activeImage}
            unoptimized
            alt={property.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          
          <div className="absolute top-3 left-3 z-10">
            {property.isAvailable ? (
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-2.5 py-1 text-[10px] shadow-sm tracking-wide">
                Available
              </Badge>
            ) : (
              <Badge variant="destructive" className="font-semibold rounded-lg px-2.5 py-1 text-[10px] shadow-sm tracking-wide">
                Rented
              </Badge>
            )}
          </div>
        </Link>

        <CardHeader className="p-4 pb-0">
          <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
            <div className="flex items-center gap-1 text-gray-500 font-medium">
              <MapPinIcon className="size-3.5 text-[#FF385C]" />
              <span className="truncate max-w-[150px]">{property.location}, {property.city}</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-gray-800">
              <StarIcon className="size-3 text-amber-500 fill-amber-500" />
              <span className="dark:text-slate-400">{reviewCount > 0 ? `${reviewCount} Reviews` : "New"}</span>
            </div>
          </div>
          <Link href={`/properties/${property.id}`} className="block mt-1">
            <CardTitle className="text-base font-black text-slate-800 dark:text-white hover:text-[#FF385C] transition-colors line-clamp-1 leading-tight">
              {property.title}
            </CardTitle>
          </Link>
        </CardHeader>

        <CardContent className="p-4 pt-2 space-y-3">
          <p className="line-clamp-2 text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
            {property.description}
          </p>
          
          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between text-xs text-slate-400">
            <div className="text-sm font-bold text-slate-900">
              <span className="text-[#FF385C] font-black text-base">
                ৳{Number(property.pricePerDay || 0).toLocaleString("en-US")}
              </span>
              <span className="font-medium text-xs text-slate-400"> / night</span>
            </div>
            <span className="text-slate-400 font-medium">
              Listed: {new Date(property.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
