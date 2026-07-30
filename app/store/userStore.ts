import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'BLOCKED';
  createdAt: string;
}

interface UserState {
  users: User[]; // ফিক্সড: এটি একটি অ্যারে হবে
  isLoading: boolean;
  expandedUserId: string | null;
  // Actions
  setUsers: (users: User[]) => void; // ফিক্সড: অ্যারে টাইপ
  setExpandedUserId: (id: string | null) => void;
  // এপিআই কল লজিক
  fetchUsers: (apiBase: string) => Promise<void>;
  updateUserStatus: (apiBase: string, userId: string, newStatus: 'ACTIVE' | 'BLOCKED') => Promise<void>; // ফিক্সড: নির্দিষ্ট স্ট্যাটাস টাইপ
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [], // ফিক্সড: ফাঁকা অ্যারে দিয়ে শুরু
  isLoading: false,
  expandedUserId: null,
  setUsers: (users) => set({ users }),
  setExpandedUserId: (id) => set({ expandedUserId: id }),

  // ১. সব ইউজার ফেচ করা (GET)
  fetchUsers: async (apiBase) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${apiBase}/api/admin/users`);
      if (res.ok) {
        const data = await res.json();
        set({ users: data.data || [] }); // ফিক্সড: ডেটা না থাকলে ফলব্যাক ফাঁকা অ্যারে
      }
    } catch (error) {
      console.error("Fetch users failed:", error); // ফিক্সড: ক্যাচ ব্লক যোগ করা হয়েছে
    } finally {
      set({ isLoading: false });
    }
  },

  // ২. ইউজার ব্লক/অ্যাক্টিভ করা (PATCH)
  updateUserStatus: async (apiBase, userId, newStatus) => {
    try {
      const res = await fetch(`${apiBase}/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (res.ok) {
        // স্টেট আপডেট করে রি-রেন্ডার করা
        const updatedUsers = get().users.map(u => 
          u.id === userId ? { ...u, status: newStatus } : u
        );
        set({ users: updatedUsers });
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  }
}));
