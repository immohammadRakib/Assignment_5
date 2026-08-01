"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Home, AlertOctagon } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 bg-white select-none">
      
      <div className="relative mb-10">
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-100 rounded-[100%] animate-[shadow_2s_ease-in-out_infinite]" />
        
        <div className="relative animate-[float_2s_ease-in-out_infinite]">
          <div className="bg-rose-50 p-8 rounded-3xl border-2 border-rose-100/50 shadow-sm">
            <AlertOctagon className="w-20 h-20 text-rose-500 stroke-[1.2]" />
          </div>
          
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-300 rounded-full animate-ping" />
        </div>
      </div>

      <div className="text-center space-y-4 max-w-sm relative">
        <h1 className="text-9xl font-black text-neutral-50/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 tracking-widest pointer-events-none">
          500
        </h1>
        
        <div className="relative">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Something went wrong!
          </h2>
          <p className="text-sm text-neutral-500 mt-3 leading-relaxed">
            An unexpected error occurred while processing your request. Our system has been notified. Please try recovering below!
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-10 w-full sm:w-auto justify-center">
        <Button 
          onClick={() => reset()}
          className="bg-gray-900 hover:bg-black text-white h-12 px-8 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer font-semibold"
        >
          <RefreshCcw className="w-4 h-4 animate-[spin_4s_linear_infinite]" />
          Try Again
        </Button>
        
        <Link href="/" passHref className="w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="w-full h-12 px-8 rounded-2xl border-neutral-200 hover:bg-neutral-50 text-gray-600 font-medium transition-all active:scale-95 flex items-center gap-2 cursor-pointer justify-center"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Button>
        </Link>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shadow {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.4; }
          50% { transform: translateX(-50%) scale(0.7); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
