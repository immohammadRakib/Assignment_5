"use client";

import { Rocket } from "lucide-react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        
        {/* রকেট লঞ্চ এনিমেশন */}
        <div className="mb-6 relative animate-bounce">
          {/* মেইন রকেট */}
          <Rocket 
            size={64} 
            className="text-rose-500 transform -rotate-45 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" 
          />
          
          {/* রকেটের নিচের আগুনের ইফেক্ট */}
          <div className="absolute -bottom-3 -left-2 flex gap-1.5">
            <span className="h-3 w-3 bg-rose-500 rounded-full animate-ping opacity-75"></span>
            <span className="h-2 w-2 bg-orange-400 rounded-full animate-ping delay-150 opacity-75"></span>
            <span className="h-1.5 w-1.5 bg-yellow-300 rounded-full animate-ping delay-300 opacity-75"></span>
          </div>
        </div>

        {/* টেক্সট সেকশন */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter animate-pulse">
            RENT NEST
          </h2>
          
          {/* টাইপিং এনিমেশন (তোমার CSS থেকে animate-typing ইউজ করা হয়েছে) */}
          <div className="animate-typing mx-auto overflow-hidden">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] whitespace-nowrap">
              Launching Experience...
            </p>
          </div>
        </div>

        {/* প্রগ্রেস বার (তোমার CSS থেকে animate-loading-bar ইউজ করা হয়েছে) */}
        <div className="w-64 h-1 bg-gray-100 rounded-full mt-10 overflow-hidden">
          <div className="h-full bg-rose-500 w-full animate-loading-bar origin-left"></div>
        </div>
      </div>
      
      {/* স্ক্রিনের কোণায় হালকা রোজ গ্লো (ঐচ্ছিক, সৌন্দর্যের জন্য) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-100/30 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-100/30 rounded-full blur-[120px]"></div>
    </div>
  );
};

export default GlobalLoading;
