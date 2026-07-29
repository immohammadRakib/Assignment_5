"use server";

import { cookies } from "next/headers";
// 🎯 ফিক্স ১: revalidateTag এর ২-আর্গুমেন্ট এরর এড়াতে revalidatePath ইম্পোর্ট করা হলো
import { revalidatePath } from "next/cache"; 

export const updateProfileAction = async (formData: {
  phone: string;
  address: string;
  profileImage: string;
  bio: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Session expired. Please login." };
  }

  try {
    // 🎯 ফিক্স ২: হার্ডকোডেড লিঙ্ক কেটে প্রজেক্টের .env ফাইল থেকে BACKEND_API_URL আনা হলো
    // নিশ্চিত করো তোমার .env ফাইলে BACKEND_API_URL=https://assignment-4-vnjw.onrender.com দেওয়া আছে
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/my-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    
    if (res.ok || result?.success) {
      // 🎯 ফিক্স ৩: টাইপ সেফ উপায়ে টেন্যান্ট লেআউটের ক্যাশ ইনস্ট্যান্ট ফ্লাশ করা হলো
      revalidatePath("/dashboard/tenant", "layout");
      return { success: true, message: "Profile updated successfully!" };
    }
    
    return { success: false, message: result?.message || "Failed to update profile." };
  } catch (error) {
    console.error("Profile update action error:", error);
    return { success: false, message: "Internal Server Connection Error." };
  }
};
