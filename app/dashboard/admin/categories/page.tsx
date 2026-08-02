'use client';

import { useState } from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { FolderHeart, Loader2, Plus, X, Layers } from 'lucide-react';
import CategoryRow from './categoriesRaw';
import { toast } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function CategoryContent() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const API_BASE = process.env.BACKEND_API_URL || 'https://assignment-4-vnjw.onrender.com';

  // 🔄 ১. সব ক্যাটাগরি ফেচ করা (TanStack Query)
  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
  });

  const categories = apiResponse?.data || apiResponse || [];

  // ➕ ২. নতুন ক্যাটাগরি তৈরি করার Mutation (🚀 কার্ল কমান্ড অনুযায়ী রুট ও বডি ফিক্সড)
  const createCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('rentnest_token') : null;
      const res = await fetch(`${API_BASE}/api/categories/create`, { // ✅ /create প্যাথ যোগ করা হয়েছে
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': token } : {})
        },
        credentials: 'include',
        body: JSON.stringify({ name }), // ✅ বডিতে শুধু নেম যাচ্ছে
      });
      if (!res.ok) throw new Error('Failed to create category');
      return res.json();
    },
    onSuccess: () => {
      toast.success('New category added to RentNest!');
      setCategoryName('');
      setIsModalOpen(false); // মডাল বন্ধ করা
      queryClient.invalidateQueries({ queryKey: ['categories'] }); // লিস্ট রিফ্রেশ
    },
    onError: () => {
      toast.error('Failed to create category. Maybe it already exists.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error('Category name cannot be empty!');
      return;
    }
    createCategoryMutation.mutate(categoryName);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 min-h-screen bg-slate-50/50 dark:bg-slate-900 relative">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-slate-200/60 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-2xl shadow-lg shadow-rose-500/20">
            <FolderHeart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight dark:text-white">Property Categories</h1>
            <p className="text-sm font-medium text-slate-500 mt-0.5 dark:text-slate-400">Total categories configured: <span className="font-bold text-rose-500 dark:text-rose-400">{categories.length}</span></p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-500/10 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
          <div className="col-span-5">Category Identity</div>
          <div className="col-span-4 text-center">Connected Listings</div>
          <div className="col-span-3 text-right">Operations</div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400/80">Updating Taxonomy Map...</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100/70">
            {categories.map((category: any) => (
              <CategoryRow key={category.id} category={category} />
            ))}

            {categories.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <p className="text-sm font-medium">No system categories found. Click 'Add Category' to create one.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xl w-full max-w-sm space-y-4 m-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">New Category</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wide">Category Name</label>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="e.g., Convention Hall"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium text-slate-800 dark:text-white dark:bg-slate-700 dark:border-slate-500"
                />
              </div>

              <button
                type="submit"
                disabled={createCategoryMutation.isPending}
                className="w-full h-11 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-500/10 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {createCategoryMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Confirm Creation
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CategoriesPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <CategoryContent />
    </QueryClientProvider>
  );
}
