'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Eye, EyeOff, FolderOpen, Home, Compass } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug?: string;
}

interface CategoryRowProps {
  category: Category;
  allProperties: any[];
  onDeleteClick: (id: string) => void;
}

export default function CategoryRow({ category, allProperties, onDeleteClick }: CategoryRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 🎯 আল্টিমেট স্মার্ট ফিল্টারিং ম্যাচিং নো-ফেল লজিক:
  const liveCount = Array.isArray(allProperties)
    ? allProperties.filter((property) => {
        // ১. সরাসরি ক্যাটাগরি আইডি ম্যাচিং
        const isIdMatch = property?.categoryId === category.id;
        
        // ২. নেস্টেড ক্যাটাগরি অবজেক্ট আইডি ম্যাচিং
        const isNestedIdMatch = property?.category?.id === category.id;
        
        // ৩. ব্যাকআপ নেম-বেসড স্ট্রিক্ট ম্যাচিং (জাস্ট ইন কেস আইডি সিঙ্ক না থাকলে)
        const isNameMatch = property?.category?.name?.toLowerCase().trim() === category.name?.toLowerCase().trim();

        return isIdMatch || isNestedIdMatch || isNameMatch;
      }).length
    : 0;

  return (
    <div className={`bg-white rounded-xl border transition-all duration-200 ${isExpanded ? 'border-rose-200 shadow-md ring-1 ring-rose-50' : 'border-slate-100 hover:border-slate-200'}`}>
      
      {/* মেইন রো */}
      <div className="flex items-center justify-between p-4.5">
        <div className="flex items-center gap-3.5">
          <div className={`p-2 rounded-xl transition-colors ${isExpanded ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400'}`}>
            <FolderOpen className="w-4.5 h-4.5" />
          </div>
          <span className="font-extrabold text-sm text-slate-700 tracking-tight">{category.name}</span>
        </div>

        {/* বাটন গ্রুপ */}
        <div className="flex items-center gap-1.5">
          <button onClick={() => setIsExpanded(!isExpanded)} className={`p-2 rounded-xl transition-all ${isExpanded ? 'bg-rose-50 text-rose-500 shadow-inner' : 'text-slate-400 hover:text-slate-600'}`}>
            {isExpanded ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
          </button>
          <button onClick={() => onDeleteClick(category.id)} className="p-2 text-slate-400 hover:text-red-500 rounded-xl">
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* 👁️ চোখ বাটনের ইন্টারেক্টিভ ড্রপডাউন প্যানেল */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-3 border-t border-slate-50 bg-slate-50/40 rounded-b-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs animate-fadeIn">
          
          <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs flex items-center gap-3 w-full sm:w-auto min-w-[200px]">
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg"><Home className="w-4 h-4" /></div>
            <div>
              <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Database Status</p>
              <p className="text-slate-700 font-black text-sm mt-0.5">{liveCount} Active Listings</p>
            </div>
          </div>

          <Link 
            href={`/properties?search=${encodeURIComponent(category.name.toLowerCase())}`} 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-rose-600 active:bg-rose-700 transition-all shadow-sm group"
          >
            <Compass className="w-4 h-4 text-rose-400 group-hover:text-white transition-colors" />
            Explore {category.name} →
          </Link>

        </div>
      )}
    </div>
  );
}
