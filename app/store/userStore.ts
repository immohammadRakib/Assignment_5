import { create } from 'zustand';

interface StoreState {
  expandedUserId: string | null;
  setExpandedUserId: (id: string | null) => void;
  expandedPropertyId: string | null;
  setExpandedPropertyId: (id: string | null) => void;
  expandedCategoryId: string | null;
  setExpandedCategoryId: (id: string | null) => void;
}

export const useUserStore = create<StoreState>((set) => ({
  expandedUserId: null,
  setExpandedUserId: (id) => set({ expandedUserId: id }),
  expandedPropertyId: null,
  setExpandedPropertyId: (id) => set({ expandedPropertyId: id }),
  expandedCategoryId: null,
  setExpandedCategoryId: (id) => set({ expandedCategoryId: id }),
}));
