import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  activeStatus: 'ACTIVE' | 'BLOCKED';
}

interface UserState {
  users: User[];
  isLoading: boolean;
  totalPages: number; // 🚀 নতুন যোগ হলো ডাইনামিক পেজ ট্র্যাক করার জন্য
  expandedUserId: string | null;
  setExpandedUserId: (id: string | null) => void;
  fetchUsers: (apiBase: string, page?: number) => Promise<void>; // 🚀 page প্যারামিটার যোগ করা হলো
  updateUserStatus: (apiBase: string, userId: string, newStatus: 'ACTIVE' | 'BLOCKED') => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  isLoading: false,
  totalPages: 1, // 🚀 ডিফল্ট ১ পেজ
  expandedUserId: null,
  setExpandedUserId: (id) => set({ expandedUserId: id }),

  // 🔄 ১. সব ইউজার ফেচ করা (ডাইনামিক পেজিনেশন সহ)
  fetchUsers: async (apiBase, page = 1) => {
    set({ isLoading: true });
    const token = typeof window !== 'undefined' ? localStorage.getItem('rentnest_token') : null;

    try {
      // 🚀 ইউআরএল এ ডাইনামিকালি ?page= পাস করা হচ্ছে
      const res = await fetch(`${apiBase}/api/admin/users?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': token } : {})
        },
        credentials: 'include'
      });

      if (res.ok) {
        const resData = await res.json();
        
        let finalUsers: User[] = [];
        let totalPages = 1;

        if (resData && resData.data) {
          // 🚀 পোস্টম্যান রেসপন্স অনুযায়ী মেটা ডাটা থেকে totalPage বের করা
          if (resData.data.meta && resData.data.meta.totalPage) {
            totalPages = resData.data.meta.totalPage;
          }
          
          // পোস্টম্যানের ডাবল নেস্টেড 'data.data.data' স্ট্রাকচার থেকে আসল অ্যারে ফিল্টার
          if (Array.isArray(resData.data.data)) {
            finalUsers = resData.data.data;
          } else if (Array.isArray(resData.data)) {
            finalUsers = resData.data;
          }
        } else if (Array.isArray(resData)) {
          finalUsers = resData;
        }

        console.log("ফিল্টার হয়ে আসা আসল ডেটা:", finalUsers);
        set({ users: finalUsers, totalPages: totalPages }); // 🚀 ইউজার ও টোটাল পেজ একসাথে সেভ হলো
      } else {
        console.error("Failed to fetch users. Status:", res.status);
        set({ users: [], totalPages: 1 });
      }
    } catch (e) {
      console.error("Fetch users error:", e);
      set({ users: [], totalPages: 1 });
    } finally {
      set({ isLoading: false });
    }
  },

  // 🔧 ২. ইউজার স্ট্যাটাস আপডেট করা
  updateUserStatus: async (apiBase, userId, newStatus) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('rentnest_token') : null;
    
    try {
      const res = await fetch(`${apiBase}/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': token } : {})
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedUsers = get().users.map(u => 
          u.id === userId ? { ...u, activeStatus: newStatus } : u
        );
        set({ users: updatedUsers });
      } else {
        console.error("Failed to update status on server. Status:", res.status);
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  }
}));
