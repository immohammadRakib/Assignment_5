"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function PropertySearchBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // ডিবান্স টাইমার ট্র্যাকিং রেফারেন্স
  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    // ৫০০ মিলি-সেকেন্ড ডিবান্স হ্যান্ডলার
    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value) {
        // RentNest ব্যাকএন্ড অ্যাকশন অনুযায়ী কুয়েরি প্যারামিটার 'search' সেট করা হলো
        params.set("search", value);
      } else {
        params.delete("search");
      }
      
      // সার্চ চেঞ্জের সাথে সাথে ইউআরএল আপডেট (রাউটার রিফ্লেকশন)
      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* সার্চ আইকন (Airbnb Rose Accent) */}
      <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-rose-500" />
      
      <Input
        defaultValue={searchParams.get("search")?.toString() ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search properties by title, location, or city..."
        className="pl-11 pr-4 h-11 bg-white border border-neutral-200 rounded-full shadow-sm focus-visible:ring-rose-500 focus-visible:border-rose-500 transition duration-200 text-sm"
      />
    </div>
  );
}
