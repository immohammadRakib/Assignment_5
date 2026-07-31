

import { create } from 'zustand';

interface UserState {
  expandedUserId: string | null;
  setExpandedUserId: (id: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  expandedUserId: null,
  setExpandedUserId: (id) => set({ expandedUserId: id }),
}));

