"use client";

export function MyPropertiesSkeleton() {
  return (
    // Airbnb Style রেসপন্সিভ গ্রিড লেআউট (কার্ডের গ্রিডের সাথে হুবহু মিল রেখে)
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border border-neutral-100 rounded-xl overflow-hidden bg-white space-y-4 pb-5 shadow-sm">
          
          {/* ১. ইমেজের জন্য স্কেলেটন প্লেসহোল্ডার */}
          <div className="w-full h-48 bg-neutral-200 animate-pulse" />
          
          {/* ২. টেক্সট ও কন্টেন্টের জন্য ইনার স্পেসিং */}
          <div className="px-4 space-y-3">
            {/* লোকেশন এবং একশন বাটনের জন্য */}
            <div className="flex justify-between items-center">
              <div className="h-4 bg-neutral-200 animate-pulse rounded w-1/3" />
              <div className="h-7 bg-neutral-200 animate-pulse rounded-md w-12" />
            </div>
            
            {/* টাইটেল এর জন্য */}
            <div className="h-5 bg-neutral-200 animate-pulse rounded w-3/4" />
            
            {/* ডেসক্রিপশন লাইনের জন্য */}
            <div className="space-y-1.5 pt-1">
              <div className="h-3 bg-neutral-200 animate-pulse rounded w-full" />
              <div className="h-3 bg-neutral-200 animate-pulse rounded w-5/6" />
            </div>

            {/* নিচের প্রাইস এবং ডেটের জন্য */}
            <div className="border-t pt-3 flex justify-between items-center">
              <div className="h-5 bg-neutral-200 animate-pulse rounded w-20" />
              <div className="h-4 bg-neutral-200 animate-pulse rounded w-24" />
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
