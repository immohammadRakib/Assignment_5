"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareIcon, MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

export function PropertyCard({ property }: PropertyCardProps) {
  const reviewCount = property._count?.reviews ?? property.reviews?.length ?? 0;

  return (
    <Card className="overflow-hidden group hover:shadow-md transition duration-200 bg-white border border-neutral-100 rounded-xl">
      
      <Link href={`/properties/${property.id}`} className="block relative w-full h-56 bg-neutral-100 overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <Image
            src={property.images[0]} 
            unoptimized
            alt={property.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-xs text-muted-foreground">
            No Image Available
          </div>
        )}

        <div className="absolute top-3 left-3">
          {property.isAvailable ? (
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium">Available</Badge>
          ) : (
            <Badge variant="destructive">Rented</Badge>
          )}
        </div>
      </Link>

      <CardHeader className="p-4 pb-0">
        <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
          <div className="flex items-center gap-1 text-gray-500 font-medium">
            <MapPinIcon className="size-3.5 text-rose-500" />
            <span>{property.location}, {property.city}</span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-gray-800">
            <StarIcon className="size-3 text-amber-500 fill-amber-500" />
            <span>{reviewCount > 0 ? `${reviewCount} Reviews` : "New"}</span>
          </div>
        </div>

        <Link href={`/properties/${property.id}`} className="block mt-1">
          <CardTitle className="text-base font-bold text-gray-805 hover:text-rose-500 transition-colors line-clamp-1">
            {property.title}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-3">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {property.description}
        </p>

        <div className="border-t pt-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="text-sm font-bold text-gray-900">
            <span className="text-rose-500 font-extrabold text-base">৳{property.pricePerDay}</span>
            <span className="font-normal text-xs text-gray-500"> / night</span>
          </div>
          
          <span className="text-neutral-400">
            Listed: {new Date(property.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>

    </Card>
  );
}
