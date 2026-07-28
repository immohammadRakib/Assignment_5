"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareIcon, MapPinIcon, DollarSignIcon, HomeIcon } from "lucide-react";
import Image from "next/image";
import { PropertyFormDialog } from "./propertyFormDialog"; 

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
  _count?: {
    reviews?: number; 
  };
  reviews?: any[];
}

type MyPropertyCardProps = {
  property: IProperty;
};

export function MyPropertyCard({ property }: MyPropertyCardProps) {
  const reviewCount = property._count?.reviews ?? property.reviews?.length ?? 0;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full h-48 bg-muted">
        <Image
          src={property.images?.[0] || "https://unsplash.com"}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-w-768px) 100vw, 33vw"
          priority={false}
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {property.isAvailable ? (
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Available</Badge>
          ) : (
            <Badge variant="destructive">Rented</Badge>
          )}
        </div>
      </div>

      <CardHeader className="pt-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPinIcon className="size-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{property.location}, {property.city}</span>
          </div>
          <CardAction>
            <PropertyFormDialog mode="edit" property={property} />
          </CardAction>
        </div>

        <CardTitle className="text-lg font-bold text-gray-800 line-clamp-1 mt-1">
          {property.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground whitespace-pre-line">
          {property.description}
        </p>

        <div className="border-t pt-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center text-gray-900 font-semibold text-sm">
            <span className="text-rose-500 font-bold">৳{property.pricePerDay}</span>
            <span className="text-muted-foreground text-xs font-normal"> / day</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span>{new Date(property.createdAt).toLocaleDateString()}</span>
            {reviewCount > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquareIcon className="size-3.5 text-gray-400" />
                {reviewCount}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
