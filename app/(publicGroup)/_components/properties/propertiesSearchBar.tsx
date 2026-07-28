"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export function PropertySearchBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [value, setValue] = useState(searchParams.get("search") ?? "");
  
  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setValue(searchParams.get("search") ?? "");
  }, [searchParams]);

  const handleChange = (newValue: string) => {
    setValue(newValue);

    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (newValue) {
        params.set("search", newValue);
      } else {
        params.delete("search");
      }
      
      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-rose-500" />
      
      <Input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search properties by title, location, or city..."
        className="pl-11 pr-4 h-11 bg-white border border-neutral-200 rounded-full shadow-sm focus-visible:ring-rose-500 focus-visible:border-rose-500 transition duration-200 text-sm"
      />
    </div>
  );
}
