'use client';

import { useUserStore } from '@/app/store/userStore'; 
import { useQueryClient } from '@tanstack/react-query'; 
import { Building2, User, Layers, CheckCircle2, Ban, DollarSign, MapPin, Eye, Info, EyeOff, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function PropertyRow({ property }: { property: any }) {
  const queryClient = useQueryClient();
  
  // Zustand গ্লোবাল স্টেট কানেকশন (চোখ অন/অফ ট্র্যাক করার জন্য)
  const { expandedPropertyId, setExpandedPropertyId } = useUserStore();
  const isExpanded = expandedPropertyId === property.id;

  const API_BASE = process.env.BACKEND_API_URL || 'https://assignment-4-vnjw.onrender.com';
  
  // 🚀 আপনার ব্যাকএন্ড ডাটাবেজ এনাম অনুযায়ী ডিফল্ট PENDING
  const status = property.status || 'PENDING'; 

  // 🔧 প্রপার্টি স্ট্যাটাস আপডেট করার ফাংশন (🚀 এনাম টাইপ ফিক্সড করা হয়েছে)
  const handleStatusUpdate = async (newStatus: 'APPROVED' | 'REJECTED' | 'PENDING') => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('rentnest_token') : null;
    try {
      const res = await fetch(`${API_BASE}/api/admin/properties/change-status/${property.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': token } : {})
        },
        credentials: 'include', // CORS ব্লক ভাঙার জন্য
        body: JSON.stringify({ status: newStatus }), // 🚀 এখানে এখন ডাটাবেজ এনাম অনুযায়ী সঠিক মান যাবে
      });

      if (res.ok) {
        toast.success(`Property successfully marked as ${newStatus}`);
        queryClient.invalidateQueries({ queryKey: ['adminProperties'] }); // তানস্ট্যাক কুয়েরি ক্যাশ ইনস্ট্যান্ট রিফ্রেশ
      } else {
        toast.error('Server validation error. Check enum fields.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Network connection failed!');
    }
  };

  const displayPrice = property.price || property.pricePerDay || 'N/A';

  return (
    <div className={`bg-white transition-all ${isExpanded ? 'bg-slate-50/40 shadow-inner' : 'hover:bg-slate-50/30'}`}>
      
      {/* 🌟 মেইন লিস্ট রো লেআউট */}
      <div 
        onClick={() => setExpandedPropertyId(isExpanded ? null : property.id)} 
        className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-6 py-4 cursor-pointer text-slate-700 select-none group"
      >
        {/* প্রপার্টি নাম ও বিল্ডিং লোগো */}
        <div className="col-span-1 lg:col-span-4 flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${
            status === 'PENDING' ? 'bg-amber-50 text-amber-500' : 
            status === 'REJECTED' ? 'bg-red-50 text-red-500' : 
            'bg-rose-50 text-rose-500'
          }`}>
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{property.title || 'Premium Rental Unit'}</h3>
          </div>
        </div>

        {/* ল্যান্ডলর্ড / ওনার */}
        <div className="col-span-1 lg:col-span-3 text-sm font-medium text-slate-500 flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400 lg:hidden shrink-0" />
          <span className="truncate">{property.landlord?.name || property.landlordName || 'Unknown Owner'}</span>
        </div>

        {/* ক্যাটাগরি */}
        <div className="col-span-1 lg:col-span-2 text-xs font-bold text-slate-400 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-slate-400 lg:hidden shrink-0" />
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wider">
            {property.category?.name || property.categoryName || 'General'}
          </span>
        </div>

        {/* স্ট্যাটাস ব্যাজ (🚀 REJECTED এর জন্য লাল কালার কনফিগারড) */}
        <div className="col-span-1 lg:col-span-2 text-left lg:text-center">
          <span className={`px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase border ${
            status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
            status === 'PENDING' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
            'bg-red-50 text-red-600 border border-red-100'
          }`}>
            {status}
          </span>
        </div>

        {/* চোখ অন/অফ আইকন */}
        <div className="col-span-1 lg:col-span-1 text-right flex items-center justify-end gap-2">
          {isExpanded ? (
            <EyeOff className="w-4 h-4 text-amber-500 transition-all scale-110" />
          ) : (
            <Eye className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:scale-110 transition-all" />
          )}
        </div>
      </div>

      {/* 🔓 এক্সপ্যান্ডেবল ডিটেইলস প্যানেল */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/30 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            
            {/* 💰 প্রাইস কার্ড */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="p-2.5 bg-rose-50 text-rose-500 rounded-xl">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Rent Price</p>
                <p className="text-sm font-black text-slate-800">{displayPrice} BDT/Day</p>
              </div>
            </div>

            {/* 📍 লোকেশন কার্ড */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 md:col-span-2">
              <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="w-full min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Property Address / Area</p>
                <p className="text-sm font-bold text-slate-700 truncate">{property.location || 'Address Details Not Provided'}</p>
              </div>
            </div>

            {/* 📝 ডেসক্রিপশন বক্স */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm md:col-span-3 space-y-2">
              <p className="font-semibold text-slate-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" /> Landlord's Description
              </p>
              <p className="text-xs leading-relaxed text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                {property.description || 'No additional descriptive text shared for this submission.'}
              </p>
            </div>
          </div>

          {/* 🛠️ আপনার ডাটাবেজ এনাম (APPROVED, REJECTED, PENDING) অনুযায়ী ৩টি অ্যাকশন বাটন কন্ট্রোলস */}
          <div className="flex flex-wrap items-center gap-2 w-full justify-end pt-4 mt-3 border-t border-slate-100">
            
            {/* বাটন ১: APPROVED */}
            {status !== 'APPROVED' && (
              <button
                onClick={() => handleStatusUpdate('APPROVED')}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition-all shadow-sm shadow-emerald-600/10 cursor-pointer active:scale-95"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Approve Property
              </button>
            )}

            {/* বাটন ২: REJECTED (🚀 ডাটাবেজের সাথে ম্যাচ করতে REJECTED পাস হচ্ছে) */}
            {status !== 'REJECTED' && (
              <button
                onClick={() => handleStatusUpdate('REJECTED')}
                className="flex items-center gap-1.5 px-4 py-2 bg-red-50 border border-red-100 text-red-600 text-xs font-black rounded-xl transition-all cursor-pointer hover:bg-red-100 active:scale-95"
              >
                <Ban className="w-3.5 h-3.5" /> Reject Listing
              </button>
            )}

            {/* বাটন ৩: PENDING */}
            {status !== 'PENDING' && (
              <button
                onClick={() => handleStatusUpdate('PENDING')}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black rounded-xl transition-all cursor-pointer hover:bg-amber-100 active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-vert to Pending
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
