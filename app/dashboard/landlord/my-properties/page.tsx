"use client";

import { useEffect, useState } from "react";
import { getLandlordProperties, deleteProperty, toggleAvailability } from "../../_actions/landlordAction";
import { toast } from "sonner";
import { Trash2, RefreshCw, MapPin } from "lucide-react";

export default function MyListingsPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProperties() {
    const res = await getLandlordProperties();
    setProperties(Array.isArray(res) ? res : res?.data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProperties();
  }, []);

  const handleToggle = async (id: string) => {
    const res = await toggleAvailability(id);
    toast.success("Availability swapped!");
    loadProperties();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    const res = await deleteProperty(id);
    toast.success("Property removed from inventory.");
    setProperties((prev) => prev.filter((p) => p._id !== id));
  };

  if (loading) return <div className="text-center py-20 text-sm text-neutral-500">Connecting to Render Engine Database...</div>;

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">My Rental Listings</h1>
        <p className="text-xs text-neutral-500">Live operational mapping of your published assets.</p>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-2xl text-neutral-400 text-sm">
          Your inventory is completely empty. Launch a new listing from the sidebar!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((item) => (
            <div key={item._id} className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <img src={item.images?.[0] || "https://unsplash.com"} alt={item.title} className="w-full h-44 object-cover" />
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-gray-900 text-base line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-neutral-500 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{item.location}, {item.city}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-neutral-50 mt-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Rate</p>
                  <p className="text-base font-black text-gray-900">৳{item.pricePerDay}<span className="text-xs font-normal text-gray-500">/day</span></p>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleToggle(item._id)} className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1 border transition-all ${
                    item.isAvailable !== false ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-neutral-50 text-neutral-500 border-neutral-100"
                  }`}>
                    <RefreshCw className="w-3 h-3" />
                    {item.isAvailable !== false ? "Available" : "Booked"}
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
