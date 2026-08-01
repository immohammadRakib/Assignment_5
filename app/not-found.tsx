"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Compass, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-gradient-to-b from-white to-neutral-50/50">
   
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-rose-100 rounded-full scale-150 blur-xl opacity-50 animate-pulse" />
        <div className="relative p-5 bg-white border border-neutral-100 rounded-full shadow-md text-rose-500 animate-bounce">
          <Compass className="w-14 h-14 stroke-[1.5] animate-spin [animation-duration:10s]" />
        </div>
        <AlertCircle className="w-5 h-5 text-rose-400 absolute -bottom-1 -right-1 bg-white rounded-full shadow-sm" />
      </div>

      <div className="space-y-3 max-w-md">
        <h1 className="text-7xl font-extrabold tracking-tighter text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
          404
        </h1>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Page Not Found
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The property, rental unit, or dashboard resource you are looking for has been moved, renamed, or doesn't exist.
        </p>
      </div>

      <div className="mt-8">
        <Link href="/" passHref>
          <Button 
            className="h-11 px-6 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
