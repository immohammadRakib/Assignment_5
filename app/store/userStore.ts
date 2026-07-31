import { create } from 'zustand';

interface StoreState {
  expandedUserId: string | null;
  setExpandedUserId: (id: string | null) => void;
  expandedPropertyId: string | null;
  setExpandedPropertyId: (id: string | null) => void;
  // 🚀 ক্যাটাগরি রো এক্সপ্যান্ড ট্র্যাক করার জন্য নতুন স্টেট
  expandedCategoryId: string | null;
  setExpandedCategoryId: (id: string | null) => void;
}

export const useUserStore = create<StoreState>((set) => ({
  expandedUserId: null,
  setExpandedUserId: (id) => set({ expandedUserId: id }),
  expandedPropertyId: null,
  setExpandedPropertyId: (id) => set({ expandedPropertyId: id }),
  
  // ক্যাটাগরির জন্য ইনিশিয়াল ভ্যালু
  expandedCategoryId: null,
  setExpandedCategoryId: (id) => set({ expandedCategoryId: id }),
}));
