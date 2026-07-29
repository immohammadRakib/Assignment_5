"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = "https://assignment-4-vnjw.onrender.com/api";

// 🏷️ ০. গেট অল ক্যাটাগরিজ (Live Categories Fetch)
export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error("Categories could not be retrieved");
    const data = await res.json();
    return Array.isArray(data) ? data : data?.data || [];
  } catch (error) {
    return [];
  }
}

// 🏠 ১. গেট অল প্রপার্টিজ (My Listings)
export async function getLandlordProperties() {
  try {
    const res = await fetch(`${BASE_URL}/landlord/properties`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch properties");
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}

// ➕ ২. ক্রিয়েট নিউ প্রপার্টি (Create Listing)
export async function createProperty(formData: any) {
  try {
    const res = await fetch(`${BASE_URL}/landlord/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    revalidatePath("/dashboard/landlord/my-properties");
    return await res.json();
  } catch (error) {
    return { success: false, message: "Creation failed" };
  }
}

// 📝 ৩. আপডেট প্রপার্টি (Edit Listing)
export async function updateProperty(id: string, formData: any) {
  try {
    const res = await fetch(`${BASE_URL}/landlord/properties/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    revalidatePath("/dashboard/landlord/my-properties");
    return await res.json();
  } catch (error) {
    return { success: false, message: "Update failed" };
  }
}

// ❌ ৪. ডিলিট প্রপার্টি
export async function deleteProperty(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/landlord/properties/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/dashboard/landlord/my-properties");
    return await res.json();
  } catch (error) {
    return { success: false, message: "Delete failed" };
  }
}

// 🔄 ৫. টগল অ্যাভেলেবিলিটি (PATCH)
export async function toggleAvailability(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/landlord/properties/isAvailable/${id}`, {
      method: "PATCH",
    });
    revalidatePath("/dashboard/landlord/my-properties");
    return await res.json();
  } catch (error) {
    return { success: false, message: "Toggle failed" };
  }
}

// 📥 ৬. গেট ইনকামিং রেন্টাল রিকোয়েস্ট
export async function getIncomingRequests() {
  try {
    const res = await fetch(`${BASE_URL}/rentals/landlord/requests`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch requests");
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
}

// 🔒 ৭. রিকোয়েস্ট স্ট্যাটাস আপডেট (CONFIRMED/REJECTED)
export async function updateRequestStatus(id: string, status: string) {
  try {
    const res = await fetch(`${BASE_URL}/rentals/landlord/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    revalidatePath("/dashboard/landlord/requests");
    return await res.json();
  } catch (error) {
    return { success: false, message: "Status update failed" };
  }
}
