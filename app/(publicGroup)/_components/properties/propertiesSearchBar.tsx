"use client";

import { Search, MapPin} from "lucide-react";
import { motion } from "framer-motion";
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
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-rose-200/30 shadow-xl shadow-rose-950/5 flex items-center transition-all focus-within:ring-2 focus-within:ring-[#FF385C]/50" >
        <div className="flex-1 flex items-center px-4 gap-3">
          <MapPin className="text-[#FF385C] w-4 h-4 md:w-5 md:h-5 shrink-0 stroke-[2.5px] animate-pulse" />
          <input 
            type="text" 
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search properties by title, location, or city..." 
            className="w-full bg-transparent border-none p-0 text-slate-800 text-xs md:text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-0" 
          />
        </div>

        <div className="shrink-0">
          <div className="h-9 md:h-10 px-4 md:px-5 bg-[#FF385C] text-white font-bold text-xs rounded-full flex items-center gap-1.5 shadow-md shadow-rose-500/20" >
            <Search className="w-3.5 h-3.5 stroke-[3px]" />
            <span className="hidden sm:inline">Search</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}




