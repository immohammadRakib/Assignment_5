"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    toast.error("Access Denied: You do not have permission to view this page!", {
      id: "unauthorized-toast",
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="p-4 bg-rose-50 rounded-full text-rose-500 mb-4 animate-bounce">
        <ShieldAlert className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        403 - Restricted Access
      </h1>
      <p className="text-gray-500 max-w-md mt-2 text-sm">
        Oops! It looks like your account type does not have the necessary permissions to access this specific dashboard.
      </p>
      
      <div className="flex gap-4 mt-6">
        <Button 
          onClick={() => router.push("/")}
          className="bg-rose-500 hover:bg-rose-600 text-white cursor-pointer"
        >
          Go to Home
        </Button>
        <Button 
          variant="outline" 
          onClick={() => router.back()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Button>
      </div>
    </div>
  );
}
