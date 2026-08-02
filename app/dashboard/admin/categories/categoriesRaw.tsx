'use client';

import { useUserStore } from '@/app/store/userStore';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Tag, Trash2, Eye, EyeOff, Info, Compass, Building, RefreshCw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';


export default function CategoryRow({ category }: { category: any }) {
  // const searchParams = useSearchParams();
  // const categoryFilter = searchParams.get("category"); 
  const queryClient = useQueryClient();
  const router = useRouter();
  // const paramsObj = await searchParams;
    
    const { expandedCategoryId, setExpandedCategoryId } = useUserStore();
    const isExpanded = expandedCategoryId === category.id;
    const API_BASE = process.env.BACKEND_API_URL || 'https://assignment-4-vnjw.onrender.com';

    const propertyCount = category.properties?.length || category._count?.properties || 0;

  const deleteCategoryMutation = useMutation({
    mutationFn: async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('rentnest_token') : null;

      const res = await fetch(`${API_BASE}/api/categories/${category.id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': token } : {})
        },
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Delete failed');
      return res.json();
    },
    onSuccess: () => {
      toast.success('Category removed from system.');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => {
      toast.error('Cannot remove category. Check backend restrictions.');
    }
  });

  return (
    <div className={`bg-white transition-all ${isExpanded ? 'bg-slate-50/40 shadow-inner' : 'hover:bg-slate-50/30'}`}>
      
      {/* 🌟 মেইন লিস্ট রো */}
      <div 
        onClick={() => setExpandedCategoryId(isExpanded ? null : category.id)} 
        className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-6 py-4 cursor-pointer text-slate-700 select-none group"
      >
        {/* ক্যাটাগরি নাম */}
        <div className="col-span-1 lg:col-span-5 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-500 transition-transform group-hover:scale-105">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">{category.name || 'General Tag'}</h3>
          </div>
        </div>

        {/* 🔢 লাইভ প্রপার্টি কাউন্ট ব্যাজ */}
        <div className="col-span-1 lg:col-span-4 text-left lg:text-center">
          <span className="lg:hidden font-bold text-slate-400 text-[11px] uppercase tracking-wider mr-2">Listings:</span>
          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${propertyCount > 0 ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-100 text-slate-400'}`}>
            {propertyCount} Properties
          </span>
        </div>

        {/* চোখ অন/অফ আইকন */}
        <div className="col-span-1 lg:col-span-3 text-right flex items-center justify-end gap-2">
          {isExpanded ? (
            <EyeOff className="w-4 h-4 text-rose-500 scale-110 transition-all" />
          ) : (
            <Eye className="w-4 h-4 text-slate-400 group-hover:text-rose-400 group-hover:scale-110 transition-all" />
          )}
        </div>
      </div>

      {/* 🔓 এক্সপ্যান্ডেবল অ্যাকশন প্যানেল (Explore এবং Delete বাটন সহ) */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-1 border-t border-slate-100 bg-slate-50/30 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            
            {/* ডেসক্রিপশন মেসেজ */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Info className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Slug URL parameter: <strong className="text-slate-700">/{category.slug || 'n-a'}</strong></span>
            </div>

            {/* অ্যাকশন বাটন গ্রুপ */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              
              {/* 🧭 আপনার কাঙ্ক্ষিত Explore বাটন যা সার্চ প্যারামিটার দিয়ে রিডাইরেক্ট করবে */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/properties?search=${category.name}`); // 🚀 মডারেশন পেজে সার্চ প্যারাম সহ পাঠানো
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" /> Explore Properties
              </button>

              {/* ഡিলিট বাটন */}
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  if(confirm('Are you sure you want to completely remove this category?')) {
                    deleteCategoryMutation.mutate();
                  }
                }}
                disabled={deleteCategoryMutation.isPending}
                className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 border border-red-100 text-xs font-black rounded-xl hover:bg-red-100 active:scale-95 transition-all cursor-pointer disabled:opacity-40"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button> */}


              <button
  type="button"
  disabled={deleteCategoryMutation.isPending}
  onClick={(e) => {
    // 🚀 ১. টেবিল বা কার্ডের মেইন ক্লিকে যাতে জ্যাম না লাগে তার জন্য প্রোপাগেশন অফ
    e.stopPropagation();

    // 🚀 ২. [ম্যাজিক ফিক্স] ব্রাউজারের পপআপ ডিলিট করে সোনমোর (Sonner) জোশ টোস্ট অ্যাকশন যোগ
    toast.error("Remove Category?", {
      description: "This will completely delete this category registry from the cloud database.",
      duration: Infinity, // ইউজার অ্যাকশন না নেওয়া পর্যন্ত টোস্ট স্ক্রিনে আটকে থাকবে
      action: {
        label: "Confirm",
        onClick: () => {
          // ৩. ইউজার কনফার্ম বাটনে চাপ দিলে তানস্ট্যাক মিউটেশন ফায়ার হবে
          deleteCategoryMutation.mutate();
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(), // ক্যানসেল চাপলে সুন্দরভাবে ফেইড আউট হয়ে যাবে
      },
    });
  }}
  className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 border border-red-100/60 text-xs font-black rounded-xl hover:bg-red-100 active:scale-95 transition-all cursor-pointer disabled:opacity-40 select-none"
>
  {deleteCategoryMutation.isPending ? (
    <>
        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        <span>Removing...</span>
      </>
    ) : (
    <>
      <Trash2 className="w-3.5 h-3.5" />
      <span>Remove</span>
    </>
  )}
</button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
