// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Search, MapPin } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function Hero() {
//   const router = useRouter();
//   const [query, setQuery] = useState("");

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (query.trim()) {
//       router.push(`/properties?search=${encodeURIComponent(query)}`);
//     }
//   };

//   return (
//     <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden bg-slate-900">
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 blur-[2px]" 
//         style={{ backgroundImage: `url('https://www.thespruce.com/thmb/QeB-IPpXBpEnmPAfNQ7xXOxHnVQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Have-it-all-studio-apartment-587e9d153df78c17b6d4f076.jpg')` }} 
//       />
      
//       <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 via-black/50 to-rose-900/40 z-0" />

//       <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 text-white">
        
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.6 }}
//           className="text-4xl md:text-6xl font-black tracking-tight leading-[1.15] drop-shadow-md"
//         >
//           Find homes that <br className="hidden md:inline" />
//           match your <span className="text-[#FF385C] bg-white/10 px-4 py-1 rounded-2xl backdrop-blur-sm inline-block md:inline mt-2 md:mt-0">lifestyle.</span>
//         </motion.h1>

//         <motion.p 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="text-slate-200 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-medium drop-shadow"
//         >
//           Discover curated stays and unique spaces designed for your comfort. Your perfect getaway is just a search away.
//         </motion.p>

//         <motion.form 
//           onSubmit={handleSearch} 
//           initial={{ opacity: 0, y: 25 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ delay: 0.4, duration: 0.6 }} 
//           whileHover={{ scale: 1.02 }}
//           className="max-w-xl mx-auto mt-10 bg-white/95 backdrop-blur-md p-2 rounded-full border border-rose-200/30 shadow-2xl shadow-rose-950/50 flex items-center transition-all focus-within:ring-2 focus-within:ring-[#FF385C]/50" 
//         >
//           <div className="flex-1 flex items-center px-4 gap-3">
//             <MapPin className="text-[#FF385C] w-5 h-5 shrink-0 stroke-[2.5px] animate-pulse" />
//             <input 
//               type="text" 
//               placeholder="Where is your next adventure?" 
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="w-full bg-transparent border-none p-0 text-slate-800 text-sm md:text-base font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-0" 
//             />
//           </div>
//           <div className="shrink-0">
//             <button 
//               type="submit" 
//               className="h-11 md:h-12 px-6 md:px-8 bg-[#FF385C] hover:bg-[#E31C5F] text-white font-bold text-sm rounded-full transition-all active:scale-95 cursor-pointer flex items-center gap-2 shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50"
//             >
//               <Search className="w-4 h-4 stroke-[3px]" />
//               <span className="hidden sm:inline">Search</span>
//             </button>
//           </div>
//         </motion.form>
//       </div>
//     </section>
//   );
// }





"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/properties?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden bg-slate-900">
      {/* ব্যাকগ্রাউন্ড ইমেজ */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 blur-[2px] opacity-100 dark:opacity-80 transition-opacity" 
        style={{ backgroundImage: `url('https://www.thespruce.com/thmb/QeB-IPpXBpEnmPAfNQ7xXOxHnVQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Have-it-all-studio-apartment-587e9d153df78c17b6d4f076.jpg')` }} 
      />
      {/* ওভারলে গ্রাডিয়েন্ট লেয়ার */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 via-black/60 to-rose-900/40 z-0 dark:from-black/60 dark:via-black/75 dark:to-slate-950/60" />
      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 text-white">
        {/* মেইন টাইটেল */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-4xl md:text-6xl font-black tracking-tight leading-[1.15] drop-shadow-md"
        >
          Find homes that <br className="hidden md:inline" /> match your{" "}
          <span className="text-[#FF385C] bg-white/10 px-4 py-1 rounded-2xl backdrop-blur-sm inline-block md:inline mt-2 md:mt-0 dark:text-rose-400 dark:bg-white/5">
            lifestyle.
          </span>
        </motion.h1>

        {/* সাব-টাইটেল ডেসক্রিপশন */}
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }} 
          className="text-slate-200 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-medium drop-shadow dark:text-slate-300"
        >
          Discover curated stays and unique spaces designed for your comfort. Your perfect getaway is just a search away.
        </motion.p>
            {/* 🎯 মেইন সার্চ ফর্ম উইথ ডার্ক গ্লাস মরফিজম টিউনিং */}
        <motion.form 
          onSubmit={handleSearch} 
          initial={{ opacity: 0, y: 25 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 0.6 }} 
          whileHover={{ scale: 1.02 }} 
          className="max-w-xl mx-auto mt-10 bg-white/95 backdrop-blur-md p-2 rounded-full border border-rose-200/30 shadow-2xl shadow-rose-950/50 flex items-center transition-all focus-within:ring-2 focus-within:ring-[#FF385C]/50 dark:bg-slate-900/80 dark:border-slate-800 dark:shadow-black/60"
        >
          <div className="flex-1 flex items-center px-4 gap-3">
            <MapPin className="text-[#FF385C] w-5 h-5 shrink-0 stroke-[2.5px] animate-pulse dark:text-rose-400" />
            <input 
              type="text" 
              placeholder="Where is your next adventure?" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              className="w-full bg-transparent border-none p-0 text-slate-800 text-sm md:text-base font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-0 dark:text-slate-100 dark:placeholder:text-slate-500" 
            />
          </div> 
          
          <div className="shrink-0">
            <button 
              type="submit" 
              className="h-11 md:h-12 px-6 md:px-8 bg-[#FF385C] hover:bg-[#E31C5F] text-white font-bold text-sm rounded-full transition-all active:scale-95 cursor-pointer flex items-center gap-2 shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 dark:bg-rose-600 dark:hover:bg-rose-700 dark:shadow-rose-950/20"
            >
              <Search className="w-4 h-4 stroke-[3px]" /> 
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
