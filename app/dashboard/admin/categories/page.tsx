'use client';

import { useState, useEffect } from 'react';
import { Plus, Layers, Loader2, X, AlertTriangle } from 'lucide-react';
import CategoryRow from './categoriesRaw';
// import { useCategoryStore } from '../../../store/useCategoryStore'; 

interface Category {
  id: string;
  name: string;
  slug?: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const { categories, setCategories, isLoading, setLoading } = useCategoryStore();


  const API_BASE = process.env.BACKEND_API_URL || 'https://assignment-4-vnjw.onrender.com';

  const fetchLiveStats = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // ১. লাইভ ক্যাটাগরি ফেচ করা
      const catRes = await fetch(`${API_BASE}/api/categories`);
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(Array.isArray(catData) ? catData : catData.data || []);
      }

      // 🎯 আল্টিমেট ফিক্স: সর্টিং ক্র্যাশ এড়াতে 'sortBy=newest' এবং 'limit=100' কুয়েরি পাস করা হলো
      const propRes = await fetch(`${API_BASE}/api/properties?limit=100&sortBy=newest`);
      if (propRes.ok) {
        const propData = await propRes.json();
        
        setAllProperties(propData?.data?.data || []);
      }
    } catch (e) {
      setErrorMessage("Database synchronization failed.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveStats();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/categories/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      });
      if (res.ok) {
        setNewCategory('');
        setIsModalOpen(false);
        fetchLiveStats();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const executeDelete = async () => {
    if (!deleteTargetId) return;
    setErrorMessage(null);
    try {
      const res = await fetch(`${API_BASE}/api/categories/${deleteTargetId}`, { method: 'DELETE' });
      if (!res.ok) {
        setErrorMessage("Cannot delete! Category is strictly linked to operational properties.");
        return;
      }
      setCategories(categories.filter((cat) => cat.id !== deleteTargetId));
      setDeleteTargetId(null);
    } catch (err) {
      setErrorMessage("Database action restricted.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* হেডার */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-50 text-rose-500 rounded-xl"><Layers className="w-6 h-6" /></div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Category Hub</h1>
            <p className="text-xs font-medium text-slate-400">Database Count: {categories.length}</p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2.5 bg-rose-500 text-white font-bold text-sm rounded-xl hover:bg-rose-600 transition-all shadow-md">
          <Plus className="w-4 h-4 inline mr-1" /> Add Category
        </button>
      </div>

      {/* লিস্ট এরিয়া */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
          <Loader2 className="w-7 h-7 animate-spin text-rose-500" />
          <p className="text-xs font-semibold text-slate-500">Syncing database states...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border text-slate-400 text-sm">No global categories.</div>
      ) : (
        <div className="space-y-3.5">
          {categories.map((category) => (
            <CategoryRow 
              key={category.id} 
              category={category} 
              allProperties={allProperties}
              onDeleteClick={(id) => setDeleteTargetId(id)} 
            />
          ))}
        </div>
      )}

      {/* ক্রিয়েট মোডাল */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
            <h3 className="font-black text-slate-800 mb-4 border-b border-slate-100 pb-2">Create New Tag</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="e.g., Convention Hall" disabled={isSubmitting} className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none" />
              <div className="flex justify-end gap-2 border-t pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" disabled={isSubmitting || !newCategory.trim()} className="px-4 py-2 text-xs bg-rose-500 text-white rounded-xl font-bold">Save Tag</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ডিলিট মোডাল */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative border border-red-50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 text-red-500 rounded-xl"><AlertTriangle className="w-6 h-6 animate-pulse" /></div>
              <div className="space-y-1.5 w-full">
                <h3 className="font-black text-slate-800 text-base">Delete Confirmation</h3>
                <p className="text-xs font-medium text-slate-500">Are you sure you want to drop this record?</p>
                {errorMessage && <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] font-bold text-amber-800">⚠️ {errorMessage}</div>}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t pt-4 mt-5">
              <button type="button" onClick={() => { setDeleteTargetId(null); setErrorMessage(null); }} className="px-4 py-2 text-xs bg-slate-100 rounded-xl">Cancel</button>
              <button type="button" onClick={executeDelete} className="px-4 py-2 text-xs bg-red-500 text-white rounded-xl font-bold">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
